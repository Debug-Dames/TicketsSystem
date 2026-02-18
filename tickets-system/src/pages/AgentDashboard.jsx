import { useContext, useEffect, useMemo, useState } from 'react'
import TicketsTable from '../components/TicketsTable.jsx'
import { AuthContext } from '../context/AuthContext.jsx'
import { TICKET_CATEGORIES, TICKET_TITLES } from '../data/ticketOptions'
import { getTickets, saveTickets, subscribeTickets } from '../utils/ticketsStore'
import '../styles/dashboard.css'
import '../styles/tickets.css'

function AgentDashboard() {
  const { user } = useContext(AuthContext)
  const [titleFilter, setTitleFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [allTickets, setAllTickets] = useState(() => getTickets())

  useEffect(() => {
    return subscribeTickets(setAllTickets)
  }, [])

  const visibleTickets = useMemo(() => {
    return allTickets.filter((ticket) => {
      const matchesTitle = titleFilter === 'all' || ticket.title === titleFilter
      const matchesCategory = categoryFilter === 'all' || ticket.category === categoryFilter
      return matchesTitle && matchesCategory
    })
  }, [allTickets, categoryFilter, titleFilter])
  const openCount = useMemo(() => visibleTickets.filter((ticket) => ticket.status === 'Open').length, [visibleTickets])
  const inProgressCount = useMemo(
    () => visibleTickets.filter((ticket) => ticket.status === 'In Progress').length,
    [visibleTickets],
  )
  const resolvedCount = useMemo(
    () => visibleTickets.filter((ticket) => ticket.status === 'Resolved').length,
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
            <h1>Support Agent Dashboard</h1>
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
        </div>

        <div className='dashboard-filters'>
          <div>
            <label htmlFor='titleFilter'>Title</label>
            <select id='titleFilter' value={titleFilter} onChange={(event) => setTitleFilter(event.target.value)}>
              <option value='all'>All titles</option>
              {TICKET_TITLES.map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor='categoryFilter'>Category</label>
            <select
              id='categoryFilter'
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
            >
              <option value='all'>All categories</option>
              {TICKET_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <TicketsTable tickets={visibleTickets} isAgent onStatusChange={handleStatusChange} />
      </section>
    </main>
  )
}

export default AgentDashboard
