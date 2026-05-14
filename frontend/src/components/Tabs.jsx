export function Tabs({ tabs, active, onChange }) {
  return (
    <div className='flex gap-1 p-1 bg-slate-50 border border-slate-100 rounded-2xl mb-6 w-fit'>
      {tabs.map(t => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
            active === t.id
              ? 'bg-teal-500 text-white shadow-sm shadow-teal-100'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}
