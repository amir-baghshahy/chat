import { useState } from 'react'

export function useSearchState() {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [contactsSearchQuery, setContactsSearchQuery] = useState<string>('')
  const [memberSearchQuery, setMemberSearchQuery] = useState<string>('')

  return {
    searchQuery,
    contactsSearchQuery,
    memberSearchQuery,
    setSearchQuery,
    setContactsSearchQuery,
    setMemberSearchQuery,
  }
}
