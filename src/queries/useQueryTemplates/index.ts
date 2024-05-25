import { useQuery } from '@tanstack/react-query'
import { getAllTemplates } from '~/services/templates'

export function useQueryTemplates(accessToken: string) {
  return useQuery({
    queryKey: ['TEMPLATES'],
    queryFn: () => getAllTemplates(accessToken),
    enabled: !!accessToken
  })
}
