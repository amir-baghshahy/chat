// ===== Data Module =====
// All mock data for the application

import type { User, CallHistory, Chat, Contact } from './types'

export const currentUser: User = {
  firstName: 'John',
  lastName: 'Doe',
  username: '@johndoe',
  bio: 'Hey there! I am using Telegram.',
  phone: '+1 234 567 8900',
  avatar: 'https://i.pravatar.cc/150?img=10'
}

export const callHistoryData: CallHistory[] = [
  { id: 1, name: 'John Smith', avatar: 'https://i.pravatar.cc/150?img=1', type: 'incoming', duration: '5:23', time: 'Today 12:30', missed: false },
  { id: 2, name: 'Mary Johnson', avatar: 'https://i.pravatar.cc/150?img=3', type: 'outgoing', duration: '12:45', time: 'Today 10:20', missed: false },
  { id: 3, name: 'David Wilson', avatar: 'https://i.pravatar.cc/150?img=5', type: 'incoming', duration: '0:00', time: 'Yesterday 18:00', missed: true },
  { id: 4, name: 'Sarah Davis', avatar: 'https://i.pravatar.cc/150?img=7', type: 'video', duration: '3:10', time: 'Monday 15:30', missed: false },
  { id: 5, name: 'Alice Brown', avatar: 'https://i.pravatar.cc/150?img=11', type: 'outgoing', duration: '25:00', time: 'Monday 11:00', missed: false }
]

export const chatsData: Chat[] = [
  {
    id: 1,
    name: 'John Smith',
    username: '@johnsmith',
    avatar: 'https://i.pravatar.cc/150?img=1',
    lastMessage: 'Check out this photo!',
    time: '12:30',
    unread: 2,
    online: true,
    isPinned: true,
    messages: [
      { id: 1, text: 'Hey there!', time: '12:25', outgoing: true, status: 'read' },
      { id: 2, type: 'image', url: 'https://picsum.photos/400/300?random=1', text: 'Check out this photo!', time: '12:30', outgoing: false },
      { id: 3, text: 'That looks amazing! Where did you take it?', time: '12:32', outgoing: true, status: 'read' },
      { id: 4, text: 'Thanks! It was at the beach last weekend', time: '12:35', outgoing: false },
    ]
  },
  {
    id: 2,
    name: 'Mary Johnson',
    username: '@maryj',
    avatar: 'https://i.pravatar.cc/150?img=3',
    lastMessage: 'Thanks a lot',
    time: '10:20',
    unread: 0,
    online: true,
    messages: [
      { id: 1, type: 'image', url: 'https://picsum.photos/400/300?random=3', text: 'I sent the file', time: '10:15', outgoing: true, status: 'read' },
      { id: 2, text: 'Thanks a lot', time: '10:20', outgoing: false },
      { id: 3, text: 'You\'re welcome! Let me know if you need anything else', time: '10:22', outgoing: true, status: 'read' },
    ]
  },
  {
    id: 3,
    name: 'David Wilson',
    username: '@davidw',
    avatar: 'https://i.pravatar.cc/150?img=5',
    lastMessage: 'See you tomorrow',
    time: 'Yesterday',
    unread: 0,
    online: false,
    muted: true,
    messages: [
      { id: 1, text: 'Free tomorrow?', time: '18:00', outgoing: false },
      { id: 2, text: 'Yeah, what time?', time: '18:05', outgoing: true, status: 'read' },
      { id: 3, text: 'See you tomorrow', time: '18:10', outgoing: false },
    ]
  },
  {
    id: 4,
    name: 'Sarah Davis',
    username: '@sarahd',
    avatar: 'https://i.pravatar.cc/150?img=7',
    lastMessage: 'Done 👍',
    time: 'Monday',
    unread: 0,
    online: true,
    messages: [
      { id: 1, text: 'Did you finish the project?', time: '10:00', outgoing: true, status: 'read' },
      { id: 2, text: 'Done 👍', time: '10:30', outgoing: false },
      { id: 3, text: 'Great work!', time: '10:31', outgoing: true, status: 'read' },
    ]
  },
  {
    id: 5,
    name: 'Alice Brown',
    username: '@aliceb',
    avatar: 'https://i.pravatar.cc/150?img=11',
    lastMessage: 'Sure, let\'s meet',
    time: 'Sunday',
    unread: 0,
    online: false,
    messages: [
      { id: 1, text: 'Hey! Want to grab coffee sometime?', time: '14:00', outgoing: false },
      { id: 2, text: 'Sure, let\'s meet', time: '14:05', outgoing: true, status: 'read' },
      { id: 3, text: 'How about Saturday at 3pm?', time: '14:06', outgoing: false },
    ]
  },
  {
    id: 6,
    name: 'Bob Taylor',
    username: '@bobtaylor',
    avatar: 'https://i.pravatar.cc/150?img=12',
    lastMessage: 'Sounds good!',
    time: 'Saturday',
    unread: 0,
    online: false,
    messages: [
      { id: 1, text: 'Can you review my code?', time: '09:00', outgoing: false },
      { id: 2, text: 'Sure, send it over', time: '09:05', outgoing: true, status: 'read' },
      { id: 3, text: 'Sounds good!', time: '09:10', outgoing: false },
    ]
  },
  {
    id: 7,
    name: 'Charlie Miller',
    username: '@charlie_m',
    avatar: 'https://i.pravatar.cc/150?img=13',
    lastMessage: 'See you then!',
    time: 'Friday',
    unread: 0,
    online: true,
    messages: [
      { id: 1, text: 'Meeting at 5pm?', time: '11:00', outgoing: true, status: 'read' },
      { id: 2, text: 'See you then!', time: '11:02', outgoing: false },
    ]
  },
  {
    id: 999,
    name: 'Saved Messages',
    isSaved: true,
    avatar: 'https://web.telegram.org/img/file_icon_7.png',
    lastMessage: 'Important notes...',
    time: 'Recently',
    unread: 0,
    online: false,
    isPinned: true,
    messages: [
      { id: 1, text: 'My important notes and saved messages', time: '10:00', outgoing: true, status: 'read' },
      { id: 2, type: 'image', url: 'https://picsum.photos/400/300?random=5', text: 'Saved photo', time: '11:00', outgoing: true, status: 'read' },
      { id: 3, text: 'Remember to call mom tomorrow', time: '12:00', outgoing: true, status: 'read' },
    ]
  }
]

