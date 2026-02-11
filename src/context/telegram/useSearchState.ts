import { useState } from 'react'

export function useSearchState() {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [contactsSearchQuery, setContactsSearchQuery] = useState<string>('')
  const [memberSearchQuery, setMemberSearchQuery] = useState<string>('')
  const [chatSearchQuery, setChatSearchQuery] = useState<string>('')

  return {
    searchQuery,
    contactsSearchQuery,
    memberSearchQuery,
    chatSearchQuery,
    setSearchQuery,
    setContactsSearchQuery,
    setMemberSearchQuery,
    setChatSearchQuery,
  }
}
