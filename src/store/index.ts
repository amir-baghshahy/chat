// Unified store exports - similar to the old TelegramContext
// This provides a single import point for all stores

export { useAuthStore } from "./authStore";
export { useUIStore } from "./uiStore";
export { useModalStore } from "./modalStore";
export { useChatStore } from "./chatStore";
export { useMessageStore } from "./messageStore";
export { useSearchStore } from "./searchStore";
export { useEmojiStore } from "./emojiStore";
export { useCallStore } from "./callStore";
export { useMemberSelectionStore } from "./memberSelectionStore";

import type { User } from "../types";
import {
  chatsData,
  contactsData,
  emojiData,
  callHistoryData,
  currentUser,
} from "../data";
import type {
  Chat,
  Contact,
  CallHistory,
  Toast,
  ToastType,
  ModalName,
  ModalsState,
  Message,
} from "../types";
import { useAuthStore } from "./authStore";
import { useUIStore } from "./uiStore";
import { useModalStore } from "./modalStore";
import { useChatStore } from "./chatStore";
import { useMessageStore } from "./messageStore";
import { useSearchStore } from "./searchStore";
import { useEmojiStore } from "./emojiStore";
import { useCallStore } from "./callStore";
import { useMemberSelectionStore } from "./memberSelectionStore";

// Combined hook for easy access (like old useTelegram)
export function useTelegram() {
  const authStore = useAuthStore();
  const uiStore = useUIStore();
  const modalStore = useModalStore();
  const chatStore = useChatStore();
  const messageStore = useMessageStore();
  const searchStore = useSearchStore();
  const emojiStore = useEmojiStore();
  const callStore = useCallStore();
  const memberSelectionStore = useMemberSelectionStore();

  // Computed filtered values
  const filteredChats = chatsData.filter((chat) =>
    chat.name.toLowerCase().includes(searchStore.chatSearchQuery.toLowerCase())
  );

  const filteredContacts = contactsData.filter((contact) =>
    contact.name.toLowerCase().includes(searchStore.contactsSearchQuery.toLowerCase())
  );

  const filteredMembers = contactsData.filter((member) =>
    member.name.toLowerCase().includes(searchStore.memberSearchQuery.toLowerCase())
  );

  const filteredEmojis: string[] = emojiStore.emojiSearchQuery
    ? (emojiData[emojiStore.emojiCategory] || []).filter((emoji) =>
        emoji.includes(emojiStore.emojiSearchQuery)
      )
    : emojiData[emojiStore.emojiCategory] || [];

  return {
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

    // Auth
    user: authStore.user,
    isAuthenticated: authStore.isAuthenticated,
    login: authStore.login,
    register: authStore.register,
    logout: authStore.logout,

    // UI State
    isMobile: uiStore.isMobile,
    isDarkMode: uiStore.isDarkMode,
    toggleDarkMode: uiStore.toggleDarkMode,

    // Chat State
    currentChat: chatStore.currentChat,
    messages: chatStore.messages,
    setCurrentChat: chatStore.setCurrentChat,
    setMessages: chatStore.setMessages,
    goBack: chatStore.goBack,
    openChat: chatStore.openChat,
    pinChat: chatStore.pinChat,
    muteChat: chatStore.muteChat,
    deleteChat: chatStore.deleteChat,
    clearChatHistory: chatStore.clearChatHistory,
    forwardMessageToChat: chatStore.forwardMessageToChat,

    // Message State
    replyingTo: messageStore.replyingTo,
    editingMessage: messageStore.editingMessage,
    forwardingMessage: messageStore.forwardingMessage,
    setReplyingTo: messageStore.setReplyingTo,
    setEditingMessage: messageStore.setEditingMessage,
    sendMessage: (
      text: string,
      filePreview?: import("./messageStore").FilePreview,
    ) => {
      messageStore.sendMessage(
        text,
        filePreview,
        chatStore.currentChat || undefined,
      );
    },
    startReply: messageStore.startReply,
    cancelReply: messageStore.cancelReply,
    startEdit: messageStore.startEdit,
    cancelEdit: messageStore.cancelEdit,
    startForward: (message: Message) => {
      messageStore.setForwardingMessage(message);
      modalStore.openModal("forward");
    },

    // Search State
    searchQuery: searchStore.searchQuery,
    contactsSearchQuery: searchStore.contactsSearchQuery,
    memberSearchQuery: searchStore.memberSearchQuery,
    chatSearchQuery: searchStore.chatSearchQuery,
    setSearchQuery: searchStore.setSearchQuery,
    setContactsSearchQuery: searchStore.setContactsSearchQuery,
    setMemberSearchQuery: searchStore.setMemberSearchQuery,
    setChatSearchQuery: searchStore.setChatSearchQuery,

    // Emoji State
    emojiCategory: emojiStore.emojiCategory,
    emojiSearchQuery: emojiStore.emojiSearchQuery,
    showEmojiPicker: emojiStore.showEmojiPicker,
    setEmojiCategory: emojiStore.setEmojiCategory,
    setEmojiSearchQuery: emojiStore.setEmojiSearchQuery,
    setShowEmojiPicker: emojiStore.setShowEmojiPicker,

    // Call State
    activeCall: callStore.activeCall,
    callDuration: callStore.callDuration,
    isMuted: callStore.isMuted,
    isVideoOn: callStore.isVideoOn,
    setIsMuted: callStore.setIsMuted,
    setIsVideoOn: callStore.setIsVideoOn,
    startCall: callStore.startCall,
    endCall: callStore.endCall,

    // Selection state
    selectedMembers: memberSelectionStore.selectedMembers,
    toggleMemberSelection: memberSelectionStore.toggleMemberSelection,

    // Chat indicators (stub implementations for now)
    typingChats: new Set<number>(),
    uploadingChats: new Map<number, { name: string; progress: number }>(),
    setChatTyping: (_chatId: number, _isTyping: boolean) => {},
    setUploadingFile: (_chatId: number, _file: { name: string; progress: number } | null) => {},
    updateUploadProgress: (_chatId: number, _progress: number) => {},
    isChatTyping: (_chatId: number): boolean => false,
    getUploadingFile: (_chatId: number): { name: string; progress: number } | null => null,

    // Modal & Toast State
    toasts: modalStore.toasts,
    modals: modalStore.modals,
    openModal: modalStore.openModal,
    closeModal: modalStore.closeModal,
    goBackModal: modalStore.goBackModal,
    showToast: modalStore.showToast,

    // Settings navigation
    navigateSettings: (_fromModal: ModalName, toModal: ModalName) => {
      modalStore.openModal(toModal);
    },
    goBackSettings: (_currentModal: ModalName) => {
      modalStore.goBackModal();
    },

    // Helper
    insertEmoji: (emoji: string) => emoji,
  };
}

// Re-export types
export type {
  User,
  Chat,
  Contact,
  CallHistory,
  Toast,
  ToastType,
  ModalName,
  ModalsState,
  Message,
};
