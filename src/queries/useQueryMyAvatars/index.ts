import { useQuery } from '@tanstack/react-query'
import { supabase } from '~/config'
import { getImageUrl } from '~/utils'
import { AvatarOption, MyAvatar } from '~/types'

const fetchMyAvatarOptions = async (id: number | string): Promise<AvatarOption[]> => {
  const { data: avatarOptions, error: errorAvatarOptions } = await supabase
    .from('my_avatar_options')
    .select('base, hair, eyes, mouth, accessory, shirt, hand, background, color')
    .eq('my_avatar_id', id)

  if (errorAvatarOptions) return []

  const result = avatarOptions.map((option) => ({
    base: option.base ?? '',
    hair: option.hair ?? '',
    eyes: option.eyes ?? '',
    mouth: option.mouth ?? '',
    accessory: option.accessory ?? '',
    shirt: option.shirt ?? '',
    hand: option.hand ?? '',
    background: option.background ?? '',
    color: option.color ?? ''
  }))

  return result
}

const fetchMyAvatars = async () => {
  const { data: myAvatars, error: errorMyAvatar } = await supabase.from('my_avatars').select('*')
  if (errorMyAvatar) {
    return console.error(errorMyAvatar)
  }

  const results: MyAvatar[] = []
  for (const avatar of myAvatars) {
    const avatarOptions = await fetchMyAvatarOptions(avatar.id)

    const options = avatarOptions?.map((option) => {
      Object.keys(option).forEach((key) => {
        if (!option[key as keyof AvatarOption]?.startsWith('#')) {
          option[key as keyof AvatarOption] = getImageUrl(
            'my_avatar_options',
            option[key as keyof AvatarOption]
          )
        }
      })
      return option
    })[0]

    results.push({
      id: avatar.id,
      user_id: avatar.user_id ?? '',
      name: avatar.name ?? '',
      thumbnail: getImageUrl('my_avatars', avatar.image_path ?? ''),
      options,
      created_at: avatar.created_at ?? '',
      updated_at: avatar.updated_at ?? ''
    })
  }

  return results
}

export function useQueryMyAvatars() {
  return useQuery({
    queryKey: ['my-avatars'],
    queryFn: () => fetchMyAvatars()
  })
}
