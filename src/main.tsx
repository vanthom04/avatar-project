import { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import UserProvider from '~/providers/UserProvider'
import App from '~/App.tsx'
import '~/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <UserProvider>
    <Suspense>
      <App />
    </Suspense>
  </UserProvider>
)
