import { useState, useRef, useEffect } from 'react'
import { IoSearchOutline, IoNotificationsOutline } from 'react-icons/io5'
import { LuChevronDown, LuX, LuCheck } from 'react-icons/lu'

const initialNotifications = [
  {
    id: 1,
    title: 'Stress level meningkat',
    desc: 'Level stressmu naik 12% dibanding kemarin.',
    time: '5 menit lalu',
    read: false,
    color: 'bg-red-50 border-red-100',
    dot: 'bg-red-400',
  },
  {
    id: 2,
    title: 'Pengingat input harian',
    desc: 'Kamu belum mengisi log hari ini. Yuk isi sekarang!',
    time: '1 jam lalu',
    read: false,
    color: 'bg-amber-50 border-amber-100',
    dot: 'bg-amber-400',
  },
  {
    id: 3,
    title: 'Streak 7 hari! 🔥',
    desc: 'Kamu berhasil input 7 hari berturut-turut.',
    time: '2 jam lalu',
    read: true,
    color: 'bg-teal-50 border-teal-100',
    dot: 'bg-teal-400',
  },
]

function Topbar({ title }) {
  const [open, setOpen] = useState(false)
  const [notifs, setNotifs] = useState(initialNotifications)
  const ref = useRef(null)

  const unreadCount = notifs.filter(n => !n.read).length

  const markAllRead = () => setNotifs(notifs.map(n => ({ ...n, read: true })))
  const markRead = (id) => setNotifs(notifs.map(n => n.id === id ? { ...n, read: true } : n))

  // Tutup popup kalau klik di luar
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

  return (
    <div className='bg-white/80 backdrop-blur border-b border-slate-100 px-8 py-4 flex items-center justify-between sticky top-0 z-10'>
      <div>
        <h1 className='text-xl font-bold text-slate-800'>{title}</h1>
        <p className='text-xs text-slate-400 mt-0.5'>{today}</p>
      </div>

      <div className='flex items-center gap-3'>
        {/* Search */}
        <div className='flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-2xl px-4 py-2.5'>
          <IoSearchOutline size={16} className='text-slate-300' />
          <input
            type='text'
            placeholder='Cari...'
            className='bg-transparent outline-none text-sm text-slate-600 placeholder:text-slate-300 w-36'
          />
        </div>

        {/* Notifikasi */}
        <div className='relative' ref={ref}>
          <button
            onClick={() => setOpen(!open)}
            className='relative w-10 h-10 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center hover:bg-teal-50 transition-colors'
          >
            <IoNotificationsOutline size={18} className='text-slate-500' />
            {unreadCount > 0 && (
              <span className='absolute top-2 right-2 w-2 h-2 bg-teal-500 rounded-full'></span>
            )}
          </button>

          {/* Popup */}
          {open && (
            <div className='absolute right-0 top-12 w-80 bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/60 overflow-hidden z-50'>
              {/* Header */}
              <div className='flex items-center justify-between px-4 py-3 border-b border-slate-100'>
                <div className='flex items-center gap-2'>
                  <span className='text-sm font-semibold text-slate-700'>Notifikasi</span>
                  {unreadCount > 0 && (
                    <span className='text-[10px] font-bold bg-teal-500 text-white px-1.5 py-0.5 rounded-full'>
                      {unreadCount}
                    </span>
                  )}
                </div>
                <div className='flex items-center gap-2'>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className='text-[11px] text-teal-500 hover:text-teal-600 font-medium flex items-center gap-1'
                    >
                      <LuCheck size={11} />
                      Tandai semua
                    </button>
                  )}
                  <button onClick={() => setOpen(false)} className='text-slate-300 hover:text-slate-500'>
                    <LuX size={15} />
                  </button>
                </div>
              </div>

              {/* List */}
              <div className='max-h-72 overflow-y-auto'>
                {notifs.length === 0 ? (
                  <div className='py-10 text-center text-slate-300 text-sm'>
                    Tidak ada notifikasi
                  </div>
                ) : (
                  notifs.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markRead(n.id)}
                      className={`flex items-start gap-3 px-4 py-3.5 border-b border-slate-50 cursor-pointer hover:bg-slate-50 transition-colors ${!n.read ? 'bg-slate-50/80' : 'bg-white'}`}
                    >
                      <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.read ? 'bg-slate-200' : n.dot}`} />
                      <div className='flex-1 min-w-0'>
                        <p className={`text-sm font-medium ${n.read ? 'text-slate-400' : 'text-slate-700'}`}>
                          {n.title}
                        </p>
                        <p className='text-xs text-slate-400 mt-0.5 leading-relaxed'>{n.desc}</p>
                        <p className='text-[10px] text-slate-300 mt-1'>{n.time}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className='px-4 py-2.5 border-t border-slate-100 text-center'>
                <button className='text-xs text-teal-500 hover:text-teal-600 font-medium'>
                  Lihat semua notifikasi
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
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
