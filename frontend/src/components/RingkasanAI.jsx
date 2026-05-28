import { useEffect, useState } from 'react'
import { LuBot, LuLoader, LuRefreshCw, LuSparkles } from 'react-icons/lu'
import { getAiInsights } from '../api/trend-insight'

function InsightTag({ color = 'teal', children }) {
  const cls = {
    teal: 'bg-teal-50 text-teal-600 border-teal-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
    red: 'bg-rose-50 text-rose-600 border-rose-100',
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    slate: 'bg-slate-50 text-slate-500 border-slate-100',
  }[color] || 'bg-teal-50 text-teal-600 border-teal-100'

  return <span className={`px-2.5 py-1 rounded-full border text-[11px] font-semibold ${cls}`}>{children}</span>
}

function SummaryItem({ label, value, sub }) {
  return (
    <div className='bg-slate-50 border border-slate-100 rounded-2xl p-4'>
      <div className='text-[10px] font-mono tracking-widest text-slate-400 mb-1'>{label}</div>
      <div className='text-sm font-bold text-slate-700'>{value || '-'}</div>
      {sub && <div className='text-xs text-slate-400 mt-1'>{sub}</div>}
    </div>
  )
}

export default function RingkasanAI({ page = 'dashboard' }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadInsight = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await getAiInsights()
      setData(res.data?.data ?? null)
    } catch (err) {
      setError('Ringkasan AI belum bisa dimuat. Pastikan endpoint backend AI sudah tersedia.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadInsight()
  }, [])

  const summary = data?.summary ?? null
  const insights = data?.insights ?? []

  return (
    <section className='mt-6 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm'>
      <div className='flex items-start justify-between gap-3 mb-5'>
        <div className='flex items-start gap-3'>
          <div className='w-10 h-10 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0'>
            <LuBot size={20} className='text-teal-500' />
          </div>
          <div>
            <h2 className='text-base font-bold text-slate-800'>Ringkasan AI</h2>
            <p className='text-xs text-slate-400 mt-1'>
              Nantinya bagian ini mengambil insight dari backend yang terhubung dengan AI.
            </p>
          </div>
        </div>
        <button
          type='button'
          onClick={loadInsight}
          className='w-9 h-9 rounded-xl border border-slate-200 bg-slate-50 hover:bg-teal-50 hover:border-teal-200 flex items-center justify-center transition-all'
          title='Muat ulang ringkasan AI'
        >
          <LuRefreshCw size={15} className='text-slate-500' />
        </button>
      </div>

      {loading ? (
        <div className='flex items-center justify-center gap-2 py-10 text-sm text-slate-400'>
          <LuLoader size={18} className='animate-spin' />
          Memuat ringkasan AI…
        </div>
      ) : error ? (
        <div className='bg-amber-50 border border-amber-100 rounded-2xl p-4 text-sm text-amber-700'>
          {error}
          <div className='text-xs text-amber-600 mt-2'>Endpoint yang disiapkan: <span className='font-mono'>GET /api/trend/insights</span></div>
        </div>
      ) : !summary && insights.length === 0 ? (
        <div className='bg-slate-50 border border-slate-100 rounded-2xl p-5 text-center'>
          <LuSparkles size={24} className='text-slate-300 mx-auto mb-2' />
          <div className='text-sm font-semibold text-slate-500'>Belum ada ringkasan AI</div>
          <p className='text-xs text-slate-400 mt-1'>Ringkasan akan muncul setelah backend AI mengirim data insight untuk halaman {page}.</p>
        </div>
      ) : (
        <div className='space-y-5'>
          {summary && (
            <div className='grid sm:grid-cols-3 gap-3'>
              <SummaryItem label='TIDUR TERBAIK' value={summary.tidurTerbaik} sub={summary.subTidur} />
              <SummaryItem label='PALING STRES' value={summary.hariPalingStres} sub={summary.subStres} />
              <SummaryItem label='FAKTOR PELINDUNG' value={summary.faktorPelindung} sub={summary.subPelindung} />
            </div>
          )}

          {insights.length > 0 && (
            <div className='space-y-3'>
              {insights.map((item, idx) => (
                <div key={idx} className='flex items-start gap-3 bg-slate-50 border border-slate-100 rounded-2xl p-4'>
                  <div className='text-xl leading-none'>{item.icon || '✨'}</div>
                  <div className='flex-1'>
                    <p className='text-sm text-slate-700 leading-relaxed'>{item.text}</p>
                    {item.tag && <div className='mt-2'><InsightTag color={item.tagColor}>{item.tag}</InsightTag></div>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  )
}
