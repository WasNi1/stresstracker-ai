import { LuCircleCheck, LuTriangleAlert, LuInfo, LuCircleX, LuX } from 'react-icons/lu'

const STATUS_CONFIG = {
  200: {
    type: 'success',
    title: 'Berhasil',
    message: 'Permintaan berhasil diproses.',
    icon: LuCircleCheck,
    className: 'border-emerald-100 bg-emerald-50 text-emerald-700',
    iconClassName: 'text-emerald-500',
  },
  201: {
    type: 'success',
    title: 'Berhasil dibuat',
    message: 'Data berhasil dibuat.',
    icon: LuCircleCheck,
    className: 'border-emerald-100 bg-emerald-50 text-emerald-700',
    iconClassName: 'text-emerald-500',
  },
  400: {
    type: 'error',
    title: 'Bad Request',
    message: 'Data yang dikirim belum sesuai.',
    icon: LuTriangleAlert,
    className: 'border-amber-100 bg-amber-50 text-amber-700',
    iconClassName: 'text-amber-500',
  },
  401: {
    type: 'error',
    title: 'Unauthorized',
    message: 'Sesi kamu sudah habis. Silakan login kembali.',
    icon: LuCircleX,
    className: 'border-red-100 bg-red-50 text-red-700',
    iconClassName: 'text-red-500',
  },
  404: {
    type: 'error',
    title: 'Data tidak ditemukan',
    message: 'Data yang dicari tidak tersedia.',
    icon: LuInfo,
    className: 'border-sky-100 bg-sky-50 text-sky-700',
    iconClassName: 'text-sky-500',
  },
  500: {
    type: 'error',
    title: 'Server error',
    message: 'Terjadi kesalahan pada server.',
    icon: LuCircleX,
    className: 'border-red-100 bg-red-50 text-red-700',
    iconClassName: 'text-red-500',
  },
}

function getStatusConfig(status) {
  if (!status) return null
  return STATUS_CONFIG[status] || {
    type: status >= 200 && status < 300 ? 'success' : 'error',
    title: status >= 200 && status < 300 ? 'Berhasil' : 'Terjadi kesalahan',
    message: status >= 200 && status < 300 ? 'Permintaan berhasil diproses.' : 'Permintaan gagal diproses.',
    icon: status >= 200 && status < 300 ? LuCircleCheck : LuCircleX,
    className: status >= 200 && status < 300
      ? 'border-emerald-100 bg-emerald-50 text-emerald-700'
      : 'border-red-100 bg-red-50 text-red-700',
    iconClassName: status >= 200 && status < 300 ? 'text-emerald-500' : 'text-red-500',
  }
}

function ResponseMessage({ status, title, message, onClose, className = '' }) {
  const config = getStatusConfig(status)
  if (!config) return null

  const Icon = config.icon

  return (
    <div className={`rounded-2xl border px-4 py-3 flex items-start gap-3 ${config.className} ${className}`}>
      <Icon size={20} className={`mt-0.5 shrink-0 ${config.iconClassName}`} />
      <div className='flex-1'>
        <p className='text-sm font-semibold'>{title || config.title}</p>
        <p className='text-xs mt-0.5 opacity-80'>{message || config.message}</p>
      </div>
      {onClose && (
        <button
          type='button'
          onClick={onClose}
          className='p-1 rounded-lg hover:bg-white/50 transition-colors'
          aria-label='Tutup pesan'
        >
          <LuX size={15} />
        </button>
      )}
    </div>
  )
}

export default ResponseMessage
export { STATUS_CONFIG }
