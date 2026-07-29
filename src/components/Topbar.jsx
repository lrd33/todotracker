import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarIcon, SettingsIcon } from './icons.jsx'

function Topbar({ onMenuClick, menuButtonRef }) {
  const [openMenu, setOpenMenu] = useState(null) // null | 'notifications' | 'account'
  const containerRef = useRef(null)

  // Close on outside click or Escape — standard expected behavior for
  // any dropdown/menu button.
  useEffect(() => {
    if (!openMenu) return

    function handlePointerDown(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpenMenu(null)
      }
    }
    function handleKeyDown(event) {
      if (event.key === 'Escape') setOpenMenu(null)
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [openMenu])

  function toggleMenu(menu) {
    setOpenMenu((current) => (current === menu ? null : menu))
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/90 px-4 shadow-sm backdrop-blur-sm sm:px-6">
      <button
        ref={menuButtonRef}
        type="button"
        onClick={onMenuClick}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 md:hidden"
        aria-label="Open sidebar"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm shadow-blue-600/30">
          <CalendarIcon className="h-5 w-5" />
        </span>
        <span className="hidden text-base font-bold tracking-tight text-slate-900 sm:inline">
          Task Tracker
        </span>
        <span className="text-base font-bold tracking-tight text-slate-900 sm:hidden">
          ADT
        </span>
      </div>

      <div ref={containerRef} className="ml-auto flex items-center gap-2 sm:gap-4">
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleMenu('notifications')}
            className="hidden h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 sm:inline-flex"
            aria-label="Notifications"
            aria-haspopup="true"
            aria-expanded={openMenu === 'notifications'}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>

          {openMenu === 'notifications' && (
            <div
              role="menu"
              aria-label="Notifications"
              className="animate-fade-in-up absolute right-0 top-full mt-2 w-64 rounded-xl border border-slate-200 bg-white p-4 text-center shadow-lg"
            >
              <p className="text-sm font-medium text-slate-700">You're all caught up</p>
              <p className="mt-1 text-xs text-slate-500">No new notifications right now.</p>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => toggleMenu('account')}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white ring-2 ring-transparent ring-offset-2 transition-all hover:ring-blue-200"
            aria-label="Account menu"
            aria-haspopup="true"
            aria-expanded={openMenu === 'account'}
          >
            A
          </button>

          {openMenu === 'account' && (
            <div
              role="menu"
              aria-label="Account"
              className="animate-fade-in-up absolute right-0 top-full mt-2 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg"
            >
              <Link
                to="/settings"
                role="menuitem"
                onClick={() => setOpenMenu(null)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 transition-colors hover:bg-slate-50"
              >
                <SettingsIcon className="h-4 w-4 text-slate-400" />
                Settings
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Topbar
