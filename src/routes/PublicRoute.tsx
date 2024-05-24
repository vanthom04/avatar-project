import { Navigate, Outlet } from 'react-router-dom'
import config from '~/config'
import { useUser } from '~/hooks'

const PublicRoute: React.FC = () => {
  const { user, isLoading } = useUser()

  if (isLoading) return null

  return user ? (
    <Navigate to={config.routes.myAvatars} replace />
  ) : (
    <>
      <Outlet />
      <Navigate to={config.routes.signIn} replace />
    </>
  )
}

export default PublicRoute
