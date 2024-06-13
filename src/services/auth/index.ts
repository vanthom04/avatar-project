import { User } from '@supabase/supabase-js'
import { SignIn, RoleType, UserRole } from '~/types'
import { http } from '~/utils/http'

export const getRole = async (accessToken: string | undefined): Promise<RoleType> => {
  if (!accessToken) return 'user'
  try {
    const res = await http.get<UserRole[]>('/rest/v1/user_roles', {
      params: {
        select: 'user_id, roles(name)'
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })

    return res[0].roles.name as RoleType
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getUser = async (accessToken: string): Promise<User> => {
  try {
    return await http.get('/auth/v1/user', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

export const signIn = async (email: string, password: string): Promise<SignIn> => {
  try {
    return await http.post<SignIn>(
      '/auth/v1/token?grant_type=password',
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  } catch (error) {
    return Promise.reject(error)
  }
}

export const signUp = async (email: string, password: string, options?: object) => {
  try {
    return await http.post(
      '/auth/v1/signup',
      { email, password, data: options },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  } catch (error) {
    return Promise.reject(error)
  }
}

export const signOut = async () => {
  try {
    return await http.post(
      '/auth/v1/logout',
      {},
      {
        params: {
          scope: 'global'
        }
      }
    )
  } catch (error) {
    return Promise.reject(error)
  }
}

export const recoverPassword = async (email: string, redirectTo?: string) => {
  try {
    return await http.post(
      '/auth/v1/recover',
      { email },
      {
        params: {
          redirect_to: redirectTo
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  } catch (error) {
    return Promise.reject(error)
  }
}

export const updateUser = async (accessToken: string, data: object) => {
  try {
    return await http.put('/auth/v1/user', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

export const uploadAvatarUser = async (accessToken: string, filename: string, file: File) => {
  try {
    const formData = new FormData()
    formData.append('file', file)
    return await http.post(`/storage/v1/object/profile/${filename}`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

export const deleteAvatarUser = async (accessToken: string, path: string) => {
  try {
    return await http.delete(`/storage/v1/object/profile/${path}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

export const updatePassword = async (accessToken: string, password: string) => {
  try {
    return await http.put(
      '/auth/v1/user',
      { password },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
  } catch (error) {
    return Promise.reject(error)
  }
}
