// ===== Type Definitions for Telegram Web Clone =====
// This is the main types export file - re-exports from sub-modules

// Export all types from sub-modules
export * from './data'
export * from './ui'
export * from './providers'

// Import types for context interface to avoid circular dependencies
import type { Chat, Message, User, Contact, CallHistory, Toast, ToastType, ModalName, ModalsState } from './index'

// ==================== CONTEXT ====================

/** Telegram Context Type - The main context interface */
export interface TelegramContextType {
  // ========== STATIC DATA ==========
  chatsData: Chat[]
  contactsData: Contact[]
  emojiData: Record<string, string[]>
  callHistoryData: CallHistory[]
  currentUser: User

  // ========== FILTERED DATA ==========
  filteredChats: Chat[]
  filteredContacts: Contact[]
  filteredMembers: Contact[]
  filteredEmojis: string[]

  // ========== UI STATE ==========
  currentChat: Chat | null
  isMobile: boolean
  isDarkMode: boolean

  // ========== CALL STATE ==========
  activeCall: Chat | null
  callDuration: number
  isMuted: boolean
  isVideoOn: boolean

  // ========== SEARCH STATE ==========
  searchQuery: string
  contactsSearchQuery: string
  memberSearchQuery: string
  chatSearchQuery: string

  // ========== EMOJI STATE ==========
  emojiCategory: string
  emojiSearchQuery: string
  showEmojiPicker: boolean

  // ========== SELECTION STATE ==========
  selectedMembers: Set<number>

  // ========== CHAT INDICATORS ==========
  typingChats: Set<number>
  uploadingChats: Map<number, { name: string; progress: number }>
  setChatTyping: (chatId: number, isTyping: boolean) => void
  setUploadingFile: (chatId: number, file: { name: string; progress: number } | null) => void
  updateUploadProgress: (chatId: number, progress: number) => void
  isChatTyping: (chatId: number) => boolean
  getUploadingFile: (chatId: number) => { name: string; progress: number } | null

  // ========== MESSAGE STATE ==========
  replyingTo: Message | null
  editingMessage: Message | null
  forwardingMessage: Message | null
  messages: Message[]

  // ========== TOASTS & MODALS ==========
  toasts: Toast[]
  modals: ModalsState

  // ========== SETTERS ==========
  setCurrentChat: (chat: Chat | null) => void
  setSearchQuery: (query: string) => void
  setContactsSearchQuery: (query: string) => void
  setMemberSearchQuery: (query: string) => void
  setChatSearchQuery: (query: string) => void
  setIsMuted: (muted: boolean) => void
  setIsVideoOn: (on: boolean) => void
  setEmojiCategory: (category: string) => void
  setEmojiSearchQuery: (query: string) => void
  setShowEmojiPicker: (show: boolean) => void

  // ========== ACTIONS ==========
  /** Toggle between light and dark mode */
  toggleDarkMode: () => void
  /** Open a modal */
  openModal: (modal: ModalName) => void
  /** Close a modal */
  closeModal: (modal: ModalName) => void
  /** Go back in modal stack */
  goBackModal: () => void
  /** Navigate from one settings modal to another */
  navigateSettings: (fromModal: ModalName, toModal: ModalName) => void
  /** Go back to previous settings modal */
  goBackSettings: (currentModal: ModalName) => void
  /** Open a chat by ID */
  openChat: (chatId: number) => void
  /** Go back from chat view (mobile) */
  goBack: () => void
  /** Send a message */
  sendMessage: (text: string, filePreview?: { file: File; url: string; type: 'image' | 'video' | 'file' }) => void
  /** Start replying to a message */
  startReply: (message: Message) => void
  /** Cancel reply */
  cancelReply: () => void
  /** Start editing a message */
  startEdit: (message: Message) => void
  /** Cancel edit */
  cancelEdit: () => void
  /** Start forwarding a message */
  startForward: (message: Message) => void
  /** Forward message to a specific chat */
  forwardMessageToChat: (message: Message, chatId: number, fromChatName: string) => void
  /** Pin/unpin a chat */
  pinChat: (chatId: number) => void
  /** Mute/unmute a chat */
  muteChat: (chatId: number) => void
  /** Delete a chat */
  deleteChat: (chatId: number) => void
  /** Clear chat history */
  clearChatHistory: (chatId: number) => void
  /** Toggle member selection (for creating groups) */
  toggleMemberSelection: (memberId: number) => void
  /** Show a toast notification */
  showToast: (title: string, message: string, type?: ToastType, duration?: number) => void
  /** Start a call */
  startCall: (chat: Chat, isVideo?: boolean) => void
  /** End a call */
  endCall: () => void
  /** Insert emoji (returns the emoji) */
  insertEmoji: (emoji: string) => string
}
