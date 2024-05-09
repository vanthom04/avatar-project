import { User, UserMetadata } from '@supabase/supabase-js'
import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '~/config'

type UserContextType = {
  accessToken: string | null
  user: User | null
  userDetails: UserMetadata | null
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [userDetails, setUserDetails] = useState<UserMetadata | null>(null)

  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_, session) => {
      setAccessToken(session?.access_token || null)
      setUser(session?.user || null)
      setUserDetails(session?.user?.user_metadata || null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const value: UserContextType = {
    accessToken,
    user,
    userDetails
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
