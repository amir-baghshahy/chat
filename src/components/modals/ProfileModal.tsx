import { useState } from 'react'
import { useTelegram } from '../../context/TelegramContext'
import type { Chat } from '../../types'
import { MediaPhotosModal } from './MediaPhotosModal'
import { MediaFilesModal } from './MediaFilesModal'
import { MediaLinksModal } from './MediaLinksModal'
import { MediaGroupsModal } from './MediaGroupsModal'

export function ProfileModal() {
  const { modals, closeModal, currentChat, currentUser, startCall, openModal, showToast } = useTelegram()
  const [isMuted, setIsMuted] = useState(false)

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
    switch (action) {
      case 'message':
        // Focus on message input - the chat is already open when viewing profile
        closeModal('profile')
        // Focus on the textarea input
        setTimeout(() => {
          const textarea = document.querySelector('textarea') as HTMLTextAreaElement
          if (textarea) {
            textarea.focus()
          }
        }, 100)
        break
      case 'mute':
        // Toggle mute state locally
        setIsMuted(!isMuted)
        showToast('Success', isMuted ? 'Notifications enabled' : 'Notifications muted', 'info')
        break
      case 'call':
        // Initiate call - open call screen modal
        if (currentChat) {
          closeModal('profile')
          startCall(currentChat, false)
        }
        break
      case 'more':
        // Open chat actions menu for more options (block, report, etc.)
        closeModal('profile')
        openModal('chatActions')
        break
      default:
        break
    }
  }

  const handleMediaClick = (mediaType: 'photos' | 'files' | 'links' | 'groups') => {
    const modalMap = {
      photos: 'mediaPhotos',
      files: 'mediaFiles',
      links: 'mediaLinks',
      groups: 'mediaGroups',
    } as const
    openModal(modalMap[mediaType])
  }

  return (
    <div
      className="modal-overlay fixed inset-0 bg-[color:var(--tg-overlay)] flex items-center justify-center z-[10000]"
      onClick={() => closeModal('profile')}
    >
      <div
        className="modal-content bg-[color:var(--tg-bg-secondary)] rounded-lg w-[90%] max-w-[450px] max-h-[90vh] flex flex-col shadow-[0_8px_32px_var(--tg-shadow)] overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-[color:var(--tg-overlay)] border-none rounded-full text-[var(--tg-text-primary)] cursor-pointer z-10 text-sm"
          onClick={() => closeModal('profile')}
        >
          <i className="fas fa-times"></i>
        </button>

        <div className="flex-1 overflow-y-auto modal-scrollable">
          {/* Avatar & User Info */}
          <div className="flex flex-col items-center px-5 pt-8 pb-6 bg-[color:var(--tg-bg-secondary)]">
            <img
              src={chat.avatar}
              alt="Profile"
              className="w-[100px] h-[100px] rounded-full object-cover border-2 border-[color:var(--tg-text-primary)] mb-4"
              loading="lazy"
            />
            <h3 className="text-[18px] sm:text-[20px] font-semibold text-[var(--tg-text-primary)] mb-2 text-center px-2 break-words">
              {displayName}
            </h3>
            <p className="text-[14px] text-[var(--tg-text-secondary)] mb-0 text-center italic">
              {displayOnline ? 'online' : 'last seen recently'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2.5 px-5 py-4 justify-center">
            <ProfileActionButton icon="fa-comment" label="Message" onClick={() => handleAction('message')} />
            <ProfileActionButton icon={isMuted ? "fa-bell-slash" : "fa-bell"} label="Mute" onClick={() => handleAction('mute')} />
            <ProfileActionButton icon="fa-phone" label="Call" onClick={() => handleAction('call')} />
            <ProfileActionButton icon="fa-ellipsis-vertical" label="More" onClick={() => handleAction('more')} />
          </div>

          {/* Detailed Info */}
          <div className="px-5 py-4">
            <ProfileInfoItem
              icon="fa-info-circle"
              label="Bio"
              value={isChat && (chat as Chat).bio ? (chat as Chat).bio! : currentUser.bio!}
              copyOnClick={true}
            />
            <ProfileInfoItem
              icon="fa-at"
              label="Username"
              value={isChat && (chat as Chat).username ? (chat as Chat).username! : currentUser.username!}
              copyOnClick={true}
            />
          </div>

          {/* Media/Stats Section */}
          {/* TODO: Backend - Fetch actual media counts from backend */}
          <div className="px-5 py-4 border-t border-[color:var(--tg-border)]">
            <ProfileMediaItem icon="fa-images" label="3 photos" onClick={() => handleMediaClick('photos')} />
            <ProfileMediaItem icon="fa-file" label="20 files" onClick={() => handleMediaClick('files')} />
            <ProfileMediaItem icon="fa-link" label="62 shared links" onClick={() => handleMediaClick('links')} />
            <ProfileMediaItem icon="fa-users" label="5 groups in common" onClick={() => handleMediaClick('groups')} />
          </div>
        </div>
      </div>

      {/* Media Modals */}
      <MediaPhotosModal />
      <MediaFilesModal />
      <MediaLinksModal />
      <MediaGroupsModal />
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
      className="flex flex-col items-center gap-1.5 w-[70px] bg-transparent border-none text-[var(--tg-text-primary)] cursor-pointer p-2 rounded-lg transition-colors hover:bg-[color:var(--tg-hover)]"
      onClick={onClick}
    >
      <i className={`fas ${icon} text-xl text-[var(--tg-text-primary)]`}></i>
      <span className="text-xs">{label}</span>
    </button>
  )
}

interface ProfileInfoItemProps {
  icon: string
  label: string
  value: string
  copyOnClick?: boolean
}

function ProfileInfoItem({ icon, label, value, copyOnClick = false }: ProfileInfoItemProps) {
  const handleCopy = () => {
    if (copyOnClick) {
      navigator.clipboard.writeText(value)
      // Could add a toast notification here
    }
  }

  return (
    <div
      className={`flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-3 border-b border-[color:var(--tg-border)] last:border-b-0 ${copyOnClick ? 'cursor-pointer hover:bg-[color:var(--tg-hover)]' : ''}`}
      onClick={copyOnClick ? handleCopy : undefined}
      title={copyOnClick ? 'Click to copy' : undefined}
    >
      <div className="w-9 h-9 bg-[color:var(--tg-bg)] rounded-full flex items-center justify-center text-[var(--tg-text-primary)] flex-shrink-0 text-base">
        <i className={`fas ${icon}`}></i>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[12px] sm:text-[13px] text-[var(--tg-text-secondary)] mb-1 truncate">{label}</div>
        <div className="text-[14px] sm:text-[15px] text-[var(--tg-text-primary)] font-medium break-words">{value}</div>
      </div>
      {copyOnClick && (
        <i className="fas fa-copy text-[var(--tg-text-tertiary)] text-sm"></i>
      )}
    </div>
  )
}

interface ProfileMediaItemProps {
  icon: string
  label: string
  onClick?: () => void
}

function ProfileMediaItem({ icon, label, onClick }: ProfileMediaItemProps) {
  return (
    <div
      className="flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-3 border-b border-[color:var(--tg-border)] cursor-pointer last:border-b-0 hover:bg-[color:var(--tg-hover)]"
      onClick={onClick}
    >
      <i className={`fas ${icon} text-xl text-[var(--tg-text-primary)] w-6 flex-shrink-0`}></i>
      <span className="text-[14px] sm:text-[15px] text-[var(--tg-text-primary)] break-words">{label}</span>
    </div>
  )
}
