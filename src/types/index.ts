// Type definitions for Telegram Web Clone

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
}

export interface Message {
  id: number
  text?: string
  type?: 'text' | 'image' | 'video'
  url?: string
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

export interface Contact {
  id: number
  name: string
  username: string
  avatar: string
  status: string
}

export interface CallHistory {
  id: number
  name: string
  avatar: string
  type: 'incoming' | 'outgoing' | 'video'
  duration: string
  time: string
  missed: boolean
}

export interface User {
  firstName: string
  lastName: string
  username: string
  bio: string
  phone: string
  avatar: string
}

export type ToastType = 'info' | 'success' | 'error' | 'warning'

export interface Toast {
  id: number
  title: string
  message: string
  type: ToastType
}

export type ModalName =
  | 'settings'
  | 'profile'
  | 'newGroup'
  | 'contacts'
  | 'callHistory'
  | 'callScreen'
  | 'forward'
  | 'hamburger'
  | 'chatActions'
  | 'privacy'
  | 'chatSettings'
  | 'myAccount'
  | 'folders'

export interface ModalsState {
  [key: string]: boolean
}

export interface TelegramContextType {
  // Data
  chatsData: Chat[]
  contactsData: Contact[]
  emojiData: Record<string, string[]>
  callHistoryData: CallHistory[]
  currentUser: User
  filteredChats: Chat[]
  filteredContacts: Contact[]
  filteredMembers: Contact[]
  filteredEmojis: string[]

  // State
  currentChat: Chat | null
  isMobile: boolean
  isDarkMode: boolean
  isMuted: boolean
  isVideoOn: boolean
  selectedMembers: Set<number>
  searchQuery: string
  contactsSearchQuery: string
  memberSearchQuery: string
  replyingTo: Message | null
  editingMessage: Message | null
  forwardingMessage: Message | null
  messages: Message[]
  toasts: Toast[]
  emojiCategory: string
  emojiSearchQuery: string
  showEmojiPicker: boolean
  activeCall: Chat | null
  callDuration: number
  modals: ModalsState

  // Setters
  setCurrentChat: (chat: Chat | null) => void
  setSearchQuery: (query: string) => void
  setContactsSearchQuery: (query: string) => void
  setMemberSearchQuery: (query: string) => void
  setIsMuted: (muted: boolean) => void
  setIsVideoOn: (on: boolean) => void
  setEmojiCategory: (category: string) => void
  setEmojiSearchQuery: (query: string) => void
  setShowEmojiPicker: (show: boolean) => void

  // Actions
  toggleDarkMode: () => void
  openModal: (modal: ModalName) => void
  closeModal: (modal: ModalName) => void
  goBackModal: () => void
  navigateSettings: (fromModal: ModalName, toModal: ModalName) => void
  goBackSettings: (currentModal: ModalName) => void
  openChat: (chatId: number) => void
  goBack: () => void
  sendMessage: (text: string) => void
  startReply: (message: Message) => void
  cancelReply: () => void
  startEdit: (message: Message) => void
  cancelEdit: () => void
  startForward: (message: Message) => void
  forwardMessageToChat: (message: Message, chatId: number, fromChatName: string) => void
  pinChat: (chatId: number) => void
  muteChat: (chatId: number) => void
  deleteChat: (chatId: number) => void
  clearChatHistory: (chatId: number) => void
  toggleMemberSelection: (memberId: number) => void
  showToast: (title: string, message: string, type?: ToastType, duration?: number) => void
  startCall: (chat: Chat, isVideo?: boolean) => void
  endCall: () => void
  insertEmoji: (emoji: string) => string
}

export interface TelegramProviderProps {
  children: React.ReactNode
}
