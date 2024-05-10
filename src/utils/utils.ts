import { supabase } from '~/config'

export const getImageUrl = (bucketName: string, path: string): string => {
  if (!bucketName || !path) return ''
  const { data } = supabase.storage.from(bucketName).getPublicUrl(path)

  return data.publicUrl
}
export const downloadBase64Image = (dataUrl: string, filename: string) => {
  const link = document.createElement('a')
  link.href = dataUrl
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
