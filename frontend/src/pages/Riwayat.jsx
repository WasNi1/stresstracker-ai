import { useState } from 'react'
import {
  LuCalendar,
  LuChevronRight,
  LuChevronDown,
  LuChevronUp,
  LuTrendingDown,
  LuTrendingUp,
  LuMinus,
  LuSearch,
  LuFilter,
  LuX,
} from 'react-icons/lu'
import MainLayout from '../layouts/MainLayout'

/* ─────────────────────────────────────────────
   Data dummy riwayat log
───────────────────────────────────────────── */

const riwayatData = [
  {
    id: 1,
    date: '01 Mei 2026',
    dateShort: '01/05',
    dayName: 'Kamis',
    stress: { level: 2, label: 'Sedang', color: 'amber' },
    sleep: { level: 3, label: 'Cukup', color: 'blue' },
    mood: { score: 7, color: 'teal' },
    details: {
      tidurJam: 7,
      kualitasTidur: '😊',
      anxiety: 2,
      energi: '⚡',
      screentime: 5,
      screenSebelumTidur: 25,
      bebanKerja: '😐',
      olahraga: true,
      jenisOlahraga: 'Lari',
      kafein: 2,
      airPutih: 2.5,
      deadline: false,
      meditasi: true,
    },
    rekomendasi: [
      '☕ Batasi kafein setelah jam 14.00 untuk jaga kualitas tidur.',
      '🧘 Pertahankan rutinitas meditasimu — sangat efektif turunkan kecemasan.',
    ],
  },
  {
    id: 2,
    date: '30 Apr 2026',
    dateShort: '30/04',
    dayName: 'Rabu',
    stress: { level: 3, label: 'Tinggi', color: 'red' },
    sleep: { level: 2, label: 'Buruk', color: 'red' },
    mood: { score: 4, color: 'red' },
    details: {
      tidurJam: 4.5,
      kualitasTidur: '😔',
      anxiety: 4,
      energi: '😴',
      screentime: 9,
      screenSebelumTidur: 75,
      bebanKerja: '😓',
      olahraga: false,
      jenisOlahraga: null,
      kafein: 4,
      airPutih: 1.5,
      deadline: true,
      meditasi: false,
    },
    rekomendasi: [
      '📱 Matikan HP minimal 30 menit sebelum tidur. Screen time malammu 75 menit — terlalu tinggi.',
      '😴 Prioritaskan tidur malam ini minimal 7 jam untuk recovery.',
      '☕ Kurangi kafein — 4 gelas terlalu banyak dan memperburuk kecemasan.',
    ],
  },
  {
    id: 3,
    date: '29 Apr 2026',
    dateShort: '29/04',
    dayName: 'Selasa',
    stress: { level: 2, label: 'Sedang', color: 'amber' },
    sleep: { level: 3, label: 'Baik', color: 'teal' },
    mood: { score: 6, color: 'teal' },
    details: {
      tidurJam: 7.5,
      kualitasTidur: '😊',
      anxiety: 2,
      energi: '⚡',
      screentime: 6,
      screenSebelumTidur: 30,
      bebanKerja: '😐',
      olahraga: true,
      jenisOlahraga: 'Gym',
      kafein: 2,
      airPutih: 3,
      deadline: false,
      meditasi: false,
    },
    rekomendasi: [
      '🏃 Bagus! Olahraga rutin sangat membantu turunkan stress. Pertahankan.',
      '💧 Tingkatkan asupan air putih — 3 liter ideal untuk tubuhmu.',
    ],
  },
  {
    id: 4,
    date: '28 Apr 2026',
    dateShort: '28/04',
    dayName: 'Senin',
    stress: { level: 1, label: 'Rendah', color: 'teal' },
    sleep: { level: 4, label: 'Sangat Baik', color: 'teal' },
    mood: { score: 8, color: 'teal' },
    details: {
      tidurJam: 8.5,
      kualitasTidur: '😄',
      anxiety: 1,
      energi: '🔥',
      screentime: 4,
      screenSebelumTidur: 10,
      bebanKerja: '😌',
      olahraga: true,
      jenisOlahraga: 'Yoga',
      kafein: 1,
      airPutih: 3.5,
      deadline: false,
      meditasi: true,
    },
    rekomendasi: [
      '🌟 Hari yang sangat baik! Jadikan ini sebagai baseline harianmu.',
      '🧘 Meditasi + screen time rendah = kombinasi terbaik. Lanjutkan.',
    ],
  },
  {
    id: 5,
    date: '27 Apr 2026',
    dateShort: '27/04',
    dayName: 'Minggu',
    stress: { level: 3, label: 'Tinggi', color: 'red' },
    sleep: { level: 2, label: 'Buruk', color: 'red' },
    mood: { score: 3, color: 'red' },
    details: {
      tidurJam: 5,
      kualitasTidur: '😩',
      anxiety: 4,
      energi: '🪫',
      screentime: 10,
      screenSebelumTidur: 90,
      bebanKerja: '🤯',
      olahraga: false,
      jenisOlahraga: null,
      kafein: 3,
      airPutih: 1,
      deadline: true,
      meditasi: false,
    },
    rekomendasi: [
      '🚨 Stress sangat tinggi. Pertimbangkan istirahat penuh hari ini.',
      '📱 Screen time 90 menit sebelum tidur sangat merusak kualitas tidurmu.',
      '💧 Hanya 1 liter air — dehidrasi memperparah kelelahan dan kecemasan.',
    ],
  },
  {
    id: 6,
    date: '26 Apr 2026',
    dateShort: '26/04',
    dayName: 'Sabtu',
    stress: { level: 2, label: 'Sedang', color: 'amber' },
    sleep: { level: 3, label: 'Cukup', color: 'blue' },
    mood: { score: 6, color: 'teal' },
    details: {
      tidurJam: 7,
      kualitasTidur: '😐',
      anxiety: 2,
      energi: '😐',
      screentime: 7,
      screenSebelumTidur: 45,
      bebanKerja: '🙂',
      olahraga: true,
      jenisOlahraga: 'Jalan kaki',
      kafein: 1,
      airPutih: 2,
      deadline: false,
      meditasi: false,
    },
    rekomendasi: [
      '🚶 Jalan kaki sudah bagus! Coba tambah intensitas untuk hasil optimal.',
      '📱 Kurangi screen time sebelum tidur ke bawah 30 menit.',
    ],
  },
]

