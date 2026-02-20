// import { useContext, useEffect, useMemo, useState } from 'react'
// import { Link } from 'react-router-dom'
// import TicketsTable from '../components/TicketsTable.jsx'
// import { AuthContext } from '../context/AuthContext.jsx'
// import { getTickets } from '../services/api'
// import '../styles/dashboard.css'
// import '../styles/tickets.css'

// function UserDashboard() {
//   const { user } = useContext(AuthContext)
//   const [allTickets, setAllTickets] = useState([])

//   useEffect(() => {
//     if (!user) {
//       setAllTickets([])
//       return
//     }

//     let cancelled = false

//     async function fetchTickets() {
//       try {
//         const data = await getTickets(user.token)
//         if (!cancelled) setAllTickets(Array.isArray(data) ? data : [])
//       } catch (err) {
//         console.error('Failed to fetch tickets:', err)
//         if (!cancelled) setAllTickets([])
//       }
//     }

//     // initial fetch
//     fetchTickets()

//     // poll for updates every 5 seconds
//     const id = window.setInterval(fetchTickets, 5000)

//     return () => {
//       cancelled = true
//       window.clearInterval(id)
//     }
//   }, [user])

//   const myTickets = useMemo(() => {
//     if (!user) return []
//     return allTickets.filter((ticket) => ticket.createdBy === user.email)
//   }, [allTickets, user])

//   const stats = useMemo(() => {
//     const total = myTickets.length
//     const open = myTickets.filter((ticket) => ticket.status === 'Open').length
//     const inProgress = myTickets.filter((ticket) => ticket.status === 'In Progress').length
//     const resolved = myTickets.filter((ticket) => ticket.status === 'Resolved').length
//     return { total, open, inProgress, resolved }
//   }, [myTickets])

//   return (
//     <main className='dashboard-page'>
//       <section className='dashboard-card'>
//         <div className='dashboard-hero'>
//           <div>
//             <p className='dashboard-kicker'>Welcome</p>
//             <p className='dashboard-subtitle'>Here is a quick view of your support activity.</p>
//           </div>
//         </div>

//         <section className='stats-grid dashboard-section'>
//           <div className='stat-card'>
//             <p className='stat-label'>Total Tickets</p>
//             <p className='stat-value'>{stats.total}</p>
//           </div>
//           <div className='stat-card'>
//             <p className='stat-label'>Open</p>
//             <p className='stat-value'>{stats.open}</p>
//           </div>
//           <div className='stat-card'>
//             <p className='stat-label'>In Progress</p>
//             <p className='stat-value'>{stats.inProgress}</p>
//           </div>
//           <div className='stat-card'>
//             <p className='stat-label'>Resolved</p>
//             <p className='stat-value'>{stats.resolved}</p>
//           </div>
//         </section>

//         <section className='actions-row dashboard-section'>
//           <Link to='/create-ticket' className='primary-action-btn'>
//             Create Ticket
//           </Link>
//         </section>

//         <section className='panel dashboard-section'>
//           <TicketsTable tickets={myTickets} />
//         </section>
//       </section>
//     </main>
//   )
// }

// export default UserDashboard




import { useContext, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import TicketsTable from '../components/TicketsTable.jsx'
import { AuthContext } from '../context/AuthContext.jsx'
import { getTickets } from '../services/api'
import '../styles/dashboard.css'
import '../styles/tickets.css'

function UserDashboard() {
  const { user } = useContext(AuthContext)
  const [allTickets, setAllTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user?.token) {
      setAllTickets([])
      setLoading(false)
      return
    }

    let cancelled = false

    const fetchTickets = async () => {
      try {
        const data = await getTickets(user.token)
        // console.log('Tickets fetched:', data)
        if (!cancelled) setAllTickets(Array.isArray(data.tickets) ? data.tickets : [])
      } catch (err) {
        // console.error('Failed to fetch tickets:', err)
        if (!cancelled) setAllTickets([])
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchTickets()
    const id = setInterval(fetchTickets, 5000)
    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [user])

  const myTickets = useMemo(() => {
    if (!user) return []
    return allTickets.filter((ticket) => ticket.user_id === user.id)
  }, [allTickets, user])

  const stats = useMemo(() => {
    const total = myTickets.length
    const open = myTickets.filter((t) => t.status === 'Open').length
    const inProgress = myTickets.filter((t) => t.status === 'In Progress').length
    const resolved = myTickets.filter((t) => t.status === 'Resolved').length
    return { total, open, inProgress, resolved }
  }, [myTickets])

  if (loading) return <p>Loading tickets...</p>
  if (error) return <p className="error-message">Error: {error}</p>

  return (
    <main className='dashboard-page'>
      <section className='dashboard-card'>
        <div className='dashboard-hero'>
          <div>
            <p className='dashboard-kicker'>Welcome</p>
            <p className='dashboard-subtitle'>Here is a quick view of your support activity.</p>
          </div>
        </div>

        <section className='stats-grid dashboard-section'>
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

        <section className='actions-row dashboard-section'>
          <Link to='/create-ticket' className='primary-action-btn'>
            Create Ticket
          </Link>
        </section>

        <section className='panel dashboard-section'>
          <TicketsTable tickets={myTickets} />
        </section>
      </section>
    </main>
  )
}

export default UserDashboard