import { LuSparkles } from 'react-icons/lu'
import { GiMeditation } from 'react-icons/gi'
import { FaPersonWalking, FaFire } from 'react-icons/fa6'
import { LuDroplets } from 'react-icons/lu'

const activities = [
  { icon: <GiMeditation size={18} className='text-teal-500' />, label: 'Meditasi', value: '10 Menit', progress: 100, target: '10 mnt' },
  { icon: <LuDroplets size={18} className='text-teal-500' />, label: 'Minum Air', value: '2 Liter', progress: 80, target: '2.5 L' },
  { icon: <FaPersonWalking size={18} className='text-teal-500' />, label: 'Jalan Kaki', value: '5.2 KM', progress: 65, target: '8 KM' },
  { icon: <FaFire size={18} className='text-teal-500' />, label: 'Kalori', value: '420 kkal', progress: 55, target: '750 kkal' },
]

function ActivityCard() {
  return (
    <div className='bg-white rounded-3xl border border-slate-100 p-6 shadow-sm'>
      <div className='flex items-center justify-between mb-5'>
        <div className='flex items-center gap-2'>
          <div className='w-9 h-9 bg-teal-50 rounded-xl flex items-center justify-center'>
            <LuSparkles size={18} className='text-teal-500' />
          </div>
          <h2 className='text-base font-bold text-slate-800'>Aktivitas Hari Ini</h2>
        </div>
        <span className='text-xs text-teal-500 font-semibold bg-teal-50 px-3 py-1 rounded-full'>Hari ini</span>
      </div>

      <div className='flex flex-col gap-4'>
        {activities.map(({ icon, label, value, progress, target }) => (
          <div key={label}>
            <div className='flex items-center justify-between mb-1.5'>
              <div className='flex items-center gap-2'>
                {icon}
                <span className='text-sm font-medium text-slate-600'>{label}</span>
              </div>
              <div className='text-right'>
                <span className='text-sm font-bold text-slate-800'>{value}</span>
                <span className='text-xs text-slate-300 ml-1'>/ {target}</span>
              </div>
            </div>
            <div className='w-full h-2 bg-slate-100 rounded-full'>
              <div
                className='h-2 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full transition-all'
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ActivityCard
