import { useState } from 'react'
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
} from 'react-icons/lu'
import MainLayout from '../layouts/MainLayout'

const trendData = [
  { day: '12/4', stress: 3, mood: 4, sleep: 2, olahraga: false },
  { day: '13/4', stress: 3, mood: 4, sleep: 3, olahraga: false },
  { day: '14/4', stress: 2, mood: 6, sleep: 3, olahraga: true },
  { day: '15/4', stress: 1, mood: 8, sleep: 4, olahraga: true },
  { day: '16/4', stress: 2, mood: 6, sleep: 3, olahraga: false },
  { day: '17/4', stress: 2, mood: 7, sleep: 3, olahraga: true },
  { day: '18/4', stress: 1, mood: 8, sleep: 4, olahraga: true },
  { day: '19/4', stress: 3, mood: 4, sleep: 2, olahraga: false },
  { day: '20/4', stress: 3, mood: 5, sleep: 2, olahraga: false },
  { day: '21/4', stress: 2, mood: 6, sleep: 3, olahraga: true },
  { day: '22/4', stress: 2, mood: 6, sleep: 3, olahraga: false },
  { day: '23/4', stress: 3, mood: 5, sleep: 2, olahraga: false },
  { day: '24/4', stress: 4, mood: 3, sleep: 1, olahraga: false },
  { day: '25/4', stress: 3, mood: 4, sleep: 2, olahraga: false },
  { day: '26/4', stress: 2, mood: 6, sleep: 3, olahraga: true },
  { day: '27/4', stress: 3, mood: 3, sleep: 2, olahraga: false },
  { day: '28/4', stress: 1, mood: 8, sleep: 4, olahraga: true },
  { day: '29/4', stress: 2, mood: 6, sleep: 3, olahraga: true },
  { day: '30/4', stress: 3, mood: 4, sleep: 2, olahraga: false },
  { day: '01/5', stress: 2, mood: 7, sleep: 3, olahraga: true },
]

const perHariData = [
  { hari: 'Sen', stress: 3.1, label: 'Senin' },
  { hari: 'Sel', stress: 2.8, label: 'Selasa' },
  { hari: 'Rab', stress: 2.5, label: 'Rabu' },
  { hari: 'Kam', stress: 2.7, label: 'Kamis' },
  { hari: 'Jum', stress: 3.0, label: 'Jumat' },
  { hari: 'Sab', stress: 1.8, label: 'Sabtu' },
  { hari: 'Min', stress: 2.0, label: 'Minggu' },
]

const sleepStressCorr = [
  { label: 'Sangat Buruk', stressAvg: 3.6, pct: 90 },
  { label: 'Buruk',        stressAvg: 2.9, pct: 65 },
  { label: 'Cukup',        stressAvg: 2.1, pct: 40 },
  { label: 'Sangat Baik',  stressAvg: 1.3, pct: 18 },
]

const aiInsights = [
  {
    icon: '📊',
    text: 'Stress-mu turun 40% di hari-hari ketika kamu olahraga. Ini adalah buffer terkuat berdasarkan datamu.',
    tag: 'Pola kuat',
    tagColor: 'teal',
  },
  {
    icon: '🌙',
    text: 'Ketika screen time sebelum tidur >60 menit, kualitas tidurmu turun ke level Buruk di 80% kasus.',
    tag: 'Perhatian',
    tagColor: 'amber',
  },
  {
    icon: '☕',
    text: 'Kafein >3 gelas berkorelasi langsung dengan kecemasan level 4–5 di hari yang sama.',
    tag: 'Risiko',
    tagColor: 'red',
  },
  {
    icon: '💧',
    text: 'Di hari asupan air ≥2.5 liter, mood-mu rata-rata 1.8 poin lebih tinggi dibanding hari dehidrasi.',
    tag: 'Peluang',
    tagColor: 'blue',
  },
]

