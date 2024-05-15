import { IconType } from 'react-icons'
import { HiOutlineHome } from 'react-icons/hi'

import NavbarItem from './common/NavbarItem'
import config from '~/config'

export interface MenuItemType {
  id: number
  to: string
  title: string
  icon: IconType
}

const MENU_ITEMS: MenuItemType[] = [
  {
    id: 1,
    to: '/menu-item-1',
    title: 'Menu item #1',
    icon: HiOutlineHome
  },
  {
    id: 2,
    to: config.routes.managerMyAvatars,
    title: 'My Avatar',
    icon: HiOutlineHome
  },
  {
    id: 3,
    to: '/menu-item-3',
    title: 'Menu item #3',
    icon: HiOutlineHome
  },
  {
    id: 4,
    to: '/menu-item-4',
    title: 'Menu item #4',
    icon: HiOutlineHome
  },
  {
    id: 5,
    to: '/menu-item-5',
    title: 'Menu item #5',
    icon: HiOutlineHome
  }
]

function Navbar() {
  return (
    <aside className="basis-2/6 lg:basis-1/5 p-4 flex flex-col gap-y-3">
      {MENU_ITEMS.map(({ id, to, title, icon }) => (
        <NavbarItem key={id} to={to} title={title} icon={icon} />
      ))}
    </aside>
  )
}

export default Navbar
