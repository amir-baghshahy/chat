import { create } from 'zustand'

interface EmojiStore {
  // State
  emojiCategory: string
  emojiSearchQuery: string
  showEmojiPicker: boolean

  // Actions
  setEmojiCategory: (category: string) => void
  setEmojiSearchQuery: (query: string) => void
  setShowEmojiPicker: (show: boolean) => void
}

export const useEmojiStore = create<EmojiStore>((set) => ({
  // Initial state
  emojiCategory: 'smileys',
  emojiSearchQuery: '',
  showEmojiPicker: false,

  // Actions
  setEmojiCategory: (category) => set({ emojiCategory: category }),
  setEmojiSearchQuery: (query) => set({ emojiSearchQuery: query }),
  setShowEmojiPicker: (show) => set({ showEmojiPicker: show }),
}))