const faktorData = [
  { icon: LuActivity,   label: 'Olahraga rutin',            impact: -0.8, type: 'protektif', desc: '5/7 hari minggu ini' },
  { icon: LuMoon,       label: 'Tidur ≥7 jam',              impact: -0.6, type: 'protektif', desc: 'Turunkan stress 0.6 level' },
  { icon: LuDroplets,   label: 'Hidrasi cukup',             impact: -0.4, type: 'protektif', desc: 'Air ≥2 liter/hari' },
  { icon: LuSmartphone, label: 'Screen time sebelum tidur', impact: +0.9, type: 'risiko',    desc: 'Rata-rata 68 menit/malam' },
  { icon: LuBrain,      label: 'Beban kerja & deadline',    impact: +0.7, type: 'risiko',    desc: '5/7 hari ada deadline' },
  { icon: LuCoffee,     label: 'Konsumsi kafein tinggi',    impact: +0.5, type: 'risiko',    desc: 'Rata-rata 3.2 gelas/hari' },
]

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

function StatCard({ label, value, sub, color = 'slate', icon: Icon }) {
  const valColor = { teal: 'text-teal-500', amber: 'text-amber-500', red: 'text-red-500', slate: 'text-slate-700' }[color]
  return (
    <div className='bg-white border border-slate-100 rounded-2xl p-5 shadow-sm'>
      <div className='flex items-start justify-between mb-3'>
        <div className='text-[10px] font-mono text-slate-400 tracking-widest leading-tight'>{label}</div>
        {Icon && <Icon size={14} className='text-slate-300 flex-shrink-0' />}
      </div>
      <div className={`text-2xl font-bold leading-none mb-1.5 ${valColor}`}>{value}</div>
      {sub && <div className='text-xs text-slate-400'>{sub}</div>}
    </div>
  )
}

