import { stressBarBg } from './TrendInsightUtils'
import { ChartSkeleton, EmptyChart } from './ChartSkeletons'

export function PerHariChart({ data, loading }) {
  if (loading) return <ChartSkeleton height={80} />
  if (!data || data.length === 0) return <EmptyChart height={80} />

  const sorted   = [...data].sort((a, b) => b.stress - a.stress)
  const highest  = sorted[0]?.label ?? '-'
  const lowest   = sorted[sorted.length - 1]?.label ?? '-'

  return (
    <div>
      <div className='flex items-end gap-3' style={{ height: 80 }}>
        {data.map((d, i) => {
          const pct = (d.stress / 4) * 100
          return (
            <div key={i} className='flex flex-col items-center flex-1 gap-1 group relative'>
              <div className='absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 bg-slate-700 text-white text-[10px] font-mono px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none'>
                {d.label}: {d.stress}
              </div>
              <div
                className={`w-full rounded-t-md ${stressBarBg(d.stress)}`}
                style={{ height: `${pct}%`, minHeight: 4 }}
              />
            </div>
          )
        })}
      </div>
      <div className='flex gap-3 mt-2'>
        {data.map((d, i) => (
          <div key={i} className='flex-1 text-center text-[10px] font-mono text-slate-400'>{d.hari}</div>
        ))}
      </div>
      <div className='flex items-center justify-between mt-3'>
        <div className='text-xs text-slate-400'>
          Paling stress: <span className='text-red-400 font-medium'>{highest}</span>
        </div>
        <div className='text-xs text-slate-400'>
          Paling rileks: <span className='text-teal-500 font-medium'>{lowest}</span>
        </div>
      </div>
    </div>
  )
}
