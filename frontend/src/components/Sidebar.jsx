import { Link, useLocation } from 'react-router-dom'
import {
  LuLayoutDashboard,
  LuClipboardList,
  LuHistory,
  LuUserCog,
  LuBrainCircuit,
  LuLightbulb,
} from 'react-icons/lu'

const navItems = [
  { to: '/', icon: <LuLayoutDashboard size={18} />, label: 'Dashboard' },
  { to: '/input-harian', icon: <LuClipboardList size={18} />,  label: 'Input Harian' },
  { to: '/riwayat', icon: <LuHistory size={18} />, label: 'Riwayat' },
  { to: '/akun',         icon: <LuUserCog size={18} />,        label: 'Akun' },
]

function Sidebar() {
  const { pathname } = useLocation()

  return (
    <div className='w-[260px] h-screen sticky top-0 bg-white border-r border-slate-100 flex flex-col p-5'>
      {/* Logo */}
      <div className='flex items-center gap-3 px-2 mb-10'>
        <div className='w-10 h-10 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-md shadow-teal-100'>
          <LuBrainCircuit size={20} className='text-white' />
        </div>
        <div>
          <h1 className='text-base font-bold text-slate-800 leading-none'>StressTracker</h1>
          <p className='text-xs text-teal-500 mt-0.5 font-medium'>AI Wellness Monitor</p>
        </div>
      </div>

      {/* Nav */}
      <nav className='flex flex-col gap-1 flex-1'>
        <p className='text-xs font-semibold text-slate-300 uppercase tracking-widest px-3 mb-2'>Menu</p>
        {navItems.map(({ to, icon, label }) => {
          const active = pathname === to
          return (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-medium text-sm transition-all ${
                active
                  ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-md shadow-teal-100'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`}
            >
              {icon}
              {label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

export default Sidebar