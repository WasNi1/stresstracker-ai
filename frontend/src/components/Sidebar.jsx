import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <div className='w-[260px] bg-white border-r border-teal-100 p-6'>
      <div className='mb-10'>
        <h1 className='text-2xl font-bold text-teal-600'>
          HealthTrack
        </h1>

        <p className='text-slate-400 text-sm mt-1'>
          AI Wellness Monitor
        </p>
      </div>

      <nav className='flex flex-col gap-3'>
        <Link
          to='/dashboard'
          className='bg-teal-50 text-teal-600 px-4 py-3 rounded-2xl font-medium'
        >
          Dashboard
        </Link>

        <Link
          to='/analytics'
          className='text-slate-600 px-4 py-3 rounded-2xl hover:bg-slate-100'
        >
          Analytics
        </Link>

        <Link
          to='/profile'
          className='text-slate-600 px-4 py-3 rounded-2xl hover:bg-slate-100'
        >
          Profile
        </Link>

        <Link
          to='/settings'
          className='text-slate-600 px-4 py-3 rounded-2xl hover:bg-slate-100'
        >
          Settings
        </Link>
      </nav>
    </div>
  )
}

export default Sidebar