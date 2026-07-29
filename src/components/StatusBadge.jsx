import { STATUS_STYLES } from '../utils/assignments.js'

function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.upcoming

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${style.badge}`}>
      {style.label}
    </span>
  )
}

export default StatusBadge
