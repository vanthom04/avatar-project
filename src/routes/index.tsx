import { Fragment } from 'react/jsx-runtime'
import { Navigate, createBrowserRouter } from 'react-router-dom'

import config from '~/config'
import Layout from '~/layouts'

import HomePage from '~/pages/Home'
import ProfilePage from '~/pages/Profile'
import NotFoundPage from '~/pages/NotFound'
import Template from '~/pages/Template'
import ManagerMyAvatars from '~/pages/ManagerMyAvatars'
import SignIn from '~/pages/SignIn'
import SignUpPage from '~/pages/SignUp'
import RecoverPassword from '~/pages/RecoverPassword'
import UpdatePassword from '~/pages/UpdatePassword'

import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import CustomAvatar from '~/pages/CustomAvatar'

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicRoute />,
    children: [
      { path: config.routes.signIn, element: <SignIn /> },
      { path: config.routes.signUp, element: <SignUpPage /> },
      { path: config.routes.recoverPassword, element: <RecoverPassword /> }
    ]
  },
  {
    path: '/',
    element: <PrivateRoute element={Layout} />,
    children: [
      { index: true, element: <HomePage /> },
      { path: config.routes.profile, element: <ProfilePage /> },
      { path: config.routes.template, element: <Template /> },
      { path: config.routes.managerMyAvatars, element: <ManagerMyAvatars /> }
    ]
  },
  {
    element: <PrivateRoute element={Fragment} />,
    children: [
      { path: config.routes.updatePassword, element: <UpdatePassword /> },
      { path: config.routes.customAvatar, element: <CustomAvatar /> }
    ]
  },
  {
    path: config.routes.notFound,
    element: <NotFoundPage />
  },
  {
    path: '*',
    element: <Navigate to={config.routes.notFound} replace />
  }
])

export default router
