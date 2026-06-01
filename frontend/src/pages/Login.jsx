import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LuHeart, LuBrain, LuMail, LuLock, LuArrowRight, LuCircleCheck, LuCircleX, LuEye, LuEyeOff } from 'react-icons/lu'
import { loginUser, getLoggedUser } from '../api/auth'
import { useApp } from '../context/AppContext'

function PasswordStrength({ password }) {
  const rules = [
    { label: 'Minimal 8 karakter', valid: password.length >= 8 },
    { label: 'Mengandung huruf kapital', valid: /[A-Z]/.test(password) },
    { label: 'Mengandung angka', valid: /[0-9]/.test(password) },
  ]

  if (!password) return null

  return (
    <div className='flex flex-col gap-1.5 mt-2'>
      {rules.map((r) => (
        <div key={r.label} className='flex items-center gap-2'>
          {r.valid
            ? <LuCircleCheck size={13} className='text-teal-500 shrink-0' />
            : <LuCircleX size={13} className='text-red-400 shrink-0' />
          }
          <span className={`text-xs ${r.valid ? 'text-teal-500' : 'text-red-400'}`}>{r.label}</span>
        </div>
      ))}
    </div>
  )
}

function isPasswordValid(password) {
  return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)
}

const features = [
  { icon: <LuBrain size={16} className='text-white' />, label: 'AI Stress Detection' },
]

function Login() {
  const navigate = useNavigate()
  const { updateUser } = useApp()

  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSubmitted(true)

    if (!identifier.trim()) {
      setError('Email atau username wajib diisi')
      return
    }

    if (!isPasswordValid(password)) {
      setError('Password harus minimal 8 karakter, mengandung huruf kapital, dan angka')
      return
    }

    try {
      setLoading(true)

      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('token')

      const response = await loginUser({
        identifier: identifier.trim(),
        password,
      })

      const body = response.data
      const accessToken = body?.data?.accessToken
      const refreshToken = body?.data?.refreshToken

      if (
        response.status !== 201 ||
        body?.code !== 201 ||
        body?.status !== 'success' ||
        typeof accessToken !== 'string' ||
        typeof refreshToken !== 'string' ||
        accessToken.trim() === '' ||
        refreshToken.trim() === ''
      ) {
        throw new Error('Email/username atau password salah')
      }

      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('token', accessToken)
      localStorage.setItem('refreshToken', refreshToken)

      const meResponse = await getLoggedUser()
      const user = meResponse.data?.data?.user

      if (!user?.id) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('token')
        throw new Error('Login gagal. Data pengguna tidak valid.')
      }

      updateUser({
        ...user,
        name: user.fullname,
        nama: user.fullname,
        gender: user.jenisKelamin,
        jenis_kelamin: user.jenisKelamin,
        job: user.pekerjaan,
        pekerjaan: user.pekerjaan,
      })

      navigate('/dashboard', { replace: true })
    } catch (err) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('token')

      setError(
        err.response?.data?.message ||
        err.message ||
        'Email/username atau password salah'
      )
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
          <h2 className='text-4xl font-bold text-white leading-tight'>Monitor kesehatan<br />mentalmu setiap hari</h2>
          <p className='text-teal-100 mt-4 text-lg leading-relaxed'>Pantau stress, tidur, dan aktivitasmu dengan teknologi AI yang cerdas dan personal.</p>
          <div className='mt-10 flex flex-col gap-4'>
            {features.map(({ icon, label }) => (
              <div key={label} className='flex items-center gap-3'>
                <div className='w-9 h-9 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center'>{icon}</div>
                <span className='text-white font-medium'>{label}</span>
              </div>
            ))}
          </div>
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

            <h1 className='text-3xl font-bold text-slate-800'>Selamat datang</h1>
            <p className='text-slate-400 mt-2 text-sm'>Masuk memakai email atau username</p>

            {error && (
              <div className='mt-6 flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl'>
                <p className='text-sm text-red-700'>{error}</p>
              </div>
            )}

            <form className={`mt-8 flex flex-col gap-4 ${error ? 'mt-4' : ''}`} onSubmit={handleSubmit}>
              <div className='flex flex-col gap-1.5'>
                <label className='text-sm font-medium text-slate-600'>Email / Username</label>
                <div className={`flex items-center gap-2 bg-slate-50 border focus-within:bg-white focus-within:ring-4 focus-within:ring-teal-50 rounded-2xl px-4 py-3.5 transition-all ${submitted && !identifier.trim() ? 'border-red-300' : 'border-slate-200 focus-within:border-teal-400'}`}>
                  <LuMail size={16} className='text-slate-300 shrink-0' />
                  <input
                    type='text'
                    placeholder='email atau username'
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    disabled={loading}
                    className='bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-300 w-full disabled:opacity-50'
                  />
                </div>
              </div>

              <div className='flex flex-col gap-1.5'>
                <label className='text-sm font-medium text-slate-600'>Password</label>
                <div className={`flex items-center gap-2 bg-slate-50 border focus-within:bg-white focus-within:ring-4 focus-within:ring-teal-50 rounded-2xl px-4 py-3.5 transition-all ${submitted && !isPasswordValid(password) ? 'border-red-300' : 'border-slate-200 focus-within:border-teal-400'}`}>
                  <LuLock size={16} className='text-slate-300 shrink-0' />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='••••••••'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className='bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-300 w-full disabled:opacity-50'
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword((prev) => !prev)}
                    disabled={loading}
                    className='text-slate-300 hover:text-teal-500 transition-colors disabled:opacity-50'
                    aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                  >
                    {showPassword ? <LuEyeOff size={17} /> : <LuEye size={17} />}
                  </button>
                </div>
                <PasswordStrength password={password} />
              </div>

              <div className='flex justify-end'>
                <Link to='/forgot-password' className='text-sm text-teal-500 hover:text-teal-600 font-medium'>Lupa password?</Link>
              </div>

              <button type='submit' disabled={loading} className='mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white py-4 rounded-2xl font-semibold shadow-lg shadow-teal-200 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed'>
                {loading ? 'Memproses...' : 'Masuk'}
                <LuArrowRight size={16} />
              </button>
            </form>

            <p className='text-center text-sm text-slate-400 mt-6'>
              Belum punya akun? <Link to='/register' className='text-teal-500 hover:text-teal-600 font-semibold'>Daftar sekarang</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login