import { Link } from 'react-router-dom'
import config from '~/config'
import AccountPopover from './common/AccountPopover'
import { AiOutlineMenu } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { MENU_ITEMS } from './Navbar'
import NavbarItem from './common/NavbarItem'
import { useUser } from '~/hooks'

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
    <header className="w-full h-[80px] flex items-center justify-between px-5 border-b border-gray-300">
      <Link to={config.routes.myAvatars} className="cursor-pointer">
        <img
          className="w-[55px] md:w-[65px]"
          src="/assets/logo2000x2000.png"
          alt="Logo Canawan Global"
        />
      </Link>
      <h1 className="uppercase text-2xl md:text-3xl font-semibold">Avatar face customize</h1>
      <AccountPopover />
    </header>
  )
}

export default Header
