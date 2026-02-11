import { useState } from 'react'
import { useTelegram } from '../../context/TelegramContext'
import { TypingIndicator } from './ChatIndicators'


export function ChatHeader() {
  const { currentChat, openModal, closeModal, modals, isChatTyping, chatSearchQuery, setChatSearchQuery } = useTelegram()
  const [showChatSearch, setShowChatSearch] = useState(false)

  if (!currentChat) return null

  const handleAction = (action: string) => {
    switch (action) {
      case 'view-profile':
        closeModal('chatActions')
        openModal('profile')
        break
      case 'search-chat':
        // Toggle chat search input
        setShowChatSearch(!showChatSearch)
        if (showChatSearch) {
          setChatSearchQuery('')
        }
        break
      case 'phone-call':
        closeModal('chatActions')
        openModal('callScreen')
        break
      case 'video-call':
        closeModal('chatActions')
        openModal('callScreen')
        break
      case 'more-options':
        // Toggle chatActions menu
        if (modals.chatActions) {
          closeModal('chatActions')
        } else {
          openModal('chatActions')
        }
        break
      default:
        break
    }
  }

  return (
    <>
      {/* Desktop Header */}
      <div className="hidden lg:flex items-center justify-between px-3 sm:px-5 py-2.5 bg-[color:var(--tg-bg)] border-b border-[color:var(--tg-border)] relative">
        {showChatSearch ? (
          <div className="flex-1 flex items-center gap-2">
            <input
              type="text"
              placeholder="Search messages..."
              value={chatSearchQuery}
              onChange={(e) => setChatSearchQuery(e.target.value)}
              className="flex-1 px-3 py-2 bg-[color:var(--tg-bg-secondary)] border border-[color:var(--tg-border)] rounded-lg text-[15px] text-[var(--tg-text-primary)] placeholder:text-[var(--tg-text-tertiary)] outline-none focus:border-[color:var(--tg-blue)]"
              autoFocus
            />
            <button
              className="bg-transparent border-none text-[var(--tg-text-secondary)] cursor-pointer p-2 rounded-full transition-colors hover:bg-[color:var(--tg-hover)] hover:text-[var(--tg-blue)]"
              onClick={() => handleAction('search-chat')}
              title="Close search"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        ) : (
          <>
            <div
              className="flex items-center gap-2 sm:gap-3 cursor-pointer"
              onClick={() => openModal('profile')}
            >
              <div className="relative">
                <img
                  src={currentChat.avatar}
                  alt={currentChat.name}
                  className="w-[38px] sm:w-[42px] h-[38px] sm:h-[42px] rounded-full object-cover"
                />
                {currentChat.online && (
                  <div className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-400 border-2 border-[color:var(--tg-bg)] rounded-full"></div>
                )}
              </div>
              <div>
                <h3 className="text-[15px] sm:text-[16px] font-semibold text-[var(--tg-text-primary)] truncate">{currentChat.name}</h3>
                <div className="text-[12px] sm:text-[13px] text-[var(--tg-text-tertiary)] mt-0.5">
                  {isChatTyping(currentChat.id) ? (
                    <TypingIndicator chatId={currentChat.id} />
                  ) : (
                    currentChat.online ? 'online' : 'last seen recently'
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-0.5 sm:gap-1">
              <button
                className="bg-transparent border-none text-[var(--tg-text-secondary)] cursor-pointer p-1.5 sm:p-2 rounded-full transition-all hover:bg-[color:var(--tg-hover)] hover:text-[var(--tg-blue)] w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center"
                onClick={() => handleAction('search-chat')}
                title="Search"
              >
                <i className="fas fa-search text-base sm:text-lg"></i>
              </button>
              <button
                className="bg-transparent border-none text-[var(--tg-text-secondary)] cursor-pointer p-1.5 sm:p-2 rounded-full transition-all hover:bg-[color:var(--tg-hover)] hover:text-[var(--tg-blue)] w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center"
                onClick={() => handleAction('phone-call')}
                title="Call"
              >
                <i className="fas fa-phone text-base sm:text-lg"></i>
              </button>
              <button
                className="bg-transparent border-none text-[var(--tg-text-secondary)] cursor-pointer p-1.5 sm:p-2 rounded-full transition-all hover:bg-[color:var(--tg-hover)] hover:text-[var(--tg-blue)] w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center"
                onClick={() => handleAction('video-call')}
                title="Video Call"
              >
                <i className="fas fa-video text-base sm:text-lg"></i>
              </button>
              <button
                className="bg-transparent border-none text-[var(--tg-text-secondary)] cursor-pointer p-1.5 sm:p-2 rounded-full transition-all hover:bg-[color:var(--tg-hover)] hover:text-[var(--tg-blue)] w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center"
                onClick={() => handleAction('more-options')}
                title="More"
                data-action="more-options"
              >
                <i className="fas fa-ellipsis-vertical text-base sm:text-lg"></i>
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
