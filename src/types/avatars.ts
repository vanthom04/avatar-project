export interface OptionsType {
  id: string | null
  type: string
  value: string
}

export interface AvatarsType {
  id: number | string
  name: string
  image_path: string
  created_at: Date
  updated_at: Date | null
  user_id: string
  template_id: string
  options: OptionsType[]
}
