import { useState, useEffect } from 'react'
import {
  LuTrendingDown,
  LuTrendingUp,
  LuShield,
  LuMoon,
  LuActivity,
  LuSmartphone,
  LuCoffee,
  LuDroplets,
  LuBrain,
  LuSparkles,
  LuInfo,
  LuTriangleAlert,
  LuLoader,
} from 'react-icons/lu'
import MainLayout from '../layouts/MainLayout'
import { getTrendChart, getTrendPerHari, getSleepStressCorr, getFaktorData, getAiInsights } from '../api/trend-insight'

/* ─────────────────────────────────────────────
   Helper: warna
───────────────────────────────────────────── */

function stressColor(v) {
  if (v >= 3) return '#f87171'
  if (v >= 2) return '#fbbf24'
  return '#2dd4bf'
}

function stressBarBg(v) {
  if (v >= 3) return 'bg-red-400/70'
  if (v >= 2) return 'bg-amber-400/70'
  return 'bg-teal-400/70'
}

const tagColorMap = {
  teal:  'bg-teal-50 border-teal-200 text-teal-600',
  amber: 'bg-amber-50 border-amber-200 text-amber-600',
  red:   'bg-red-50 border-red-200 text-red-500',
  blue:  'bg-blue-50 border-blue-200 text-blue-500',
}

