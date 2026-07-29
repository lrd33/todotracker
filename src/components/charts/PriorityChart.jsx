import '../../charts/registerChartJs.js'
import { Doughnut } from 'react-chartjs-2'
import ChartCard from './ChartCard.jsx'

function PriorityChart({ priorityCounts }) {
  const total = priorityCounts.high + priorityCounts.medium + priorityCounts.low

  const data = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [
      {
        data: [priorityCounts.high, priorityCounts.medium, priorityCounts.low],
        backgroundColor: ['#ef4444', '#f59e0b', '#94a3b8'],
        borderColor: '#ffffff',
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { boxWidth: 10, boxHeight: 10, padding: 16, font: { size: 12 } },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const pct = total > 0 ? Math.round((ctx.parsed / total) * 100) : 0
            return ` ${ctx.label}: ${ctx.parsed} (${pct}%)`
          },
        },
      },
    },
  }

  return (
    <ChartCard title="Work Queue" description="How your work is weighted">
      {total > 0 ? <Doughnut data={data} options={options} /> : <EmptyState />}
    </ChartCard>
  )
}

function EmptyState() {
  return (
    <div className="flex h-full items-center justify-center text-sm text-slate-400">
      No tasks yet.
    </div>
  )
}

export default PriorityChart
