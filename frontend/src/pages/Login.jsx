import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LuHeart, LuBrain, LuMoon, LuActivity, LuMail, LuLock, LuArrowRight, LuCircleCheck, LuCircleX} from 'react-icons/lu'
import { FcGoogle } from 'react-icons/fc'
import axios from '../api/axios'

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
  { icon: <LuMoon size={16} className='text-white' />, label: 'Sleep Quality Monitor' },
  { icon: <LuActivity size={16} className='text-white' />, label: 'Daily Wellness Tracker' },
]

function Login() {
  const navigate = useNavigate()
  
  // ========== STATE MANAGEMENT ==========
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // ========== HANDLE SUBMIT ==========
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSubmitted(true)

    // Validate password format
    if (!isPasswordValid(password)) {
      return
    }

    // Validate email
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Email harus valid')
      return
    }

    setLoading(true)

    try {
      // API Call: POST /api/auth/login
      const response = await axios.post('/api/auth/login', {
        email: email.toLowerCase(),
        password,
      })

      if (response.data.success) {
        // Store token
        localStorage.setItem('token', response.data.data.token)
        
        // Store user info if available
        if (response.data.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.data.user))
        }

        // Redirect to dashboard halaman utama
        setTimeout(() => {
          navigate('/', { replace: true })
        }, 500)
      }
    } catch (err) {
      console.error('Login error:', err)
      
      // Handle different error types
      if (err.response?.status === 401) {
        setError('Email atau password salah')
      } else if (err.response?.status === 429) {
        setError('Terlalu banyak percobaan login, coba lagi nanti')
      } else if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else if (err.message === 'Network Error') {
        setError('Tidak bisa terhubung ke server. Cek koneksi internet Anda.')
      } else {
        setError('Login gagal, coba lagi nanti')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex'>
      {/* Left Panel */}
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
          <h2 className='text-4xl font-bold text-white leading-tight'>
            Monitor kesehatan<br />mentalmu setiap hari
          </h2>
          <p className='text-teal-100 mt-4 text-lg leading-relaxed'>
            Pantau stress, tidur, dan aktivitasmu dengan teknologi AI yang cerdas dan personal.
          </p>

          <div className='mt-10 flex flex-col gap-4'>
            {features.map(({ icon, label }) => (
              <div key={label} className='flex items-center gap-3'>
                <div className='w-9 h-9 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center'>
                  {icon}
                </div>
                <span className='text-white font-medium'>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <p className='relative z-10 text-teal-100 text-sm'>© 2025 StressTracker AI. All rights reserved.</p>
      </div>

      {/* Right Panel */}
      <div className='flex-1 bg-gradient-to-br from-slate-50 to-teal-50/40 flex items-center justify-center p-8'>
        <div className='w-full max-w-md'>
          <div className='bg-white/70 backdrop-blur-xl border border-white/80 shadow-xl shadow-teal-100/50 rounded-[32px] p-10'>
            <div className='lg:hidden flex items-center gap-2 mb-8'>
              <LuHeart size={22} className='text-teal-500' />
              <span className='text-teal-600 font-bold text-xl'>StressTracker AI</span>
            </div>

            <h1 className='text-3xl font-bold text-slate-800'>Selamat datang</h1>
            <p className='text-slate-400 mt-2 text-sm'>Masuk untuk melanjutkan sesi stress trackermu</p>

            {/* Error Alert */}
            {error && (
              <div className='mt-6 flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl'>
                <p className='text-sm text-red-700'>{error}</p>
              </div>
            )}

            <form className={`mt-8 flex flex-col gap-4 ${error ? 'mt-4' : ''}`} onSubmit={handleSubmit}>
              <div className='flex flex-col gap-1.5'>
                <label className='text-sm font-medium text-slate-600'>Email</label>
                <div className='flex items-center gap-2 bg-slate-50 border border-slate-200 focus-within:border-teal-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-teal-50 rounded-2xl px-4 py-3.5 transition-all'>
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

              <div className='flex flex-col gap-1.5'>
                <label className='text-sm font-medium text-slate-600'>Password</label>
                <div className={`flex items-center gap-2 bg-slate-50 border focus-within:bg-white focus-within:ring-4 focus-within:ring-teal-50 rounded-2xl px-4 py-3.5 transition-all ${
                  submitted && !isPasswordValid(password) ? 'border-red-300' : 'border-slate-200 focus-within:border-teal-400'
                }`}>
                  <LuLock size={16} className='text-slate-300 shrink-0' />
                  <input
                    type='password'
                    placeholder='••••••••'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className='bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-300 w-full disabled:opacity-50'
                  />
                </div>
                <PasswordStrength password={password} />
              </div>

              <div className='flex items-center justify-between text-sm mt-1'>
                <label className='flex items-center gap-2 text-slate-500 cursor-pointer'>
                  <input type='checkbox' className='accent-teal-500 w-4 h-4 rounded' disabled={loading} />
                  Ingat saya
                </label>
                <a href='#' className='text-teal-500 hover:text-teal-600 font-medium'>Lupa password?</a>
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
                    Sedang masuk...
                  </>
                ) : (
                  <>
                    Masuk
                    <LuArrowRight size={16} />
                  </>
                )}
              </button>

              <div className='flex items-center gap-3 my-1'>
                <div className='flex-1 h-px bg-slate-100'></div>
                <span className='text-xs text-slate-300'>atau</span>
                <div className='flex-1 h-px bg-slate-100'></div>
              </div>

              <button
                type='button'
                disabled={loading}
                className='flex items-center justify-center gap-3 w-full border border-slate-200 bg-white hover:bg-slate-50 py-3.5 rounded-2xl font-medium text-slate-600 text-sm transition-all active:scale-[0.98] shadow-sm disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <FcGoogle size={20} />
                Masuk dengan Google
              </button>
            </form>

            <p className='text-center text-sm text-slate-400 mt-6'>
              Belum punya akun?{' '}
              <Link to='/register' className='text-teal-500 hover:text-teal-600 font-semibold'>
                Daftar sekarang
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
