import { useContext, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TicketsTable from '../components/TicketsTable.jsx'
import { AuthContext } from '../context/AuthContext.jsx'
import '../styles/dashboard.css'
import '../styles/tickets.css'

const TICKETS_KEY = 'mockTickets'

function UserDashboard() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [allTickets] = useState(() => JSON.parse(localStorage.getItem(TICKETS_KEY)) || [])

  const visibleTickets = useMemo(
    () => allTickets.filter((ticket) => ticket.createdBy === user?.email),
    [allTickets, user?.email],
  )
  const openCount = useMemo(() => visibleTickets.filter((ticket) => ticket.status === 'Open').length, [visibleTickets])
  const inProgressCount = useMemo(
    () => visibleTickets.filter((ticket) => ticket.status === 'In Progress').length,
    [visibleTickets],
  )
  const resolvedCount = useMemo(
    () => visibleTickets.filter((ticket) => ticket.status === 'Resolved').length,
    [visibleTickets],
  )

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <main className='dashboard-page'>
      <section className='dashboard-card'>
        <div className='dashboard-hero'>
          <div>
            <p className='dashboard-kicker'>Workspace</p>
            <h1>User Dashboard</h1>
            <p className='dashboard-subtitle'>Track your submitted tickets in one view.</p>
          </div>
        </div>

        <div className='dashboard-stats'>
          <article>
            <h3>Total Tickets</h3>
            <p>{visibleTickets.length}</p>
          </article>
          <article>
            <h3>Open</h3>
            <p>{openCount}</p>
          </article>
          <article>
            <h3>In Progress</h3>
            <p>{inProgressCount}</p>
          </article>
          <article>
            <h3>Resolved</h3>
            <p>{resolvedCount}</p>
          </article>
        </div>

        <TicketsTable tickets={visibleTickets} isAgent={false} />

        <div className='dashboard-actions'>
          <button type='button' onClick={handleLogout}>
            Logout
          </button>
        </div>
      </section>
    </main>
  )
}

export default UserDashboard
