import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  LuBrain,
  LuClipboardCheck,
  LuChartLine,
  LuBell,
  LuSparkles,
  LuArrowRight,
  LuCircleCheck,
  LuShieldCheck,
  LuHeartPulse,
  LuMenu,
  LuX,
} from 'react-icons/lu'

const navItems = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Fitur', href: '#fitur' },
  { label: 'Cara Kerja', href: '#cara-kerja' },
  { label: 'Tentang', href: '#tentang' },
  { label: 'Copyright', href: '#copyright' },
]

const features = [
  {
    icon: LuClipboardCheck,
    title: 'Check-in Harian',
    description: 'Isi data tidur, aktivitas, produktivitas, dan kondisi sosial dengan cepat setiap hari.',
  },
  {
    icon: LuBrain,
    title: 'Analisis AI',
    description: 'Sistem membantu membaca pola harian untuk memperkirakan tingkat stres kamu.',
  },
  {
    icon: LuChartLine,
    title: 'Riwayat & Statistik',
    description: 'Pantau perubahan tingkat stres dari waktu ke waktu melalui grafik dan log harian.',
  },
  {
    icon: LuSparkles,
    title: 'Rekomendasi Personal',
    description: 'Dapatkan saran sederhana berdasarkan data check-in yang kamu isi.',
  },
  {
    icon: LuBell,
    title: 'Pengingat Harian',
    description: 'Bantu kamu tetap konsisten mengisi check-in harian agar data lebih akurat.',
  },
]

const steps = [
  {
    title: 'Isi Check-in',
    description: 'Masukkan data tidur, gaya hidup, pekerjaan, dan kondisi sosial hari ini.',
  },
  {
    title: 'Sistem Menganalisis',
    description: 'Data diproses untuk memperkirakan kondisi stres harianmu.',
  },
  {
    title: 'Lihat Hasil',
    description: 'Pantau dashboard, riwayat, dan rekomendasi untuk kebiasaan yang lebih baik.',
  },
]

function LandingNavbar() {
  const [open, setOpen] = useState(false)

  const closeMenu = () => setOpen(false)

  return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-emerald-50 shadow-sm shadow-emerald-50'>
      <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-16 sm:h-20 flex items-center justify-between'>
        <a href='#beranda' onClick={closeMenu} className='flex items-center gap-3 min-w-0'>
          <div className='w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-100 shrink-0'>
            <LuBrain size={22} className='text-white' />
          </div>
          <div className='leading-tight min-w-0'>
            <div className='text-base sm:text-lg font-bold text-slate-900 truncate'>StressTracker <span className='text-emerald-500'>AI</span></div>
            <div className='text-[11px] text-slate-400 hidden sm:block'>Mental wellness tracker</div>
          </div>
        </a>

        <div className='hidden lg:flex items-center gap-8 text-sm font-medium text-slate-500'>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className='hover:text-emerald-500 transition-colors'>
              {item.label}
            </a>
          ))}
        </div>

        <div className='hidden sm:flex items-center gap-3'>
          <Link
            to='/login'
            className='px-5 py-2.5 rounded-2xl border border-emerald-200 text-emerald-600 text-sm font-semibold hover:bg-emerald-50 transition-all'
          >
            Masuk
          </Link>
          <Link
            to='/register'
            className='px-5 py-2.5 rounded-2xl bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 shadow-lg shadow-emerald-100 transition-all'
          >
            Daftar
          </Link>
        </div>

        <button
          type='button'
          onClick={() => setOpen((value) => !value)}
          className='sm:hidden w-10 h-10 rounded-2xl border border-emerald-100 text-emerald-600 flex items-center justify-center bg-white'
          aria-label='Toggle navigation'
        >
          {open ? <LuX size={20} /> : <LuMenu size={20} />}
        </button>
      </nav>

      {open && (
        <div className='sm:hidden border-t border-emerald-50 bg-white/95 backdrop-blur-xl'>
          <div className='px-4 py-4 space-y-2'>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className='block px-4 py-3 rounded-2xl text-sm font-semibold text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-all'
              >
                {item.label}
              </a>
            ))}

            <div className='grid grid-cols-2 gap-3 pt-3'>
              <Link
                to='/login'
                onClick={closeMenu}
                className='text-center px-4 py-3 rounded-2xl border border-emerald-200 text-emerald-600 text-sm font-semibold hover:bg-emerald-50 transition-all'
              >
                Masuk
              </Link>
              <Link
                to='/register'
                onClick={closeMenu}
                className='text-center px-4 py-3 rounded-2xl bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition-all'
              >
                Daftar
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

