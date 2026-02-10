import { useTelegram } from '../../contexts/TelegramContext'
import { callHistoryData } from '../../data'

export function CallHistoryModal() {
  const { modals, closeModal } = useTelegram()

  if (!modals.callHistory) return null

  return (
    <div
      className="modal-overlay fixed inset-0 bg-[color:var(--tg-overlay)] flex items-center justify-center z-[10000]"
      onClick={() => closeModal('callHistory')}
    >
      <div
        className="modal-content bg-[color:var(--tg-bg)] rounded-xl w-[90%] max-w-[600px] max-h-[80vh] flex flex-col shadow-[0_8px_32px_var(--tg-shadow)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 flex items-center justify-between border-b border-[color:var(--tg-border)]">
          <h2 className="text-[18px] font-semibold text-[var(--tg-text-primary)]">Call History</h2>
          <button
            className="w-9 h-9 flex items-center justify-center bg-transparent border-none text-[var(--tg-text-secondary)] cursor-pointer text-xl rounded-full transition-colors hover:bg-[color:var(--tg-hover)]"
            onClick={() => closeModal('callHistory')}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-0 modal-scrollable">
          <div className="max-h-[500px] overflow-y-auto">
            {callHistoryData.map(call => (
              <div
                key={call.id}
                className="flex items-center gap-3 px-4 py-3 border-b border-[color:var(--tg-border)] transition-colors hover:bg-[color:var(--tg-hover)]"
              >
                <img src={call.avatar} alt={call.name} className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0" loading="lazy" />
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] sm:text-[15px] font-medium text-[var(--tg-text-primary)] mb-0.5 truncate">{call.name}</div>
                  <div className="flex flex-wrap items-center gap-1.5 text-[12px] sm:text-[13px] text-[var(--tg-text-secondary)]">
                    <i
                      className={`fas ${call.type === 'video' ? 'fa-video' : 'fa-phone'} text-xs ${call.type === 'incoming' ? 'fa-flip-horizontal' : ''}`}
                    ></i>
                    <span className="truncate">{call.type === 'video' ? 'Video' : call.type === 'outgoing' ? 'Outgoing' : 'Incoming'}</span>
                    {call.missed && <span className="text-red-400 truncate">(missed)</span>}
                    <span className="text-[var(--tg-text-tertiary)]">•</span>
                    <span className="truncate">{call.time}</span>
                  </div>
                </div>
                <div className="text-[12px] sm:text-[14px] text-[var(--tg-text-secondary)] px-2 py-1 bg-[color:var(--tg-bg-secondary)] rounded flex-shrink-0">
                  {call.duration}
                </div>
                <div className="flex gap-1.5 sm:gap-2 flex-shrink-0">
                  <button className="w-8 h-8 sm:w-9 sm:h-9 border-none bg-[color:var(--tg-blue)] text-white rounded-full cursor-pointer flex items-center justify-center text-xs sm:text-sm transition-colors hover:bg-[color:var(--tg-blue-dark)]">
                    <i className="fas fa-phone"></i>
                  </button>
                  <button className="w-8 h-8 sm:w-9 sm:h-9 border-none bg-[color:var(--tg-blue)] text-white rounded-full cursor-pointer flex items-center justify-center text-xs sm:text-sm transition-colors hover:bg-[color:var(--tg-blue-dark)]">
                    <i className="fas fa-video"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
