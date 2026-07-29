function ChartCard({ title, description, children, footer }) {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div>
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        {description && <p className="text-xs text-slate-500">{description}</p>}
      </div>
      <div className="mt-4 h-64">{children}</div>
      {footer && <div className="mt-4 border-t border-slate-100 pt-3">{footer}</div>}
    </div>
  )
}

export default ChartCard
