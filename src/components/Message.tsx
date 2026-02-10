import { useState, useCallback, useRef } from 'react'
import { useTelegram } from '../contexts/TelegramContext'
import { clsx } from 'clsx'
import type { Message as MessageType } from '../types'

interface MessageProps {
  message: MessageType
}

export function Message({ message }: MessageProps) {
  const { startReply, startEdit, startForward } = useTelegram()
  const [showContextMenu, setShowContextMenu] = useState(false)
  const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 })
  const tapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const tapCountRef = useRef(0)

  const handleDoubleClick = useCallback(() => {
    startReply(message)
  }, [message, startReply])

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

  // Handle double-tap on mobile for reply
  const handleTap = useCallback(() => {
    // Don't trigger tap if context menu is shown
    if (showContextMenu) return

    tapCountRef.current += 1
    if (tapTimeoutRef.current) {
      clearTimeout(tapTimeoutRef.current)
    }
    tapTimeoutRef.current = setTimeout(() => {
      tapCountRef.current = 0
    }, 300)

    if (tapCountRef.current === 2) {
      // Double tap - start reply
      startReply(message)
      tapCountRef.current = 0
    }
  }, [showContextMenu, message, startReply])

  const handleContextMenuAction = useCallback((action: string) => {
    setShowContextMenu(false)
    switch (action) {
      case 'reply':
        startReply(message)
        break
      case 'forward':
        startForward(message)
        break
      case 'edit':
        startEdit(message)
        break
      case 'delete':
        // Handle delete
        break
      default:
        break
    }
  }, [message, startReply, startEdit, startForward])

  return (
    <>
      <div
        className={clsx(
          'message flex max-w-[85%] sm:max-w-[70%] animate-message-in relative',
          message.outgoing ? 'self-end flex-row-reverse' : 'self-start'
        )}
        onDoubleClick={handleDoubleClick}
        onContextMenu={handleContextMenu}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        onClick={handleTap}
      >
        {message.forwardedFrom && (
          <div className="flex items-center gap-2 mb-2 px-2 py-1.5 bg-[color:var(--tg-bg-secondary)] rounded-lg overflow-hidden">
            <i className="fas fa-share text-[var(--tg-blue)] text-xs flex-shrink-0"></i>
            <div className="text-[12px] text-[var(--tg-text-secondary)]">
              Forwarded from <span className="font-semibold text-[var(--tg-text-primary)]">{message.forwardedFrom}</span>
            </div>
          </div>
        )}
        {message.replyTo && (
          <div className="flex items-center gap-2 mb-2 px-2 py-1.5 bg-[color:var(--tg-bg-secondary)] rounded-lg border-l-2 border-[color:var(--tg-blue)] overflow-hidden">
            <div className="w-0.5 h-5 bg-[color:var(--tg-blue)] rounded-sm flex-shrink-0"></div>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-semibold text-[var(--tg-blue)] mb-0.5 truncate">
                {message.replyTo.name}
              </div>
              <div className="text-[12px] text-[var(--tg-text-secondary)] truncate">
                {message.replyTo.text || 'Media'}
              </div>
            </div>
          </div>
        )}
        <div
          className={clsx(
            'px-3 py-2 rounded-xl shadow-sm',
            message.outgoing
              ? 'bg-[color:var(--tg-message-out)] rounded-tr-sm'
              : 'bg-[color:var(--tg-message-in)] rounded-tl-sm'
          )}
        >
          {message.type === 'image' ? (
            <div className="mb-1">
              <img
                src={message.url}
                alt={message.text}
                loading="lazy"
                className="max-w-full max-h-[300px] rounded-lg block object-cover"
              />
              {message.text && (
                <div className="mt-1 text-[15px] leading-relaxed break-words text-[var(--tg-text-primary)]">
                  {message.text}
                </div>
              )}
            </div>
          ) : message.type === 'video' ? (
            <div className="mb-1">
              <div className="relative inline-block">
                <img
                  src={message.url}
                  alt={message.text}
                  loading="lazy"
                  className="max-w-full max-h-[300px] rounded-lg block object-cover"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 rounded-full flex items-center justify-center text-white text-xl">
                  <i className="fas fa-play"></i>
                </div>
              </div>
              {message.text && (
                <div className="mt-1 text-[15px] leading-relaxed break-words text-[var(--tg-text-primary)]">
                  {message.text}
                </div>
              )}
            </div>
          ) : (
            <div className="text-[15px] leading-relaxed break-words text-[var(--tg-text-primary)]">
              {message.text}
            </div>
          )}
          <div
            className={clsx(
              'text-[11px] text-[var(--tg-text-tertiary)] mt-1 flex justify-end gap-1',
              message.outgoing && 'text-green-500'
            )}
          >
            {message.edited && <span className="text-[10px] italic mr-1">edited</span>}
            {message.time}
            {message.outgoing && (
              <i
                className={clsx(
                  'fas fa-check-double text-xs',
                  message.status === 'read' ? 'text-green-500' : 'text-[var(--tg-text-tertiary)]'
                )}
              ></i>
            )}
            {message.forwardedFrom && (
              <i className="fas fa-share text-[11px] ml-1" title={`Forwarded from ${message.forwardedFrom}`}></i>
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
            className="message-context-menu fixed bg-[color:var(--tg-bg)] rounded-lg shadow-[0_4px_16px_var(--tg-shadow)] min-w-[180px] sm:min-w-[200px] z-[10001] overflow-hidden"
            style={{
              left: Math.min(contextMenuPos.x, window.innerWidth - 200),
              top: Math.min(contextMenuPos.y, window.innerHeight - 200)
            }}
          >
            <div
              className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors text-[15px] text-[var(--tg-text-primary)] hover:bg-[color:var(--tg-hover)] active:bg-[color:var(--tg-hover)]"
              onClick={() => handleContextMenuAction('reply')}
            >
              <i className="fas fa-reply text-[var(--tg-blue)]"></i>
              <span>Reply</span>
            </div>
            <div
              className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors text-[15px] text-[var(--tg-text-primary)] hover:bg-[color:var(--tg-hover)] active:bg-[color:var(--tg-hover)]"
              onClick={() => handleContextMenuAction('forward')}
            >
              <i className="fas fa-share text-[var(--tg-blue)]"></i>
              <span>Forward</span>
            </div>
            {message.outgoing && (
              <div
                className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors text-[15px] text-[var(--tg-text-primary)] hover:bg-[color:var(--tg-hover)] active:bg-[color:var(--tg-hover)]"
                onClick={() => handleContextMenuAction('edit')}
              >
                <i className="fas fa-pen text-[var(--tg-blue)]"></i>
                <span>Edit</span>
              </div>
            )}
            <div className="h-px bg-[color:var(--tg-border)] my-1"></div>
            {message.outgoing && (
              <div
                className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors text-[15px] text-red-500 hover:bg-[color:var(--tg-hover)] active:bg-[color:var(--tg-hover)]"
                onClick={() => handleContextMenuAction('delete')}
              >
                <i className="fas fa-trash"></i>
                <span>Delete</span>
              </div>
            )}
          </div>
        </>
      )}
    </>
  )
}
