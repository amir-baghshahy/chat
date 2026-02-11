import { create } from 'zustand'
import type { ModalName, Toast, ToastType } from '../types'

interface ModalsState {
  settings: boolean
  profile: boolean
  newGroup: boolean
  contacts: boolean
  callHistory: boolean
  callScreen: boolean
  forward: boolean
  hamburger: boolean
  chatActions: boolean
  privacy: boolean
  chatSettings: boolean
  myAccount: boolean
  folders: boolean
  chat: boolean
  mediaPhotos: boolean
  mediaFiles: boolean
  mediaLinks: boolean
  mediaGroups: boolean
}

interface ModalStore {
  // State
  modalStack: ModalName[]
  modals: ModalsState
  toasts: Toast[]

  // Actions
  openModal: (modalName: ModalName) => void
  closeModal: (modalName: ModalName) => void
  goBackModal: () => void
  showToast: (title: string, message: string, type?: ToastType, duration?: number) => void
  removeToast: (id: number) => void
}

const initialModals: ModalsState = {
  settings: false,
  profile: false,
  newGroup: false,
  contacts: false,
  callHistory: false,
  callScreen: false,
  forward: false,
  hamburger: false,
  chatActions: false,
  privacy: false,
  chatSettings: false,
  myAccount: false,
  folders: false,
  chat: false,
  mediaPhotos: false,
  mediaFiles: false,
  mediaLinks: false,
  mediaGroups: false,
}

export const useModalStore = create<ModalStore>((set, get) => ({
  // Initial state
  modalStack: [],
  modals: initialModals,
  toasts: [],

  // Actions
  openModal: (modalName) =>
    set((state) => ({
      modalStack: [...state.modalStack, modalName],
      modals: { ...state.modals, [modalName]: true },
    })),

  closeModal: (modalName) =>
    set((state) => ({
      modals: { ...state.modals, [modalName]: false },
      modalStack: state.modalStack.filter((m) => m !== modalName),
    })),

  goBackModal: () =>
    set((state) => {
      if (state.modalStack.length === 0) return state
      const currentModal = state.modalStack[state.modalStack.length - 1]
      return {
        modals: { ...state.modals, [currentModal]: false },
        modalStack: state.modalStack.slice(0, -1),
      }
    }),

  showToast: (title, message, type = 'info', duration = 3000) => {
    const id = Date.now()
    const toast: Toast = { id, title, message, type }
    set((state) => ({ toasts: [...state.toasts, toast] }))
    setTimeout(() => {
      get().removeToast(id)
    }, duration)
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}))
