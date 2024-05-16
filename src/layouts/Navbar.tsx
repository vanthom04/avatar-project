import { IconType } from 'react-icons'
import { TbReport } from 'react-icons/tb'
import { HiOutlineHome } from 'react-icons/hi'
import { LuLayoutTemplate } from 'react-icons/lu'
import { RxPerson } from 'react-icons/rx'

import config from '~/config'
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
    to: config.routes.home,
    title: 'Home',
    icon: HiOutlineHome
  },
  {
    id: 2,
    to: config.routes.managerMyAvatars,
    title: 'My Avatar',
    icon: RxPerson
  },
  {
    id: 3,
    to: config.routes.templates,
    title: 'Templates',
    icon: LuLayoutTemplate
  },
  {
    id: 4,
    to: config.routes.managerTemplates,
    title: 'Manager templates',
    icon: TbReport
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
