import { useMemo, useState } from 'react'
import StatusDropdown from './StatusDropdown.jsx'

const SORT_FIELDS = [
  { value: 'createdAt', label: 'Created date' },
  { value: 'title', label: 'Title' },
  { value: 'priority', label: 'Priority' },
  { value: 'status', label: 'Status' },
]


  // { value: 'category', label: 'Category' },
  // { value: 'application', label: 'Application' },

function TicketsTable({ tickets, isAgent, onStatusChange }) {
  const [draftStatus, setDraftStatus] = useState({})
  const [draftComment, setDraftComment] = useState({})
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  // const [categoryFilter, setCategoryFilter] = useState('all')
  // const [applicationFilter, setApplicationFilter] = useState('all')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortDirection, setSortDirection] = useState('desc')
  const [showControls, setShowControls] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [modalData, setModalData] = useState(null)
// { ticket: {}, type: "comments" | "uploads" }
  const [commentModal, setCommentModal] = useState(null)
// { ticket: {} }

  const categoryOptions = useMemo(
    () => [...new Set((tickets || []).map((ticket) => ticket.category).filter(Boolean))],
    [tickets],
  )
  const applicationOptions = useMemo(
    () => [...new Set((tickets || []).map((ticket) => ticket.application).filter(Boolean))],
    [tickets],
  )

  const visibleTickets = useMemo(() => {
    const searchTerm = query.trim().toLowerCase()

    return (tickets || [])
      .filter((ticket) => {
        if (statusFilter !== 'all' && ticket.status !== statusFilter) return false
        if (priorityFilter !== 'all' && ticket.priority !== priorityFilter) return false
        // if (categoryFilter !== 'all' && ticket.category !== categoryFilter) return false
        // if (applicationFilter !== 'all' && ticket.application !== applicationFilter) return false

        if (!searchTerm) return true

        return [
          ticket.requesterId,
          ticket.title,
          ticket.description,
          // ticket.category,
          // ticket.application,
          ticket.priority,
          ticket.status,
          ticket.createdBy,
        ]
          .join(' ')
          .toLowerCase()
          .includes(searchTerm)
      })
      .sort((a, b) => {
        const aValue = String(a?.[sortBy] || '').toLowerCase()
        const bValue = String(b?.[sortBy] || '').toLowerCase()
        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
        return 0
      })
  }, [ priorityFilter, query, sortBy, sortDirection, statusFilter, tickets])

  if (!tickets.length) {
    return <p className='tickets-empty'>No tickets found.</p>
  }

  const commitUpdate = (ticket) => {
    if (!onStatusChange) return
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
    <>
      <button type='button' className='table-filter-toggle' onClick={() => setShowControls((current) => !current)}>
        Filter & Sort
      </button>
      {showControls && (
        <div className='table-toolbar'>
          <input
            type='search'
            className='table-search'
            placeholder='Search tickets'
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            <option value='all'>All statuses</option>
            <option value='Open'>Open</option>
            <option value='In Progress'>In Progress</option>
            <option value='Resolved'>Resolved</option>
          </select>
          <select value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value)}>
            <option value='all'>All priorities</option>
            <option value='Low'>Low</option>
            <option value='Medium'>Medium</option>
            <option value='High'>High</option>
          </select>
          {/* <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
            <option value='all'>All categories</option>
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select value={applicationFilter} onChange={(event) => setApplicationFilter(event.target.value)}>
            <option value='all'>All applications</option>
            {applicationOptions.map((application) => (
              <option key={application} value={application}>
                {application}
              </option>
            ))}
          </select> */}
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            {SORT_FIELDS.map((field) => (
              <option key={field.value} value={field.value}>
                Sort by {field.label}
              </option>
            ))}
          </select>
          <select value={sortDirection} onChange={(event) => setSortDirection(event.target.value)}>
            <option value='asc'>Ascending</option>
            <option value='desc'>Descending</option>
          </select>
        </div>
      )}

      {modalData && (
        <div
          className="modal-overlay active"
          onClick={() => setModalData(null)}
        >
          <div
            className="modal-card active"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close-x"
              onClick={() => setModalData(null)}
            >
              ×
            </button>

            <h3 className="modal-title">
              {modalData.type === "comments"
                ? `Comments - ${modalData.ticket.title}`
                : `Uploads - ${modalData.ticket.title}`}
            </h3>

            {modalData.type === "comments" && (
              <div className="modal-comments-container">
                {modalData.ticket.comments?.length ? (
                  modalData.ticket.comments.map((comment) => (
                    <div key={comment.id} className="modal-comment-item">
                      <p className="modal-comment-text">
                        {comment.comment}
                      </p>
                      <div className="modal-comment-meta">
                        User ID: {comment.user_id}
                      </div>
                      <div className="modal-comment-time">
                        {new Date(comment.created_at).toLocaleString()}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-comments">No comments available</p>
                )}
              </div>
            )}

            {modalData.type === "uploads" && (
              <div className="modal-attachments-section">
                {modalData.ticket.attachments?.length ? (
                  <ul className="attachments-list">
                    {modalData.ticket.attachments.map((file) => (
                      <li key={file.id}>
                        <a
                          href={`http://localhost:5000/${file.file_path}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="attachment-link"
                        >
                          📎 View File
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                      <p className="no-comments">No uploads available</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {commentModal && (
        <div
          className="modal-overlay active"
          onClick={() => setCommentModal(null)}
        >
          <div
            className="modal-card active"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close-x"
              onClick={() => setCommentModal(null)}
            >
              ×
            </button>

            <h3 className="modal-title">
              Add Comment - {commentModal.title}
            </h3>

            <textarea
              className="modal-textarea"
              placeholder="Write your comment..."
              value={draftComment[commentModal.id] || ""}
              onChange={(e) =>
                setDraftComment((prev) => ({
                  ...prev,
                  [commentModal.id]: e.target.value,
                }))
              }
            />

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setCommentModal(null)}
              >
                Cancel
              </button>

              <button
                className="submit-btn"
                onClick={() => {
                  commitUpdate(commentModal)
                  setCommentModal(null)
                }}
              >
                Submit Comment
              </button>
            </div>
          </div>
        </div>
      )}

      {!visibleTickets.length ? (
        <p className='tickets-empty'>No tickets match your current filters.</p>
      ) : (
        <div className='tickets-table'>
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Title</th>
                {/* <th>Category</th>
                <th>Application</th> */}
                <th>Priority</th>
                <th>Status</th>
                <th>Created By</th>
                <th>Assigned Agent</th>
                <th>Comments</th>
                <th>Uploads</th>
                {isAgent && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {visibleTickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td>{ticket.requesterId || '-'}</td>
                  <td>{ticket.title}</td>
                  {/* <td>{ticket.category}</td>
                  <td>{ticket.application || '-'}</td> */}
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
                  <td className='cell-wrap'>{ticket.createdBy}</td>
                  <td className='cell-wrap'>{ticket.assignedTo || 'Unassigned'}</td>
                  {/* <td className='cell-wrap'>
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
                  </td> */}
                  <td>
                    {ticket.comments?.length ? (
                      <button
                        className="view-comments-btn"
                        onClick={() => setModalData({ ticket, type: "comments" })}
                      >
                        View Comments ({ticket.comments.length})
                      </button>
                    ) : (
                      <span className="no-comments">No comments</span>
                    )}
                  </td>
                  <td>
                    {ticket.attachments?.length ? (
                      <button
                        className="view-details-btn"
                        onClick={() =>
                          setModalData({ ticket, type: "uploads" })
                        }
                      >
                        View Uploads ({ticket.attachments.length})
                      </button>
                    ) : (
                      <span className="no-comments">No uploads</span>
                    )}
                  </td>
                  {isAgent && (
                    <td>
                      <button
                        className="add-comment-btn"
                        onClick={() => setCommentModal(ticket)}
                      >
                        Add Comment
                      </button>
                    </td>
                  )}
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

export default TicketsTable
