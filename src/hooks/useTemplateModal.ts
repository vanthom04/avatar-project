import { create } from 'zustand'

interface TemplateModalStore {
  isOpen: boolean
  idTemplate: number
  mode: 'create' | 'edit'
  onOpen: () => void
  onClose: () => void
  setMode: (mode: 'create' | 'edit') => void
  setIdTemplate: (id: number) => void
}

const useTemplateModal = create<TemplateModalStore>((set) => ({
  isOpen: false,
  idTemplate: 0,
  mode: 'create',
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setMode: (mode: 'create' | 'edit') => set({ mode }),
  setIdTemplate: (id: number) => set({ idTemplate: id })
}))

export default useTemplateModal
