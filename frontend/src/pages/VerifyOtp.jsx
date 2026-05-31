import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LuHeart, LuMailCheck, LuArrowRight } from 'react-icons/lu'
import { verifyOtp } from '../api/auth'

function VerifyOtp() {
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState(location.state?.email || '')
  const [otpCode, setOtpCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Email harus valid')
      return
    }
    if (!otpCode.trim()) {
      setError('Kode OTP wajib diisi')
      return
    }

    try {
      setLoading(true)
      const response = await verifyOtp({ email: email.trim().toLowerCase(), otpCode: otpCode.trim() })
      setSuccess(response.data?.message || 'Verifikasi berhasil!')
      setTimeout(() => navigate('/', { replace: true }), 900)
    } catch (err) {
      setError(err.response?.data?.message || 'Verifikasi OTP gagal. Periksa kode OTP kamu.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-teal-50/40 flex items-center justify-center p-8'>
      <div className='w-full max-w-md bg-white/80 backdrop-blur-xl border border-white/80 shadow-xl shadow-teal-100/50 rounded-[32px] p-10'>
        <div className='flex items-center gap-2 mb-8'>
          <LuHeart size={22} className='text-teal-500' />
          <span className='text-teal-600 font-bold text-xl'>StressTracker AI</span>
        </div>

        <div className='w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center mb-5'>
          <LuMailCheck size={26} className='text-teal-500' />
        </div>

        <h1 className='text-3xl font-bold text-slate-800'>Verifikasi email</h1>
        <p className='text-slate-400 mt-2 text-sm'>Masukkan kode OTP yang dikirim ke email kamu.</p>

        {error && <div className='mt-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-sm text-red-700'>{error}</div>}
        {success && <div className='mt-6 p-4 bg-teal-50 border border-teal-200 rounded-2xl text-sm text-teal-700'>{success}</div>}

        <form onSubmit={handleSubmit} className='mt-8 flex flex-col gap-4'>
          <div className='flex flex-col gap-1.5'>
            <label className='text-sm font-medium text-slate-600'>Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              placeholder='nama@email.com'
              className='w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-50 disabled:opacity-50'
            />
          </div>

          <div className='flex flex-col gap-1.5'>
            <label className='text-sm font-medium text-slate-600'>Kode OTP</label>
            <input
              type='text'
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              disabled={loading}
              placeholder='Masukkan kode OTP'
              className='w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-50 disabled:opacity-50'
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className='mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white py-4 rounded-2xl font-semibold shadow-lg shadow-teal-200 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed'
          >
            {loading ? 'Memverifikasi...' : 'Verifikasi'}
            <LuArrowRight size={16} />
          </button>
        </form>

        <p className='text-center text-sm text-slate-400 mt-6'>
          Sudah terverifikasi?{' '}
          <Link to='/' className='text-teal-500 hover:text-teal-600 font-semibold'>Masuk</Link>
        </p>
      </div>
    </div>
  )
}

export default VerifyOtp
