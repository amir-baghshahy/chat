// ===== Data Models for Telegram Web Clone =====
// This file contains data type definitions

/** User profile information */
export interface User {
  firstName: string
  lastName: string
  username: string
  bio: string
  phone: string
  avatar: string
}

/** Chat/conversation data */
export interface Chat {
  id: number
  name: string
  username?: string
  avatar: string
  lastMessage: string
  time: string
  unread: number
  online: boolean
  isSaved?: boolean
  isGroup?: boolean
  isPinned?: boolean
  muted?: boolean
  bio?: string
  messages?: Message[]
  /** Typing indicator status */
  typing?: boolean
  /** Uploading file indicator */
  uploadingFile?: {
    name: string
    progress: number
  }
}

/** Message in a chat */
export interface Message {
  id: number
  text?: string
  type?: 'text' | 'image' | 'video' | 'file'
  url?: string
  fileName?: string
  fileSize?: string
  time: string
  outgoing: boolean
  status?: 'sent' | 'read'
  replyTo?: {
    id: number
    name: string
    text: string
  }
  edited?: boolean
  forwardedFrom?: string
}

/** Contact information */
export interface Contact {
  id: number
  name: string
  username: string
  avatar: string
  status: string
}

/** Call history entry */
export interface CallHistory {
  id: number
  name: string
  avatar: string
  type: 'incoming' | 'outgoing' | 'video'
  duration: string
  time: string
  missed: boolean
}
