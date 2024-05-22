import { RouterProvider } from 'react-router-dom'

import router from '~/routes'
import ModalProvider from '~/providers/ModalProvider'
import ToasterProvider from '~/providers/ToasterProvider'

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToasterProvider />
      <ModalProvider />
    </>
  )
}

export default App
