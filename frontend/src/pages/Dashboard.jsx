import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LuMoon,
  LuFlaskConical,
  LuBriefcase,
  LuUsers,
  LuHeart,
  LuTrendingUp,
  LuX,
  LuClipboardList,
} from 'react-icons/lu'
import MainLayout from '../layouts/MainLayout'
import { useApp } from '../context/AppContext'

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */
function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Selamat Pagi'
  if (h < 17) return 'Selamat Siang'
  return 'Selamat Malam'
}

const STRESS_COLOR = {
  'Rendah':        { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-600', badge: 'bg-emerald-100 text-emerald-600', bar: 'bg-emerald-400', dot: 'bg-emerald-400' },
  'Sedang':        { bg: 'bg-amber-50',   border: 'border-amber-200',   text: 'text-amber-500',   badge: 'bg-amber-100 text-amber-600',   bar: 'bg-amber-400',   dot: 'bg-amber-400'   },
  'Tinggi':        { bg: 'bg-rose-50',    border: 'border-rose-200',    text: 'text-rose-500',    badge: 'bg-rose-100 text-rose-600',    bar: 'bg-rose-400',    dot: 'bg-rose-400'    },
  'Sangat Tinggi': { bg: 'bg-rose-100',   border: 'border-rose-300',    text: 'text-rose-700',    badge: 'bg-rose-200 text-rose-700',    bar: 'bg-rose-600',    dot: 'bg-rose-600'    },
}

const STRESS_HEIGHT = { 'Rendah': 40, 'Sedang': 80, 'Tinggi': 120, 'Sangat Tinggi': 160 }

function getLast7Days() {
  const days = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    days.push(d.toISOString().split('T')[0])
  }
  return days
}

const DAY_LABEL = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']

function formatLabel(key) {
  const map = {
    // Pola & kualitas tidur
    durasi_tidur_menit:     'durasi_tidur_menit',
    sering_terbangun_malam: 'sering_terbangun_malam',
    mimpi_buruk:            'mimpi_buruk',
    screen_sebelum_tidur:   'screen_sebelum_tidur',
    // Konsumsi zat & substansi
    minum_kopi_hari_ini:    'minum_kopi_hari_ini',
    merokok:                'merokok',
    konsumsi_alkohol:       'konsumsi_alkohol',
    // Beban & tekanan kerja
    deadline_hari_ini:      'deadline_hari_ini',
    lembur:                 'lembur',
    konsentrasi:            'konsentrasi',
    // Kondisi hubungan sosial
    suasana_hati:           'suasana_hati',
    konflik_interpersonal:  'konflik_interpersonal',
    merasa_kesepian:        'merasa_kesepian',
    interaksi_sosial:       'interaksi_sosial',
    // Aktivitas pemulihan diri
    meditasi:               'meditasi',
    aktivitas_hobi:         'aktivitas_hobi',
    waktu_outdoor:          'waktu_outdoor',
  }
  return map[key] || key
}

function formatValue(key, val) {
  if (val === null || val === undefined) return '-'
  if (key === 'durasi_tidur_menit') {
    const j = Math.floor(val / 60)
    const m = val % 60
    const jamStr = j > 0 && m > 0 ? `${j} jam ${m} menit` : j > 0 ? `${j} jam` : `${m} menit`
    return `${val} menit (${jamStr})`
  }
  if (key === 'screen_sebelum_tidur') return `${val} menit`
  if (key === 'waktu_outdoor') {
    const j = Math.floor(val / 60)
    const m = val % 60
    const jamStr = j > 0 && m > 0 ? `${j} jam ${m} menit` : j > 0 ? `${j} jam` : `${m} menit`
    return `${val} menit (${jamStr})`
  }
  if (key === 'konsentrasi') return `${val} / 5`
  if (key === 'interaksi_sosial') return `${val} / 5`
  return String(val)
}

const INPUT_SECTIONS = [
  {
    title: 'Pola & kualitas tidur',
    sub: 'Seberapa nyenyak seseorang beristirahat',
    icon: LuMoon,
    keys: ['durasi_tidur_menit', 'sering_terbangun_malam', 'mimpi_buruk', 'screen_sebelum_tidur'],
  },
  {
    title: 'Konsumsi zat & substansi',
    sub: 'Zat yang dikonsumsi dan mempengaruhi tubuh',
    icon: LuFlaskConical,
    keys: ['minum_kopi_hari_ini', 'merokok', 'konsumsi_alkohol'],
  },
  {
    title: 'Beban & tekanan kerja',
    sub: 'Tuntutan pekerjaan hari ini',
    icon: LuBriefcase,
    keys: ['deadline_hari_ini', 'lembur', 'konsentrasi'],
  },
  {
    title: 'Kondisi hubungan sosial',
    sub: 'Kualitas interaksi dengan orang sekitar',
    icon: LuUsers,
    keys: ['suasana_hati', 'konflik_interpersonal', 'merasa_kesepian', 'interaksi_sosial'],
  },
  {
    title: 'Aktivitas pemulihan diri',
    sub: 'Kegiatan yang membantu menurunkan stres',
    icon: LuHeart,
    keys: ['meditasi', 'aktivitas_hobi', 'waktu_outdoor'],
  },
]

