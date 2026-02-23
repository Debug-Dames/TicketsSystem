import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const remove = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id))
  }, [])

  const show = useCallback((type, message, timeout = 4000) => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t, { id, type, message }])
    if (timeout > 0) setTimeout(() => remove(id), timeout)
    return id
  }, [remove])

  const showSuccess = useCallback((msg, timeout) => show('success', msg, timeout), [show])
  const showError = useCallback((msg, timeout) => show('error', msg, timeout), [show])

  const value = useMemo(() => ({ toasts, showSuccess, showError, remove }), [toasts, showSuccess, showError, remove])

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

export default ToastContext
