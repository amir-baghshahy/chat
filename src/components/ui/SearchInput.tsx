import { useTelegram } from '../../context/TelegramContext'

interface SearchInputProps {
  context?: 'chats' | 'contacts' | 'members'
}

export function SearchInput({ context = 'chats' }: SearchInputProps) {
  const { searchQuery, setSearchQuery, contactsSearchQuery, setContactsSearchQuery, memberSearchQuery, setMemberSearchQuery } = useTelegram()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (context === 'chats') setSearchQuery(e.target.value)
    else if (context === 'contacts') setContactsSearchQuery(e.target.value)
    else if (context === 'members') setMemberSearchQuery(e.target.value)
  }

  const getValue = () => {
    if (context === 'chats') return searchQuery
    if (context === 'contacts') return contactsSearchQuery
    return memberSearchQuery
  }

  return (
    <div className="flex-1 flex items-center bg-[color:var(--tg-bg-secondary)] rounded-[22px] px-4 py-2 gap-2">
      <i className="fas fa-search text-[var(--tg-text-tertiary)] text-sm"></i>
      <input
        type="text"
        placeholder="Search..."
        className="flex-1 border-none bg-transparent outline-none text-[15px] text-[var(--tg-text-primary)] placeholder:text-[var(--tg-text-tertiary)]"
        value={getValue()}
        onChange={handleChange}
      />
    </div>
  )
}
