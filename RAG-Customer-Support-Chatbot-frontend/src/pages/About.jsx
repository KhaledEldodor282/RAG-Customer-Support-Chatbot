import { useEffect, useState } from 'react'

const TEAM = [
  {
    name: 'Khaled Eldodor',
    role: 'Team Leader',
    color: 'from-brand-500 to-purple-500',
    linkedin: 'https://www.linkedin.com/in/khaledmahmoud-eng/',
    bio: 'Passionate AI & Machine Learning Engineer with a strong interest in Computer Vision, Natural Language Processing, and Deep Learning. I enjoy building intelligent systems that solve real-world problems using Python and modern AI frameworks. My experience includes developing and deploying machine learning models, computer vision applications, and AI-powered solutions through academic projects and internships. I am continuously expanding my knowledge of emerging AI technologies and seeking opportunities to contribute to impactful AI products and research.',
  },
  {
    name: 'Khaled Mohammed',
    role: 'Team Member',
    color: 'from-purple-500 to-pink-500',
    linkedin: 'https://www.linkedin.com/in/khaledwadood',
    bio: 'Machine Learning Enthusiast & Undergrad bridging the gap between data theory and practical execution. Proficient in Python and data analytics, with a focus on building and deploying clean, efficient ML models. Fast learner, rigorous problem-solver, and ready to bring immediate value to data-driven engineering teams.',
  },
  {
    name: 'Mohammed Basel',
    role: 'Team Member',
    color: 'from-pink-500 to-rose-500',
    linkedin: 'https://linkedin.com/in/mohamed-bassel-9464822b5',
    bio: 'Backend Developer specializing in Node.js and a Data Scientist passionate about building scalable APIs, analyzing data, and developing machine learning solutions. Experienced with Node.js, Express.js, PostgreSQL, Python, SQL, Power BI, and Docker. I enjoy solving real-world problems through clean backend architecture and data-driven decision-making, and I\'m always eager to learn new technologies and take on challenging projects.',
  },
  {
    name: 'Ziad Mohammed',
    role: 'Team Member',
    color: 'from-emerald-500 to-teal-500',
    linkedin: 'https://www.linkedin.com/in/zeyadmohamed2004',
    bio: 'Data Scientist and AI Engineer focused on building practical, real-world solutions using machine learning and data analysis. Experienced in developing ML pipelines, NLP applications, and data-driven insights across different domains. Strong foundation in Python, data visualization, and cloud tools, with a focus on clean, scalable, and reproducible work.',
  },
  {
    name: 'Rana Alaa',
    role: 'Team Member',
    color: 'from-amber-500 to-orange-500',
    linkedin: 'https://www.linkedin.com/in/rana-alaa-7328b22aa',
    bio: 'Backend Developer and AI enthusiast focused on building scalable, real-world applications. Experienced in developing REST APIs, database-driven systems, and AI-powered solutions using Python and FastAPI. Passionate about writing clean, maintainable code and continuously expanding my skills in backend development, machine learning, and problem solving.',
  },
  {
    name: 'Farah Mostafa',
    role: 'Team Member',
    color: 'from-cyan-500 to-blue-500',
    linkedin: 'https://www.linkedin.com/in/farah-awadalla-660231296',
    bio: 'Artificial Intelligence and Machine Learning enthusiast passionate about building intelligent, data-driven applications that solve real-world challenges. Experienced in software development, machine learning, and data analytics through research and hands-on projects. Dedicated to writing efficient, scalable solutions while continuously expanding my expertise in AI, data science, and software engineering.',
  },
]

const initials = (name) =>
  name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()

export default function About() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20 text-brand-700 dark:text-brand-300 text-xs font-medium mb-4">
          About the project
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          The story behind <span className="gradient-text">Replai</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-slate-600 dark:text-slate-400 leading-relaxed">
          A production-ready customer support automation system built with retrieval-augmented
          generation and vector search — designed to answer real customer queries with accurate,
          context-aware responses.
        </p>
      </div>

      {/* Team */}
      <section className="mb-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">Meet the team</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">The people who built this project.</p>
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400 hidden sm:block">
            {TEAM.length} members
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TEAM.map((m, i) => (
            <div
              key={m.name}
              className="card p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${m.color} flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform`}>
                  {initials(m.name)}
                </div>
                <div>
                  <h3 className="font-semibold text-lg leading-tight">{m.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{m.role}</p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSelected(m)}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg
                             text-sm font-medium text-brand-600 dark:text-brand-400
                             bg-brand-50 dark:bg-brand-500/10 hover:bg-brand-100 dark:hover:bg-brand-500/20
                             transition-colors"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
                  </svg>
                  View info
                </button>
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${m.name} on LinkedIn`}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg
                             text-sm font-medium text-white bg-[#0A66C2] hover:bg-[#004182]
                             transition-colors"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <MemberModal member={selected} onClose={() => setSelected(null)} />
    </div>
  )
}

function MemberModal({ member, onClose }) {
  useEffect(() => {
    if (!member) return
    const handleKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', handleKey)
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = originalOverflow
    }
  }, [member, onClose])

  if (!member) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 dark:bg-black/70 backdrop-blur-sm" />

      {/* Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto
                   bg-white dark:bg-slate-900 rounded-2xl shadow-2xl
                   border border-slate-200 dark:border-slate-800
                   animate-slide-up"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-9 h-9 rounded-lg
                     text-slate-500 dark:text-slate-400
                     hover:bg-slate-100 dark:hover:bg-slate-800
                     flex items-center justify-center transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        {/* Header with avatar */}
        <div className="p-6 sm:p-8 pb-4">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-bold text-xl sm:text-2xl shadow-lg`}>
              {initials(member.name)}
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold leading-tight">{member.name}</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{member.role}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800" />

        {/* Bio */}
        <div className="p-6 sm:p-8">
          <h3 className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 font-semibold">
            About
          </h3>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-line">
            {member.bio}
          </p>
        </div>

        {/* Footer with LinkedIn */}
        <div className="border-t border-slate-200 dark:border-slate-800 p-4 sm:p-6 flex items-center justify-between gap-3 bg-slate-50 dark:bg-slate-950/50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="btn-secondary text-sm !py-2"
          >
            Close
          </button>
          <a
            href={member.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl
                       bg-[#0A66C2] hover:bg-[#004182] text-white font-medium text-sm
                       transition-colors shadow-lg shadow-[#0A66C2]/20"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
            </svg>
            View on LinkedIn
          </a>
        </div>
      </div>
    </div>
  )
}
