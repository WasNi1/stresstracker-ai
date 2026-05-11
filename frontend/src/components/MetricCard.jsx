import { LuBrain, LuHeart, LuSmile, LuDroplets } from 'react-icons/lu'
import { LuTrendingUp, LuTrendingDown } from 'react-icons/lu'

const iconMap = {
  brain: <LuBrain size={20} className='text-teal-500' />,
  heart: <LuHeart size={20} className='text-teal-500' />,
  mood: <LuSmile size={20} className='text-teal-500' />,
  water: <LuDroplets size={20} className='text-teal-500' />,
}

function MetricCard({ title, value, desc, icon = 'brain', trend = 'up' }) {
  return (
    <div className='bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:shadow-md hover:shadow-teal-50 transition-all'>
      <div className='flex items-start justify-between'>
        <div className='w-11 h-11 bg-teal-50 rounded-2xl flex items-center justify-center'>
          {iconMap[icon]}
        </div>
        <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
          trend === 'up' ? 'bg-emerald-50 text-emerald-500' : 'bg-rose-50 text-rose-400'
        }`}>
          {trend === 'up'
            ? <LuTrendingUp size={12} />
            : <LuTrendingDown size={12} />
          }
        </span>
      </div>

      <p className='text-slate-400 text-sm mt-4'>{title}</p>
      <h2 className='text-2xl font-bold text-slate-800 mt-1'>{value}</h2>
      <p className='text-xs text-slate-400 mt-1.5'>{desc}</p>
    </div>
  )
}

export default MetricCard
