import { useState, useRef, useEffect } from 'react'
import { IoSearchOutline, IoNotificationsOutline } from 'react-icons/io5'
import { LuChevronDown } from 'react-icons/lu'
import { useApp } from '../context/AppContext'

function Topbar({ title }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const { user } = useApp()

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const today = new Date().toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  })

  const displayName = user?.name || user?.nama || null
  const firstName   = displayName ? displayName.split(' ')[0] : 'Guest'
  const initial     = displayName ? displayName.charAt(0).toUpperCase() : 'G'

  return (
    <div className='bg-white/80 backdrop-blur border-b border-slate-100 px-4 md:px-8 py-4 flex items-center justify-between sticky top-0 z-10'>
      <div>
        <h1 className='text-lg md:text-xl font-bold text-slate-800'>{title}</h1>
        <p className='text-xs text-slate-400 mt-0.5 hidden sm:block'>{today}</p>
      </div>

      {/* <div className='flex items-center gap-2 md:gap-3'>
        <div className='flex items-center gap-2 md:gap-2.5 bg-slate-50 border border-slate-100 rounded-2xl px-2 md:px-3 py-2 cursor-pointer hover:bg-teal-50 transition-colors'>
          <div className='w-6 h-6 md:w-7 md:h-7 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white text-xs font-bold shrink-0'>
            {initial}
          </div>
          <span className={`text-sm font-semibold hidden sm:block ${displayName ? 'text-slate-700' : 'text-slate-300 italic'}`}>
            {firstName}
          </span>
          <LuChevronDown size={14} className='text-slate-400 hidden sm:block' />
        </div>
      </div> */}
    </div>
  )
}

export default Topbar
