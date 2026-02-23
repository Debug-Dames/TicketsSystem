import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.jsx'
import '../styles/dashboard.css'
import ConfirmModal from './ConfirmModal.jsx'

function Navbar({ userType }) {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [confirmOpen, setConfirmOpen] = useState(false)

  const handleLogoutClick = () => setConfirmOpen(true)
  const handleConfirm = () => {
    setConfirmOpen(false)
    logout()
    navigate('/login')
  }
  const handleCancel = () => setConfirmOpen(false)

  return (
    <>
      <nav className='app-navbar'>
        <div className='app-navbar-inner'>
          <h1 className='app-navbar-title'>Debug Dames Ticketing System</h1>
          <div className='app-navbar-links'>
            <Link
              to={user?.role === "support" ? "/agent-dashboard" : "/user-dashboard"}
              className='app-nav-link'
            >
              Home
            </Link>
            {user?.role === 'user' && (
              <>
                <Link to='/create-ticket' className='app-nav-link'>
                  Create Ticket
                </Link>
                <Link to='/my-tickets' className='app-nav-link'>
                  My Tickets
                </Link>
              </>
            )}
            {user?.role === 'support' && (
              <Link to='/agent-dashboard' className='app-nav-link'>
                All Tickets
              </Link>
            )}
            <button type='button' className='app-nav-link app-nav-button' onClick={handleLogoutClick}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <ConfirmModal
        open={confirmOpen}
        title="Sign out?"
        message="Are you sure you want to sign out?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        confirmText="Sign out"
        cancelText="Cancel"
      />
    </>
  )
}

export default Navbar
