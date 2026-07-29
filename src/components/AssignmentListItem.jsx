import { PRIORITY_STYLES } from '../utils/assignments.js'

function AssignmentListItem({ title, course, dueLabel, priority }) {
  const priorityStyle = PRIORITY_STYLES[priority] ?? PRIORITY_STYLES.low

  return (
    <li className="flex items-start justify-between gap-3 px-5 py-3 transition-colors duration-150 hover:bg-slate-50">
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-slate-800">{title}</p>
        <p className="mt-0.5 text-xs text-slate-500">{course}</p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1">
        <span className="text-xs font-medium text-slate-600">{dueLabel}</span>
        <span className={`flex items-center gap-1 text-[11px] ${priorityStyle.text}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${priorityStyle.dot}`} />
          {priorityStyle.label}
        </span>
      </div>
    </li>
  )
}

export default AssignmentListItem
