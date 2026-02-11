import { ChatHeader } from './ChatHeader'
import { MessageList } from '../message/MessageList'
import { MessageInput } from '../message/MessageInput'
import { ChatActionsMenu } from './ChatActionsMenu'

export function ChatView() {
  return (
    <div className="flex flex-col h-full relative">
      <ChatHeader />
      <MessageList />
      <MessageInput />
      <ChatActionsMenu />
    </div>
  )
}
