import { LuMoon } from 'react-icons/lu'

const stages = [
  { label: 'Deep', value: '2.5j', color: 'bg-teal-400' },
  { label: 'Light', value: '3.5j', color: 'bg-emerald-400' },
  { label: 'REM', value: '1.5j', color: 'bg-cyan-400' },
]

function SleepCard({ empty = false }) {
  return (
    <div className='bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 text-white shadow-sm'>
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center gap-2'>
          <div className='w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center'>
            <LuMoon size={16} className='text-teal-300' />
          </div>
          <h2 className='text-base font-bold'>Sleep Quality</h2>
        </div>
        <span className='text-xs bg-white/10 px-3 py-1 rounded-full'>Semalam</span>
      </div>

      {empty ? (
        <div className='flex flex-col items-center justify-center py-8 gap-2'>
          <LuMoon size={32} className='text-white/20' />
          <p className='text-sm text-white/40 font-medium'>Belum ada data</p>
        </div>
      ) : (
        <>
          <div className='flex items-center justify-center my-4'>
            <div className='relative w-32 h-32'>
              <svg className='w-full h-full -rotate-90' viewBox='0 0 100 100'>
                <circle cx='50' cy='50' r='40' fill='none' stroke='rgba(255,255,255,0.1)' strokeWidth='10' />
                <circle cx='50' cy='50' r='40' fill='none' stroke='url(#sleepGrad)' strokeWidth='10' strokeDasharray='251' strokeDashoffset='63' strokeLinecap='round' />
                <defs>
                  <linearGradient id='sleepGrad' x1='0%' y1='0%' x2='100%' y2='0%'>
                    <stop offset='0%' stopColor='#2dd4bf' />
                    <stop offset='100%' stopColor='#34d399' />
                  </linearGradient>
                </defs>
              </svg>
              <div className='absolute inset-0 flex flex-col items-center justify-center'>
                <span className='text-3xl font-bold'>7.5</span>
                <span className='text-xs text-slate-400'>jam</span>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-3 gap-2 mt-4'>
            {stages.map(({ label, value, color }) => (
              <div key={label} className='bg-white/5 rounded-2xl p-3 text-center'>
                <div className={`w-2 h-2 ${color} rounded-full mx-auto mb-1.5`}></div>
                <p className='text-xs text-slate-400'>{label}</p>
                <p className='text-sm font-bold mt-0.5'>{value}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default SleepCard
