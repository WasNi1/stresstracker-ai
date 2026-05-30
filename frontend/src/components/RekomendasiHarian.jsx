import { useEffect, useMemo, useState } from 'react'
import { LuClipboardCheck, LuInfo, LuLightbulb, LuRefreshCw, LuShieldCheck } from 'react-icons/lu'

function getDetails(entry) {
  return entry?.details || entry || {}
}

function getStressLevel(entry, details) {
  return entry?.stressLevel || entry?.stress?.label || details?.stressLevel || details?.stress?.label || 'Belum diketahui'
}

function toNumber(value) {
  const n = Number(value)
  return Number.isFinite(n) ? n : null
}

function isYes(value) {
  if (typeof value === 'boolean') return value
  return String(value || '').toLowerCase() === 'ya'
}

function buildRecommendation(entry) {
  if (!entry) {
    return {
      level: 'Belum ada data',
      color: 'slate',
      title: 'Belum ada rekomendasi',
      conclusion: 'Isi input harian terlebih dahulu agar sistem bisa membuat kesimpulan berdasarkan datamu.',
      causes: [],
      actions: ['Isi input harian secara rutin supaya rekomendasi lebih akurat.'],
    }
  }

  const d = getDetails(entry)
  const stressLevel = getStressLevel(entry, d)
  const sleep = toNumber(d.durasi_tidur_menit)
  const screen = toNumber(d.screen_sebelum_tidur)
  const outdoor = toNumber(d.waktu_outdoor)
  const konsentrasi = toNumber(d.konsentrasi)
  const sosial = toNumber(d.interaksi_sosial)

  const causes = []
  const actions = []

  if (sleep !== null && sleep < 360) {
    causes.push('Durasi tidur masih kurang')
    actions.push('Coba tambah waktu tidur dan buat jadwal tidur yang lebih teratur.')
  }
  if (screen !== null && screen > 60) {
    causes.push('Screen time sebelum tidur cukup tinggi')
    actions.push('Kurangi penggunaan HP/laptop minimal 30–60 menit sebelum tidur.')
  }
  if (isYes(d.merokok)) {
    causes.push('Ada kebiasaan merokok hari ini')
    actions.push('Kurangi rokok secara bertahap, terutama saat sedang stres.')
  }
  if (isYes(d.lembur) || isYes(d.deadline_hari_ini)) {
    causes.push('Ada tekanan kerja atau deadline')
    actions.push('Bagi tugas menjadi bagian kecil dan ambil jeda singkat setelah fokus bekerja.')
  }
  if (outdoor !== null && outdoor < 20) {
    causes.push('Waktu outdoor masih rendah')
    actions.push('Luangkan 10–20 menit untuk jalan santai atau terkena udara luar.')
  }
  if (konsentrasi !== null && konsentrasi <= 2) {
    causes.push('Konsentrasi sedang menurun')
    actions.push('Gunakan teknik fokus singkat seperti 25 menit kerja dan 5 menit istirahat.')
  }
  if (sosial !== null && sosial <= 2) {
    causes.push('Interaksi sosial masih sedikit')
    actions.push('Coba hubungi teman/keluarga atau lakukan obrolan ringan dengan orang sekitar.')
  }

  if (stressLevel === 'Tinggi') {
    return {
      level: 'Stress tinggi',
      color: 'red',
      title: 'Prioritaskan pemulihan hari ini',
      conclusion: causes.length
        ? `Kesimpulannya, stres tinggi kemungkinan dipengaruhi oleh ${causes.slice(0, 3).join(', ').toLowerCase()}.`
        : 'Kesimpulannya, stres sedang tinggi sehingga tubuh perlu diberi waktu untuk istirahat dan pemulihan.',
      causes,
      actions: actions.length ? actions : ['Ambil jeda, tarik napas perlahan, dan kurangi aktivitas yang terlalu membebani.'],
    }
  }

  if (stressLevel === 'Sedang') {
    return {
      level: 'Stress sedang',
      color: 'amber',
      title: 'Jaga ritme agar stres tidak naik',
      conclusion: causes.length
        ? `Kesimpulannya, kondisi masih cukup stabil, tetapi ${causes.slice(0, 2).join(', ').toLowerCase()} perlu diperhatikan.`
        : 'Kesimpulannya, kondisi cukup stabil. Pertahankan pola tidur, aktivitas, dan waktu istirahat.',
      causes,
      actions: actions.length ? actions : ['Pertahankan rutinitas sehat dan luangkan waktu istirahat yang cukup.'],
    }
  }

  return {
    level: stressLevel === 'Rendah' ? 'Stress rendah' : stressLevel,
    color: 'teal',
    title: 'Kondisi cukup baik',
    conclusion: 'Kesimpulannya, tingkat stres terlihat rendah. Pertahankan kebiasaan baik yang sudah dilakukan hari ini.',
    causes,
    actions: actions.length ? actions : ['Pertahankan tidur cukup, aktivitas ringan, dan interaksi sosial yang positif.'],
  }
}

