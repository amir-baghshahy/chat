import { useTelegram } from '../../store'
import { chatsData } from '../../data'
import type { Chat } from '../../types'

export function ForwardModal() {
  const { modals, closeModal, currentChat, forwardingMessage, forwardMessageToChat, showToast } = useTelegram()

  if (!modals.forward) return null

  const handleForwardToChat = (chat: Chat) => {
    if (!forwardingMessage) return
    forwardMessageToChat(forwardingMessage, chat.id, currentChat?.name || 'Unknown')
    closeModal('forward')
    showToast('Success', `Message forwarded to ${chat.name}`, 'success')
  }

  const availableChats = chatsData.filter(c => c.id !== currentChat?.id)

  return (
    <div
      className="modal-overlay fixed inset-0 bg-[color:var(--tg-overlay)] flex items-center justify-center z-[10000]"
      onClick={() => closeModal('forward')}
    >
      <div
        className="modal-content bg-[color:var(--tg-bg)] rounded-xl w-[90%] max-w-[500px] max-h-[80vh] flex flex-col shadow-[0_8px_32px_var(--tg-shadow)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 flex items-center justify-between border-b border-[color:var(--tg-border)]">
          <h2 className="text-[18px] font-semibold text-[var(--tg-text-primary)]">Forward Message</h2>
          <button
            className="w-9 h-9 flex items-center justify-center bg-transparent border-none text-[var(--tg-text-secondary)] cursor-pointer text-xl rounded-full transition-colors hover:bg-[color:var(--tg-hover)]"
            onClick={() => closeModal('forward')}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 modal-scrollable">
          {availableChats.map(chat => (
            <div
              key={chat.id}
              className="flex items-center gap-3 px-4 py-3 cursor-pointer rounded-lg transition-colors hover:bg-[color:var(--tg-hover)]"
              onClick={() => handleForwardToChat(chat)}
            >
              <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0" loading="lazy" />
              <div className="flex-1 min-w-0">
                <div className="text-[15px] font-semibold text-[var(--tg-text-primary)] truncate">{chat.name}</div>
                <div className="text-[13px] text-[var(--tg-text-tertiary)] mt-0.5">
                  {chat.online ? 'online' : 'last seen recently'}
                </div>
              </div>
              <i className="fas fa-chevron-right text-[var(--tg-text-tertiary)] text-sm"></i>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
