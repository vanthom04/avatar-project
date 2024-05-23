import { Link } from 'react-router-dom'
import config from '~/config'
import { useUser } from '~/hooks'
import AccountPopover from './common/AccountPopover'
import { AiOutlineMenu } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { MENU_ITEMS } from './Navbar'
import NavbarItem from './common/NavbarItem'

function Header() {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)

  const handleClickOpenMenu = () => setIsOpenMenu(!isOpenMenu)

  const { userDetails } = useUser()

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        e.target instanceof Element &&
        !e.target.closest('#menu-pages') &&
        !e.target.closest('#button-menu-pages')
      ) {
        setIsOpenMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div>
      <header className="w-full h-[80px] flex items-center justify-between px-5 border-b border-gray-300">
        <Link to={config.routes.home} className="cursor-pointer">
          <img
            className="w-[45px] lg:w-[65px]"
            src="/assets/logo2000x2000.png"
            alt="Logo Canawan Global"
          />
        </Link>
        <h1 className="uppercase text-2xl lg:text-3xl font-semibold">Avatar face customize</h1>
        <div className="flex items-center">
          <button
            id="button-menu-pages"
            className="md:hidden outline-none mr-4 sm:w-5"
            onClick={handleClickOpenMenu}
          >
            <AiOutlineMenu size={22} />
          </button>
          <AccountPopover user={userDetails} />
        </div>
      </header>
      <div className="relative flex items-center space-x-3">
        <div
          id="menu-pages"
          className={clsx(
            'absolute -top-8 right-[10%] z-50 my-4 text-base list-none bg-[#f9fafb] divide-y divide-gray-200 rounded-lg shadow p-2 md:hidden',
            { hidden: !isOpenMenu }
          )}
        >
          {MENU_ITEMS.map(({ id, to, title, icon }) => (
            <NavbarItem
              key={id}
              to={to}
              title={title}
              icon={icon}
              onClick={() => setIsOpenMenu(false)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Header
