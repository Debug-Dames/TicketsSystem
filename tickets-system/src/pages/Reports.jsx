import { useContext, useEffect, useMemo, useState } from 'react'
import { AuthContext } from '../context/AuthContext.jsx'
import { getTickets, subscribeTickets } from '../utils/ticketsStore'
import '../styles/dashboard.css'

function Reports() {
  const { user } = useContext(AuthContext)
  const [allTickets, setAllTickets] = useState(() => getTickets())

  useEffect(() => {
    return subscribeTickets(setAllTickets)
  }, [])

  const visibleTickets = useMemo(() => {
    if (!user) return []
    if (user.role === 'agent') return allTickets
    return allTickets.filter((ticket) => ticket.createdBy === user.email)
  }, [allTickets, user])

  const openCount = useMemo(() => visibleTickets.filter((ticket) => ticket.status === 'Open').length, [visibleTickets])
  const inProgressCount = useMemo(
    () => visibleTickets.filter((ticket) => ticket.status === 'In Progress').length,
    [visibleTickets],
  )
  const resolvedCount = useMemo(
    () => visibleTickets.filter((ticket) => ticket.status === 'Resolved').length,
    [visibleTickets],
  )

  return (
    <main className='dashboard-page'>
      <section className='dashboard-card'>
        <div className='dashboard-hero'>
          <div>
            <p className='dashboard-kicker'>Insights</p>
            <h1>Reports</h1>
            <p className='dashboard-subtitle'>
              {user?.role === 'agent' ? 'Operational overview of all tickets.' : 'Summary of your ticket activity.'}
            </p>
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
      </section>
    </main>
  )
}

export default Reports
