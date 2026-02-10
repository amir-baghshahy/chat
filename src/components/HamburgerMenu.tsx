import { useTelegram } from '../contexts/TelegramContext'
import { currentUser } from '../data'

export function HamburgerMenu() {
  const { modals, closeModal, openModal, toggleDarkMode, isDarkMode, openChat } = useTelegram()

  if (!modals.hamburger) return null

  const handleAction = (action: string) => {
    switch (action) {
      case 'new-group':
        closeModal('hamburger')
        openModal('newGroup')
        break
      case 'contacts':
        closeModal('hamburger')
        openModal('contacts')
        break
      case 'calls':
        closeModal('hamburger')
        openModal('callHistory')
        break
      case 'saved':
        closeModal('hamburger')
        openChat(999) // Saved Messages chat id
        break
      case 'settings':
        closeModal('hamburger')
        openModal('settings')
        break
      case 'dark-mode':
        toggleDarkMode()
        break
      case 'help':
        // Handle help
        break
      default:
        break
    }
  }

  return (
    <>
      <aside
        className={`hamburger-menu fixed top-0 h-screen w-full sm:w-[var(--hamburger-width)] bg-[color:var(--tg-bg)] shadow-[2px_0_8px_var(--tg-shadow)] transition-all duration-300 z-[9999] flex flex-col ${
          modals.hamburger ? 'left-0' : '-left-full'
        }`}
      >
        {/* Header */}
        <div className="px-5 py-5 border-b border-[color:var(--tg-border)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={currentUser.avatar}
              alt="Profile"
              loading="lazy"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <h3 className="text-base font-semibold text-[var(--tg-text-primary)]">
                {currentUser.firstName} {currentUser.lastName}
              </h3>
              <p className="text-sm text-[var(--tg-text-tertiary)]">{currentUser.username}</p>
            </div>
          </div>
          <button
            className="bg-transparent border-none text-[var(--tg-text-secondary)] cursor-pointer p-2 rounded-full transition-colors hover:bg-[color:var(--tg-hover)] hover:text-[var(--tg-text-primary)]"
            onClick={() => closeModal('hamburger')}
          >
            <i className="fas fa-times text-lg"></i>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-2">
          <MenuItem icon="fa-user-group" label="New Group" onClick={() => handleAction('new-group')} />
          <MenuItem icon="fa-address-book" label="Contacts" onClick={() => handleAction('contacts')} />
          <MenuItem icon="fa-phone" label="Calls" onClick={() => handleAction('calls')} />
          <MenuItem icon="fa-bookmark" label="Saved Messages" onClick={() => handleAction('saved')} />
          <MenuItem icon="fa-cog" label="Settings" onClick={() => handleAction('settings')} />
          <div className="h-px bg-[color:var(--tg-border)] my-2"></div>
          <MenuItem
            icon={isDarkMode ? 'fa-sun' : 'fa-moon'}
            label={isDarkMode ? 'Light Mode' : 'Dark Mode'}
            onClick={() => handleAction('dark-mode')}
          />
        </nav>

        {/* Footer */}
        <div className="border-t border-[color:var(--tg-border)] py-2">
          <MenuItem icon="fa-question-circle" label="Help" onClick={() => handleAction('help')} />
        </div>
      </aside>
    </>
  )
}

interface MenuItemProps {
  icon: string
  label: string
  onClick: () => void
}

function MenuItem({ icon, label, onClick }: MenuItemProps) {
  return (
    <div
      className="flex items-center px-5 py-3 cursor-pointer transition-colors gap-4 text-base text-[var(--tg-text-primary)] hover:bg-[color:var(--tg-hover)]"
      onClick={onClick}
    >
      <i className={`fas ${icon} text-lg w-6 text-[var(--tg-text-secondary)]`}></i>
      <span className="flex-1">{label}</span>
    </div>
  )
}
