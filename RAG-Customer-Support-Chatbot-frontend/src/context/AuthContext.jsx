import { createContext, useContext, useState } from 'react'
import { api, getToken, setToken, clearToken } from '../lib/api.js'

const AuthContext = createContext(null)

function parseJwt(token) {
  try {
    const payload = token.split('.')[1]
    return JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')))
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => getToken())
  const user = token ? parseJwt(token) : null

  const login = async (email, password) => {
    const data = await api.login(email, password)
    setToken(data.access_token)
    setTokenState(data.access_token)
    return data
  }

  const register = async (username, email, password) => {
    await api.register(username, email, password)
    return login(email, password)
  }

  const logout = () => {
    clearToken()
    setTokenState(null)
  }

  return (
    <AuthContext.Provider value={{ token, user, isAuthed: !!token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
