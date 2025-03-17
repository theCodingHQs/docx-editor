import { RouterProvider, createRouter } from '@tanstack/react-router'
import './App.css'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {
  return (
    <div className="min-h-full">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
