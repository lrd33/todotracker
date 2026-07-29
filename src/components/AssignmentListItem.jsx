function AssignmentListItem({ title, course, dueLabel }) {
  return (
    <li className="flex items-start justify-between gap-3 px-5 py-3 transition-colors duration-150 hover:bg-slate-50">
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-slate-800">{title}</p>
        <p className="mt-0.5 text-xs text-slate-500">{course}</p>
      </div>
      <div className="flex shrink-0 items-center">
        <span className="text-xs font-medium text-slate-600">{dueLabel}</span>
      </div>
    </li>
  )
}

export default AssignmentListItem
