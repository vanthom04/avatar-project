import { useQuery } from '@tanstack/react-query'
import { getAllMyAvatars } from '~/services/avatars'

export function useQueryMyAvatars(accessToken: string) {
  return useQuery({
    queryKey: ['MY_AVATARS'],
    queryFn: () => getAllMyAvatars(accessToken)
  })
}
