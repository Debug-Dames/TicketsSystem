import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.jsx'
import '../styles/login.css'

function ForgotPassword() {
  const { resetPassword } = useContext(AuthContext)
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    const result = await resetPassword({ email: form.email, password: form.password })
    if (!result.ok) {
      setError(result.error)
      return
    }

    navigate('/login')
  }

  return (
    <div className='login-container'>
      <div className='auth-shell'>
        <section className='auth-aside'>
          <p className='auth-kicker'>Account Recovery</p>
          <h2>Reset Your Password</h2>
          <p>Enter your account email and choose a new password to sign back in.</p>
        </section>
        <form className='login-form' onSubmit={handleSubmit}>
          <h1 className='login-title'>Forgot Password</h1>
          <p className='login-subtitle'>Update your credentials and return to login.</p>

          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              name='email'
              type='email'
              placeholder='you@example.com'
              autoComplete='email'
              className='auth-input'
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>New Password</label>
            <input
              id='password'
              name='password'
              type='password'
              placeholder='Enter new password'
              autoComplete='new-password'
              className='auth-input'
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input
              id='confirmPassword'
              name='confirmPassword'
              type='password'
              placeholder='Confirm new password'
              autoComplete='new-password'
              className='auth-input'
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className='form-error'>{error}</p>}
          <button type='submit' className='login-button'>
            Reset Password
          </button>
          <p className='auth-switch'>
            Remembered your password? <Link to='/login'>Back to login</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
