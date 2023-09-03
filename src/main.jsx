import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import { DarkModeProvider } from './contexts/index.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <NextUIProvider>
    <DarkModeProvider>
      <App />
    </DarkModeProvider>
  </NextUIProvider>,
)
