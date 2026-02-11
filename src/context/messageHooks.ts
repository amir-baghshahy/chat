import { useCallback, useState } from 'react'
import { chatsData } from '../data'
import type { Message, Chat, ModalName } from '../types'

interface FilePreview {
  file: File
  url: string
  type: 'image' | 'video' | 'file'
}

interface MessageHooksProps {
  currentChat: Chat | null
  setMessages: (messages: Message[] | ((prev: Message[]) => Message[])) => void
  openModal: (modalName: ModalName) => void
}

export function useMessageHooks({ currentChat, setMessages, openModal }: MessageHooksProps) {
  const [replyingTo, setReplyingTo] = useState<Message | null>(null)
  const [editingMessage, setEditingMessage] = useState<Message | null>(null)
  const [forwardingMessage, setForwardingMessage] = useState<Message | null>(null)

  const sendMessage = useCallback(
    (text: string, filePreview?: FilePreview) => {
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

      setMessages((prev) => [...prev, newMessage])

      const chatIndex = chatsData.findIndex((c) => c.id === currentChat.id)
      if (chatIndex !== -1) {
        chatsData[chatIndex].lastMessage = text.trim() || (filePreview?.type === 'image' ? '📷 Photo' : filePreview?.type === 'video' ? '🎥 Video' : '📎 File')
        chatsData[chatIndex].time = newMessage.time
      }

      if (replyingTo) {
        newMessage.replyTo = {
          id: replyingTo.id,
          name: currentChat.name,
          text: replyingTo.text || 'Media',
        }
        setReplyingTo(null)
      }

      if (editingMessage) {
        setMessages((prev) =>
          prev.map((msg) => (msg.id === editingMessage.id ? { ...msg, text: text.trim(), edited: true } : msg))
        )
        setEditingMessage(null)
        return
      }

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
        setMessages((prev) => [...prev, responseMessage])

        // Mark sent message as read
        setMessages((prev) => prev.map((msg) => (msg.id === newMessage.id ? { ...msg, status: 'read' as const } : msg)))

        // Increment unread count for the chat
        const chatIndex = chatsData.findIndex((c) => c.id === currentChat.id)
        if (chatIndex !== -1) {
          chatsData[chatIndex].unread += 1
        }
      }, 1000)
    },
    [currentChat, replyingTo, editingMessage, setMessages]
  )

  const startReply = useCallback((message: Message) => {
    setReplyingTo(message)
    setEditingMessage(null)
    setForwardingMessage(null)
  }, [])

  const cancelReply = useCallback(() => {
    setReplyingTo(null)
  }, [])

  const startEdit = useCallback((message: Message) => {
    setEditingMessage(message)
    setReplyingTo(null)
    setForwardingMessage(null)
  }, [])

  const cancelEdit = useCallback(() => {
    setEditingMessage(null)
  }, [])

  const startForward = useCallback(
    (message: Message) => {
      setForwardingMessage(message)
      setReplyingTo(null)
      setEditingMessage(null)
      openModal('forward')
    },
    [openModal]
  )

  return {
    replyingTo,
    editingMessage,
    forwardingMessage,
    setReplyingTo,
    setEditingMessage,
    sendMessage,
    startReply,
    cancelReply,
    startEdit,
    cancelEdit,
    startForward,
  }
}
