import { Template } from '~/types'
import { httpRequest } from './httpRequest'

export const getImageUrl = (folder: string, path: string): string => {
  if (!folder || !path) return ''
  return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${folder}/${path}`
}

export const downloadFile = async (
  accessToken: string,
  folder: string,
  path: string
): Promise<Blob> => {
  try {
    return (await httpRequest.get(`/storage/v1/object/${folder}/${path}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })) as Blob
  } catch (error) {
    return Promise.reject(error)
  }
}

export const downloadBase64Image = (dataUrl: string, filename: string) => {
  const link = document.createElement('a')
  link.href = dataUrl
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const filterTemplates = (inputData: Template[], filterName: string): Template[] => {
  let templates = [...inputData]
  if (filterName) {
    templates = templates.filter(
      (template) => template.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    )
  }

  return templates
}
