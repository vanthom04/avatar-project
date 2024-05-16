export interface AvatarOption {
  hair: string
  eyes: string
  mouth: string
  accessory: string
  hand: string
  background: string
  color: string
}

export interface MyAvatar {
  id: number | string
  user_id: number | string
  template_id: string
  name: string
  thumbnail: string
  options: AvatarOption
  created_at: Date | string
  updated_at: Date | string
}
