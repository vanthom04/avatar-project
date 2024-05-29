import CategoryOptions from './CategoryOptions'
import { useState } from 'react'
import clsx from 'clsx'
<<<<<<< HEAD
import { OptionType } from '.'
import { Template } from '~/types'
import { EyeIcon, GlassIcon, HairIcon, HandIcon, MouthIcon } from '~/components/Icons'
import { useWindowSize } from '~/hooks'
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
=======

import { AVATAR_OPTIONS } from '~/_mock'
import { AvatarOption, CategoryType, Template } from '~/types'
>>>>>>> 63d5e5ce3e57deb3cad5c74ffb779913d4aab856

interface LayoutCategoryProps {
  template: Template
  options: AvatarOption[]
  onSelect: (id: string, type: CategoryType, value: string) => void
}

function LayoutCategories({ template, options, onSelect }: LayoutCategoryProps) {
<<<<<<< HEAD
  const [tab, setTab] = useState<string>('')
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
    <div className="basis-1/12 lg:basis-2/5 text-white flex flex-col lg:flex-row">
      <div className="w-full h-20 lg:w-[90px] lg:h-full bg-[#18191b] flex justify-between lg:flex-col lg:justify-center">
=======
  const [tab, setTab] = useState<CategoryType>('hair')

  return (
    <div className="basis-2/5 flex flex-col md:flex-row text-white">
      <div className="w-full md:w-[90px] bg-[#18191b] flex flex-row md:flex-col items-center justify-center">
>>>>>>> 63d5e5ce3e57deb3cad5c74ffb779913d4aab856
        {AVATAR_OPTIONS.map(({ id, title, icon: Icon }) => (
          <div
            key={id}
            title={title}
            className={clsx(
<<<<<<< HEAD
              'basis-1/5 flex flex-col items-center w-full justify-center cursor-pointer',
              {
                'bg-[#252627]': tab === id && isOpenCategoryOptions
              }
=======
              'basis-1/5 w-full flex flex-col items-center justify-center py-3 md:py-0 cursor-pointer',
              { 'bg-[#252627]': tab === id }
>>>>>>> 63d5e5ce3e57deb3cad5c74ffb779913d4aab856
            )}
            onClick={() => handleTabClick(id)}
          >
            <Icon className="w-5 h-5 md:w-6 md:h-6" />
            <h2 className="text-sm md:text-base">{title}</h2>
          </div>
        ))}
      </div>
<<<<<<< HEAD
      <div
        className={clsx('w-full lg:w-[calc(100%-90px)] h-full pt-6 pl-4 lg:p-4 overflow-y-auto', {
          'fixed top-[18%] w-full h-full bg-neutral-900/80 z-50':
            isOpenCategoryOptions && windowSize.width < 1024
        })}
      >
=======
      <div className="w-full md:w-[calc(100%-90px)] h-full p-4 overflow-y-auto">
>>>>>>> 63d5e5ce3e57deb3cad5c74ffb779913d4aab856
        <CategoryOptions tab={tab} template={template} options={options} onSelect={onSelect} />
      </div>
    </div>
  )
}

export default LayoutCategories
