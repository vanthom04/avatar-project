import { Suspense, useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'

import router from '~/routes'
import { useUser } from './hooks'
import { useGlobalContext, actions } from './context'
import { getAllMyAvatars } from './services/avatars'
import { getAllTemplates } from './services/templates'
import ToasterProvider from '~/providers/ToasterProvider'

function App() {
  const { accessToken } = useUser()
  const [state, dispatch] = useGlobalContext()

  useEffect(() => {
    if (!accessToken) return
    if (state.myAvatars.length > 0) return

    getAllMyAvatars(accessToken)
      .then((avatars) => dispatch(actions.getAllMyAvatars(avatars)))
      .catch((error) => console.error((error as Error).message))
  }, [accessToken, dispatch, state.myAvatars.length])

  useEffect(() => {
    if (!accessToken) return
    if (state.templates.length > 0) return

    getAllTemplates(accessToken)
      .then((templates) => dispatch(actions.getAllTemplates(templates)))
      .catch((error) => console.error((error as Error).message))
  }, [accessToken, dispatch, state.templates.length])

  return (
    <Suspense>
      <RouterProvider router={router} />
      <ToasterProvider />
    </Suspense>
  )
}

export default App
