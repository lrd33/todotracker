import '../../charts/registerChartJs.js'
import { Doughnut } from 'react-chartjs-2'
import ChartCard from './ChartCard.jsx'

function CompletionChart({ completed, remaining }) {
  const total = completed + remaining

  const data = {
    labels: ['Achieved', 'To Do'],
    datasets: [
      {
        data: [completed, remaining],
        backgroundColor: ['#22c55e', '#64748b'],
        borderColor: '#ffffff',
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '68%',
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
    <ChartCard
      title="Achieved vs. To Do"
      description={undefined}
    >
      {total > 0 ? (
        <div className="relative h-full">
          <Doughnut data={data} options={options} />
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center pb-8">
            <span className="text-2xl font-semibold text-slate-900">
              {total > 0 ? Math.round((completed / total) * 100) : 0}%
            </span>
            <span className="text-xs text-slate-500">achieved</span>
          </div>
        </div>
      ) : (
        <EmptyState />
      )}
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

export default CompletionChart
