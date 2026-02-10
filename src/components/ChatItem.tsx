import { useState, useCallback, useRef } from 'react'
import { useTelegram } from '../context/TelegramContext'
import { clsx } from 'clsx'
import type { Chat } from '../types'
import { TypingIndicator } from './chat/ChatIndicators'

interface ChatItemProps {
  chat: Chat
  isActive: boolean
}

export function ChatItem({ chat, isActive }: ChatItemProps) {
  const { openChat, pinChat, muteChat, deleteChat, clearChatHistory, isChatTyping } = useTelegram()
  const [showContextMenu, setShowContextMenu] = useState(false)
  const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 })
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setContextMenuPos({ x: e.clientX, y: e.clientY })
    setShowContextMenu(true)
  }, [])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0]
    setContextMenuPos({ x: touch.clientX, y: touch.clientY })

    // Long press detection (500ms)
    longPressTimerRef.current = setTimeout(() => {
      setShowContextMenu(true)
    }, 500)
  }, [])

  const handleTouchEnd = useCallback(() => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current)
      longPressTimerRef.current = null
    }
  }, [])

  const handleTouchMove = useCallback(() => {
    // Cancel long press if user moves their finger
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current)
      longPressTimerRef.current = null
    }
  }, [])

  const handleItemClick = useCallback(() => {
    // Don't open chat if context menu is shown
    if (!showContextMenu) {
      openChat(chat.id)
    }
  }, [showContextMenu, chat.id, openChat])

  const handleContextMenuAction = useCallback((action: string) => {
    setShowContextMenu(false)
    switch (action) {
      case 'pin':
        pinChat(chat.id)
        break
      case 'mute':
        muteChat(chat.id)
        break
      case 'clear-history':
        clearChatHistory(chat.id)
        break
      case 'delete':
        deleteChat(chat.id)
        break
      default:
        break
    }
  }, [chat.id, pinChat, muteChat, deleteChat, clearChatHistory])

  return (
    <>
      <div
        className={clsx(
          'chat-item flex items-center px-3 sm:px-4 py-2 sm:py-2.5 cursor-pointer gap-2 sm:gap-3 transition-colors',
          'hover:bg-[color:var(--tg-hover)] active:bg-[color:var(--tg-hover)]',
          isActive && 'bg-[color:var(--tg-blue-light)]'
        )}
        onClick={handleItemClick}
        onContextMenu={handleContextMenu}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      >
      <div className="relative flex-shrink-0">
        <img
          src={chat.avatar}
          alt={chat.name}
          loading="lazy"
          className="w-[45px] sm:w-[50px] h-[45px] sm:h-[50px] rounded-full object-cover"
        />
        {chat.online && (
          <div className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-400 border-2 border-[color:var(--tg-bg)] rounded-full"></div>
        )}
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-0.5 sm:gap-1">
        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            {chat.isPinned && (
              <i className="fas fa-thumbtack text-[10px] sm:text-[11px] text-[var(--tg-blue)] flex-shrink-0"></i>
            )}
            <span className="text-[14px] sm:text-[15px] font-semibold text-[var(--tg-text-primary)] truncate">{chat.name}</span>
            {chat.isGroup && (
              <span className="text-[10px] sm:text-[11px] text-[var(--tg-text-tertiary)] bg-[color:var(--tg-bg-secondary)] px-1.5 py-0.5 rounded flex-shrink-0">group</span>
            )}
            {!chat.isGroup && !chat.isSaved && (
              <span className="text-[10px] sm:text-[11px] text-[var(--tg-text-tertiary)] bg-[color:var(--tg-bg-secondary)] px-1.5 py-0.5 rounded flex-shrink-0">pv</span>
            )}
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {chat.muted && (
              <i className="fas fa-bell-slash text-[11px] sm:text-[12px] text-[var(--tg-text-tertiary)]"></i>
            )}
            <span className="text-[11px] sm:text-[12px] text-[var(--tg-text-tertiary)]">{chat.time}</span>
          </div>
        </div>
        <div className="flex justify-between items-center gap-2">
          <div className="flex-1 min-w-0">
            {isChatTyping(chat.id) ? (
              <TypingIndicator chatId={chat.id} />
            ) : (
              <span className={clsx(
                'text-[13px] sm:text-[14px] truncate block',
                chat.muted ? 'text-[var(--tg-text-tertiary)]' : 'text-[var(--tg-text-secondary)]'
              )}>{chat.lastMessage}</span>
            )}
          </div>
          {chat.unread > 0 && !chat.muted && (
            <span className="bg-[color:var(--tg-blue)] text-white text-[10px] sm:text-[11px] font-semibold px-1 sm:px-1.5 py-0.5 rounded-full min-w-[18px] sm:min-w-[20px] text-center flex-shrink-0">
              {chat.unread > 99 ? '99+' : chat.unread}
            </span>
          )}
        </div>
      </div>
    </div>

    {/* Context Menu */}
    {showContextMenu && (
      <>
        <div
          className="fixed inset-0 z-[10000]"
          onClick={() => setShowContextMenu(false)}
          onTouchStart={(e) => {
            e.stopPropagation()
            setShowContextMenu(false)
          }}
        />
        <div
          className="chat-context-menu fixed bg-[color:var(--tg-bg)] rounded-lg shadow-[0_4px_16px_var(--tg-shadow)] min-w-[180px] sm:min-w-[200px] z-[10001] overflow-hidden"
          style={{
            left: Math.min(contextMenuPos.x, window.innerWidth - 200),
            top: Math.min(contextMenuPos.y, window.innerHeight - 200)
          }}
        >
          <div
            className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors text-[15px] text-[var(--tg-text-primary)] hover:bg-[color:var(--tg-hover)] active:bg-[color:var(--tg-hover)]"
            onClick={() => handleContextMenuAction('pin')}
          >
            <i className="fas fa-thumbtack text-[var(--tg-blue)]"></i>
            <span>Pin Chat</span>
          </div>
          <div
            className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors text-[15px] text-[var(--tg-text-primary)] hover:bg-[color:var(--tg-hover)] active:bg-[color:var(--tg-hover)]"
            onClick={() => handleContextMenuAction('mute')}
          >
            <i className="fas fa-bell-slash text-[var(--tg-blue)]"></i>
            <span>Mute Notifications</span>
          </div>
          <div className="h-px bg-[color:var(--tg-border)] my-1"></div>
          <div
            className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors text-[15px] text-red-500 hover:bg-[color:var(--tg-hover)] active:bg-[color:var(--tg-hover)]"
            onClick={() => handleContextMenuAction('clear-history')}
          >
            <i className="fas fa-broom text-red-500"></i>
            <span>Clear History</span>
          </div>
          <div
            className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors text-[15px] text-red-500 hover:bg-[color:var(--tg-hover)] active:bg-[color:var(--tg-hover)]"
            onClick={() => handleContextMenuAction('delete')}
          >
            <i className="fas fa-trash text-red-500"></i>
            <span>Delete Chat</span>
          </div>
        </div>
      </>
    )}
    </>
  )
}
