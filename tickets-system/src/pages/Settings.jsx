import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext.jsx'
import '../styles/dashboard.css'

function Settings() {
  const { user } = useContext(AuthContext)

  return (
    <main className='dashboard-page'>
      <section className='dashboard-card'>
        <div className='dashboard-hero'>
          <div>
            <p className='dashboard-kicker'>Account</p>
            <h1>Profile & Settings</h1>
            <p className='dashboard-subtitle'>Review your current account details.</p>
          </div>
        </div>

        <div className='dashboard-stats'>
          <article>
            <h3>Name</h3>
            <p>{user?.name || '-'}</p>
          </article>
          <article>
            <h3>Email</h3>
            <p>{user?.email || '-'}</p>
          </article>
          <article>
            <h3>Role</h3>
            <p>{user?.role || '-'}</p>
          </article>
          <article>
            <h3>Status</h3>
            <p>Active</p>
          </article>
        </div>
      </section>
    </main>
  )
}

export default Settings