function Tag({ color, children }) {
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full border text-[11px] font-medium ${tagColorMap[color]}`}>
      {children}
    </span>
  )
}

/* ─────────────────────────────────────────────
   Empty / Loading states
───────────────────────────────────────────── */

function ChartSkeleton({ height = 80 }) {
  return (
    <div
      className='flex items-end gap-1.5 animate-pulse'
      style={{ height }}
    >
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className='flex-1 bg-slate-100 rounded-t-sm'
          style={{ height: `${30 + Math.random() * 50}%` }}
        />
      ))}
    </div>
  )
}

function EmptyChart({ message = 'Belum ada data', height = 80 }) {
  return (
    <div
      className='flex flex-col items-center justify-center gap-2 bg-slate-50 rounded-2xl border border-dashed border-slate-200'
      style={{ height }}
    >
      <LuActivity size={22} className='text-slate-200' />
      <p className='text-xs text-slate-300 font-medium'>{message}</p>
    </div>
  )
}

function InsightSkeleton() {
  return (
    <div className='flex flex-col gap-3'>
      {[1, 2, 3].map(i => (
        <div key={i} className='h-14 rounded-2xl bg-slate-100 animate-pulse' />
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────
   StatCard
───────────────────────────────────────────── */

function StatCard({ label, value, sub, color = 'slate', icon: Icon, loading }) {
  const valColor = {
    teal:  'text-teal-500',
    amber: 'text-amber-500',
    red:   'text-red-500',
    slate: 'text-slate-700',
  }[color]

  return (
    <div className='bg-white border border-slate-100 rounded-2xl p-5 shadow-sm'>
      <div className='flex items-start justify-between mb-3'>
        <div className='text-[10px] font-mono text-slate-400 tracking-widest leading-tight'>{label}</div>
        {Icon && <Icon size={14} className='text-slate-300 flex-shrink-0' />}
      </div>
      {loading ? (
        <div className='h-7 w-20 bg-slate-100 rounded-lg animate-pulse mb-1.5' />
      ) : (
        <div className={`text-2xl font-bold leading-none mb-1.5 ${valColor}`}>
          {value ?? <span className='text-slate-300'>-</span>}
        </div>
      )}
      {sub && <div className='text-xs text-slate-400'>{sub}</div>}
    </div>
  )
}

/* ─────────────────────────────────────────────
   Tabs
───────────────────────────────────────────── */

function Tabs({ tabs, active, onChange }) {
  return (
    <div className='flex gap-1 p-1 bg-slate-50 border border-slate-100 rounded-2xl mb-6 w-fit'>
      {tabs.map(t => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
            active === t.id
              ? 'bg-teal-500 text-white shadow-sm shadow-teal-100'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────
   Section wrapper
───────────────────────────────────────────── */

function Section({ title, sub, children, light = false }) {
  if (light) {
    return (
      <div className='bg-white border border-slate-100 shadow-sm rounded-3xl p-6 md:p-7 mb-5'>
        <div className='mb-5'>
          <div className='text-base font-semibold text-slate-800'>{title}</div>
          {sub && <div className='text-xs text-slate-400 mt-1'>{sub}</div>}
        </div>
        {children}
      </div>
    )
  }
  return (
    <div className='bg-white border border-slate-100 shadow-sm rounded-3xl p-5 md:p-6 mb-5'>
      <div className='mb-4'>
        <div className='text-sm font-semibold text-slate-700'>{title}</div>
        {sub && <div className='text-xs text-slate-400 mt-0.5'>{sub}</div>}
      </div>
      {children}
    </div>
  )
}

/* ─────────────────────────────────────────────
   TrendChart
───────────────────────────────────────────── */

function TrendChart({ metric, data, loading }) {
  if (loading) return <ChartSkeleton height={80} />
  if (!data || data.length === 0) return <EmptyChart height={80} />

  const maxVal = metric === 'stress' ? 4 : 10
  const vals   = data.map(d => d[metric])
  const avg    = (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1)

  return (
    <div>
      <div className='flex items-end gap-1' style={{ height: 80 }}>
        {data.map((d, i) => {
          const val = d[metric]
          const pct = (val / maxVal) * 100
          const col = metric === 'stress' ? stressColor(val) : '#2dd4bf'
          return (
            <div key={i} className='flex flex-col items-center flex-1 gap-0.5 group relative'>
              <div className='absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 bg-slate-700 text-white text-[10px] font-mono px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none'>
                {d.day}: {val}{d.olahraga && metric === 'stress' ? ' 🏃' : ''}
              </div>
              <div
                className='w-full rounded-t-sm transition-all'
                style={{
                  height: `${pct}%`,
                  minHeight: 3,
                  background: col,
                  opacity: 0.75,
                  outline: d.olahraga && metric === 'stress' ? '1.5px solid rgba(45,212,191,0.6)' : 'none',
                  outlineOffset: '1px',
                }}
              />
            </div>
          )
        })}
      </div>
      <div className='flex mt-1.5'>
        {data.map((d, i) => (
          <div key={i} className='flex-1 text-center'>
            {i % 5 === 0 && (
              <span className='text-[9px] font-mono text-slate-400'>{d.day}</span>
            )}
          </div>
        ))}
      </div>
      <div className='flex items-center justify-between mt-2'>
        <span className='text-[11px] text-slate-400'>
          Rata-rata: <span className='font-mono text-slate-600'>{avg}</span>
          {metric === 'stress' ? ' / 4' : ' / 10'}
        </span>
        {metric === 'stress' && (
          <div className='flex items-center gap-1.5 text-[11px] text-slate-400'>
            <span className='w-2.5 h-2.5 rounded-sm border border-teal-400/60 inline-block' />
            Hari olahraga
          </div>
        )}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   PerHariChart
───────────────────────────────────────────── */

function PerHariChart({ data, loading }) {
  if (loading) return <ChartSkeleton height={80} />
  if (!data || data.length === 0) return <EmptyChart height={80} />

  const sorted   = [...data].sort((a, b) => b.stress - a.stress)
  const highest  = sorted[0]?.label ?? '-'
  const lowest   = sorted[sorted.length - 1]?.label ?? '-'

  return (
    <div>
      <div className='flex items-end gap-3' style={{ height: 80 }}>
        {data.map((d, i) => {
          const pct = (d.stress / 4) * 100
          return (
            <div key={i} className='flex flex-col items-center flex-1 gap-1 group relative'>
              <div className='absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 bg-slate-700 text-white text-[10px] font-mono px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none'>
                {d.label}: {d.stress}
              </div>
              <div
                className={`w-full rounded-t-md ${stressBarBg(d.stress)}`}
                style={{ height: `${pct}%`, minHeight: 4 }}
              />
            </div>
          )
        })}
      </div>
      <div className='flex gap-3 mt-2'>
        {data.map((d, i) => (
          <div key={i} className='flex-1 text-center text-[10px] font-mono text-slate-400'>{d.hari}</div>
        ))}
      </div>
      <div className='flex items-center justify-between mt-3'>
        <div className='text-xs text-slate-400'>
          Paling stress: <span className='text-red-400 font-medium'>{highest}</span>
        </div>
        <div className='text-xs text-slate-400'>
          Paling rileks: <span className='text-teal-500 font-medium'>{lowest}</span>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   SleepStressChart
───────────────────────────────────────────── */

function SleepStressChart({ data, loading, pearson }) {
  if (loading) return <ChartSkeleton height={100} />
  if (!data || data.length === 0) return <EmptyChart height={100} />

  const barColor = ['bg-red-400/75', 'bg-amber-400/75', 'bg-blue-400/75', 'bg-teal-400/75']

  return (
    <div>
      <div className='flex gap-3 items-end' style={{ height: 100 }}>
        <div className='flex flex-col justify-between h-full text-right pr-1' style={{ minWidth: 50 }}>
          {[4, 3, 2, 1].map(v => (
            <span key={v} className='text-[9px] font-mono text-slate-400'>Stress {v}</span>
          ))}
        </div>
        <div className='flex-1 flex gap-4 items-end h-full'>
          {data.map((d, i) => (
            <div key={i} className='flex flex-col items-center flex-1 gap-1.5 group relative'>
              <div className='absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 bg-slate-700 text-white text-[10px] font-mono px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none'>
                Stress avg: {d.stressAvg}
              </div>
              <div
                className={`w-full rounded-t-md ${barColor[i]}`}
                style={{ height: `${d.pct}%`, minHeight: 4 }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className='flex mt-2' style={{ paddingLeft: 58 }}>
        <div className='flex-1 flex gap-4'>
          {data.map((d, i) => (
            <div key={i} className='flex-1 text-center text-[10px] text-slate-400'>{d.label}</div>
          ))}
        </div>
      </div>
      <div className='text-center text-[11px] text-slate-400 mt-2'>Kualitas Tidur (PSQI)</div>
      <div className='mt-4 pt-4 border-t border-slate-100 flex items-start gap-2'>
        <LuInfo size={13} className='text-slate-400 flex-shrink-0 mt-0.5' />
        <p className='text-xs text-slate-400 leading-relaxed'>
          Korelasi Pearson r ={' '}
          <span className='font-mono text-slate-600'>
            {pearson ?? '-'}
          </span>{' '}
          (kuat negatif). Artinya tidur buruk sangat konsisten memperburuk stress harianmu.
        </p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   FaktorRow
───────────────────────────────────────────── */

const faktorIconMap = {
  LuActivity,
  LuMoon,
  LuDroplets,
  LuSmartphone,
  LuBrain,
  LuCoffee,
}

function FaktorRow({ item }) {
  const isRisiko  = item.type === 'risiko'
  const barWidth  = Math.min(Math.abs(item.impact) / 1, 1) * 100
  const IconComp  = faktorIconMap[item.iconKey] ?? LuActivity

  return (
    <div className='flex items-start gap-3 py-3.5 border-b border-slate-100 last:border-0'>
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
        isRisiko ? 'bg-red-50' : 'bg-teal-50'
      }`}>
        <IconComp size={14} className={isRisiko ? 'text-red-400' : 'text-teal-500'} />
      </div>
      <div className='flex-1 min-w-0'>
        <div className='flex items-center justify-between gap-2 mb-1'>
          <span className='text-sm text-slate-700 font-medium'>{item.label}</span>
          <span className={`text-xs font-mono font-semibold flex-shrink-0 ${isRisiko ? 'text-red-400' : 'text-teal-500'}`}>
            {isRisiko ? '+' : ''}{item.impact} level
          </span>
        </div>
        <div className='text-xs text-slate-400 mb-2'>{item.desc}</div>
        <div className='h-1.5 bg-slate-100 rounded-full overflow-hidden'>
          <div
            className={`h-full rounded-full transition-all ${isRisiko ? 'bg-red-400/70' : 'bg-teal-400/70'}`}
            style={{ width: `${barWidth}%` }}
          />
        </div>
      </div>
      <div className='flex-shrink-0 mt-1'>
        {isRisiko
          ? <LuTriangleAlert size={13} className='text-red-400/60' />
          : <LuShield size={13} className='text-teal-400/60' />
        }
      </div>
    </div>
  )
}

