// TODO: Implement WebRTC for real audio/video calling
// - Initialize WebRTC connection
// - Handle microphone/camera permissions
// - Implement actual audio/video streams
import { useTelegram } from '../../context/TelegramContext'
import { useState, useEffect } from 'react'

export function CallScreenModal() {
  const { modals, closeModal, currentChat } = useTelegram()
  const [callDuration, setCallDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [isSpeakerOn, setIsSpeakerOn] = useState(false)

  if (!modals.callScreen) return null

  useEffect(() => {
    const interval = setInterval(() => {
      setCallDuration(prev => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleEndCall = () => {
    closeModal('callScreen')
  }

  return (
    <div
      className="fixed inset-0 bg-[color:var(--tg-overlay)] flex items-center justify-center z-[10000] p-4 sm:p-6 md:p-8"
      onClick={handleEndCall}
    >
      <div
        className="modal-content bg-[color:var(--tg-bg)] rounded-2xl w-full max-w-[400px] sm:max-w-[450px] flex flex-col shadow-[0_8px_32px_var(--tg-shadow)] overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-[color:var(--tg-bg-secondary)] rounded-full text-[var(--tg-text-primary)] cursor-pointer z-10 hover:bg-[color:var(--tg-hover)] transition-colors"
          onClick={handleEndCall}
        >
          <i className="fas fa-times text-base"></i>
        </button>

        <div className="flex-1 w-full flex flex-col items-center justify-center px-6 py-8">
          {/* Avatar */}
          <div className="relative mb-5">
            <img
              src={currentChat?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'}
              alt={currentChat?.name}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-[color:var(--tg-bg-secondary)] shadow-lg"
            />
            <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-400 border-3 border-[color:var(--tg-bg)] rounded-full"></div>
          </div>

          {/* Name & Status */}
          <h2 className="text-[22px] sm:text-[26px] font-semibold text-[var(--tg-text-primary)] mb-2 text-center">
            {currentChat?.name || 'Unknown'}
          </h2>
          <p className="text-[15px] text-[var(--tg-text-secondary)] mb-6">
            {formatTime(callDuration)}
          </p>
        </div>

        {/* Call Controls */}
        <div className="w-full px-4 sm:px-6 pb-6 sm:pb-8">
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            {/* Mute Button */}
            <button
              className={`flex flex-col items-center gap-1.5 cursor-pointer transition-colors ${isMuted ? 'text-red-500' : 'text-[var(--tg-text-primary)]'}`}
              onClick={() => setIsMuted(!isMuted)}
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-colors ${isMuted ? 'bg-[color:var(--tg-hover)]' : 'bg-[color:var(--tg-bg-secondary)]'}`}>
                <i className={`fas ${isMuted ? 'fa-microphone-slash' : 'fa-microphone'} text-lg sm:text-xl`}></i>
              </div>
              <span className="text-[11px] text-[var(--tg-text-secondary)]">Mute</span>
            </button>

            {/* End Call Button */}
            <button
              className="flex flex-col items-center gap-1.5 cursor-pointer"
              onClick={handleEndCall}
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-red-500 hover:bg-red-600 transition-colors">
                <i className="fas fa-phone-slash text-white text-xl sm:text-2xl"></i>
              </div>
              <span className="text-[11px] text-[var(--tg-text-secondary)]">End</span>
            </button>

            {/* Speaker Button */}
            <button
              className={`flex flex-col items-center gap-1.5 cursor-pointer transition-colors ${isSpeakerOn ? 'text-[var(--tg-blue)]' : 'text-[var(--tg-text-primary)]'}`}
              onClick={() => setIsSpeakerOn(!isSpeakerOn)}
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-colors ${isSpeakerOn ? 'bg-[color:var(--tg-hover)]' : 'bg-[color:var(--tg-bg-secondary)]'}`}>
                <i className={`fas fa-volume-high text-lg sm:text-xl`}></i>
              </div>
              <span className="text-[11px] text-[var(--tg-text-secondary)]">Speaker</span>
            </button>

            {/* Video Toggle (for video calls) */}
            <button
              className={`flex flex-col items-center gap-1.5 cursor-pointer transition-colors ${isVideoOff ? 'text-red-500' : 'text-[var(--tg-text-primary)]'}`}
              onClick={() => setIsVideoOff(!isVideoOff)}
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-colors ${isVideoOff ? 'bg-[color:var(--tg-hover)]' : 'bg-[color:var(--tg-bg-secondary)]'}`}>
                <i className={`fas ${isVideoOff ? 'fa-video-slash' : 'fa-video'} text-lg sm:text-xl`}></i>
              </div>
              <span className="text-[11px] text-[var(--tg-text-secondary)]">Video</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
