import { create } from 'zustand'

export interface Option {
  id?: string | null
  name: string
  image_path: string
  image_url: string
  file?: File | null
}

interface FormDataItem {
  type: 'hair' | 'eyes' | 'mouth' | 'accessory' | 'hand'
  name: string
  options: Option[]
}

interface FormDataStore {
  name: string
  image_url?: string | null
  image_path?: string | null
  file?: File | null
  data: FormDataItem[] | null
  setOptions: (type: 'hair' | 'eyes' | 'mouth' | 'accessory' | 'hand', options: Option[]) => void
  reset: () => void
}

const initialData: FormDataItem[] = [
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

const useFormData = create<FormDataStore>((set) => ({
  name: '',
  image_url: null,
  image_path: null,
  file: null,
  data: initialData,
  setOptions: (type, options) =>
    set((state) => ({
      data: state.data?.map((item) => (item.type === type ? { ...item, options } : item))
    })),
  reset: () =>
    set({
      name: '',
      image_url: null,
      image_path: null,
      file: null,
      data: initialData
    })
}))

export default useFormData
