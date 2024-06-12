import { Provider } from '~/context'

function GlobalProvider({ children }: { children: React.ReactNode }) {
  return <Provider>{children}</Provider>
}

export default GlobalProvider
