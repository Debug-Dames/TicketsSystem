import { useState } from 'react'
import StatusDropdown from './StatusDropdown.jsx'

function TicketsTable({ tickets, isAgent, onStatusChange }) {
  const [draftStatus, setDraftStatus] = useState({})
  const [draftComment, setDraftComment] = useState({})

  if (!tickets.length) {
    return <p className='tickets-empty'>No tickets found.</p>
  }

  const commitUpdate = (ticket) => {
    const status = draftStatus[ticket.id] || ticket.status
    const comment = draftComment[ticket.id] || ''
    onStatusChange(ticket.id, status, comment)

    setDraftComment((current) => ({ ...current, [ticket.id]: '' }))
  }

  const statusClassName = (status) => {
    if (status === 'Resolved') return 'status-pill status-resolved'
    if (status === 'In Progress') return 'status-pill status-progress'
    return 'status-pill status-open'
  }

  const priorityClassName = (priority) => {
    if (priority === 'High') return 'priority-pill priority-high'
    if (priority === 'Medium') return 'priority-pill priority-medium'
    return 'priority-pill priority-low'
  }

  return (
    <div className='tickets-table'>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Created By</th>
            <th>Assigned Agent</th>
            <th>Comments</th>
            {isAgent && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.title}</td>
              <td>{ticket.category}</td>
              <td>
                <span className={priorityClassName(ticket.priority)}>{ticket.priority}</span>
              </td>
              <td>
                {isAgent ? (
                  <StatusDropdown
                    value={draftStatus[ticket.id] || ticket.status}
                    onChange={(status) =>
                      setDraftStatus((current) => ({
                        ...current,
                        [ticket.id]: status,
                      }))
                    }
                  />
                ) : (
                  <span className={statusClassName(ticket.status)}>{ticket.status}</span>
                )}
              </td>
              <td>{ticket.createdBy}</td>
              <td>{ticket.assignedTo || 'Unassigned'}</td>
              <td>
                {ticket.comments?.length ? (
                  <ul className='comments-list'>
                    {ticket.comments.map((comment, index) => (
                      <li key={`${ticket.id}-comment-${index}`}>
                        <strong>{comment.by}:</strong> {comment.text}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className='no-comments'>No comments</span>
                )}
              </td>
              {isAgent && (
                <td>
                  <textarea
                    className='comment-input'
                    placeholder='Add comment'
                    value={draftComment[ticket.id] || ''}
                    onChange={(event) =>
                      setDraftComment((current) => ({
                        ...current,
                        [ticket.id]: event.target.value,
                      }))
                    }
                  />
                  <button type='button' className='update-button' onClick={() => commitUpdate(ticket)}>
                    Update Status
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TicketsTable
