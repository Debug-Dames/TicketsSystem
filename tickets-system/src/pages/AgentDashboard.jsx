import { useContext, useEffect, useMemo, useState } from 'react'
import TicketsTable from '../components/TicketsTable.jsx'
import { AuthContext } from '../context/AuthContext.jsx'
import { getTickets, saveTickets, subscribeTickets } from '../utils/ticketsStore'
import '../styles/dashboard.css'
import '../styles/tickets.css'

function AgentDashboard() {
  const { user } = useContext(AuthContext)
  const [allTickets, setAllTickets] = useState(() => getTickets())

  useEffect(() => {
    return subscribeTickets(setAllTickets)
  }, [])

  const visibleTickets = useMemo(() => allTickets, [allTickets])
  const openCount = useMemo(() => visibleTickets.filter((ticket) => ticket.status === 'Open').length, [visibleTickets])
  const inProgressCount = useMemo(
    () => visibleTickets.filter((ticket) => ticket.status === 'In Progress').length,
    [visibleTickets],
  )
  const resolvedCount = useMemo(
    () => visibleTickets.filter((ticket) => ticket.status === 'Resolved').length,
    [visibleTickets],
  )
  const highPriorityCount = useMemo(
    () => visibleTickets.filter((ticket) => ticket.priority === 'High').length,
    [visibleTickets],
  )
  const applicationsCount = useMemo(
    () => new Set(visibleTickets.map((ticket) => ticket.application).filter(Boolean)).size,
    [visibleTickets],
  )

  const handleStatusChange = (ticketId, status, comment) => {
    const cleanComment = comment?.trim()
    const updated = allTickets.map((ticket) => {
      if (ticket.id !== ticketId) return ticket
      const nextComments = cleanComment
        ? [...(ticket.comments || []), { by: user.email, text: cleanComment, at: new Date().toISOString() }]
        : ticket.comments || []
      return { ...ticket, status, comments: nextComments }
    })
    setAllTickets(updated)
    saveTickets(updated)
  }

  return (
    <main className='dashboard-page'>
      <section className='dashboard-card'>
        <div className='dashboard-hero'>
          <div>
            <p className='dashboard-kicker'>Operations</p>
            <p className='dashboard-subtitle'>
              Monitor, update and resolve incoming support tickets. Support agents see all tickets on the agent
              dashboard.
            </p>
          </div>
        </div>

        <div className='dashboard-stats'>
          <article>
            <h3>Visible Tickets</h3>
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
          <article>
            <h3>High Priority</h3>
            <p>{highPriorityCount}</p>
          </article>
          <article>
            <h3>Applications</h3>
            <p>{applicationsCount}</p>
          </article>
        </div>

        <TicketsTable tickets={visibleTickets} isAgent onStatusChange={handleStatusChange} />
      </section>
    </main>
  )
}

export default AgentDashboard
