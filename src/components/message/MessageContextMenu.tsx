import type { Message as MessageType } from '../../types'

interface MessageContextMenuProps {
  message: MessageType
  position: { x: number; y: number }
  onAction: (action: string) => void
}

export function MessageContextMenu({ message, position, onAction }: MessageContextMenuProps) {
  return (
    <>
      <div
        className="fixed inset-0 z-[10000]"
        onClick={() => onAction('close')}
        onTouchStart={(e) => {
          e.stopPropagation()
          onAction('close')
        }}
      />
      <div
        className="message-context-menu fixed bg-[color:var(--tg-bg)] rounded-lg shadow-[0_4px_16px_var(--tg-shadow)] min-w-[180px] sm:min-w-[200px] z-[10001] overflow-hidden"
        style={{
          left: Math.min(position.x, window.innerWidth - 200),
          top: Math.min(position.y, window.innerHeight - 200),
        }}
      >
        <div
          className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors text-[15px] text-[var(--tg-text-primary)] hover:bg-[color:var(--tg-hover)] active:bg-[color:var(--tg-hover)]"
          onClick={() => onAction('reply')}
        >
          <i className="fas fa-reply text-[var(--tg-blue)]"></i>
          <span>Reply</span>
        </div>
        <div
          className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors text-[15px] text-[var(--tg-text-primary)] hover:bg-[color:var(--tg-hover)] active:bg-[color:var(--tg-hover)]"
          onClick={() => onAction('forward')}
        >
          <i className="fas fa-share text-[var(--tg-blue)]"></i>
          <span>Forward</span>
        </div>
        {message.outgoing && (
          <div
            className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors text-[15px] text-[var(--tg-text-primary)] hover:bg-[color:var(--tg-hover)] active:bg-[color:var(--tg-hover)]"
            onClick={() => onAction('edit')}
          >
            <i className="fas fa-pen text-[var(--tg-blue)]"></i>
            <span>Edit</span>
          </div>
        )}
        <div className="h-px bg-[color:var(--tg-border)] my-1"></div>
        {message.outgoing && (
          <div
            className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors text-[15px] text-red-500 hover:bg-[color:var(--tg-hover)] active:bg-[color:var(--tg-hover)]"
            onClick={() => onAction('delete')}
          >
            <i className="fas fa-trash"></i>
            <span>Delete</span>
          </div>
        )}
      </div>
    </>
  )
}
