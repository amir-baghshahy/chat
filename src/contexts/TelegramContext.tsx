import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import { chatsData, contactsData, emojiData, callHistoryData, currentUser } from '../data'
import type { TelegramContextType, TelegramProviderProps, Chat, Message, ModalsState, ModalName, Toast, ToastType } from '../types'

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
  const [replyingTo, setReplyingTo] = useState<Message | null>(null)
  const [editingMessage, setEditingMessage] = useState<Message | null>(null)
  const [forwardingMessage, setForwardingMessage] = useState<Message | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [toasts, setToasts] = useState<Toast[]>([])
  const [emojiCategory, setEmojiCategory] = useState<string>('smileys')
  const [emojiSearchQuery, setEmojiSearchQuery] = useState<string>('')
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false)

  // Modals state
  const [modals, setModals] = useState<ModalsState>({
    settings: false,
    profile: false,
    newGroup: false,
    contacts: false,
    callHistory: false,
    forward: false,
    hamburger: false,
    chatActions: false,
    privacy: false,
    chatSettings: false,
    myAccount: false,
    chat: false,
  })

  // Handle resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Dark mode toggle
  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => {
      const newValue = !prev
      localStorage.setItem('darkMode', String(newValue))
      return newValue
    })
  }, [])

  // Modal functions
  const openModal = useCallback((modalName: ModalName) => {
    setModals(prev => ({ ...prev, [modalName]: true }))
  }, [])

  const closeModal = useCallback((modalName: ModalName) => {
    setModals(prev => ({ ...prev, [modalName]: false }))
  }, [])

  // Chat functions
  const openChat = useCallback((chatId: number) => {
    const chat = chatsData.find(c => c.id === chatId)
    if (chat) {
      setCurrentChat(chat)
      setMessages(chat.messages || [])
      closeModal('hamburger')
    }
  }, [closeModal])

  const goBack = useCallback(() => {
    setCurrentChat(null)
    setMessages([])
  }, [])

  // Message functions
  const sendMessage = useCallback((text: string) => {
    if (!text.trim() || !currentChat) return

    const newMessage: Message = {
      id: Date.now(),
      text: text.trim(),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      outgoing: true,
      status: 'sent',
    }

    setMessages(prev => [...prev, newMessage])

    // Update chat's last message
    const chatIndex = chatsData.findIndex(c => c.id === currentChat.id)
    if (chatIndex !== -1) {
      chatsData[chatIndex].lastMessage = text.trim()
      chatsData[chatIndex].time = newMessage.time
    }

    // Handle reply/edit
    if (replyingTo) {
      newMessage.replyTo = {
        id: replyingTo.id,
        name: currentChat.name,
        text: replyingTo.text || 'Media',
      }
      setReplyingTo(null)
    }

    if (editingMessage) {
      setMessages(prev => prev.map(msg =>
        msg.id === editingMessage.id
          ? { ...msg, text: text.trim(), edited: true }
          : msg
      ))
      setEditingMessage(null)
      return
    }

    // Simulate response
    setTimeout(() => {
      const responseMessage: Message = {
        id: Date.now() + 1,
        text: 'Thanks for your message!',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
        outgoing: false,
      }
      setMessages(prev => [...prev, responseMessage])

      // Update message status
      setMessages(prev => prev.map(msg =>
        msg.id === newMessage.id ? { ...msg, status: 'read' } : msg
      ))
    }, 1000)
  }, [currentChat, replyingTo, editingMessage])

  const startReply = useCallback((message: Message) => {
    setReplyingTo(message)
    setEditingMessage(null)
    setForwardingMessage(null)
  }, [])

  const cancelReply = useCallback(() => {
    setReplyingTo(null)
  }, [])

  const startEdit = useCallback((message: Message) => {
    setEditingMessage(message)
    setReplyingTo(null)
    setForwardingMessage(null)
  }, [])

  const cancelEdit = useCallback(() => {
    setEditingMessage(null)
  }, [])

  const startForward = useCallback((message: Message) => {
    setForwardingMessage(message)
    setReplyingTo(null)
    setEditingMessage(null)
    openModal('forward')
  }, [openModal])

  // Member selection
  const toggleMemberSelection = useCallback((memberId: number) => {
    setSelectedMembers(prev => {
      const newSet = new Set(prev)
      if (newSet.has(memberId)) {
        newSet.delete(memberId)
      } else {
        newSet.add(memberId)
      }
      return newSet
    })
  }, [])

  // Toast notifications
  const showToast = useCallback((title: string, message: string, type: ToastType = 'info', duration: number = 3000) => {
    const id: number = Date.now()
    setToasts(prev => [...prev, { id, title, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, duration)
  }, [])

  // Call functions
  const startCall = useCallback((chat: Chat, isVideo = false) => {
    setActiveCall(chat)
    setCallDuration(0)
    const interval = setInterval(() => {
      setCallDuration(prev => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const endCall = useCallback(() => {
    setActiveCall(null)
    setCallDuration(0)
  }, [])

  // Emoji functions
  const insertEmoji = useCallback((emoji: string) => {
    return emoji
  }, [])

  // Filtered data
  const filteredChats = searchQuery
    ? chatsData.filter(chat =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : chatsData

  const filteredContacts = contactsSearchQuery
    ? contactsData.filter(contact =>
        contact.name.toLowerCase().includes(contactsSearchQuery.toLowerCase())
      )
    : contactsData

  const filteredMembers = memberSearchQuery
    ? contactsData.filter(contact =>
        contact.name.toLowerCase().includes(memberSearchQuery.toLowerCase())
      )
    : contactsData

  const filteredEmojis = emojiSearchQuery
    ? Object.values(emojiData).flat().filter(emoji =>
        emoji.includes(emojiSearchQuery.toLowerCase())
      )
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
    openChat,
    goBack,
    sendMessage,
    startReply,
    cancelReply,
    startEdit,
    cancelEdit,
    startForward,
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
