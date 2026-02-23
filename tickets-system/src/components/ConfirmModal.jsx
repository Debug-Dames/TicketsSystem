import '../styles/modal.css'

const ConfirmModal = ({
  open,
  title = 'Confirm',
  message = '',
  onConfirm,
  onCancel,
  confirmText = 'Yes',
  cancelText = 'Cancel'
}) => {
  if (!open) return null

  return (
    <div className="confirm-overlay" onClick={onCancel}>
      <div
        className="confirm-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="confirm-title">{title}</h3>

        {message && (
          <p className="confirm-message">{message}</p>
        )}

        <div className="confirm-actions">
          <button
            className="btn btn-secondary"
            onClick={onCancel}
          >
            {cancelText}
          </button>

          <button
            className="btn btn-danger"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal