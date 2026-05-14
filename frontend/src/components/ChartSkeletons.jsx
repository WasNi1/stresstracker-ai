import { LuActivity } from 'react-icons/lu'

export function ChartSkeleton({ height = 80 }) {
  return (
    <div
      className='flex items-end gap-1.5 animate-pulse'
      style={{ height }}
    >
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className='flex-1 bg-slate-100 rounded-t-sm'
          style={{ height: `${30 + Math.random() * 50}%` }}
        />
      ))}
    </div>
  )
}

export function EmptyChart({ message = 'Belum ada data', height = 80 }) {
  return (
    <div
      className='flex flex-col items-center justify-center gap-2 bg-slate-50 rounded-2xl border border-dashed border-slate-200'
      style={{ height }}
    >
      <LuActivity size={22} className='text-slate-200' />
      <p className='text-xs text-slate-300 font-medium'>{message}</p>
    </div>
  )
}

export function InsightSkeleton() {
  return (
    <div className='flex flex-col gap-3'>
      {[1, 2, 3].map(i => (
        <div key={i} className='h-14 rounded-2xl bg-slate-100 animate-pulse' />
      ))}
    </div>
  )
}

export function FaktorSkeleton() {
  return (
    <div className='flex flex-col gap-3 py-2'>
      {[1, 2, 3].map(i => (
        <div key={i} className='h-12 rounded-xl bg-slate-100 animate-pulse' />
      ))}
    </div>
  )
}
