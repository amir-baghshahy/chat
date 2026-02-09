import { useTelegram } from '../contexts/TelegramContext'
import { currentUser } from '../data'

export function HamburgerMenu() {
  const { modals, closeModal, openModal, toggleDarkMode, isDarkMode } = useTelegram()

  if (!modals.hamburger) return null

  const handleAction = (action: string) => {
    closeModal('hamburger')
    switch (action) {
      case 'new-group':
        openModal('newGroup')
        break
      case 'contacts':
        openModal('contacts')
        break
      case 'calls':
        openModal('callHistory')
        break
      case 'saved':
        // Handle saved messages
        break
      case 'settings':
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
    <aside
      className={`fixed top-0 h-screen w-full sm:w-[var(--hamburger-width)] bg-[color:var(--tg-bg)] shadow-[2px_0_8px_var(--tg-shadow)] transition-all duration-300 z-[9999] flex flex-col
        ${modals.hamburger ? 'left-0' : '-left-full'}
      `}
    >
      <div className="px-5 py-5 border-b border-[color:var(--tg-border)]">
        <div className="flex items-center gap-3">
          <img
            src={currentUser.avatar}
            alt="Profile"
            className="w-[50px] h-[50px] rounded-full object-cover"
          />
          <div className="flex flex-col">
            <h3 className="text-[16px] font-semibold text-[color:var(--tg-text-primary)]">
              {currentUser.firstName} {currentUser.lastName}
            </h3>
            <p className="text-[13px] text-[color:var(--tg-text-tertiary)] mt-0.5">
              {currentUser.username}
            </p>
          </div>
        </div>
      </div>

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

      <div className="border-t border-[color:var(--tg-border)] py-2">
        <MenuItem icon="fa-question-circle" label="Help" onClick={() => handleAction('help')} />
      </div>
    </aside>
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
      className="flex items-center px-5 py-3 cursor-pointer transition-colors gap-4 text-[15px] text-[color:var(--tg-text-primary)] hover:bg-[color:var(--tg-hover)]"
      onClick={onClick}
    >
      <i className={`fas ${icon} text-[18px] w-6 text-[color:var(--tg-text-secondary)]`}></i>
      <span className="flex-1">{label}</span>
    </div>
  )
}
