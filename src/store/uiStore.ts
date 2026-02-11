import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UIState {
  // State
  isMobile: boolean
  isDarkMode: boolean

  // Actions
  setIsMobile: (isMobile: boolean) => void
  toggleDarkMode: () => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      // Initial state
      isMobile: typeof window !== 'undefined' ? window.innerWidth <= 768 : false,
      isDarkMode: typeof window !== 'undefined' ? localStorage.getItem('darkMode') === 'true' : false,

      // Actions
      setIsMobile: (isMobile) => set({ isMobile }),

      toggleDarkMode: () =>
        set((state) => {
          const newValue = !state.isDarkMode
          if (typeof window !== 'undefined') {
            localStorage.setItem('darkMode', String(newValue))
          }
          return { isDarkMode: newValue }
        }),
    }),
    {
      name: 'telegram-ui',
      partialize: (state) => ({ isDarkMode: state.isDarkMode }),
    }
  )
)

// Initialize isMobile on mount
if (typeof window !== 'undefined') {
  const handleResize = () => useUIStore.getState().setIsMobile(window.innerWidth <= 768)
  window.addEventListener('resize', handleResize)
  handleResize() // Initial check
}
