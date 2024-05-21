import { supabase } from '~/config'

export const getRole = async (id: string) => {
  try {
    if (!id) return null
    const { data: userRoles, error: errorUserRoles } = await supabase
      .from('user_roles')
      .select('user_id, role_id')
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

//https://krfkbpxrguhkkchwzpnt.supabase.co/storage/v1/object/public/my_avatars/custom-avatar/custom-avatar-5eab223b-16de-41e3-a354-716400555276.png
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