/* ─────────────────────────────────────────────
   Warna & label helper
───────────────────────────────────────────── */

const colorMap = {
  teal:  { tag: 'bg-teal-50 border-teal-200 text-teal-600',    dot: 'bg-teal-400' },
  amber: { tag: 'bg-amber-50 border-amber-200 text-amber-600', dot: 'bg-amber-400' },
  red:   { tag: 'bg-red-50 border-red-200 text-red-500',       dot: 'bg-red-400' },
  blue:  { tag: 'bg-blue-50 border-blue-200 text-blue-500',    dot: 'bg-blue-400' },
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
  const cls = colorMap[color]?.dot ?? colorMap.teal.dot
  return <span className={`w-2 h-2 rounded-full flex-shrink-0 mt-1 ${cls}`} />
}

function MoodTrend({ current, prev }) {
  if (!prev) return null
  if (current > prev) return <LuTrendingUp size={13} className='text-teal-400' />
  if (current < prev) return <LuTrendingDown size={13} className='text-red-400' />
  return <LuMinus size={13} className='text-slate-500' />
}

/* ─────────────────────────────────────────────
   Detail Panel (expand)
───────────────────────────────────────────── */

function DetailRow({ label, value }) {
  return (
    <div className='flex justify-between items-center py-2.5 border-b border-slate-100 last:border-0'>
      <span className='text-xs text-slate-400'>{label}</span>
      <span className='text-xs font-mono text-slate-700'>{value}</span>
    </div>
  )
}

