import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.jsx'
import '../styles/dashboard.css'

function Navbar({ userType }) {
  const { logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className='app-navbar'>
      <div className='app-navbar-inner'>
        <h1 className='app-navbar-title'>Debug Dames Ticketing System</h1>
        <div className='app-navbar-links'>
          <Link to='/dashboard' className='app-nav-link'>
            Home
          </Link>
          {userType === 'user' && (
            <>
              <Link to='/create-ticket' className='app-nav-link'>
                Create Ticket
              </Link>
              <Link to='/my-tickets' className='app-nav-link'>
                My Tickets
              </Link>
            </>
          )}
          {userType === 'agent' && (
            <Link to='/agent-dashboard' className='app-nav-link'>
              All Tickets
            </Link>
          )}
          <button type='button' className='app-nav-link app-nav-button' onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
