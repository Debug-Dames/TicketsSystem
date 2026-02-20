// import { useContext, useMemo } from 'react'
// import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
// import { AuthContext } from '../context/AuthContext.jsx'
// import logo from '../assets/DebugDames-logo.png'
// import '../styles/layout.css'


// const dashboardPath =
//   user?.role === "support"
//     ? "/agent-dashboard"
//     : "/user-dashboard"


// const NAV_ITEMS = [
//   { label: 'Dashboard', path: 'DYNAMIC_DASHBOARD' },
//   { label: 'My Tickets', path: '/my-tickets' },
//   { label: 'Create Ticket', path: '/create-ticket' },
//   { label: 'Reports', path: '/reports' },
//   { label: 'Profile/Settings', path: '/settings' },
// ]

// const navItems = useMemo(() => {
//   const dashboardPath =
//     user?.role === 'support'
//       ? '/agent-dashboard'
//       : '/user-dashboard'

//   const items = [
//     { label: 'Dashboard', path: dashboardPath },
//     { label: user?.role === 'support' ? 'All Tickets' : 'My Tickets', path: '/my-tickets' },
//     ...(user?.role === 'user'
//       ? [{ label: 'Create Ticket', path: '/create-ticket' }]
//       : []),
//     { label: 'Reports', path: '/reports' },
//     { label: 'Profile/Settings', path: '/settings' },
//   ]

//   return items
// }, [user?.role])

// const TITLES = {
//   '/dashboard': 'Dashboard',
//   '/user-dashboard': 'Dashboard',
//   '/agent-dashboard': 'Dashboard',
//   '/my-tickets': 'Tickets',
//   '/create-ticket': 'Create Ticket',
//   '/reports': 'Reports',
//   '/settings': 'Profile & Settings',
// }

// function Layout() {
//   const { user, logout } = useContext(AuthContext)
//   const location = useLocation()
//   const navigate = useNavigate()

//   const pageTitle = useMemo(() => {
//     if (location.pathname === '/my-tickets') {
//       return user?.role === 'agent' ? 'All Tickets' : 'My Tickets'
//     }
//     return TITLES[location.pathname] || 'Ticket System'
//   }, [location.pathname, user?.role])
//   const navItems = useMemo(() => {
//     if (user?.role === 'agent') {
//       return NAV_ITEMS.filter((item) => item.path !== '/create-ticket').map((item) => {
//         if (item.path !== '/my-tickets') return item
//         return { ...item, label: 'All Tickets' }
//       })
//     }
//     return NAV_ITEMS
//   }, [user?.role])

//   const handleLogout = () => {
//     logout()
//     navigate('/login')
//   }

//   const linkClassName = ({ isActive }) => `app-nav-link${isActive ? ' active' : ''}`

//   return (
//     <div className='app-layout'>
//       <aside className='app-sidebar'>
//         <div className='sidebar-top'>
//           <div className='brand-row'>
//             <img src={logo} alt='Tickets logo' className='brand-logo' />
//             <div>
//               <p className='app-brand-kicker'>Tickets System</p>
//               <h2>Workspace</h2>
//             </div>
//           </div>
//           <p className='brand-copy'>Manage incidents, service requests, and updates in one place.</p>
//         </div>

//         <nav className='app-nav'>
//           {navItems.map((item) => {
//             return (
//               <NavLink key={item.path} to={item.path} className={linkClassName}>
//                 {item.label}
//               </NavLink>
//             )
//           })}
//         </nav>

//         <button type='button' className='sidebar-logout' onClick={handleLogout}>
//           Logout
//         </button>
//       </aside>

//       <div className='app-main'>
//         <header className='app-header'>
//           <img src={logo} alt='DebugDames logo' className='header-logo' />
//           <h1>{pageTitle}</h1>
//         </header>
//         <section className='app-content'>
//           <Outlet />
//         </section>
//       </div>

//       <nav className='mobile-nav'>
//         {navItems.map((item) => {
//           return (
//             <NavLink
//               key={item.path}
//               to={item.path}
//               className={({ isActive }) => `mobile-nav-link${isActive ? ' active' : ''}`}
//             >
//               {item.label}
//             </NavLink>
//           )
//         })}
//       </nav>
//     </div>
//   )
// }

// export default Layout


import { useContext, useMemo } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.jsx'
import logo from '../assets/DebugDames-logo.png'
import '../styles/layout.css'

const TITLES = {
  '/user-dashboard': 'Dashboard',
  '/agent-dashboard': 'Dashboard',
  '/my-tickets': 'Tickets',
  '/create-ticket': 'Create Ticket',
  '/reports': 'Reports',
  '/settings': 'Profile & Settings',
}

function Layout() {
  const { user, logout } = useContext(AuthContext)
  const location = useLocation()
  const navigate = useNavigate()

  // ✅ Compute dashboard path safely inside component
  const dashboardPath =
    user?.role === 'support'
      ? '/agent-dashboard'
      : '/user-dashboard'

  // ✅ Build navigation dynamically
  const navItems = useMemo(() => {
    return [
      { label: 'Dashboard', path: dashboardPath },
      {
        label: user?.role === 'support' ? 'All Tickets' : 'My Tickets',
        path: '/my-tickets',
      },
      ...(user?.role === 'user'
        ? [{ label: 'Create Ticket', path: '/create-ticket' }]
        : []),
      { label: 'Reports', path: '/reports' },
      { label: 'Profile/Settings', path: '/settings' },
    ]
  }, [user?.role, dashboardPath])

  const pageTitle =
    TITLES[location.pathname] || 'Ticket System'

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const linkClassName = ({ isActive }) =>
    `app-nav-link${isActive ? ' active' : ''}`

  return (
    <div className='app-layout'>
      <aside className='app-sidebar'>
        <div className='sidebar-top'>
          <div className='brand-row'>
            <img src={logo} alt='Tickets logo' className='brand-logo' />
            <div>
              <p className='app-brand-kicker'>Tickets System</p>
              <h2>Workspace</h2>
            </div>
          </div>
          <p className='brand-copy'>
            Manage incidents, service requests, and updates in one place.
          </p>
        </div>

        <nav className='app-nav'>
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={linkClassName}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type='button'
          className='sidebar-logout'
          onClick={handleLogout}
        >
          Logout
        </button>
      </aside>

      <div className='app-main'>
        <header className='app-header'>
          <img src={logo} alt='DebugDames logo' className='header-logo' />
          <h1>{pageTitle}</h1>
        </header>

        <section className='app-content'>
          <Outlet />
        </section>
      </div>
    </div>
  )
}

export default Layout