import { CategoryType } from './template'

export interface AvatarOption {
  id: string | null
  type: CategoryType
  value: string
}

export interface MyAvatar {
  id: string
  user_id: string
  template_id: string
  name: string
  image_path: string
  thumbnail?: string
  created_at: Date | string
  updated_at: Date | string | null
  options: AvatarOption[]
}
