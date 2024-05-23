import { NavLink } from 'react-router-dom'
import { IconType } from 'react-icons'
import clsx from 'clsx'

interface NavbarItemProps {
  to: string
  title: string
  icon: IconType
  onClick: () => void
}

function NavbarItem({ to, title, icon: Icon, onClick }: NavbarItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        clsx(
          'flex items-center gap-x-2 p-2 rounded hover:bg-[#f1f3f5] transition-all duration-200',
          { 'bg-[#e1e4e7]': isActive }
        )
      }
      onClick={onClick}
    >
      <Icon className="lg:w-7 lg:h-7 md:w-5 md:h-5" />
      <span className="lg:text-base font-medium md:text-sm">{title}</span>
    </NavLink>
  )
}

export default NavbarItem
