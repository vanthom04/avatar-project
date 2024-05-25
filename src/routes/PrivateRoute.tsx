import { Navigate, Outlet } from 'react-router-dom'

import config from '~/config'
import { useUser } from '~/hooks'

interface PrivateRouteProps {
  element: React.ElementType
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element: Element }) => {
  const { user, isLoading } = useUser()

  if (isLoading) return null

  return user ? (
    <Element>
      <Outlet />
    </Element>
  ) : (
    <Navigate to={config.routes.signIn} replace />
  )
}

export default PrivateRoute
