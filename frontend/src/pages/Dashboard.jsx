import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LuBrain,
  LuMoon,
  LuSmartphone,
  LuBriefcase,
  LuHeart,
  LuUsers,
  LuLeaf,
  LuTrendingUp,
  LuCalendarDays,
  LuX,
  LuClipboardList,
} from 'react-icons/lu'
import MainLayout from '../layouts/MainLayout'

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

const STRESS_HEIGHT = { 'Rendah': '25%', 'Sedang': '50%', 'Tinggi': '75%', 'Sangat Tinggi': '100%' }

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
    durasi_tidur_menit:      'Durasi Tidur',
    sering_terbangun_malam:  'Terbangun Malam',
    mimpi_buruk:             'Mimpi Buruk',
    minum_kopi_hari_ini:     'Minum Kopi',
    merokok:                 'Merokok',
    konsumsi_alkohol:        'Konsumsi Alkohol',
    screen_sebelum_tidur:    'Screen Sebelum Tidur',
    jam_kerja_menit:         'Jam Kerja',
    deadline_hari_ini:       'Deadline Hari Ini',
    lembur:                  'Lembur',
    pekerjaan:               'Pekerjaan',
    waktu_outdoor:           'Waktu Outdoor',
    aktivitas_hobi:          'Aktivitas Hobi',
    suasana_hati:            'Suasana Hati',
    tingkat_kecemasan:       'Tingkat Kecemasan',
    konflik_interpersonal:   'Konflik Interpersonal',
    merasa_kesepian:         'Merasa Kesepian',
    meditasi:                'Meditasi',
  }
  return map[key] || key
}

function formatValue(key, val) {
  if (val === null || val === undefined) return '-'
  if (key === 'durasi_tidur_menit') return `${val} menit (${(val / 60).toFixed(1)} jam)`
  if (key === 'screen_sebelum_tidur') return `${val} menit`
  if (key === 'jam_kerja_menit') return `${val} menit (${(val / 60).toFixed(1)} jam)`
  if (key === 'waktu_outdoor') return `${val} menit`
  if (key === 'tingkat_kecemasan') return `${val} / 10`
  return String(val)
}

const INPUT_SECTIONS = [
  {
    title: 'Tidur',
    icon: LuMoon,
    keys: ['durasi_tidur_menit', 'sering_terbangun_malam', 'mimpi_buruk'],
  },
  {
    title: 'Gaya Hidup',
    icon: LuLeaf,
    keys: ['minum_kopi_hari_ini', 'merokok', 'konsumsi_alkohol'],
  },
  {
    title: 'Layar & Kerja',
    icon: LuSmartphone,
    keys: ['screen_sebelum_tidur', 'jam_kerja_menit', 'deadline_hari_ini', 'lembur'],
  },
  {
    title: 'Pekerjaan & Aktivitas',
    icon: LuBriefcase,
    keys: ['pekerjaan', 'waktu_outdoor', 'aktivitas_hobi'],
  },
  {
    title: 'Suasana Hati',
    icon: LuHeart,
    keys: ['suasana_hati', 'tingkat_kecemasan'],
  },
  {
    title: 'Sosial & Relaksasi',
    icon: LuUsers,
    keys: ['konflik_interpersonal', 'merasa_kesepian', 'meditasi'],
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
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
        {INPUT_SECTIONS.map(({ title, icon: Icon, keys }) => (
          <div key={title} className='bg-white border border-slate-100 rounded-2xl p-5 shadow-sm'>
            <div className='flex items-center gap-2 mb-3'>
              <div className='w-7 h-7 bg-teal-50 rounded-lg flex items-center justify-center'>
                <Icon size={14} className='text-teal-500' />
              </div>
              <span className='text-sm font-semibold text-slate-700'>{title}</span>
            </div>
            <div className='space-y-2'>
              {keys.map((k) => (
                <div key={k} className='flex justify-between items-center'>
                  <span className='text-xs text-slate-400'>{formatLabel(k)}</span>
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
      <div className='flex items-end gap-2 h-40 mb-3'>
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
              <div className='w-full flex-1 flex items-end'>
                {level ? (
                  <div
                    className={`w-full rounded-t-xl transition-all duration-300 ${c.bar} ${isSelected ? 'opacity-100 ring-2 ring-offset-1 ring-teal-400' : 'opacity-80 group-hover:opacity-100'}`}
                    style={{ height: STRESS_HEIGHT[level] }}
                  />
                ) : (
                  <div className='w-full rounded-t-xl bg-slate-100 opacity-50' style={{ height: '15%' }} />
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
          <div className='grid grid-cols-2 gap-x-6 gap-y-1.5'>
            {INPUT_SECTIONS.flatMap(({ keys }) => keys).map((k) => (
              <div key={k} className='flex justify-between items-center'>
                <span className='text-xs text-slate-400'>{formatLabel(k)}</span>
                <span className='text-xs font-medium text-slate-700'>{formatValue(k, selected[k])}</span>
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
  const [riwayat, setRiwayat] = useState([])
  const today = new Date().toISOString().split('T')[0]

  useEffect(() => {
    const raw = localStorage.getItem('riwayat_harian')
    if (raw) setRiwayat(JSON.parse(raw))
  }, [])

  const todayEntry = riwayat.find((r) => r.tanggal === today) ?? null

  return (
    <MainLayout title='Dashboard'>
      <div className='max-w-2xl mx-auto'>

        {/* Greeting */}
        <div className='mb-6'>
          <h1 className='text-2xl md:text-3xl font-bold text-slate-800'>{getGreeting()}</h1>
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