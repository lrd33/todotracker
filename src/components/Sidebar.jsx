import { NavLink } from 'react-router-dom'
import { DashboardIcon, AssignmentsIcon, CalendarIcon, SettingsIcon } from './icons.jsx'

const navItems = [
  { to: '/', label: 'Dashboard', icon: DashboardIcon, end: true },
  { to: '/assignments', label: 'Assignments', icon: AssignmentsIcon },
  { to: '/calendar', label: 'Calendar', icon: CalendarIcon },
  { to: '/settings', label: 'Settings', icon: SettingsIcon },
]

function Sidebar({ onNavigate }) {
  return (
    <nav className="flex h-full flex-col gap-1 px-3 py-4">
      {navItems.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={onNavigate}
          className={({ isActive }) =>
            [
              'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium',
              'transition-all duration-150 ease-out hover:translate-x-0.5',
              isActive
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                : 'text-slate-600 hover:bg-blue-50 hover:text-blue-700',
            ].join(' ')
          }
        >
          <Icon className="h-5 w-5 shrink-0 transition-transform duration-150 group-hover:scale-110" />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}

export default Sidebar
