export function Section({ title, sub, children, light = false }) {
  if (light) {
    return (
      <div className='bg-white border border-slate-100 shadow-sm rounded-3xl p-6 md:p-7 mb-5'>
        <div className='mb-5'>
          <div className='text-base font-semibold text-slate-800'>{title}</div>
          {sub && <div className='text-xs text-slate-400 mt-1'>{sub}</div>}
        </div>
        {children}
      </div>
    )
  }
  return (
    <div className='bg-white border border-slate-100 shadow-sm rounded-3xl p-5 md:p-6 mb-5'>
      <div className='mb-4'>
        <div className='text-sm font-semibold text-slate-700'>{title}</div>
        {sub && <div className='text-xs text-slate-400 mt-0.5'>{sub}</div>}
      </div>
      {children}
    </div>
  )
}
