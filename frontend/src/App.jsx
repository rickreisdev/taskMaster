import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/Layout/Layout'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import './index.css'

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App