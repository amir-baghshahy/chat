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
      case 'search':
        // TODO: Backend - Search messages API call
        // GET /api/chats/{chatId}/search?q={query}
        break
      case 'mute-notifications':
        // TODO: Backend - Mute chat API call
        // POST /api/chats/{chatId}/mute
        break
      case 'clear-history':
        // TODO: Backend - Clear chat history API call
        // DELETE /api/chats/{chatId}/messages
        break
      case 'delete-chat':
        // TODO: Backend - Delete chat API call
        // DELETE /api/chats/{chatId}
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
    <div className="chat-actions-menu fixed top-12 sm:top-14 right-2 sm:right-4 bg-[color:var(--tg-bg)] rounded-lg shadow-[0_4px_16px_var(--tg-shadow)] min-w-[180px] sm:min-w-[200px] z-[1001] overflow-hidden">
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors text-[15px] text-[var(--tg-text-primary)] hover:bg-[color:var(--tg-hover)]"
        onClick={() => handleAction('view-profile')}
      >
        <i className="fas fa-user text-[var(--tg-text-secondary)] text-center w-5"></i>
        <span>View Profile</span>
      </div>
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors text-[15px] text-[var(--tg-text-primary)] hover:bg-[color:var(--tg-hover)]"
        onClick={() => handleAction('search')}
      >
        <i className="fas fa-search text-[var(--tg-text-secondary)] text-center w-5"></i>
        <span>Search</span>
      </div>
      <div className="h-px bg-[color:var(--tg-border)] my-1"></div>
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors text-[15px] text-[var(--tg-text-primary)] hover:bg-[color:var(--tg-hover)]"
        onClick={() => handleAction('mute-notifications')}
      >
        <i className="fas fa-bell-slash text-[var(--tg-text-secondary)] text-center w-5"></i>
        <span>Mute Notifications</span>
      </div>
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors text-[15px] text-[var(--tg-text-primary)] hover:bg-[color:var(--tg-hover)]"
        onClick={() => handleAction('clear-history')}
      >
        <i className="fas fa-broom text-[var(--tg-text-secondary)] text-center w-5"></i>
        <span>Clear History</span>
      </div>
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors text-[15px] text-red-500 hover:bg-[color:var(--tg-hover)]"
        onClick={() => handleAction('delete-chat')}
      >
        <i className="fas fa-trash text-center w-5"></i>
        <span>Delete Chat</span>
      </div>
    </div>
  )
}
