import { useContext, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import TicketsTable from '../components/TicketsTable.jsx'
import { AuthContext } from '../context/AuthContext.jsx'
import { getTickets, subscribeTickets } from '../utils/ticketsStore'
import '../styles/dashboard.css'
import '../styles/tickets.css'

function UserDashboard() {
  const { user } = useContext(AuthContext)
  const [allTickets, setAllTickets] = useState(() => getTickets())

  useEffect(() => {
    return subscribeTickets(setAllTickets)
  }, [])

  const myTickets = useMemo(() => {
    if (!user) return []
    return allTickets.filter((ticket) => ticket.createdBy === user.email)
  }, [allTickets, user])

  const stats = useMemo(() => {
    const total = myTickets.length
    const open = myTickets.filter((ticket) => ticket.status === 'Open').length
    const inProgress = myTickets.filter((ticket) => ticket.status === 'In Progress').length
    const resolved = myTickets.filter((ticket) => ticket.status === 'Resolved').length
    return { total, open, inProgress, resolved }
  }, [myTickets])

  return (
    <main className='dashboard-page'>
      <section className='dashboard-card'>
        <div className='dashboard-hero'>
          <div>
            <p className='dashboard-kicker'>Welcome</p>
            <h1>{user?.name ? `${user.name}'s Dashboard` : 'User Dashboard'}</h1>
            <p className='dashboard-subtitle'>Here is a quick view of your support activity.</p>
          </div>
        </div>

        <section className='stats-grid'>
          <div className='stat-card'>
            <p className='stat-label'>Total Tickets</p>
            <p className='stat-value'>{stats.total}</p>
          </div>
          <div className='stat-card'>
            <p className='stat-label'>Open</p>
            <p className='stat-value'>{stats.open}</p>
          </div>
          <div className='stat-card'>
            <p className='stat-label'>In Progress</p>
            <p className='stat-value'>{stats.inProgress}</p>
          </div>
          <div className='stat-card'>
            <p className='stat-label'>Resolved</p>
            <p className='stat-value'>{stats.resolved}</p>
          </div>
        </section>

        <section className='actions-row'>
          <Link to='/create-ticket' className='primary-action-btn'>
            Create Ticket
          </Link>
        </section>

        <section className='panel'>
          <h2 className='section-title'>My Tickets</h2>
          <TicketsTable tickets={myTickets} />
        </section>
      </section>
    </main>
  )
}

export default UserDashboard
