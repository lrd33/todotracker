import { useNavigate, Link } from 'react-router-dom'
import { useAssignments } from '../context/AssignmentsContext.jsx'
import { formToAssignment } from '../utils/assignmentForm.js'
import AssignmentForm from '../components/AssignmentForm.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { PlusIcon } from '../components/icons.jsx'

const initialValues = {
  courseName: '',
  assignmentTitle: '',
  description: '',
  dueDate: '',
  priority: 'medium',
  status: 'pending',
}

function AddAssignment() {
  const navigate = useNavigate()
  const { addAssignment } = useAssignments()

  function handleSubmit(form) {
    addAssignment(formToAssignment(form))
    navigate('/assignments')
  }

  function handleCancel() {
    navigate('/assignments')
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <PageHeader
        icon={<PlusIcon className="h-5 w-5" />}
        title="Add assignment"
        description="Fill in the details below to create a new assignment."
      />

      <AssignmentForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel="Save"
      />

      <p className="text-sm text-slate-500">
        <Link
          to="/assignments"
          className="font-medium text-blue-600 transition-colors hover:text-blue-500"
        >
          ← Back to assignments
        </Link>
      </p>
    </div>
  )
}

export default AddAssignment
