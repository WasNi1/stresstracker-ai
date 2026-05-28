import { useState, useEffect } from 'react'
import {
  LuCalendar,
  LuChevronDown,
  LuChevronUp,
  LuTrendingDown,
  LuTrendingUp,
  LuMinus,
  LuSearch,
  LuFilter,
  LuX,
  LuActivity,
  LuLoader,
} from 'react-icons/lu'
import MainLayout from '../layouts/MainLayout'

/* ─────────────────────────────────────────────
   Warna & label helper
───────────────────────────────────────────── */

const colorMap = {
  teal:  { tag: 'bg-teal-50 border-teal-200 text-teal-600',    dot: 'bg-teal-400' },
  amber: { tag: 'bg-amber-50 border-amber-200 text-amber-600', dot: 'bg-amber-400' },
  red:   { tag: 'bg-red-50 border-red-200 text-red-500',       dot: 'bg-red-400' },
  blue:  { tag: 'bg-blue-50 border-blue-200 text-blue-500',    dot: 'bg-blue-400' },
}


const STRESS_COLOR = {
  Rendah: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-600', badge: 'bg-emerald-100 text-emerald-600', bar: 'bg-emerald-400', dot: 'bg-emerald-400' },
  Sedang: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-500', badge: 'bg-amber-100 text-amber-600', bar: 'bg-amber-400', dot: 'bg-amber-400' },
  Tinggi: { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-500', badge: 'bg-rose-100 text-rose-600', bar: 'bg-rose-400', dot: 'bg-rose-400' },
}

const STRESS_HEIGHT = { Rendah: 40, Sedang: 80, Tinggi: 120 }

const KONSENTRASI_LABELS = {
  1: 'Sangat Tidak Fokus',
  2: 'Kurang Fokus',
  3: 'Cukup Fokus',
  4: 'Fokus',
  5: 'Sangat Fokus',
}

const INTERAKSI_SOSIAL_LABELS = {
  1: 'Sangat Minim',
  2: 'Sedikit',
  3: 'Sedang',
  4: 'Banyak',
  5: 'Sangat Banyak',
}

function formatSkalaLabel(key, val) {
  const label = key === 'konsentrasi' ? KONSENTRASI_LABELS[val] : INTERAKSI_SOSIAL_LABELS[val]
  return label || '-'
}
const DAY_LABEL = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']

function getLast7Days() {
  const days = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    days.push(d.toISOString().split('T')[0])
  }
  return days
}

function formatLabel(key) {
  const map = {
    durasi_tidur_menit: 'Durasi Tidur (menit)',
    sering_terbangun_malam: 'Sering Terbangun Malam',
    mimpi_buruk: 'Mimpi Buruk',
    screen_sebelum_tidur: 'Screen Sebelum Tidur (menit)',
    minum_kopi_hari_ini: 'Minum Kopi Hari Ini',
    merokok: 'Merokok',
    konsumsi_alkohol: 'Konsumsi Alkohol',
    deadline_hari_ini: 'Deadline Hari Ini',
    lembur: 'Lembur',
    konsentrasi: 'Konsentrasi',
    suasana_hati: 'Suasana Hati',
    konflik_interpersonal: 'Konflik Interpersonal',
    merasa_kesepian: 'Merasa Kesepian',
    interaksi_sosial: 'Interaksi Sosial',
    meditasi: 'Meditasi',
    aktivitas_hobi: 'Aktivitas Hobi',
    waktu_outdoor: 'Waktu Outdoor',
  }
  return map[key] || key
}

function formatValue(key, val) {
  if (val === null || val === undefined) return '-'
  if (key === 'durasi_tidur_menit' || key === 'waktu_outdoor') {
    const j = Math.floor(val / 60)
    const m = val % 60
    const jamStr = j > 0 && m > 0 ? `${j} jam ${m} menit` : j > 0 ? `${j} jam` : `${m} menit`
    return `${val} menit (${jamStr})`
  }
  if (key === 'screen_sebelum_tidur') return `${val} menit`
  if (key === 'konsentrasi' || key === 'interaksi_sosial') return formatSkalaLabel(key, val)
  return String(val)
}

const INPUT_SECTIONS = [
  { title: 'Pola & kualitas tidur', keys: ['durasi_tidur_menit', 'sering_terbangun_malam', 'mimpi_buruk', 'screen_sebelum_tidur'] },
  { title: 'Konsumsi zat & substansi', keys: ['minum_kopi_hari_ini', 'merokok', 'konsumsi_alkohol'] },
  { title: 'Beban & tekanan kerja', keys: ['deadline_hari_ini', 'lembur', 'konsentrasi'] },
  { title: 'Kondisi hubungan sosial', keys: ['suasana_hati', 'konflik_interpersonal', 'merasa_kesepian', 'interaksi_sosial'] },
  { title: 'Aktivitas pemulihan diri', keys: ['meditasi', 'aktivitas_hobi', 'waktu_outdoor'] },
]

function WeeklyChart({ entries }) {
  const [selected, setSelected] = useState(null)
  const days = getLast7Days()
  const dataMap = {}
  ;(entries || []).forEach((r) => { dataMap[r.dateISO] = r })
  const today = new Date().toISOString().split('T')[0]

  return (
    <div className='bg-white border border-slate-100 rounded-3xl p-6 shadow-sm mb-6'>
      <div className='flex items-center gap-2 mb-5'>
        <LuTrendingUp size={16} className='text-teal-500' />
        <h2 className='text-base font-semibold text-slate-700'>Stress Level 7 Hari Terakhir</h2>
      </div>
      <div className='flex items-end gap-2 mb-3' style={{ height: '160px' }}>
        {days.map((date) => {
          const entry = dataMap[date]
          const level = entry?.stress?.label
          const c = level ? STRESS_COLOR[level] : null
          const isToday = date === today
          const isSelected = selected?.dateISO === date
          const d = new Date(date)
          const dayLabel = DAY_LABEL[d.getDay()]
          return (
            <div key={date} className='flex-1 flex flex-col items-center gap-1 cursor-pointer group' onClick={() => entry ? setSelected(isSelected ? null : entry) : null}>
              <div className='w-full flex items-end' style={{ height: '140px' }}>
                {level ? (
                  <div className={`w-full rounded-t-xl transition-all duration-300 ${c.bar} ${isSelected ? 'opacity-100 ring-2 ring-offset-1 ring-teal-400' : 'opacity-80 group-hover:opacity-100'}`} style={{ height: `${STRESS_HEIGHT[level]}px` }} />
                ) : (
                  <div className='w-full rounded-t-xl bg-slate-100 opacity-50' style={{ height: '20px' }} />
                )}
              </div>
              <span className={`text-xs font-medium ${isToday ? 'text-teal-500' : 'text-slate-400'}`}>{dayLabel}</span>
              {isToday && <div className='w-1 h-1 rounded-full bg-teal-400' />}
            </div>
          )
        })}
      </div>
      <div className='flex flex-wrap gap-3 mb-4'>
        {Object.entries(STRESS_COLOR).map(([label, c]) => (
          <div key={label} className='flex items-center gap-1.5'>
            <div className={`w-2.5 h-2.5 rounded-full ${c.dot}`} />
            <span className='text-xs text-slate-400'>{label}</span>
          </div>
        ))}
      </div>
      {selected && (
        <div className={`${STRESS_COLOR[selected.stress.label].bg} border ${STRESS_COLOR[selected.stress.label].border} rounded-2xl p-5 mt-2`}>
          <div className='flex justify-between items-start mb-4'>
            <div>
              <div className='text-xs font-mono text-slate-400 mb-1 tracking-wider'>RIWAYAT INPUT</div>
              <div className='text-sm font-semibold text-slate-700'>{selected.date}</div>
            </div>
            <div className='flex items-center gap-2'>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${STRESS_COLOR[selected.stress.label].badge}`}>Stress: {selected.stress.label}</span>
              <button onClick={() => setSelected(null)} className='w-7 h-7 bg-white/70 border border-slate-200 rounded-full flex items-center justify-center hover:bg-slate-50'>
                <LuX size={13} className='text-slate-400' />
              </button>
            </div>
          </div>
          <div className='space-y-3'>
            {INPUT_SECTIONS.map(({ title, keys }) => (
              <div key={title}>
                <div className='text-xs font-semibold text-slate-500 mb-1.5'>{title}</div>
                <div className='grid grid-cols-2 gap-x-4 gap-y-1 pl-1'>
                  {keys.map((k) => (
                    <div key={k} className='flex justify-between items-center'>
                      <span className='text-xs text-slate-400 font-mono truncate mr-2'>{formatLabel(k)}</span>
                      <span className='text-xs font-medium text-slate-700 shrink-0'>{formatValue(k, selected.details?.[k])}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {(!entries || !entries.length) && <p className='text-center text-sm text-slate-400 mt-2'>Belum ada riwayat. Mulai isi input harian untuk melihat grafik.</p>}
    </div>
  )
}

function Tag({ color, children }) {
  const cls = colorMap[color]?.tag ?? colorMap.teal.tag
  return (
    <span className={`inline-block px-3 py-0.5 rounded-full border text-xs font-medium ${cls}`}>
      {children}
    </span>
  )
}

function StressDot({ color }) {
  const cls = colorMap[color]?.dot ?? 'bg-slate-300'
  return <span className={`w-2 h-2 rounded-full flex-shrink-0 mt-1 ${cls}`} />
}

function MoodTrend({ current, prev }) {
  if (!prev || !current) return null
  if (current > prev) return <LuTrendingUp size={13} className='text-teal-400' />
  if (current < prev) return <LuTrendingDown size={13} className='text-red-400' />
  return <LuMinus size={13} className='text-slate-500' />
}

/* ─────────────────────────────────────────────
   Detail Panel (expand)
───────────────────────────────────────────── */

function DetailRow({ label, value }) {
  const displayValue =
    value === null || value === undefined || value === '' ? '-' : value
  return (
    <div className='flex justify-between items-center py-2.5 border-b border-slate-100 last:border-0'>
      <span className='text-xs text-slate-400'>{label}</span>
      <span className='text-xs font-mono text-slate-700'>{displayValue}</span>
    </div>
  )
}


function toNumber(value) {
  const n = Number(value)
  return Number.isFinite(n) ? n : null
}

function isYes(value) {
  if (typeof value === 'boolean') return value
  return String(value || '').toLowerCase() === 'ya'
}

function buildLogRecommendation(entry) {
  const d = entry?.details || {}
  const stressLevel = entry?.stress?.label || d.stressLevel || d.stress || 'Belum diketahui'
  const sleep = toNumber(d.durasi_tidur_menit)
  const screen = toNumber(d.screen_sebelum_tidur)
  const outdoor = toNumber(d.waktu_outdoor)
  const konsentrasi = toNumber(d.konsentrasi)
  const sosial = toNumber(d.interaksi_sosial)

  const causes = []
  const actions = []

  if (sleep !== null && sleep < 360) {
    causes.push('Durasi tidur masih kurang')
    actions.push('Coba tambah waktu tidur dan buat jadwal tidur lebih teratur.')
  }
  if (screen !== null && screen > 60) {
    causes.push('Screen time sebelum tidur cukup tinggi')
    actions.push('Kurangi penggunaan HP/laptop 30–60 menit sebelum tidur.')
  }
  if (isYes(d.merokok)) {
    causes.push('Ada kebiasaan merokok')
    actions.push('Kurangi rokok secara bertahap, terutama saat sedang stres.')
  }
  if (isYes(d.lembur) || isYes(d.deadline_hari_ini)) {
    causes.push('Ada tekanan kerja/deadline')
    actions.push('Bagi tugas menjadi bagian kecil dan ambil jeda singkat.')
  }
  if (outdoor !== null && outdoor < 20) {
    causes.push('Waktu outdoor masih rendah')
    actions.push('Luangkan 10–20 menit untuk jalan santai atau terkena udara luar.')
  }
  if (konsentrasi !== null && konsentrasi <= 2) {
    causes.push('Konsentrasi sedang menurun')
    actions.push('Gunakan teknik 25 menit fokus dan 5 menit istirahat.')
  }
  if (sosial !== null && sosial <= 2) {
    causes.push('Interaksi sosial masih sedikit')
    actions.push('Coba hubungi teman/keluarga atau lakukan obrolan ringan.')
  }

  if (stressLevel === 'Tinggi') {
    return {
      color: 'red',
      level: 'Stress tinggi',
      title: 'Prioritaskan pemulihan',
      conclusion: causes.length
        ? `Kesimpulan dari log ini: stres tinggi kemungkinan dipengaruhi oleh ${causes.slice(0, 3).join(', ').toLowerCase()}.`
        : 'Kesimpulan dari log ini: stres sedang tinggi, tubuh perlu diberi waktu istirahat dan pemulihan.',
      causes,
      actions: actions.length ? actions : ['Ambil jeda, tarik napas perlahan, dan kurangi aktivitas yang terlalu membebani.'],
    }
  }

  if (stressLevel === 'Sedang') {
    return {
      color: 'amber',
      level: 'Stress sedang',
      title: 'Jaga ritme harian',
      conclusion: causes.length
        ? `Kesimpulan dari log ini: kondisi masih cukup stabil, tetapi ${causes.slice(0, 2).join(', ').toLowerCase()} perlu diperhatikan.`
        : 'Kesimpulan dari log ini: kondisi cukup stabil. Pertahankan pola tidur, aktivitas, dan waktu istirahat.',
      causes,
      actions: actions.length ? actions : ['Pertahankan rutinitas sehat dan luangkan waktu istirahat yang cukup.'],
    }
  }

  return {
    color: 'teal',
    level: stressLevel === 'Rendah' ? 'Stress rendah' : stressLevel,
    title: 'Kondisi cukup baik',
    conclusion: 'Kesimpulan dari log ini: tingkat stres terlihat rendah. Pertahankan kebiasaan baik yang sudah dilakukan.',
    causes,
    actions: actions.length ? actions : ['Pertahankan tidur cukup, aktivitas ringan, dan interaksi sosial yang positif.'],
  }
}

function recommendationBadge(color) {
  return {
    teal: 'bg-teal-50 text-teal-600 border-teal-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
    red: 'bg-rose-50 text-rose-600 border-rose-100',
  }[color] || 'bg-slate-50 text-slate-500 border-slate-100'
}

function LogRecommendation({ entry }) {
  const result = buildLogRecommendation(entry)

  return (
    <div className='mt-4 bg-white border border-slate-100 rounded-2xl p-4'>
      <div className='flex flex-wrap items-center gap-2 mb-3'>
        <span className={`px-3 py-1 rounded-full border text-xs font-bold ${recommendationBadge(result.color)}`}>{result.level}</span>
        <span className='text-xs font-mono text-slate-400'>REKOMENDASI LOG INI</span>
      </div>
      <h4 className='text-sm font-bold text-slate-800 mb-1.5'>{result.title}</h4>
      <p className='text-xs text-slate-600 leading-relaxed mb-4'>{result.conclusion}</p>

      <div className='grid sm:grid-cols-2 gap-3'>
        <div className='bg-slate-50 border border-slate-100 rounded-xl p-3'>
          <div className='text-xs font-semibold text-slate-600 mb-2'>Faktor yang terlihat</div>
          {result.causes.length ? (
            <ul className='space-y-1.5'>
              {result.causes.slice(0, 4).map((item, idx) => <li key={idx} className='text-xs text-slate-500'>• {item}</li>)}
            </ul>
          ) : (
            <p className='text-xs text-slate-400'>Belum ada faktor risiko yang menonjol.</p>
          )}
        </div>
        <div className='bg-slate-50 border border-slate-100 rounded-xl p-3'>
          <div className='text-xs font-semibold text-slate-600 mb-2'>Saran tindakan</div>
          <ul className='space-y-1.5'>
            {result.actions.slice(0, 4).map((item, idx) => <li key={idx} className='text-xs text-slate-500'>• {item}</li>)}
          </ul>
        </div>
      </div>
    </div>
  )
}

function ExpandedDetail({ entry }) {
  const { details } = entry

  return (
    <div className='mt-4 pt-4 border-t border-slate-100'>
      <div className='bg-slate-50 border border-slate-100 rounded-2xl p-4'>
        <div className='text-xs font-mono text-slate-400 mb-3 tracking-wider'>DATA INPUT HARIAN</div>
        <div className='space-y-4'>
          {INPUT_SECTIONS.map(({ title, keys }) => (
            <div key={title}>
              <div className='text-xs font-semibold text-slate-500 mb-2'>{title}</div>
              <div className='grid sm:grid-cols-2 gap-x-5'>
                {keys.map((k) => (
                  <DetailRow key={k} label={formatLabel(k)} value={formatValue(k, details?.[k])} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <LogRecommendation entry={entry} />
    </div>
  )
}

/* ─────────────────────────────────────────────
   History Row
───────────────────────────────────────────── */

function RiwayatRow({ entry, prevEntry, isExpanded, onToggle }) {
  return (
    <div
      className={`rounded-2xl border transition-all duration-200 ${
        isExpanded
          ? 'bg-teal-50/60 border-teal-200'
          : 'bg-white border-slate-100 hover:border-teal-200 hover:shadow-sm'
      }`}
    >
      <button
        onClick={onToggle}
        className='w-full flex items-center gap-3 px-5 py-4 text-left'
      >
        <StressDot color={entry.stress?.color} />

        <div className='flex flex-col min-w-[90px]'>
          <span className='text-xs font-mono text-slate-600'>{entry.date ?? '-'}</span>
          <span className='text-[11px] text-slate-400 mt-0.5'>{entry.dayName ?? ''}</span>
        </div>

        {/* Tags — desktop */}
        <div className='hidden sm:flex flex-wrap gap-2 flex-1'>
          {entry.stress ? (
            <Tag color={entry.stress.color}>Stress: {entry.stress.label}</Tag>
          ) : (
            <Tag color='slate'>Stress: -</Tag>
          )}
          {entry.sleep ? (
            <Tag color={entry.sleep.color}>Tidur: {entry.sleep.label}</Tag>
          ) : null}
          {entry.mood ? (
            <Tag color={entry.mood.color}>Mood: {entry.mood.score}/10</Tag>
          ) : null}
        </div>

        {/* Tags — mobile */}
        <div className='flex sm:hidden flex-col gap-1 flex-1'>
          {entry.stress ? (
            <Tag color={entry.stress.color}>Stress: {entry.stress.label}</Tag>
          ) : (
            <Tag color='slate'>Stress: -</Tag>
          )}
        </div>

        <div className='flex items-center gap-1.5'>
          <MoodTrend current={entry.mood?.score} prev={prevEntry?.mood?.score} />
        </div>

        <div className='text-slate-400'>
          {isExpanded ? <LuChevronUp size={16} /> : <LuChevronDown size={16} />}
        </div>
      </button>

      {isExpanded && (
        <div className='px-5 pb-5'>
          <ExpandedDetail entry={entry} />
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────
   Stat Card
───────────────────────────────────────────── */

function StatCard({ label, value, sub, color = 'slate' }) {
  const valColor = {
    teal:  'text-teal-500',
    amber: 'text-amber-500',
    red:   'text-red-500',
    slate: 'text-slate-700',
  }[color]

  return (
    <div className='bg-white border border-slate-100 rounded-2xl p-5 text-center shadow-sm'>
      <div className='text-[10px] font-mono text-slate-400 tracking-widest mb-2'>{label}</div>
      <div className={`text-3xl font-bold leading-none mb-1.5 ${valColor}`}>
        {value ?? <span className='text-slate-300'>-</span>}
      </div>
      {sub && <div className='text-xs text-slate-400'>{sub}</div>}
    </div>
  )
}

/* ─────────────────────────────────────────────
   Mini Bar Chart
───────────────────────────────────────────── */

function MiniBarChart({ data, empty = false }) {
  if (empty || !data || data.length === 0) {
    return (
      <div className='h-40 flex flex-col items-center justify-center gap-2'>
        <LuActivity size={32} className='text-slate-200' />
        <p className='text-sm text-slate-300 font-medium'>Belum ada data</p>
      </div>
    )
  }

  const barColor = (level) => {
    if (level >= 3) return 'bg-red-400/70'
    if (level === 2) return 'bg-amber-400/70'
    return 'bg-teal-400/70'
  }

  return (
    <div className='flex items-end gap-1.5 h-40 mt-3'>
      {data.map((d, i) => (
        <div key={i} className='flex flex-col items-center gap-1 flex-1'>
          <div
            className={`w-full rounded-t-md transition-all ${barColor(d.level)}`}
            style={{ height: `${(d.level / 4) * 100}%`, minHeight: 4 }}
          />
          <span className='text-[9px] font-mono text-slate-600'>
            {d.dateShort?.slice(0, 2) ?? ''}
          </span>
        </div>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────
   Filter Chip
───────────────────────────────────────────── */

function FilterChip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
        active
          ? 'bg-teal-500 border-teal-500 text-white shadow-sm'
          : 'bg-white border-slate-200 text-slate-500 hover:border-teal-300'
      }`}
    >
      {label}
    </button>
  )
}

/* ─────────────────────────────────────────────
   Custom hook — fetch data
   TODO: hapus simulasi & uncomment API call
         ketika backend sudah siap
───────────────────────────────────────────── */

function useRiwayatData() {
  const [entries, setEntries]     = useState(null)   // null = belum ada data
  const [chartData, setChartData] = useState(null)
  const [stats, setStats]         = useState(null)
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)

  const fetchData = () => {
    setLoading(true)
    setError(null)
    try {
      const raw = localStorage.getItem('riwayat_harian')
      if (!raw) {
        // no local data yet
        setEntries([])
        setChartData([])
        setStats({ totalLog: 0, avgStress: 0, streak: 0, logWeek: 0 })
        setLoading(false)
        return
      }

      const riwayat = JSON.parse(raw)

      // normalize entries to UI shape used in this page
      const months = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des']
      const dayNames = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu']

      const mapped = riwayat.map((r, idx) => {
        const d = new Date(r.tanggal)
        const dateISO = r.tanggal
        const date = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
        const dateShort = `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}`
        const dayName = dayNames[d.getDay()]

        const stressLabel = r.stressLevel || r.stress || null
        const stressNum = r.stressNum ?? r.stressNum ?? null
        const color = stressLabel === 'Tinggi' ? 'red' : stressLabel === 'Sedang' ? 'amber' : 'teal'

        const sleepMinutes = r.durasi_tidur_menit ?? r.tidurJam ?? null

        return {
          id: r.id ?? idx,
          dateISO,
          date,
          dateShort,
          dayName,
          stress: stressLabel ? { level: stressNum ?? null, label: stressLabel, color } : null,
          mood: r.mood ?? null,
          details: r,
          rekomendasi: r.rekomendasi ?? [],
        }
      }).sort((a,b) => a.dateISO.localeCompare(b.dateISO))

      // chartData: per day values
      const chartData = mapped.map((e) => ({
        label: `${e.dayName} ${e.dateShort}`,
        labelShort: e.dateShort,
        stressLevel: e.stress?.level ?? 0,
        moodScore: e.mood?.score ?? 0,
        sleepHours: e.details?.durasi_tidur_menit != null ? parseFloat((e.details.durasi_tidur_menit/60).toFixed(1)) : 0,
      }))

      // stats
      const totalLog = mapped.length
      const avgStress = mapped.length ? (mapped.reduce((s, e) => s + (e.stress?.level ?? 0), 0) / mapped.length).toFixed(1) : 0
      const now = new Date(); now.setHours(23,59,59,999)
      const weekStart = new Date(now); weekStart.setDate(now.getDate() - 7); weekStart.setHours(0,0,0,0)
      const logWeek = mapped.filter(e => new Date(e.dateISO) >= weekStart && new Date(e.dateISO) <= now).length

      setEntries(mapped)
      setChartData(chartData)
      const uniqueDates = [...new Set(mapped.map((e) => e.dateISO).filter(Boolean))]
      const dateSet = new Set(uniqueDates)
      let streak = 0
      const cursor = new Date()
      cursor.setHours(0,0,0,0)
      while (true) {
        const key = cursor.toISOString().split('T')[0]
        if (!dateSet.has(key)) break
        streak += 1
        cursor.setDate(cursor.getDate() - 1)
      }

      setStats({ totalLog, avgStress, streak, logWeek })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  return { entries, chartData, stats, loading, error, refetch: fetchData }
}

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */

const STRESS_FILTERS = ['Semua', 'Rendah', 'Sedang', 'Tinggi']

export default function RiwayatPage() {
  const { entries, stats, loading } = useRiwayatData()
  const [expandedId, setExpandedId]   = useState(null)
  const [search, setSearch]           = useState('')
  const [filterStress, setFilterStress] = useState('Semua')

  /* Filter hanya jalan kalau ada data */
  const filtered = entries
    ? entries.filter((e) => {
        const matchSearch =
          (e.date ?? '').toLowerCase().includes(search.toLowerCase()) ||
          (e.dayName ?? '').toLowerCase().includes(search.toLowerCase())
        const matchFilter =
          filterStress === 'Semua' || e.stress?.label === filterStress
        return matchSearch && matchFilter
      })
    : []

  /* Stat values — '-' selama belum ada data dari backend */
  const totalLog  = stats?.totalLog  ?? '-'
  const streak    = stats?.streak    ?? '-'

  const periodEntries = entries ? entries.filter((e) => {
    const end = new Date(); end.setHours(23, 59, 59, 999)
    const start = new Date(end); start.setDate(end.getDate() - 7); start.setHours(0, 0, 0, 0)
    return new Date(e.dateISO) >= start && new Date(e.dateISO) <= end
  }) : []

  return (
    <MainLayout title='Riwayat Log'>
      <div className='max-w-3xl mx-auto'>

        {/* Stat cards */}
        <div className='grid grid-cols-2 gap-3 mb-6'>
          <StatCard label='LOG (PERIODE)' value={periodEntries.length ?? 0} sub='7 hari terakhir' color='slate' />
          <StatCard label='STREAK' value={streak} sub='Hari berturut-turut 🔥' color='teal' />
        </div>

        {/* Grafik 7 hari dari Dashboard */}
        {loading ? (
          <div className='bg-white border border-slate-100 rounded-3xl p-6 shadow-sm mb-6 h-56 flex items-center justify-center'>
            <LuLoader size={24} className='text-slate-300 animate-spin' />
          </div>
        ) : (
          <WeeklyChart entries={entries} />
        )}

        {/* ── Log list ── */}
        <div className='bg-white/80 backdrop-blur border border-slate-100 shadow-xl shadow-teal-50 rounded-3xl p-6 md:p-7'>

          {/* Header + search */}
          <div className='flex items-center justify-between gap-3 mb-4'>
            <div>
              <div className='text-base font-semibold text-slate-800'>Log Terakhir</div>
              <div className='text-xs text-slate-400 mt-0.5'>
                {loading ? 'Memuat data…' : entries ? `${filtered.length} entri ditemukan` : 'Belum ada log'}
              </div>
            </div>
            <div className='relative'>
              <LuSearch size={14} className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400' />
              <input
                type='text'
                placeholder='Cari tanggal…'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                disabled={!entries}
                className='pl-8 pr-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-teal-400 w-40 transition-all disabled:opacity-40'
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className='absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600'
                >
                  <LuX size={12} />
                </button>
              )}
            </div>
          </div>

          {/* Filter chips */}
          <div className='flex flex-wrap items-center gap-2 mb-5'>
            <LuFilter size={13} className='text-slate-400 flex-shrink-0' />
            {STRESS_FILTERS.map((f) => (
              <FilterChip
                key={f}
                label={f}
                active={filterStress === f}
                onClick={() => setFilterStress(f)}
              />
            ))}
          </div>

          {/* Content area */}
          {loading ? (
            /* Loading skeleton */
            <div className='flex flex-col gap-2'>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className='h-[60px] rounded-2xl bg-slate-100 animate-pulse'
                />
              ))}
            </div>
          ) : !entries || filtered.length === 0 ? (
            /* Empty state */
            <div className='text-center py-14'>
              <div className='w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4'>
                <LuCalendar size={28} className='text-slate-300' />
              </div>
              <div className='text-sm font-medium text-slate-500 mb-1'>
                {!entries ? 'Belum ada log tersimpan' : 'Tidak ada log yang cocok'}
              </div>
              <div className='text-xs text-slate-400'>
                {!entries
                  ? 'Mulai isi input harian pertamamu untuk melihat riwayat di sini.'
                  : 'Coba ubah filter atau kata pencarian.'}
              </div>
            </div>
          ) : (
            /* Log rows */
            <div className='flex flex-col gap-2'>
              {filtered.map((entry, idx) => {
                const prevEntry = filtered[idx + 1] ?? null
                return (
                  <RiwayatRow
                    key={entry.id}
                    entry={entry}
                    prevEntry={prevEntry}
                    isExpanded={expandedId === entry.id}
                    onToggle={() =>
                      setExpandedId(expandedId === entry.id ? null : entry.id)
                    }
                  />
                )
              })}
            </div>
          )}

        </div>
      </div>
    </MainLayout>
  )
}