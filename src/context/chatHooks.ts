import { useCallback } from 'react'
import { chatsData } from '../data'
import type { Chat, Message, ModalName, ToastType } from '../types'

interface ChatHooksProps {
  currentChat: Chat | null
  setCurrentChat: (chat: Chat | null) => void
  setMessages: (messages: Message[] | ((prev: Message[]) => Message[])) => void
  closeModal: (modalName: ModalName) => void
  goBack: () => void
  showToast?: (title: string, message: string, type?: ToastType) => void
}

export function useChatHooks({ currentChat, setCurrentChat, setMessages, closeModal, goBack, showToast }: ChatHooksProps) {
  const openChat = useCallback(
    (chatId: number) => {
      const chat = chatsData.find((c) => c.id === chatId)
      if (chat) {
        // Reset unread count when opening chat
        chat.unread = 0
        // Mark all incoming messages as read
        if (chat.messages) {
          chat.messages = chat.messages.map(msg =>
            !msg.outgoing ? { ...msg, status: 'read' as const } : msg
          )
        }
        setCurrentChat(chat)
        setMessages(chat.messages || [])
        closeModal('hamburger')
      }
    },
    [closeModal, setCurrentChat, setMessages]
  )

  const pinChat = useCallback((chatId: number) => {
    const chat = chatsData.find((c) => c.id === chatId)
    if (!chat) return
    chat.isPinned = !chat.isPinned
  }, [])

  const muteChat = useCallback((chatId: number) => {
    const chat = chatsData.find((c) => c.id === chatId)
    if (!chat) return
    chat.muted = !chat.muted
  }, [])

  const deleteChat = useCallback(
    (chatId: number) => {
      const chatIndex = chatsData.findIndex((c) => c.id === chatId)
      if (chatIndex === -1) return

      const chat = chatsData[chatIndex]
      chatsData.splice(chatIndex, 1)

      if (currentChat?.id === chatId) {
        goBack()
      }

      if (showToast) {
        showToast('Deleted', `${chat.name} chat has been deleted`, 'error' as ToastType)
      }
    },
    [currentChat, goBack, showToast]
  )

  const clearChatHistory = useCallback(
    (chatId: number) => {
      const chat = chatsData.find((c) => c.id === chatId)
      if (!chat) return

      chat.messages = []
      chat.lastMessage = ''
      chat.unread = 0

      if (currentChat?.id === chatId) {
        setMessages([])
      }

      if (showToast) {
        showToast('Cleared', `Chat history with ${chat.name} has been cleared`, 'success' as ToastType)
      }
    },
    [currentChat, setMessages, showToast]
  )

  const forwardMessageToChat = useCallback(
    (message: Message, chatId: number, fromChatName: string) => {
      const targetChat = chatsData.find((c) => c.id === chatId)
      if (!targetChat) return

      setCurrentChat(targetChat)
      closeModal('forward')

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
      setMessages(targetChat.messages)

      const chatIndex = chatsData.findIndex((c) => c.id === chatId)
      if (chatIndex !== -1) {
        chatsData[chatIndex].lastMessage = (message.text || 'Media') + ' (forwarded)'
        chatsData[chatIndex].time = forwardedMessage.time
      }

      if (showToast) {
        showToast('Forwarded', `Message forwarded to ${targetChat.name}`, 'success' as ToastType)
      }
    },
    [closeModal, setCurrentChat, setMessages, showToast]
  )

  return {
    openChat,
    pinChat,
    muteChat,
    deleteChat,
    clearChatHistory,
    forwardMessageToChat,
  }
}
