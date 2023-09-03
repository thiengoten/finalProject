import { createContext } from 'react'
import { useDarkMode } from 'usehooks-ts'

const DarkModeContext = createContext()

export const DarkModeProvider = ({ children }) => {
  const { isDarkMode, toggle, enable, disable } = useDarkMode(false)

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggle, enable, disable }}>
      {children}
    </DarkModeContext.Provider>
  )
}
export default DarkModeContext
