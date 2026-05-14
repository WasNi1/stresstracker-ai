import {
  LuActivity,
  LuMoon,
  LuDroplets,
  LuSmartphone,
  LuBrain,
  LuCoffee,
  LuShield,
  LuTriangleAlert,
} from 'react-icons/lu'
import { stressBarBg } from './TrendInsightUtils'

const faktorIconMap = {
  LuActivity,
  LuMoon,
  LuDroplets,
  LuSmartphone,
  LuBrain,
  LuCoffee,
}

export function FaktorRow({ item }) {
  const isRisiko  = item.type === 'risiko'
  const barWidth  = Math.min(Math.abs(item.impact) / 1, 1) * 100
  const IconComp  = faktorIconMap[item.iconKey] ?? LuActivity

  return (
    <div className='flex items-start gap-3 py-3.5 border-b border-slate-100 last:border-0'>
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
        isRisiko ? 'bg-red-50' : 'bg-teal-50'
      }`}>
        <IconComp size={14} className={isRisiko ? 'text-red-400' : 'text-teal-500'} />
      </div>
      <div className='flex-1 min-w-0'>
        <div className='flex items-center justify-between gap-2 mb-1'>
          <span className='text-sm text-slate-700 font-medium'>{item.label}</span>
          <span className={`text-xs font-mono font-semibold flex-shrink-0 ${isRisiko ? 'text-red-400' : 'text-teal-500'}`}>
            {isRisiko ? '+' : ''}{item.impact} level
          </span>
        </div>
        <div className='text-xs text-slate-400 mb-2'>{item.desc}</div>
        <div className='h-1.5 bg-slate-100 rounded-full overflow-hidden'>
          <div
            className={`h-full rounded-full transition-all ${isRisiko ? 'bg-red-400/70' : 'bg-teal-400/70'}`}
            style={{ width: `${barWidth}%` }}
          />
        </div>
      </div>
      <div className='flex-shrink-0 mt-1'>
        {isRisiko
          ? <LuTriangleAlert size={13} className='text-red-400/60' />
          : <LuShield size={13} className='text-teal-400/60' />
        }
      </div>
    </div>
  )
}

export function FaktorEmpty({ message }) {
  return (
    <div className='py-6 text-center text-xs text-slate-300 italic'>{message}</div>
  )
}
