import { RouterProvider } from 'react-router-dom'
import router from './routes'
import { useDarkModeContext } from './hooks/useDarkMode'

function App() {
  const { isDarkMode } = useDarkModeContext()

  return (
    <main
      className={`${isDarkMode ? 'dark' : ''} bg-background text-foreground`}
    >
      <RouterProvider router={router} />
    </main>
  )
}

export default App
