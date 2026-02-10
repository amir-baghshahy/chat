import { clsx } from 'clsx'
import type { Message as MessageType } from '../../types'

interface MessageContentProps {
  message: MessageType
}

export function MessageContent({ message }: MessageContentProps) {
  return (
    <>
      {message.forwardedFrom && (
        <div className="flex items-center gap-2 mb-2 text-[11px] text-[var(--tg-text-tertiary)]">
          <i className="fas fa-share text-[var(--tg-blue)] text-[10px] flex-shrink-0"></i>
          <span>
            Forwarded from <span className="text-[var(--tg-text-secondary)] dark:text-[var(--tg-text-secondary)] font-medium">{message.forwardedFrom}</span>
          </span>
        </div>
      )}
      {message.replyTo && (
        <div className="mb-2 pb-2 border-b border-black/10 dark:border-white/10">
          <div className="text-[11px] text-[var(--tg-text-tertiary)] mb-0.5">
            <span className="text-[var(--tg-blue)] dark:text-[var(--tg-blue)] font-medium">{message.replyTo.name}</span>
          </div>
          <div className="text-[12px] text-[var(--tg-text-secondary)] truncate opacity-90 dark:opacity-80">
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
    </>
  )
}