function ExpandedDetail({ entry }) {
  const { details, rekomendasi } = entry
  return (
    <div className='mt-4 pt-4 border-t border-slate-100 grid md:grid-cols-2 gap-5'>

      {/* Detail data */}
      <div className='bg-slate-50 border border-slate-100 rounded-2xl p-4'>
        <div className='text-xs font-mono text-slate-400 mb-3 tracking-wider'>DATA HARIAN</div>
        <DetailRow label='Durasi tidur' value={`${details.tidurJam} jam`} />
        <DetailRow label='Kualitas tidur' value={details.kualitasTidur} />
        <DetailRow label='Kecemasan' value={`${details.anxiety} / 5`} />
        <DetailRow label='Energi' value={details.energi} />
        <DetailRow label='Screen time' value={`${details.screentime} jam`} />
        <DetailRow label='HP sebelum tidur' value={`${details.screenSebelumTidur} menit`} />
        <DetailRow label='Beban kerja' value={details.bebanKerja} />
        <DetailRow label='Kafein' value={`${details.kafein} gelas`} />
        <DetailRow label='Air putih' value={`${details.airPutih} liter`} />
        <DetailRow label='Olahraga' value={details.olahraga ? (details.jenisOlahraga ?? 'Ya') : 'Tidak'} />
        <DetailRow label='Deadline mendesak' value={details.deadline ? 'Ya' : 'Tidak'} />
        <DetailRow label='Meditasi' value={details.meditasi ? 'Ya ✓' : 'Tidak'} />
      </div>

      {/* Rekomendasi AI */}
      <div>
        <div className='text-xs font-mono text-slate-400 mb-3 tracking-wider'>REKOMENDASI AI</div>
        <div className='flex flex-col gap-2'>
          {rekomendasi.map((r, i) => (
            <div
              key={i}
              className='bg-teal-50 border border-teal-100 rounded-xl px-4 py-3 text-sm text-slate-600 leading-relaxed'
            >
              {r}
            </div>
          ))}
        </div>
        <div className='mt-3 text-xs text-slate-400 leading-relaxed px-3 py-2.5 bg-slate-50 border border-slate-100 rounded-xl'>
          Rekomendasi ini dibuat oleh AI berdasarkan pola data harianmu. Bukan diagnosis medis.
        </div>
      </div>

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
      {/* Row header */}
      <button
        onClick={onToggle}
        className='w-full flex items-center gap-3 px-5 py-4 text-left'
      >
        {/* Dot */}
        <StressDot color={entry.stress.color} />

        {/* Date */}
        <div className='flex flex-col min-w-[90px]'>
          <span className='text-xs font-mono text-slate-600'>{entry.date}</span>
          <span className='text-[11px] text-slate-400 mt-0.5'>{entry.dayName}</span>
        </div>

        {/* Tags */}
        <div className='hidden sm:flex flex-wrap gap-2 flex-1'>
          <Tag color={entry.stress.color}>Stress: {entry.stress.label}</Tag>
          <Tag color={entry.sleep.color}>Tidur: {entry.sleep.label}</Tag>
          <Tag color={entry.mood.color}>Mood: {entry.mood.score}/10</Tag>
        </div>
        {/* Tags mobile */}
        <div className='flex sm:hidden flex-col gap-1 flex-1'>
          <Tag color={entry.stress.color}>Stress: {entry.stress.label}</Tag>
        </div>

        {/* Mood trend vs previous */}
        <div className='flex items-center gap-1.5'>
          <MoodTrend current={entry.mood.score} prev={prevEntry?.mood.score} />
        </div>

        {/* Expand icon */}
        <div className={`text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-0' : ''}`}>
          {isExpanded ? <LuChevronUp size={16} /> : <LuChevronDown size={16} />}
        </div>
      </button>

      {/* Expanded detail */}
      {isExpanded && (
        <div className='px-5 pb-5'>
          <ExpandedDetail entry={entry} />
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────
   Stat mini-card
───────────────────────────────────────────── */

function StatCard({ label, value, sub, color = 'slate' }) {
  const valColor = {
    teal: 'text-teal-500',
    amber: 'text-amber-500',
    red: 'text-red-500',
    slate: 'text-slate-700',
  }[color]

  return (
    <div className='bg-white border border-slate-100 rounded-2xl p-5 text-center shadow-sm'>
      <div className='text-[10px] font-mono text-slate-400 tracking-widest mb-2'>{label}</div>
      <div className={`text-3xl font-bold leading-none mb-1.5 ${valColor}`}>{value}</div>
      {sub && <div className='text-xs text-slate-400'>{sub}</div>}
    </div>
  )
}

/* ─────────────────────────────────────────────
   Bar mini chart
───────────────────────────────────────────── */

function MiniBarChart({ data }) {
  const max = 4
  const barColor = (level) => {
    if (level >= 3) return 'bg-red-400/70'
    if (level === 2) return 'bg-amber-400/70'
    return 'bg-teal-400/70'
  }

  return (
    <div className='flex items-end gap-1.5 h-16 mt-3'>
      {data.map((d, i) => (
        <div key={i} className='flex flex-col items-center gap-1 flex-1'>
          <div
            className={`w-full rounded-t-md transition-all ${barColor(d.level)}`}
            style={{ height: `${(d.level / max) * 100}%`, minHeight: 4 }}
          />
          <span className='text-[9px] font-mono text-slate-600'>{d.dateShort.slice(0, 2)}</span>
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
   Main Component
───────────────────────────────────────────── */

export default function RiwayatPage() {
  const [expandedId, setExpandedId] = useState(null)
  const [search, setSearch] = useState('')
  const [filterStress, setFilterStress] = useState('Semua')

  const stressFilters = ['Semua', 'Rendah', 'Sedang', 'Tinggi']

  const filtered = riwayatData.filter((e) => {
    const matchSearch =
      e.date.toLowerCase().includes(search.toLowerCase()) ||
      e.dayName.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filterStress === 'Semua' || e.stress.label === filterStress
    return matchSearch && matchFilter
  })

  const avgStress = (
    riwayatData.reduce((s, e) => s + e.stress.level, 0) / riwayatData.length
  ).toFixed(1)

  const totalLog = riwayatData.length

  const chartData = [...riwayatData]
    .reverse()
    .slice(-7)
    .map((e) => ({ level: e.stress.level, dateShort: e.dateShort }))

  return (
    <MainLayout title='Riwayat Log'>
      <div className='max-w-3xl mx-auto px-0 md:px-0'>

        {/* ── Stats row ── */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-3 mb-6'>
          <StatCard label='TOTAL LOG' value={totalLog} sub='Sejak bergabung' color='slate' />
          <StatCard label='RATA-RATA STRESS' value={avgStress} sub='Level (PSS-based)' color='amber' />
          <StatCard label='STREAK' value='7' sub='Hari berturut-turut 🔥' color='teal' />
          <StatCard label='LOG MINGGU INI' value='6/7' sub='Hari tercatat' color='slate' />
        </div>

        {/* ── Trend mini chart ── */}
        <div className='bg-white border border-slate-100 rounded-3xl p-5 mb-6 shadow-sm'>
          <div className='flex items-center justify-between mb-1'>
            <div className='text-sm font-semibold text-slate-700'>Tren Stress 7 Hari Terakhir</div>
            <span className='text-[11px] font-mono text-teal-500 bg-teal-50 border border-teal-100 px-2 py-0.5 rounded-full'>
              Skala PSS 1–4
            </span>
          </div>
          <div className='text-xs text-slate-400 mb-1'>Level stress harian</div>
          <MiniBarChart data={chartData} />
          <div className='flex gap-3 mt-3 flex-wrap'>
            {[
              { label: 'Rendah', cls: 'bg-teal-400' },
              { label: 'Sedang', cls: 'bg-amber-400' },
              { label: 'Tinggi', cls: 'bg-red-400' },
            ].map((l) => (
              <div key={l.label} className='flex items-center gap-1.5'>
                <span className={`w-2.5 h-2.5 rounded-sm ${l.cls}`} />
                <span className='text-[11px] text-slate-500'>{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── List header ── */}
        <div className='bg-white/80 backdrop-blur border border-slate-100 shadow-xl shadow-teal-50 rounded-3xl p-6 md:p-7'>

          {/* Title + search */}
          <div className='flex items-center justify-between gap-3 mb-4'>
            <div>
              <div className='text-base font-semibold text-slate-800'>Log Terakhir</div>
              <div className='text-xs text-slate-400 mt-0.5'>{filtered.length} entri ditemukan</div>
            </div>
            <div className='relative'>
              <LuSearch size={14} className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400' />
              <input
                type='text'
                placeholder='Cari tanggal…'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='pl-8 pr-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-teal-400 w-40 transition-all'
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
            {stressFilters.map((f) => (
              <FilterChip
                key={f}
                label={f}
                active={filterStress === f}
                onClick={() => setFilterStress(f)}
              />
            ))}
        </div>
          {filtered.length === 0 ? (
            <div className='text-center py-12 text-slate-400'>
              <LuCalendar size={32} className='mx-auto mb-3 opacity-40' />
              <div className='text-sm'>Tidak ada log yang cocok</div>
            </div>
          ) : (
            <div className='flex flex-col gap-2'>
              {filtered.map((entry, idx) => {
                const prevEntry = filtered[idx + 1] ?? null
                return (
                  <RiwayatRow
                    key={entry.id}
                    entry={entry}
                    prevEntry={prevEntry}
                    isExpanded={expandedId === entry.id}
                    onToggle={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
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