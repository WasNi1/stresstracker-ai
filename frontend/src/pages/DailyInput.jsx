import { useState } from 'react'
import {
  LuMoon,
  LuBrain,
  LuActivity,
  LuChevronLeft,
  LuChevronRight,
  LuHeartPulse,
  LuSmile,
  LuDumbbell,
  LuUtensils,
  LuSmartphone,
  LuUsers,
} from 'react-icons/lu'
import MainLayout from '../layouts/MainLayout'

/* ─────────────────────────────────────────────
   Komponen bantu
───────────────────────────────────────────── */

function Slider({ min, max, step = 1, defaultValue, unit, label }) {
  const [val, setVal] = useState(defaultValue)
  return (
    <div className='mb-5'>
      {label && <div className='text-sm text-slate-400 mb-2'>{label}</div>}
      <div className='flex items-center gap-4'>
        <input
          type='range'
          min={min}
          max={max}
          step={step}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          className='flex-1 accent-teal-500 h-2'
        />
        <span className='font-mono font-semibold text-teal-400 min-w-[72px] text-right text-base'>
          {val}{unit}
        </span>
      </div>
    </div>
  )
}

function RatingRow({ options, leftLabel, rightLabel }) {
  const [sel, setSel] = useState(null)
  return (
    <div className='mb-5'>
      <div className='flex gap-2 mb-2'>
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => setSel(i)}
            className={`w-12 h-12 rounded-xl border text-sm font-medium transition-all ${
              sel === i
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

function ChipGroup({ options, multi = false }) {
  const [sel, setSel] = useState(new Set())
  const toggle = (opt) => {
    if (multi) {
      setSel((prev) => {
        const next = new Set(prev)
        next.has(opt) ? next.delete(opt) : next.add(opt)
        return next
      })
    } else {
      setSel(new Set([opt]))
    }
  }
  return (
    <div className='flex flex-wrap gap-2 mb-5'>
      {options.map((opt, i) => (
        <button
          key={i}
          onClick={() => toggle(opt)}
          className={`px-4 py-2 rounded-full border text-sm transition-all ${
            sel.has(opt)
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

function YesNo({ label }) {
  const [val, setVal] = useState(null)
  return (
    <div className='flex justify-between items-center py-3 border-b border-slate-100 last:border-0'>
      <span className='text-sm text-slate-600'>{label}</span>
      <div className='flex gap-2'>
        <button
          onClick={() => setVal('y')}
          className={`px-4 py-1.5 rounded-full border text-xs transition-all ${
            val === 'y'
              ? 'bg-teal-500 border-teal-500 text-white shadow-sm shadow-teal-100'
              : 'bg-white border-slate-200 text-slate-500 hover:border-teal-300'
          }`}
        >
          Ya
        </button>
        <button
          onClick={() => setVal('n')}
          className={`px-4 py-1.5 rounded-full border text-xs transition-all ${
            val === 'n'
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
   6 Steps
───────────────────────────────────────────── */

const steps = [
  {
    label: '1 / 6 — Tidur',
    badge: 'Tidur',
    BadgeIcon: LuMoon,
  },
  {
    label: '2 / 6 — Gaya Hidup',
    badge: 'Gaya Hidup',
    BadgeIcon: LuUtensils,
  },
  {
    label: '3 / 6 — Layar & Kerja',
    badge: 'Layar & Kerja',
    BadgeIcon: LuSmartphone,
  },
  {
    label: '4 / 6 — Pekerjaan & Aktivitas',
    badge: 'Pekerjaan',
    BadgeIcon: LuActivity,
  },
  {
    label: '5 / 6 — Suasana Hati',
    badge: 'Suasana Hati',
    BadgeIcon: LuBrain,
  },
  {
    label: '6 / 6 — Sosial & Relaksasi',
    badge: 'Sosial',
    BadgeIcon: LuUsers,
  },
  {
    label: 'Hasil prediksi',
    badge: 'Hasil',
  },
]

/* ─────────────────────────────────────────────
   Konten tiap step
───────────────────────────────────────────── */

// Step 1 — Tidur (kolom: durasi_tidur_menit, sering_terbangun_malam, mimpi_buruk)
function Step1() {
  return (
    <>
      <SectionTitle sub='Geser sesuai durasi tidur semalam'>
        Durasi tidur semalam
      </SectionTitle>
      <Slider min={0} max={1440} step={30} defaultValue={420} unit=' menit' />

      <div className='mt-2'>
        <YesNo label='Sering terbangun saat tidur malam?' />
        <YesNo label='Mengalami mimpi buruk?' />
      </div>
    </>
  )
}

// Step 2 — Gaya Hidup (kolom: minum_kopi_hari_ini, merokok, konsumsi_alkohol)
function Step2() {
  return (
    <>
      <SectionTitle>Konsumsi pada hari ini</SectionTitle>
      <div className='mt-2'>
        <YesNo label='Mengonsumsi kopi pada hari ini?' />
        <YesNo label='Merokok?' />
        <YesNo label='Mengonsumsi alkohol pada hari ini?' />
      </div>
    </>
  )
}

// Step 3 — Layar & Kerja (kolom: screen_sebelum_tidur, jam_kerja_menit, deadline_hari_ini, lembur)
function Step3() {
  return (
    <>
      <SectionTitle sub='Durasi penggunaan layar (HP/laptop) sebelum tidur semalam'>
        Screen time sebelum tidur
      </SectionTitle>
      <Slider min={0} max={1440} step={10} defaultValue={30} unit=' menit' />

      <SectionTitle sub='Total jam kerja atau belajar hari ini'>
        Jam kerja / belajar hari ini
      </SectionTitle>
      <Slider min={0} max={1440} step={30} defaultValue={480} unit=' menit' />

      <div className='mt-2'>
        <YesNo label='Ada deadline pekerjaan / tugas hari ini?' />
        <YesNo label='Bekerja melebihi jam normal (lembur)?' />
      </div>
    </>
  )
}

// Step 4 — Pekerjaan & Aktivitas (kolom: pekerjaan, waktu_outdoor, aktivitas_hobi)
function Step4() {
  return (
    <>
      <SectionTitle>Pekerjaan</SectionTitle>
      <ChipGroup options={['Dokter', 'Freelancer', 'Guru', 'IRT', 'Karyawan', 'Mahasiswa', 'Wirausaha']} />

      <SectionTitle sub='Durasi waktu di luar ruangan hari ini'>
        Waktu di luar ruangan
      </SectionTitle>
      <Slider min={0} max={1440} step={10} defaultValue={60} unit=' menit' />

      <div className='mt-2'>
        <YesNo label='Melakukan aktivitas hobi hari ini?' />
      </div>
    </>
  )
}

// Step 5 — Suasana Hati & Kecemasan (kolom: suasana_hati, tingkat_kecemasan)
function Step5() {
  return (
    <>
      <SectionTitle>Suasana hati secara umum hari ini</SectionTitle>
      <ChipGroup options={['Positif', 'Negatif', 'Netral', 'Campur']} />

      <SectionTitle sub='Skor kecemasan yang dirasakan hari ini (self-report)'>
        Tingkat kecemasan
      </SectionTitle>
      <RatingRow
        options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        leftLabel='Tidak cemas'
        rightLabel='Sangat cemas'
      />
    </>
  )
}

// Step 6 — Sosial & Relaksasi (kolom: konflik_interpersonal, merasa_kesepian, meditasi)
function Step6() {
  return (
    <>
      <SectionTitle>Sosial & relaksasi hari ini</SectionTitle>
      <div className='mt-2'>
        <YesNo label='Terjadi konflik / pertengkaran dengan orang lain?' />
        <YesNo label='Merasa kesepian hari ini?' />
        <YesNo label='Melakukan meditasi hari ini?' />
      </div>
    </>
  )
}

function StepResult({ onReset }) {
  return (
    <>
      <div className='bg-teal-50 border border-teal-200 rounded-2xl p-6 text-center mb-5'>
        <div className='text-xs font-mono text-teal-500 mb-2 tracking-widest'>STRESS LEVEL HARI INI</div>
        <div className='text-5xl font-bold text-teal-600 leading-none mb-2'>Sedang</div>
        <div className='text-sm text-teal-500'>Level 2 dari 4 — Skala PSS</div>
      </div>

      <div className='grid grid-cols-2 gap-3 mb-5'>
        <div className='bg-blue-50 border border-blue-100 rounded-xl p-4 text-center'>
          <div className='text-xs font-mono text-slate-400 mb-2'>KUALITAS TIDUR</div>
          <div className='text-xl font-bold text-blue-500'>Cukup</div>
          <div className='text-xs text-slate-400 mt-1'>Level 3 / 4 (PSQI)</div>
        </div>
        <div className='bg-teal-50 border border-teal-100 rounded-xl p-4 text-center'>
          <div className='text-xs font-mono text-slate-400 mb-2'>SUASANA HATI</div>
          <div className='text-xl font-bold text-teal-500'>Positif</div>
          <div className='text-xs text-slate-400 mt-1'>Di atas rata-rata</div>
        </div>
      </div>

      <div className='text-sm font-medium text-slate-600 mb-3'>Rekomendasi untuk besok</div>
      {[
        'Matikan HP minimal 30 menit sebelum tidur.',
        'Batasi kafein setelah jam 14.00.',
        'Pertahankan aktivitas hobi dan waktu di luar ruangan.',
      ].map((r, i) => (
        <div key={i} className='bg-teal-50 border border-teal-100 rounded-xl px-4 py-3 text-sm text-slate-600 leading-relaxed mb-2'>
          {r}
        </div>
      ))}

      <div className='text-xs text-slate-400 leading-relaxed px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl mt-4'>
        Rekomendasi ini dibuat oleh AI. Bukan diagnosis medis.
      </div>

      <button
        onClick={onReset}
        className='w-full mt-5 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-900 font-semibold text-sm transition-all active:scale-[0.98]'
      >
        Lihat dashboard
      </button>
    </>
  )
}

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */

const STEP_CONTENT = [Step1, Step2, Step3, Step4, Step5, Step6]
const TOTAL_STEPS = steps.length // 7 including hasil

function DailyInput() {
  const [currentStep, setCurrentStep] = useState(0)
  const [animDir, setAnimDir] = useState(null)
  const [visible, setVisible] = useState(true)
  const isResult = currentStep >= TOTAL_STEPS - 1

  const navigate = (dir) => {
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

  const segCount = TOTAL_STEPS - 1

  return (
    <MainLayout title='Input Harian'>
      <div className='max-w-2xl mx-auto'>

        {/* Step bar */}
        <div className='flex gap-1 mb-6'>
          {Array.from({ length: segCount }).map((_, i) => (
            <div
              key={i}
              className={`h-[3px] flex-1 rounded-full transition-all duration-300 ${
                i < currentStep
                  ? 'bg-teal-500'
                  : i === currentStep
                  ? 'bg-teal-300'
                  : 'bg-slate-200'
              }`}
            />
          ))}
        </div>

        {/* Card */}
        <div className='bg-white/80 backdrop-blur border border-slate-100 shadow-xl shadow-teal-50 rounded-3xl p-7 md:p-9 min-h-[520px] flex flex-col'>

          {/* Animated content */}
          <div
            className='flex-1 transition-all duration-200 overflow-y-auto'
            style={{
              opacity: visible ? 1 : 0,
              transform: visible
                ? 'translateX(0)'
                : animDir === 'left'
                ? 'translateX(-24px)'
                : 'translateX(24px)',
            }}
          >
            {/* Step label */}
            <div className='text-xs font-mono text-slate-400 mb-3 tracking-wider'>
              {steps[currentStep].label}
            </div>

            {/* Step content */}
            {isResult ? (
              <StepResult onReset={() => setCurrentStep(0)} />
            ) : (
              (() => {
                const StepComp = STEP_CONTENT[currentStep]
                return <StepComp />
              })()
            )}
          </div>

          {/* Navigation buttons */}
          {!isResult && (
            <div className='flex items-center justify-between pt-6 mt-2 border-t border-slate-100'>
              <button
                onClick={() => navigate(-1)}
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

              <button
                onClick={() => navigate(1)}
                className='flex items-center gap-2 px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-900 text-sm font-semibold transition-all active:scale-[0.97]'
              >
                {currentStep === segCount - 1 ? 'Lihat hasil' : 'Lanjut'}
                <LuChevronRight size={16} />
              </button>
            </div>
          )}
        </div>

      </div>
    </MainLayout>
  )
}

export default DailyInput