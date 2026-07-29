import { useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Topbar from './Topbar.jsx'
import Sidebar from './Sidebar.jsx'
import { XIcon } from './icons.jsx'

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

function Layout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const location = useLocation()

  const menuButtonRef = useRef(null)
  const closeButtonRef = useRef(null)
  const drawerRef = useRef(null)
  const wasOpenRef = useRef(false)

  // Reset scroll position on every navigation — otherwise the new page
  // can render mid-scroll if the previous page was scrolled down.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  // Auto-close the mobile drawer on navigation (e.g. browser back/forward
  // while it's open) so it never lingers over the wrong page.
  useEffect(() => {
    setMobileNavOpen(false)
  }, [location.pathname])

  // Lock background scroll while the drawer is open, move focus into it,
  // and return focus to the trigger button when it closes.
  useEffect(() => {
    if (mobileNavOpen) {
      document.body.style.overflow = 'hidden'
      closeButtonRef.current?.focus()
    } else {
      document.body.style.overflow = ''
      if (wasOpenRef.current) menuButtonRef.current?.focus()
    }
    wasOpenRef.current = mobileNavOpen
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileNavOpen])

  // Escape closes the drawer; Tab is trapped inside it while open so
  // keyboard focus can't silently leave into the hidden background.
  useEffect(() => {
    if (!mobileNavOpen) return

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setMobileNavOpen(false)
        return
      }
      if (event.key !== 'Tab' || !drawerRef.current) return

      const focusable = drawerRef.current.querySelectorAll(FOCUSABLE_SELECTOR)
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [mobileNavOpen])

  return (
    <div className="min-h-screen bg-slate-50">
      <Topbar onMenuClick={() => setMobileNavOpen(true)} menuButtonRef={menuButtonRef} />

      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 border-r border-slate-200 bg-white md:block">
          <Sidebar />
        </aside>

        {/* Mobile sidebar (off-canvas drawer) */}
        {mobileNavOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div
              className="absolute inset-0 animate-fade-in bg-slate-900/40"
              onClick={() => setMobileNavOpen(false)}
              aria-hidden="true"
            />
            <div
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              className="relative z-50 flex h-full w-64 flex-col bg-white shadow-xl animate-slide-in-left"
            >
              <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4">
                <span className="text-sm font-semibold text-slate-900">
                  Menu
                </span>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setMobileNavOpen(false)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100"
                  aria-label="Close sidebar"
                >
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <Sidebar onNavigate={() => setMobileNavOpen(false)} />
              </div>
            </div>
          </div>
        )}

        {/* Main dashboard area */}
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div key={location.pathname} className="mx-auto max-w-7xl animate-fade-in-up">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout
