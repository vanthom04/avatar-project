import { supabase } from '~/config'
import { getImageUrl } from '~/utils'
import { MyAvatar } from '~/types'

export const fetchMyAvatars = async (): Promise<MyAvatar[]> => {
  const { data: myAvatars, error: errorMyAvatar } = await supabase.from('my_avatars').select('*')
  if (errorMyAvatar) {
    console.error(errorMyAvatar)
    return []
  }

  const results: MyAvatar[] = []
  for (const avatar of myAvatars) {
    results.push({
      id: avatar.id,
      user_id: avatar.user_id ?? '',
      template_id: avatar.template_id ?? '',
      name: avatar.name ?? '',
      image_path: avatar.image_path ?? '',
      thumbnail: getImageUrl('my_avatars', avatar.image_path ?? ''),
      options: avatar.options ?? null,
      created_at: avatar.created_at ?? '',
      updated_at: avatar.updated_at ?? ''
    })
  }

  return results
}
