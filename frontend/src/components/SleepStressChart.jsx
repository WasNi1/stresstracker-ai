import { LuInfo } from 'react-icons/lu'
import { ChartSkeleton, EmptyChart } from './ChartSkeletons'

export function SleepStressChart({ data, loading, pearson }) {
  if (loading) return <ChartSkeleton height={100} />
  if (!data || data.length === 0) return <EmptyChart height={100} />

  const barColor = ['bg-red-400/75', 'bg-amber-400/75', 'bg-blue-400/75', 'bg-teal-400/75']

  return (
    <div>
      <div className='flex gap-3 items-end' style={{ height: 100 }}>
        <div className='flex flex-col justify-between h-full text-right pr-1' style={{ minWidth: 50 }}>
          {[4, 3, 2, 1].map(v => (
            <span key={v} className='text-[9px] font-mono text-slate-400'>Stress {v}</span>
          ))}
        </div>
        <div className='flex-1 flex gap-4 items-end h-full'>
          {data.map((d, i) => (
            <div key={i} className='flex flex-col items-center flex-1 gap-1.5 group relative'>
              <div className='absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 bg-slate-700 text-white text-[10px] font-mono px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none'>
                Stress avg: {d.stressAvg}
              </div>
              <div
                className={`w-full rounded-t-md ${barColor[i]}`}
                style={{ height: `${d.pct}%`, minHeight: 4 }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className='flex mt-2' style={{ paddingLeft: 58 }}>
        <div className='flex-1 flex gap-4'>
          {data.map((d, i) => (
            <div key={i} className='flex-1 text-center text-[10px] text-slate-400'>{d.label}</div>
          ))}
        </div>
      </div>
      <div className='text-center text-[11px] text-slate-400 mt-2'>Kualitas Tidur (PSQI)</div>
      <div className='mt-4 pt-4 border-t border-slate-100 flex items-start gap-2'>
        <LuInfo size={13} className='text-slate-400 flex-shrink-0 mt-0.5' />
        <p className='text-xs text-slate-400 leading-relaxed'>
          Korelasi Pearson r ={' '}
          <span className='font-mono text-slate-600'>
            {pearson ?? '-'}
          </span>{' '}
          (kuat negatif). Artinya tidur buruk sangat konsisten memperburuk stress harianmu.
        </p>
      </div>
    </div>
  )
}
