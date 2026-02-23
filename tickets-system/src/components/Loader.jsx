import '../styles/loader.css'

const Loader = ({ message = '', small = false }) => {
  return (
    <div className={`loader ${small ? 'loader--small' : ''}`} role="status" aria-live="polite">
      <div className="loader__spinner" />
      {message && <div className="loader__message">{message}</div>}
    </div>
  )
}

export default Loader
