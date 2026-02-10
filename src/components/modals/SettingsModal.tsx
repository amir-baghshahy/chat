import { useTelegram } from '../../contexts/TelegramContext'
import { currentUser } from '../../data'

export function SettingsModal() {
  const { modals, closeModal, openModal, goBackModal } = useTelegram()

  if (!modals.settings) return null

  const handleAction = (action: string) => {
    closeModal('settings')
    switch (action) {
      case 'my-account':
        openModal('myAccount')
        break
      case 'privacy':
        openModal('privacy')
        break
      case 'chat-settings':
        openModal('chatSettings')
        break
      case 'folders':
        openModal('folders')
        break
      default:
        break
    }
  }

  return (
    <div
      className="modal-overlay fixed inset-0 bg-[color:var(--tg-overlay)] flex items-center justify-center z-[10000] animate-fade-in"
      onClick={() => closeModal('settings')}
    >
      <div
        className="modal-content bg-[color:var(--tg-bg-secondary)] rounded-lg w-[90%] max-w-[380px] max-h-[80vh] flex flex-col shadow-[0_8px_32px_var(--tg-shadow)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 py-3 flex items-center bg-[color:var(--tg-bg-secondary)] border-b border-[color:var(--tg-border)]">
          <button
            className="w-9 h-9 flex items-center justify-center bg-transparent border-none text-[var(--tg-text-primary)] cursor-pointer text-lg hover:bg-[color:var(--tg-hover)] rounded-full mr-2"
            onClick={goBackModal}
          >
            <i className="fas fa-arrow-left"></i>
          </button>
          <h2 className="text-[18px] font-medium text-[var(--tg-text-primary)] flex-1">
            Settings
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-0 max-h-[80vh] bg-[color:var(--tg-bg)] modal-scrollable">
          {/* User Profile Section */}
          <div className="flex items-center gap-4 px-4 py-5 border-b border-[color:var(--tg-border)]">
            <img
              src={currentUser.avatar}
              alt="Profile"
              loading="lazy"
              className="w-20 h-20 rounded-full object-cover border-2 border-[color:var(--tg-text-primary)]"
            />
            <div className="flex flex-col gap-1">
              <div className="text-[16px] font-semibold text-[var(--tg-text-primary)]">
                {currentUser.firstName} {currentUser.lastName}
              </div>
              <div className="text-[14px] text-[var(--tg-text-secondary)]">
                {currentUser.phone}
              </div>
              <div className="text-[14px] text-[var(--tg-text-tertiary)]">
                {currentUser.username}
              </div>
            </div>
          </div>

          {/* Settings List */}
          <div className="py-2">
            <SettingsItem icon="fa-user" label="My Account" onClick={() => handleAction('my-account')} />
            <SettingsItem icon="fa-bell" label="Notifications and Sounds" onClick={() => {}} />
            <SettingsItem icon="fa-lock" label="Privacy and Security" onClick={() => handleAction('privacy')} />
            <SettingsItem icon="fa-comment-dots" label="Chat Settings" onClick={() => handleAction('chat-settings')} />
            <SettingsItem icon="fa-folder" label="Folders" onClick={() => handleAction('folders')} />
            <SettingsItem icon="fa-sliders" label="Advanced" onClick={() => {}} />
            <SettingsItem icon="fa-microphone-lines" label="Speakers and Camera" onClick={() => {}} />
            <SettingsItem icon="fa-battery-three-quarters" label="Battery and Animations" onClick={() => {}} />
          </div>
        </div>
      </div>
    </div>
  )
}

interface SettingsItemProps {
  icon: string
  label: string
  badge?: string
  onClick: () => void
}

function SettingsItem({ icon, label, badge, onClick }: SettingsItemProps) {
  return (
    <div
      className="flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-3 cursor-pointer transition-colors relative hover:bg-[color:var(--tg-hover)]"
      onClick={onClick}
    >
      <i className={`fas ${icon} text-lg sm:text-xl text-[var(--tg-text-primary)] w-6 sm:w-7 text-center flex-shrink-0`}></i>
      <span className="text-[14px] sm:text-[15px] text-[var(--tg-text-primary)] flex-1 truncate">{label}</span>
      {badge && <span className="text-[14px] text-[var(--tg-blue)] ml-auto flex-shrink-0">{badge}</span>}
    </div>
  )
}