function DashboardPreview() {
  return (
    <div className='relative rounded-[1.5rem] sm:rounded-[2rem] bg-white p-2 sm:p-3 shadow-2xl shadow-emerald-100 border border-emerald-50 overflow-hidden'>
      <img
        src='/dashboard-preview.png'
        alt='Preview dashboard StressTracker AI'
        className='rounded-[1.25rem] sm:rounded-[1.5rem] w-full object-cover max-h-[260px] sm:max-h-[420px] lg:max-h-none'
      />
    </div>
  )
}

export default function Landing() {
  return (
    <div className='min-h-screen bg-white text-slate-900 overflow-x-hidden'>
      <LandingNavbar />

      <main id='beranda' className='relative pt-16 sm:pt-20'>
        <section className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24'>
          <div className='absolute top-0 right-0 w-[460px] h-[460px] bg-emerald-100 rounded-full blur-3xl opacity-60 -z-10' />
          <div className='grid lg:grid-cols-2 gap-14 items-center'>
            <div>
              <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-sm font-semibold mb-6'>
                <LuHeartPulse size={16} />
                Teman check-in harian untuk kesehatan mental
              </div>
              <h1 className='text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-slate-950'>
                Pantau Tingkat <span className='text-emerald-500'>Stresmu</span> Setiap Hari
              </h1>
              <p className='mt-6 text-base sm:text-lg text-slate-500 leading-relaxed max-w-xl'>
                StressTracker AI membantu kamu memahami kondisi stres berdasarkan pola tidur, gaya hidup,
                produktivitas, dan kondisi sosial melalui check-in harian yang sederhana.
              </p>
              <div className='mt-8 flex flex-col sm:flex-row gap-3'>
                <Link
                  to='/register'
                  className='inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 shadow-xl shadow-emerald-100 transition-all'
                >
                  Daftar Gratis
                  <LuArrowRight size={18} />
                </Link>
                <Link
                  to='/login'
                  className='inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl border border-emerald-200 text-emerald-600 font-semibold hover:bg-emerald-50 transition-all'
                >
                  Masuk
                </Link>
              </div>

              <div className='mt-8 flex flex-col sm:flex-row gap-4 sm:items-center text-sm text-slate-500'>
                <div className='flex -space-x-3'>
                  {['F', 'A', 'S', 'M'].map((item) => (
                    <div key={item} className='w-9 h-9 rounded-full border-2 border-white bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold'>
                      {item}
                    </div>
                  ))}
                </div>
                <p>Mulai bangun kebiasaan check-in untuk memahami kondisi harianmu.</p>
              </div>
            </div>

            <DashboardPreview />
          </div>
        </section>

        <section id='fitur' className='py-16 bg-gradient-to-b from-white to-emerald-50/50'>
          <div className='max-w-7xl mx-auto px-5 sm:px-6 lg:px-8'>
            <div className='text-center mb-10'>
              <h2 className='text-3xl font-bold text-slate-950'>Fitur Utama</h2>
              <p className='text-slate-500 mt-3'>Fitur yang membantu proses pemantauan stres harian menjadi lebih mudah.</p>
            </div>
            <div className='grid sm:grid-cols-2 lg:grid-cols-5 gap-4'>
              {features.map(({ icon: Icon, title, description }) => (
                <div key={title} className='bg-white rounded-3xl border border-emerald-50 p-6 shadow-sm hover:shadow-lg hover:shadow-emerald-100 transition-all'>
                  <div className='w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-5'>
                    <Icon size={24} className='text-emerald-500' />
                  </div>
                  <h3 className='font-bold text-slate-900 mb-2'>{title}</h3>
                  <p className='text-sm text-slate-500 leading-relaxed'>{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id='cara-kerja' className='py-16 bg-white'>
          <div className='max-w-6xl mx-auto px-5 sm:px-6 lg:px-8'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold text-slate-950'>Cara Kerja</h2>
              <p className='text-slate-500 mt-3'>Tiga langkah sederhana untuk mulai memantau kondisi stres.</p>
            </div>
            <div className='grid md:grid-cols-3 gap-6'>
              {steps.map((step, index) => (
                <div key={step.title} className='relative bg-emerald-50/60 rounded-3xl p-7 border border-emerald-100'>
                  <div className='w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-bold mb-5'>
                    {index + 1}
                  </div>
                  <h3 className='text-lg font-bold text-slate-900 mb-2'>{step.title}</h3>
                  <p className='text-sm text-slate-500 leading-relaxed'>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id='tentang' className='py-16 bg-emerald-950 text-white'>
          <div className='max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center'>
            <div>
              <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-emerald-100 text-sm font-semibold mb-5'>
                <LuShieldCheck size={16} />
                Tentang StressTracker AI
              </div>
              <h2 className='text-3xl sm:text-4xl font-bold leading-tight'>Membantu kamu lebih sadar dengan kondisi harian.</h2>
              <p className='text-emerald-50/80 mt-5 leading-relaxed'>
                Aplikasi ini dirancang sebagai alat bantu pencatatan dan pemantauan stres. Data check-in harian
                digunakan untuk menampilkan prediksi, riwayat, dan rekomendasi sederhana agar kamu bisa memahami pola keseharianmu.
              </p>
            </div>
            <div className='bg-white/10 border border-white/10 rounded-3xl p-6 sm:p-8'>
              {[
                'Bukan pengganti diagnosis medis profesional.',
                'Membantu membangun kebiasaan refleksi harian.',
                'Data digunakan untuk menampilkan insight yang lebih personal.',
              ].map((item) => (
                <div key={item} className='flex items-start gap-3 mb-4 last:mb-0'>
                  <LuCircleCheck size={20} className='text-emerald-300 mt-0.5 shrink-0' />
                  <p className='text-sm sm:text-base text-emerald-50/90'>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className='py-14 bg-white'>
          <div className='max-w-6xl mx-auto px-5 sm:px-6 lg:px-8'>
            <div className='rounded-[2rem] bg-gradient-to-br from-emerald-500 to-teal-500 p-8 sm:p-10 text-white flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 shadow-xl shadow-emerald-100'>
              <div>
                <h2 className='text-2xl sm:text-3xl font-bold'>Siap mulai check-in hari ini?</h2>
                <p className='text-emerald-50 mt-2'>Daftar sekarang dan mulai pantau kondisi stresmu secara lebih teratur.</p>
              </div>
              <Link to='/register' className='inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white text-emerald-600 font-bold hover:bg-emerald-50 transition-all'>
                Daftar Gratis Sekarang
                <LuArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer id='copyright' className='bg-slate-950 text-white py-10'>
        <div className='max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-6 md:items-center md:justify-between'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 rounded-2xl bg-emerald-500 flex items-center justify-center'>
              <LuBrain size={22} />
            </div>
            <div>
              <div className='font-bold'>StressTracker <span className='text-emerald-400'>AI</span></div>
              <div className='text-xs text-slate-400'>Pantau stres harian dengan lebih mudah.</div>
            </div>
          </div>
          <p className='text-sm text-slate-400'>© {new Date().getFullYear()} StressTracker AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
