import { Link, useLocation } from 'react-router-dom'
import { LuLayoutDashboard, LuUser, LuSettings } from 'react-icons/lu'
import { MdFavorite } from 'react-icons/md'

const navItems = [
  { to: '/dashboard', icon: <LuLayoutDashboard size={18} />, label: 'Dashboard' },
  { to: '/profile', icon: <LuUser size={18} />, label: 'Profile' },
  { to: '/settings', icon: <LuSettings size={18} />, label: 'Settings' },
]

function Sidebar() {
  const { pathname } = useLocation()

  return (
    <div className='w-[260px] min-h-screen bg-white border-r border-slate-100 flex flex-col p-5'>
      {/* Logo */}
      <div className='flex items-center gap-3 px-2 mb-10'>
        <div className='w-10 h-10 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-md shadow-teal-100'>
          <MdFavorite size={20} className='text-white' />
        </div>
        <div>
          <h1 className='text-base font-bold text-slate-800 leading-none'>HealthTrack</h1>
          <p className='text-xs text-slate-400 mt-0.5'>AI Wellness Monitor</p>
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

      {/* Bottom Profile */}
      <div className='mt-6 bg-teal-50 rounded-2xl p-4 flex items-center gap-3'>
        <img src='https://i.pravatar.cc/40' alt='profile' className='w-9 h-9 rounded-xl object-cover' />
        <div className='flex-1 min-w-0'>
          <p className='text-sm font-semibold text-slate-700 truncate'>Nova Wijaya</p>
          <p className='text-xs text-teal-500'>Healthy Lifestyle</p>
        </div>
        <LuSettings size={15} className='text-slate-300' />
      </div>
    </div>
  )
}

export default Sidebar
