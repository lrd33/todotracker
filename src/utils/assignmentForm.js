/** Formats a Date as 'YYYY-MM-DD' for a native date input's value. */
export function toDateInputValue(date) {
  if (!date) return ''
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/** Converts an assignment record into the form's field shape. */
export function assignmentToForm(assignment) {
  return {
    courseName: assignment.course ?? '',
    assignmentTitle: assignment.title ?? '',
    description: assignment.description ?? '',
    dueDate: toDateInputValue(assignment.dueDate),
    priority: assignment.priority ?? 'medium',
    status: assignment.status ?? 'pending',
  }
}

/** Converts submitted form values into the assignment record shape. */
export function formToAssignment(form) {
  // Due date-only input, stored as end-of-day so same-day items still
  // show up under "today" rather than rolling into "overdue".
  const [year, month, day] = form.dueDate.split('-').map(Number)
  const dueDate = new Date(year, month - 1, day, 23, 59, 0)

  return {
    course: form.courseName.trim(),
    title: form.assignmentTitle.trim(),
    description: form.description.trim(),
    dueDate,
    priority: form.priority,
    status: form.status,
  }
}
