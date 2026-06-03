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
  const sleepHours = sleep !== null ? (sleep / 60).toFixed(1) : null

  const causes = []
  const actions = []

  const add = (cause, action) => {
    if (cause && !causes.includes(cause)) causes.push(cause)
    if (action && !actions.includes(action)) actions.push(action)
  }

  if (sleep !== null && sleep < 300) {
    add(
      'Durasi tidur sangat kurang',
      `Kamu hanya tidur ±${sleepHours} jam. Targetkan 7–9 jam per malam. Coba tidur 30 menit lebih awal malam ini dan hindari layar 1 jam sebelum tidur.`
    )
  } else if (sleep !== null && sleep < 420) {
    add(
      'Durasi tidur masih kurang',
      `Kamu tidur ±${sleepHours} jam. Usahakan menambah durasi tidur secara bertahap sampai minimal 7 jam.`
    )
  }

  if (screen !== null && screen > 120) {
    add(
      'Screen time sebelum tidur sangat tinggi',
      'Batasi penggunaan HP/laptop sebelum tidur. Mulai dengan mode malam, jauhkan perangkat dari kasur, dan hentikan layar 60 menit sebelum tidur.'
    )
  } else if (screen !== null && screen > 60) {
    add(
      'Screen time sebelum tidur cukup tinggi',
      'Kurangi layar 30–60 menit sebelum tidur agar tubuh lebih siap beristirahat.'
    )
  }

  if (isYes(d.sering_terbangun_malam)) {
    add(
      'Tidur sering terbangun di malam hari',
      'Buat rutinitas tidur yang lebih tenang: redupkan lampu, hindari kafein sore/malam, dan jaga suhu kamar tetap nyaman.'
    )
  }

  if (isYes(d.mimpi_buruk)) {
    add(
      'Mimpi buruk mengganggu kualitas tidur',
      'Coba lakukan relaksasi ringan sebelum tidur, seperti napas dalam 3–5 menit atau menulis pikiran yang mengganggu.'
    )
  }

  if (isYes(d.minum_kopi_hari_ini) && sleep !== null && sleep < 420) {
    add(
      'Kopi + tidur kurang = stres berganda',
      'Kafein dapat memengaruhi kualitas tidur. Batasi konsumsi sebelum jam 12 siang dan ganti sore hari dengan air putih atau teh herbal.'
    )
  } else if (isYes(d.minum_kopi_hari_ini)) {
    add(
      'Ada konsumsi kopi hari ini',
      'Jaga konsumsi kafein agar tidak terlalu sore, terutama jika kamu mudah sulit tidur.'
    )
  }

  if (isYes(d.merokok)) {
    add(
      'Ada kebiasaan merokok hari ini',
      'Kurangi rokok secara bertahap, terutama saat sedang stres. Ganti respons stres dengan minum air, tarik napas, atau berjalan sebentar.'
    )
  }

  if (isYes(d.konsumsi_alkohol)) {
    add(
      'Konsumsi alkohol dapat mengganggu pemulihan',
      'Hindari alkohol saat tubuh sedang lelah karena dapat menurunkan kualitas tidur dan memperberat stres esok hari.'
    )
  }

  if (outdoor !== null && outdoor < 20) {
    add(
      'Kurang waktu di luar ruangan',
      'Luangkan 10–20 menit untuk berjalan santai atau terkena sinar matahari pagi agar mood dan energi lebih stabil.'
    )
  }

  if (isYes(d.lembur) && isYes(d.deadline_hari_ini)) {
    add(
      'Deadline dan lembur meningkatkan tekanan',
      'Buat daftar prioritas 3 tugas utama, kerjakan satu per satu, lalu sisipkan jeda 5–10 menit di antara pekerjaan.'
    )
  } else if (isYes(d.lembur) || isYes(d.deadline_hari_ini)) {
    add(
      'Ada tekanan kerja atau deadline',
      'Atur tugas berdasarkan prioritas, pecah pekerjaan besar menjadi langkah kecil, dan beri jeda singkat setelah fokus bekerja.'
    )
  }

  if (konsentrasi !== null && konsentrasi <= 2) {
    add(
      'Konsentrasi sedang menurun',
      'Gunakan teknik fokus seperti Pomodoro: 25 menit fokus, 5 menit istirahat. Jauhkan distraksi saat mengerjakan tugas penting.'
    )
  }

  if (d.suasana_hati === 'Negatif') {
    add(
      'Suasana hati cenderung negatif',
      'Ambil waktu untuk aktivitas yang menenangkan, seperti journaling singkat, mendengar musik tenang, atau berjalan ringan.'
    )
  } else if (d.suasana_hati === 'Campur') {
    add(
      'Suasana hati sedang campur aduk',
      'Coba identifikasi hal yang paling mengganggu hari ini, lalu pilih satu tindakan kecil yang bisa kamu kendalikan.'
    )
  }

  if (isYes(d.konflik_interpersonal)) {
    add(
      'Ada konflik interpersonal',
      'Ambil jeda sebelum merespons. Jika memungkinkan, bicarakan masalah dengan kalimat yang tenang dan fokus pada solusi.'
    )
  }

  if (isYes(d.merasa_kesepian)) {
    add(
      'Muncul perasaan kesepian',
      'Hubungi orang terdekat atau mulai percakapan ringan. Interaksi singkat tetap bisa membantu mengurangi beban emosi.'
    )
  }

  if (sosial !== null && sosial <= 2) {
    add(
      'Interaksi sosial masih sedikit',
      'Luangkan waktu untuk berinteraksi dengan orang terdekat, meskipun hanya pesan singkat atau obrolan sebentar.'
    )
  }

  if (isYes(d.meditasi) === false) {
    add(
      null,
      'Coba meditasi atau latihan napas 3–5 menit untuk membantu menenangkan pikiran.'
    )
  }

  if (isYes(d.aktivitas_hobi) === false) {
    add(
      'Belum ada aktivitas hobi hari ini',
      'Sisihkan waktu 10–15 menit untuk aktivitas yang kamu sukai agar tubuh mendapat ruang pemulihan.'
    )
  }

  if (causes.length === 0) {
    causes.push('Tidak ada faktor stres besar yang terlihat')
  }

  if (actions.length === 0) {
    actions.push('Pertahankan tidur cukup, aktivitas ringan, dan interaksi sosial yang positif.')
  }

  return {
    level: stressLevel === 'Tinggi' ? 'Stress tinggi' : stressLevel === 'Sedang' ? 'Stress sedang' : stressLevel === 'Rendah' ? 'Stress rendah' : stressLevel,
    color: stressLevel === 'Tinggi' ? 'red' : stressLevel === 'Sedang' ? 'amber' : stressLevel === 'Rendah' ? 'teal' : 'slate',
    causes,
    actions,
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
            <p className='text-xs text-slate-400 mt-1'>Rekomendasi dibuat berdasarkan pola tidur, gaya hidup, produktivitas, dan kondisi sosial hari ini.</p>
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

      <div className='flex flex-wrap items-center gap-2 mb-4'>
        <span className={`px-3 py-1 rounded-full border text-xs font-bold ${getBadgeClass(result.color)}`}>{result.level}</span>
        {dateLabel && <span className='text-xs text-slate-400 font-mono'>{dateLabel}</span>}
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
