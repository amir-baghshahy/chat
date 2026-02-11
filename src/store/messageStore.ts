import { create } from 'zustand'
import type { Message, ModalName, Chat } from '../types'
import { chatsData } from '../data'
import { useChatStore } from './chatStore'

export interface FilePreview {
  file: File
  url: string
  type: 'image' | 'video' | 'file'
}

interface MessageStore {
  // State
  replyingTo: Message | null
  editingMessage: Message | null
  forwardingMessage: Message | null

  // Actions
  setReplyingTo: (message: Message | null) => void
  setEditingMessage: (message: Message | null) => void
  setForwardingMessage: (message: Message | null) => void
  sendMessage: (text: string, filePreview?: FilePreview, currentChat?: Chat) => void
  startReply: (message: Message) => void
  cancelReply: () => void
  startEdit: (message: Message) => void
  cancelEdit: () => void
  startForward: (message: Message, openModal: (modal: ModalName) => void) => void
}

export const useMessageStore = create<MessageStore>((set, get) => ({
  // Initial state
  replyingTo: null,
  editingMessage: null,
  forwardingMessage: null,

  // Setters
  setReplyingTo: (message) => set({ replyingTo: message }),
  setEditingMessage: (message) => set({ editingMessage: message }),
  setForwardingMessage: (message) => set({ forwardingMessage: message }),

  // Actions
  sendMessage: (text: string, filePreview?: FilePreview, currentChat?: Chat) => {
    const { replyingTo, editingMessage } = get()

    if ((!text.trim() && !filePreview) || !currentChat) return

    const newMessage: Message = {
      id: Date.now(),
      text: text.trim() || undefined,
      time: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
      outgoing: true,
      status: 'sent',
    }

    // Add file attachment if present
    if (filePreview) {
      newMessage.type = filePreview.type
      newMessage.url = filePreview.url
      newMessage.fileName = filePreview.file.name
      newMessage.fileSize = `${(filePreview.file.size / 1024).toFixed(1)} KB`
    }

    // Add to chat messages
    if (!currentChat.messages) {
      currentChat.messages = []
    }
    currentChat.messages.push(newMessage)

    // Update chatStore messages state for immediate UI update
    useChatStore.getState().setMessages([...currentChat.messages])

    // Update chat last message
    const chatIndex = chatsData.findIndex((c) => c.id === currentChat.id)
    if (chatIndex !== -1) {
      chatsData[chatIndex].lastMessage =
        text.trim() ||
        (filePreview?.type === 'image'
          ? '📷 Photo'
          : filePreview?.type === 'video'
          ? '🎥 Video'
          : '📎 File')
      chatsData[chatIndex].time = newMessage.time
    }

    // Auto-scroll to bottom
    setTimeout(() => {
      const messagesContainer = document.querySelector('[class*="overflow-y-auto"]') as HTMLElement
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight
      }
    }, 0)

    // Handle reply
    if (replyingTo) {
      newMessage.replyTo = {
        id: replyingTo.id,
        name: currentChat.name,
        text: replyingTo.text || 'Media',
      }
      set({ replyingTo: null })
    }

    // Handle edit
    if (editingMessage) {
      const msgIndex = currentChat.messages.findIndex((m: Message) => m.id === editingMessage.id)
      if (msgIndex !== -1) {
        currentChat.messages[msgIndex] = {
          ...currentChat.messages[msgIndex],
          text: text.trim(),
          edited: true,
        }
        useChatStore.getState().setMessages([...currentChat.messages])
      }
      set({ editingMessage: null })
      return
    }

    // Simulate response after 1 second
    setTimeout(() => {
      const responseMessage: Message = {
        id: Date.now() + 1,
        text: 'Thanks for your message!',
        time: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
        outgoing: false,
        status: 'sent',
      }

      if (currentChat.messages) {
        currentChat.messages.push(responseMessage)

        // Update chatStore messages state
        useChatStore.getState().setMessages([...currentChat.messages])

        // Mark sent message as read
        const sentMsgIndex = currentChat.messages.findIndex((m: Message) => m.id === newMessage.id)
        if (sentMsgIndex !== -1) {
          currentChat.messages[sentMsgIndex].status = 'read'
        }

        // Increment unread count
        const chatIdx = chatsData.findIndex((c) => c.id === currentChat.id)
        if (chatIdx !== -1) {
          chatsData[chatIdx].unread += 1
        }

        // Auto-scroll to bottom for response
        const messagesContainer = document.querySelector('[class*="overflow-y-auto"]') as HTMLElement
        if (messagesContainer) {
          messagesContainer.scrollTop = messagesContainer.scrollHeight
        }
      }
    }, 1000)
  },

  startReply: (message) =>
    set({
      replyingTo: message,
      editingMessage: null,
      forwardingMessage: null,
    }),

  cancelReply: () => set({ replyingTo: null }),

  startEdit: (message) =>
    set({
      editingMessage: message,
      replyingTo: null,
      forwardingMessage: null,
    }),

  cancelEdit: () => set({ editingMessage: null }),

  startForward: (message, _openModal) =>
    set({
      forwardingMessage: message,
      replyingTo: null,
      editingMessage: null,
    }),
}))
