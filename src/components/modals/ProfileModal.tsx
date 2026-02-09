import { useTelegram } from '../../contexts/TelegramContext'
import type { Chat } from '../../types'

export function ProfileModal() {
  const { modals, closeModal, currentChat, currentUser } = useTelegram()

  if (!modals.profile) return null

  const chat = currentChat || currentUser
  const isChat = currentChat !== null

  const displayName = isChat
    ? (chat as Chat).name
    : `${currentUser.firstName} ${currentUser.lastName}`
  const displayOnline = isChat
    ? (chat as Chat).online
    : false

  const handleAction = (action: string) => {
    // Handle profile actions
  }

  return (
    <div
      className="fixed inset-0 bg-[color:var(--tg-overlay)] flex items-center justify-center z-[10000]"
      onClick={() => closeModal('profile')}
    >
      <div
        className="bg-[color:var(--tg-bg-secondary)] rounded-lg w-[90%] max-w-[450px] max-h-[90vh] flex flex-col shadow-[0_8px_32px_var(--tg-shadow)] overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-[color:var(--tg-overlay)] border-none rounded-full text-[color:var(--tg-text-primary)] cursor-pointer z-10 text-sm"
          onClick={() => closeModal('profile')}
        >
          <i className="fas fa-times"></i>
        </button>

        <div className="flex-1 overflow-y-auto modal-scrollable">
          {/* Avatar & User Info */}
          <div className="flex flex-col items-center px-5 pt-15 pb-6 bg-[color:var(--tg-bg-secondary)]">
            <img
              src={chat.avatar}
              alt="Profile"
              className="w-[100px] h-[100px] rounded-full object-cover border-2 border-[color:var(--tg-text-primary)] mb-4"
            />
            <h3 className="text-[20px] font-semibold text-[color:var(--tg-text-primary)] mb-2 text-center">
              {displayName}
            </h3>
            <p className="text-[14px] text-[color:var(--tg-text-secondary)] mb-0 text-center italic">
              {displayOnline ? 'online' : 'last seen recently'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2.5 px-5 py-4 justify-center">
            <ProfileActionButton icon="fa-comment" label="Message" onClick={() => handleAction('message')} />
            <ProfileActionButton icon="fa-bell" label="Mute" onClick={() => handleAction('mute')} />
            <ProfileActionButton icon="fa-phone" label="Call" onClick={() => handleAction('call')} />
            <ProfileActionButton icon="fa-ellipsis" label="More" onClick={() => handleAction('more')} />
          </div>

          {/* Detailed Info */}
          <div className="px-5 py-4">
            <ProfileInfoItem icon="fa-mobile" label="Mobile" value={currentUser.phone} />
            <ProfileInfoItem icon="fa-info-circle" label="Bio" value={isChat && (chat as Chat).bio ? (chat as Chat).bio! : currentUser.bio!} />
            <ProfileInfoItem icon="fa-at" label="Username" value={isChat && (chat as Chat).username ? (chat as Chat).username! : currentUser.username!} />
          </div>

          {/* Media/Stats Section */}
          <div className="px-5 py-4 border-t border-[color:var(--tg-border)]">
            <ProfileMediaItem icon="fa-images" label="3 photos" />
            <ProfileMediaItem icon="fa-file" label="20 files" />
            <ProfileMediaItem icon="fa-link" label="62 shared links" />
            <ProfileMediaItem icon="fa-users" label="5 groups in common" />
          </div>

          {/* Share Option */}
          <div className="px-5 py-4 border-t border-[color:var(--tg-border)]">
            <button className="w-full flex items-center justify-center gap-2.5 py-3 bg-transparent border-none text-[color:var(--tg-text-primary)] cursor-pointer rounded-lg transition-colors hover:bg-[color:var(--tg-hover)] text-[15px]">
              <i className="fas fa-share text-base"></i>
              <span>Share this contact</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface ProfileActionButtonProps {
  icon: string
  label: string
  onClick: () => void
}

function ProfileActionButton({ icon, label, onClick }: ProfileActionButtonProps) {
  return (
    <button
      className="flex flex-col items-center gap-1.5 w-[70px] bg-transparent border-none text-[color:var(--tg-text-primary)] cursor-pointer p-2 rounded-lg transition-colors hover:bg-[color:var(--tg-hover)]"
      onClick={onClick}
    >
      <i className={`fas ${icon} text-xl text-[color:var(--tg-text-primary)]`}></i>
      <span className="text-xs">{label}</span>
    </button>
  )
}

interface ProfileInfoItemProps {
  icon: string
  label: string
  value: string
}

function ProfileInfoItem({ icon, label, value }: ProfileInfoItemProps) {
  return (
    <div className="flex items-center gap-4 px-4 py-3 border-b border-[color:var(--tg-border)] last:border-b-0">
      <div className="w-9 h-9 bg-[color:var(--tg-bg)] rounded-full flex items-center justify-center text-[color:var(--tg-text-primary)] flex-shrink-0 text-base">
        <i className={`fas ${icon}`}></i>
      </div>
      <div className="flex-1">
        <div className="text-[13px] text-[color:var(--tg-text-secondary)] mb-1">{label}</div>
        <div className="text-[15px] text-[color:var(--tg-text-primary)] font-medium">{value}</div>
      </div>
    </div>
  )
}

interface ProfileMediaItemProps {
  icon: string
  label: string
}

function ProfileMediaItem({ icon, label }: ProfileMediaItemProps) {
  return (
    <div className="flex items-center gap-4 px-4 py-3 border-b border-[color:var(--tg-border)] cursor-pointer last:border-b-0 hover:bg-[color:var(--tg-hover)]">
      <i className={`fas ${icon} text-xl text-[color:var(--tg-text-primary)] w-6`}></i>
      <span className="text-[15px] text-[color:var(--tg-text-primary)]">{label}</span>
    </div>
  )
}
