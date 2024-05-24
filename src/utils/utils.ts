export const getImageUrl = (folder: string, path: string): string => {
  if (!folder || !path) return ''
  return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${folder}/${path}`
}

export const downloadBase64Image = (dataUrl: string, filename: string) => {
  const link = document.createElement('a')
  link.href = dataUrl
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
