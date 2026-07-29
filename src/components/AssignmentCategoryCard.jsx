const THEME = {
  blue: {
    iconWrap: 'bg-blue-50 text-blue-600',
    badge: 'bg-blue-50 text-blue-700',
  },
  indigo: {
    iconWrap: 'bg-indigo-50 text-indigo-600',
    badge: 'bg-indigo-50 text-indigo-700',
  },
  red: {
    iconWrap: 'bg-red-50 text-red-600',
    badge: 'bg-red-50 text-red-700',
  },
  black: {
    iconWrap: 'bg-slate-900 text-slate-50',
    badge: 'bg-slate-900 text-slate-50',
  },
  green: {
    iconWrap: 'bg-green-50 text-green-600',
    badge: 'bg-green-50 text-green-700',
  },
}

function AssignmentCategoryCard({
  title,
  description,
  icon,
  color = 'blue',
  count,
  emptyMessage,
  children,
}) {
  const theme = THEME[color] ?? THEME.blue

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
        <div className="flex items-center gap-3">
          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 ${theme.iconWrap}`}>
            {icon}
          </span>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
            {description && (
              <p className="text-xs text-slate-500">{description}</p>
            )}
          </div>
        </div>
        <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${theme.badge}`}>
          {count}
        </span>
      </div>

      {count > 0 ? (
        <ul className="thin-scrollbar max-h-72 divide-y divide-slate-100 overflow-y-auto">
          {children}
        </ul>
      ) : (
        <div className="px-5 py-8 text-center text-sm text-slate-400">
          {emptyMessage}
        </div>
      )}
    </div>
  )
}

export default AssignmentCategoryCard
