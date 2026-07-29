import { URGENCY_STYLES } from '../utils/assignments.js'

function UrgencyPill({ priority }) {
  const style = URGENCY_STYLES[priority] ?? URGENCY_STYLES.low

  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${style.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      {style.shortLabel}
    </span>
  )
}

export default UrgencyPill
