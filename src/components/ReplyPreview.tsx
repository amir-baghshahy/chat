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
    <div className="flex items-center gap-2 px-5 py-2 bg-[color:var(--tg-bg-secondary)] border-t border-[color:var(--tg-border)]">
      {mode === 'reply' ? (
        <>
          <div className="w-0.5 h-5 bg-[color:var(--tg-blue)] rounded-sm"></div>
          <div className="flex-1">
            <div className="text-[12px] font-semibold text-[var(--tg-blue)]">
              {currentChat?.name}
            </div>
            <div className="text-[12px] text-[var(--tg-text-secondary)] truncate max-w-[150px] sm:max-w-[300px]">
              {message.text || 'Media'}
            </div>
          </div>
        </>
      ) : (
        <>
          <i className="fas fa-pen text-[var(--tg-blue)]"></i>
          <div className="flex-1">
            <div className="text-[12px] font-semibold text-[var(--tg-text-secondary)]">
              Edit message
            </div>
            {message.text && (
              <div className="text-[12px] text-[var(--tg-text-tertiary)] truncate max-w-[150px] sm:max-w-[300px]">
                {message.text.substring(0, 50)}
                {message.text.length > 50 ? '...' : ''}
              </div>
            )}
          </div>
        </>
      )}
      <button
        className="bg-transparent border-none text-[var(--tg-text-secondary)] cursor-pointer p-1 hover:text-[var(--tg-text-primary)] transition-colors"
        onClick={onCancel}
      >
        <i className="fas fa-times"></i>
      </button>
    </div>
  )
}
