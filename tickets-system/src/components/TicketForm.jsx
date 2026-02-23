import { useState } from 'react'
import { TICKET_APPLICATIONS, TICKET_CATEGORIES, TICKET_TITLES } from '../data/ticketOptions'
import Loader from './Loader'

const ticketTemplates = [
  {
    title: 'Cannot sign in',
    category: 'Account Access',
    application: 'Microsoft 365',
    descriptions: [
      'I cannot log in with my email and password.',
      'I reset my password but login still fails.',
      'I get an invalid credentials error after sign-in.',
    ],
  },
  {
    title: 'Email not syncing',
    category: 'Email & Collaboration',
    application: 'Microsoft 365',
    descriptions: [
      'My mailbox is not updating on desktop.',
      'New messages appear late.',
      'Calendar invites are not syncing.',
    ],
  },
  {
    title: 'VPN access issue',
    category: 'Network & Connectivity',
    application: 'VPN Client',
    descriptions: [
      'I cannot connect to the company VPN.',
      'VPN keeps disconnecting.',
      'VPN asks for credentials repeatedly.',
    ],
  },
  {
    title: 'Application crash',
    category: 'Software & Applications',
    application: 'Other',
    descriptions: [
      'The app crashes when opened.',
      'I see an unexpected error message.',
      'The app freezes during normal use.',
    ],
  },
]

const TicketForm = ({ onSubmit, disabled = false }) => {
  const [ticket, setTicket] = useState({
    title: '',
    description: '',
    category: '',
    application: '',
    priority: 'Low',
    attachments: [],
  })

  const selectedTemplate = ticketTemplates.find((item) => item.title === ticket.title)

  const handleChange = (e) => {
    const { name, value } = e.target
    setTicket((prev) => ({ ...prev, [name]: value }))
  }

  const handleTitleChange = (e) => {
    const title = e.target.value
    const template = ticketTemplates.find((item) => item.title === title)
    setTicket((prev) => ({
      ...prev,
      title,
      category: template ? template.category : '',
      application: template ? template.application : '',
      description: '',
    }))
  }

  const handleFileChange = (e) => {
    setTicket({ ...ticket, attachments: Array.from(e.target.files) })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(ticket)
    setTicket({ title: '', description: '', category: '', application: '', priority: 'Low', attachments: [] })
  }

  const attachmentCount = ticket.attachments.length
  const attachmentSummary = attachmentCount
    ? `${attachmentCount} file${attachmentCount > 1 ? 's' : ''} selected`
    : 'No files selected yet'

  return (
    <form onSubmit={handleSubmit} className='create-ticket-form'>
      <label className='form-label' htmlFor='title'>
        Ticket Title
      </label>
      <select
        id='title'
        name='title'
        value={ticket.title}
        onChange={handleTitleChange}
        className='form-control'
        required
      >
        <option value=''>Select a ticket title</option>
        {TICKET_TITLES.map((title) => (
          <option key={title} value={title}>
            {title}
          </option>
        ))}
      </select>

      <label className='form-label' htmlFor='description'>
        Description
      </label>
      <textarea
        id='description'
        name='description'
        value={ticket.description}
        onChange={handleChange}
        rows={4}
        className='form-control form-textarea'
        placeholder={
          selectedTemplate
            ? `Describe the issue about "${selectedTemplate.title}".`
            : 'Describe your issue in detail.'
        }
        required
      />

      <label className='form-label' htmlFor='category'>
        Category
      </label>
      <select
        id='category'
        name='category'
        value={ticket.category}
        onChange={handleChange}
        className='form-control'
        required
      >
        <option value=''>Select category</option>
        {TICKET_CATEGORIES.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <label className='form-label' htmlFor='application'>
        Application
      </label>
      <select
        id='application'
        name='application'
        value={ticket.application}
        onChange={handleChange}
        className='form-control'
        required
      >
        <option value=''>Select application</option>
        {TICKET_APPLICATIONS.map((application) => (
          <option key={application} value={application}>
            {application}
          </option>
        ))}
      </select>

      <label className='form-label' htmlFor='priority'>
        Priority
      </label>
      <select
        id='priority'
        name='priority'
        value={ticket.priority}
        onChange={handleChange}
        className='form-control'
      >
        <option value='Low'>Low</option>
        <option value='Medium'>Medium</option>
        <option value='High'>High</option>
      </select>

      <label className='form-label' htmlFor='attachments'>
        Attachments
      </label>
      <div className='upload-control'>
        <input
          id='attachments'
          type='file'
          multiple
          onChange={handleFileChange}
          className='file-input-hidden'
        />
        <label htmlFor='attachments' className='upload-btn'>
          Upload Files
        </label>
        <p className='upload-file-hint'>{attachmentSummary}</p>
      </div>

      <button type='submit' className='primary-action-btn form-submit-btn' disabled={disabled}>
        {disabled ? (
          <span style={{display:'inline-flex',alignItems:'center',gap:8}}>
            <Loader small />
            Submitting...
          </span>
        ) : (
          'Submit'
        )}
      </button>
    </form>
  )
}

export default TicketForm


