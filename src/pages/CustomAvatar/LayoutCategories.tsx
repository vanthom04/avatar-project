import CategoryOptions from './CategoryOptions'
import { FunctionComponent, useState } from 'react'
import clsx from 'clsx'
import { AvatarOption, CategoryType, Template } from '~/types'
import { EyeIcon, GlassIcon, HairIcon, HandIcon, MouthIcon } from '~/components/Icons'
import { useWindowSize } from '~/hooks'
import { IconType } from 'react-icons'

interface AvatarOptionType {
  id: string
  title: string
  icon: IconType | FunctionComponent
}

export const AVATAR_OPTIONS: AvatarOptionType[] = [
  {
    id: 'hair',
    title: 'Hair',
    icon: HairIcon
  },
  {
    id: 'eyes',
    title: 'Eyes',
    icon: EyeIcon
  },
  {
    id: 'mouth',
    title: 'Mouth',
    icon: MouthIcon
  },
  {
    id: 'accessory',
    title: 'Accessory',
    icon: GlassIcon
  },
  {
    id: 'hand',
    title: 'Hand',
    icon: HandIcon
  }
]

interface LayoutCategoryProps {
  template: Template
  options: AvatarOption[]
  onSelect: (id: string, type: CategoryType, value: string) => void
}

function LayoutCategories({ template, options, onSelect }: LayoutCategoryProps) {
  const [tab, setTab] = useState<string>('hair')
  const [isOpenCategoryOptions, setIsOpenCategoryOptions] = useState<boolean>(false)

  const windowSize = useWindowSize()

  const handleTabClick = (id: string) => {
    if (tab === id) {
      setIsOpenCategoryOptions(!isOpenCategoryOptions)
    } else {
      setTab(id)
      setIsOpenCategoryOptions(true)
    }
  }

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
            onClick={() => handleTabClick(id)}
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
