import { useState, useEffect, useRef } from 'react'
import { useTelegram } from '../../context/TelegramContext'
import { ReplyPreview } from './ReplyPreview'
import { EmojiPicker } from '../ui/EmojiPicker'

interface FilePreview {
  file: File
  url: string
  type: 'image' | 'video' | 'file'
}

export function MessageInput() {
  const {
    sendMessage,
    replyingTo,
    cancelReply,
    editingMessage,
    cancelEdit,
    showEmojiPicker,
    setShowEmojiPicker,
  } = useTelegram()

  const [inputValue, setInputValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [filePreview, setFilePreview] = useState<FilePreview | null>(null)

  useEffect(() => {
    if (editingMessage) {
      setInputValue(editingMessage.text || '')
      textareaRef.current?.focus()
    } else if (!replyingTo) {
      setInputValue('')
    }
  }, [editingMessage, replyingTo])

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`
    }
  }, [inputValue])

  const handleSend = () => {
    // Send with or without file
    sendMessage(inputValue, filePreview || undefined)
    setInputValue('')
    if (filePreview) {
      URL.revokeObjectURL(filePreview.url)
      setFilePreview(null)
    }
    fileInputRef.current!.value = ''
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleEmojiSelect = (emoji: string) => {
    setInputValue(prev => prev + emoji)
    textareaRef.current?.focus()
  }

  const handleFileClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Create preview URL
    const url = URL.createObjectURL(file)

    // Determine file type
    let type: 'image' | 'video' | 'file' = 'file'
    if (file.type.startsWith('image/')) {
      type = 'image'
    } else if (file.type.startsWith('video/')) {
      type = 'video'
    }

    setFilePreview({ file, url, type })
  }

  const handleClearFile = () => {
    if (filePreview) {
      URL.revokeObjectURL(filePreview.url)
    }
    setFilePreview(null)
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

      {/* File Preview */}
      {filePreview && (
        <div className="mx-3 sm:mx-5 mb-2 p-2 bg-[color:var(--tg-bg-secondary)] rounded-lg flex items-center gap-3">
          {filePreview.type === 'image' && (
            <img src={filePreview.url} alt="Preview" className="w-16 h-16 object-cover rounded-lg" />
          )}
          {filePreview.type === 'video' && (
            <div className="w-16 h-16 bg-black/30 rounded-lg flex items-center justify-center">
              <i className="fas fa-play text-white text-xl"></i>
            </div>
          )}
          {filePreview.type === 'file' && (
            <div className="w-16 h-16 bg-[color:var(--tg-blue)] rounded-lg flex items-center justify-center">
              <i className="fas fa-file text-white text-xl"></i>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-medium text-[var(--tg-text-primary)] truncate">{filePreview.file.name}</div>
            <div className="text-[11px] text-[var(--tg-text-tertiary)]">
              {(filePreview.file.size / 1024).toFixed(1)} KB
            </div>
          </div>
          <button
            className="bg-transparent border-none text-[var(--tg-text-secondary)] cursor-pointer p-2 rounded-full hover:bg-[color:var(--tg-hover)]"
            onClick={handleClearFile}
            title="Remove"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      )}

      <div className="flex items-center px-3 sm:px-5 py-3 gap-2 sm:gap-3 bg-[color:var(--tg-bg)] border-t border-[color:var(--tg-border)] relative">
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />

        <button
          className="bg-transparent border-none cursor-pointer p-1.5 sm:p-2 text-[var(--tg-text-secondary)] transition-colors hover:bg-[color:var(--tg-hover)] hover:text-[var(--tg-blue)] w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-full flex-shrink-0"
          onClick={handleFileClick}
          title="Attach"
        >
          <i className="fas fa-paperclip text-base sm:text-xl"></i>
        </button>

        <div className="flex-1 flex items-center bg-[color:var(--tg-bg-secondary)] rounded-[20px] sm:rounded-[24px] px-3 sm:px-4 py-2 gap-1.5 sm:gap-2 min-w-0">
          <button
            className="bg-transparent border-none cursor-pointer p-1.5 sm:p-2 text-[var(--tg-text-secondary)] transition-colors hover:bg-[color:var(--tg-hover)] hover:text-[var(--tg-blue)] w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-full flex-shrink-0"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            title="Emoji"
          >
            <i className="far fa-smile text-base sm:text-xl"></i>
          </button>

          <textarea
            ref={textareaRef}
            className="flex-1 border-none bg-transparent outline-none text-[15px] sm:text-[16px] text-[var(--tg-text-primary)] placeholder:text-[var(--tg-text-tertiary)] min-w-0 resize-none overflow-y-auto max-h-[120px]"
            placeholder={replyingTo ? 'Write a reply...' : editingMessage ? 'Edit message...' : 'Write a message...'}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            rows={1}
          />
        </div>

        <button
          className={`rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-colors flex-shrink-0 ${
            inputValue.trim() || filePreview
              ? 'bg-[color:var(--tg-blue)] text-white hover:bg-[color:var(--tg-blue-dark)] cursor-pointer'
              : 'bg-[color:var(--tg-bg-secondary)] text-[var(--tg-text-tertiary)] cursor-not-allowed'
          }`}
          onClick={handleSend}
          disabled={!inputValue.trim() && !filePreview}
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
