import { Navigate, Outlet } from 'react-router-dom'
import config from '~/config'
import { useUser } from '~/hooks'

const PublicRoute: React.FC = () => {
  const { user } = useUser()

  return user ? (
    <Navigate to={config.routes.home} replace />
  ) : (
    <>
      <Outlet />
    </>
  )
}

export default PublicRoute
