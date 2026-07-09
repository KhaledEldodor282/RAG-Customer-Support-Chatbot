import { useState, useRef, useEffect } from 'react'
import { api, ApiError } from '../lib/api.js'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'

const SUGGESTIONS = [
  'How do I reset my password?',
  'Where can I track my order?',
  'How do I contact support?',
  'What are your refund policies?',
]

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: "Hi! I'm your support assistant powered by RAG. Ask me anything about our services.",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [conversationId, setConversationId] = useState(null)
  const scrollRef = useRef(null)

  const { logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

  const send = async (text) => {
    const q = text ?? input.trim()
    if (!q || loading) return
    setInput('')
    setError(null)
    setMessages((m) => [...m, { role: 'user', text: q }])
    setLoading(true)

    try {
      const data = await api.sendMessage(q, conversationId)
      if (data.conversation_id && !conversationId) setConversationId(data.conversation_id)
      setMessages((m) => [...m, { role: 'bot', text: data.message }])
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : 'Something went wrong'
      if (err instanceof ApiError && err.status === 401) {
        logout()
        navigate('/login', { state: { from: '/chat' } })
        return
      }
      setError(msg)
      setMessages((m) => [...m, { role: 'bot', text: `⚠️ ${msg}`, isError: true }])
    } finally {
      setLoading(false)
    }
  }

  const onKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <div className="text-center mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          <span className="gradient-text">Chat</span> with our AI
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Ask anything — I retrieve relevant docs and answer.</p>
      </div>

      <div className="card overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 320px)', minHeight: 480 }}>
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((m, i) => (
            <Message key={i} role={m.role} text={m.text} isError={m.isError} />
          ))}
          {loading && <TypingIndicator />}
        </div>

        {messages.length === 1 && (
          <div className="px-4 sm:px-6 pb-3 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="text-xs px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700
                           text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <div className="border-t border-slate-200 dark:border-slate-800 p-3 sm:p-4">
          <div className="flex gap-2 items-end">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              rows={1}
              placeholder="Type your question..."
              disabled={loading}
              className="flex-1 resize-none rounded-xl border border-slate-200 dark:border-slate-800
                         bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm
                         focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500
                         transition-colors max-h-32 disabled:opacity-60"
            />
            <button
              onClick={() => send()}
              disabled={!input.trim() || loading}
              className="btn-primary h-11 px-4 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Send"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2 11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/>
              </svg>
            </button>
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 text-center">
            Enter to send • Shift+Enter for newline{conversationId ? ` • Conversation #${conversationId}` : ''}
          </p>
        </div>
      </div>
    </div>
  )
}

function Message({ role, text, isError }) {
  const isBot = role === 'bot'
  return (
    <div className={`flex gap-3 animate-slide-up ${isBot ? '' : 'flex-row-reverse'}`}>
      <div
        className={`w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center text-sm font-semibold ${
          isBot
            ? isError
              ? 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400'
              : 'bg-gradient-to-br from-brand-500 to-purple-500 text-white'
            : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
        }`}
      >
        {isBot ? (isError ? '⚠️' : '🤖') : '🧑'}
      </div>
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
          isBot
            ? isError
              ? 'bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-300 rounded-tl-sm'
              : 'bg-slate-100 dark:bg-slate-800 rounded-tl-sm'
            : 'bg-brand-500 text-white rounded-tr-sm'
        }`}
      >
        {text}
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex gap-3 animate-fade-in">
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center text-white">
        🤖
      </div>
      <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
        <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  )
}
