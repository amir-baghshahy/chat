import { useState, useCallback } from 'react'
import type { Chat, Message } from '../../types'

export function useChatState() {
  const [currentChat, setCurrentChat] = useState<Chat | null>(null)
  const [messages, setMessages] = useState<Message[]>([])

  const goBack = useCallback(() => {
    setCurrentChat(null)
    setMessages([])
  }, [])

  return {
    currentChat,
    messages,
    setCurrentChat,
    setMessages,
    goBack,
  }
}
