import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.jsx'

function Dashboard() {
  const { user } = useContext(AuthContext)
  return <Navigate to={user?.role === 'agent' ? '/agent-dashboard' : '/user-dashboard'} replace />
}

export default Dashboard
