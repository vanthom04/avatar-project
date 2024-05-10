import { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import UserProvider from '~/providers/UserProvider'
import App from '~/App.tsx'
import '~/index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <Suspense>
        <App />
      </Suspense>
    </UserProvider>
  </QueryClientProvider>
)
