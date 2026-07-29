import { createContext, useContext, useMemo, useState, useCallback, useEffect } from 'react'
import { sampleAssignments } from '../data/sampleAssignments.js'
import { loadAssignments, saveAssignments } from '../utils/assignmentStorage.js'

const AssignmentsContext = createContext(null)

function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `a-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export function AssignmentsProvider({ children }) {
  const [assignments, setAssignments] = useState(
    () => loadAssignments() ?? sampleAssignments,
  )

  // Auto-save: any add/edit/delete/complete updates `assignments`,
  // which writes the full list back to localStorage here.
  useEffect(() => {
    saveAssignments(assignments)
  }, [assignments])

  const addAssignment = useCallback((data) => {
    const id = generateId()
    setAssignments((prev) => [
      ...prev,
      {
        id,
        ...data,
        completedDate: data.status === 'completed' ? new Date() : undefined,
      },
    ])
    return id
  }, [])

  const updateAssignment = useCallback((id, data) => {
    setAssignments((prev) =>
      prev.map((assignment) =>
        assignment.id === id
          ? {
              ...assignment,
              ...data,
              completedDate:
                data.status === 'completed'
                  ? (assignment.status === 'completed' ? assignment.completedDate : new Date())
                  : undefined,
            }
          : assignment,
      ),
    )
  }, [])

  const deleteAssignment = useCallback((id) => {
    setAssignments((prev) => prev.filter((assignment) => assignment.id !== id))
  }, [])

  const toggleCompleted = useCallback((id) => {
    setAssignments((prev) =>
      prev.map((assignment) => {
        if (assignment.id !== id) return assignment
        const isCompleted = assignment.status === 'completed'
        return {
          ...assignment,
          status: isCompleted ? 'pending' : 'completed',
          completedDate: isCompleted ? undefined : new Date(),
        }
      }),
    )
  }, [])

  const getAssignment = useCallback(
    (id) => assignments.find((assignment) => assignment.id === id),
    [assignments],
  )

  const value = useMemo(
    () => ({
      assignments,
      addAssignment,
      updateAssignment,
      deleteAssignment,
      toggleCompleted,
      getAssignment,
    }),
    [assignments, addAssignment, updateAssignment, deleteAssignment, toggleCompleted, getAssignment],
  )

  return (
    <AssignmentsContext.Provider value={value}>
      {children}
    </AssignmentsContext.Provider>
  )
}

export function useAssignments() {
  const context = useContext(AssignmentsContext)
  if (!context) {
    throw new Error('useAssignments must be used within an AssignmentsProvider')
  }
  return context
}
