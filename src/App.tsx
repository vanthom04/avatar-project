import { RouterProvider } from 'react-router-dom'
import ToasterProvider from '~/providers/ToasterProvider'
import router from '~/routes'

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToasterProvider />
    </>
  )
}

export default App
