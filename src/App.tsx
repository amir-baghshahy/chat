import { useEffect } from 'react'
import { Sidebar } from './components/Sidebar'
import { ChatArea } from './components/ChatArea'
import { HamburgerMenu } from './components/HamburgerMenu'
import { SettingsModal } from './components/modals/SettingsModal'
import { ProfileModal } from './components/modals/ProfileModal'
import { NewGroupModal } from './components/modals/NewGroupModal'
import { ContactsModal } from './components/modals/ContactsModal'
import { CallHistoryModal } from './components/modals/CallHistoryModal'
import { CallScreenModal } from './components/modals/CallScreenModal'
import { ForwardModal } from './components/modals/ForwardModal'
import { MyAccountModal } from './components/modals/MyAccountModal'
import { ChatSettingsModal } from './components/modals/ChatSettingsModal'
import { FoldersModal } from './components/modals/FoldersModal'
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
    goBack,
    openModal,
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
          className="hamburger-overlay fixed inset-0 bg-black/60 opacity-100 visible z-[9998] transition-opacity duration-300"
          onClick={() => closeModal('hamburger')}
        />
      )}

      {/* Hamburger Menu */}
      <HamburgerMenu />

      {/* Mobile Header - Only show when in chat on mobile */}
      {isMobile && currentChat && (
        <header className="mobile-header flex items-center px-2 sm:px-4 h-12 sm:h-14 bg-[color:var(--tg-bg)] border-b border-[color:var(--tg-border)] fixed top-0 left-0 right-0 z-[1000]">
          <button
            className="bg-transparent border-none text-[var(--tg-text-secondary)] cursor-pointer p-2 mr-1 sm:mr-2 flex-shrink-0"
            onClick={() => goBack()}
          >
            <i className="fas fa-arrow-left text-lg sm:text-xl"></i>
          </button>
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div
              className="relative cursor-pointer"
              onClick={() => openModal('profile')}
            >
              <img
                src={currentChat.avatar}
                alt={currentChat.name}
                loading="lazy"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
              />
              {currentChat.online && (
                <div className="absolute bottom-0 right-0.5 w-2.5 h-2.5 bg-green-400 border-2 border-[color:var(--tg-bg)] rounded-full"></div>
              )}
            </div>
            <div className="min-w-0" onClick={() => openModal('profile')}>
              <h3 className="text-[15px] sm:text-[16px] font-semibold text-[var(--tg-text-primary)] truncate">{currentChat.name}</h3>
              <p className="text-[12px] sm:text-[13px] text-[var(--tg-text-tertiary)] truncate">
                {currentChat.online ? 'online' : 'last seen recently'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 ml-2 sm:ml-3">
            <button
              className="bg-transparent border-none text-[var(--tg-text-secondary)] cursor-pointer p-2 flex-shrink-0 transition-colors hover:bg-[color:var(--tg-hover)] hover:text-[var(--tg-blue)] rounded-full"
              onClick={() => openModal('callScreen')}
              title="Call"
            >
              <i className="fas fa-phone text-lg sm:text-xl"></i>
            </button>
            <button
              className="bg-transparent border-none text-[var(--tg-text-secondary)] cursor-pointer p-2 flex-shrink-0 transition-colors hover:bg-[color:var(--tg-hover)] hover:text-[var(--tg-blue)] rounded-full"
              onClick={() => openModal('chatActions')}
              data-action="more-options"
            >
              <i className="fas fa-ellipsis-v text-lg sm:text-xl"></i>
            </button>
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
      {modals.callScreen && <CallScreenModal />}
      {modals.forward && <ForwardModal />}
      {modals.myAccount && <MyAccountModal />}
      {modals.chatSettings && <ChatSettingsModal />}
      {modals.folders && <FoldersModal />}

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
