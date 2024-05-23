import { Template } from '~/types'
import { getImageUrl } from '~/utils'
import { httpRequest } from '~/utils/httpRequest'

interface MoveTemplateObject {
  bucketId: string
  destinationKey: string
  sourceKey: string
}

export const getAllTemplates = async (accessToken: string): Promise<Template[]> => {
  try {
    const res = await httpRequest.get<Template[]>('/rest/v1/templates', {
      params: {
        select:
          '*, categories(id, template_id, type, name, created_at, options(id, category_id, name, image_path, created_at))'
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })

    for (const template of res) {
      for (const category of template.categories) {
        for (const option of category.options) {
          option.image_url = getImageUrl('template_options', option.image_path)
        }
      }
      template.image_url = getImageUrl('templates', template.image_path)
    }
    return res
  } catch (error) {
    return Promise.reject(error)
  }
}

export const insertTemplate = async (accessToken: string, data?: object) => {
  try {
    return await httpRequest.post('/rest/v1/templates', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

export const updateTemplate = async (accessToken: string, id: string, data?: object) => {
  try {
    return await httpRequest.patch('/rest/v1/templates', data, {
      params: {
        id: `eq.${id}`
      },
      headers: {
        Prefer: 'return=minimal',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

export const deleteTemplate = async (accessToken: string, id: string) => {
  try {
    return await httpRequest.delete('/rest/v1/templates', {
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

export const uploadImageTemplate = async (accessToken: string, file: File, filename: string) => {
  try {
    const formData = new FormData()
    formData.append('file', file)
    return await httpRequest.post(`/storage/v1/object/templates/${filename}`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

export const moveImageTemplate = async (accessToken: string, data: MoveTemplateObject) => {
  try {
    return await httpRequest.post('/storage/v1/object/move', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

export const deleteImageTemplate = async (accessToken: string, path: string) => {
  try {
    return await httpRequest.delete(`/storage/v1/object/templates/${path}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

export const insertTemplateCategory = async (accessToken: string, data: object) => {
  try {
    return await httpRequest.post('/rest/v1/categories', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

export const deleteTemplateCategory = async (accessToken: string, id: string) => {
  try {
    return await httpRequest.delete('/rest/v1/categories', {
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

export const insertTemplateOption = async (accessToken: string, data: object) => {
  try {
    return await httpRequest.post('/rest/v1/options', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

export const updateTemplateOption = async (accessToken: string, data: object) => {
  try {
    return await httpRequest.patch('/rest/v1/options', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

export const deleteTemplateOption = async (accessToken: string, id: string) => {
  try {
    return await httpRequest.delete('/rest/v1/options', {
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

export const uploadImageTemplateOption = async (
  accessToken: string,
  file: File,
  filename: string
) => {
  try {
    const formData = new FormData()
    formData.append('file', file)
    return await httpRequest.post(`/storage/v1/object/template_options/${filename}`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  } catch (error) {
    return Promise.reject(error)
  }
}

export const deleteImageTemplateOption = async (accessToken: string, path: string) => {
  try {
    return await httpRequest.delete(`/storage/v1/object/template_options/${path}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  } catch (error) {
    return Promise.reject(error)
  }
}
