import { useTelegram } from '../contexts/TelegramContext'
import type { Message as MessageType } from '../types'

interface ReplyPreviewProps {
  message: MessageType | null
  mode: 'reply' | 'edit'
  onCancel: () => void
}

export function ReplyPreview({ message, mode, onCancel }: ReplyPreviewProps) {
  const { currentChat } = useTelegram()

  if (!message) return null

  return (
    <div className="flex items-center gap-2 px-3 sm:px-5 py-2 bg-[color:var(--tg-bg-secondary)] border-t border-[color:var(--tg-border)]">
      {mode === 'reply' ? (
        <>
          <div className="w-0.5 h-5 bg-[color:var(--tg-blue)] rounded-sm flex-shrink-0"></div>
          <div className="flex-1 min-w-0">
            <div className="text-[12px] sm:text-[13px] font-semibold text-[var(--tg-blue)]">
              {currentChat?.name}
            </div>
            <div className="text-[11px] sm:text-[12px] text-[var(--tg-text-secondary)] truncate">
              {message.text || 'Media'}
            </div>
          </div>
        </>
      ) : (
        <>
          <i className="fas fa-pen text-[var(--tg-blue)] text-sm flex-shrink-0"></i>
          <div className="flex-1 min-w-0">
            <div className="text-[12px] sm:text-[13px] font-semibold text-[var(--tg-text-secondary)]">
              Edit message
            </div>
            {message.text && (
              <div className="text-[11px] sm:text-[12px] text-[var(--tg-text-tertiary)] truncate">
                {message.text.substring(0, 50)}
                {message.text.length > 50 ? '...' : ''}
              </div>
            )}
          </div>
        </>
      )}
      <button
        className="bg-transparent border-none text-[var(--tg-text-secondary)] cursor-pointer p-1 hover:text-[var(--tg-text-primary)] transition-colors flex-shrink-0"
        onClick={onCancel}
      >
        <i className="fas fa-times text-sm"></i>
      </button>
    </div>
  )
}
