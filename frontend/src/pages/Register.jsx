import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  LuHeart, LuBrain, LuMail, LuLock, LuArrowRight,
  LuUser, LuBriefcase, LuCalendar, LuCircleCheck, LuCircleX, LuAtSign,
} from 'react-icons/lu'
import { FcGoogle } from 'react-icons/fc'
import { registerUser } from '../api/auth'

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

function InputWrap({ icon: Icon, children, error }) {
  return (
    <div className={`flex items-center gap-2 bg-slate-50 border focus-within:bg-white focus-within:ring-4 focus-within:ring-teal-50 rounded-2xl px-4 py-3.5 transition-all ${error ? 'border-red-300' : 'border-slate-200 focus-within:border-teal-400'}`}>
      {Icon && <Icon size={16} className='text-slate-300 shrink-0' />}
      {children}
    </div>
  )
}

const pekerjaanOptions = ['Dokter', 'Freelancer', 'Guru', 'Irt', 'Karyawan', 'Mahasiswa', 'Wirausaha']
const features = [
  { icon: <LuBrain size={16} className='text-white' />, label: 'AI Stress Detection' },
]

function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
    fullname: '',
    birthDate: '',
    jenisKelamin: 'Laki-laki',
    pekerjaan: 'Mahasiswa',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const set = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }))
    if (error) setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitted(true)
    setError(null)
    setSuccess(null)

    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
      setError('Email harus valid')
      return
    }
    if (!form.username.trim()) {
      setError('Username wajib diisi')
      return
    }
    if (!form.fullname.trim()) {
      setError('Nama lengkap wajib diisi')
      return
    }
    if (!form.birthDate) {
      setError('Tanggal lahir wajib diisi')
      return
    }
    if (!isPasswordValid(form.password)) return

    const payload = {
      email: form.email.trim().toLowerCase(),
      username: form.username.trim(),
      password: form.password,
      fullname: form.fullname.trim(),
      birthDate: form.birthDate.trim(),
      jenisKelamin: form.jenisKelamin,
      pekerjaan: form.pekerjaan,
    }

    try {
      setLoading(true)
      const response = await registerUser(payload)
      const body = response.data

      if (body?.status !== 'success' && body?.code !== 201) {
        throw new Error(body?.message || 'Registrasi gagal. Coba ulangi kembali.')
      }

      setSuccess(body?.message || 'Registrasi berhasil. Silakan cek email untuk kode verifikasi.')
      setTimeout(() => {
        navigate('/verify-otp', { state: { email: payload.email }, replace: true })
      }, 900)
    } catch (err) {
      const backendMessage = err.response?.data?.message
      setError(backendMessage || err.message || 'Registrasi gagal. Coba ulangi kembali.')
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
          <h2 className='text-4xl font-bold text-white leading-tight'>Mulai perjalanan<br />mental wellnessmu</h2>
          <p className='text-teal-100 mt-4 text-lg leading-relaxed'>Buat akun dan dapatkan insight personal mengenai stress, tidur, dan kesehatan mentalmu setiap hari.</p>
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

      <div className='flex-1 bg-gradient-to-br from-slate-50 to-teal-50/40 flex items-center justify-center p-8 overflow-y-auto'>
        <div className='w-full max-w-2xl'>
          <div className='bg-white/70 backdrop-blur-xl border border-white/80 shadow-xl shadow-teal-100/50 rounded-[32px] p-10'>
            <div className='lg:hidden flex items-center gap-2 mb-8'>
              <LuHeart size={22} className='text-teal-500' />
              <span className='text-teal-600 font-bold text-xl'>StressTracker AI</span>
            </div>

            <h1 className='text-3xl font-bold text-slate-800'>Buat akun baru</h1>
            <p className='text-slate-400 mt-2 text-sm'>Setelah register, cek email untuk kode verifikasi OTP</p>

            {error && <div className='mt-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-sm text-red-700'>{error}</div>}
            {success && <div className='mt-6 p-4 bg-teal-50 border border-teal-200 rounded-2xl text-sm text-teal-700'>{success}</div>}

            <form className='mt-8 flex flex-col gap-5' onSubmit={handleSubmit}>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='flex flex-col gap-1.5'>
                  <label className='text-sm font-medium text-slate-600'>Nama lengkap</label>
                  <InputWrap icon={LuUser} error={submitted && !form.fullname.trim()}>
                    <input type='text' placeholder='Nova Wijaya' value={form.fullname} onChange={set('fullname')} disabled={loading} className='bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-300 w-full disabled:opacity-50' />
                  </InputWrap>
                </div>
                <div className='flex flex-col gap-1.5'>
                  <label className='text-sm font-medium text-slate-600'>Email</label>
                  <InputWrap icon={LuMail} error={submitted && (!form.email || !/\S+@\S+\.\S+/.test(form.email))}>
                    <input type='email' placeholder='nama@email.com' value={form.email} onChange={set('email')} disabled={loading} className='bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-300 w-full disabled:opacity-50' />
                  </InputWrap>
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='flex flex-col gap-1.5'>
                  <label className='text-sm font-medium text-slate-600'>Username</label>
                  <InputWrap icon={LuAtSign} error={submitted && !form.username.trim()}>
                    <input type='text' placeholder='novanakmeletup' value={form.username} onChange={set('username')} disabled={loading} className='bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-300 w-full disabled:opacity-50' />
                  </InputWrap>
                </div>
                <div className='flex flex-col gap-1.5'>
                  <label className='text-sm font-medium text-slate-600'>Tanggal lahir</label>
                  <InputWrap icon={LuCalendar} error={submitted && !form.birthDate}>
                    <input type='date' value={form.birthDate} onChange={set('birthDate')} disabled={loading} className='bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-300 w-full disabled:opacity-50' />
                  </InputWrap>
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='flex flex-col gap-1.5'>
                  <label className='text-sm font-medium text-slate-600'>Jenis kelamin</label>
                  <select value={form.jenisKelamin} onChange={set('jenisKelamin')} disabled={loading} className='bg-slate-50 border border-slate-200 focus:border-teal-400 focus:bg-white focus:ring-4 focus:ring-teal-50 rounded-2xl px-4 py-3.5 transition-all outline-none text-sm text-slate-700 disabled:opacity-50'>
                    <option value='Laki-laki'>Laki-laki</option>
                    <option value='Perempuan'>Perempuan</option>
                  </select>
                </div>
                <div className='flex flex-col gap-1.5'>
                  <label className='text-sm font-medium text-slate-600'>Pekerjaan</label>
                  <div className='flex items-center gap-2 bg-slate-50 border border-slate-200 focus-within:border-teal-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-teal-50 rounded-2xl px-4 py-3.5 transition-all'>
                    <LuBriefcase size={16} className='text-slate-300 shrink-0' />
                    <select value={form.pekerjaan} onChange={set('pekerjaan')} disabled={loading} className='bg-transparent outline-none text-sm text-slate-700 w-full disabled:opacity-50'>
                      {pekerjaanOptions.map((item) => <option key={item} value={item}>{item}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div className='flex flex-col gap-1.5'>
                <label className='text-sm font-medium text-slate-600'>Password</label>
                <InputWrap icon={LuLock} error={submitted && !isPasswordValid(form.password)}>
                  <input type='password' placeholder='Min. 8 karakter' value={form.password} onChange={set('password')} disabled={loading} className='bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-300 w-full disabled:opacity-50' />
                </InputWrap>
                <PasswordStrength password={form.password} />
              </div>

              <button type='submit' disabled={loading} className='mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white py-4 rounded-2xl font-semibold shadow-lg shadow-teal-200 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed'>
                {loading ? 'Mendaftarkan...' : 'Buat akun & verifikasi email'}
                <LuArrowRight size={16} />
              </button>

              <div className='flex items-center gap-3 my-1'>
                <div className='flex-1 h-px bg-slate-100'></div>
                <span className='text-xs text-slate-300'>atau</span>
                <div className='flex-1 h-px bg-slate-100'></div>
              </div>
              <button type='button' className='flex items-center justify-center gap-3 w-full border border-slate-200 bg-white hover:bg-slate-50 py-3.5 rounded-2xl font-medium text-slate-600 text-sm transition-all active:scale-[0.98] shadow-sm'>
                <FcGoogle size={20} />
                Daftar dengan Google
              </button>
            </form>

            <p className='text-center text-sm text-slate-400 mt-6'>
              Sudah punya akun?{' '}
              <Link to='/login' className='text-teal-500 hover:text-teal-600 font-semibold'>Masuk</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
