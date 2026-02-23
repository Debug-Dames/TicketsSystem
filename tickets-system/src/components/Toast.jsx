import { useToast } from '../context/ToastContext'
import '../styles/toast.css'

const Toast = () => {
  const { toasts, remove } = useToast()

  return (
    <div className="toast-root" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast--${t.type}`} role="status">
          <div className="toast__message">{t.message}</div>
          <button className="toast__close" onClick={() => remove(t.id)} aria-label="Dismiss">×</button>
        </div>
      ))}
    </div>
  )
}

export default Toast
