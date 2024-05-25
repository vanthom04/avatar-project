import { IconType } from 'react-icons'
import CategoryOptions from './CategoryOptions'
import { FunctionComponent, useState } from 'react'
import clsx from 'clsx'
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

interface LayoutCategoryProps {
  template: Template
  options: OptionType[]
  onSelect: (
    id: string,
    type: 'hair' | 'eyes' | 'mouth' | 'accessory' | 'hand',
    value: string
  ) => void
}

function LayoutCategories({ template, options, onSelect }: LayoutCategoryProps) {
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
        {AVATAR_OPTIONS.map(({ id, title, icon: Icon }) => (
          <div
            key={id}
            title={title}
            className={clsx(
              'basis-1/5 flex flex-col items-center w-full justify-center cursor-pointer',
              {
                'bg-[#252627]': tab === id && isOpenCategoryOptions
              }
            )}
            onClick={() => handleTabClick(id)}
          >
            <Icon />
            <h2>{title}</h2>
          </div>
        ))}
      </div>
      <div
        className={clsx('w-full lg:w-[calc(100%-90px)] h-full pt-6 pl-4 lg:p-4 overflow-y-auto', {
          hidden: !isOpenCategoryOptions,
          'fixed top-[18%] w-full h-full bg-neutral-900/80 z-50':
            isOpenCategoryOptions && windowSize.width < 1024
        })}
      >
        <CategoryOptions tab={tab} template={template} options={options} onSelect={onSelect} />
      </div>
    </div>
  )
}

export default LayoutCategories
