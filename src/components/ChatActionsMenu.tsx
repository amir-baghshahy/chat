import { useTelegram } from '../contexts/TelegramContext'
import { useEffect } from 'react'

export function ChatActionsMenu() {
  const { modals, closeModal, openModal } = useTelegram()

  const handleAction = (action: string) => {
    closeModal('chatActions')
    switch (action) {
      case 'view-profile':
        openModal('profile')
        break
      case 'mute-notifications':
        // Handle mute
        break
      case 'clear-history':
        // Handle clear history
        break
      case 'delete-chat':
        // Handle delete chat
        break
      default:
        break
    }
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (modals.chatActions && !target.closest('.chat-actions-menu') && !target.closest('[data-action="more-options"]')) {
        closeModal('chatActions')
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [modals.chatActions, closeModal])

  if (!modals.chatActions) return null

  return (
    <div className="chat-actions-menu absolute top-15 right-2 sm:right-5 bg-[color:var(--tg-bg)] rounded-lg shadow-[0_4px_16px_var(--tg-shadow)] min-w-[200px] sm:min-w-[220px] z-[1000] hidden overflow-hidden animate-menu-fade block">
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors text-[15px] text-[color:var(--tg-text-primary)] hover:bg-[color:var(--tg-hover)]"
        onClick={() => handleAction('view-profile')}
      >
        <i className="w-5 text-[color:var(--tg-text-secondary)] text-center">👤</i>
        <span>View Profile</span>
      </div>
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors text-[15px] text-[color:var(--tg-text-primary)] hover:bg-[color:var(--tg-hover)]"
        onClick={() => handleAction('search')}
      >
        <i className="w-5 text-[color:var(--tg-text-secondary)] text-center">🔍</i>
        <span>Search</span>
      </div>
      <div className="h-px bg-[color:var(--tg-border)] my-1"></div>
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors text-[15px] text-[color:var(--tg-text-primary)] hover:bg-[color:var(--tg-hover)]"
        onClick={() => handleAction('mute-notifications')}
      >
        <i className="w-5 text-[color:var(--tg-text-secondary)] text-center">🔕</i>
        <span>Mute Notifications</span>
      </div>
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors text-[15px] text-[color:var(--tg-text-primary)] hover:bg-[color:var(--tg-hover)]"
        onClick={() => handleAction('clear-history')}
      >
        <i className="w-5 text-[color:var(--tg-text-secondary)] text-center">🧹</i>
        <span>Clear History</span>
      </div>
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors text-[15px] text-red-500 hover:bg-[color:var(--tg-hover)]"
        onClick={() => handleAction('delete-chat')}
      >
        <i className="w-5 text-center">🗑️</i>
        <span>Delete Chat</span>
      </div>
    </div>
  )
}
