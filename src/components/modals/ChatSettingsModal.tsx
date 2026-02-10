import { useState } from 'react'
import { useTelegram } from '../../contexts/TelegramContext'
import { ToggleSwitch } from '../ui/ToggleSwitch'

export function ChatSettingsModal() {
  const { modals, closeModal, goBackModal } = useTelegram()
  const [textSize, setTextSize] = useState<'small' | 'medium' | 'large'>('medium')
  const [background, setBackground] = useState<'default' | 'dark' | 'custom'>('default')

  if (!modals.chatSettings) return null

  return (
    <div
      className="modal-overlay fixed inset-0 bg-[color:var(--tg-overlay)] flex items-center justify-center z-[10000] animate-fade-in"
      onClick={() => closeModal('chatSettings')}
    >
      <div
        className="modal-content bg-[color:var(--tg-bg-secondary)] rounded-lg w-full max-w-[450px] h-[80vh] flex flex-col shadow-[0_8px_32px_var(--tg-shadow)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 py-3 flex items-center bg-[color:var(--tg-bg-secondary)] border-b border-[color:var(--tg-border)]">
          <button
            className="w-9 h-9 flex items-center justify-center bg-transparent border-none text-[var(--tg-text-primary)] cursor-pointer text-lg hover:bg-[color:var(--tg-hover)] rounded-full mr-2"
            onClick={goBackModal}
          >
            <i className="fas fa-arrow-left"></i>
          </button>
          <h2 className="text-[18px] font-medium text-[var(--tg-text-primary)] flex-1">
            Chat Settings
          </h2>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-[color:var(--tg-bg)] modal-scrollable">
          {/* Text Size */}
          <div className="px-4 py-2">
            <div className="text-[13px] font-semibold text-[var(--tg-text-tertiary)] uppercase mb-2">
              Text Size
            </div>
            <div className="flex gap-2">
              <SizeButton label="Small" active={textSize === 'small'} onClick={() => setTextSize('small')} />
              <SizeButton label="Medium" active={textSize === 'medium'} onClick={() => setTextSize('medium')} />
              <SizeButton label="Large" active={textSize === 'large'} onClick={() => setTextSize('large')} />
            </div>
          </div>

          {/* Background */}
          <div className="px-4 py-3 border-t border-[color:var(--tg-border)]">
            <div className="text-[13px] font-semibold text-[var(--tg-text-tertiary)] uppercase mb-2">
              Chat Background
            </div>
            <div className="space-y-1">
              <BackgroundOption label="Default" active={background === 'default'} onClick={() => setBackground('default')} />
              <BackgroundOption label="Dark" active={background === 'dark'} onClick={() => setBackground('dark')} />
              <BackgroundOption label="Custom..." active={background === 'custom'} onClick={() => setBackground('custom')} />
            </div>
          </div>

          {/* Messages */}
          <div className="px-4 py-3 border-t border-[color:var(--tg-border)]">
            <div className="text-[13px] font-semibold text-[var(--tg-text-tertiary)] uppercase mb-2">
              Messages
            </div>
            <div className="space-y-1">
              <ToggleSwitch label="Show Sender Avatar" active={true} />
              <ToggleSwitch label="Show Timestamp" active={true} />
              <ToggleSwitch label="Show Read Receipts" active={true} />
              <ToggleSwitch label="Message Preview in List" active={true} />
            </div>
          </div>

          {/* Media */}
          <div className="px-4 py-3 border-t border-[color:var(--tg-border)]">
            <div className="text-[13px] font-semibold text-[var(--tg-text-tertiary)] uppercase mb-2">
              Media
            </div>
            <div className="space-y-1">
              <ToggleSwitch label="Auto-Download Photos" active={true} />
              <ToggleSwitch label="Auto-Download Videos" active={false} />
              <ToggleSwitch label="Auto-Download Documents" active={true} />
              <ToggleSwitch label="Save to Gallery" active={true} />
            </div>
          </div>

          {/* Advanced */}
          <div className="px-4 py-3 border-t border-[color:var(--tg-border)]">
            <div className="text-[13px] font-semibold text-[var(--tg-text-tertiary)] uppercase mb-2">
              Advanced
            </div>
            <div className="space-y-1">
              <ToggleSwitch label="Send by Enter" active={true} />
              <ToggleSwitch label="Enable Stickers" active={true} />
              <ToggleSwitch label="Enable GIFs" active={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface SizeButtonProps {
  label: string
  active: boolean
  onClick: () => void
}

function SizeButton({ label, active, onClick }: SizeButtonProps) {
  return (
    <button
      className={`flex-1 py-2 px-3 text-[15px] font-medium rounded-lg transition-colors ${
        active ? 'bg-[color:var(--tg-blue)] text-white' : 'bg-[color:var(--tg-bg-secondary)] text-[var(--tg-text-primary)] hover:bg-[color:var(--tg-hover)]'
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

interface BackgroundOptionProps {
  label: string
  active: boolean
  onClick: () => void
}

function BackgroundOption({ label, active, onClick }: BackgroundOptionProps) {
  return (
    <div
      className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-colors ${
        active ? 'bg-[color:var(--tg-blue)]/10' : 'hover:bg-[color:var(--tg-hover)]'
      }`}
      onClick={onClick}
    >
      <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-400 to-purple-500 flex-shrink-0 mr-3"></div>
      <span className={`text-[15px] flex-1 ${active ? 'text-[var(--tg-blue)] font-medium' : 'text-[var(--tg-text-primary)]'}`}>
        {label}
      </span>
      {active && <i className="fas fa-check text-[var(--tg-blue)]"></i>}
    </div>
  )
}
