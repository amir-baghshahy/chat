import { useState, useCallback, useRef } from 'react'
import { useTelegram } from '../context/TelegramContext'
import { clsx } from 'clsx'
import { MessageContent } from './message/MessageContent'
import { MessageContextMenu } from './message/MessageContextMenu'
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
    if (action === 'close') {
      setShowContextMenu(false)
      return
    }
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
        // TODO: Backend - Delete message API call
        // DELETE /api/messages/{messageId}
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
        <div
          className={clsx(
            'px-3 py-2 rounded-xl shadow-sm flex flex-col',
            message.outgoing
              ? 'bg-[color:var(--tg-message-out)] rounded-tr-sm'
              : 'bg-[color:var(--tg-message-in)] rounded-tl-sm'
          )}
        >
          <MessageContent message={message} />
        </div>
      </div>

      {/* Context Menu */}
      {showContextMenu && <MessageContextMenu message={message} position={contextMenuPos} onAction={handleContextMenuAction} />}
    </>
  )
}