/* ─────────────────────────────────────────────
   Sub-komponen
───────────────────────────────────────────── */

function StressHero({ entry }) {
  const level = entry?.stressLevel ?? null
  const c = level ? STRESS_COLOR[level] : null

  if (!entry || !level) {
    return (
      <div className='bg-slate-50 border border-slate-200 rounded-3xl p-8 text-center mb-6'>
        <div className='text-xs font-mono text-slate-400 mb-3 tracking-widest'>TINGKAT STRESS HARI INI</div>
        <div className='text-3xl font-bold text-slate-300 mb-2'>Belum ada data</div>
        <p className='text-sm text-slate-400'>Isi input harian untuk melihat stress level kamu hari ini.</p>
      </div>
    )
  }

  return (
    <div className={`${c.bg} border ${c.border} rounded-3xl p-8 text-center mb-6`}>
      <div className='text-xs font-mono text-slate-400 mb-3 tracking-widest'>TINGKAT STRESS HARI INI</div>
      <div className={`text-5xl font-bold ${c.text} leading-none mb-3`}>{level}</div>
      <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${c.badge}`}>
        {entry.tanggal}
      </div>
    </div>
  )
}

function InputRingkasan({ entry }) {
  if (!entry) return null
  return (
    <div className='mb-6'>
      <div className='flex items-center gap-2 mb-4'>
        <LuClipboardList size={16} className='text-teal-500' />
        <h2 className='text-base font-semibold text-slate-700'>Ringkasan Input Hari Ini</h2>
      </div>
      <div className='space-y-3'>
        {INPUT_SECTIONS.map(({ title, sub, icon: Icon, keys }) => (
          <div key={title} className='bg-white border border-slate-100 rounded-2xl p-5 shadow-sm'>
            {/* Header kelompok */}
            <div className='mb-3 pb-3 border-b border-slate-100'>
              <div className='flex items-center gap-2 mb-0.5'>
                <div className='w-7 h-7 bg-teal-50 rounded-lg flex items-center justify-center shrink-0'>
                  <Icon size={14} className='text-teal-500' />
                </div>
                <span className='text-sm font-semibold text-slate-800'>{title}</span>
              </div>
              {sub && <p className='text-xs text-slate-400 ml-9'>{sub}</p>}
            </div>
            {/* Baris data */}
            <div className='space-y-2.5'>
              {keys.map((k) => (
                <div key={k} className='flex justify-between items-center'>
                  <span className='text-xs text-slate-400 font-mono'>{formatLabel(k)}</span>
                  <span className='text-xs font-medium text-slate-700 text-right max-w-[55%]'>
                    {formatValue(k, entry[k])}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Grafik 7 Hari ── */
function WeeklyChart({ riwayat }) {
  const [selected, setSelected] = useState(null)
  const days = getLast7Days()

  const dataMap = {}
  riwayat.forEach((r) => { dataMap[r.tanggal] = r })

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className='bg-white border border-slate-100 rounded-3xl p-6 shadow-sm mb-6'>
      <div className='flex items-center gap-2 mb-5'>
        <LuTrendingUp size={16} className='text-teal-500' />
        <h2 className='text-base font-semibold text-slate-700'>Stress Level 7 Hari Terakhir</h2>
      </div>

      {/* Bar chart */}
      <div className='flex items-end gap-2 mb-3' style={{ height: '160px' }}>
        {days.map((date) => {
          const entry = dataMap[date]
          const level = entry?.stressLevel
          const c = level ? STRESS_COLOR[level] : null
          const isToday = date === today
          const isSelected = selected?.tanggal === date
          const d = new Date(date)
          const dayLabel = DAY_LABEL[d.getDay()]

          return (
            <div
              key={date}
              className='flex-1 flex flex-col items-center gap-1 cursor-pointer group'
              onClick={() => entry ? setSelected(isSelected ? null : entry) : null}
            >
              <div className='w-full flex items-end' style={{ height: '140px' }}>
                {level ? (
                  <div
                    className={`w-full rounded-t-xl transition-all duration-300 ${c.bar} ${isSelected ? 'opacity-100 ring-2 ring-offset-1 ring-teal-400' : 'opacity-80 group-hover:opacity-100'}`}
                    style={{ height: `${STRESS_HEIGHT[level]}px` }}
                  />
                ) : (
                  <div className='w-full rounded-t-xl bg-slate-100 opacity-50' style={{ height: '20px' }} />
                )}
              </div>
              <span className={`text-xs font-medium ${isToday ? 'text-teal-500' : 'text-slate-400'}`}>
                {dayLabel}
              </span>
              {isToday && <div className='w-1 h-1 rounded-full bg-teal-400' />}
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className='flex flex-wrap gap-3 mb-4'>
        {Object.entries(STRESS_COLOR).map(([label, c]) => (
          <div key={label} className='flex items-center gap-1.5'>
            <div className={`w-2.5 h-2.5 rounded-full ${c.dot}`} />
            <span className='text-xs text-slate-400'>{label}</span>
          </div>
        ))}
      </div>

      {/* Detail popup saat bar diklik */}
      {selected && (
        <div className={`${STRESS_COLOR[selected.stressLevel].bg} border ${STRESS_COLOR[selected.stressLevel].border} rounded-2xl p-5 mt-2`}>
          <div className='flex justify-between items-start mb-4'>
            <div>
              <div className='text-xs font-mono text-slate-400 mb-1 tracking-wider'>RIWAYAT INPUT</div>
              <div className='text-sm font-semibold text-slate-700'>{selected.tanggal}</div>
            </div>
            <div className='flex items-center gap-2'>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${STRESS_COLOR[selected.stressLevel].badge}`}>
                Stress: {selected.stressLevel}
              </span>
              <button
                onClick={() => setSelected(null)}
                className='w-7 h-7 bg-white/70 border border-slate-200 rounded-full flex items-center justify-center hover:bg-slate-50'
              >
                <LuX size={13} className='text-slate-400' />
              </button>
            </div>
          </div>
          <div className='space-y-3'>
            {INPUT_SECTIONS.map(({ title, icon: Icon, keys }) => (
              <div key={title}>
                <div className='flex items-center gap-1.5 mb-1.5'>
                  <Icon size={11} className='text-slate-400' />
                  <span className='text-xs font-semibold text-slate-500'>{title}</span>
                </div>
                <div className='grid grid-cols-2 gap-x-4 gap-y-1 pl-4'>
                  {keys.map((k) => (
                    <div key={k} className='flex justify-between items-center'>
                      <span className='text-xs text-slate-400 font-mono truncate mr-2'>{formatLabel(k)}</span>
                      <span className='text-xs font-medium text-slate-700 shrink-0'>{formatValue(k, selected[k])}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!riwayat.length && (
        <p className='text-center text-sm text-slate-400 mt-2'>
          Belum ada riwayat. Mulai isi input harian untuk melihat grafik.
        </p>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────
   Main Dashboard
───────────────────────────────────────────── */
function Dashboard() {
  const navigate = useNavigate()
  const { user } = useApp()
  const [riwayat, setRiwayat] = useState([])
  const today = new Date().toISOString().split('T')[0]

  useEffect(() => {
    const raw = localStorage.getItem('riwayat_harian')
    if (raw) setRiwayat(JSON.parse(raw))
  }, [])

  const todayEntry = riwayat.find((r) => r.tanggal === today) ?? null

  const displayName = user?.name || user?.nama || null

  return (
    <MainLayout title='Dashboard'>
      <div className='max-w-2xl mx-auto'>

        {/* Greeting */}
        <div className='mb-6'>
          <h1 className='text-2xl md:text-3xl font-bold text-slate-800'>
            {getGreeting()},{' '}
            <span className={displayName ? 'text-teal-500' : 'text-slate-300 italic'}>
              {displayName ?? 'Guest'}
            </span>
            👋
          </h1>
          <p className='text-slate-400 mt-1.5 text-sm'>Pantau kesehatan mental harianmu</p>
        </div>

        {/* 1. Stress level hari ini */}
        <StressHero entry={todayEntry} />

        {/* 2. Grafik 7 hari */}
        <WeeklyChart riwayat={riwayat} />

        {/* 3. Ringkasan semua input hari ini */}
        {todayEntry ? (
          <InputRingkasan entry={todayEntry} />
        ) : (
          <div className='bg-teal-50 border border-teal-100 rounded-2xl p-5 text-center'>
            <p className='text-sm text-teal-600 mb-3'>Kamu belum mengisi input harian hari ini.</p>
            <button
              onClick={() => navigate('/input-harian')}
              className='px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-white text-sm font-semibold rounded-xl transition-all'
            >
              Isi Sekarang
            </button>
          </div>
        )}

      </div>
    </MainLayout>
  )
}

export default Dashboard