import { create } from 'zustand'
import type { Chat } from '../types'

interface CallStore {
  // State
  activeCall: Chat | null
  callDuration: number
  isMuted: boolean
  isVideoOn: boolean

  // Actions
  setIsMuted: (muted: boolean) => void
  setIsVideoOn: (on: boolean) => void
  startCall: (chat: Chat, isVideo?: boolean) => void
  endCall: () => void
}

export const useCallStore = create<CallStore>((set) => ({
  // Initial state
  activeCall: null,
  callDuration: 0,
  isMuted: false,
  isVideoOn: true,

  // Actions
  setIsMuted: (muted) => set({ isMuted: muted }),
  setIsVideoOn: (on) => set({ isVideoOn: on }),

  startCall: (chat, isVideo = false) =>
    set({
      activeCall: chat,
      callDuration: 0,
      isMuted: false,
      isVideoOn: isVideo,
    }),

  endCall: () =>
    set({
      activeCall: null,
      callDuration: 0,
      isMuted: false,
      isVideoOn: true,
    }),
}))
