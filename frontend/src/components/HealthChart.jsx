import { LuActivity } from 'react-icons/lu'

const data = [
  { day: 'Sen', value: 45, height: 90 },
  { day: 'Sel', value: 62, height: 124 },
  { day: 'Rab', value: 78, height: 156 },
  { day: 'Kam', value: 55, height: 110 },
  { day: 'Jum', value: 88, height: 176 },
  { day: 'Sab', value: 40, height: 80 },
  { day: 'Min', value: 70, height: 140 },
]

function HealthChart() {
  return (
    <div className='bg-white rounded-3xl border border-slate-100 p-6 shadow-sm'>
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center gap-2'>
          <div className='w-9 h-9 bg-teal-50 rounded-xl flex items-center justify-center'>
            <LuActivity size={18} className='text-teal-500' />
          </div>
          <div>
            <h2 className='text-base font-bold text-slate-800'>Stress Analytics</h2>
            <p className='text-xs text-slate-400'>Minggu ini</p>
          </div>
        </div>
        <div className='flex gap-2'>
          {['Minggu', 'Bulan'].map((t, i) => (
            <button key={t} className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-colors ${
              i === 0 ? 'bg-teal-500 text-white' : 'text-slate-400 hover:bg-slate-50'
            }`}>{t}</button>
          ))}
        </div>
      </div>

      <div className='flex items-end gap-3 h-[180px]'>
        {data.map(({ day, value, height }) => (
          <div key={day} className='flex-1 flex flex-col items-center gap-2'>
            <span className='text-xs text-slate-400 font-medium'>{value}</span>
            <div
              className='w-full rounded-t-2xl bg-gradient-to-t from-teal-500 to-emerald-400 opacity-80 hover:opacity-100 transition-opacity cursor-pointer'
              style={{ height: `${height}px` }}
            ></div>
            <span className='text-xs text-slate-400'>{day}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HealthChart
