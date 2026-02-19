import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.jsx'
import logo from '../assets/react.svg'
import '../styles/login.css'

function Login() {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({
    email: '',
    password: '',
    role: '',
  })
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    const result = await login(form)
    if (!result.ok) {
      setError(result.error)
      return
    }

    navigate(result.user.role === 'user' ? '/user-dashboard' : '/agent-dashboard')
  }

  return (
    <div className='login-container'>
      <div className='auth-shell'>
        <section className='auth-aside'>
          <img src={logo} alt='DebugDames logo' className='auth-logo-large' />
          <p className='auth-kicker'>Tickets System</p>
          <h2>Support Flow Reimagined</h2>
          <p>
            Track issues, route requests, and resolve faster with a focused workspace built for both users and support
            agents.
          </p>
        </section>
        <form className='login-form' onSubmit={handleSubmit}>
          <h1 className='login-title'>Log In</h1>
          <p className='login-subtitle'>Welcome back to your ticket dashboard.</p>

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
            <label htmlFor='password'>Password</label>
            <div className='input-with-action'>
              <input
                id='password'
                name='password'
                type={showPassword ? 'text' : 'password'}
                placeholder='Enter password'
                autoComplete='current-password'
                className='auth-input'
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type='button'
                className='input-action-button'
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword((current) => !current)}
              >
                <span className={`password-toggle-icon${showPassword ? ' is-visible' : ''}`} aria-hidden='true' />
              </button>
            </div>
          </div>
          <p className='forgot-password-link'>
            <Link to='/forgot-password'>Forgot password?</Link>
          </p>
          <div className='form-group'>
            <label htmlFor='role'>Role</label>
            <select id='role' name='role' className='auth-select' value={form.role} onChange={handleChange} required>
              <option value='' disabled>
                Select role
              </option>
              <option value='user'>User</option>
              <option value='agent'>Support Agent</option>
            </select>
          </div>
          {error && <p className='form-error'>{error}</p>}
          <button type='submit' className='login-button'>
            Log In
          </button>
          <p className='auth-switch'>
            No account? <Link to='/register'>Register here</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
