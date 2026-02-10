import { useTelegram } from '../../context/TelegramContext'
import { chatsData } from '../../data'
import type { Contact } from '../../types'

export function ContactsModal() {
  const { modals, closeModal, filteredContacts, openChat } = useTelegram()

  if (!modals.contacts) return null

  // TODO: Backend - When clicking a contact, need to either:
  // 1. Find existing chat with this contact
  // 2. Create a new chat if none exists
  const handleContactClick = (contact: Contact) => {
    closeModal('contacts')
    // Find chat with this contact's name
    const existingChat = chatsData.find((chat) => chat.name === contact.name)
    if (existingChat) {
      openChat(existingChat.id)
    } else {
      // TODO: Backend - Create new chat API call
      // For now, find or create a chat for this contact
      // In production: POST /api/chats with contactId
    }
  }

  return (
    <div
      className="modal-overlay fixed inset-0 bg-[color:var(--tg-overlay)] flex items-center justify-center z-[10000]"
      onClick={() => closeModal('contacts')}
    >
      <div
        className="modal-content bg-[color:var(--tg-bg)] rounded-xl w-[90%] max-w-[500px] max-h-[80vh] flex flex-col shadow-[0_8px_32px_var(--tg-shadow)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 flex items-center justify-between border-b border-[color:var(--tg-border)]">
          <h2 className="text-[18px] font-semibold text-[var(--tg-text-primary)]">Contacts</h2>
          <button
            className="w-9 h-9 flex items-center justify-center bg-transparent border-none text-[var(--tg-text-secondary)] cursor-pointer text-xl rounded-full transition-colors hover:bg-[color:var(--tg-hover)]"
            onClick={() => closeModal('contacts')}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 modal-scrollable">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search contacts..."
              className="w-full px-4 py-3 border border-[color:var(--tg-border)] rounded-lg bg-[color:var(--tg-bg)] text-[var(--tg-text-primary)] text-[15px] outline-none transition-colors focus:border-[color:var(--tg-blue)]"
            />
          </div>

          <div className="max-h-[400px] overflow-y-auto scrollbar-thin">
            {filteredContacts.map(contact => (
              <div
                key={contact.id}
                className="flex items-center px-3 py-3 cursor-pointer rounded-lg transition-colors gap-3 hover:bg-[color:var(--tg-hover)]"
                onClick={() => handleContactClick(contact)}
              >
                <div className="relative">
                  <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full object-cover" />
                  {contact.status === 'online' && (
                    <div className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-400 border-2 border-[color:var(--tg-bg)] rounded-full"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-[15px] font-semibold text-[var(--tg-text-primary)]">{contact.name}</div>
                  <div className="text-[13px] text-[var(--tg-text-tertiary)] mt-0.5">{contact.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
