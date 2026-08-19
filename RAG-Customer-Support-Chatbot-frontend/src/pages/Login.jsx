import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { ApiError } from '../lib/api.js'

export default function Login() {
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const { login, register } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from || '/chat'

  const isRegister = mode === 'register'

  const submit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      if (isRegister) {
        await register(form.username, form.email, form.password)
      } else {
        await login(form.email, form.password)
      }
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-12 animate-fade-in">
      <div className="card p-8">
        <div className="text-center mb-6">
          <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-purple-500 items-center justify-center shadow-lg shadow-brand-500/30 mb-4">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            {isRegister ? 'Create an account' : 'Welcome back'}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isRegister ? 'Sign up to start chatting with Replai' : 'Sign in to continue to Replai'}
          </p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          {isRegister && (
            <Field label="Username" type="text" value={form.username} onChange={update('username')} required autoFocus />
          )}
          <Field label="Email" type="email" value={form.email} onChange={update('email')} required autoFocus={!isRegister} />
          <Field label="Password" type="password" value={form.password} onChange={update('password')} required minLength={6} />

          {error && (
            <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? 'Please wait...' : isRegister ? 'Create account' : 'Sign in'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={() => { setMode(isRegister ? 'login' : 'register'); setError(null) }}
            className="text-brand-600 dark:text-brand-400 font-medium hover:underline"
          >
            {isRegister ? 'Sign in' : 'Sign up'}
          </button>
        </div>

        <div className="mt-4 text-center">
          <Link to="/" className="text-xs text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}

function Field({ label, ...props }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</span>
      <input
        {...props}
        className="mt-1 block w-full rounded-xl border border-slate-200 dark:border-slate-800
                   bg-slate-50 dark:bg-slate-950 px-4 py-2.5 text-sm
                   focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500
                   transition-colors"
      />
    </label>
  )
}
