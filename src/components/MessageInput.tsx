import { useState, useEffect, useRef } from 'react'
import { useTelegram } from '../context/TelegramContext'
import { EmojiPicker } from './EmojiPicker'
import { ReplyPreview } from './ReplyPreview'

export function MessageInput() {
  const {
    sendMessage,
    replyingTo,
    cancelReply,
    editingMessage,
    cancelEdit,
    showEmojiPicker,
    setShowEmojiPicker,
    currentChat,
  } = useTelegram()

  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  useEffect(() => {
    if (editingMessage) {
      setInputValue(editingMessage.text || '')
      inputRef.current?.focus()
    } else if (!replyingTo) {
      setInputValue('')
    }
  }, [editingMessage, replyingTo])

  const handleSend = () => {
    if (!inputValue.trim()) return
    sendMessage(inputValue)
    setInputValue('')
    setSelectedFile(null)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleEmojiSelect = (emoji: string) => {
    setInputValue(prev => prev + emoji)
    inputRef.current?.focus()
  }

  const handleFileClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setInputValue(`📎 ${file.name}`)
    }
  }

  const handleClearFile = () => {
    setSelectedFile(null)
    fileInputRef.current!.value = ''
  }

  return (
    <>
      {/* Reply Preview */}
      {(replyingTo || editingMessage) && (
        <ReplyPreview
          message={replyingTo || editingMessage}
          mode={replyingTo ? 'reply' : 'edit'}
          onCancel={replyingTo ? cancelReply : cancelEdit}
        />
      )}

      <div className="flex items-center px-3 sm:px-5 py-3 gap-2 sm:gap-3 bg-[color:var(--tg-bg)] border-t border-[color:var(--tg-border)] relative">
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          multiple
          onChange={handleFileChange}
        />

        {selectedFile ? (
          <button
            className="bg-transparent border-none cursor-pointer p-1.5 sm:p-2 text-red-500 transition-colors hover:bg-[color:var(--tg-hover)] w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-full flex-shrink-0"
            onClick={handleClearFile}
            title="Clear file"
          >
            <i className="fas fa-times text-base sm:text-xl"></i>
          </button>
        ) : (
          <button
            className="bg-transparent border-none cursor-pointer p-1.5 sm:p-2 text-[var(--tg-text-secondary)] transition-colors hover:bg-[color:var(--tg-hover)] hover:text-[var(--tg-blue)] w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-full flex-shrink-0"
            onClick={handleFileClick}
            title="Attach"
          >
            <i className="fas fa-paperclip text-base sm:text-xl"></i>
          </button>
        )}

        <div className="flex-1 flex items-center bg-[color:var(--tg-bg-secondary)] rounded-[20px] sm:rounded-[24px] px-3 sm:px-4 py-2 gap-1.5 sm:gap-2 min-w-0">
          <button
            className="bg-transparent border-none cursor-pointer p-1.5 sm:p-2 text-[var(--tg-text-secondary)] transition-colors hover:bg-[color:var(--tg-hover)] hover:text-[var(--tg-blue)] w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-full flex-shrink-0"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            title="Emoji"
          >
            <i className="far fa-smile text-base sm:text-xl"></i>
          </button>

          <input
            ref={inputRef}
            type="text"
            className="flex-1 border-none bg-transparent outline-none text-[15px] sm:text-[16px] text-[var(--tg-text-primary)] placeholder:text-[var(--tg-text-tertiary)] min-w-0 whitespace-nowrap overflow-x-auto"
            placeholder={replyingTo ? 'Write a reply...' : editingMessage ? 'Edit message...' : 'Write a message...'}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
          />
        </div>

        <button
          className="bg-[color:var(--tg-blue)] text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-colors hover:bg-[color:var(--tg-blue-dark)] flex-shrink-0"
          onClick={handleSend}
          title="Send"
        >
          <i className="fas fa-paper-plane text-sm sm:text-base"></i>
        </button>

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div className="absolute bottom-20 left-2 sm:left-5 z-[10000]">
            <EmojiPicker onEmojiSelect={handleEmojiSelect} />
          </div>
        )}
      </div>
    </>
  )
}
