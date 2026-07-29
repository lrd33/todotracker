import { PRIORITY_STYLES } from '../utils/assignments.js'

function PriorityPill({ priority }) {
  const style = PRIORITY_STYLES[priority] ?? PRIORITY_STYLES.low

  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${style.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      {style.shortLabel}
    </span>
  )
}

export default PriorityPill
