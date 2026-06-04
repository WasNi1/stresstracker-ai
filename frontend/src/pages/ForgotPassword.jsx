import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LuHeart, LuMail, LuArrowLeft, LuSend, LuCircleCheck, LuShieldCheck } from 'react-icons/lu'
import { requestPasswordOtp } from '../api/auth'

function ForgotPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitted(true)
    setError('')
    setMessage('')

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Masukkan email yang valid terlebih dahulu')
      return
    }

    setLoading(true)

    try {
      const response = await requestPasswordOtp({
        email: email.trim().toLowerCase(),
      })

      setMessage(response.data?.message || 'Kode OTP untuk reset password telah dikirim ke email Anda.')
      setTimeout(() => navigate('/reset-password', { state: { email: email.trim().toLowerCase() } }), 900)
    } catch (err) {
      console.error('Forgot password error:', err)

      if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else if (err.message === 'Network Error') {
        setError('Tidak bisa terhubung ke server. Cek koneksi internet Anda.')
      } else {
        setMessage('Jika email terdaftar, kode OTP reset password akan dikirim ke email tersebut.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex'>
      <div className='hidden lg:flex w-1/2 bg-gradient-to-br from-teal-400 via-emerald-400 to-teal-600 flex-col justify-between p-12 relative overflow-hidden'>
        <div className='absolute inset-0 opacity-10'>
          <div className='absolute top-20 left-20 w-64 h-64 rounded-full bg-white'></div>
          <div className='absolute bottom-20 right-10 w-96 h-96 rounded-full bg-white'></div>
          <div className='absolute top-1/2 left-1/3 w-32 h-32 rounded-full bg-white'></div>
        </div>

        <div className='relative z-10 flex items-center gap-3'>
          <div className='w-10 h-10 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center'>
            <LuHeart size={20} className='text-white' />
          </div>
          <span className='text-white font-bold text-xl'>StressTracker AI</span>
        </div>

        <div className='relative z-10'>
          <div className='w-14 h-14 bg-white/20 backdrop-blur rounded-3xl flex items-center justify-center mb-6'>
            <LuShieldCheck size={28} className='text-white' />
          </div>
          <h2 className='text-4xl font-bold text-white leading-tight'>
            Tenang, akunmu<br />bisa dipulihkan
          </h2>
          <p className='text-teal-100 mt-4 text-lg leading-relaxed'>
            Masukkan email akunmu dan kami akan membantu mengirimkan kode OTP reset password.
          </p>
        </div>

        <p className='relative z-10 text-teal-100 text-sm'>© 2025 StressTracker AI. All rights reserved.</p>
      </div>

      <div className='flex-1 bg-gradient-to-br from-slate-50 to-teal-50/40 flex items-center justify-center p-8'>
        <div className='w-full max-w-md'>
          <div className='bg-white/70 backdrop-blur-xl border border-white/80 shadow-xl shadow-teal-100/50 rounded-[32px] p-10'>
            <div className='lg:hidden flex items-center gap-2 mb-8'>
              <LuHeart size={22} className='text-teal-500' />
              <span className='text-teal-600 font-bold text-xl'>StressTracker AI</span>
            </div>

            <Link to='/login' className='inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-teal-500 transition-colors mb-6'>
              <LuArrowLeft size={16} />
              Kembali ke login
            </Link>

            <h1 className='text-3xl font-bold text-slate-800'>Lupa password?</h1>
            <p className='text-slate-400 mt-2 text-sm leading-relaxed'>
              Masukkan email yang terhubung dengan akun Anda. Kami akan mengirimkan kode OTP untuk mengatur ulang password.
            </p>

            {error && (
              <div className='mt-6 p-4 bg-red-50 border border-red-200 rounded-2xl'>
                <p className='text-sm text-red-700'>{error}</p>
              </div>
            )}

            {message && (
              <div className='mt-6 flex items-start gap-3 p-4 bg-teal-50 border border-teal-200 rounded-2xl'>
                <LuCircleCheck size={18} className='text-teal-500 shrink-0 mt-0.5' />
                <p className='text-sm text-teal-700'>{message}</p>
              </div>
            )}

            <form className='mt-8 flex flex-col gap-4' onSubmit={handleSubmit}>
              <div className='flex flex-col gap-1.5'>
                <label className='text-sm font-medium text-slate-600'>Email</label>
                <div className={`flex items-center gap-2 bg-slate-50 border focus-within:bg-white focus-within:ring-4 focus-within:ring-teal-50 rounded-2xl px-4 py-3.5 transition-all ${
                  submitted && (!email || !/\S+@\S+\.\S+/.test(email)) ? 'border-red-300' : 'border-slate-200 focus-within:border-teal-400'
                }`}>
                  <LuMail size={16} className='text-slate-300 shrink-0' />
                  <input
                    type='email'
                    placeholder='nama@email.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className='bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-300 w-full disabled:opacity-50'
                  />
                </div>
              </div>

              <button
                type='submit'
                disabled={loading}
                className={`mt-2 flex items-center justify-center gap-2 text-white py-4 rounded-2xl font-semibold shadow-lg transition-all active:scale-[0.98] ${
                  loading
                    ? 'bg-slate-400 cursor-not-allowed shadow-slate-200'
                    : 'bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 shadow-teal-200'
                }`}
              >
                {loading ? (
                  <>
                    <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                    Mengirim...
                  </>
                ) : (
                  <>
                    Kirim kode OTP
                    <LuSend size={16} />
                  </>
                )}
              </button>
            </form>

            <p className='text-center text-sm text-slate-400 mt-6'>
              Sudah ingat password?{' '}
              <Link to='/login' className='text-teal-500 hover:text-teal-600 font-semibold'>
                Masuk sekarang
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
