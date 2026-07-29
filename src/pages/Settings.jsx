import PageHeader from '../components/PageHeader.jsx'
import { SettingsIcon } from '../components/icons.jsx'

function Settings() {
  return (
    <div className="space-y-6">
      <PageHeader
        icon={<SettingsIcon className="h-5 w-5" />}
        title="Settings"
        description="Manage your preferences."
      />

      <section className="animate-fade-in-up rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center transition-shadow hover:shadow-sm">
        <h3 className="text-base font-medium text-slate-800">
          No content yet
        </h3>
        <p className="mt-2 text-sm text-slate-500">
          Settings options will be added here.
        </p>
      </section>
    </div>
  )
}

export default Settings
