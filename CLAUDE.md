# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Telegram Web Clone** built with React 19, Vite, TypeScript (strict mode), and Tailwind CSS. It's a single-page application that replicates the Telegram Web interface with chat functionality, modals, and responsive design.

**Note**: No linting or testing is currently configured - only `dev`, `build`, and `preview` scripts are available.

## Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## Architecture

### State Management Pattern

The app uses a **centralized Context-based architecture** with modular logic separation:

**Main Context Provider:**
- **[src/context/TelegramContext.tsx](src/context/TelegramContext.tsx)** - Aggregates state from all hooks below

**Operation Hooks:**
- **[src/context/modalHooks.ts](src/context/modalHooks.ts)** - Modal stack management (open/close/back navigation) and toast notifications
- **[src/context/chatHooks.ts](src/context/chatHooks.ts)** - Chat operations (open, pin, mute, delete, clear history, forward)
- **[src/context/messageHooks.ts](src/context/messageHooks.ts)** - Message operations (send, reply, edit, forward)

**State Hooks (in [src/context/telegram/](src/context/telegram/)):**
- `useUIState.ts` - Dark mode toggle, mobile breakpoint detection (768px)
- `useChatState.ts` - Current chat, messages array, goBack navigation
- `useSearchState.ts` - Search queries (chats, contacts, members, emojis)
- `useEmojiState.ts` - Emoji category, search, picker visibility
- `useCallState.ts` - Active call, duration, mute, video toggle
- `useMemberSelection.ts` - Selected members for group creation
- `useChatIndicators.ts` - Typing indicators and upload progress per chat
- `useSettingsNavigation.ts` - Settings modal stack navigation
- `useTelegramFilters.ts` - Filters for chats/contacts/members/emojis

Access the context with `useTelegram()` hook - it throws if used outside `TelegramProvider`.

### Component Structure

```
App.tsx (TelegramProvider wrapper)
├── AppContent (main layout with dark mode handling)
│   ├── HamburgerMenu (slide-out navigation)
│   ├── Sidebar (chat list with search)
│   │   └── ChatList → ChatItem
│   ├── ChatArea (wraps ChatView with mobile animations)
│   │   └── ChatView (actual messages view)
│   │       ├── ChatHeader
│   │       ├── MessageList → Message
│   │       ├── MessageInput (with emoji picker, reply/edit support)
│   │       └── ChatActionsMenu
│   └── Modals (all conditionally rendered based on modals state)
│       └── [ModalName]Modal.tsx
```

### Data Flow

1. **Static data** stored in [src/data.ts](src/data.ts) (chatsData, contactsData, emojiData, callHistoryData, currentUser)
2. **Direct mutations** on arrays in data.ts (no immutable patterns - hooks modify `chatsData` directly)
3. **State updates** propagate through context to components

### Modal System

Modals use a **stack-based navigation** pattern:
- `openModal(name)` - pushes to stack
- `closeModal(name)` - removes specific modal
- `goBackModal()` - pops from stack
- Modals are rendered conditionally in [App.tsx:112-121](src/App.tsx#L112-L121)

### Theming System

CSS custom properties in [src/index.css](src/index.css) control light/dark mode:
- Root variables: `--tg-bg`, `--tg-blue`, `--tg-text-primary`, etc.
- Dark mode: `.dark` class overrides variables
- Applied via `document.documentElement.classList` in [App.tsx:30-40](src/App.tsx#L30-L40)
- Persisted to `localStorage` key `darkMode`

### Type Definitions

All types centralized in [src/types/index.ts](src/types/index.ts):
- `Chat`, `Message`, `Contact`, `CallHistory`, `User`
- `Toast`, `ToastType`, `ModalName`, `ModalsState`
- `TelegramContextType` (full context interface)

### Mobile Responsiveness

- Breakpoint: `768px` (tracked via `isMobile` state)
- Mobile header shows when chat is open on small screens
- Sidebar hides when chat is active on mobile
- `goBack()` function clears currentChat to return to sidebar

## Important Patterns

### Adding a New Modal

1. Add modal name to `ModalName` type in [types/index.ts](src/types/index.ts)
2. Add to `ModalsState` in [context/modalHooks.ts](src/context/modalHooks.ts)
3. Create modal component in [src/components/modals/](src/components/modals/)
4. Conditionally render in [App.tsx](src/App.tsx)

### Message State Management

When adding message features:
- Update `Message` type in [types/index.ts](src/types/index.ts) if needed
- Add logic to appropriate hook ([messageHooks.ts](src/context/messageHooks.ts) or [chatHooks.ts](src/context/chatHooks.ts))
- Context provides `messages`, `replyingTo`, `editingMessage`, `forwardingMessage` states

### Styling Conventions

- Use CSS custom properties: `var(--tg-bg)`, `var(--tg-blue)`, etc.
- Tailwind utilities for layout
- Custom CSS animations for modals (slideUp, fadeIn) and hamburger (slideInLeft)
- Scrollbar styling via `.scrollbar-thin` utility class
