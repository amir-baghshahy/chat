import { useState, useCallback, useRef } from 'react'
import type { Chat } from '../../types'

export function useCallState() {
  const [activeCall, setActiveCall] = useState<Chat | null>(null)
  const [callDuration, setCallDuration] = useState<number>(0)
  const [isMuted, setIsMuted] = useState<boolean>(false)
  const [isVideoOn, setIsVideoOn] = useState<boolean>(true)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startCall = useCallback((chat: Chat) => {
    setActiveCall(chat)
    setCallDuration(0)
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    // Start new interval
    intervalRef.current = setInterval(() => {
      setCallDuration((prev) => prev + 1)
    }, 1000)
  }, [])

  const endCall = useCallback(() => {
    // Clear interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
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
