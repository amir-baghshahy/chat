import { SearchInput } from '../ui/SearchInput'
import { ChatList } from '../chat/ChatList'
import { useTelegram } from '../../store'

export function Sidebar() {
  const { isMobile, currentChat, openModal } = useTelegram()

  return (
    <aside
      className={`${isMobile ? 'w-full' : 'w-[var(--sidebar-width)]'} bg-[color:var(--tg-bg)] border-r border-[color:var(--tg-border)] flex flex-col transition-transform duration-300
        ${isMobile && currentChat ? 'hidden' : ''}
        ${isMobile ? 'absolute inset-y-0 left-0 z-[40]' : ''}
      `}
    >
      {/* Sidebar Header */}
      <div className="px-4 py-3 flex items-center gap-3 border-b border-[color:var(--tg-border)]">
        <button
          className="bg-transparent border-none text-[var(--tg-blue)] cursor-pointer p-2 transition-colors hover:text-[var(--tg-blue-dark)]"
          onClick={() => openModal('hamburger')}
        >
          <i className="fas fa-bars text-xl"></i>
        </button>
        <SearchInput />
      </div>

      {/* Chat List */}
      <ChatList />
    </aside>
  )
}
