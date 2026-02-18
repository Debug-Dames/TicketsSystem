const TICKETS_KEY = 'mockTickets'
const TICKETS_UPDATED_EVENT = 'tickets-updated'
const TICKETS_BROADCAST_CHANNEL = 'tickets-sync'

function normalizeTicket(ticket, index) {
  return {
    id: ticket?.id || `ticket-${index}-${Date.now()}`,
    title: ticket?.title || 'Untitled Ticket',
    description: ticket?.description || '',
    category: ticket?.category || 'General',
    priority: ticket?.priority || 'Low',
    status: ticket?.status || 'Open',
    createdBy: ticket?.createdBy || '',
    assignedTo: ticket?.assignedTo || '',
    comments: Array.isArray(ticket?.comments) ? ticket.comments : [],
    createdAt: ticket?.createdAt || new Date().toISOString().slice(0, 10),
  }
}

export function getTickets() {
  const raw = localStorage.getItem(TICKETS_KEY)
  if (!raw) return []

  try {
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.map((ticket, index) => normalizeTicket(ticket, index))
  } catch {
    return []
  }
}

export function saveTickets(tickets) {
  const normalized = (Array.isArray(tickets) ? tickets : []).map((ticket, index) => normalizeTicket(ticket, index))
  localStorage.setItem(TICKETS_KEY, JSON.stringify(normalized))

  if (typeof BroadcastChannel !== 'undefined') {
    const channel = new BroadcastChannel(TICKETS_BROADCAST_CHANNEL)
    channel.postMessage({ type: TICKETS_UPDATED_EVENT, at: Date.now() })
    channel.close()
  }

  window.dispatchEvent(new CustomEvent(TICKETS_UPDATED_EVENT))
}

export function subscribeTickets(callback) {
  const handleUpdated = () => callback(getTickets())
  const handleStorage = (event) => {
    if (event.key === TICKETS_KEY) {
      callback(getTickets())
    }
  }

  window.addEventListener(TICKETS_UPDATED_EVENT, handleUpdated)
  window.addEventListener('storage', handleStorage)

  const pollInterval = window.setInterval(handleUpdated, 2000)

  let channel = null
  if (typeof BroadcastChannel !== 'undefined') {
    channel = new BroadcastChannel(TICKETS_BROADCAST_CHANNEL)
    channel.onmessage = () => handleUpdated()
  }

  return () => {
    window.removeEventListener(TICKETS_UPDATED_EVENT, handleUpdated)
    window.removeEventListener('storage', handleStorage)
    window.clearInterval(pollInterval)
    if (channel) {
      channel.close()
    }
  }
}
