import { useNavigate, useParams, Link } from 'react-router-dom'
import { useAssignments } from '../context/AssignmentsContext.jsx'
import { assignmentToForm, formToAssignment } from '../utils/assignmentForm.js'
import AssignmentForm from '../components/AssignmentForm.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { PencilIcon } from '../components/icons.jsx'

function EditAssignment() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getAssignment, updateAssignment } = useAssignments()
  const assignment = getAssignment(id)

  if (!assignment) {
    return (
      <div className="mx-auto max-w-2xl space-y-4">
        <div className="animate-fade-in-up rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <h2 className="text-lg font-medium text-slate-800">Assignment not found</h2>
          <p className="mt-2 text-sm text-slate-500">
            It may have already been deleted.
          </p>
          <Link
            to="/assignments"
            className="mt-4 inline-block text-sm font-medium text-blue-600 transition-colors hover:text-blue-500"
          >
            ← Back to assignments
          </Link>
        </div>
      </div>
    )
  }

  function handleSubmit(form) {
    updateAssignment(id, formToAssignment(form))
    navigate('/assignments')
  }

  function handleCancel() {
    navigate('/assignments')
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <PageHeader
        icon={<PencilIcon className="h-5 w-5" />}
        title="Edit assignment"
        description="Update the details below and save your changes."
      />

      <AssignmentForm
        initialValues={assignmentToForm(assignment)}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitLabel="Save changes"
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

export default EditAssignment
