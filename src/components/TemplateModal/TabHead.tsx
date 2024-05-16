// import { FunctionComponent } from 'react'
// import { IconType } from 'react-icons'

import clsx from 'clsx'
import { useState } from 'react'

import TabOptions from './TabOptions'

interface AvatarOptionType {
  id: 'hair' | 'eyes' | 'mouth' | 'accessory' | 'hand'
  title: string
  // icon: IconType | FunctionComponent
}

export const AVATAR_OPTIONS: AvatarOptionType[] = [
  {
    id: 'hair',
    title: 'Hair'
    // icon: HairIcon
  },
  {
    id: 'eyes',
    title: 'Eyes'
    // icon: EyeIcon
  },
  {
    id: 'mouth',
    title: 'Mouth'
    // icon: MouthIcon
  },
  {
    id: 'accessory',
    title: 'Accessory'
    // icon: GlassIcon
  },
  {
    id: 'hand',
    title: 'Hand'
    // icon: HandIcon
  }
]

function TabHead() {
  const [tab, setTab] = useState<'hair' | 'eyes' | 'mouth' | 'accessory' | 'hand'>('hair')

  return (
    <div>
      <div className="border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500">
          {AVATAR_OPTIONS.map((option) => (
            <li key={option.id} className="me-2">
              <button
                className={clsx(
                  'inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 outline-none',
                  {
                    '!border-blue-600 !text-blue-600': tab === option.id
                  }
                )}
                onClick={() => setTab(option.id)}
              >
                <svg
                  className={clsx('w-5 h-5 me-2 text-gray-400', {
                    '!text-blue-600': tab === option.id
                  })}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
                {option.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <TabOptions tab={tab} />
    </div>
  )
}

export default TabHead