function getBadgeClass(color) {
  return {
    teal: 'bg-teal-50 text-teal-600 border-teal-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
    red: 'bg-rose-50 text-rose-600 border-rose-100',
    slate: 'bg-slate-50 text-slate-500 border-slate-100',
  }[color] || 'bg-teal-50 text-teal-600 border-teal-100'
}

export default function RekomendasiHarian({ mode = 'dashboard' }) {
  const [entries, setEntries] = useState([])

  const loadData = () => {
    try {
      const raw = localStorage.getItem('riwayat_harian')
      setEntries(raw ? JSON.parse(raw) : [])
    } catch {
      setEntries([])
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const selectedEntry = useMemo(() => {
    if (!entries.length) return null
    const today = new Date().toISOString().split('T')[0]
    const todayEntry = entries.find((item) => item.tanggal === today || item.dateISO === today)
    return mode === 'dashboard' ? (todayEntry || entries[entries.length - 1]) : entries[entries.length - 1]
  }, [entries, mode])

  const result = buildRecommendation(selectedEntry)
  const dateLabel = selectedEntry?.tanggal || selectedEntry?.date || selectedEntry?.dateISO || null

  return (
    <section className='mt-6 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm'>
      <div className='flex items-start justify-between gap-3 mb-5'>
        <div className='flex items-start gap-3'>
          <div className='w-10 h-10 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0'>
            <LuLightbulb size={20} className='text-teal-500' />
          </div>
          <div>
            <h2 className='text-base font-bold text-slate-800'>Rekomendasi Harian</h2>
            <p className='text-xs text-slate-400 mt-1'>Kesimpulan sementara berdasarkan rule/if-else dari data input harian.</p>
          </div>
        </div>
        <button
          type='button'
          onClick={loadData}
          className='w-9 h-9 rounded-xl border border-slate-200 bg-slate-50 hover:bg-teal-50 hover:border-teal-200 flex items-center justify-center transition-all'
          title='Muat ulang rekomendasi'
        >
          <LuRefreshCw size={15} className='text-slate-500' />
        </button>
      </div>

      <div className='bg-slate-50 border border-slate-100 rounded-2xl p-5 mb-4'>
        <div className='flex flex-wrap items-center gap-2 mb-3'>
          <span className={`px-3 py-1 rounded-full border text-xs font-bold ${getBadgeClass(result.color)}`}>{result.level}</span>
          {dateLabel && <span className='text-xs text-slate-400 font-mono'>{dateLabel}</span>}
        </div>
        <h3 className='text-lg font-bold text-slate-800 mb-2'>{result.title}</h3>
        <p className='text-sm text-slate-600 leading-relaxed'>{result.conclusion}</p>
      </div>

      <div className='grid md:grid-cols-2 gap-3'>
        <div className='border border-slate-100 rounded-2xl p-4'>
          <div className='flex items-center gap-2 mb-3'>
            <LuInfo size={15} className='text-amber-500' />
            <h4 className='text-sm font-semibold text-slate-700'>Faktor yang terlihat</h4>
          </div>
          {result.causes.length ? (
            <ul className='space-y-2'>
              {result.causes.map((item, idx) => <li key={idx} className='text-xs text-slate-500'>• {item}</li>)}
            </ul>
          ) : (
            <p className='text-xs text-slate-400'>Belum ada faktor risiko yang menonjol dari data ini.</p>
          )}
        </div>

        <div className='border border-slate-100 rounded-2xl p-4'>
          <div className='flex items-center gap-2 mb-3'>
            <LuShieldCheck size={15} className='text-teal-500' />
            <h4 className='text-sm font-semibold text-slate-700'>Saran tindakan</h4>
          </div>
          <ul className='space-y-2'>
            {result.actions.slice(0, 4).map((item, idx) => <li key={idx} className='text-xs text-slate-500'>• {item}</li>)}
          </ul>
        </div>
      </div>
    </section>
  )
}
