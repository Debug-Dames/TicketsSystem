import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext.jsx'
import '../styles/dashboard.css'

function Settings() {
  const { user, updateEmail } = useContext(AuthContext)
  const [emailDraft, setEmailDraft] = useState(user?.email || '')
  const [feedback, setFeedback] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    setFeedback('')
    const result = updateEmail({ email: emailDraft })
    setFeedback(result.ok ? 'Email updated successfully.' : result.error)
  }

  return (
    <main className='dashboard-page'>
      <section className='dashboard-card'>
        <div className='dashboard-hero'>
          <div>
            <p className='dashboard-kicker'>Account</p>
            <p className='dashboard-subtitle'>Review your current account details.</p>
          </div>
        </div>

        <div className='dashboard-stats settings-grid'>
          <article>
            <h3>Name</h3>
            <p className='profile-value'>{user?.name || '-'}</p>
          </article>
          <article>
            <h3>Email</h3>
            <p className='profile-value profile-email'>{user?.email || '-'}</p>
          </article>
          <article>
            <h3>Role</h3>
            <p className='profile-value'>{user?.role || '-'}</p>
          </article>
          <article>
            <h3>Status</h3>
            <p className='profile-value'>Active</p>
          </article>
        </div>

        <form className='settings-form' onSubmit={handleSubmit}>
          <label htmlFor='email'>Update Email</label>
          <input
            id='email'
            type='email'
            className='form-control'
            value={emailDraft}
            onChange={(event) => setEmailDraft(event.target.value)}
            required
          />
          <button type='submit' className='primary-action-btn'>
            Save Email
          </button>
          {feedback && <p className='settings-feedback'>{feedback}</p>}
        </form>
      </section>
    </main>
  )
}

export default Settings
