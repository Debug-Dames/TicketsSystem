import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { TICKET_CATEGORIES, TICKET_TITLES } from '../data/ticketOptions'
import '../styles/dashboard.css'
import '../styles/tickets.css'

const TICKETS_KEY = 'mockTickets'
const USERS_KEY = 'ts_users'

const CreateTicket = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [agents] = useState(() => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY)) || []
    return users.filter((item) => item.role === 'agent')
  })
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'Low',
    assignedTo: '',
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    const tickets = JSON.parse(localStorage.getItem(TICKETS_KEY)) || []
    const nextTickets = [
      ...tickets,
      {
        id: crypto.randomUUID(),
        title: form.title,
        description: form.description,
        category: form.category,
        priority: form.priority,
        status: 'Open',
        createdBy: user.email,
        assignedTo: form.assignedTo || null,
        comments: [],
      },
    ]

    localStorage.setItem(TICKETS_KEY, JSON.stringify(nextTickets))
    navigate('/user-dashboard')
  }

  const setField = (name, value) => {
    setForm((current) => ({ ...current, [name]: value }))
  }

  return (
    <main className='dashboard-page'>
      <section className='dashboard-card ticket-form-card'>
        <div className='ticket-page-header'>
          <h1>Create Ticket</h1>
          <p>Submit a new support request.</p>
        </div>
        <form className='ticket-form' onSubmit={handleSubmit}>
          <label htmlFor='title'>Title</label>
          <select
            id='title'
            value={form.title}
            onChange={(event) => setField('title', event.target.value)}
            required
          >
            <option value='' disabled>
              Select title
            </option>
            {TICKET_TITLES.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>

          <label htmlFor='category'>Category</label>
          <select
            id='category'
            value={form.category}
            onChange={(event) => setField('category', event.target.value)}
            required
          >
            <option value='' disabled>
              Select category
            </option>
            {TICKET_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            placeholder='Add details about the issue'
            required
            value={form.description}
            onChange={(event) => setField('description', event.target.value)}
          />

          <label htmlFor='priority'>Priority</label>
          <select
            id='priority'
            value={form.priority}
            onChange={(event) => setField('priority', event.target.value)}
          >
            <option value='Low'>Low</option>
            <option value='Medium'>Medium</option>
            <option value='High'>High</option>
          </select>

          <label htmlFor='assignedTo'>Assign to Support Agent (Optional)</label>
          <select
            id='assignedTo'
            value={form.assignedTo}
            onChange={(event) => setField('assignedTo', event.target.value)}
          >
            <option value=''>Unassigned</option>
            {agents.map((agent) => (
              <option key={agent.id} value={agent.email}>
                {agent.name} ({agent.email})
              </option>
            ))}
          </select>

          <div className='ticket-form-actions'>
            <button type='submit'>Create Ticket</button>
            <Link to='/user-dashboard' className='secondary-link'>
              Back to Dashboard
            </Link>
          </div>
        </form>
      </section>
    </main>
  )
}

export default CreateTicket

