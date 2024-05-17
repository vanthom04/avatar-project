import { Navigate, createBrowserRouter } from 'react-router-dom'

import config from '~/config'
import Layout from '~/layouts'

import HomePage from '~/pages/Home'
import SignInPage from '~/pages/SignIn'
import ProfilePage from '~/pages/Profile'
import SignUpPage from '~/pages/SignUp'
import NotFoundPage from '~/pages/NotFound'
import Template from '~/pages/Templates'

import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicRoute />,
    children: [
      { path: config.routes.signIn, element: <SignInPage /> },
      { path: config.routes.signUp, element: <SignUpPage /> }
    ]
  },
  {
    path: '/',
    element: <PrivateRoute element={Layout} />,
    children: [
      { index: true, element: <HomePage /> },
      { path: config.routes.profile, element: <ProfilePage /> },
      { path: config.routes.templates, element: <Template /> }
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
