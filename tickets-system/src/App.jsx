import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import AgentDashboard from './pages/AgentDashboard.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import Login from './pages/Login.jsx'
import MyTickets from './pages/MyTickets.jsx'
import Register from './pages/Register.jsx'
import Reports from './pages/Reports.jsx'
import Settings from './pages/Settings.jsx'
import CreateTicket from './pages/TicketForm.jsx'
import UserDashboard from './pages/UserDashboard.jsx'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/login' replace />} />
      <Route path='/login' element={<Login />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/register' element={<Register />} />
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/my-tickets' element={<MyTickets />} />
        <Route path='/reports' element={<Reports />} />
        <Route path='/settings' element={<Settings />} />
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
      </Route>
      <Route path='*' element={<Navigate to='/login' replace />} />
    </Routes>
  )
}

export default App
