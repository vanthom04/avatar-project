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

const MENU_ITEMS: MenuItemType[] = [
  {
    id: 1,
    to: config.routes.myAvatars,
    title: 'My Avatar',
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
    if (['admin', 'editor'].includes(role)) {
      if (!menu.find((item) => item.id === 3)) {
        setMenu((prevMenu) => [
          ...prevMenu,
          {
            id: 3,
            to: config.routes.managerTemplates,
            title: 'Manager templates',
            icon: TbReport
          }
        ])
      }
    } else {
      const index = menu.findIndex((item) => item.id === 3)
      if (index !== -1) {
        menu.splice(index, 1)
      }
    }
  }, [user, role, menu])

  return (
    <aside className="basis-2/6 lg:basis-1/5 p-4 flex flex-col gap-y-3 border-r">
      {menu.map(({ id, to, title, icon }) => (
        <NavbarItem key={id} to={to} title={title} icon={icon} />
      ))}
    </aside>
  )
}

export default Navbar
