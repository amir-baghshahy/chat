import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import {
  chatsData,
  contactsData,
  emojiData,
  callHistoryData,
  currentUser,
} from '../data'
import type { TelegramContextType, TelegramProviderProps, Chat, Message } from '../types'
import { useModalHooks } from '../context/modalHooks'
import { useChatHooks } from '../context/chatHooks'
import { useMessageHooks } from '../context/messageHooks'

const TelegramContext = createContext<TelegramContextType | undefined>(undefined)

export const useTelegram = (): TelegramContextType => {
  const context = useContext(TelegramContext)
  if (!context) {
    throw new Error('useTelegram must be used within TelegramProvider')
  }
  return context
}

export const TelegramProvider = ({ children }: TelegramProviderProps) => {
  // State
  const [currentChat, setCurrentChat] = useState<Chat | null>(null)
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => localStorage.getItem('darkMode') === 'true')
  const [selectedMembers, setSelectedMembers] = useState<Set<number>>(new Set())
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [contactsSearchQuery, setContactsSearchQuery] = useState<string>('')
  const [memberSearchQuery, setMemberSearchQuery] = useState<string>('')
  const [activeCall, setActiveCall] = useState<Chat | null>(null)
  const [callDuration, setCallDuration] = useState<number>(0)
  const [isMuted, setIsMuted] = useState<boolean>(false)
  const [isVideoOn, setIsVideoOn] = useState<boolean>(true)
  const [messages, setMessages] = useState<Message[]>([])
  const [emojiCategory, setEmojiCategory] = useState<string>('smileys')
  const [emojiSearchQuery, setEmojiSearchQuery] = useState<string>('')
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false)

  // Modal hooks
  const { modalStack, modals, toasts, openModal, closeModal, goBackModal, showToast } = useModalHooks()

  // Chat hooks
  const { openChat, pinChat, muteChat, deleteChat, clearChatHistory, forwardMessageToChat } = useChatHooks({
    currentChat,
    setCurrentChat,
    setMessages,
    closeModal,
    goBack: () => {
      setCurrentChat(null)
      setMessages([])
    },
    showToast,
  })

  // Message hooks
  const { replyingTo, editingMessage, forwardingMessage, sendMessage, startReply, cancelReply, startEdit, cancelEdit, startForward } = useMessageHooks({
    currentChat,
    setMessages,
    openModal,
  })

  // Handle resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Dark mode toggle
  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => {
      const newValue = !prev
      localStorage.setItem('darkMode', String(newValue))
      return newValue
    })
  }, [])

  // Member selection
  const toggleMemberSelection = useCallback((memberId: number) => {
    setSelectedMembers((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(memberId)) {
        newSet.delete(memberId)
      } else {
        newSet.add(memberId)
      }
      return newSet
    })
  }, [])

  // Emoji functions
  const insertEmoji = useCallback((emoji: string) => {
    return emoji
  }, [])

  // Call functions
  const startCall = useCallback((chat: Chat) => {
    setActiveCall(chat)
    setCallDuration(0)
    const interval = setInterval(() => {
      setCallDuration((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const endCall = useCallback(() => {
    setActiveCall(null)
    setCallDuration(0)
  }, [])

  // Filtered data
  const filteredChats = searchQuery
    ? chatsData.filter(
        (chat) =>
          chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : chatsData

  const filteredContacts = contactsSearchQuery
    ? contactsData.filter((contact) => contact.name.toLowerCase().includes(contactsSearchQuery.toLowerCase()))
    : contactsData

  const filteredMembers = memberSearchQuery
    ? contactsData.filter((contact) => contact.name.toLowerCase().includes(memberSearchQuery.toLowerCase()))
    : contactsData

  const filteredEmojis = emojiSearchQuery
    ? Object.values(emojiData)
        .flat()
        .filter((emoji) => emoji.includes(emojiSearchQuery.toLowerCase()))
    : emojiData[emojiCategory] || emojiData.smileys

  const value: TelegramContextType = {
    // Data
    chatsData,
    contactsData,
    emojiData,
    callHistoryData,
    currentUser,
    filteredChats,
    filteredContacts,
    filteredMembers,
    filteredEmojis,

    // State
    currentChat,
    isMobile,
    isDarkMode,
    isMuted,
    isVideoOn,
    selectedMembers,
    searchQuery,
    contactsSearchQuery,
    memberSearchQuery,
    replyingTo,
    editingMessage,
    forwardingMessage,
    messages,
    toasts,
    emojiCategory,
    emojiSearchQuery,
    showEmojiPicker,
    activeCall,
    callDuration,
    modals,

    // Setters
    setCurrentChat,
    setSearchQuery,
    setContactsSearchQuery,
    setMemberSearchQuery,
    setIsMuted,
    setIsVideoOn,
    setEmojiCategory,
    setEmojiSearchQuery,
    setShowEmojiPicker,

    // Actions
    toggleDarkMode,
    openModal,
    closeModal,
    goBackModal,
    openChat,
    goBack: () => {
      setCurrentChat(null)
      setMessages([])
    },
    sendMessage,
    startReply,
    cancelReply,
    startEdit,
    cancelEdit,
    startForward,
    forwardMessageToChat,
    pinChat,
    muteChat,
    deleteChat,
    clearChatHistory,
    toggleMemberSelection,
    showToast,
    startCall,
    endCall,
    insertEmoji,
  }

  return (
    <TelegramContext.Provider value={value}>
      {children}
    </TelegramContext.Provider>
  )
}
