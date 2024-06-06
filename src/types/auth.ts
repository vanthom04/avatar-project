import { User } from '@supabase/supabase-js'

export type RoleType = 'admin' | 'editor' | 'user'

export interface UserRole {
  user_id: string
  roles: {
    name: string
  }
}

export interface SignIn {
  access_token: string
  token_type: string
  expires_in: number
  expires_at: number
  refresh_token: string
  user: User
}
