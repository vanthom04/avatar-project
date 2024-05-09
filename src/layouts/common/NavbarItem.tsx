import { NavLink } from 'react-router-dom'
import { IconType } from 'react-icons'
import clsx from 'clsx'

interface NavbarItemProps {
  to: string
  title: string
  icon: IconType
}

function NavbarItem({ to, title, icon: Icon }: NavbarItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        clsx(
          'flex items-center gap-x-2 p-2 rounded hover:bg-[#f1f3f5] transition-all duration-200',
          { 'bg-[#e1e4e7]': isActive }
        )
      }
    >
      <Icon size={24} />
      <span className="text-base font-medium">{title}</span>
    </NavLink>
  )
}

export default NavbarItem
