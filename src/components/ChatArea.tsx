import { ChatView } from './ChatView'
import { EmptyState } from './EmptyState'
import { useTelegram } from '../contexts/TelegramContext'

export function ChatArea() {
  const { currentChat, isMobile } = useTelegram()

  return (
    <main
      className={`flex-1 flex flex-col chat-area-pattern relative
        ${isMobile && currentChat ? 'fixed inset-0 z-[50]' : ''}
      `}
    >
      {currentChat ? <ChatView /> : <EmptyState />}
    </main>
  )
}
