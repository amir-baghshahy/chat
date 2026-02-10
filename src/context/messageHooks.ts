import { useCallback, useState } from 'react'
import { chatsData } from '../data'
import type { Message, Chat } from '../types'

interface MessageHooksProps {
  currentChat: Chat | null
  setMessages: (messages: Message[] | ((prev: Message[]) => Message[])) => void
  openModal: (modalName: string) => void
}

export function useMessageHooks({ currentChat, setMessages, openModal }: MessageHooksProps) {
  const [replyingTo, setReplyingTo] = useState<Message | null>(null)
  const [editingMessage, setEditingMessage] = useState<Message | null>(null)
  const [forwardingMessage, setForwardingMessage] = useState<Message | null>(null)

  const sendMessage = useCallback(
    (text: string) => {
      if (!text.trim() || !currentChat) return

      const newMessage: Message = {
        id: Date.now(),
        text: text.trim(),
        time: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
        outgoing: true,
        status: 'sent',
      }

      setMessages((prev) => [...prev, newMessage])

      const chatIndex = chatsData.findIndex((c) => c.id === currentChat.id)
      if (chatIndex !== -1) {
        chatsData[chatIndex].lastMessage = text.trim()
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
        }
        setMessages((prev) => [...prev, responseMessage])

        setMessages((prev) => prev.map((msg) => (msg.id === newMessage.id ? { ...msg, status: 'read' } : msg)))
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
