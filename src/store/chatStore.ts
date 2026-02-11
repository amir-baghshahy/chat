import { create } from 'zustand'
import type { Chat, Message } from '../types'
import { chatsData } from '../data'

interface ChatStore {
  // State
  currentChat: Chat | null
  messages: Message[]

  // Actions
  setCurrentChat: (chat: Chat | null) => void
  setMessages: (messages: Message[] | ((prev: Message[]) => Message[])) => void
  goBack: () => void
  openChat: (chatId: number) => void
  pinChat: (chatId: number) => void
  muteChat: (chatId: number) => void
  deleteChat: (chatId: number) => void
  clearChatHistory: (chatId: number) => void
  forwardMessageToChat: (message: Message, chatId: number, fromChatName: string) => void
}

export const useChatStore = create<ChatStore>((set, get) => ({
  // Initial state
  currentChat: null,
  messages: [],

  // Actions
  setCurrentChat: (chat) => set({ currentChat: chat }),

  setMessages: (messages) =>
    set((state) => ({
      messages: typeof messages === 'function' ? messages(state.messages) : messages,
    })),

  goBack: () =>
    set({
      currentChat: null,
      messages: [],
    }),

  openChat: (chatId) => {
    const chat = chatsData.find((c) => c.id === chatId)
    if (chat) {
      // Reset unread count when opening chat
      chat.unread = 0
      // Mark all incoming messages as read
      if (chat.messages) {
        chat.messages = chat.messages.map((msg) =>
          !msg.outgoing ? { ...msg, status: ('read' as const) } : msg
        )
      }
      set({
        currentChat: chat,
        messages: chat.messages || [],
      })
    }
  },

  pinChat: (chatId) => {
    const chat = chatsData.find((c) => c.id === chatId)
    if (!chat) return
    chat.isPinned = !chat.isPinned
  },

  muteChat: (chatId) => {
    const chat = chatsData.find((c) => c.id === chatId)
    if (!chat) return
    chat.muted = !chat.muted
  },

  deleteChat: (chatId) => {
    const chatIndex = chatsData.findIndex((c) => c.id === chatId)
    if (chatIndex === -1) return

    chatsData.splice(chatIndex, 1)

    // Clear current chat if it was deleted
    if (get().currentChat?.id === chatId) {
      set({ currentChat: null, messages: [] })
    }
  },

  clearChatHistory: (chatId) => {
    const chat = chatsData.find((c) => c.id === chatId)
    if (!chat) return

    chat.messages = []
    chat.lastMessage = ''
    chat.unread = 0

    // Clear messages if this is the current chat
    if (get().currentChat?.id === chatId) {
      set({ messages: [] })
    }
  },

  forwardMessageToChat: (message, chatId, fromChatName) => {
    const targetChat = chatsData.find((c) => c.id === chatId)
    if (!targetChat) return

    const forwardedMessage: Message = {
      id: Date.now(),
      text: message.text,
      type: message.type,
      url: message.url,
      fileName: message.fileName,
      fileSize: message.fileSize,
      time: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
      outgoing: true,
      status: 'sent',
      forwardedFrom: fromChatName,
    }

    if (!targetChat.messages) {
      targetChat.messages = []
    }
    targetChat.messages.push(forwardedMessage)

    // Update current chat if forwarding to current chat
    if (get().currentChat?.id === chatId) {
      set({ messages: targetChat.messages })
    }

    const chatIndex = chatsData.findIndex((c) => c.id === chatId)
    if (chatIndex !== -1) {
      chatsData[chatIndex].lastMessage = (message.text || 'Media') + ' (forwarded)'
      chatsData[chatIndex].time = forwardedMessage.time
    }
  },
}))