export const contactsData: Contact[] = [
  { id: 1, name: 'Alice Brown', username: '@aliceb', avatar: 'https://i.pravatar.cc/150?img=11', status: 'online' },
  { id: 2, name: 'Bob Taylor', username: '@bobtaylor', avatar: 'https://i.pravatar.cc/150?img=12', status: 'last seen recently' },
  { id: 3, name: 'Charlie Miller', username: '@charlie_m', avatar: 'https://i.pravatar.cc/150?img=13', status: 'online' },
  { id: 4, name: 'Diana Garcia', username: '@dianag', avatar: 'https://i.pravatar.cc/150?img=14', status: 'last seen yesterday' },
  { id: 5, name: 'Edward Martinez', username: '@edward_m', avatar: 'https://i.pravatar.cc/150?img=15', status: 'online' },
  { id: 6, name: 'Fiona Anderson', username: '@fionaa', avatar: 'https://i.pravatar.cc/150?img=16', status: 'last seen 2h ago' },
  { id: 7, name: 'George Thomas', username: '@geothomas', avatar: 'https://i.pravatar.cc/150?img=17', status: 'online' },
  { id: 8, name: 'Hannah Jackson', username: '@hannahj', avatar: 'https://i.pravatar.cc/150?img=18', status: 'last seen recently' }
]

export const emojiData: Record<string, string[]> = {
  smileys: ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙'],
  people: ['👋', '🤚', '👋', '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👍', '👎', '✊', '👊', '🤛', '🤜'],
  animals: ['🐱', '🐶', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦆'],
  food: ['🍕', '🍔', '🍟', '🌭', '🍿', '🧂', '🥓', '🥚', '🍳', '🧇', '🥞', '🧈', '🍞', '🥐', '🥖', '🥨', '🧀', '🥗', '🥙', '🧆'],
  activities: ['⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🪀', '🏓', '🏸', '🏒', '🏑', '🥍', '🏏', '🥅', '⛳', '🪁'],
  objects: ['💡', '🔦', '🏮', '🪔', '📱', '💻', '🖥️', '🖨️', '⌨️', '🖱️', '💽', '💾', '💿', '📀', '📼', '📷', '📸', '📹', '🎥', '📞']
}
