import { useTelegram } from '../contexts/TelegramContext'
import { clsx } from 'clsx'
import type { Chat } from '../types'

interface ChatItemProps {
  chat: Chat
  isActive: boolean
}

export function ChatItem({ chat, isActive }: ChatItemProps) {
  const { openChat } = useTelegram()

  return (
    <div
      className={clsx(
        'chat-item flex items-center px-3 sm:px-4 py-2 sm:py-2.5 cursor-pointer gap-2 sm:gap-3 transition-colors',
        'hover:bg-[color:var(--tg-hover)]',
        isActive && 'bg-[color:var(--tg-blue-light)]'
      )}
      onClick={() => openChat(chat.id)}
    >
      <div className="relative flex-shrink-0">
        <img
          src={chat.avatar}
          alt={chat.name}
          className="w-[45px] sm:w-[50px] h-[45px] sm:h-[50px] rounded-full object-cover"
        />
        {chat.online && (
          <div className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-400 border-2 border-[color:var(--tg-bg)] rounded-full"></div>
        )}
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-0.5 sm:gap-1">
        <div className="flex justify-between items-center gap-2">
          <span className="text-[14px] sm:text-[15px] font-semibold text-[color:var(--tg-text-primary)] truncate">{chat.name}</span>
          <span className="text-[11px] sm:text-[12px] text-[color:var(--tg-text-tertiary)] flex-shrink-0">{chat.time}</span>
        </div>
        <div className="flex justify-between items-center gap-2">
          <span className="text-[13px] sm:text-[14px] text-[color:var(--tg-text-secondary)] truncate flex-1 min-w-0">{chat.lastMessage}</span>
          {chat.unread > 0 && (
            <span className="bg-[color:var(--tg-blue)] text-white text-[10px] sm:text-[11px] font-semibold px-1 sm:px-1.5 py-0.5 rounded-full min-w-[18px] sm:min-w-[20px] text-center flex-shrink-0">
              {chat.unread > 99 ? '99+' : chat.unread}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
