import { startOfDay, addDays, addHours } from '../utils/date.js'

const today = startOfDay(new Date())

/**
 * Sample data for local development and UI testing.
 * Due dates are generated relative to "today" so the dashboard
 * always renders a realistic mix of overdue / today / upcoming items.
 */
export const sampleAssignments = [
  {
    id: 'a1',
    title: 'Supply chain network optimization problem set',
    course: 'Supply Chain Analytics',
    dueDate: addHours(today, 17), // today, 5pm
    status: 'pending',
    priority: 'high',
  },
  {
    id: 'a2',
    title: 'Discussion post: inventory risk pooling',
    course: 'Operations Management',
    dueDate: addHours(today, 23), // today, 11pm
    status: 'pending',
    priority: 'medium',
  },
  {
    id: 'a3',
    title: 'CPA practice set — Auditing (AUD)',
    course: 'CPA Exam Prep',
    dueDate: addHours(addDays(today, 1), 21),
    status: 'pending',
    priority: 'high',
  },
  {
    id: 'a4',
    title: 'Case study: global sourcing strategy',
    course: 'Procurement & Sourcing',
    dueDate: addHours(addDays(today, 3), 17),
    status: 'pending',
    priority: 'medium',
  },
  {
    id: 'a5',
    title: 'CPA practice set — Financial Accounting (FAR)',
    course: 'CPA Exam Prep',
    dueDate: addHours(addDays(today, 5), 21),
    status: 'pending',
    priority: 'medium',
  },
  {
    id: 'a6',
    title: 'Group project proposal draft',
    course: 'Logistics Management',
    dueDate: addHours(addDays(today, 9), 17),
    status: 'pending',
    priority: 'low',
  },
  {
    id: 'a7',
    title: 'Reflection memo: lean six sigma reading',
    course: 'Operations Management',
    dueDate: addHours(addDays(today, -2), 17),
    status: 'pending',
    priority: 'high',
  },
  {
    id: 'a8',
    title: 'Demand forecasting worksheet',
    course: 'Supply Chain Analytics',
    dueDate: addHours(addDays(today, -1), 23),
    status: 'pending',
    priority: 'medium',
  },
  {
    id: 'a9',
    title: 'Quiz 3: transportation & distribution',
    course: 'Logistics Management',
    dueDate: addHours(addDays(today, -6), 12),
    status: 'pending',
    priority: 'low',
  },
  {
    id: 'a10',
    title: 'Vendor negotiation simulation write-up',
    course: 'Procurement & Sourcing',
    dueDate: addDays(today, -4),
    completedDate: addDays(today, -5),
    status: 'completed',
    priority: 'medium',
  },
  {
    id: 'a11',
    title: 'CPA practice set — Regulation (REG)',
    course: 'CPA Exam Prep',
    dueDate: addDays(today, -3),
    completedDate: addDays(today, -3),
    status: 'completed',
    priority: 'high',
  },
  {
    id: 'a12',
    title: 'Warehouse layout design exercise',
    course: 'Logistics Management',
    dueDate: addDays(today, -10),
    completedDate: addDays(today, -11),
    status: 'completed',
    priority: 'low',
  },
]
