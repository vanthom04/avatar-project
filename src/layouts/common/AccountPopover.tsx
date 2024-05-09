import { UserMetadata } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

import config, { supabase } from '~/config'

interface OptionsType {
  id: number
  to: string
  title: string
  action?: () => void
}

const MENU_OPTIONS: OptionsType[] = [
  {
    id: 1,
    to: config.routes.home,
    title: 'Home'
  },
  {
    id: 2,
    to: config.routes.profile,
    title: 'Profile'
  },
  {
    id: 3,
    to: config.routes.settings,
    title: 'Settings'
  }
]

interface AccountPopoverProps {
  user: UserMetadata | null
}

function AccountPopover({ user }: AccountPopoverProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        e.target instanceof Element &&
        !e.target.closest('#menu-options') &&
        !e.target.closest('#button-user-menu')
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleOpen = () => setIsOpen(!isOpen)

  const handleClose = () => setIsOpen(false)

  const handleSignOut = async () => {
    setIsOpen(false)
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw new Error(error.message)
    }
  }

  return (
    <div className="relative flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      <button
        id="button-user-menu"
        type="button"
        className="flex text-sm bg-gray-800 rounded-full md:me-0"
        onClick={handleOpen}
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="w-10 h-10 rounded-full"
          src={user?.avatar_url || '/assets/images/no-avatar.jpg'}
          alt={user?.full_name}
        />
      </button>
      <div
        id="menu-options"
        className={clsx(
          'absolute top-[80%] right-0 z-50 my-4 text-base list-none bg-[#f9fafb] divide-y divide-gray-200 rounded-lg shadow',
          { hidden: !isOpen }
        )}
      >
        <div className="px-4 py-3">
          <span className="block text-sm font-semibold text-gray-900">{user?.full_name}</span>
          <span className="block text-sm text-gray-600 truncate">{user?.email}</span>
        </div>
        <ul className="py-2">
          {MENU_OPTIONS.map((option) => (
            <li key={option.id}>
              <Link
                to={option.to}
                className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
                onClick={handleClose}
              >
                {option.title}
              </Link>
            </li>
          ))}
          <li>
            <button
              className="w-full text-left block px-4 py-2 text-sm text-gray-800 hover:text-[#FC4100]"
              onClick={handleSignOut}
            >
              Sign out
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default AccountPopover
