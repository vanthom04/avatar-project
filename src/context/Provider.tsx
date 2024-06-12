import { useReducer } from 'react'
import Context from './Context'
import reducer, { initialState } from './reducer'

function Provider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
}

export default Provider
