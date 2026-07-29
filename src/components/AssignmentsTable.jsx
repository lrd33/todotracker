import { formatDueLabel, formatCompletedLabel } from '../utils/date.js'
import { getAssignmentStatus } from '../utils/assignments.js'
import { PencilIcon, TrashIcon, CheckCircleIcon } from './icons.jsx'
import PriorityPill from './PriorityPill.jsx'
import StatusBadge from './StatusBadge.jsx'

function AssignmentsTable({ assignments, onEdit, onDelete, onToggleComplete, emptyMessage }) {
  if (assignments.length === 0) {
    const title = emptyMessage?.title ?? 'No tasks'
    const body = emptyMessage?.body ?? 'Tasks you add will show up here.'
    return (
      <div className="animate-fade-in-up rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <p className="text-sm font-medium text-slate-700">{title}</p>
        <p className="mt-1 text-sm text-slate-500">{body}</p>
      </div>
    )
  }

  return (
    <div className="animate-fade-in-up overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="thin-scrollbar overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <th scope="col" className="px-5 py-3">Course</th>
              <th scope="col" className="px-5 py-3">Task name</th>
              <th scope="col" className="px-5 py-3">Due date</th>
              <th scope="col" className="px-5 py-3">Priority</th>
              <th scope="col" className="px-5 py-3">Status</th>
              <th scope="col" className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {assignments.map((assignment) => {
              const status = getAssignmentStatus(assignment)
              const dueLabel =
                status === 'completed'
                  ? formatCompletedLabel(assignment.completedDate)
                  : formatDueLabel(assignment.dueDate)

              return (
                <tr
                  key={assignment.id}
                  className="transition-colors duration-150 hover:bg-blue-50/40"
                >
                  <td className="px-5 py-3 text-slate-600">{assignment.course}</td>
                  <td className="px-5 py-3 font-medium text-slate-800">
                    {assignment.title}
                  </td>
                  <td className="px-5 py-3 whitespace-nowrap text-slate-600">
                    {dueLabel}
                  </td>
                  <td className="px-5 py-3">
                    <PriorityPill priority={assignment.priority} />
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge status={status} />
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => onToggleComplete?.(assignment)}
                        className={[
                          'inline-flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-150 hover:scale-110',
                          assignment.status === 'completed'
                            ? 'bg-green-50 text-green-600 hover:bg-green-100'
                            : 'text-slate-500 hover:bg-green-50 hover:text-green-600',
                        ].join(' ')}
                        aria-label={
                          assignment.status === 'completed'
                            ? `Mark ${assignment.title} as not achieved`
                            : `Mark ${assignment.title} as achieved`
                        }
                        aria-pressed={assignment.status === 'completed'}
                        title={assignment.status === 'completed' ? 'Mark as not achieved' : 'Mark as achieved'}
                      >
                        <CheckCircleIcon className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onEdit?.(assignment)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-all duration-150 hover:scale-110 hover:bg-blue-50 hover:text-blue-600"
                        aria-label={`Edit ${assignment.title}`}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete?.(assignment)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-all duration-150 hover:scale-110 hover:bg-red-50 hover:text-red-600"
                        aria-label={`Delete ${assignment.title}`}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AssignmentsTable
