import { createContext, useContext } from 'react'
import {
  chatsData,
  contactsData,
  emojiData,
  callHistoryData,
  currentUser,
} from '../data'
import type { TelegramContextType, TelegramProviderProps } from '../types'
import { useModalHooks } from './modalHooks'
import { useChatHooks } from './chatHooks'
import { useMessageHooks } from './messageHooks'
import { useTelegramFilters } from './telegram/useTelegramFilters'
import { useUIState } from './telegram/useUIState'
import { useChatState } from './telegram/useChatState'
import { useSearchState } from './telegram/useSearchState'
import { useEmojiState } from './telegram/useEmojiState'
import { useCallState } from './telegram/useCallState'
import { useMemberSelection } from './telegram/useMemberSelection'
import { useSettingsNavigation } from './telegram/useSettingsNavigation'
import { useChatIndicators } from './telegram/useChatIndicators'

const TelegramContext = createContext<TelegramContextType | undefined>(undefined)

export const useTelegram = (): TelegramContextType => {
  const context = useContext(TelegramContext)
  if (!context) {
    throw new Error('useTelegram must be used within TelegramProvider')
  }
  return context
}

export const TelegramProvider = ({ children }: TelegramProviderProps) => {
  // Modular state hooks
  const uiState = useUIState()
  const chatState = useChatState()
  const searchState = useSearchState()
  const emojiState = useEmojiState()
  const callState = useCallState()
  const memberSelection = useMemberSelection()
  const settingsNavigation = useSettingsNavigation()
  const chatIndicators = useChatIndicators()

  // Modal hooks
  const { modals, toasts, openModal, closeModal, goBackModal, showToast } = useModalHooks()

  // Chat hooks
  const { openChat, pinChat, muteChat, deleteChat, clearChatHistory, forwardMessageToChat } = useChatHooks({
    currentChat: chatState.currentChat,
    setCurrentChat: chatState.setCurrentChat,
    setMessages: chatState.setMessages,
    closeModal,
    goBack: chatState.goBack,
    showToast,
  })

  // Message hooks
  const { replyingTo, editingMessage, forwardingMessage, sendMessage, startReply, cancelReply, startEdit, cancelEdit, startForward } =
    useMessageHooks({
      currentChat: chatState.currentChat,
      setMessages: chatState.setMessages,
      openModal,
    })

  // Filters
  const { filteredChats, filteredContacts, filteredMembers, filteredEmojis } = useTelegramFilters({
    searchQuery: searchState.searchQuery,
    contactsSearchQuery: searchState.contactsSearchQuery,
    memberSearchQuery: searchState.memberSearchQuery,
    emojiCategory: emojiState.emojiCategory,
    emojiSearchQuery: emojiState.emojiSearchQuery,
  })

  // Helper functions
  const insertEmoji = (emoji: string) => emoji

  // Settings navigation helper
  const navigateSettings = (fromModal: any, toModal: any) => {
    settingsNavigation.navigateToSettings(fromModal, toModal, openModal, closeModal)
  }

  const goBackSettings = (currentModal: any) => {
    settingsNavigation.goBackToSettings(currentModal, openModal, closeModal)
  }

  const value: TelegramContextType = {
    // Static data
    chatsData,
    contactsData,
    emojiData,
    callHistoryData,
    currentUser,

    // Filtered data
    filteredChats,
    filteredContacts,
    filteredMembers,
    filteredEmojis,

    // UI state
    isMobile: uiState.isMobile,
    isDarkMode: uiState.isDarkMode,

    // Chat state
    currentChat: chatState.currentChat,
    messages: chatState.messages,

    // Search state
    searchQuery: searchState.searchQuery,
    contactsSearchQuery: searchState.contactsSearchQuery,
    memberSearchQuery: searchState.memberSearchQuery,

    // Emoji state
    emojiCategory: emojiState.emojiCategory,
    emojiSearchQuery: emojiState.emojiSearchQuery,
    showEmojiPicker: emojiState.showEmojiPicker,

    // Call state
    activeCall: callState.activeCall,
    callDuration: callState.callDuration,
    isMuted: callState.isMuted,
    isVideoOn: callState.isVideoOn,

    // Selection state
    selectedMembers: memberSelection.selectedMembers,

    // Chat indicators
    typingChats: chatIndicators.typingChats,
    uploadingChats: chatIndicators.uploadingChats,
    setChatTyping: chatIndicators.setChatTyping,
    setUploadingFile: chatIndicators.setUploadingFile,
    updateUploadProgress: chatIndicators.updateUploadProgress,
    isChatTyping: chatIndicators.isChatTyping,
    getUploadingFile: chatIndicators.getUploadingFile,

    // Message state
    replyingTo,
    editingMessage,
    forwardingMessage,

    // Toasts & Modals
    toasts,
    modals,

    // Setters
    setCurrentChat: chatState.setCurrentChat,
    setSearchQuery: searchState.setSearchQuery,
    setContactsSearchQuery: searchState.setContactsSearchQuery,
    setMemberSearchQuery: searchState.setMemberSearchQuery,
    setIsMuted: callState.setIsMuted,
    setIsVideoOn: callState.setIsVideoOn,
    setEmojiCategory: emojiState.setEmojiCategory,
    setEmojiSearchQuery: emojiState.setEmojiSearchQuery,
    setShowEmojiPicker: emojiState.setShowEmojiPicker,

    // Actions
    toggleDarkMode: uiState.toggleDarkMode,
    openModal,
    closeModal,
    goBackModal,
    navigateSettings,
    goBackSettings,
    openChat,
    goBack: chatState.goBack,
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
    toggleMemberSelection: memberSelection.toggleMemberSelection,
    showToast,
    startCall: callState.startCall,
    endCall: callState.endCall,
    insertEmoji,
  }

  return <TelegramContext.Provider value={value}>{children}</TelegramContext.Provider>
}
