import { CartActionContext } from '@/contexts'
import { useContext } from 'react'

const useCartAction = () => {
  const [state, dispatch] = useContext(CartActionContext)
  return [state, dispatch]
}

export default useCartAction
