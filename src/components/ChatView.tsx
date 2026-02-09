import { ChatHeader } from './ChatHeader'
import { MessageList } from './MessageList'
import { MessageInput } from './MessageInput'
import { ChatActionsMenu } from './ChatActionsMenu'

export function ChatView() {
  return (
    <div className="flex flex-col h-full">
      <ChatHeader />
      <MessageList />
      <MessageInput />
      <ChatActionsMenu />
    </div>
  )
}
