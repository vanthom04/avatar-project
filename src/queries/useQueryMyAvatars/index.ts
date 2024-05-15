import { useQuery } from '@tanstack/react-query'
import { fetchMyAvatars } from './fetch'

export function useQueryMyAvatars() {
  return useQuery({
    queryKey: ['MY_AVATARS'],
    queryFn: fetchMyAvatars
  })
}
