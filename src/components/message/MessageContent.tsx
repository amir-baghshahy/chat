import { clsx } from 'clsx'
import type { Message as MessageType } from '../../types'

interface MessageContentProps {
  message: MessageType
  onReplyClick?: (messageId: number) => void
  onForwardClick?: (fromName: string) => void
}

export function MessageContent({ message, onReplyClick, onForwardClick }: MessageContentProps) {
  return (
    <>
      {message.forwardedFrom && (
        <div
          className={clsx(
            'flex items-center gap-2 mb-2 px-2 py-1.5 rounded-lg cursor-pointer transition-all',
            'bg-[color:var(--tg-bg-secondary)] border border-[color:var(--tg-border)]',
            'hover:bg-[color:var(--tg-hover)] active:scale-[0.98]'
          )}
          onClick={() => onForwardClick?.(message.forwardedFrom!)}
          title="Click to view profile"
        >
          <div className="w-5 h-5 bg-[color:var(--tg-blue-light)] rounded-full flex items-center justify-center flex-shrink-0">
            <i className="fas fa-share text-[var(--tg-blue)] text-[9px]"></i>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] text-[var(--tg-text-secondary)] uppercase tracking-wide font-medium">
              Forwarded
            </div>
            <div className="text-[12px] text-[var(--tg-text-primary)] font-semibold truncate">
              from {message.forwardedFrom}
            </div>
          </div>
        </div>
      )}
      {message.replyTo && (
        <div
          className={clsx(
            'mb-2 pb-2 border-b border-black/15 dark:border-white/15 cursor-pointer rounded px-1 -mx-1 transition-all',
            'hover:bg-black/5 dark:hover:bg-white/5 active:scale-[0.98]'
          )}
          onClick={() => onReplyClick?.(message.replyTo!.id)}
          title="Click to view original message"
        >
          <div className="text-[11px] text-[var(--tg-text-secondary)] mb-0.5">
            <span className="text-[var(--tg-blue)] font-semibold">{message.replyTo.name}</span>
          </div>
          <div className="text-[12px] text-[var(--tg-text-primary)] truncate font-medium">
            {message.replyTo.text || 'Media'}
          </div>
        </div>
      )}
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
      ) : message.type === 'file' ? (
        <div className="mb-1">
          <div className="flex items-center gap-3 p-3 bg-[color:var(--tg-bg-secondary)] rounded-lg">
            <div className="w-12 h-12 bg-[color:var(--tg-blue)] rounded-lg flex items-center justify-center flex-shrink-0">
              <i className="fas fa-file text-white text-lg"></i>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-medium text-[var(--tg-text-primary)] truncate">{message.fileName || 'File'}</div>
              <div className="text-[11px] text-[var(--tg-text-tertiary)]">{message.fileSize || 'Unknown size'}</div>
            </div>
            <i className="fas fa-download text-[var(--tg-blue)]"></i>
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
      <div className="text-[11px] text-[var(--tg-text-tertiary)] dark:text-white/60 mt-1 flex justify-end gap-1 items-center">
        {message.edited && <span className="text-[10px] italic mr-1 dark:text-white/60">edited</span>}
        {message.time}
        {message.outgoing && (
          <i
            className={clsx(
              'text-xs ml-1',
              message.status === 'read'
                ? 'fas fa-check-double text-white dark:text-white'
                : 'fas fa-check text-[var(--tg-text-tertiary)] dark:text-white/50'
            )}
          ></i>
        )}
        {message.forwardedFrom && (
          <i className="fas fa-share text-[11px] ml-1 dark:text-white/60" title={`Forwarded from ${message.forwardedFrom}`}></i>
        )}
      </div>
    </>
  )
}
