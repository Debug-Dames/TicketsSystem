import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TicketForm from '../components/TicketForm.jsx'
import { AuthContext } from '../context/AuthContext.jsx'
import { createTicket } from '../services/api' // new API function
import '../styles/dashboard.css'

const CreateTicket = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleTicketSubmit = async (ticket) => {
    if (!user?.token) return setError('You must be logged in to submit a ticket.')

    setLoading(true)
    setError(null)

    try {
      const payload = {
        title: ticket.title,
        description: ticket.description,
        category: ticket.category,
        application: ticket.application,
        priority: ticket.priority,
      }

      // call backend
      const res = await createTicket(payload, user.token)

      if (res.success) {
        alert('Ticket created successfully!')
        navigate('/my-tickets') // go to ticket list
      } else {
        setError(res.message || 'Failed to create ticket.')
      }
    } catch (err) {
      console.error(err)
      setError('Failed to create ticket. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className='dashboard-page'>
      <section className='dashboard-card'>
        <div className='dashboard-hero'>
          <div>
            <p className='dashboard-kicker'>Support</p>
            <p className='dashboard-subtitle'>
              Capture issue details so support can resolve them faster.
            </p>
          </div>
        </div>

        <section className='panel create-ticket-panel'>
          {error && <p className="error-message">{error}</p>}
          <TicketForm onSubmit={handleTicketSubmit} disabled={loading} />
        </section>
      </section>
    </main>
  )
}

export default CreateTicket