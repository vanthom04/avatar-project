import { useQuery } from '@tanstack/react-query'
import getTemplates from './fetch'

export function useQueryTemplates() {
  return useQuery({
    queryKey: ['templates'],
    queryFn: getTemplates
  })
}
