import { IconType } from 'react-icons'
import CategoryOptions from './CategoryOptions'
import { FunctionComponent, useState } from 'react'
import { EyeIcon, GlassIcon, HairIcon, HandIcon, MouthIcon } from '~/components/Icons'
import clsx from 'clsx'

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
  onSelect: (id: string, value: string) => void
}

function LayoutCategories({ onSelect }: LayoutCategoryProps) {
  const [tab, setTab] = useState<string>('hair')

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
        <CategoryOptions tab={tab} onSelect={onSelect} />
      </div>
    </div>
  )
}

export default LayoutCategories
