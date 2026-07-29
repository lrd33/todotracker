export function startOfDay(date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

export function addDays(date, days) {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

export function addHours(date, hours) {
  const d = new Date(date)
  d.setHours(d.getHours() + hours)
  return d
}

const DAY_MS = 24 * 60 * 60 * 1000

export function daysBetween(a, b) {
  return Math.round((startOfDay(b) - startOfDay(a)) / DAY_MS)
}

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit',
})

const monthDayFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
})

const monthDayYearFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

/** Human-friendly due label, tailored to which dashboard section it's in. */
export function formatDueLabel(dueDate, referenceDate = new Date()) {
  const diff = daysBetween(referenceDate, dueDate)

  if (diff === 0) return `Today, ${timeFormatter.format(dueDate)}`
  if (diff === 1) return `Tomorrow, ${timeFormatter.format(dueDate)}`
  if (diff === -1) return 'Due yesterday'
  if (diff < -1) return `${Math.abs(diff)} days overdue`
  if (diff > 1 && diff <= 6) return `Due ${monthDayFormatter.format(dueDate)}`

  const sameYear = dueDate.getFullYear() === referenceDate.getFullYear()
  return `Due ${sameYear ? monthDayFormatter.format(dueDate) : monthDayYearFormatter.format(dueDate)}`
}

export function formatCompletedLabel(completedDate, referenceDate = new Date()) {
  const diff = daysBetween(completedDate, referenceDate)
  if (diff === 0) return 'Completed today'
  if (diff === 1) return 'Completed yesterday'
  return `Completed ${monthDayFormatter.format(completedDate)}`
}
