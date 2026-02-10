import { useState } from 'react'

export function useEmojiState() {
  const [emojiCategory, setEmojiCategory] = useState<string>('smileys')
  const [emojiSearchQuery, setEmojiSearchQuery] = useState<string>('')
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false)

  return {
    emojiCategory,
    emojiSearchQuery,
    showEmojiPicker,
    setEmojiCategory,
    setEmojiSearchQuery,
    setShowEmojiPicker,
  }
}
