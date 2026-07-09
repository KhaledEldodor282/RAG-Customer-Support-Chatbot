import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import ThemeToggle from './ThemeToggle.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const links = [
  { to: '/', label: 'Home' },
  { to: '/chat', label: 'Chat' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { isAuthed, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="glass sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center shadow-lg shadow-brand-500/30 group-hover:scale-105 transition-transform">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <span className="font-bold text-lg tracking-tight">
            Repl<span className="gradient-text">ai</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-500/10'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {isAuthed ? (
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-sm text-slate-600 dark:text-slate-300 max-w-[180px] truncate">
                Hello, <span className="font-semibold text-slate-900 dark:text-white">{user?.username || user?.email?.split('@')[0] || 'friend'}</span>
              </span>
              <button onClick={handleLogout} className="btn-secondary text-sm !py-2 !px-3">
                Sign out
              </button>
            </div>
          ) : (
            <Link to="/login" className="hidden sm:inline-flex btn-primary text-sm !py-2 !px-3">
              Sign in
            </Link>
          )}
          <ThemeToggle />
          <button
            className="md:hidden w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M18 6L6 18M6 6l12 12"/> : <path d="M3 12h18M3 6h18M3 18h18"/>}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-slate-200 dark:border-slate-800 px-4 py-3 flex flex-col gap-1 bg-white dark:bg-slate-900">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-500/10'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <div className="border-t border-slate-200 dark:border-slate-800 mt-2 pt-2">
            {isAuthed ? (
              <button onClick={() => { setOpen(false); handleLogout() }} className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                Sign out
              </button>
            ) : (
              <Link to="/login" onClick={() => setOpen(false)} className="block px-4 py-2.5 rounded-lg text-sm font-medium text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-500/10">
                Sign in
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  )
}
