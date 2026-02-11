import { useState } from 'react'
import { useTelegram } from '../../store'

export function FoldersModal() {
  const { modals, goBackSettings } = useTelegram()
  const [showCreateFolder, setShowCreateFolder] = useState(false)

  if (!modals.folders) return null

  return (
    <div
      className="modal-overlay fixed inset-0 bg-[color:var(--tg-overlay)] flex items-center justify-center z-[10000] animate-fade-in"
      onClick={() => goBackSettings('folders')}
    >
      <div
        className="modal-content bg-[color:var(--tg-bg-secondary)] rounded-lg w-[90%] max-w-[380px] max-h-[80vh] flex flex-col shadow-[0_8px_32px_var(--tg-shadow)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 py-3 flex items-center bg-[color:var(--tg-bg-secondary)] border-b border-[color:var(--tg-border)]">
          <button
            className="w-9 h-9 flex items-center justify-center bg-transparent border-none text-[var(--tg-text-primary)] cursor-pointer text-lg hover:bg-[color:var(--tg-hover)] rounded-full mr-2"
            onClick={() => goBackSettings('folders')}
          >
            <i className="fas fa-arrow-left"></i>
          </button>
          <h2 className="text-[18px] font-medium text-[var(--tg-text-primary)] flex-1">
            Folders
          </h2>
          <button
            className="w-9 h-9 flex items-center justify-center bg-[color:var(--tg-blue)] border-none text-white cursor-pointer text-base hover:bg-[color:var(--tg-blue-dark)] transition-colors"
            onClick={() => setShowCreateFolder(true)}
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-0 bg-[color:var(--tg-bg)] modal-scrollable">
          {showCreateFolder ? (
            <CreateFolderForm onCancel={() => setShowCreateFolder(false)} />
          ) : (
            <FoldersList onCreateFolder={() => setShowCreateFolder(true)} />
          )}
        </div>
      </div>
    </div>
  )
}

interface FoldersListProps {
  onCreateFolder: () => void
}

function FoldersList({ onCreateFolder }: FoldersListProps) {
  const folders = [
    { id: 1, name: 'Work', count: 5, icon: 'fa-briefcase', color: 'text-blue-500' },
    { id: 2, name: 'Personal', count: 3, icon: 'fa-user', color: 'text-green-500' },
    { id: 3, name: 'Friends', count: 8, icon: 'fa-users', color: 'text-purple-500' },
  ]

  return (
    <div className="py-2">
      {folders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 bg-[color:var(--tg-bg-secondary)] rounded-full flex items-center justify-center mb-4">
            <i className="fas fa-folder text-3xl text-[var(--tg-text-tertiary)]"></i>
          </div>
          <div className="text-[16px] text-[var(--tg-text-primary)] font-medium mb-2">No Folders Yet</div>
          <div className="text-[14px] text-[var(--tg-text-secondary)] mb-4">
            Create folders to organize your chats
          </div>
          <button
            className="bg-[color:var(--tg-blue)] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[color:var(--tg-blue-dark)] transition-colors"
            onClick={onCreateFolder}
          >
            Create Folder
          </button>
        </div>
      ) : (
        <div>
          {folders.map(folder => (
            <FolderItem key={folder.id} folder={folder} />
          ))}
          <div className="px-4 py-3 mt-2">
            <button
              className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-[color:var(--tg-border)] rounded-lg text-[var(--tg-text-secondary)] hover:border-[var(--tg-blue)] hover:text-[var(--tg-blue)] transition-colors"
              onClick={onCreateFolder}
            >
              <i className="fas fa-plus"></i>
              <span className="text-[15px] font-medium">Create New Folder</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

interface FolderItemProps {
  folder: {
    id: number
    name: string
    count: number
    icon: string
    color: string
  }
}

function FolderItem({ folder }: FolderItemProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 hover:bg-[color:var(--tg-hover)] cursor-pointer transition-colors">
      <div className="w-10 h-10 bg-[color:var(--tg-bg-secondary)] rounded-lg flex items-center justify-center flex-shrink-0">
        <i className={`fas ${folder.icon} ${folder.color}`}></i>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[15px] text-[var(--tg-text-primary)] font-medium truncate">{folder.name}</div>
        <div className="text-[13px] text-[var(--tg-text-secondary)]">{folder.count} chats</div>
      </div>
      <button className="w-8 h-8 flex items-center justify-center text-[var(--tg-text-tertiary)] hover:text-[var(--tg-text-primary)] hover:bg-[color:var(--tg-bg-secondary)] rounded-full transition-colors">
        <i className="fas fa-ellipsis-vertical"></i>
      </button>
    </div>
  )
}

interface CreateFolderFormProps {
  onCancel: () => void
}

function CreateFolderForm({ onCancel }: CreateFolderFormProps) {
  return (
    <div className="p-4">
      <div className="text-[18px] font-semibold text-[var(--tg-text-primary)] mb-4">Create New Folder</div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] text-[var(--tg-text-secondary)]">Folder Name</label>
          <input
            type="text"
            placeholder="Enter folder name..."
            className="w-full px-3 py-2.5 bg-[color:var(--tg-bg-secondary)] border border-[color:var(--tg-border)] rounded-lg text-[15px] text-[var(--tg-text-primary)] outline-none focus:border-[color:var(--tg-blue)] transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] text-[var(--tg-text-secondary)]">Icon</label>
          <div className="flex gap-2">
            {[
              { icon: 'fa-briefcase', color: 'text-blue-500' },
              { icon: 'fa-user', color: 'text-green-500' },
              { icon: 'fa-users', color: 'text-purple-500' },
              { icon: 'fa-heart', color: 'text-red-500' },
              { icon: 'fa-star', color: 'text-yellow-500' },
            ].map((item, index) => (
              <button
                key={index}
                className={`w-10 h-10 bg-[color:var(--tg-bg-secondary)] rounded-lg flex items-center justify-center hover:bg-[color:var(--tg-hover)] transition-colors ${index === 0 ? 'ring-2 ring-[color:var(--tg-blue)]' : ''}`}
              >
                <i className={`fas ${item.icon} ${item.color}`}></i>
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2 mt-2">
          <button
            className="flex-1 py-2.5 border border-[color:var(--tg-border)] rounded-lg text-[15px] text-[var(--tg-text-primary)] hover:bg-[color:var(--tg-hover)] transition-colors"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button className="flex-1 py-2.5 bg-[color:var(--tg-blue)] rounded-lg text-[15px] text-white hover:bg-[color:var(--tg-blue-dark)] transition-colors">
            Create
          </button>
        </div>
      </div>
    </div>
  )
}
