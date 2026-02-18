import React, { useState } from 'react'

const ticketTemplates = [
  {
    title: "Login issue",
    category: "Authentication",
    descriptions: [
      "I cannot log in with my email and password.",
      "I reset my password but login still fails.",
      "I get an invalid credentials error after signup.",
    ],
  },
  {
    title: "Profile update bug",
    category: "Frontend",
    descriptions: [
      "Profile photo does not update after saving.",
      "Changes in profile details are not reflected.",
      "Edit profile page freezes on submit.",
    ],
  },
  {
    title: "Payment confirmation delay",
    category: "Billing",
    descriptions: [
      "Payment completed but confirmation email is delayed.",
      "I was charged but ticket status says unpaid.",
      "Invoice is missing after successful payment.",
    ],
  },
  {
    title: "Other issue",
    category: "General",
    descriptions: [
      "General support request.",
      "I need help with account settings.",
      "I found an issue not listed above.",
    ],
  },
];

const TicketForm = ({ onSubmit }) => {
  const [ticket, setTicket] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'Low',
    attachments: [],
  });

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
      description: '',
    }))
  }

  const handleFileChange = (e) => {
    setTicket({ ...ticket, attachments: Array.from(e.target.files) })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(ticket)
    setTicket({ title: '', description: '', category: '', priority: 'Low', attachments: [] })
  }

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
        {ticketTemplates.map((item) => (
          <option key={item.title} value={item.title}>
            {item.title}
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
        <option value='Authentication'>Authentication</option>
        <option value='Frontend'>Frontend</option>
        <option value='Billing'>Billing</option>
        <option value='General'>General</option>
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
      <input
        id='attachments'
        type='file'
        multiple
        onChange={handleFileChange}
        className='file-control'
      />

      <button type='submit' className='primary-action-btn form-submit-btn'>
        Submit
      </button>
    </form>
  )
}

export default TicketForm


