import { stressColor } from './TrendInsightUtils'
import { ChartSkeleton, EmptyChart } from './ChartSkeletons'

export function TrendChart({ metric, data, loading }) {
  if (loading) return <ChartSkeleton height={80} />
  if (!data || data.length === 0) return <EmptyChart height={80} />

  const maxVal = metric === 'stress' ? 4 : 10
  const vals   = data.map(d => d[metric])
  const avg    = (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1)

  return (
    <div>
      <div className='flex items-end gap-1' style={{ height: 80 }}>
        {data.map((d, i) => {
          const val = d[metric]
          const pct = (val / maxVal) * 100
          const col = metric === 'stress' ? stressColor(val) : '#2dd4bf'
          return (
            <div key={i} className='flex flex-col items-center flex-1 gap-0.5 group relative'>
              <div className='absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 bg-slate-700 text-white text-[10px] font-mono px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none'>
                {d.day}: {val}{d.olahraga && metric === 'stress' ? ' 🏃' : ''}
              </div>
              <div
                className='w-full rounded-t-sm transition-all'
                style={{
                  height: `${pct}%`,
                  minHeight: 3,
                  background: col,
                  opacity: 0.75,
                  outline: d.olahraga && metric === 'stress' ? '1.5px solid rgba(45,212,191,0.6)' : 'none',
                  outlineOffset: '1px',
                }}
              />
            </div>
          )
        })}
      </div>
      <div className='flex mt-1.5'>
        {data.map((d, i) => (
          <div key={i} className='flex-1 text-center'>
            {i % 5 === 0 && (
              <span className='text-[9px] font-mono text-slate-400'>{d.day}</span>
            )}
          </div>
        ))}
      </div>
      <div className='flex items-center justify-between mt-2'>
        <span className='text-[11px] text-slate-400'>
          Rata-rata: <span className='font-mono text-slate-600'>{avg}</span>
          {metric === 'stress' ? ' / 4' : ' / 10'}
        </span>
        {metric === 'stress' && (
          <div className='flex items-center gap-1.5 text-[11px] text-slate-400'>
            <span className='w-2.5 h-2.5 rounded-sm border border-teal-400/60 inline-block' />
            Hari olahraga
          </div>
        )}
      </div>
    </div>
  )
}
