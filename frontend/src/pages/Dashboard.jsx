import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LuMoon,
  LuFlaskConical,
  LuBriefcase,
  LuUsers,
  LuHeart,
  LuClipboardList,
} from 'react-icons/lu'
import MainLayout from '../layouts/MainLayout'
import { useApp } from '../context/AppContext'
import { getBrowserFcmToken } from '../utils/fcmNotification';
import { saveFcmToken } from '../api/notification';

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */
function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Selamat Pagi'
  if (h < 17) return 'Selamat Siang'
  return 'Selamat Malam'
}

const STRESS_COLOR = {
  'Rendah': { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-600', badge: 'bg-emerald-100 text-emerald-600', bar: 'bg-emerald-400', dot: 'bg-emerald-400' },
  'Sedang': { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-500', badge: 'bg-amber-100 text-amber-600', bar: 'bg-amber-400', dot: 'bg-amber-400' },
  'Tinggi': { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-500', badge: 'bg-rose-100 text-rose-600', bar: 'bg-rose-400', dot: 'bg-rose-400' },
}



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

function formatLabel(key) {
  const map = {
    // Pola & kualitas tidur
    durasi_tidur_menit: 'Durasi Tidur (menit)',
    sering_terbangun_malam: 'Sering Terbangun Malam',
    mimpi_buruk: 'Mimpi Buruk',
    screen_sebelum_tidur: 'Screen Sebelum Tidur (menit)',
    // Konsumsi zat & substansi
    minum_kopi_hari_ini: 'Minum Kopi Hari Ini',
    merokok: 'Merokok',
    konsumsi_alkohol: 'Konsumsi Alkohol',
    // Beban & tekanan kerja
    deadline_hari_ini: 'Deadline Hari Ini',
    lembur: 'Lembur',
    konsentrasi: 'Konsentrasi',
    // Kondisi hubungan sosial
    suasana_hati: 'Suasana Hati',
    konflik_interpersonal: 'Konflik Interpersonal',
    merasa_kesepian: 'Merasa Kesepian',
    interaksi_sosial: 'Interaksi Sosial',
    // Aktivitas pemulihan diri
    meditasi: 'Meditasi',
    aktivitas_hobi: 'Aktivitas Hobi',
    waktu_outdoor: 'Waktu Outdoor',
  }
  return map[key] || key
}

function formatValue(key, val) {
  if (val === null || val === undefined) return '-'
  if (key === 'durasi_tidur_menit') {
    const j = Math.floor(val / 60)
    const m = val % 60
    const jamStr = j > 0 && m > 0 ? `${j} jam ${m} menit` : j > 0 ? `${j} jam` : `${m} menit`
    return `${val} menit (${jamStr})`
  }
  if (key === 'screen_sebelum_tidur') return `${val} menit`
  if (key === 'waktu_outdoor') {
    const j = Math.floor(val / 60)
    const m = val % 60
    const jamStr = j > 0 && m > 0 ? `${j} jam ${m} menit` : j > 0 ? `${j} jam` : `${m} menit`
    return `${val} menit (${jamStr})`
  }
  if (key === 'konsentrasi' || key === 'interaksi_sosial') return formatSkalaLabel(key, val)
  return String(val)
}

const INPUT_SECTIONS = [
  {
    title: 'Pola & kualitas tidur',
    sub: 'Seberapa nyenyak seseorang beristirahat',
    icon: LuMoon,
    keys: ['durasi_tidur_menit', 'sering_terbangun_malam', 'mimpi_buruk', 'screen_sebelum_tidur'],
  },
  {
    title: 'Konsumsi zat & substansi',
    sub: 'Zat yang dikonsumsi dan mempengaruhi tubuh',
    icon: LuFlaskConical,
    keys: ['minum_kopi_hari_ini', 'merokok', 'konsumsi_alkohol'],
  },
  {
    title: 'Beban & tekanan kerja',
    sub: 'Tuntutan pekerjaan hari ini',
    icon: LuBriefcase,
    keys: ['deadline_hari_ini', 'lembur', 'konsentrasi'],
  },
  {
    title: 'Kondisi hubungan sosial',
    sub: 'Kualitas interaksi dengan orang sekitar',
    icon: LuUsers,
    keys: ['suasana_hati', 'konflik_interpersonal', 'merasa_kesepian', 'interaksi_sosial'],
  },
  {
    title: 'Aktivitas pemulihan diri',
    sub: 'Kegiatan yang membantu menurunkan stres',
    icon: LuHeart,
    keys: ['meditasi', 'aktivitas_hobi', 'waktu_outdoor'],
  },
]

/* ─────────────────────────────────────────────
   Sub-komponen
───────────────────────────────────────────── */

function StressHero({ entry }) {
  const level = entry?.stressLevel ?? null
  const c = level ? STRESS_COLOR[level] : null

  if (!entry || !level) {
    return (
      <div className='bg-slate-50 border border-slate-200 rounded-3xl p-8 text-center mb-6'>
        <div className='text-xs font-mono text-slate-400 mb-3 tracking-widest'>TINGKAT STRESS HARI INI</div>
        <div className='text-3xl font-bold text-slate-300 mb-2'>Belum ada data</div>
        <p className='text-sm text-slate-400'>Isi input harian untuk melihat stress level kamu hari ini.</p>
      </div>
    )
  }

  return (
    <div className={`${c.bg} border ${c.border} rounded-3xl p-8 text-center mb-6`}>
      <div className='text-xs font-mono text-slate-400 mb-3 tracking-widest'>TINGKAT STRESS HARI INI</div>
      <div className={`text-5xl font-bold ${c.text} leading-none mb-3`}>{level}</div>
      <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${c.badge}`}>
        {entry.tanggal}
      </div>
    </div>
  )
}

function InputRingkasan({ entry }) {
  if (!entry) return null
  return (
    <div className='mb-6'>
      <div className='flex items-center gap-2 mb-4'>
        <LuClipboardList size={16} className='text-teal-500' />
        <h2 className='text-base font-semibold text-slate-700'>Ringkasan Input Hari Ini</h2>
      </div>
      <div className='space-y-3'>
        {INPUT_SECTIONS.map(({ title, sub, icon: Icon, keys }) => (
          <div key={title} className='bg-white border border-slate-100 rounded-2xl p-5 shadow-sm'>
            {/* Header kelompok */}
            <div className='mb-3 pb-3 border-b border-slate-100'>
              <div className='flex items-center gap-2 mb-0.5'>
                <div className='w-7 h-7 bg-teal-50 rounded-lg flex items-center justify-center shrink-0'>
                  <Icon size={14} className='text-teal-500' />
                </div>
                <span className='text-sm font-semibold text-slate-800'>{title}</span>
              </div>
              {sub && <p className='text-xs text-slate-400 ml-9'>{sub}</p>}
            </div>
            {/* Baris data */}
            <div className='space-y-2.5'>
              {keys.map((k) => (
                <div key={k} className='flex justify-between items-center'>
                  <span className='text-xs text-slate-400 font-mono'>{formatLabel(k)}</span>
                  <span className='text-xs font-medium text-slate-700 text-right max-w-[55%]'>
                    {formatValue(k, entry[k])}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Main Dashboard
───────────────────────────────────────────── */
function Dashboard() {
  const navigate = useNavigate()
  const { user } = useApp()
  const [riwayat, setRiwayat] = useState([])
  const today = new Date().toISOString().split('T')[0]

  useEffect(() => {
    const raw = localStorage.getItem('riwayat_harian')
    if (raw) setRiwayat(JSON.parse(raw))
  }, [])

  const todayEntry = riwayat.find((r) => r.tanggal === today) ?? null

  const displayName = user?.name || user?.nama || null

  useEffect(() => {
    const askForNotificationPermission = async () => {
      if (Notification.permission === 'default') {
        try {
          console.log('Memicu pop-up izin notifikasi otomatis...');
          const result = await getBrowserFcmToken();

          if (result.token) {
            await saveFcmToken(result.token);

            localStorage.setItem('fcmToken', result.token);
            localStorage.setItem('pengingat_input_harian', 'true'); // Otomatis ON-kan toggle

            console.log('Izin diberikan! Token otomatis tersimpan.');
          } else {
            console.log('User menekan Block atau menutup pop-up.');
          }
        } catch (error) {
          console.error('Gagal memproses notifikasi otomatis:', error);
        }
      }
    };

    askForNotificationPermission();
  }, []);
  
  return (
    <MainLayout title='Dashboard'>
      <div className='max-w-2xl mx-auto'>

        {/* Greeting */}
        <div className='mb-6'>
          <h1 className='text-2xl md:text-3xl font-bold text-slate-800'>
            {getGreeting()},{' '}
            <span className={displayName ? 'text-teal-500' : 'text-slate-300 italic'}>
              {displayName ?? 'Guest'}
            </span>
            👋
          </h1>
          <p className='text-slate-400 mt-1.5 text-sm'>Pantau kesehatan mental harianmu</p>
        </div>

        {/* 1. Stress level hari ini */}
        <StressHero entry={todayEntry} />

        {/* 2. Ringkasan semua input hari ini */}
        {todayEntry ? (
          <InputRingkasan entry={todayEntry} />
        ) : (
          <div className='bg-teal-50 border border-teal-100 rounded-2xl p-5 text-center'>
            <p className='text-sm text-teal-600 mb-3'>Kamu belum mengisi input harian hari ini.</p>
            <button
              onClick={() => navigate('/input-harian')}
              className='px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-white text-sm font-semibold rounded-xl transition-all'
            >
              Isi Sekarang
            </button>
          </div>
        )}

      </div>
    </MainLayout>
  )
}

export default Dashboard