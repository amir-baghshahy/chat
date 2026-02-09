export function EmptyState() {
  return (
    <div className="flex-1 flex items-center justify-center bg-[color:var(--tg-bg-secondary)]">
      <div className="text-center text-[color:var(--tg-text-tertiary)]">
        <i className="fas fa-comments text-[80px] mb-5 opacity-30"></i>
        <h2 className="text-[24px] mb-2 text-[color:var(--tg-text-secondary)]">
          Welcome to Telegram
        </h2>
        <p className="text-[16px]">Select a chat to start messaging</p>
      </div>
    </div>
  )
}
