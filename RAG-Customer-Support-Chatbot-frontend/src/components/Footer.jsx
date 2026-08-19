export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 mt-16 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-slate-500 dark:text-slate-400">
        <p>© {new Date().getFullYear()} Replai — DEPI · AI &amp; ML Track</p>
        <p>Fast · Grounded · Reliable</p>
      </div>
    </footer>
  )
}
