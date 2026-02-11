# Backend Plan - Telegram Web Clone

## Technology Stack

- **Language**: Go 1.23+
- **Database**: TimescaleDB (PostgreSQL extension for time-series data)
- **Cache**: Redis 7+
- **File Storage**: Local filesystem / S3-compatible object storage
- **Real-time**: WebSocket (Gorilla WebSocket)
- **API**: RESTful API + WebSocket for real-time updates

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         Load Balancer                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Go API Servers                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   REST API   │  │  WebSocket   │  │  File Upload │      │
│  │   (Gin/Fiber)│  │   (Gorilla)  │  │   Handler    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┼─────────────┐
                ▼             ▼             ▼
        ┌───────────┐  ┌───────────┐  ┌───────────┐
        │  Timescale│  │  Redis    │  │  File     │
        │    DB     │  │  Cache    │  │  Storage  │
        └───────────┘  └───────────┘  └───────────┘
```

---

## Database Schema (TimescaleDB)

### Core Tables

```sql
-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    username VARCHAR(100) UNIQUE NOT NULL,
    bio TEXT,
    phone VARCHAR(20) UNIQUE NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    last_seen_at TIMESTAMP
);

-- Indexes
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_phone ON users(phone);

-- Chats table (both direct chats and groups)
CREATE TYPE chat_type AS ENUM ('direct', 'group', 'channel');

CREATE TABLE chats (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type chat_type NOT NULL DEFAULT 'direct',
    avatar_url TEXT,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_chats_type ON chats(type);

-- Chat members (for groups/channels)
CREATE TABLE chat_members (
    id SERIAL PRIMARY KEY,
    chat_id INTEGER REFERENCES chats(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(20) DEFAULT 'member', -- 'owner', 'admin', 'member'
    joined_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(chat_id, user_id)
);

CREATE INDEX idx_chat_members_chat ON chat_members(chat_id);
CREATE INDEX idx_chat_members_user ON chat_members(user_id);

-- Messages hypertable (time-series data)
CREATE TABLE messages (
    id BIGSERIAL PRIMARY KEY,
    chat_id INTEGER REFERENCES chats(id) ON DELETE CASCADE,
    sender_id INTEGER REFERENCES users(id),
    text TEXT,
    message_type VARCHAR(20) DEFAULT 'text', -- 'text', 'image', 'video', 'file'
    file_url TEXT,
    file_name VARCHAR(500),
    file_size BIGINT,
    mime_type VARCHAR(100),
    reply_to_id BIGINT REFERENCES messages(id),
    forwarded_from_user_id INTEGER REFERENCES users(id),
    edited_at TIMESTAMP,
    status VARCHAR(20) DEFAULT 'sent', -- 'sent', 'delivered', 'read'
    created_at TIMESTAMP DEFAULT NOW(),
    deleted_for_users INTEGER[] DEFAULT '{}',
    INDEX (chat_id, created_at DESC)
);

-- Convert to hypertable for time-series optimization
SELECT create_hypertable('messages', 'created_at');

-- Create indexes for common queries
CREATE INDEX idx_messages_chat_id ON messages(chat_id, created_at DESC);
CREATE INDEX idx_messages_sender_id ON messages(sender_id, created_at DESC);
CREATE INDEX idx_messages_reply_to ON messages(reply_to_id);

-- Message read receipts
CREATE TABLE message_read_receipts (
    id BIGSERIAL PRIMARY KEY,
    message_id BIGINT REFERENCES messages(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    read_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(message_id, user_id)
);

CREATE INDEX idx_read_receipts_message ON message_read_receipts(message_id);
CREATE INDEX idx_read_receipts_user ON message_read_receipts(user_id);

-- User chat states (unread count, pinned, muted, etc.)
CREATE TABLE user_chat_states (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    chat_id INTEGER REFERENCES chats(id) ON DELETE CASCADE,
    unread_count INTEGER DEFAULT 0,
    is_pinned BOOLEAN DEFAULT FALSE,
    is_muted BOOLEAN DEFAULT FALSE,
    last_read_message_id BIGINT REFERENCES messages(id),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, chat_id)
);

CREATE INDEX idx_user_chat_states_user ON user_chat_states(user_id);
CREATE INDEX idx_user_chat_states_unread ON user_chat_states(user_id, unread_count)
    WHERE unread_count > 0;

-- Typing indicators (temporary data)
CREATE TABLE typing_indicators (
    chat_id INTEGER REFERENCES chats(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    updated_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (chat_id, user_id)
);

-- Call history
CREATE TYPE call_status AS ENUM ('incoming', 'outgoing', 'missed');
CREATE TYPE call_type AS ENUM ('audio', 'video');

CREATE TABLE call_history (
    id BIGSERIAL PRIMARY KEY,
    chat_id INTEGER REFERENCES chats(id) ON DELETE CASCADE,
    caller_id INTEGER REFERENCES users(id),
    callee_id INTEGER REFERENCES users(id),
    call_type call_type NOT NULL DEFAULT 'audio',
    status call_status NOT NULL,
    duration_seconds INTEGER DEFAULT 0,
    started_at TIMESTAMP DEFAULT NOW(),
    ended_at TIMESTAMP
);

CREATE INDEX idx_call_history_user ON call_history(caller_id, started_at DESC);
CREATE INDEX idx_call_history_callee ON call_history(callee_id, started_at DESC);

-- Contacts
CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    contact_user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    added_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, contact_user_id)
);

CREATE INDEX idx_contacts_user ON contacts(user_id);
```

---

## Redis Data Structures

### Cache Keys

```
# User session
session:{user_id} -> hash (user data, online status, etc.)
session:{user_id}:last_ping -> timestamp (for online status)

# Chat typing indicators
chat:{chat_id}:typing -> set of user_ids (expires after 10s)

# Online users
online:users -> set of user_ids

# Message queue for WebSocket broadcast
message:queue -> list (for broadcasting new messages)

# User active chats cache
user:{user_id}:chats -> sorted set (by last message time)

# Rate limiting
ratelimit:{user_id}:{action} -> string (incrementing counter)
```

### Pub/Sub Channels

```
# Message broadcasts
chat:{chat_id}:messages -> new messages in chat

# User notifications
user:{user_id}:notifications -> push notifications

# Typing indicators
chat:{chat_id}:typing -> typing status updates

# Online status
user:{user_id}:status -> online/offline/presence changes
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login with phone/password |
| POST | `/api/auth/verify` | Verify phone code (OTP) |
| POST | `/api/auth/logout` | Logout user |
| GET | `/api/auth/me` | Get current user profile |

### Chats

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/chats` | List user's chats |
| GET | `/api/chats/:id` | Get chat details |
| POST | `/api/chats` | Create new group |
| PUT | `/api/chats/:id` | Update chat (name, avatar) |
| DELETE | `/api/chats/:id` | Delete chat |
| GET | `/api/chats/:id/messages` | Get chat messages (paginated) |
| POST | `/api/chats/:id/read` | Mark messages as read |
| POST | `/api/chats/:id/pin` | Pin/unpin chat |
| POST | `/api/chats/:id/mute` | Mute/unmute chat |
| DELETE | `/api/chats/:id/history` | Clear chat history |

### Messages

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/messages` | Send message |
| GET | `/api/messages/:id` | Get message details |
| PUT | `/api/messages/:id` | Edit message |
| DELETE | `/api/messages/:id` | Delete message |
| POST | `/api/messages/:id/forward` | Forward message |
| GET | `/api/messages/search` | Search messages in chat |

### Files

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/files/upload` | Upload file |
| GET | `/api/files/:id` | Get file |
| DELETE | `/api/files/:id` | Delete file |

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Search users |
| GET | `/api/users/:id` | Get user profile |
| GET | `/api/users/:id/chats` | Get common chats |
| POST | `/api/users/:id/contacts` | Add to contacts |
| DELETE | `/api/users/:id/contacts` | Remove from contacts |

### Calls

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/calls/start` | Start call |
| POST | `/api/calls/:id/answer` | Answer call |
| POST | `/api/calls/:id/end` | End call |
| GET | `/api/calls/history` | Get call history |

---

## WebSocket Protocol

### Connection

```
ws://api.example.com/ws?token={jwt_token}
```

### Message Format (Client -> Server)

```json
{
  "type": "message" | "typing" | "read_receipt" | "presence",
  "data": { ... }
}
```

### Message Types

**Send Message:**
```json
{
  "type": "message",
  "data": {
    "chat_id": 123,
    "text": "Hello",
    "reply_to_id": null,
    "file_id": null
  }
}
```

**Typing Indicator:**
```json
{
  "type": "typing",
  "data": {
    "chat_id": 123,
    "is_typing": true
  }
}
```

**Read Receipt:**
```json
{
  "type": "read_receipt",
  "data": {
    "chat_id": 123,
    "message_id": 456
  }
}
```

**Presence:**
```json
{
  "type": "presence",
  "data": {
    "status": "online" | "offline" | "away"
  }
}
```

### Server -> Client Events

```json
{
  "event": "new_message" | "message_updated" | "message_deleted" | "typing" | "read_receipt" | "presence" | "call",
  "data": { ... }
}
```

---

## Go Project Structure

```
telegram-backend/
├── cmd/
│   └── server/
│       └── main.go
├── internal/
│   ├── api/
│   │   ├── handler/
│   │   │   ├── auth.go
│   │   │   ├── chat.go
│   │   │   ├── message.go
│   │   │   ├── user.go
│   │   │   ├── file.go
│   │   │   └── call.go
│   │   ├── middleware/
│   │   │   ├── auth.go
│   │   │   ├── cors.go
│   │   │   └── ratelimit.go
│   │   └── router.go
│   ├── models/
│   │   ├── user.go
│   │   ├── chat.go
│   │   ├── message.go
│   │   └── call.go
│   ├── repository/
│   │   ├── user.go
│   │   ├── chat.go
│   │   ├── message.go
│   │   └── timescale.go
│   ├── service/
│   │   ├── auth.go
│   │   ├── chat.go
│   │   ├── message.go
│   │   ├── file.go
│   │   └── websocket.go
│   ├── cache/
│   │   └── redis.go
│   ├── config/
│   │   └── config.go
│   └── websocket/
│       ├── hub.go
│       ├── client.go
│       └── message.go
├── pkg/
│   ├── jwt/
│   │   └── jwt.go
│   ├── password/
│   │   └── password.go
│   └── validator/
│       └── validator.go
├── uploads/
│   └── files/
├── migrations/
│   └── 001_initial_schema.sql
├── go.mod
├── go.sum
└── .env.example
```

---

## Key Features Implementation

### 1. Message Flow with Read Receipts

1. User sends message → saved to DB with status='sent'
2. WebSocket broadcasts to all online chat members
3. Recipients acknowledge → update DB to status='delivered'
4. User opens chat → mark all as read → update DB to status='read'
5. Increment unread_count in user_chat_states on new messages
6. Reset unread_count when user reads messages

### 2. Typing Indicators

1. User starts typing → WebSocket event
2. Store in Redis with 10s TTL
3. Broadcast to other chat members
4. Expire automatically after 10s of inactivity

### 3. File Upload

1. Client generates unique UUID
2. Upload file via POST /api/files/upload
3. Server saves to disk/S3
4. Return file_id and URL
5. Client sends message with file_id

### 4. Search

- **Chat search**: Full-text search on messages.text using PostgreSQL GIN indexes
- **Global search**: Search across all user's chats
- **User search**: Search by username or phone

### 5. Real-time Updates

- Each user has a WebSocket connection
- Server maintains connection pool (Hub pattern)
- Broadcast message to chat members via Redis pub/sub
- Scale horizontally with multiple API servers

---

## Environment Variables

```bash
# Server
PORT=8080
HOST=0.0.0.0
ENVIRONMENT=production

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=telegram
DB_USER=postgres
DB_PASSWORD=password
DB_SSLMODE=disable

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRY=24h

# File Storage
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=100MB
S3_BUCKET=
S3_REGION=
S3_ACCESS_KEY=
S3_SECRET_KEY=

# Rate Limiting
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_WINDOW=1m
```

---

## Dependencies

```go
require (
    github.com/gin-gonic/gin v1.10.0
    github.com/gorilla/websocket v1.5.1
    github.com/jackc/pgx/v5 v5.5.0
    github.com/redis/go-redis/v9 v9.4.0
    github.com/golang-jwt/jwt/v5 v5.2.0
    golang.org/x/crypto v0.18.0
    github.com/go-playground/validator/v10 v10.16.0
)
```

---

## Deployment Considerations

1. **Database**: TimescaleDB for time-series messages data
2. **Caching**: Redis for session management, pub/sub, and caching
3. **File Storage**: S3 or MinIO for production
4. **WebSocket**: Sticky sessions required for load balancer
5. **Scaling**: Stateless API servers, shared Redis
6. **Monitoring**: Prometheus + Grafana for metrics
7. **Logging**: Structured logging with ELK stack

---

## Next Steps

1. Set up Go project structure
2. Implement database migrations
3. Create REST API handlers
4. Implement WebSocket hub
5. Add authentication with JWT
6. Integrate Redis caching
7. Add file upload handling
8. Implement rate limiting
9. Add comprehensive tests
10. Set up CI/CD pipeline
