function SkeletonCard({ className = '' }) {
  return (
    <div className={`bg-white rounded-3xl border border-slate-100 p-6 shadow-sm animate-pulse ${className}`}>
      <div className='flex items-start justify-between mb-4'>
        <div className='w-11 h-11 bg-slate-100 rounded-2xl' />
        <div className='w-8 h-5 bg-slate-100 rounded-full' />
      </div>
      <div className='w-24 h-3 bg-slate-100 rounded-full mb-2' />
      <div className='w-16 h-6 bg-slate-100 rounded-full mb-2' />
      <div className='w-32 h-3 bg-slate-100 rounded-full' />
    </div>
  )
}

export function SkeletonChart({ className = '' }) {
  return (
    <div className={`bg-white rounded-3xl border border-slate-100 p-6 shadow-sm animate-pulse ${className}`}>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <div className='w-32 h-4 bg-slate-100 rounded-full mb-2' />
          <div className='w-20 h-3 bg-slate-100 rounded-full' />
        </div>
        <div className='w-24 h-7 bg-slate-100 rounded-xl' />
      </div>
      <div className='flex items-end gap-3 h-[180px]'>
        {[90, 140, 110, 160, 80, 130, 100].map((h, i) => (
          <div key={i} className='flex-1 bg-slate-100 rounded-t-2xl' style={{ height: h }} />
        ))}
      </div>
    </div>
  )
}

export function SkeletonBlock({ className = '' }) {
  return (
    <div className={`bg-white rounded-3xl border border-slate-100 p-6 shadow-sm animate-pulse ${className}`}>
      <div className='w-40 h-4 bg-slate-100 rounded-full mb-4' />
      <div className='space-y-3'>
        <div className='w-full h-3 bg-slate-100 rounded-full' />
        <div className='w-4/5 h-3 bg-slate-100 rounded-full' />
        <div className='w-3/5 h-3 bg-slate-100 rounded-full' />
      </div>
    </div>
  )
}

export default SkeletonCard
