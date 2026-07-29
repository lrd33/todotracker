import { useMemo, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAssignments } from '../context/AssignmentsContext.jsx'
import { filterAssignments, matchesCategoryFilter } from '../utils/assignments.js'
import PageHeader from '../components/PageHeader.jsx'
import AssignmentsTable from '../components/AssignmentsTable.jsx'
import SearchBar from '../components/SearchBar.jsx'
import FilterTabs from '../components/FilterTabs.jsx'
import { AssignmentsIcon, PlusIcon } from '../components/icons.jsx'

function Assignments() {
  const navigate = useNavigate()
  const { assignments, deleteAssignment, toggleCompleted } = useAssignments()
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')

  const sorted = [...assignments].sort((a, b) => a.dueDate - b.dueDate)

  const filterCounts = useMemo(
    () => ({
      all: sorted.length,
      completed: sorted.filter((a) => matchesCategoryFilter(a, 'completed')).length,
      upcoming: sorted.filter((a) => matchesCategoryFilter(a, 'upcoming')).length,
      overdue: sorted.filter((a) => matchesCategoryFilter(a, 'overdue')).length,
    }),
    [sorted],
  )

  const filters = [
    { key: 'all', label: 'All', count: filterCounts.all },
    { key: 'completed', label: 'Achieved', count: filterCounts.completed },
    { key: 'upcoming', label: 'Upcoming', count: filterCounts.upcoming },
    { key: 'overdue', label: 'Overdue', count: filterCounts.overdue },
  ]

  const byCategory = useMemo(
    () => sorted.filter((a) => matchesCategoryFilter(a, activeFilter)),
    [sorted, activeFilter],
  )
  const filtered = useMemo(() => filterAssignments(byCategory, query), [byCategory, query])

  const isFiltering = query || activeFilter !== 'all'

  function handleEdit(assignment) {
    navigate(`/assignments/${assignment.id}/edit`)
  }

  function handleDelete(assignment) {
    const confirmed = window.confirm(`Delete "${assignment.title}"?`)
    if (!confirmed) return
    deleteAssignment(assignment.id)
  }

  function handleToggleComplete(assignment) {
    toggleCompleted(assignment.id)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<AssignmentsIcon className="h-5 w-5" />}
        title="Assignments"
        description={
          isFiltering
            ? `${filtered.length} of ${sorted.length} assignments`
            : `${sorted.length} assignment${sorted.length === 1 ? '' : 's'} total`
        }
        actions={
          <Link
            to="/assignments/new"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm shadow-blue-600/30 transition-all duration-150 hover:scale-[1.02] hover:bg-blue-700 hover:shadow-md active:scale-[0.98]"
          >
            <PlusIcon className="h-4 w-4" />
            Add assignment
          </Link>
        }
      />

      <div className="space-y-4">
        <FilterTabs filters={filters} active={activeFilter} onChange={setActiveFilter} />
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search by course, title, or description"
        />
      </div>

      <AssignmentsTable
        assignments={filtered}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleComplete={handleToggleComplete}
        emptyMessage={
          isFiltering
            ? {
                title: 'No matches',
                body: query
                  ? `No assignments match "${query}".`
                  : 'No assignments match this filter.',
              }
            : undefined
        }
      />
    </div>
  )
}

export default Assignments
