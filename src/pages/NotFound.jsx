import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="animate-fade-in-up mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
          <circle cx="12" cy="12" r="10" />
          <line x1="9.5" y1="9.5" x2="14.5" y2="14.5" />
          <line x1="14.5" y1="9.5" x2="9.5" y2="14.5" />
        </svg>
      </span>
      <h2 className="mt-4 text-xl font-semibold text-slate-900">Page not found</h2>
      <p className="mt-2 text-sm text-slate-500">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="mt-5 inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-blue-600/30 transition-all duration-150 hover:scale-[1.02] hover:bg-blue-700 hover:shadow-md active:scale-[0.98]"
      >
        Back to home
      </Link>
    </section>
  )
}

export default NotFound
