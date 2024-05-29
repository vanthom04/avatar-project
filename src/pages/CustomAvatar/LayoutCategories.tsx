import CategoryOptions from './CategoryOptions'
import { useState } from 'react'
import clsx from 'clsx'

import { AVATAR_OPTIONS } from '~/_mock'
import { AvatarOption, CategoryType, Template } from '~/types'

interface LayoutCategoryProps {
  template: Template
  options: AvatarOption[]
  onSelect: (id: string, type: CategoryType, value: string) => void
}

function LayoutCategories({ template, options, onSelect }: LayoutCategoryProps) {
  const [tab, setTab] = useState<CategoryType>('hair')

  return (
    <div className="basis-2/5 flex flex-col md:flex-row text-white">
      <div className="w-full md:w-[90px] bg-[#18191b] flex flex-row md:flex-col items-center justify-center">
        {AVATAR_OPTIONS.map(({ id, title, icon: Icon }) => (
          <div
            key={id}
            title={title}
            className={clsx(
              'basis-1/5 w-full flex flex-col items-center justify-center py-3 md:py-0 cursor-pointer',
              { 'bg-[#252627]': tab === id }
            )}
            onClick={() => setTab(id)}
          >
            <Icon className="w-5 h-5 md:w-6 md:h-6" />
            <h2 className="text-sm md:text-base">{title}</h2>
          </div>
        ))}
      </div>
      <div className="w-full md:w-[calc(100%-90px)] h-full p-4 overflow-y-auto">
        <CategoryOptions tab={tab} template={template} options={options} onSelect={onSelect} />
      </div>
    </div>
  )
}

export default LayoutCategories
