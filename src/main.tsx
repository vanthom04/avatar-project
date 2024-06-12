import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ReactDOM from 'react-dom/client'
import UserProvider from '~/providers/UserProvider'
import GlobalProvider from './providers/GlobalProvider'
import App from '~/App.tsx'
import '~/index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </UserProvider>
  </QueryClientProvider>
)
