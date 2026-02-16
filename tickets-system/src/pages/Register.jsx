import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.jsx'
import '../styles/login.css'

function Register() {
  const { register } = useContext(AuthContext)
  const navigate = useNavigate()
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
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              name='password'
              type='password'
              placeholder='Create password'
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='role'>Role</label>
            <select id='role' name='role' value={form.role} onChange={handleChange} required>
              <option value='' disabled>
                Select role
              </option>
              <option value='user'>User</option>
              <option value='agent'>Support Agent</option>
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