function TrendChart({ metric, data }) {
  const maxVal = metric === 'stress' ? 4 : 10
  const vals = data.map(d => d[metric])
  const avg = (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1)

  return (
    <div>
      <div className='flex items-end gap-1' style={{ height: 80 }}>
        {data.map((d, i) => {
          const val = d[metric]
          const pct = (val / maxVal) * 100
          const col = metric === 'stress' ? stressColor(val) : '#2dd4bf'
          const isExercise = d.olahraga
          return (
            <div key={i} className='flex flex-col items-center flex-1 gap-0.5 group relative'>
              <div className='absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 bg-slate-700 text-white text-[10px] font-mono px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none'>
                {d.day}: {val}{isExercise && metric === 'stress' ? ' 🏃' : ''}
              </div>
              <div
                className='w-full rounded-t-sm transition-all'
                style={{
                  height: `${pct}%`,
                  minHeight: 3,
                  background: col,
                  opacity: 0.75,
                  outline: isExercise && metric === 'stress' ? '1.5px solid rgba(45,212,191,0.6)' : 'none',
                  outlineOffset: '1px',
                }}
              />
            </div>
          )
        })}
      </div>
      <div className='flex mt-1.5' style={{ gap: 0 }}>
        {data.map((d, i) => (
          <div key={i} className='flex-1 text-center'>
            {i % 5 === 0 && <span className='text-[9px] font-mono text-slate-400'>{d.day}</span>}
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

function PerHariChart({ data }) {
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
        <div className='text-xs text-slate-400'>Paling stress: <span className='text-red-400 font-medium'>Senin</span></div>
        <div className='text-xs text-slate-400'>Paling rileks: <span className='text-teal-500 font-medium'>Sabtu</span></div>
      </div>
    </div>
  )
}

function SleepStressChart({ data }) {
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
    </div>
  )
}

function FaktorRow({ item }) {
  const isRisiko = item.type === 'risiko'
  const barWidth = (Math.abs(item.impact) / 1) * 100

  return (
    <div className='flex items-start gap-3 py-3.5 border-b border-slate-100 last:border-0'>
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
        isRisiko ? 'bg-red-50' : 'bg-teal-50'
      }`}>
        <item.icon size={14} className={isRisiko ? 'text-red-400' : 'text-teal-500'} />
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
            style={{ width: `${barWidth * 100}%` }}
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

export default function InsightsPage() {
  const [activeMetric, setActiveMetric] = useState('stress')

  const metricTabs = [
    { id: 'stress', label: '🧠 Stress' },
    { id: 'mood',   label: '😊 Mood' },
    { id: 'sleep',  label: '😴 Tidur' },
  ]

  return (
    <MainLayout title='Insights & Tren'>
      <div className='max-w-3xl mx-auto'>

        {/* Stat cards */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-3 mb-6'>
          <StatCard label='TIDUR TERBAIK' value='Sabtu' sub='Rata-rata 8.2 jam' color='teal' icon={LuMoon} />
          <StatCard label='HARI PALING STRESS' value='Senin' sub='PSS rata-rata level 3' color='red' icon={LuBrain} />
          <StatCard label='FAKTOR PELINDUNG' value='Olahraga' sub='Turunkan stress 0.8 level' color='slate' icon={LuShield} />
        </div>

        {/* Tren chart */}
        <Section light title='Tren 20 Hari Terakhir' sub='Hover bar untuk detail. Bar dengan outline = hari olahraga.'>
          <Tabs tabs={metricTabs} active={activeMetric} onChange={setActiveMetric} />
          <TrendChart metric={activeMetric} data={trendData} />
          <div className='flex gap-3 mt-4 pt-4 border-t border-slate-100 flex-wrap'>
            {[
              { cls: 'bg-teal-400', label: 'Rendah (1)' },
              { cls: 'bg-amber-400', label: 'Sedang (2)' },
              { cls: 'bg-red-400', label: 'Tinggi (3–4)' },
            ].map(l => (
              <div key={l.label} className='flex items-center gap-1.5'>
                <span className={`w-2.5 h-2.5 rounded-sm ${l.cls} opacity-70`} />
                <span className='text-[11px] text-slate-400'>{l.label}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Per hari */}
        <Section title='Pola Stress per Hari dalam Seminggu' sub='Rata-rata stress berdasarkan hari, dari 30 hari terakhir'>
          <PerHariChart data={perHariData} />
        </Section>

        {/* Korelasi tidur */}
        <Section light title='Korelasi Tidur ↔ Stress' sub='Semakin buruk kualitas tidur, semakin tinggi stress — sesuai teori PSQI × PSS'>
          <SleepStressChart data={sleepStressCorr} />
          <div className='mt-4 pt-4 border-t border-slate-100 flex items-start gap-2'>
            <LuInfo size={13} className='text-slate-400 flex-shrink-0 mt-0.5' />
            <p className='text-xs text-slate-400 leading-relaxed'>
              Korelasi Pearson r = <span className='font-mono text-slate-600'>−0.72</span> (kuat negatif). Artinya tidur buruk sangat konsisten memperburuk stress harianmu.
            </p>
          </div>
        </Section>

        {/* Faktor risiko & pelindung */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mb-5'>
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
            {faktorData.filter(f => f.type === 'protektif').map((f, i) => (
              <FaktorRow key={i} item={f} />
            ))}
          </div>

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
            {faktorData.filter(f => f.type === 'risiko').map((f, i) => (
              <FaktorRow key={i} item={f} />
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className='bg-white border border-slate-100 shadow-sm rounded-3xl p-6 md:p-7 mb-5'>
          <div className='flex items-center gap-2.5 mb-5'>
            <div className='w-8 h-8 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center'>
              <LuSparkles size={14} className='text-teal-500' />
            </div>
            <div>
              <div className='text-base font-semibold text-slate-800'>Insight Otomatis dari AI</div>
              <div className='text-xs text-slate-400 mt-0.5'>Dibuat berdasarkan pola data pribadimu</div>
            </div>
            <Tag color='teal'>Gemini powered</Tag>
          </div>

          <div className='flex flex-col gap-3'>
            {aiInsights.map((ins, i) => (
              <div key={i} className='bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3.5 flex items-start gap-3'>
                <span className='text-xl flex-shrink-0 mt-0.5'>{ins.icon}</span>
                <div className='flex-1'>
                  <p className='text-sm text-slate-600 leading-relaxed'>{ins.text}</p>
                </div>
                <Tag color={ins.tagColor}>{ins.tag}</Tag>
              </div>
            ))}
          </div>

          <div className='mt-4 text-xs text-slate-400 leading-relaxed px-1'>
            * Insight ini bukan diagnosis medis. Dibuat berdasarkan korelasi pola data pribadimu, bukan standar klinis.
          </div>
        </div>

      </div>
    </MainLayout>
  )
}
