import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LuMoon,
  LuChevronLeft,
  LuChevronRight,
  LuActivity,
  LuBrain,
  LuUtensils,
  LuSmartphone,
  LuUsers,
} from 'react-icons/lu'
import MainLayout from '../layouts/MainLayout'

/* ─────────────────────────────────────────────
   Komponen bantu — controlled (onChange prop)
───────────────────────────────────────────── */

function Slider({ min, max, step = 1, value, onChange, unit }) {
  return (
    <div className='mb-5'>
      <div className='flex items-center gap-4'>
        <input
          type='range'
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className='flex-1 accent-teal-500 h-2'
        />
        <span className='font-mono font-semibold text-teal-400 min-w-[80px] text-right text-base'>
          {value}{unit}
        </span>
      </div>
    </div>
  )
}

function RatingRow({ options, leftLabel, rightLabel, value, onChange }) {
  return (
    <div className='mb-5'>
      <div className='flex flex-wrap gap-2 mb-2'>
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => onChange(opt)}
            className={`w-11 h-11 rounded-xl border text-sm font-medium transition-all ${
              value === opt
                ? 'bg-teal-500 border-teal-500 text-white shadow-md shadow-teal-100'
                : 'bg-white border-slate-200 text-slate-600 hover:border-teal-300'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      {(leftLabel || rightLabel) && (
        <div className='flex justify-between text-xs text-slate-400'>
          <span>{leftLabel}</span>
          <span>{rightLabel}</span>
        </div>
      )}
    </div>
  )
}

function ChipGroup({ options, value, onChange }) {
  return (
    <div className='flex flex-wrap gap-2 mb-5'>
      {options.map((opt, i) => (
        <button
          key={i}
          onClick={() => onChange(opt)}
          className={`px-4 py-2 rounded-full border text-sm transition-all ${
            value === opt
              ? 'bg-teal-500 border-teal-500 text-white shadow-sm shadow-teal-100'
              : 'bg-white border-slate-200 text-slate-500 hover:border-teal-300'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}

function YesNo({ label, value, onChange }) {
  return (
    <div className='flex justify-between items-center py-3 border-b border-slate-100 last:border-0'>
      <span className='text-sm text-slate-600'>{label}</span>
      <div className='flex gap-2'>
        <button
          onClick={() => onChange('Ya')}
          className={`px-4 py-1.5 rounded-full border text-xs transition-all ${
            value === 'Ya'
              ? 'bg-teal-500 border-teal-500 text-white shadow-sm shadow-teal-100'
              : 'bg-white border-slate-200 text-slate-500 hover:border-teal-300'
          }`}
        >
          Ya
        </button>
        <button
          onClick={() => onChange('Tidak')}
          className={`px-4 py-1.5 rounded-full border text-xs transition-all ${
            value === 'Tidak'
              ? 'bg-slate-100 border-slate-300 text-slate-700'
              : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
          }`}
        >
          Tidak
        </button>
      </div>
    </div>
  )
}

function SectionTitle({ children, sub }) {
  return (
    <div className='mb-4'>
      <h3 className='text-xl font-semibold text-slate-800 leading-snug'>{children}</h3>
      {sub && <p className='text-sm text-slate-400 mt-1'>{sub}</p>}
    </div>
  )
}

/* ─────────────────────────────────────────────
   Steps config
───────────────────────────────────────────── */

const steps = [
  { label: '1 / 6 — Tidur',                  BadgeIcon: LuMoon },
  { label: '2 / 6 — Gaya Hidup',             BadgeIcon: LuUtensils },
  { label: '3 / 6 — Layar & Kerja',          BadgeIcon: LuSmartphone },
  { label: '4 / 6 — Pekerjaan & Aktivitas',  BadgeIcon: LuActivity },
  { label: '5 / 6 — Suasana Hati',           BadgeIcon: LuBrain },
  { label: '6 / 6 — Sosial & Relaksasi',     BadgeIcon: LuUsers },
]

/* ─────────────────────────────────────────────
   Hitung stress dari form data
───────────────────────────────────────────── */
function hitungStress(d) {
  let skor = 0
  // Tidur < 360 mnt = tambah stres
  if (d.durasi_tidur_menit < 360) skor += 2
  else if (d.durasi_tidur_menit < 420) skor += 1
  if (d.sering_terbangun_malam === 'Ya') skor += 1
  if (d.mimpi_buruk === 'Ya') skor += 1
  // Gaya hidup
  if (d.minum_kopi_hari_ini === 'Ya') skor += 1
  if (d.merokok === 'Ya') skor += 1
  if (d.konsumsi_alkohol === 'Ya') skor += 1
  // Kerja
  if (d.screen_sebelum_tidur > 60) skor += 1
  if (d.jam_kerja_menit > 600) skor += 2
  if (d.deadline_hari_ini === 'Ya') skor += 1
  if (d.lembur === 'Ya') skor += 1
  // Aktivitas — hobi & outdoor mengurangi stres
  if (d.aktivitas_hobi === 'Ya') skor -= 1
  if (d.waktu_outdoor > 30) skor -= 1
  // Suasana hati
  if (d.suasana_hati === 'Negatif') skor += 2
  else if (d.suasana_hati === 'Campur') skor += 1
  else if (d.suasana_hati === 'Positif') skor -= 1
  skor += Math.floor((d.tingkat_kecemasan / 10) * 3)
  // Sosial
  if (d.konflik_interpersonal === 'Ya') skor += 2
  if (d.merasa_kesepian === 'Ya') skor += 1
  if (d.meditasi === 'Ya') skor -= 1

  if (skor <= 3) return 'Rendah'
  if (skor <= 7) return 'Sedang'
  if (skor <= 11) return 'Tinggi'
  return 'Sangat Tinggi'
}

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
const INIT = {
  // Step 1
  durasi_tidur_menit: 420,
  sering_terbangun_malam: null,
  mimpi_buruk: null,
  // Step 2
  minum_kopi_hari_ini: null,
  merokok: null,
  konsumsi_alkohol: null,
  // Step 3
  screen_sebelum_tidur: 30,
  jam_kerja_menit: 480,
  deadline_hari_ini: null,
  lembur: null,
  // Step 4
  pekerjaan: null,
  waktu_outdoor: 60,
  aktivitas_hobi: null,
  // Step 5
  suasana_hati: null,
  tingkat_kecemasan: 5,
  // Step 6
  konflik_interpersonal: null,
  merasa_kesepian: null,
  meditasi: null,
}

function DailyInput() {
  const navigate = useNavigate()
  const [form, setForm] = useState(INIT)
  const [currentStep, setCurrentStep] = useState(0)
  const [animDir, setAnimDir] = useState(null)
  const [visible, setVisible] = useState(true)

  const set = (key) => (val) => setForm((f) => ({ ...f, [key]: val }))

  const TOTAL_STEPS = steps.length

  const goTo = (dir) => {
    const next = currentStep + dir
    if (next < 0 || next >= TOTAL_STEPS) return
    setAnimDir(dir > 0 ? 'left' : 'right')
    setVisible(false)
    setTimeout(() => {
      setCurrentStep(next)
      setAnimDir(dir > 0 ? 'right' : 'left')
      setVisible(true)
    }, 180)
  }

  const handleSubmit = () => {
    const tanggal = new Date().toISOString().split('T')[0]
    const stressLevel = hitungStress(form)
    const entry = { tanggal, stressLevel, ...form }

    // Simpan ke localStorage
    const raw = localStorage.getItem('riwayat_harian')
    const riwayat = raw ? JSON.parse(raw) : []
    // Hapus entri hari ini kalau sudah ada
    const filtered = riwayat.filter((r) => r.tanggal !== tanggal)
    filtered.push(entry)
    // Simpan hanya 30 hari terakhir
    filtered.sort((a, b) => a.tanggal.localeCompare(b.tanggal))
    localStorage.setItem('riwayat_harian', JSON.stringify(filtered.slice(-30)))

    navigate('/')
  }

  const stepContent = [
    // Step 1 — Tidur
    <>
      <SectionTitle sub='Geser sesuai durasi tidur semalam'>Durasi tidur semalam</SectionTitle>
      <Slider min={0} max={1440} step={30} value={form.durasi_tidur_menit} onChange={set('durasi_tidur_menit')} unit=' menit' />
      <div className='mt-2'>
        <YesNo label='Sering terbangun saat tidur malam?' value={form.sering_terbangun_malam} onChange={set('sering_terbangun_malam')} />
        <YesNo label='Mengalami mimpi buruk?' value={form.mimpi_buruk} onChange={set('mimpi_buruk')} />
      </div>
    </>,

    // Step 2 — Gaya Hidup
    <>
      <SectionTitle>Konsumsi pada hari ini</SectionTitle>
      <div className='mt-2'>
        <YesNo label='Mengonsumsi kopi pada hari ini?' value={form.minum_kopi_hari_ini} onChange={set('minum_kopi_hari_ini')} />
        <YesNo label='Merokok?' value={form.merokok} onChange={set('merokok')} />
        <YesNo label='Mengonsumsi alkohol pada hari ini?' value={form.konsumsi_alkohol} onChange={set('konsumsi_alkohol')} />
      </div>
    </>,

    // Step 3 — Layar & Kerja
    <>
      <SectionTitle sub='Durasi penggunaan layar (HP/laptop) sebelum tidur semalam'>Screen time sebelum tidur</SectionTitle>
      <Slider min={0} max={1440} step={10} value={form.screen_sebelum_tidur} onChange={set('screen_sebelum_tidur')} unit=' menit' />
      <SectionTitle sub='Total jam kerja atau belajar hari ini'>Jam kerja / belajar hari ini</SectionTitle>
      <Slider min={0} max={1440} step={30} value={form.jam_kerja_menit} onChange={set('jam_kerja_menit')} unit=' menit' />
      <div className='mt-2'>
        <YesNo label='Ada deadline pekerjaan / tugas hari ini?' value={form.deadline_hari_ini} onChange={set('deadline_hari_ini')} />
        <YesNo label='Bekerja melebihi jam normal (lembur)?' value={form.lembur} onChange={set('lembur')} />
      </div>
    </>,

    // Step 4 — Pekerjaan & Aktivitas
    <>
      <SectionTitle>Pekerjaan</SectionTitle>
      <ChipGroup options={['Dokter', 'Freelancer', 'Guru', 'IRT', 'Karyawan', 'Mahasiswa', 'Wirausaha']} value={form.pekerjaan} onChange={set('pekerjaan')} />
      <SectionTitle sub='Durasi waktu di luar ruangan hari ini'>Waktu di luar ruangan</SectionTitle>
      <Slider min={0} max={1440} step={10} value={form.waktu_outdoor} onChange={set('waktu_outdoor')} unit=' menit' />
      <div className='mt-2'>
        <YesNo label='Melakukan aktivitas hobi hari ini?' value={form.aktivitas_hobi} onChange={set('aktivitas_hobi')} />
      </div>
    </>,

    // Step 5 — Suasana Hati
    <>
      <SectionTitle>Suasana hati secara umum hari ini</SectionTitle>
      <ChipGroup options={['Positif', 'Negatif', 'Netral', 'Campur']} value={form.suasana_hati} onChange={set('suasana_hati')} />
      <SectionTitle sub='Skor kecemasan yang dirasakan hari ini (self-report)'>Tingkat kecemasan</SectionTitle>
      <RatingRow
        options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        leftLabel='Tidak cemas'
        rightLabel='Sangat cemas'
        value={form.tingkat_kecemasan}
        onChange={set('tingkat_kecemasan')}
      />
    </>,

    // Step 6 — Sosial & Relaksasi
    <>
      <SectionTitle>Sosial & relaksasi hari ini</SectionTitle>
      <div className='mt-2'>
        <YesNo label='Terjadi konflik / pertengkaran dengan orang lain?' value={form.konflik_interpersonal} onChange={set('konflik_interpersonal')} />
        <YesNo label='Merasa kesepian hari ini?' value={form.merasa_kesepian} onChange={set('merasa_kesepian')} />
        <YesNo label='Melakukan meditasi hari ini?' value={form.meditasi} onChange={set('meditasi')} />
      </div>
    </>,
  ]

  return (
    <MainLayout title='Input Harian'>
      <div className='max-w-2xl mx-auto'>

        {/* Step bar */}
        <div className='flex gap-1 mb-6'>
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className={`h-[3px] flex-1 rounded-full transition-all duration-300 ${
                i < currentStep ? 'bg-teal-500' : i === currentStep ? 'bg-teal-300' : 'bg-slate-200'
              }`}
            />
          ))}
        </div>

        {/* Card */}
        <div className='bg-white/80 backdrop-blur border border-slate-100 shadow-xl shadow-teal-50 rounded-3xl p-7 md:p-9 min-h-[520px] flex flex-col'>

          <div
            className='flex-1 transition-all duration-200 overflow-y-auto'
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : animDir === 'left' ? 'translateX(-24px)' : 'translateX(24px)',
            }}
          >
            <div className='text-xs font-mono text-slate-400 mb-3 tracking-wider'>
              {steps[currentStep].label}
            </div>
            {stepContent[currentStep]}
          </div>

          {/* Navigation */}
          <div className='flex items-center justify-between pt-6 mt-2 border-t border-slate-100'>
            <button
              onClick={() => goTo(-1)}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                currentStep === 0
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'border border-slate-200 text-slate-500 hover:border-teal-300 hover:text-slate-700'
              }`}
            >
              <LuChevronLeft size={16} />
              Kembali
            </button>

            {currentStep < TOTAL_STEPS - 1 ? (
              <button
                onClick={() => goTo(1)}
                className='flex items-center gap-2 px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-900 text-sm font-semibold transition-all active:scale-[0.97]'
              >
                Lanjut
                <LuChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className='flex items-center gap-2 px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-900 text-sm font-semibold transition-all active:scale-[0.97]'
              >
                Simpan & Lihat Hasil
                <LuChevronRight size={16} />
              </button>
            )}
          </div>

        </div>
      </div>
    </MainLayout>
  )
}

export default DailyInput