import { Link } from 'react-router-dom'
import { LuHeart, LuBrain, LuMoon, LuActivity, LuMail, LuLock, LuArrowRight } from 'react-icons/lu'

const features = [
  { icon: <LuBrain size={16} className='text-white' />, label: 'AI Stress Detection' },
  { icon: <LuMoon size={16} className='text-white' />, label: 'Sleep Quality Monitor' },
  { icon: <LuActivity size={16} className='text-white' />, label: 'Daily Wellness Tracker' },
]

function Login() {
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

            <form className='mt-8 flex flex-col gap-4'>
              <div className='flex flex-col gap-1.5'>
                <label className='text-sm font-medium text-slate-600'>Email</label>
                <div className='flex items-center gap-2 bg-slate-50 border border-slate-200 focus-within:border-teal-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-teal-50 rounded-2xl px-4 py-3.5 transition-all'>
                  <LuMail size={16} className='text-slate-300 shrink-0' />
                  <input
                    type='email'
                    placeholder='nama@email.com'
                    className='bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-300 w-full'
                  />
                </div>
              </div>

              <div className='flex flex-col gap-1.5'>
                <label className='text-sm font-medium text-slate-600'>Password</label>
                <div className='flex items-center gap-2 bg-slate-50 border border-slate-200 focus-within:border-teal-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-teal-50 rounded-2xl px-4 py-3.5 transition-all'>
                  <LuLock size={16} className='text-slate-300 shrink-0' />
                  <input
                    type='password'
                    placeholder='••••••••'
                    className='bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-300 w-full'
                  />
                </div>
              </div>

              <div className='flex items-center justify-between text-sm mt-1'>
                <label className='flex items-center gap-2 text-slate-500 cursor-pointer'>
                  <input type='checkbox' className='accent-teal-500 w-4 h-4 rounded' />
                  Ingat saya
                </label>
                <a href='#' className='text-teal-500 hover:text-teal-600 font-medium'>Lupa password?</a>
              </div>

              <button
                type='submit'
                className='mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white py-4 rounded-2xl font-semibold shadow-lg shadow-teal-200 transition-all active:scale-[0.98]'
              >
                Masuk
                <LuArrowRight size={16} />
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
