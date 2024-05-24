import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'

import router from '~/routes'
import ModalProvider from '~/providers/ModalProvider'
import ToasterProvider from '~/providers/ToasterProvider'

function App() {
  return (
    <Suspense>
      <RouterProvider router={router} />
      <ToasterProvider />
      <ModalProvider />
    </Suspense>
  )
}

export default App
