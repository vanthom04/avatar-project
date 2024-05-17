import { supabase } from '~/config'

export const getRole = async (id: string) => {
  try {
    if (!id) return null
    const { data: userRoles, error: errorUserRoles } = await supabase
      .from('user_roles')
      .select('user_id, role_id')
      .eq('user_id', id)
      .single()
    if (errorUserRoles) {
      console.error('Error fetching user roles:', errorUserRoles)
      return null
    }

    if (!userRoles.role_id) return

    const { data: role, error: errorRole } = await supabase
      .from('roles')
      .select('id, name')
      .eq('id', userRoles.role_id)
      .single()

    if (errorRole) {
      console.error('Error fetching role:', errorRole)
      return null
    }

    return role.name
  } catch (error) {
    console.error('Error in getUserRole function:', error)
    return null
  }
}

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
