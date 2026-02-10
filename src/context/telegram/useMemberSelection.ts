import { useState, useCallback } from 'react'

export function useMemberSelection() {
  const [selectedMembers, setSelectedMembers] = useState<Set<number>>(new Set())

  const toggleMemberSelection = useCallback((memberId: number) => {
    setSelectedMembers((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(memberId)) {
        newSet.delete(memberId)
      } else {
        newSet.add(memberId)
      }
      return newSet
    })
  }, [])

  return {
    selectedMembers,
    toggleMemberSelection,
  }
}
