import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LuArrowLeft, LuArrowRight, LuEye, LuEyeOff, LuHeart, LuKeyRound, LuMail, LuShieldCheck } from 'react-icons/lu'
import { resetPassword } from '../api/auth'

function ResetPassword() {
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({
    email: location.state?.email || '',
    otpCode: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const setField = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
      setError('Email harus valid')
      return
    }

    if (!form.otpCode.trim()) {
      setError('Kode OTP wajib diisi')
      return
    }

    if (!form.newPassword || form.newPassword.length < 6) {
      setError('Password baru minimal 6 karakter')
      return
    }

    if (form.newPassword !== form.confirmPassword) {
      setError('Konfirmasi password tidak sama')
      return
    }

    try {
      setLoading(true)
      const response = await resetPassword({
        email: form.email.trim().toLowerCase(),
        otpCode: form.otpCode.trim(),
        newPassword: form.newPassword,
      })

      setSuccess(response.data?.message || 'Password berhasil diubah. Silakan login menggunakan password baru.')
      setTimeout(() => navigate('/login', { replace: true }), 1000)
    } catch (err) {
      setError(err.response?.data?.message || 'Reset password gagal. Periksa email, OTP, dan password baru kamu.')
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
            Verifikasi OTP<br />dan buat password baru
          </h2>
          <p className='text-teal-100 mt-4 text-lg leading-relaxed'>
            Masukkan kode OTP dari email kamu, lalu buat password baru untuk akunmu.
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

            <Link to='/forgot-password' className='inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-teal-500 transition-colors mb-6'>
              <LuArrowLeft size={16} />
              Kembali
            </Link>

            <h1 className='text-3xl font-bold text-slate-800'>Reset password</h1>
            <p className='text-slate-400 mt-2 text-sm leading-relaxed'>
              Masukkan email, kode OTP, dan password baru kamu.
            </p>

            {error && (
              <div className='mt-6 p-4 bg-red-50 border border-red-200 rounded-2xl'>
                <p className='text-sm text-red-700'>{error}</p>
              </div>
            )}

            {success && (
              <div className='mt-6 p-4 bg-teal-50 border border-teal-200 rounded-2xl'>
                <p className='text-sm text-teal-700'>{success}</p>
              </div>
            )}

            <form className='mt-8 flex flex-col gap-4' onSubmit={handleSubmit}>
              <div className='flex flex-col gap-1.5'>
                <label className='text-sm font-medium text-slate-600'>Email</label>
                <div className='flex items-center gap-2 bg-slate-50 border border-slate-200 focus-within:bg-white focus-within:border-teal-400 focus-within:ring-4 focus-within:ring-teal-50 rounded-2xl px-4 py-3.5 transition-all'>
                  <LuMail size={16} className='text-slate-300 shrink-0' />
                  <input
                    type='email'
                    value={form.email}
                    onChange={setField('email')}
                    disabled={loading}
                    placeholder='nama@email.com'
                    className='bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-300 w-full disabled:opacity-50'
                  />
                </div>
              </div>

              <div className='flex flex-col gap-1.5'>
                <label className='text-sm font-medium text-slate-600'>Kode OTP</label>
                <div className='flex items-center gap-2 bg-slate-50 border border-slate-200 focus-within:bg-white focus-within:border-teal-400 focus-within:ring-4 focus-within:ring-teal-50 rounded-2xl px-4 py-3.5 transition-all'>
                  <LuKeyRound size={16} className='text-slate-300 shrink-0' />
                  <input
                    type='text'
                    value={form.otpCode}
                    onChange={setField('otpCode')}
                    disabled={loading}
                    placeholder='Masukkan kode OTP'
                    className='bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-300 w-full disabled:opacity-50'
                  />
                </div>
              </div>

              <div className='flex flex-col gap-1.5'>
                <label className='text-sm font-medium text-slate-600'>Password baru</label>
                <div className='flex items-center gap-2 bg-slate-50 border border-slate-200 focus-within:bg-white focus-within:border-teal-400 focus-within:ring-4 focus-within:ring-teal-50 rounded-2xl px-4 py-3.5 transition-all'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={form.newPassword}
                    onChange={setField('newPassword')}
                    disabled={loading}
                    placeholder='Minimal 6 karakter'
                    className='bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-300 w-full disabled:opacity-50'
                  />
                  <button type='button' onClick={() => setShowPassword((prev) => !prev)} className='text-slate-300 hover:text-teal-500 transition-colors'>
                    {showPassword ? <LuEyeOff size={17} /> : <LuEye size={17} />}
                  </button>
                </div>
              </div>

              <div className='flex flex-col gap-1.5'>
                <label className='text-sm font-medium text-slate-600'>Konfirmasi password baru</label>
                <div className='flex items-center gap-2 bg-slate-50 border border-slate-200 focus-within:bg-white focus-within:border-teal-400 focus-within:ring-4 focus-within:ring-teal-50 rounded-2xl px-4 py-3.5 transition-all'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={form.confirmPassword}
                    onChange={setField('confirmPassword')}
                    disabled={loading}
                    placeholder='Ulangi password baru'
                    className='bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-300 w-full disabled:opacity-50'
                  />
                  <button type='button' onClick={() => setShowPassword((prev) => !prev)} className='text-slate-300 hover:text-teal-500 transition-colors'>
                    {showPassword ? <LuEyeOff size={17} /> : <LuEye size={17} />}
                  </button>
                </div>
              </div>

              <button
                type='submit'
                disabled={loading}
                className='mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white py-4 rounded-2xl font-semibold shadow-lg shadow-teal-200 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed'
              >
                {loading ? 'Menyimpan...' : 'Ubah password'}
                <LuArrowRight size={16} />
              </button>
            </form>

            <p className='text-center text-sm text-slate-400 mt-6'>
              Sudah punya password baru?{' '}
              <Link to='/login' className='text-teal-500 hover:text-teal-600 font-semibold'>Masuk</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
