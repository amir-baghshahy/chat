import { useState } from 'react'

interface ToggleSwitchProps {
  label: string
  active: boolean
  onToggle?: (active: boolean) => void
}

export function ToggleSwitch({ label, active, onToggle }: ToggleSwitchProps) {
  const [internalActive, setInternalActive] = useState(active)

  const handleClick = () => {
    const newValue = !internalActive
    setInternalActive(newValue)
    onToggle?.(newValue)
  }

  return (
    <div className="flex items-center justify-between px-3 py-2 hover:bg-[color:var(--tg-hover)] rounded-lg cursor-pointer transition-colors" onClick={handleClick}>
      <span className="text-[15px] text-[var(--tg-text-primary)]">{label}</span>
      <div
        className={`w-11 h-6 rounded-full transition-colors flex-shrink-0 ${
          internalActive ? 'bg-[color:var(--tg-blue)]' : 'bg-[color:var(--tg-border)]'
        }`}
      >
        <div
          className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
            internalActive ? 'translate-x-6' : 'translate-x-0.5'
          }`}
        ></div>
      </div>
    </div>
  )
}
