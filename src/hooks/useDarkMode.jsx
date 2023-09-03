import { DarkModeContext } from '@/contexts'
import { useContext } from 'react'

export const useDarkModeContext = () => {
  const context = useContext(DarkModeContext)

  return { ...context }
}
