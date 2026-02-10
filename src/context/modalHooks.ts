import { useCallback, useState } from 'react'
import type { ModalName, ModalsState, Toast, ToastType } from '../types'

export function useModalHooks() {
  const [modalStack, setModalStack] = useState<ModalName[]>([])
  const [modals, setModals] = useState<ModalsState>({
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
  })
  const [toasts, setToasts] = useState<Toast[]>([])

  const openModal = useCallback((modalName: ModalName) => {
    setModalStack((prev) => [...prev, modalName])
    setModals((prev) => ({ ...prev, [modalName]: true }))
  }, [])

  const closeModal = useCallback((modalName: ModalName) => {
    setModals((prev) => ({ ...prev, [modalName]: false }))
    setModalStack((prev) => prev.filter((m) => m !== modalName))
  }, [])

  const goBackModal = useCallback(() => {
    setModalStack((prev) => {
      if (prev.length === 0) return prev
      const currentModal = prev[prev.length - 1]
      setModals((modals) => ({ ...modals, [currentModal]: false }))
      return prev.slice(0, -1)
    })
  }, [])

  const showToast = useCallback(
    (title: string, message: string, type: ToastType = 'info', duration: number = 3000) => {
      const id: number = Date.now()
      setToasts((prev) => [...prev, { id, title, message, type }])
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, duration)
    },
    []
  )

  return {
    modalStack,
    modals,
    toasts,
    openModal,
    closeModal,
    goBackModal,
    showToast,
  }
}
