import { useContext, useEffect, useMemo, useState } from 'react'
import TicketsTable from '../components/TicketsTable.jsx'
import { AuthContext } from '../context/AuthContext.jsx'
import { getTickets, saveTickets, subscribeTickets } from '../utils/ticketsStore'
import { getAllTickets, updateTicketStatus, addTicketComment } from '../services/api.js'
import '../styles/dashboard.css'
import '../styles/tickets.css'

function AgentDashboard() {
  const { user } = useContext(AuthContext)
  const [allTickets, setAllTickets] = useState(() => getTickets())

//Fetch tickets from backend on mount  
  useEffect(() => {
    if (!user?.token) return;

    async function fetchTickets() {
      
      const result = await getAllTickets(user.token);

      if (result.success) {
        const formattedTickets = result.tickets.map((ticket) => ({
          id: ticket.id,
          requesterId: ticket.user_id,
          title: ticket.title,
          description: ticket.description,
          priority:
            ticket.priority?.toLowerCase() === "high"
              ? "High"
              : ticket.priority?.toLowerCase() === "medium"
              ? "Medium"
              : "Low",
          status:
            ticket.status === "in_progress"
              ? "In Progress"
              : ticket.status === "Open"
              ? "Open"
              : ticket.status === "Resolved"
              ? "Resolved"
              : ticket.status,
          createdBy: ticket.user_id,
          assignedTo: ticket.assigned_to || "Unassigned",
          comments: ticket.comment
            ? [{ by: "Agent", text: ticket.comment }]
            : [],
          createdAt: ticket.created_at,
        }));

        setAllTickets(formattedTickets);
      }
    }

  fetchTickets();
}, [user]);




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

  // const handleStatusChange = (ticketId, status, comment) => {
  //   const cleanComment = comment?.trim()
  //   const updated = allTickets.map((ticket) => {
  //     if (ticket.id !== ticketId) return ticket
  //     const nextComments = cleanComment
  //       ? [...(ticket.comments || []), { by: user.email, text: cleanComment, at: new Date().toISOString() }]
  //       : ticket.comments || []
  //     return { ...ticket, status, comments: nextComments }
  //   })
  //   setAllTickets(updated)
  //   saveTickets(updated)
  // }

  const handleStatusChange = async (ticketId, status, comment) => {
    // Update status
    const statusResult = await updateTicketStatus(ticketId, status, user.token);
    if (statusResult.success) {
      setAllTickets((current) =>
        current.map((t) => (t.id === ticketId ? statusResult.ticket : t))
      );
    }

    // Add comment if provided
    if (comment?.trim()) {
      await addTicketComment(ticketId, comment, user.token);
      // Refresh tickets after comment
      const refreshed = await getAllTickets(user.token);
      if (refreshed.success) setAllTickets(refreshed.tickets);
    }
  };


  return (
    <main className='dashboard-page'>
      <section className='dashboard-card'>
        <div className='dashboard-hero'>
          <div>
            <p className='dashboard-kicker'>Support Operations</p>
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

        <section className="panel dashboard-section">
          <h2 className="section-title">All Tickets</h2>
          <TicketsTable
            tickets={visibleTickets}
            isAgent
            onStatusChange={handleStatusChange}
          />
        </section>

        {/* Actions */}
        <div className="dashboard-actions">
          <button onClick={() => window.location.reload()}>
            Refresh Tickets
          </button>
          <button>Export Report</button>
        </div>


        {/* <TicketsTable tickets={visibleTickets} isAgent onStatusChange={handleStatusChange} /> */}
      </section>
    </main>
  )
}

export default AgentDashboard
