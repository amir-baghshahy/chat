import { useState } from 'react'
import { useTelegram } from '../../contexts/TelegramContext'
import { currentUser } from '../../data'

type TabType = 'profile' | 'info' | 'edit'

export function MyAccountModal() {
  const { modals, closeModal } = useTelegram()
  const [activeTab, setActiveTab] = useState<TabType>('profile')

  if (!modals.myAccount) return null

  return (
    <div
      className="modal-overlay fixed inset-0 bg-[color:var(--tg-overlay)] flex items-center justify-center z-[10000] animate-fade-in"
      onClick={() => closeModal('myAccount')}
    >
      <div
        className="modal-content bg-[color:var(--tg-bg-secondary)] rounded-lg w-[90%] max-w-[400px] max-h-[80vh] flex flex-col shadow-[0_8px_32px_var(--tg-shadow)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 py-3 flex items-center bg-[color:var(--tg-bg-secondary)] border-b border-[color:var(--tg-border)]">
          <button
            className="w-9 h-9 flex items-center justify-center bg-transparent border-none text-[var(--tg-text-primary)] cursor-pointer text-lg hover:bg-[color:var(--tg-hover)] rounded-full mr-2"
            onClick={() => closeModal('myAccount')}
          >
            <i className="fas fa-arrow-left"></i>
          </button>
          <h2 className="text-[18px] font-medium text-[var(--tg-text-primary)] flex-1">
            My Account
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[color:var(--tg-border)]">
          <TabButton active={activeTab === 'profile'} onClick={() => setActiveTab('profile')}>
            Profile
          </TabButton>
          <TabButton active={activeTab === 'info'} onClick={() => setActiveTab('info')}>
            Info
          </TabButton>
          <TabButton active={activeTab === 'edit'} onClick={() => setActiveTab('edit')}>
            Edit
          </TabButton>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 bg-[color:var(--tg-bg)] modal-scrollable">
          {activeTab === 'profile' && <ProfileTab />}
          {activeTab === 'info' && <InfoTab />}
          {activeTab === 'edit' && <EditTab />}
        </div>
      </div>
    </div>
  )
}

interface TabButtonProps {
  active: boolean
  children: React.ReactNode
  onClick: () => void
}

function TabButton({ active, children, onClick }: TabButtonProps) {
  return (
    <button
      className={`flex-1 py-3 text-[15px] font-medium border-b-2 transition-colors ${
        active
          ? 'border-[color:var(--tg-blue)] text-[var(--tg-blue)]'
          : 'border-transparent text-[var(--tg-text-secondary)] hover:text-[var(--tg-text-primary)]'
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

function ProfileTab() {
  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <img
        src={currentUser.avatar}
        alt="Profile"
        className="w-24 h-24 rounded-full object-cover border-2 border-[color:var(--tg-border)]"
      />
      <div className="text-center">
        <div className="text-[18px] font-semibold text-[var(--tg-text-primary)]">
          {currentUser.firstName} {currentUser.lastName}
        </div>
        <div className="text-[14px] text-[var(--tg-text-secondary)] mt-1">
          {currentUser.username}
        </div>
      </div>
      <div className="w-full border-t border-[color:var(--tg-border)] pt-4">
        <ProfileItem label="Bio" value={currentUser.bio} />
      </div>
    </div>
  )
}

function InfoTab() {
  return (
    <div className="flex flex-col gap-3 py-2">
      <ProfileItem label="First Name" value={currentUser.firstName} />
      <ProfileItem label="Last Name" value={currentUser.lastName} />
      <ProfileItem label="Username" value={currentUser.username} />
      <ProfileItem label="Phone" value={currentUser.phone} />
      <ProfileItem label="Bio" value={currentUser.bio} />
    </div>
  )
}

function EditTab() {
  return (
    <div className="flex flex-col gap-4 py-2">
      <div className="text-[13px] text-[var(--tg-text-tertiary)] text-center">
        Edit your account information
      </div>
      <EditField label="First Name" defaultValue={currentUser.firstName} />
      <EditField label="Last Name" defaultValue={currentUser.lastName} />
      <EditField label="Username" defaultValue={currentUser.username} />
      <EditField label="Bio" defaultValue={currentUser.bio} textarea />
      <button className="w-full bg-[color:var(--tg-blue)] text-white py-2.5 rounded-lg font-medium hover:bg-[color:var(--tg-blue-dark)] transition-colors">
        Save Changes
      </button>
    </div>
  )
}

interface ProfileItemProps {
  label: string
  value: string
}

function ProfileItem({ label, value }: ProfileItemProps) {
  return (
    <div className="flex justify-between items-center py-2">
      <span className="text-[15px] text-[var(--tg-text-secondary)]">{label}</span>
      <span className="text-[15px] text-[var(--tg-text-primary)]">{value}</span>
    </div>
  )
}

interface EditFieldProps {
  label: string
  defaultValue: string
  textarea?: boolean
}

function EditField({ label, defaultValue, textarea }: EditFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] text-[var(--tg-text-secondary)]">{label}</label>
      {textarea ? (
        <textarea
          defaultValue={defaultValue}
          className="w-full px-3 py-2 bg-[color:var(--tg-bg-secondary)] border border-[color:var(--tg-border)] rounded-lg text-[15px] text-[var(--tg-text-primary)] outline-none focus:border-[color:var(--tg-blue)] transition-colors resize-none"
          rows={3}
        />
      ) : (
        <input
          type="text"
          defaultValue={defaultValue}
          className="w-full px-3 py-2 bg-[color:var(--tg-bg-secondary)] border border-[color:var(--tg-border)] rounded-lg text-[15px] text-[var(--tg-text-primary)] outline-none focus:border-[color:var(--tg-blue)] transition-colors"
        />
      )}
    </div>
  )
}
