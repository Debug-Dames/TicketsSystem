import { useContext, useEffect, useMemo, useState } from 'react'
import TicketsTable from '../components/TicketsTable.jsx'
import { AuthContext } from '../context/AuthContext.jsx'
import { getTickets, saveTickets, subscribeTickets } from '../utils/ticketsStore'
import '../styles/dashboard.css'
import '../styles/tickets.css'

function MyTickets() {
  const { user } = useContext(AuthContext)
  const [allTickets, setAllTickets] = useState(() => getTickets())

  useEffect(() => {
    return subscribeTickets(setAllTickets)
  }, [])

  const visibleTickets = useMemo(() => {
    if (!user) return []
    if (user.role === 'support') {
      return allTickets.filter((ticket) => Boolean(ticket.createdBy))
    }
    return allTickets.filter((ticket) => ticket.createdBy === user.email)
  }, [allTickets, user])

  const handleStatusChange = (ticketId, status, comment) => {
    if (user?.role !== 'support') return

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
            <p className='dashboard-kicker'>Tickets</p>
            <p className='dashboard-subtitle'>
              {user?.role === 'support'
                ? 'Tickets created by users.'
                : 'Tickets you have submitted and their status.'}
            </p>
          </div>
        </div>

        <TicketsTable tickets={visibleTickets} isAgent={user?.role === 'support'} onStatusChange={handleStatusChange} />
      </section>
    </main>
  )
}

export default MyTickets
