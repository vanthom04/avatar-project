import { Link } from 'react-router-dom'
import config from '~/config'
import AccountPopover from './common/AccountPopover'

function Header() {
  return (
    <header className="w-full h-[80px] flex items-center justify-between px-5 border-b border-gray-300">
      <Link to={config.routes.home} className="cursor-pointer">
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
