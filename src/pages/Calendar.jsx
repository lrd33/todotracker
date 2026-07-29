import PageHeader from '../components/PageHeader.jsx'
import { CalendarIcon } from '../components/icons.jsx'

function Calendar() {
  return (
    <div className="space-y-6">
      <PageHeader
        icon={<CalendarIcon className="h-5 w-5" />}
        title="Calendar"
        description="View deadlines by date."
      />

      <section className="animate-fade-in-up rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center transition-shadow hover:shadow-sm">
        <h3 className="text-base font-medium text-slate-800">
          No content yet
        </h3>
        <p className="mt-2 text-sm text-slate-500">
          A calendar view will be added here.
        </p>
      </section>
    </div>
  )
}

export default Calendar
