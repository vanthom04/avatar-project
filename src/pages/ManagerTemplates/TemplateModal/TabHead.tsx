import clsx from 'clsx'
import { useState } from 'react'

import { AVATAR_OPTIONS } from '~/_mock'
import { CategoryType } from '~/types'
import TabOptions from './TabOptions'

const TabHead: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<CategoryType>('hair')

  return (
    <div>
      <div className="border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500">
          {AVATAR_OPTIONS.map(({ id, title, icon: Icon }) => (
            <li key={id} className="me-2">
              <button
                className={clsx(
                  'inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 outline-none',
                  selectedTab === id && '!border-blue-600 !text-blue-600'
                )}
                onClick={() => setSelectedTab(id)}
              >
                <Icon
                  className={clsx(
                    'w-5 h-5 me-2 text-gray-600',
                    selectedTab === id && '!text-blue-600'
                  )}
                />
                {title}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <TabOptions tab={selectedTab} />
    </div>
  )
}

export default TabHead