function FaktorSkeleton() {
  return (
    <div className='flex flex-col gap-3 py-2'>
      {[1, 2, 3].map(i => (
        <div key={i} className='h-12 rounded-xl bg-slate-100 animate-pulse' />
      ))}
    </div>
  )
}

function FaktorEmpty({ message }) {
  return (
    <div className='py-6 text-center text-xs text-slate-300 italic'>{message}</div>
  )
}

/* ─────────────────────────────────────────────
   Custom hook — fetch semua data trend
   TODO: hapus simulasi & uncomment API call
         ketika backend sudah siap
───────────────────────────────────────────── */

function useTrendData() {
  const [trendChart,    setTrendChart]    = useState(null)
  const [perHari,       setPerHari]       = useState(null)
  const [sleepCorr,     setSleepCorr]     = useState(null)
  const [pearson,       setPearson]       = useState(null)
  const [faktor,        setFaktor]        = useState(null)
  const [insights,      setInsights]      = useState(null)
  const [summary,       setSummary]       = useState(null)
  const [loading,       setLoading]       = useState(true)
  const [error,         setError]         = useState(null)

  const fetchData = () => {
    setLoading(true)
    setError(null)

    // ── TODO: Uncomment blok ini ketika backend sudah siap ──────────────────
    // Promise.all([
    //   getTrendChart({ periode: '20hari' }),
    //   getTrendPerHari(),
    //   getSleepStressCorr(),
    //   getFaktorData(),
    //   getAiInsights(),
    // ])
    //   .then(([chartRes, perHariRes, corrRes, faktorRes, insightRes]) => {
    //     setTrendChart(chartRes.data.data?.entries ?? null)
    //     setPerHari(perHariRes.data.data ?? null)
    //     setSleepCorr(corrRes.data.data?.entries ?? null)
    //     setPearson(corrRes.data.data?.pearson ?? null)
    //     setFaktor(faktorRes.data.data ?? null)
    //     setInsights(insightRes.data.data?.insights ?? null)
    //     setSummary(insightRes.data.data?.summary ?? null)
    //   })
    //   .catch((err) => setError(err.message))
    //   .finally(() => setLoading(false))
    // ────────────────────────────────────────────────────────────────────────

    // Simulasi sementara — hapus blok ini ketika backend sudah siap
    setTimeout(() => {
      setTrendChart(null)
      setPerHari(null)
      setSleepCorr(null)
      setPearson(null)
      setFaktor(null)
      setInsights(null)
      setSummary(null)
      setLoading(false)
    }, 800)
  }

  useEffect(() => { fetchData() }, [])

  return {
    trendChart, perHari, sleepCorr, pearson,
    faktor, insights, summary,
    loading, error, refetch: fetchData,
  }
}

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */

