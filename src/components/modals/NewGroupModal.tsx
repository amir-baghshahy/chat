import { useTelegram } from '../../contexts/TelegramContext'

export function NewGroupModal() {
  const { modals, closeModal, filteredMembers, toggleMemberSelection, selectedMembers, showToast } = useTelegram()

  if (!modals.newGroup) return null

  const handleCreateGroup = () => {
    const groupName = (document.getElementById('groupNameInput') as HTMLInputElement)?.value?.trim()
    if (!groupName) {
      showToast('Error', 'Please enter a group name', 'error')
      return
    }
    if (selectedMembers.size === 0) {
      showToast('Error', 'Please select at least one member', 'error')
      return
    }

    showToast('Group Created', `Group: ${groupName} with ${selectedMembers.size} members`, 'success')
    closeModal('newGroup')
  }

  return (
    <div
      className="fixed inset-0 bg-[color:var(--tg-overlay)] flex items-center justify-center z-[10000]"
      onClick={() => closeModal('newGroup')}
    >
      <div
        className="bg-[color:var(--tg-bg)] rounded-xl w-[90%] max-w-[500px] max-h-[80vh] flex flex-col shadow-[0_8px_32px_var(--tg-shadow)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 flex items-center justify-between border-b border-[color:var(--tg-border)]">
          <h2 className="text-[18px] font-semibold">New Group</h2>
          <button
            className="w-9 h-9 flex items-center justify-center bg-transparent border-none text-[color:var(--tg-text-secondary)] cursor-pointer text-xl rounded-full transition-colors hover:bg-[color:var(--tg-hover)]"
            onClick={() => closeModal('newGroup')}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 modal-scrollable">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Group Name"
              id="groupNameInput"
              className="w-full px-4 py-3 border border-[color:var(--tg-border)] rounded-lg bg-[color:var(--tg-bg)] text-[color:var(--tg-text-primary)] text-[15px] outline-none transition-colors focus:border-[color:var(--tg-blue)]"
            />
          </div>

          <div>
            <h3 className="text-[14px] font-semibold text-[color:var(--tg-text-secondary)] mb-3">
              Select Members
            </h3>
            <div className="max-h-[300px] overflow-y-auto mb-4 modal-scrollable">
              {filteredMembers.map(member => (
                <div
                  key={member.id}
                  className={`flex items-center px-2.5 py-2.5 cursor-pointer rounded-lg transition-colors gap-3
                    ${selectedMembers.has(member.id) ? 'bg-[color:var(--tg-blue-light)]' : 'hover:bg-[color:var(--tg-hover)]'}
                  `}
                  onClick={() => toggleMemberSelection(member.id)}
                >
                  <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
                  <span className="flex-1 text-[15px] text-[color:var(--tg-text-primary)]">{member.name}</span>
                  <div
                    className={`w-5 h-5 border-2 rounded-full flex items-center justify-center
                      ${selectedMembers.has(member.id) ? 'bg-[color:var(--tg-blue)] border-[color:var(--tg-blue)]' : 'border-[color:var(--tg-text-tertiary)]'}
                    `}
                  >
                    {selectedMembers.has(member.id) && <i className="fas fa-check text-white text-xs"></i>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className="w-full px-6 py-3 bg-[color:var(--tg-blue)] border-none rounded-lg text-white text-[15px] font-semibold cursor-pointer transition-colors hover:bg-[color:var(--tg-blue-dark)]"
            onClick={handleCreateGroup}
          >
            Create Group
          </button>
        </div>
      </div>
    </div>
  )
}
