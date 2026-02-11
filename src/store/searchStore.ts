import { create } from 'zustand'

interface SearchStore {
  // State
  searchQuery: string
  contactsSearchQuery: string
  memberSearchQuery: string
  chatSearchQuery: string

  // Actions
  setSearchQuery: (query: string) => void
  setContactsSearchQuery: (query: string) => void
  setMemberSearchQuery: (query: string) => void
  setChatSearchQuery: (query: string) => void
}

export const useSearchStore = create<SearchStore>((set) => ({
  // Initial state
  searchQuery: '',
  contactsSearchQuery: '',
  memberSearchQuery: '',
  chatSearchQuery: '',

  // Actions
  setSearchQuery: (query) => set({ searchQuery: query }),
  setContactsSearchQuery: (query) => set({ contactsSearchQuery: query }),
  setMemberSearchQuery: (query) => set({ memberSearchQuery: query }),
  setChatSearchQuery: (query) => set({ chatSearchQuery: query }),
}))
