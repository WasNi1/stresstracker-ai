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
    icon: '😴',
    label: '1 / 6 — Tidur semalam',
    badge: 'Tidur',
    BadgeIcon: LuMoon,
  },
  {
    icon: '🧠',
    label: '2 / 6 — Perasaan hari ini',
    badge: 'Perasaan',
    BadgeIcon: LuBrain,
  },
  {
    icon: '🏃',
    label: '3 / 6 — Aktivitas fisik',
    badge: 'Aktivitas',
    BadgeIcon: LuDumbbell,
  },
  {
    icon: '🍽️',
    label: '4 / 6 — Gaya hidup',
    badge: 'Gaya Hidup',
    BadgeIcon: LuUtensils,
  },
  {
    icon: '📱',
    label: '5 / 6 — Gadget & kerja',
    badge: 'Gadget & Kerja',
    BadgeIcon: LuSmartphone,
  },
  {
    icon: '🤝',
    label: '6 / 6 — Sosial & relaksasi',
    badge: 'Sosial',
    BadgeIcon: LuUsers,
  },
  {
    icon: '✅',
    label: 'Hasil prediksi',
    badge: 'Hasil',
  },
]

/* ─────────────────────────────────────────────
   Konten tiap step
───────────────────────────────────────────── */

function Step1() {
  return (
    <>
      <SectionTitle sub='Geser sesuai durasi tidurmu'>Semalam tidur berapa jam?</SectionTitle>
      <Slider id='slp' min={2} max={12} step={0.5} defaultValue={7} unit=' jam' />

      <SectionTitle>Gimana kualitas tidurmu?</SectionTitle>
      <RatingRow
        id='sq'
        options={['😩', '😔', '😐', '😊', '😄']}
        leftLabel='Sangat buruk'
        rightLabel='Sangat nyenyak'
      />

      <div className='mt-2'>
        <YesNo label='Kebangun tengah malam?' />
        <YesNo label='Ada mimpi buruk? (opsional)' />
      </div>
    </>
  )
}

function Step2() {
  return (
    <>
      <SectionTitle>Mood kamu hari ini?</SectionTitle>
      <Slider id='md' min={1} max={10} defaultValue={6} unit='/10' />

      <SectionTitle>Seberapa cemas?</SectionTitle>
      <RatingRow id='ax' options={[1, 2, 3, 4, 5]} leftLabel='Tidak cemas' rightLabel='Sangat cemas' />

      <SectionTitle>Energi hari ini?</SectionTitle>
      <RatingRow id='en' options={['🪫', '😴', '😐', '⚡', '🔥']} leftLabel='Sangat loyo' rightLabel='Sangat bertenaga' />

      <SectionTitle>
        Ngerasa apa?{' '}
        <span className='text-sm font-normal text-slate-500'>(pilih semua yang sesuai)</span>
      </SectionTitle>
      <ChipGroup multi options={['Senang', 'Tenang', 'Excited', 'Sedih', 'Cemas', 'Marah', 'Lelah', 'Bosan']} />
    </>
  )
}

function Step3() {
  const [olahraga, setOlahraga] = useState(null)
  return (
    <>
      <SectionTitle>Olahraga hari ini?</SectionTitle>
      <div className='flex gap-3 mb-5'>
        <button
          onClick={() => setOlahraga(true)}
          className={`px-4 py-2 rounded-full border text-sm transition-all ${
            olahraga === true
              ? 'bg-teal-500/20 border-teal-500/50 text-teal-300'
              : 'border-slate-600 text-slate-400 hover:border-teal-500/40'
          }`}
        >
          Ya, olahraga
        </button>
        <button
          onClick={() => setOlahraga(false)}
          className={`px-4 py-2 rounded-full border text-sm transition-all ${
            olahraga === false
              ? 'bg-teal-500/20 border-teal-500/50 text-teal-300'
              : 'border-slate-600 text-slate-400 hover:border-teal-500/40'
          }`}
        >
          Tidak hari ini
        </button>
      </div>

      {olahraga && (
        <div className='bg-slate-800/60 border border-slate-700/50 rounded-2xl p-5 mb-5'>
          <div className='text-sm font-medium text-slate-300 mb-2'>Jenis olahraga?</div>
          <ChipGroup options={['Lari', 'Gym', 'Yoga', 'Renang', 'Sepeda', 'Jalan kaki', 'Badminton']} />
          <div className='text-sm font-medium text-slate-300 mb-2'>Berapa lama?</div>
          <Slider id='ed' min={5} max={120} defaultValue={30} unit=' menit' />
          <div className='text-sm font-medium text-slate-300 mb-2'>Intensitas</div>
          <ChipGroup options={['Ringan', 'Sedang', 'Berat']} />
        </div>
      )}

      <SectionTitle>
        Perkiraan langkah kaki?{' '}
        <span className='text-sm font-normal text-slate-500'>(boleh skip)</span>
      </SectionTitle>
      <Slider id='st' min={0} max={20000} step={500} defaultValue={6000} unit=' langkah' />
    </>
  )
}

