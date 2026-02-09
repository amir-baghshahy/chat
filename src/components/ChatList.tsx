import { ChatItem } from './ChatItem'
import { useTelegram } from '../contexts/TelegramContext'

export function ChatList() {
  const { filteredChats, currentChat } = useTelegram()

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin">
      {filteredChats.map(chat => (
        <ChatItem
          key={chat.id}
          chat={chat}
          isActive={currentChat?.id === chat.id}
        />
      ))}
    </div>
  )
}
