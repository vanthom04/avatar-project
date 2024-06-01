import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineMenu } from 'react-icons/ai'
import clsx from 'clsx'

import { useRouter } from '~/hooks'
import config, { supabase } from '~/config'
import { MENU_ITEMS } from './Navbar'
import AccountPopover from './common/AccountPopover'

function Header() {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)

  const router = useRouter()

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

  const handleClickOpenMenu = () => setIsOpenMenu(!isOpenMenu)

  const handleClose = (href: string) => {
    router.push(href)
    setIsOpenMenu(false)
  }

  const handleSignOut = async () => {
    setIsOpenMenu(false)
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw new Error(error.message)
    }
  }

  return (
    <>
      <header className="relative w-full h-[60px] md:h-[80px] flex items-center justify-between px-5 border-b border-gray-300 z-40 select-none">
        <Link to={config.routes.myAvatars} className="cursor-pointer">
          <img
            className="w-[35px] sm:w-[45px] lg:w-[65px]"
            src="/assets/logo2000x2000.png"
            alt="Logo Canawan Global"
          />
        </Link>
        <h1 className="uppercase text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
          Avatar face customize
        </h1>
        <div className="flex items-center">
          <button
            id="button-menu-pages"
            className="md:hidden outline-none sm:w-5"
            onClick={handleClickOpenMenu}
          >
            <AiOutlineMenu size={22} />
          </button>
          <AccountPopover />
        </div>
      </header>
      <div
        id="menu-pages"
        className={clsx('relative w-full h-auto bg-white select-none hidden py-3 animate-fade-in', {
          '!block': isOpenMenu
        })}
      >
        <div className="flex flex-col items-center gap-2">
          {MENU_ITEMS.map((item) => (
            <div key={item.id} className="cursor-pointer" onClick={() => handleClose(item.to)}>
              {item.title}
            </div>
          ))}
          <div className="cursor-pointer" onClick={() => handleClose(config.routes.profile)}>
            Profile
          </div>
          <div className="cursor-pointer" onClick={handleSignOut}>
            Sign out
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
