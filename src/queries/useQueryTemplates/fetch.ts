import { supabase } from '~/config'
import { getImageUrl } from '~/utils'

interface Option {
  id: string | null
  template_options_id: string | null
  name: string | null
  image_path: string | null
  image_url: string | null
}

interface Category {
  id: string | null
  template_id: string | null
  type: 'hair' | 'eyes' | 'mouth' | 'accessory' | 'hand'
  name: string | null
  options: Option[]
}

interface Template {
  id: string
  name: string
  image_path: string
  image_url: string
  categories: Category[]
  created_at: Date | string
}

const getOptions = async (id: string): Promise<Option[]> => {
  const { data: dataOptions, error: errorOptions } = await supabase
    .from('options')
    .select('*')
    .eq('template_options_id', id)
  if (errorOptions) {
    console.error(errorOptions)
    return []
  }

  const options: Option[] = []
  for (const option of dataOptions) {
    options.push({
      id: option.id,
      template_options_id: option.template_options_id,
      name: option.name,
      image_path: option.image_path,
      image_url: getImageUrl('template_options', option.image_path)
    })
  }

  return options
}

const getTemplateOptions = async (id: string): Promise<Category[]> => {
  const { data: dataCategories, error: errorCategories } = await supabase
    .from('template_options')
    .select('*')
    .eq('template_id', id)
  if (errorCategories) {
    console.error(errorCategories)
    return []
  }

  const categories: Category[] = []
  for (const category of dataCategories) {
    categories.push({
      id: category.id,
      template_id: category.template_id,
      type: category.type,
      name: category.name,
      options: await getOptions(category.id)
    })
  }

  return categories
}

const getTemplates = async (): Promise<Template[]> => {
  const { data: dataTemplates, error: errorTemplates } = await supabase
    .from('templates')
    .select('*')
  if (errorTemplates) {
    console.log(errorTemplates)
    return []
  }

  const templates: Template[] = []
  for (const template of dataTemplates) {
    templates.push({
      id: template.id,
      name: template.name,
      image_path: template.image_path,
      image_url: getImageUrl('templates', template.image_path),
      categories: await getTemplateOptions(template.id),
      created_at: template.created_at
    })
  }

  return templates
}

export default getTemplates
