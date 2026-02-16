import { createContext, useMemo, useState } from 'react'

const USERS_KEY = 'ts_users'
const CURRENT_USER_KEY = 'ts_current_user'

export const AuthContext = createContext(null)

function readJson(key, fallback) {
  const raw = localStorage.getItem(key)
  if (!raw) return fallback

  try {
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

async function hashPassword(password) {
  const bytes = new TextEncoder().encode(password)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readJson(CURRENT_USER_KEY, null))

  const register = async ({ name, email, password, role }) => {
    const users = readJson(USERS_KEY, [])
    const normalizedEmail = email.trim().toLowerCase()

    if (!role) {
      return { ok: false, error: 'Please select a role.' }
    }

    const exists = users.some((item) => item.email === normalizedEmail)

    if (exists) {
      return { ok: false, error: 'Email already registered.' }
    }

    const passwordHash = await hashPassword(password)
    const newUser = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
      role,
    }

    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]))
    return { ok: true }
  }

  const login = async ({ email, password, role }) => {
    const users = readJson(USERS_KEY, [])
    const normalizedEmail = email.trim().toLowerCase()
    const passwordHash = await hashPassword(password)

    if (!role) {
      return { ok: false, error: 'Please select a role.' }
    }

    const matchedUser = users.find(
      (item) => item.email === normalizedEmail && item.passwordHash === passwordHash && item.role === role,
    )

    if (!matchedUser) {
      return { ok: false, error: 'Invalid credentials or role.' }
    }

    const sessionUser = {
      id: matchedUser.id,
      name: matchedUser.name,
      email: matchedUser.email,
      role: matchedUser.role,
      sessionToken: crypto.randomUUID(),
    }

    setUser(sessionUser)
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser))
    return { ok: true, user: sessionUser }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(CURRENT_USER_KEY)
  }

  const value = useMemo(
    () => ({
      user,
      register,
      login,
      logout,
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
