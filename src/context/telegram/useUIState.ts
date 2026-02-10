import { useState, useEffect, useCallback } from 'react'

export function useUIState() {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => localStorage.getItem('darkMode') === 'true')

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

  return {
    isMobile,
    isDarkMode,
    toggleDarkMode,
  }
}
