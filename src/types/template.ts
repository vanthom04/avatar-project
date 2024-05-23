export type CategoryType = 'hair' | 'eyes' | 'mouth' | 'accessory' | 'hand'

export interface Template {
  id: string
  name: string
  image_path: string
  image_url?: string
  created_at: Date | string
  updated_at: Date | string | null
  categories: Category[]
}

export interface Category {
  id: string
  template_id: string
  type: CategoryType
  name: string
  created_at: Date | string
  options: Option[]
}

export interface Option {
  id: string
  category_id: string
  name: string
  image_path: string
  image_url?: string
  created_at: Date | string
}
