import { create } from 'zustand'
import { CategoryType } from '~/types'

export interface Option {
  id?: string | null
  name: string
  image_path: string
  image_url: string
  file?: File | null
}

export interface Category {
  type: CategoryType
  name: string
  options: Option[]
}

interface FormDataStore {
  data: Category[] | null
  setOptions: (type: CategoryType, options: Option[]) => void
  reset: () => void
}

export const initialData: Category[] = [
  {
    type: 'hair',
    name: 'Hair',
    options: []
  },
  {
    type: 'eyes',
    name: 'Eyes',
    options: []
  },
  {
    type: 'mouth',
    name: 'Mouth',
    options: []
  },
  {
    type: 'accessory',
    name: 'Accessory',
    options: []
  },
  {
    type: 'hand',
    name: 'Hand',
    options: []
  }
]

const useFormData: () => FormDataStore = create<FormDataStore>((set) => ({
  data: [...initialData],
  setOptions: (type, options) =>
    set((state) => ({
      data: state.data?.map((item) => (item.type === type ? { ...item, options } : item))
    })),
  reset: () => set({ data: [...initialData] })
}))

export default useFormData
