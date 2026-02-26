import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import TicketForm from '../components/TicketForm.jsx'
import { AuthContext } from '../context/AuthContext.jsx'
import { getTickets, saveTickets } from '../utils/ticketsStore'
import '../styles/dashboard.css'

const CreateTicket = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleTicketSubmit = (ticket) => {
    const requesterId = user?.id || `user-${crypto.randomUUID().slice(0, 8)}`
    const newTicket = {
      id: crypto.randomUUID(),
      requesterId,
      title: ticket.title,
      description: ticket.description,
      category: ticket.category,
      application: ticket.application,
      priority: ticket.priority,
      status: 'Open',
      createdBy: user?.email || '',
      assignedTo: '',
      comments: [],
      createdAt: new Date().toISOString().slice(0, 10),
    }

    saveTickets([...getTickets(), newTicket])
    alert('Ticket created successfully!')
    navigate('/my-tickets')
  }

  return (
    <main className='dashboard-page'>
      <section className='dashboard-card'>
        <div className='dashboard-hero'>
          <div>
            <p className='dashboard-kicker'>Support</p>
            <p className='dashboard-subtitle'>Capture issue details so support can resolve them faster.</p>
          </div>
        </div>

        <section className='panel create-ticket-panel'>
          <TicketForm onSubmit={handleTicketSubmit} />
        </section>
      </section>
    </main>
  )
}

export default CreateTicket

