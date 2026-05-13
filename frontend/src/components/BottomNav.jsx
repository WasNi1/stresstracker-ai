import { Link, useLocation } from 'react-router-dom'
import {
  LuLayoutDashboard,
  LuClipboardList,
  LuHistory,
  LuTrendingUp,
  LuUser,
} from 'react-icons/lu'

const navItems = [
  { to: '/',             icon: <LuLayoutDashboard size={20} />, label: 'Home' },
  { to: '/input-harian', icon: <LuClipboardList size={20} />,  label: 'Input' },
  { to: '/riwayat',      icon: <LuHistory size={20} />,        label: 'Riwayat' },
  { to: '/trend-insight',icon: <LuTrendingUp size={20} />,     label: 'Insight' },
  { to: '/profile',      icon: <LuUser size={20} />,           label: 'Profil' },
]

function BottomNav() {
  const { pathname } = useLocation()

  return (
    <div className='fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 z-50 px-2 py-2 flex items-center justify-around'>
      {navItems.map(({ to, icon, label }) => {
        const active = pathname === to
        return (
          <Link
            key={to}
            to={to}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-2xl transition-all ${
              active ? 'text-teal-500' : 'text-slate-400'
            }`}
          >
            {icon}
            <span className='text-[10px] font-medium'>{label}</span>
            {active && <span className='w-1 h-1 bg-teal-500 rounded-full' />}
          </Link>
        )
      })}
    </div>
  )
}

export default BottomNav
