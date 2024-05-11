export interface AvatarOption {
  base: string
  hair: string
  eyes: string
  mouth: string
  accessory: string
  shirt: string
  hand: string
  background: string
  color: string
}

export interface MyAvatar {
  id: number | string
  user_id: number | string
  name: string
  thumbnail: string
  options: AvatarOption
  created_at: Date | string
  updated_at: Date | string
}

export interface Templates {
  id: number | string
  name: string
  thumbnail: string
  options: AvatarOption
  created_at: Date | string
  updated_at: Date | string
}
