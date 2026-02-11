import { useTelegram } from '../../store'

/** Typing indicator - shows "typing..." animation */
export function TypingIndicator({ chatId }: { chatId: number }) {
  const { isChatTyping } = useTelegram()
  const isTyping = isChatTyping(chatId)

  if (!isTyping) return null

  return (
    <div className="flex items-center gap-1.5 text-[13px] text-[var(--tg-text-secondary)]">
      <span>typing</span>
      <div className="flex gap-0.5 items-end h-3">
        <div className="w-1 h-1 bg-[var(--tg-text-secondary)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-1 h-1 bg-[var(--tg-text-secondary)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-1 h-1 bg-[var(--tg-text-secondary)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  )
}

/** Uploading file indicator - shows file upload progress */
export function UploadingFileIndicator({ chatId }: { chatId: number }) {
  const { getUploadingFile } = useTelegram()
  const uploadingFile = getUploadingFile(chatId)

  if (!uploadingFile) return null

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-[color:var(--tg-bg-secondary)] rounded-lg">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <i className="fas fa-file text-[var(--tg-text-secondary)] text-sm flex-shrink-0"></i>
        <span className="text-[13px] text-[var(--tg-text-primary)] truncate">{uploadingFile.name}</span>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="text-[12px] text-[var(--tg-text-secondary)]">{uploadingFile.progress}%</span>
        <i className="fas fa-times text-[var(--tg-text-secondary)] hover:text-[var(--tg-text-primary)] cursor-pointer text-sm"></i>
      </div>
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[color:var(--tg-bg)] rounded-b-lg overflow-hidden">
        <div
          className="h-full bg-[var(--tg-blue)] transition-all duration-300"
          style={{ width: `${uploadingFile.progress}%` }}
        ></div>
      </div>
    </div>
  )
}
