import { http } from '~/utils/http'
import { MyAvatar } from '~/types'
import { getImageUrl } from '~/utils'

export const getAllMyAvatars = async (accessToken: string): Promise<MyAvatar[]> => {
  try {
    const res = await http.get<MyAvatar[]>('/rest/v1/my_avatars?select=*', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })

    const result: MyAvatar[] = []
    for (const avatar of res) {
      result.push({
        ...avatar,
        thumbnail: getImageUrl('my_avatars', avatar.image_path)
      })
    }

    return result
  } catch (error) {
    return Promise.reject(error)
  }
}

export const insertMyAvatar = async (accessToken: string, data: object) => {
  try {
    return await http.post('/rest/v1/my_avatars', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

export const uploadImageMyAvatar = async (accessToken: string, file: File, filename: string) => {
  try {
    const formData = new FormData()
    formData.append('file', file)
    return await http.post(`/storage/v1/object/my_avatars/${filename}`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

export const deleteImageAvatar = async (accessToken: string, path: string) => {
  try {
    return await http.delete(`/storage/v1/object/my_avatars/${path}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

export const updateMyAvatar = async (accessToken: string, id: string, data: object) => {
  try {
    return await http.patch('/rest/v1/my_avatars', data, {
      params: {
        id: `eq.${id}`
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

export const deleteMyAvatar = async (accessToken: string, id: string) => {
  try {
    return await http.delete('/rest/v1/my_avatars', {
      params: {
        id: `eq.${id}`
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
  } catch (error) {
    return Promise.reject(error)
  }
}
