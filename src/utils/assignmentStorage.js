const STORAGE_KEY = 'assignment-deadline-tracker/assignments'

/**
 * Reads assignments from localStorage, reviving dueDate/completedDate
 * back into Date objects. Returns null if nothing is stored yet, or if
 * the stored data can't be parsed — callers should fall back to their
 * own default (e.g. sample data) in that case.
 */
export function loadAssignments() {
  if (typeof window === 'undefined') return null

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null

    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return null

    return parsed.map((assignment) => ({
      ...assignment,
      dueDate: new Date(assignment.dueDate),
      completedDate: assignment.completedDate ? new Date(assignment.completedDate) : undefined,
    }))
  } catch (error) {
    console.warn('Could not read assignments from local storage:', error)
    return null
  }
}

/** Persists the current assignment list to localStorage. */
export function saveAssignments(assignments) {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(assignments))
  } catch (error) {
    console.warn('Could not save assignments to local storage:', error)
  }
}
