import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { OptionType } from '.'
import { Category, Template } from '~/types'

interface CategoryOptionProps {
  tab: string
  template: Template
  options: OptionType[]
  onSelect: (
    id: string,
    type: 'hair' | 'eyes' | 'mouth' | 'accessory' | 'hand',
    value: string
  ) => void
}

function CategoryOptions({ tab, template, options, onSelect }: CategoryOptionProps) {
  const [category, setCategory] = useState<Category>({} as Category)

  useEffect(() => {
    const category = template.categories?.filter((category) => category.type === tab)[0]
    setCategory(category)
  }, [tab, template.categories])

  return (
    <div className="flex flex-row flex-wrap gap-8">
      {category?.options?.map((option) => (
        <img
          key={option.id}
          className={clsx(
            'object-cover w-20 h-20 rounded-md border border-black bg-white cursor-pointer',
            {
              'border-2 border-red-500': option && options.find((opt) => opt.id === option.id)
            }
          )}
          src={option.image_url ?? ''}
          alt={option.name ?? ''}
          loading="lazy"
          onClick={() =>
            onSelect(
              option.id ?? '',
              tab as 'hair' | 'eyes' | 'mouth' | 'accessory' | 'hand',
              option.image_url ?? ''
            )
          }
        />
      ))}
    </div>
  )
}

export default CategoryOptions
