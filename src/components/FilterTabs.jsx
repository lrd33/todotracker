function FilterTabs({ filters, active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter tasks">
      {filters.map((filter) => {
        const isActive = filter.key === active
        return (
          <button
            key={filter.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(filter.key)}
            className={[
              'inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium',
              'transition-all duration-150 hover:scale-[1.03] active:scale-[0.98]',
              isActive
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                : 'border border-slate-300 bg-white text-slate-600 hover:border-slate-400 hover:bg-slate-50',
            ].join(' ')}
          >
            {filter.label}
            {typeof filter.count === 'number' && (
              <span
                className={[
                  'rounded-full px-1.5 py-0.5 text-xs font-semibold',
                  isActive ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-600',
                ].join(' ')}
              >
                {filter.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

export default FilterTabs
