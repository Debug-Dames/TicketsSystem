// import { useContext, useEffect, useMemo, useState } from 'react'
// import TicketsTable from '../components/TicketsTable.jsx'
// import { AuthContext } from '../context/AuthContext.jsx'
// import { getTickets, saveTickets, subscribeTickets } from '../utils/ticketsStore'
// import '../styles/dashboard.css'
// import '../styles/tickets.css'

// function MyTickets() {
//   const { user } = useContext(AuthContext)
//   const [allTickets, setAllTickets] = useState(() => getTickets())

//   useEffect(() => {
//     return subscribeTickets(setAllTickets)
//   }, [])

//   const visibleTickets = useMemo(() => {
//     if (!user) return []
//     if (user.role === 'support') {
//       return allTickets.filter((ticket) => Boolean(ticket.createdBy))
//     }
//     return allTickets.filter((ticket) => ticket.createdBy === user.email)
//   }, [allTickets, user])

//   const handleStatusChange = (ticketId, status, comment) => {
//     if (user?.role !== 'support') return

//     const cleanComment = comment?.trim()
//     const updated = allTickets.map((ticket) => {
//       if (ticket.id !== ticketId) return ticket
//       const nextComments = cleanComment
//         ? [...(ticket.comments || []), { by: user.email, text: cleanComment, at: new Date().toISOString() }]
//         : ticket.comments || []
//       return { ...ticket, status, comments: nextComments }
//     })

//     setAllTickets(updated)
//     saveTickets(updated)
//   }

//   return (
//     <main className='dashboard-page'>
//       <section className='dashboard-card'>
//         <div className='dashboard-hero'>
//           <div>
//             <p className='dashboard-kicker'>Tickets</p>
//             <p className='dashboard-subtitle'>
//               {user?.role === 'support'
//                 ? 'Tickets created by users.'
//                 : 'Tickets you have submitted and their status.'}
//             </p>
//           </div>
//         </div>

//         <TicketsTable tickets={visibleTickets} isAgent={user?.role === 'support'} onStatusChange={handleStatusChange} />
//       </section>
//     </main>
//   )
// }

// export default MyTickets




import { useContext, useEffect, useState } from 'react'
import TicketsTable from '../components/TicketsTable.jsx'
import { AuthContext } from '../context/AuthContext.jsx'
import { getTickets, getAllTickets } from '../services/api'
import '../styles/dashboard.css'
import '../styles/tickets.css'

function MyTickets() {
  const { user } = useContext(AuthContext)
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTickets = async () => {
      if (!user?.token) return

      try {
        let data;
        if (user?.role === 'support') {
          data = await getAllTickets(user.token); // ✅ support sees all tickets
        } else {
          data = await getTickets(user.token);    // ✅ user sees only their tickets
        }


        console.log("API tickets response:", data)

        // Backend returns { success, tickets }
        setTickets(data.tickets || [])
      } catch (err) {
        console.error("Failed to load tickets:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchTickets()
  }, [user])

  if (loading) {
    return <div>Loading tickets...</div>
  }

  return (
    <main className='dashboard-page'>
      <section className='dashboard-card'>
        <div className='dashboard-hero'>
          <div>
            <p className='dashboard-kicker'>Tickets</p>
            <p className='dashboard-subtitle'>
              {user?.role === 'support'
                ? 'All submitted tickets.'
                : 'Tickets you have submitted and their status.'}
            </p>
          </div>
        </div>

        <TicketsTable
          tickets={tickets}
          isAgent={user?.role === 'support'}
        />
      </section>
    </main>
  )
}

export default MyTickets