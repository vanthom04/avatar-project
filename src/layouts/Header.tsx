import { Link } from 'react-router-dom'
import config from '~/config'
import { useUser } from '~/hooks'
import AccountPopover from './common/AccountPopover'

function Header() {
  const { user, userDetails } = useUser()

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
      {user ? (
        <AccountPopover user={userDetails} />
      ) : (
        <div className="flex items-center justify-center">
          <Link
            to={config.routes.signUp}
            className="px-2.5 py-2 md:px-3.5 md:py-2.5 font-medium rounded-md bg-[#f2f2f2] hover:bg-[#d2d2d2] transition-all duration-300"
          >
            Sign up
          </Link>
          <Link
            to={config.routes.signIn}
            className="px-2.5 py-2 md:px-3.5 md:py-2.5 font-medium rounded-md bg-[#4a00ff] text-white ml-2 hover:bg-[#3f00e7] transition-all duration-300"
          >
            Sign in
          </Link>
        </div>
      )}
    </header>
  )
}

export default Header
