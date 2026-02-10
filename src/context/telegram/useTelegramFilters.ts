import { useMemo } from 'react'
import { chatsData, contactsData, emojiData } from '../../data'

interface UseTelegramFiltersProps {
  searchQuery: string
  contactsSearchQuery: string
  memberSearchQuery: string
  emojiCategory: string
  emojiSearchQuery: string
}

export function useTelegramFilters({
  searchQuery,
  contactsSearchQuery,
  memberSearchQuery,
  emojiCategory,
  emojiSearchQuery,
}: UseTelegramFiltersProps) {
  return useMemo(
    () => ({
      filteredChats: searchQuery
        ? chatsData.filter(
            (chat) =>
              chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : chatsData,

      filteredContacts: contactsSearchQuery
        ? contactsData.filter((contact) => contact.name.toLowerCase().includes(contactsSearchQuery.toLowerCase()))
        : contactsData,

      filteredMembers: memberSearchQuery
        ? contactsData.filter((contact) => contact.name.toLowerCase().includes(memberSearchQuery.toLowerCase()))
        : contactsData,

      filteredEmojis: emojiSearchQuery
        ? Object.values(emojiData)
            .flat()
            .filter((emoji) => emoji.includes(emojiSearchQuery.toLowerCase()))
        : emojiData[emojiCategory] || emojiData.smileys,
    }),
    [searchQuery, contactsSearchQuery, memberSearchQuery, emojiCategory, emojiSearchQuery]
  )
}
