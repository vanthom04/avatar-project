import { lazy } from 'react'
import { Fragment } from 'react/jsx-runtime'
import { Navigate, createBrowserRouter } from 'react-router-dom'

import config from '~/config'
import Layout from '~/layouts'

import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'

const HomePage = lazy(() => import('~/pages/Home'))
const SignUpPage = lazy(() => import('~/pages/SignUp'))
const SignInPage = lazy(() => import('~/pages/SignIn'))
const ProfilePage = lazy(() => import('~/pages/Profile'))
const NotFoundPage = lazy(() => import('~/pages/NotFound'))
const TemplatesPage = lazy(() => import('~/pages/Templates'))
const CustomAvatarPage = lazy(() => import('~/pages/CustomAvatar'))
const UpdatePasswordPage = lazy(() => import('~/pages/UpdatePassword'))
const RecoverPasswordPage = lazy(() => import('~/pages/RecoverPassword'))
const ManagerMyAvatarsPage = lazy(() => import('~/pages/ManagerMyAvatars'))
const ManagerTemplatesPage = lazy(() => import('~/pages/ManagerTemplates'))

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
      { index: true, element: <HomePage /> },
      { path: config.routes.profile, element: <ProfilePage /> },
      { path: config.routes.managerMyAvatars, element: <ManagerMyAvatarsPage /> },
      { path: config.routes.templates, element: <TemplatesPage /> },
      { path: config.routes.managerTemplates, element: <ManagerTemplatesPage /> }
    ]
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
