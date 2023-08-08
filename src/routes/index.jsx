import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <h1 className="text-xl font-bold text-red-500">Hello, world!</h1>
      }
    />
  )
)

export default router
