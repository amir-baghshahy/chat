import { useState, useCallback } from 'react'
import type { ModalName } from '../../types'

export function useSettingsNavigation() {
  const [settingsStack, setSettingsStack] = useState<ModalName[]>([])

  const navigateToSettings = useCallback((fromModal: ModalName, toModal: ModalName, openModalFn: (modal: ModalName) => void, closeModalFn: (modal: ModalName) => void) => {
    // Add current modal to stack
    setSettingsStack((prev) => [...prev, fromModal])
    // Close current modal
    closeModalFn(fromModal)
    // Open new modal
    openModalFn(toModal)
  }, [])

  const goBackToSettings = useCallback((currentModal: ModalName, openModalFn: (modal: ModalName) => void, closeModalFn: (modal: ModalName) => void) => {
    // Get the previous modal from stack
    const previousModal = settingsStack[settingsStack.length - 1]

    if (previousModal) {
      // Remove current modal from stack
      setSettingsStack((prev) => prev.slice(0, -1))
      // Close current modal
      closeModalFn(currentModal)
      // Re-open previous modal
      openModalFn(previousModal)
    } else {
      // No previous modal, just close
      closeModalFn(currentModal)
    }
  }, [settingsStack])

  const clearSettingsStack = useCallback(() => {
    setSettingsStack([])
  }, [])

  return {
    settingsStack,
    navigateToSettings,
    goBackToSettings,
    clearSettingsStack,
  }
}
