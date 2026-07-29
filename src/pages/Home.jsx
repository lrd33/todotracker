import { useAssignments } from '../context/AssignmentsContext.jsx'
import {
  categorizeAssignments,
  getCompletionCounts,
  getCourseCounts,
  getPriorityCounts,
} from '../utils/assignments.js'
import { formatDueLabel, formatCompletedLabel } from '../utils/date.js'
import PageHeader from '../components/PageHeader.jsx'
import AssignmentCategoryCard from '../components/AssignmentCategoryCard.jsx'
import AssignmentListItem from '../components/AssignmentListItem.jsx'
import CompletionChart from '../components/charts/CompletionChart.jsx'
import CourseChart from '../components/charts/CourseChart.jsx'
import PriorityChart from '../components/charts/PriorityChart.jsx'
import { DashboardIcon, SunIcon, CalendarIcon, AlertTriangleIcon, CheckCircleIcon } from '../components/icons.jsx'

function Home() {
  const { assignments } = useAssignments()
  const { today, upcoming, overdue, completed } = categorizeAssignments(assignments)

  const completionCounts = getCompletionCounts(assignments)
  const courseCounts = getCourseCounts(assignments)
  const priorityCounts = getPriorityCounts(assignments)

  return (
    <div className="space-y-8">
      <PageHeader
        icon={<DashboardIcon className="h-5 w-5" />}
        title="Dashboard"
        
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <CompletionChart
          completed={completionCounts.completed}
          remaining={completionCounts.remaining}
        />
        <CourseChart courseCounts={courseCounts} />
        <PriorityChart priorityCounts={priorityCounts} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AssignmentCategoryCard
          title="Today's assignments"
          description="Due before the end of today"
          icon={<SunIcon className="h-5 w-5" />}
          color="blue"
          count={today.length}
          emptyMessage="Nothing due today."
        >
          {today.map((item) => (
            <AssignmentListItem
              key={item.id}
              title={item.title}
              course={item.course}
              dueLabel={formatDueLabel(item.dueDate)}
              priority={item.priority}
            />
          ))}
        </AssignmentCategoryCard>

        <AssignmentCategoryCard
          title="Upcoming assignments"
          description="Due in the days ahead"
          icon={<CalendarIcon className="h-5 w-5" />}
          color="indigo"
          count={upcoming.length}
          emptyMessage="No upcoming assignments."
        >
          {upcoming.map((item) => (
            <AssignmentListItem
              key={item.id}
              title={item.title}
              course={item.course}
              dueLabel={formatDueLabel(item.dueDate)}
              priority={item.priority}
            />
          ))}
        </AssignmentCategoryCard>

        <AssignmentCategoryCard
          title="Overdue assignments"
          description="Past their due date"
          icon={<AlertTriangleIcon className="h-5 w-5" />}
          color="red"
          count={overdue.length}
          emptyMessage="Nothing overdue. You're on track."
        >
          {overdue.map((item) => (
            <AssignmentListItem
              key={item.id}
              title={item.title}
              course={item.course}
              dueLabel={formatDueLabel(item.dueDate)}
              priority={item.priority}
            />
          ))}
        </AssignmentCategoryCard>

        <AssignmentCategoryCard
          title="Achieved assignments"
          description="Turned in and done"
          icon={<CheckCircleIcon className="h-5 w-5" />}
          color="green"
          count={completed.length}
          emptyMessage="No achieved assignments yet."
        >
          {completed.map((item) => (
            <AssignmentListItem
              key={item.id}
              title={item.title}
              course={item.course}
              dueLabel={formatCompletedLabel(item.completedDate)}
              priority={item.priority}
            />
          ))}
        </AssignmentCategoryCard>
      </div>
    </div>
  )
}

export default Home
