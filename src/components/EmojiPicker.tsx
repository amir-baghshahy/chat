import { useTelegram } from '../contexts/TelegramContext'

const EMOJI_CATEGORIES = [
  { key: 'smileys', icon: '😀' },
  { key: 'people', icon: '👋' },
  { key: 'animals', icon: '🐱' },
  { key: 'food', icon: '🍕' },
  { key: 'activities', icon: '⚽' },
  { key: 'objects', icon: '💡' },
]

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void
}

export function EmojiPicker({ onEmojiSelect }: EmojiPickerProps) {
  const {
    emojiCategory,
    setEmojiCategory,
    emojiSearchQuery,
    setEmojiSearchQuery,
    filteredEmojis,
    setShowEmojiPicker,
  } = useTelegram()

  return (
    <div className="w-[calc(100vw-40px)] sm:w-[350px] bg-[color:var(--tg-bg)] rounded-xl shadow-[0_4px_16px_var(--tg-shadow)] overflow-hidden animate-emoji-up">
      <div className="flex justify-between items-center px-4 py-3 border-b border-[color:var(--tg-border)]">
        <div className="flex gap-2">
          {EMOJI_CATEGORIES.map(cat => (
            <button
              key={cat.key}
              className={`w-9 h-9 border-none bg-transparent text-[20px] cursor-pointer rounded-lg transition-colors hover:bg-[color:var(--tg-hover)]
                ${emojiCategory === cat.key ? 'bg-[color:var(--tg-blue-light)]' : ''}
              `}
              onClick={() => setEmojiCategory(cat.key)}
            >
              {cat.icon}
            </button>
          ))}
        </div>
        <button
          className="bg-transparent border-none text-[var(--tg-text-secondary)] cursor-pointer p-2 rounded-full transition-colors hover:bg-[color:var(--tg-hover)]"
          onClick={() => setShowEmojiPicker(false)}
        >
          <i className="fas fa-times text-lg"></i>
        </button>
      </div>

      <div className="px-4 py-3 border-b border-[color:var(--tg-border)]">
        <input
          type="text"
          placeholder="Search emoji..."
          className="w-full px-3 py-2 border border-[color:var(--tg-border)] rounded-lg bg-[color:var(--tg-bg-secondary)] text-[var(--tg-text-primary)] text-[14px] outline-none transition-colors focus:border-[color:var(--tg-blue)]"
          value={emojiSearchQuery}
          onChange={(e) => setEmojiSearchQuery(e.target.value)}
        />
      </div>

      <div className="max-h-[250px] overflow-y-auto p-3 grid grid-cols-8 gap-1 scrollbar-thin">
        {filteredEmojis.map((emoji, index) => (
          <button
            key={`${emoji}-${index}`}
            className="w-9 h-9 flex items-center justify-center text-2xl cursor-pointer rounded-lg transition-colors hover:bg-[color:var(--tg-hover)]"
            onClick={() => onEmojiSelect(emoji)}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  )
}
