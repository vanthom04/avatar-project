import { RefetchOptions } from '@tanstack/react-query'
import { create } from 'zustand'
import { Template } from '~/types'

interface TemplateModalStore {
  isOpen: boolean
  template?: Template | null
  mode: 'create' | 'edit'
  onOpen: () => void
  onClose: () => void
  setMode: (mode: 'create' | 'edit') => void
  setTemplate: (template: Template | null) => void
  refetch?: (options?: RefetchOptions | undefined) => void
  setRefetch?: (refetch: (options?: RefetchOptions | undefined) => void) => void
}

const useTemplateModal = create<TemplateModalStore>((set) => ({
  isOpen: false,
  mode: 'create',
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setMode: (mode: 'create' | 'edit') => set({ mode }),
  setTemplate: (template: Template | null) => set({ template }),
  setRefetch: (refetch: (options?: RefetchOptions | undefined) => void) => set({ refetch })
}))

export default useTemplateModal
