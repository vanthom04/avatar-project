import { useEffect, useState } from 'react'
import { IconType } from 'react-icons'
import { TbReport } from 'react-icons/tb'
import { HiOutlineHome } from 'react-icons/hi'
import { LuLayoutTemplate } from 'react-icons/lu'

import config from '~/config'
import { useUser } from '~/hooks'
import NavbarItem from './common/NavbarItem'

export interface MenuItemType {
  id: number
  to: string
  title: string
  icon: IconType
}

export const MENU_ITEMS: MenuItemType[] = [
  {
    id: 1,
    to: config.routes.myAvatars,
    title: 'My avatars',
    icon: HiOutlineHome
  },
  {
    id: 2,
    to: config.routes.templates,
    title: 'Templates',
    icon: LuLayoutTemplate
  }
]

function Navbar() {
  const [menu, setMenu] = useState<MenuItemType[]>(MENU_ITEMS)
  const { user, role } = useUser()

  useEffect(() => {
    if (!user) return
    setMenu((prevMenu) => {
      const newMenu = [...prevMenu]

      if (['admin', 'editor'].includes(role)) {
        if (!newMenu.find((item) => item.id === 3)) {
          newMenu.push({
            id: 3,
            to: config.routes.managerTemplates,
            title: 'Manager templates',
            icon: TbReport
          })
        }
      } else {
        const index = newMenu.findIndex((item) => item.id === 3)
        if (index !== -1) {
          newMenu.splice(index, 1)
        }
      }

      return newMenu
    })
  }, [user, role])

  return (
    <aside className="p-4 flex-col gap-y-3 basis-1/3 xl:basis-1/5 hidden md:flex border-r border-r-gray-300">
      {menu.map(({ id, to, title, icon }) => (
        <NavbarItem key={id} to={to} title={title} icon={icon} />
      ))}
    </aside>
  )
}

export default Navbar
