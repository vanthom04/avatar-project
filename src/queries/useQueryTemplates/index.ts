import { useQuery } from '@tanstack/react-query'
import { supabase } from '~/config'
import { AvatarOption, Templates } from '~/types'
import { getImageUrl } from '~/utils'

const getTemplateOptions = async (id: number | string): Promise<AvatarOption[]> => {
  const { data, error } = await supabase
    .from('template_options')
    .select('base, hair, eyes, mouth, accessory, shirt, hand, background, color')
    .eq('template_id', id)
  if (error) return []

  const result = data.map((option) => ({
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

const fetchTemplates = async () => {
  const { data, error } = await supabase.from('templates').select('*')
  if (error) return []

  const templates: Templates[] = []
  for (const template of data) {
    const templateOptions = await getTemplateOptions(template.id)
    const options = templateOptions?.map((option) => {
      Object.keys(option).forEach((key) => {
        if (!option[key as keyof AvatarOption]?.startsWith('#')) {
          option[key as keyof AvatarOption] = getImageUrl(
            'demo-options',
            option[key as keyof AvatarOption]
          )
        }
      })
      return option
    })[0]

    templates.push({
      id: template.id,
      name: template.name ?? '',
      thumbnail: getImageUrl('demo-templates', template.image_path ?? ''),
      options,
      created_at: template.created_at ?? '',
      updated_at: template.updated_at ?? ''
    })
  }

  return templates
}

export function useQueryTemplates() {
  return useQuery({
    queryKey: ['templates'],
    queryFn: fetchTemplates
  })
}
