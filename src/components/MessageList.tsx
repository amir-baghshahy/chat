import { forwardRef, useRef, useEffect } from 'react'
import { Message } from './Message'
import { useTelegram } from '../context/TelegramContext'

export const MessageList = forwardRef<HTMLDivElement>((_props, ref) => {
  const { messages, isMobile } = useTelegram()
  const innerRef = useRef<HTMLDivElement>(null)
  const scrollRef = ref || innerRef

  useEffect(() => {
    if (scrollRef && 'current' in scrollRef && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, scrollRef])

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
      {messages.map(msg => (
        <Message key={msg.id} message={msg} />
      ))}
    </div>
  )
})
