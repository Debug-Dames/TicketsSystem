import { useContext, useMemo } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.jsx'
import '../styles/layout.css'

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'My Tickets', path: '/my-tickets' },
  { label: 'Create Ticket', path: '/create-ticket' },
  { label: 'Reports', path: '/reports' },
  { label: 'Profile/Settings', path: '/settings' },
]

const TITLES = {
  '/dashboard': 'Dashboard',
  '/user-dashboard': 'Dashboard',
  '/agent-dashboard': 'Dashboard',
  '/my-tickets': 'My Tickets',
  '/create-ticket': 'Create Ticket',
  '/reports': 'Reports',
  '/settings': 'Profile & Settings',
}

function Layout() {
  const { user, logout } = useContext(AuthContext)
  const location = useLocation()
  const navigate = useNavigate()

  const pageTitle = useMemo(() => TITLES[location.pathname] || 'Ticket System', [location.pathname])
  const showPageHeader = location.pathname !== '/create-ticket'
  const navItems = useMemo(() => {
    if (user?.role === 'agent') {
      return NAV_ITEMS.filter((item) => item.path !== '/create-ticket')
    }
    return NAV_ITEMS
  }, [user?.role])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const linkClassName = ({ isActive }) => `app-nav-link${isActive ? ' active' : ''}`

  return (
    <div className='app-layout'>
      <aside className='app-sidebar'>
        <div className='sidebar-top'>
          <p className='app-brand-kicker'>Tickets System</p>
          <h2>Workspace</h2>
        </div>

        <nav className='app-nav'>
          {navItems.map((item) => {
            return (
              <NavLink key={item.path} to={item.path} className={linkClassName}>
                {item.label}
              </NavLink>
            )
          })}
        </nav>

        <button type='button' className='sidebar-logout' onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <div className='app-main'>
        {showPageHeader && (
          <header className='app-header'>
            <h1>{pageTitle}</h1>
          </header>
        )}
        <section className='app-content'>
          <Outlet />
        </section>
      </div>

      <nav className='mobile-nav'>
        {navItems.map((item) => {
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `mobile-nav-link${isActive ? ' active' : ''}`}
            >
              {item.label}
            </NavLink>
          )
        })}
      </nav>
    </div>
  )
}

export default Layout
