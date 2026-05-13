import { LuX, LuCheck } from 'react-icons/lu'

export const initialNotifications = [
  {
    id: 1,
    title: 'Stress level meningkat',
    desc: 'Level stressmu naik 12% dibanding kemarin.',
    time: '5 menit lalu',
    read: false,
    dot: 'bg-red-400',
  },
  {
    id: 2,
    title: 'Pengingat input harian',
    desc: 'Kamu belum mengisi log hari ini. Yuk isi sekarang!',
    time: '1 jam lalu',
    read: false,
    dot: 'bg-amber-400',
  },
  {
    id: 3,
    title: 'Streak 7 hari! 🔥',
    desc: 'Kamu berhasil input 7 hari berturut-turut.',
    time: '2 jam lalu',
    read: true,
    dot: 'bg-teal-400',
  },
]

function NotificationPopup({ notifs, unreadCount, onMarkRead, onMarkAllRead, onClose }) {
  return (
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
              onClick={onMarkAllRead}
              className='text-[11px] text-teal-500 hover:text-teal-600 font-medium flex items-center gap-1'
            >
              <LuCheck size={11} />
              Tandai semua
            </button>
          )}
          <button onClick={onClose} className='text-slate-300 hover:text-slate-500'>
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
              onClick={() => onMarkRead(n.id)}
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
  )
}

export default NotificationPopup
