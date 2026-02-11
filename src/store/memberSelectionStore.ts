import { create } from 'zustand'

interface MemberSelectionStore {
  selectedMembers: Set<number>
  toggleMemberSelection: (memberId: number) => void
  clearSelection: () => void
}

export const useMemberSelectionStore = create<MemberSelectionStore>((set, get) => ({
  selectedMembers: new Set<number>(),

  toggleMemberSelection: (memberId: number) => {
    const { selectedMembers } = get()
    const newSet = new Set(selectedMembers)
    if (newSet.has(memberId)) {
      newSet.delete(memberId)
    } else {
      newSet.add(memberId)
    }
    set({ selectedMembers: newSet })
  },

  clearSelection: () => set({ selectedMembers: new Set<number>() }),
}))
