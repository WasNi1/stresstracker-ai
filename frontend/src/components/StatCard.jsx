function StatCard({ label, value, sub, color = 'slate', icon: Icon, loading }) {
  const valColor = {
    teal:  'text-teal-500',
    amber: 'text-amber-500',
    red:   'text-red-500',
    slate: 'text-slate-700',
  }[color]

  return (
    <div className='bg-white border border-slate-100 rounded-2xl p-5 shadow-sm'>
      <div className='flex items-start justify-between mb-3'>
        <div className='text-[10px] font-mono text-slate-400 tracking-widest leading-tight'>{label}</div>
        {Icon && <Icon size={14} className='text-slate-300 flex-shrink-0' />}
      </div>
      {loading ? (
        <div className='h-7 w-20 bg-slate-100 rounded-lg animate-pulse mb-1.5' />
      ) : (
        <div className={`text-2xl font-bold leading-none mb-1.5 ${valColor}`}>
          {value ?? <span className='text-slate-300'>-</span>}
        </div>
      )}
      {sub && <div className='text-xs text-slate-400'>{sub}</div>}
    </div>
  )
}

export default StatCard
