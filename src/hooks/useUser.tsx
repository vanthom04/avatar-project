import { User, UserMetadata } from '@supabase/supabase-js'
import { createContext, useContext, useEffect, useState } from 'react'
// import jsCookie from 'js-cookie'

import { getRole } from '~/services/auth'
import { supabase } from '~/config'

type UserContextType = {
  accessToken: string | null
  user: User | null
  userDetails: UserMetadata | null
  isLoading: boolean
  role: 'admin' | 'editor' | 'user'
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [role, setRole] = useState<'admin' | 'editor' | 'user'>('user')
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [userDetails, setUserDetails] = useState<UserMetadata | null>(null)

  useEffect(() => {
    const checkTokenAndAuthorize = async (token: string | undefined) => {
      try {
        if (!token) return null
        const { data, error } = await supabase.auth.getUser(token)
        if (error) {
          console.error('Invalid token:', error.message)
          return null
        }
        return data.user
      } catch (error) {
        return null
      }
    }

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(async (_, session) => {
      const user = await checkTokenAndAuthorize(session?.access_token)
      const role = await getRole(session?.access_token)
      setRole(role)
      setAccessToken(session?.access_token || null)
      setUser(user || null)
      setUserDetails(user?.user_metadata || null)
      setIsLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const value: UserContextType = {
    accessToken,
    user,
    userDetails,
    isLoading,
    role
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserContextProvider')
  }

  return context
}
