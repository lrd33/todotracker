import { daysBetween } from './date.js'

/**
 * Splits a flat list of assignments into the four dashboard sections.
 * - completed: status === 'completed'
 * - overdue: not completed and due before today
 * - today: not completed and due today
 * - upcoming: not completed and due after today
 */
export function categorizeAssignments(assignments, referenceDate = new Date()) {
  const today = []
  const upcoming = []
  const overdue = []
  const completed = []

  for (const assignment of assignments) {
    if (assignment.status === 'completed') {
      completed.push(assignment)
      continue
    }

    const diff = daysBetween(referenceDate, assignment.dueDate)
    if (diff < 0) overdue.push(assignment)
    else if (diff === 0) today.push(assignment)
    else upcoming.push(assignment)
  }

  today.sort((a, b) => a.dueDate - b.dueDate)
  upcoming.sort((a, b) => a.dueDate - b.dueDate)
  overdue.sort((a, b) => a.dueDate - b.dueDate)
  completed.sort((a, b) => b.completedDate - a.completedDate)

  return { today, upcoming, overdue, completed }
}

/** Whether an assignment belongs to a given filter tab ('all' | 'completed' | 'upcoming' | 'overdue' | 'high'). */
export function matchesCategoryFilter(assignment, filterKey, referenceDate = new Date()) {
  if (filterKey === 'all') return true
  if (filterKey === 'high') return assignment.priority === 'high'

  const status = getAssignmentStatus(assignment, referenceDate)
  if (filterKey === 'completed') return status === 'completed'
  if (filterKey === 'overdue') return status === 'overdue'
  // "Upcoming" covers anything not yet due — including due today —
  // so nothing pending falls outside of All/Completed/Overdue/Upcoming.
  if (filterKey === 'upcoming') return status === 'upcoming' || status === 'today'
  return true
}

/** Filters assignments by a case-insensitive match on course, title, or description. */
export function filterAssignments(assignments, query) {
  const q = query.trim().toLowerCase()
  if (!q) return assignments

  return assignments.filter((assignment) => {
    const course = assignment.course?.toLowerCase() ?? ''
    const title = assignment.title?.toLowerCase() ?? ''
    const description = assignment.description?.toLowerCase() ?? ''
    return course.includes(q) || title.includes(q) || description.includes(q)
  })
}

/** Counts of completed vs. remaining (not-yet-completed) assignments. */
export function getCompletionCounts(assignments) {
  const completed = assignments.filter((a) => a.status === 'completed').length
  return { completed, remaining: assignments.length - completed }
}

/** Assignment counts grouped by course, sorted from most to fewest. */
export function getCourseCounts(assignments) {
  const counts = new Map()
  for (const assignment of assignments) {
    const course = assignment.course || 'Uncategorized'
    counts.set(course, (counts.get(course) ?? 0) + 1)
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([course, count]) => ({ course, count }))
}

/** Assignment counts grouped by priority level. */
export function getPriorityCounts(assignments) {
  const counts = { high: 0, medium: 0, low: 0 }
  for (const assignment of assignments) {
    if (counts[assignment.priority] !== undefined) counts[assignment.priority] += 1
  }
  return counts
}

export const PRIORITY_STYLES = {
  high: { label: 'High priority', shortLabel: 'High', dot: 'bg-red-500', text: 'text-red-700' },
  medium: { label: 'Medium priority', shortLabel: 'Medium', dot: 'bg-amber-500', text: 'text-amber-700' },
  low: { label: 'Low priority', shortLabel: 'Low', dot: 'bg-slate-400', text: 'text-slate-600' },
}

export const STATUS_STYLES = {
  completed: { label: 'Achieved', badge: 'bg-green-50 text-green-700' },
  overdue: { label: 'Overdue', badge: 'bg-red-50 text-red-700' },
  today: { label: 'Due today', badge: 'bg-blue-50 text-blue-700' },
  upcoming: { label: 'Upcoming', badge: 'bg-indigo-50 text-indigo-700' },
}

/** Computes the display status ('completed' | 'overdue' | 'today' | 'upcoming') for one assignment. */
export function getAssignmentStatus(assignment, referenceDate = new Date()) {
  if (assignment.status === 'completed') return 'completed'

  const diff = daysBetween(referenceDate, assignment.dueDate)
  if (diff < 0) return 'overdue'
  if (diff === 0) return 'today'
  return 'upcoming'
}
