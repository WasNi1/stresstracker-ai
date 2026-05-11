import { IoSearchOutline, IoNotificationsOutline } from 'react-icons/io5'
import { LuChevronDown } from 'react-icons/lu'

function Topbar({ title }) {
  const today = new Date().toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  })

  return (
    <div className='bg-white/80 backdrop-blur border-b border-slate-100 px-8 py-4 flex items-center justify-between sticky top-0 z-10'>
      <div>
        <h1 className='text-xl font-bold text-slate-800'>{title}</h1>
        <p className='text-xs text-slate-400 mt-0.5'>{today}</p>
      </div>

      <div className='flex items-center gap-3'>
        <div className='flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-2xl px-4 py-2.5'>
          <IoSearchOutline size={16} className='text-slate-300' />
          <input
            type='text'
            placeholder='Cari...'
            className='bg-transparent outline-none text-sm text-slate-600 placeholder:text-slate-300 w-36'
          />
        </div>

        <button className='relative w-10 h-10 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center hover:bg-teal-50 transition-colors'>
          <IoNotificationsOutline size={18} className='text-slate-500' />
          <span className='absolute top-2 right-2 w-2 h-2 bg-teal-500 rounded-full'></span>
        </button>

        <div className='flex items-center gap-2.5 bg-slate-50 border border-slate-100 rounded-2xl px-3 py-2 cursor-pointer hover:bg-teal-50 transition-colors'>
          <img src='https://i.pravatar.cc/40' alt='profile' className='w-7 h-7 rounded-xl object-cover' />
          <span className='text-sm font-semibold text-slate-700'>Nova</span>
          <LuChevronDown size={14} className='text-slate-400' />
        </div>
      </div>
    </div>
  )
}

export default Topbar
