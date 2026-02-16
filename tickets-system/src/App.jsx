import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import AgentDashboard from './pages/AgentDashboard.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import CreateTicket from './pages/TicketForm.jsx'
import UserDashboard from './pages/UserDashboard.jsx'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/login' replace />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route
        path='/dashboard'
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path='/user-dashboard'
        element={
          <ProtectedRoute role='user'>
            <UserDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path='/agent-dashboard'
        element={
          <ProtectedRoute role='agent'>
            <AgentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path='/create-ticket'
        element={
          <ProtectedRoute role='user'>
            <CreateTicket />
          </ProtectedRoute>
        }
      />
      <Route path='*' element={<Navigate to='/login' replace />} />
    </Routes>
  )
}

export default App
