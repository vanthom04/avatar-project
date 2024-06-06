import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import config from '~/config'
import { useUser } from '~/hooks'

interface AdminRouteProps {
  element: React.ElementType
}

const AdminRoute: React.FC<AdminRouteProps> = ({ element: Element }) => {
  const { isLoading, role } = useUser()

  if (isLoading) return null

  return ['admin', 'editor'].includes(role) ? (
    <Element>
      <Outlet />
    </Element>
  ) : (
    <Navigate to={config.routes.myAvatars} />
  )
}

export default AdminRoute
