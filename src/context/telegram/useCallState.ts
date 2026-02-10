import { useState, useCallback } from 'react'
import type { Chat } from '../../types'

export function useCallState() {
  const [activeCall, setActiveCall] = useState<Chat | null>(null)
  const [callDuration, setCallDuration] = useState<number>(0)
  const [isMuted, setIsMuted] = useState<boolean>(false)
  const [isVideoOn, setIsVideoOn] = useState<boolean>(true)

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

  return {
    activeCall,
    callDuration,
    isMuted,
    isVideoOn,
    setIsMuted,
    setIsVideoOn,
    startCall,
    endCall,
  }
}
