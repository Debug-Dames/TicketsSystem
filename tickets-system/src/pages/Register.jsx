import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.jsx'
import logo from '../assets/DebugDames-logo.png'
import '../styles/login.css'

function Register() {
  const { register } = useContext(AuthContext)
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({
    name: '',
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

    const result = await register(form)
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
          <img src={logo} alt='DebugDames logo' className='auth-logo-large' />
          <p className='auth-kicker'>Get Started</p>
          <h2>Create Your Support Profile</h2>
          <p>
            Choose your role and access the exact tools you need, whether you are submitting tickets or resolving
            them.
          </p>
        </section>
        <form className='login-form' onSubmit={handleSubmit}>
          <h1 className='login-title'>Register</h1>
          <p className='login-subtitle'>Create an account to start managing tickets.</p>

          <div className='form-group'>
            <label htmlFor='name'>Full Name</label>
            <input
              id='name'
              name='name'
              type='text'
              placeholder='Your full name'
              autoComplete='name'
              className='auth-input'
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
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
                placeholder='Create password'
                autoComplete='new-password'
                className='auth-input'
                minLength={8}
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
            <small className='field-hint'>Use at least 8 characters.</small>
          </div>
          <div className='form-group'>
            <label htmlFor='role'>Role</label>
            <select id='role' name='role' className='auth-select' value={form.role} onChange={handleChange} required>
              <option value='' disabled>
                Select role
              </option>
              <option value='user'>User</option>
              <option value='support'>Support Agent</option>
            </select>
          </div>
          {error && <p className='form-error'>{error}</p>}
          <button type='submit' className='login-button'>
            Register
          </button>
          <p className='auth-switch'>
            Already have an account? <Link to='/login'>Back to login</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register
