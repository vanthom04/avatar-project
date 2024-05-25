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
    <div className="basis-2/5 text-white flex">
      <div className="w-[90px] h-full bg-[#18191b] flex flex-col items-center justify-center">
        {AVATAR_OPTIONS.map(({ id, title, icon: Icon }) => (
          <div
            key={id}
            title={title}
            className={clsx(
              'basis-1/5 flex flex-col items-center w-full justify-center cursor-pointer',
              {
                'bg-[#252627]': tab === id
              }
            )}
            onClick={() => setTab(id)}
          >
            <Icon />
            <h2>{title}</h2>
          </div>
        ))}
      </div>
      <div className="w-[calc(100%-90px)] h-full p-4">
        <CategoryOptions tab={tab} template={template} options={options} onSelect={onSelect} />
      </div>
    </div>
  )
}

export default LayoutCategories
