import { Link } from 'react-router-dom'

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
    ),
    title: 'FAISS Vector Search',
    desc: 'TF-IDF + Truncated SVD embeddings indexed with FAISS for fast top-k retrieval from thousands of real support conversations.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/>
      </svg>
    ),
    title: 'TinyLlama Generation',
    desc: 'A 1.1B-parameter chat model generates responses grounded in the retrieved context, following the tone of real support agents.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    title: 'JWT Authentication',
    desc: 'Secure sign-up and sign-in with JWT tokens and bcrypt-hashed passwords. Each user has their own protected chat sessions.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M2 12h20"/><path d="M5 5l14 14M19 5L5 19"/>
      </svg>
    ),
    title: 'Persistent History',
    desc: 'Conversations and messages are stored in MySQL, letting you revisit past chats and continue where you left off.',
  },
]

const stats = [
  { value: '60%', label: 'Faster replies' },
  { value: '24/7', label: 'Availability' },
  { value: '1.1B', label: 'Model params' },
]

export default function Home() {
  return (
    <div className="animate-fade-in">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-brand-400/30 rounded-full blur-3xl" />
          <div className="absolute top-40 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16 sm:pt-28 sm:pb-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20 text-brand-700 dark:text-brand-300 text-xs font-medium mb-6 animate-slide-up">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
            RAG-Powered Customer Support
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight animate-slide-up">
            Answer every customer,{' '}
            <span className="gradient-text">instantly</span>.
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300 animate-slide-up">
            An intelligent chatbot that retrieves knowledge from your docs and generates
            accurate, context-aware answers — powered by retrieval-augmented generation.
          </p>

          <div className="mt-10 flex items-center justify-center gap-3 flex-wrap animate-slide-up">
            <Link to="/chat" className="btn-primary">
              Start Chatting
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link to="/about" className="btn-secondary">Meet the Team</Link>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {stats.map((s) => (
              <div key={s.label} className="card p-5">
                <div className="text-2xl sm:text-3xl font-bold gradient-text">{s.value}</div>
                <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Built for <span className="gradient-text">real support</span>
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            A production-ready pipeline that combines vector search, LLMs, and MLOps.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => (
            <div key={f.title} className="card p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-500 to-purple-600 p-10 sm:p-14 text-center text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,white,transparent_40%)] opacity-20" />
          <h2 className="relative text-3xl sm:text-4xl font-bold">Ready to see it in action?</h2>
          <p className="relative mt-3 text-white/80 max-w-lg mx-auto">
            Try the live chat — ask a support question and watch RAG in action.
          </p>
          <Link
            to="/chat"
            className="relative inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl bg-white text-brand-600 font-semibold hover:scale-105 active:scale-95 transition-transform shadow-xl"
          >
            Launch Chatbot
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
