import { Fragment } from 'react/jsx-runtime'
import { Navigate, createBrowserRouter } from 'react-router-dom'

import config from '~/config'
import Layout from '~/layouts'

import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'

import SignUpPage from '~/pages/SignUp'
import SignInPage from '~/pages/SignIn'
import ProfilePage from '~/pages/Profile'
import NotFoundPage from '~/pages/NotFound'
import TemplatesPage from '~/pages/Templates'
import CustomAvatarPage from '~/pages/CustomAvatar'
import UpdatePasswordPage from '~/pages/UpdatePassword'
import RecoverPasswordPage from '~/pages/RecoverPassword'
import MyAvatarsPage from '~/pages/MyAvatars'
import ManagerTemplatesPage from '~/pages/ManagerTemplates'
import AdminRoute from './AdminRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicRoute />,
    children: [
      { path: config.routes.signIn, element: <SignInPage /> },
      { path: config.routes.signUp, element: <SignUpPage /> },
      { path: config.routes.recoverPassword, element: <RecoverPasswordPage /> }
    ]
  },
  {
    path: '/',
    element: <PrivateRoute element={Layout} />,
    children: [
      { index: true, path: config.routes.myAvatars, element: <MyAvatarsPage /> },
      { path: config.routes.profile, element: <ProfilePage /> },
      { path: config.routes.templates, element: <TemplatesPage /> }
    ]
  },
  {
    path: '/',
    element: <AdminRoute element={Layout} />,
    children: [{ path: config.routes.managerTemplates, element: <ManagerTemplatesPage /> }]
  },
  {
    element: <PrivateRoute element={Fragment} />,
    children: [
      { path: config.routes.updatePassword, element: <UpdatePasswordPage /> },
      { path: config.routes.customAvatar, element: <CustomAvatarPage /> }
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