function Step4() {
  return (
    <>
      <SectionTitle>Kopi / teh hari ini?</SectionTitle>
      <Slider id='cf' min={0} max={5} defaultValue={1} unit=' gelas' />

      <SectionTitle>Air putih?</SectionTitle>
      <Slider id='wa' min={0} max={5} step={0.5} defaultValue={2} unit=' liter' />

      <SectionTitle>Kualitas makan hari ini?</SectionTitle>
      <RatingRow id='fq' options={[1, 2, 3, 4, 5]} leftLabel='Sangat buruk' rightLabel='Sangat bergizi' />

      <div className='mt-2'>
        <YesNo label='Konsumsi alkohol hari ini?' />
        <YesNo label='Merokok hari ini?' />
      </div>
    </>
  )
}

function Step5() {
  return (
    <>
      <SectionTitle>Total screen time hari ini?</SectionTitle>
      <Slider id='sc' min={0} max={16} defaultValue={7} unit=' jam' />

      <SectionTitle>Main HP sebelum tidur semalam?</SectionTitle>
      <Slider id='sb' min={0} max={120} defaultValue={30} unit=' menit' />

      <SectionTitle>Beban kerja / belajar hari ini?</SectionTitle>
      <RatingRow id='wl' options={['😌', '🙂', '😐', '😓', '🤯']} leftLabel='Sangat ringan' rightLabel='Sangat berat' />

      <div className='mt-2'>
        <YesNo label='Scrolling sosmed tanpa tujuan?' />
        <YesNo label='Lembur / kerja di luar jam normal?' />
        <YesNo label='Ada deadline mendesak?' />
      </div>
    </>
  )
}

function Step6() {
  return (
    <>
      <SectionTitle>Interaksi sosial hari ini?</SectionTitle>
      <RatingRow id='ss' options={[1, 2, 3, 4, 5]} leftLabel='Tidak ada' rightLabel='Sangat banyak' />

      <div className='mt-2'>
        <YesNo label='Ada konflik dengan orang lain?' />
        <YesNo label='Ngerasa kesepian?' />
        <YesNo label='Sempat meditasi / napas dalam?' />
        <YesNo label='Lakukan hobi yang kamu suka?' />
        <div className='flex justify-between items-center py-3'>
          <span className='text-sm text-slate-300'>
            Waktu di luar ruangan{' '}
            <span className='text-xs text-slate-500'>(menit, opsional)</span>
          </span>
          <input
            type='number'
            placeholder='mnt'
            className='w-16 px-2 py-1.5 bg-slate-800 border border-slate-600 rounded-lg text-slate-200 font-mono text-sm focus:outline-none focus:border-teal-500'
          />
        </div>
      </div>
    </>
  )
}

function StepResult({ onReset }) {
  return (
    <>
      {/* Hero */}
      <div className='bg-teal-500/10 border border-teal-500/25 rounded-2xl p-6 text-center mb-5'>
        <div className='text-xs font-mono text-teal-400 mb-2 tracking-widest'>STRESS LEVEL HARI INI</div>
        <div className='font-serif text-5xl text-teal-300 leading-none mb-2'>Sedang</div>
        <div className='text-sm text-teal-400'>Level 2 dari 4 — Skala PSS</div>
      </div>

      {/* Sub-metrics */}
      <div className='grid grid-cols-2 gap-3 mb-5'>
        <div className='bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 text-center'>
          <div className='text-xs font-mono text-slate-500 mb-2'>KUALITAS TIDUR</div>
          <div className='text-xl font-serif text-blue-400'>Cukup</div>
          <div className='text-xs text-slate-500 mt-1'>Level 3 / 4 (PSQI)</div>
        </div>
        <div className='bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 text-center'>
          <div className='text-xs font-mono text-slate-500 mb-2'>MOOD</div>
          <div className='text-xl font-serif text-teal-300'>6 / 10</div>
          <div className='text-xs text-slate-500 mt-1'>Di atas rata-rata</div>
        </div>
      </div>

      {/* Rekomendasi */}
      <div className='text-sm font-medium text-slate-300 mb-3'>Rekomendasi AI untuk besok</div>
      {[
        '📱 Matikan HP minimal 30 menit sebelum tidur. Screen time malammu masih tinggi.',
        '☕ Batasi kafein setelah jam 14.00 untuk jaga kualitas tidur malam ini.',
        '🧘 Pertahankan rutinitas olahragamu — ini faktor terbesar yang turunkan stressmu.',
      ].map((r, i) => (
        <div key={i} className='bg-slate-800/60 rounded-xl px-4 py-3 text-sm text-slate-400 leading-relaxed mb-2'>
          {r}
        </div>
      ))}

      <div className='text-xs text-slate-600 leading-relaxed px-4 py-3 bg-slate-800/40 rounded-xl mt-4'>
        Rekomendasi ini dibuat oleh AI berdasarkan pola data harianmu. Ini bukan diagnosis medis. Jika stress berkepanjangan, pertimbangkan konsultasi dengan profesional.
      </div>

      <button
        onClick={onReset}
        className='w-full mt-5 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-900 font-semibold text-sm transition-all active:scale-[0.98]'
      >
        Lihat dashboard →
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
  const [animDir, setAnimDir] = useState(null) // 'left' | 'right'
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

  const segCount = TOTAL_STEPS - 1 // bar = 6 segmen (langkah 1–6, hasil tidak dihitung)

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
              {steps[currentStep].icon} {steps[currentStep].label}
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
                {currentStep === segCount - 1 ? 'Lihat hasil →' : 'Lanjut →'}
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