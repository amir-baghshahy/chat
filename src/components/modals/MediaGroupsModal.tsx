import { useTelegram } from '../../store'

export function MediaGroupsModal() {
  const { modals, closeModal } = useTelegram()

  if (!modals.mediaGroups) return null

  return (
    <div
      className="modal-overlay fixed inset-0 bg-[color:var(--tg-overlay)] flex items-center justify-center z-[10000]"
      onClick={() => closeModal('mediaGroups')}
    >
      <div
        className="modal-content bg-[color:var(--tg-bg)] rounded-xl w-[90%] max-w-[500px] max-h-[80vh] flex flex-col shadow-[0_8px_32px_var(--tg-shadow)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 flex items-center justify-between border-b border-[color:var(--tg-border)]">
          <h2 className="text-[18px] font-semibold text-[var(--tg-text-primary)]">Groups in Common</h2>
          <button
            className="w-9 h-9 flex items-center justify-center bg-transparent border-none text-[var(--tg-text-secondary)] cursor-pointer text-xl rounded-full transition-colors hover:bg-[color:var(--tg-hover)]"
            onClick={() => closeModal('mediaGroups')}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 modal-scrollable">
          {/* TODO: Backend - Fetch actual groups in common */}
          <div className="text-center text-[var(--tg-text-secondary)] py-8">
            <i className="fas fa-users text-4xl mb-3 opacity-50"></i>
            <p>No groups in common</p>
          </div>
        </div>
      </div>
    </div>
  )
}
