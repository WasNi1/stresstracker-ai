import { Link } from 'react-router-dom'
import { LuClipboardList, LuRefreshCw } from 'react-icons/lu'

function EmptyState({ onRetry }) {
  return (
    <div className='flex flex-col items-center justify-center py-20 px-6 text-center'>
      <div className='w-20 h-20 bg-teal-50 rounded-3xl flex items-center justify-center mb-6 shadow-sm'>
        <LuClipboardList size={36} className='text-teal-400' />
      </div>

      <h2 className='text-xl font-bold text-slate-700 mb-2'>
        Belum ada data hari ini
      </h2>

      <p className='text-sm text-slate-400 leading-relaxed max-w-xs mb-8'>
        Mulai isi Input Harian untuk melihat dashboard kesehatan mentalmu secara personal.
      </p>

      <div className='flex flex-col sm:flex-row items-center gap-3'>
        <Link
          to='/input-harian'
          className='flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white text-sm font-semibold rounded-2xl shadow-md shadow-teal-100 transition-all active:scale-[0.98]'
        >
          <LuClipboardList size={16} />
          Isi Input Harian
        </Link>

        {onRetry && (
          <button
            onClick={onRetry}
            className='flex items-center gap-2 px-5 py-3 border border-slate-200 text-slate-500 text-sm font-medium rounded-2xl hover:border-teal-300 hover:text-teal-500 transition-all'
          >
            <LuRefreshCw size={15} />
            Coba lagi
          </button>
        )}
      </div>
    </div>
  )
}

export default EmptyState
