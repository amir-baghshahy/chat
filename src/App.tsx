import { useState, useEffect } from 'react'
import { Sidebar } from './components/Sidebar'
import { ChatArea } from './components/ChatArea'
import { HamburgerMenu } from './components/HamburgerMenu'
import { SettingsModal } from './components/modals/SettingsModal'
import { ProfileModal } from './components/modals/ProfileModal'
import { NewGroupModal } from './components/modals/NewGroupModal'
import { ContactsModal } from './components/modals/ContactsModal'
import { CallHistoryModal } from './components/modals/CallHistoryModal'
import { ForwardModal } from './components/modals/ForwardModal'
import { ToastContainer } from './components/ToastContainer'
import { useTelegram } from './contexts/TelegramContext'
import { TelegramProvider } from './contexts/TelegramContext'

function AppContent() {
  const {
    currentChat,
    isDarkMode,
    isMobile,
    modals,
    closeModal,
  } = useTelegram()

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      document.body.classList.remove('light-mode')
      document.body.classList.add('dark-mode')
    } else {
      document.documentElement.classList.remove('dark')
      document.body.classList.remove('dark-mode')
      document.body.classList.add('light-mode')
    }
  }, [isDarkMode])

  return (
    <div className={`flex h-screen w-full telegram-container ${isDarkMode ? 'dark' : ''}`}>
      {/* Hamburger Menu Overlay */}
      {modals.hamburger && (
        <div
          className="fixed inset-0 bg-black/60 opacity-100 visible z-[9998] transition-opacity duration-300"
          onClick={() => closeModal('hamburger')}
        />
      )}

      {/* Hamburger Menu */}
      <HamburgerMenu />

      {/* Mobile Header - Only show when in chat on mobile */}
      {isMobile && currentChat && (
        <header className="mobile-header flex items-center px-2 sm:px-4 h-12 sm:h-14 bg-[color:var(--tg-bg)] border-b border-[color:var(--tg-border)] fixed top-0 left-0 right-0 z-[1000]">
          <button
            className="bg-transparent border-none text-[color:var(--tg-text-secondary)] cursor-pointer p-2 mr-1 sm:mr-2 flex-shrink-0"
            onClick={() => closeModal('chat')}
          >
            <i className="fas fa-arrow-left text-lg sm:text-xl"></i>
          </button>
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <img
              src={currentChat.avatar}
              alt={currentChat.name}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
            />
            <div className="min-w-0">
              <h3 className="text-[15px] sm:text-[16px] font-semibold text-[color:var(--tg-text-primary)] truncate">{currentChat.name}</h3>
              <p className="text-[12px] sm:text-[13px] text-[color:var(--tg-text-tertiary)] truncate">
                {currentChat.online ? 'online' : 'last seen recently'}
              </p>
            </div>
          </div>
        </header>
      )}

      {/* Sidebar */}
      <Sidebar />

      {/* Main Chat Area */}
      <ChatArea />

      {/* Modals */}
      {modals.settings && <SettingsModal />}
      {modals.profile && <ProfileModal />}
      {modals.newGroup && <NewGroupModal />}
      {modals.contacts && <ContactsModal />}
      {modals.callHistory && <CallHistoryModal />}
      {modals.forward && <ForwardModal />}

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  )
}

function App() {
  return (
    <TelegramProvider>
      <AppContent />
    </TelegramProvider>
  )
}

export default App
