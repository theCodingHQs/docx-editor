import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import App from './App.tsx'
import './index.css'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      //cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 0, // Retry failed requests once
      refetchOnWindowFocus: false, // Disable refetch on window focus
    },
    // mutations: {
    //   retry: 0, // Retry failed mutations once
    // },
  },
})

createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <StrictMode>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
    </StrictMode>
  </BrowserRouter>,
)
