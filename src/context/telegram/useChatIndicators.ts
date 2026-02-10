import { useState, useCallback } from 'react'

export interface UploadingFile {
  name: string
  progress: number
}

export function useChatIndicators() {
  const [typingChats, setTypingChats] = useState<Set<number>>(new Set())
  const [uploadingChats, setUploadingChats] = useState<Map<number, UploadingFile>>(new Map())

  /** Set typing status for a chat */
  const setChatTyping = useCallback((chatId: number, isTyping: boolean) => {
    setTypingChats((prev) => {
      const newSet = new Set(prev)
      if (isTyping) {
        newSet.add(chatId)
      } else {
        newSet.delete(chatId)
      }
      return newSet
    })
  }, [])

  /** Set uploading file for a chat */
  const setUploadingFile = useCallback((chatId: number, file: UploadingFile | null) => {
    setUploadingChats((prev) => {
      const newMap = new Map(prev)
      if (file) {
        newMap.set(chatId, file)
      } else {
        newMap.delete(chatId)
      }
      return newMap
    })
  }, [])

  /** Update upload progress for a chat */
  const updateUploadProgress = useCallback((chatId: number, progress: number) => {
    setUploadingChats((prev) => {
      const newMap = new Map(prev)
      const existing = newMap.get(chatId)
      if (existing) {
        newMap.set(chatId, { ...existing, progress })
      }
      return newMap
    })
  }, [])

  /** Check if a chat is typing */
  const isChatTyping = useCallback((chatId: number): boolean => {
    return typingChats.has(chatId)
  }, [typingChats])

  /** Get uploading file for a chat */
  const getUploadingFile = useCallback((chatId: number): UploadingFile | null => {
    return uploadingChats.get(chatId) || null
  }, [uploadingChats])

  return {
    typingChats,
    uploadingChats,
    setChatTyping,
    setUploadingFile,
    updateUploadProgress,
    isChatTyping,
    getUploadingFile,
  }
}
