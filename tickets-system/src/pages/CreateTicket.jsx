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
    const newTicket = {
      id: crypto.randomUUID(),
      title: ticket.title,
      description: ticket.description,
      category: ticket.category,
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
    <div className='create-ticket-page'>
      <main className='create-ticket-container'>
        <section className='panel create-ticket-panel'>
          <h1 className='section-title'>Create Ticket</h1>
          <p className='hero-copy'>Select a ticket title and description to submit faster.</p>
          <TicketForm onSubmit={handleTicketSubmit} />
        </section>
      </main>
    </div>
  )
}

export default CreateTicket

