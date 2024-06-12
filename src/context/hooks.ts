import { useContext } from 'react'
import Context from './Context'

export const useGlobalContext = () => {
  const context = useContext(Context)
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a GlobalContextProvider')
  }

  return context
}
