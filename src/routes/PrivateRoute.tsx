import { Navigate, Outlet } from 'react-router-dom'
import config from '~/config'
import { useUser } from '~/hooks'

interface PrivateRouteProps {
  element: React.ElementType
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element: Element }) => {
  // const { user } = useUser()
  const user = true

  return user ? (
    <Element>
      <Outlet />
    </Element>
  ) : (
    <Navigate to={config.routes.signIn} replace />
  )
}

export default PrivateRoute
