/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from 'react'
import { InitialStateType } from './reducer'

const Context = createContext<[InitialStateType, React.Dispatch<any>] | undefined>(undefined)

export default Context
