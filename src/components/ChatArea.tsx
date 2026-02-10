import { useState, useEffect } from 'react'
import { ChatView } from './ChatView'
import { EmptyState } from './EmptyState'
import { useTelegram } from '../context/TelegramContext'

export function ChatArea() {
  const { currentChat, isMobile } = useTelegram()
  const [isExiting, setIsExiting] = useState(false)
  const [prevChat, setPrevChat] = useState<typeof currentChat>(null)

  useEffect(() => {
    if (currentChat && !prevChat) {
      // Chat is opening
      setIsExiting(false)
    } else if (!currentChat && prevChat) {
      // Chat is closing - add exit animation
      setIsExiting(true)
      const timer = setTimeout(() => {
        setIsExiting(false)
        setPrevChat(null)
      }, 300)
      return () => clearTimeout(timer)
    }
    setPrevChat(currentChat)
  }, [currentChat, prevChat])

  return (
    <main
      className={`${isMobile && currentChat ? 'flex-1 w-full' : 'flex-1'} flex flex-col chat-area-pattern relative
        ${isMobile && currentChat ? 'fixed inset-0 z-[50]' : ''
      } ${isMobile && (currentChat || isExiting) ? (isExiting ? 'chat-view-exit' : 'chat-view-enter') : ''}
      `}
    >
      {currentChat ? <ChatView /> : <EmptyState />}
    </main>
  )
}
