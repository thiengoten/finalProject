import { RouterProvider } from 'react-router-dom'
import router from './routes'
import { useDarkModeContext } from './hooks/useDarkMode'
import { Toaster } from 'react-hot-toast'

function App() {
  const { isDarkMode } = useDarkModeContext()

  return (
    <main
      className={`${isDarkMode ? 'dark' : ''}  bg-background text-foreground`}
    >
      <RouterProvider router={router} />
      <Toaster />
    </main>
  )
}

export default App
