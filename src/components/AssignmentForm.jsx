import { useState } from 'react'

function validate(values) {
  const errors = {}
  if (!values.courseName.trim()) {
    errors.courseName = 'Course name is required.'
  }
  if (!values.assignmentTitle.trim()) {
    errors.assignmentTitle = 'Assignment title is required.'
  }
  if (!values.dueDate) {
    errors.dueDate = 'Due date is required.'
  }
  return errors
}

function AssignmentForm({ initialValues, onSubmit, onCancel, submitLabel = 'Save' }) {
  const [form, setForm] = useState(initialValues)
  const [errors, setErrors] = useState({})

  function handleChange(field) {
    return (event) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }))
      setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev))
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    onSubmit(form)
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="animate-fade-in-up space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7"
    >
      <Field label="Course name" htmlFor="courseName" error={errors.courseName} required>
        <input
          id="courseName"
          type="text"
          value={form.courseName}
          onChange={handleChange('courseName')}
          placeholder="Supply Chain Analytics"
          className={inputClass(errors.courseName)}
        />
      </Field>

      <Field label="Assignment title" htmlFor="assignmentTitle" error={errors.assignmentTitle} required>
        <input
          id="assignmentTitle"
          type="text"
          value={form.assignmentTitle}
          onChange={handleChange('assignmentTitle')}
          placeholder="Demand forecasting worksheet"
          className={inputClass(errors.assignmentTitle)}
        />
      </Field>

      <Field label="Description" htmlFor="description" error={errors.description}>
        <textarea
          id="description"
          rows={4}
          value={form.description}
          onChange={handleChange('description')}
          placeholder="Add any notes or instructions for this assignment."
          className={inputClass(errors.description)}
        />
      </Field>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Due date" htmlFor="dueDate" error={errors.dueDate} required>
          <input
            id="dueDate"
            type="date"
            value={form.dueDate}
            onChange={handleChange('dueDate')}
            className={inputClass(errors.dueDate)}
          />
        </Field>

        <Field label="Priority" htmlFor="priority" error={errors.priority}>
          <select
            id="priority"
            value={form.priority}
            onChange={handleChange('priority')}
            className={inputClass(errors.priority)}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </Field>
      </div>

      <Field label="Status" htmlFor="status" error={errors.status}>
        <select
          id="status"
          value={form.status}
          onChange={handleChange('status')}
          className={inputClass(errors.status)}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </Field>

      <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-150 hover:scale-[1.02] hover:bg-slate-50 active:scale-[0.98]"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-blue-600/30 transition-all duration-150 hover:scale-[1.02] hover:bg-blue-700 hover:shadow-md active:scale-[0.98]"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  )
}

function Field({ label, htmlFor, error, required, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && (
        <p className="mt-1.5 animate-fade-in text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

function inputClass(error) {
  return [
    'block w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm transition-all duration-150',
    'focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500',
    error ? 'border-red-400' : 'border-slate-300 hover:border-slate-400',
  ].join(' ')
}

export default AssignmentForm
