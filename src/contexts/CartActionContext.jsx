import reducer, { initState } from '@/store/reducer'
import { useReducer } from 'react'
import { createContext } from 'react'

const CartActionContext = createContext()

export const CartActionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState)
  return (
    <CartActionContext.Provider value={[state, dispatch]}>
      {children}
    </CartActionContext.Provider>
  )
}

export default CartActionContext
