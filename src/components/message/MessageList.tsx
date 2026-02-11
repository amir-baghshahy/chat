import { forwardRef, useRef, useEffect, useMemo } from 'react'
import { Message } from './Message'
import { useTelegram } from '../../context/TelegramContext'

export const MessageList = forwardRef<HTMLDivElement>((_props, ref) => {
  const { messages, isMobile, chatSearchQuery } = useTelegram()
  const innerRef = useRef<HTMLDivElement>(null)
  const scrollRef = ref || innerRef

  // Filter messages based on chat search query
  const filteredMessages = useMemo(() => {
    if (!chatSearchQuery.trim()) {
      return messages
    }
    const query = chatSearchQuery.toLowerCase()
    return messages.filter(msg =>
      msg.text?.toLowerCase().includes(query)
    )
  }, [messages, chatSearchQuery])

  useEffect(() => {
    if (scrollRef && 'current' in scrollRef && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [filteredMessages, scrollRef])

  return (
    <div
      ref={scrollRef as React.RefObject<HTMLDivElement>}
      className={`messages-container flex-1 overflow-y-auto px-3 sm:px-4 py-4 flex flex-col gap-2 scrollbar-thin ${isMobile ? 'pt-16 sm:pt-4' : ''}`}
    >
      <div className="text-center py-2 sm:py-3 relative">
        <span className="bg-black/30 text-white px-3 py-1 rounded-xl text-[12px] sm:text-[13px]">
          Today
        </span>
      </div>
      {filteredMessages.length > 0 ? (
        filteredMessages.map(msg => (
          <Message key={msg.id} message={msg} />
        ))
      ) : chatSearchQuery.trim() ? (
        <div className="text-center py-8 text-[var(--tg-text-tertiary)]">
          <i className="fas fa-search text-4xl mb-3 opacity-50"></i>
          <p>No messages found</p>
        </div>
      ) : (
        messages.map(msg => (
          <Message key={msg.id} message={msg} />
        ))
      )}
    </div>
  )
})