const METRIC_TABS = [
  { id: 'stress', label: '🧠 Stress' },
  { id: 'mood',   label: '😊 Mood'   },
  { id: 'sleep',  label: '😴 Tidur'  },
]

export default function TrendInsightPage() {
  const [activeMetric, setActiveMetric] = useState('stress')

  const {
    trendChart, perHari, sleepCorr, pearson,
    faktor, insights, summary,
    loading,
  } = useTrendData()

  /* Derived summary values — '-' selama belum ada data */
  const tidurTerbaik    = summary?.tidurTerbaik    ?? '-'
  const hariPalingStres = summary?.hariPalingStres ?? '-'
  const faktorPelindung = summary?.faktorPelindung ?? '-'
  const subTidur        = summary?.subTidur        ?? '-'
  const subStres        = summary?.subStres        ?? '-'
  const subPelindung    = summary?.subPelindung    ?? '-'

  const protektif = faktor?.filter(f => f.type === 'protektif') ?? []
  const risiko    = faktor?.filter(f => f.type === 'risiko')    ?? []

  return (
    <MainLayout title='Insights & Tren'>
      <div className='max-w-3xl mx-auto'>

        {/* ── Stat cards ── */}
        <div className='grid grid-cols-2 md:grid-cols-3 gap-3 mb-6'>
          <StatCard
            label='TIDUR TERBAIK'
            value={tidurTerbaik}
            sub={subTidur}
            color='teal'
            icon={LuMoon}
            loading={loading}
          />
          <StatCard
            label='HARI PALING STRESS'
            value={hariPalingStres}
            sub={subStres}
            color='red'
            icon={LuBrain}
            loading={loading}
          />
          <StatCard
            label='FAKTOR PELINDUNG'
            value={faktorPelindung}
            sub={subPelindung}
            color='slate'
            icon={LuShield}
            loading={loading}
          />
        </div>

        {/* ── Tren chart ── */}
        <Section
          light
          title='Tren 20 Hari Terakhir'
          sub='Hover bar untuk detail. Bar dengan outline = hari olahraga.'
        >
          <Tabs tabs={METRIC_TABS} active={activeMetric} onChange={setActiveMetric} />
          <TrendChart metric={activeMetric} data={trendChart} loading={loading} />
          {!loading && trendChart && (
            <div className='flex gap-3 mt-4 pt-4 border-t border-slate-100 flex-wrap'>
              {[
                { cls: 'bg-teal-400',  label: 'Rendah (1)'  },
                { cls: 'bg-amber-400', label: 'Sedang (2)'  },
                { cls: 'bg-red-400',   label: 'Tinggi (3–4)' },
              ].map(l => (
                <div key={l.label} className='flex items-center gap-1.5'>
                  <span className={`w-2.5 h-2.5 rounded-sm ${l.cls} opacity-70`} />
                  <span className='text-[11px] text-slate-400'>{l.label}</span>
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* ── Per hari ── */}
        <Section
          title='Pola Stress per Hari dalam Seminggu'
          sub='Rata-rata stress berdasarkan hari, dari 30 hari terakhir'
        >
          <PerHariChart data={perHari} loading={loading} />
        </Section>

        {/* ── Korelasi tidur ── */}
        <Section
          light
          title='Korelasi Tidur ↔ Stress'
          sub='Semakin buruk kualitas tidur, semakin tinggi stress — sesuai teori PSQI × PSS'
        >
          <SleepStressChart data={sleepCorr} loading={loading} pearson={pearson} />
        </Section>

        {/* ── Faktor risiko & pelindung ── */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mb-5'>
          {/* Pelindung */}
          <div className='bg-teal-50 border border-teal-100 rounded-3xl p-5'>
            <div className='flex items-center gap-2 mb-4'>
              <div className='w-7 h-7 rounded-xl bg-teal-100 flex items-center justify-center'>
                <LuShield size={13} className='text-teal-500' />
              </div>
              <div>
                <div className='text-sm font-semibold text-slate-700'>Faktor Pelindung</div>
                <div className='text-[11px] text-slate-400'>Turunkan stress</div>
              </div>
            </div>
            {loading
              ? <FaktorSkeleton />
              : protektif.length > 0
                ? protektif.map((f, i) => <FaktorRow key={i} item={f} />)
                : <FaktorEmpty message='Belum ada data faktor pelindung' />
            }
          </div>

          {/* Risiko */}
          <div className='bg-red-50 border border-red-100 rounded-3xl p-5'>
            <div className='flex items-center gap-2 mb-4'>
              <div className='w-7 h-7 rounded-xl bg-red-100 flex items-center justify-center'>
                <LuTriangleAlert size={13} className='text-red-400' />
              </div>
              <div>
                <div className='text-sm font-semibold text-slate-700'>Faktor Risiko</div>
                <div className='text-[11px] text-slate-400'>Naikkan stress</div>
              </div>
            </div>
            {loading
              ? <FaktorSkeleton />
              : risiko.length > 0
                ? risiko.map((f, i) => <FaktorRow key={i} item={f} />)
                : <FaktorEmpty message='Belum ada data faktor risiko' />
            }
          </div>
        </div>

        {/* ── AI Insights ── */}
        <div className='bg-white border border-slate-100 shadow-sm rounded-3xl p-6 md:p-7 mb-5'>
          <div className='flex items-center gap-2.5 mb-5'>
            <div className='w-8 h-8 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center'>
              <LuSparkles size={14} className='text-teal-500' />
            </div>
            <div>
              <div className='text-base font-semibold text-slate-800'>Insight Otomatis dari AI</div>
              <div className='text-xs text-slate-400 mt-0.5'>Dibuat berdasarkan pola data pribadimu</div>
            </div>
            <Tag color='teal'>AI powered</Tag>
          </div>

          {loading ? (
            <InsightSkeleton />
          ) : !insights || insights.length === 0 ? (
            <div className='py-10 text-center'>
              <div className='w-12 h-12 rounded-2xl bg-slate-50 border border-dashed border-slate-200 flex items-center justify-center mx-auto mb-3'>
                <LuSparkles size={20} className='text-slate-200' />
              </div>
              <div className='text-sm text-slate-400 font-medium mb-1'>Insight belum tersedia</div>
              <div className='text-xs text-slate-300'>
                Isi minimal 7 hari log untuk mulai mendapatkan insight AI.
              </div>
            </div>
          ) : (
            <div className='flex flex-col gap-3'>
              {insights.map((ins, i) => (
                <div key={i} className='bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3.5 flex items-start gap-3'>
                  <span className='text-xl flex-shrink-0 mt-0.5'>{ins.icon}</span>
                  <div className='flex-1'>
                    <p className='text-sm text-slate-600 leading-relaxed'>{ins.text}</p>
                  </div>
                  <Tag color={ins.tagColor}>{ins.tag}</Tag>
                </div>
              ))}
            </div>
          )}

          <div className='mt-4 text-xs text-slate-400 leading-relaxed px-1'>
            * Insight ini bukan diagnosis medis. Dibuat berdasarkan korelasi pola data pribadimu, bukan standar klinis.
          </div>
        </div>

      </div>
    </MainLayout>
  )
}