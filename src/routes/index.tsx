import { Fragment } from 'react/jsx-runtime'
import { Navigate, createBrowserRouter } from 'react-router-dom'

import config from '~/config'
import Layout from '~/layouts'

import HomePage from '~/pages/Home'
import SignUpPage from '~/pages/SignUp'
import SignInPage from '~/pages/SignIn'
import ProfilePage from '~/pages/Profile'
import NotFoundPage from '~/pages/NotFound'
import TemplatesPage from '~/pages/Templates'
import CustomAvatar from '~/pages/CustomAvatar'
import UpdatePassword from '~/pages/UpdatePassword'
import RecoverPassword from '~/pages/RecoverPassword'
import ManagerMyAvatars from '~/pages/ManagerMyAvatars'
import ManagerTemplatesPage from '~/pages/ManagerTemplates'

import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicRoute />,
    children: [
      { path: config.routes.signIn, element: <SignInPage /> },
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
      { path: config.routes.managerMyAvatars, element: <ManagerMyAvatars /> },
      { path: config.routes.customAvatar, element: <CustomAvatar /> },
      { path: config.routes.templates, element: <TemplatesPage /> },
      { path: config.routes.managerTemplates, element: <ManagerTemplatesPage /> }
    ]
  },
  {
    element: <PrivateRoute element={Fragment} />,
    children: [{ path: config.routes.updatePassword, element: <UpdatePassword /> }]
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
