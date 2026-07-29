import '../../charts/registerChartJs.js'
import { Bar } from 'react-chartjs-2'
import ChartCard from './ChartCard.jsx'

function CourseChart({ courseCounts }) {
  const data = {
    labels: courseCounts.map((c) => c.course),
    datasets: [
      {
        label: 'Assignments',
        data: courseCounts.map((c) => c.count),
        backgroundColor: '#2563eb',
        borderRadius: 6,
        maxBarThickness: 28,
      },
    ],
  }

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.parsed.x} assignment${ctx.parsed.x === 1 ? '' : 's'}`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: { precision: 0, color: '#64748b', font: { size: 11 } },
        grid: { color: '#e2e8f0' },
      },
      y: {
        ticks: { color: '#334155', font: { size: 11 } },
        grid: { display: false },
      },
    },
  }

  return (
    <ChartCard title="Assignments by course">
      {courseCounts.length > 0 ? (
        <Bar data={data} options={options} />
      ) : (
        <EmptyState />
      )}
    </ChartCard>
  )
}

function EmptyState() {
  return (
    <div className="flex h-full items-center justify-center text-sm text-slate-400">
      No assignments yet.
    </div>
  )
}

export default CourseChart
