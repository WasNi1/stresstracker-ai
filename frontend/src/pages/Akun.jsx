import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LuMail, LuCalendar, LuPencil,
  LuBell, LuPalette, LuLock,
  LuLogOut, LuChevronRight,
  LuTriangleAlert, LuX, LuCheck,
} from 'react-icons/lu'
import MainLayout from '../layouts/MainLayout'
import { useApp } from '../context/AppContext'

/* ─── Toggle ─── */
function Toggle({ defaultOn = false, checked, onChange }) {
  const [internalOn, setInternalOn] = useState(defaultOn)
  const isControlled = checked !== undefined
  const on = isControlled ? checked : internalOn

  const handle = () => {
    const next = !on
    if (!isControlled) setInternalOn(next)
    onChange?.(next)
  }

  return (
    <button
      type='button'
      onClick={handle}
      aria-pressed={on}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${on ? 'bg-teal-500' : 'bg-slate-200'}`}
    >
      <span className={`absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white shadow transition-all duration-200 ${on ? 'left-[22px]' : 'left-[3px]'}`} />
    </button>
  )
}

/* ─── Settings Item ─── */
function SettingsItem({ label, sub, right }) {
  return (
    <div className='flex items-center justify-between py-4 border-b border-slate-100 last:border-0'>
      <div className='flex-1 pr-4'>
        <div className='text-sm font-medium text-slate-700'>{label}</div>
        {sub && <div className='text-xs mt-0.5 text-slate-400 leading-relaxed'>{sub}</div>}
      </div>
      <div className='shrink-0'>{right}</div>
    </div>
  )
}

/* ─── Section Card ─── */
function SectionCard({ title, icon: Icon, children }) {
  return (
    <div className='bg-white border border-slate-100 rounded-2xl overflow-hidden mb-4 shadow-sm'>
      <div className='px-5 py-3 border-b border-slate-100 flex items-center gap-2 bg-slate-50/60'>
        {Icon && <Icon size={14} className='text-teal-500' />}
        <span className='text-xs font-mono text-slate-400 tracking-widest'>{title}</span>
      </div>
      <div className='px-5'>{children}</div>
    </div>
  )
}

/* ─── Delete Modal ─── */
function DeleteModal({ onClose, onConfirm }) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      <div className='absolute inset-0 bg-black/30 backdrop-blur-sm' onClick={onClose} />
      <div className='relative bg-white border border-slate-100 rounded-2xl p-6 w-full max-w-sm shadow-2xl'>
        <button onClick={onClose} className='absolute top-4 right-4 text-slate-300 hover:text-slate-500'><LuX size={18} /></button>
        <div className='flex items-center gap-3 mb-4'>
          <div className='w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center'>
            <LuTriangleAlert size={18} className='text-red-400' />
          </div>
          <div>
            <div className='text-xs text-slate-400 mt-0.5'>Tindakan ini tidak bisa dibatalkan</div>
          </div>
        </div>
        <p className='text-sm text-slate-500 leading-relaxed mb-5'>
          Seluruh riwayat log, analisis, dan pengaturan kamu akan dihapus permanen.
        </p>
        <div className='flex gap-3'>
          <button onClick={onClose} className='flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-500 text-sm hover:border-slate-300 transition-all'>Batal</button>
          <button onClick={onConfirm} className='flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-all'>Ya, hapus</button>
        </div>
      </div>
    </div>
  )
}

/* ─── Password Modal ─── */
function PasswordModal({ onClose }) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      <div className='absolute inset-0 bg-black/30 backdrop-blur-sm' onClick={onClose} />
      <div className='relative bg-white border border-slate-100 rounded-2xl p-6 w-full max-w-sm shadow-2xl'>
        <button onClick={onClose} className='absolute top-4 right-4 text-slate-300 hover:text-slate-500'><LuX size={18} /></button>
        <div className='font-semibold text-slate-800 mb-4'>Ubah Password</div>
        <div className='space-y-3 mb-5'>
          {['Password lama', 'Password baru', 'Konfirmasi password baru'].map((label) => (
            <div key={label}>
              <label className='text-xs text-slate-400 mb-1 block'>{label}</label>
              <input type='password' placeholder='••••••••'
                className='w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-teal-400 transition-all' />
            </div>
          ))}
        </div>
        <div className='flex gap-3'>
          <button onClick={onClose} className='flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-500 text-sm transition-all'>Batal</button>
          <button onClick={onClose} className='flex-1 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold transition-all'>Simpan</button>
        </div>
      </div>
    </div>
  )
}


function getLogStatsFromStorage() {
  try {
    const raw = localStorage.getItem('riwayat_harian')
    const data = raw ? JSON.parse(raw) : []
    const list = Array.isArray(data) ? data : []
    const uniqueDates = [...new Set(list.map((item) => item?.tanggal).filter(Boolean))].sort()

    let streak = 0
    const dateSet = new Set(uniqueDates)
    const cursor = new Date()
    cursor.setHours(0, 0, 0, 0)

    while (true) {
      const key = cursor.toISOString().split('T')[0]
      if (!dateSet.has(key)) break
      streak += 1
      cursor.setDate(cursor.getDate() - 1)
    }

    return {
      totalLog: list.length,
      streak,
    }
  } catch {
    return {
      totalLog: 0,
      streak: 0,
    }
  }
}

/* ─── Main ─── */
export default function Akun() {
  const navigate = useNavigate()
  const { user, updateUser } = useApp()

  const [editOpen, setEditOpen] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [saveOk, setSaveOk] = useState(false)
  const [reminderEnabled, setReminderEnabled] = useState(() => localStorage.getItem('pengingat_input_harian') !== 'false')
  const [reminderHour, setReminderHour] = useState(() => localStorage.getItem('jam_pengingat_input') || '20:00')
  const [logStats, setLogStats] = useState(() => getLogStatsFromStorage())
  const [lang, setLang] = useState('Indonesia')

  const displayName   = user?.name   || user?.nama          || null
  const displayEmail  = user?.email                         || null
  const displayAge    = user?.age    || user?.usia          || null
  const displayGender = user?.gender || user?.jenis_kelamin || null
  const displayJob    = user?.job    || user?.pekerjaan     || null

  const avatarInitial = displayName ? displayName.charAt(0).toUpperCase() : 'G'

  const subParts = [displayJob, displayAge ? `${displayAge} tahun` : null, displayGender].filter(Boolean)

  const [form, setForm] = useState({
    nama:      displayName  ?? '',
    email:     displayEmail ?? '',
    usia:      displayAge   ? String(displayAge) : '',
    pekerjaan: displayJob   ?? '',
  })

  useEffect(() => {
    localStorage.setItem('pengingat_input_harian', String(reminderEnabled))
  }, [reminderEnabled])

  useEffect(() => {
    localStorage.setItem('jam_pengingat_input', reminderHour)
  }, [reminderHour])

  useEffect(() => {
    const refreshStats = () => setLogStats(getLogStatsFromStorage())
    refreshStats()
    window.addEventListener('storage', refreshStats)
    return () => window.removeEventListener('storage', refreshStats)
  }, [])

  const handleSave = () => {
    const updated = {
      ...user,
      name: form.nama || null, nama: form.nama || null,
      email: form.email || null,
      age: form.usia ? Number(form.usia) : null, usia: form.usia ? Number(form.usia) : null,
      job: form.pekerjaan || null, pekerjaan: form.pekerjaan || null,
    }
    updateUser(updated)
    setEditOpen(false)
    setSaveOk(true)
    setTimeout(() => setSaveOk(false), 2500)
  }

  return (
    <MainLayout title='Akun'>
      {showDelete && <DeleteModal onClose={() => setShowDelete(false)} onConfirm={() => { localStorage.clear(); navigate('/login') }} />}
      {showPassword && <PasswordModal onClose={() => setShowPassword(false)} />}

      <div className='max-w-2xl mx-auto pb-8'>

        {/* ── PROFIL ── */}
        <SectionCard title='PROFIL' icon={LuPencil}>
          <div className='py-5'>
            <div className='flex items-start gap-4'>
              {/* Avatar */}
              <div className='w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-xl font-bold text-white shrink-0 shadow-md shadow-teal-100'>
                {avatarInitial}
              </div>
              <div className='flex-1 min-w-0'>
                <h2 className={`text-base font-semibold ${displayName ? 'text-slate-800' : 'text-slate-300 italic'}`}>
                  {displayName ?? 'Guest'}
                </h2>
                <p className='text-xs text-slate-400 mt-0.5'>
                  {subParts.length > 0
                    ? subParts.join(' · ')
                    : <span className='italic text-slate-300'>Belum ada data profil</span>
                  }
                </p>
                <div className='flex items-center gap-1.5 mt-1.5 text-xs text-slate-400'>
                  <LuMail size={11} />
                  {displayEmail
                    ? <span>{displayEmail}</span>
                    : <span className='italic text-slate-300'>Email belum diisi</span>
                  }
                </div>
                {user?.created_at && (
                  <div className='flex items-center gap-1.5 mt-1 text-xs text-slate-400'>
                    <LuCalendar size={11} />
                    Bergabung {new Date(user.created_at).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                  </div>
                )}
              </div>
              <button
                onClick={() => setEditOpen(!editOpen)}
                className='flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 hover:border-teal-400 hover:text-teal-500 transition-all shrink-0'
              >
                <LuPencil size={11} />
                Edit
              </button>
            </div>

            {/* Form Edit */}
            {editOpen && (
              <div className='mt-5 pt-5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3'>
                {[
                  { label: 'Nama lengkap', key: 'nama',      placeholder: 'Contoh: Budi Santoso',    type: 'text'   },
                  { label: 'Email',        key: 'email',     placeholder: 'nama@email.com',           type: 'email'  },
                  { label: 'Usia',         key: 'usia',      placeholder: 'Contoh: 22',               type: 'number' },
                  { label: 'Pekerjaan',    key: 'pekerjaan', placeholder: 'Contoh: Mahasiswa, Guru…', type: 'text'   },
                ].map((f) => (
                  <div key={f.key}>
                    <label className='text-xs text-slate-400 mb-1 block'>{f.label}</label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      value={form[f.key]}
                      onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
                      className='w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-teal-400 transition-all'
                    />
                  </div>
                ))}
                <div className='col-span-2 flex justify-end gap-2 mt-1'>
                  <button onClick={() => setEditOpen(false)} className='text-xs px-4 py-2 rounded-lg border border-slate-200 text-slate-500 hover:border-slate-300 transition-all'>Batal</button>
                  <button onClick={handleSave} className='text-xs px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-600 text-white font-semibold transition-all flex items-center gap-1.5'>
                    {saveOk ? <><LuCheck size={12} />Tersimpan</> : 'Simpan'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className='grid grid-cols-2 gap-3 pb-5 pt-1 border-t border-slate-100'>
            {[{ num: logStats.totalLog, label: 'Total log' }, { num: logStats.streak, label: 'Streak hari' }].map((s) => (
              <div key={s.label} className='text-center py-2'>
                <div className='text-xl font-bold text-teal-500'>{s.num}</div>
                <div className='text-xs text-slate-400 mt-0.5'>{s.label}</div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* ── NOTIFIKASI ── */}
        <SectionCard title='NOTIFIKASI' icon={LuBell}>
          <SettingsItem
            label='Pengingat input harian'
            sub='Ingatkan untuk isi log setiap hari'
            right={<Toggle checked={reminderEnabled} onChange={setReminderEnabled} />}
          />
          <SettingsItem
            label='Jam pengingat'
            sub={reminderEnabled ? `${reminderHour} — sebelum tidur` : 'Pengingat input harian sedang mati'}
            right={
              <input
                type='time'
                value={reminderHour}
                disabled={!reminderEnabled}
                onChange={(e) => setReminderHour(e.target.value)}
                className={`bg-slate-50 border border-slate-200 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-teal-400 transition-all ${reminderEnabled ? 'text-slate-600' : 'text-slate-300 cursor-not-allowed opacity-60'}`}
              />
            }
          />
        </SectionCard>

        {/* ── TAMPILAN ── */}
        <SectionCard title='TAMPILAN' icon={LuPalette}>
          <SettingsItem label='Tema gelap' sub='Aktif secara default' right={<Toggle defaultOn />} />
          <SettingsItem
            label='Bahasa' sub='Bahasa tampilan aplikasi'
            right={
              <select value={lang} onChange={(e) => setLang(e.target.value)}
                className='bg-slate-50 border border-slate-200 text-slate-600 text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-teal-400 transition-all'>
                <option>Indonesia</option>
                <option>English</option>
              </select>
            }
          />
        </SectionCard>

        {/* ── KEAMANAN & AKUN ── */}
        <SectionCard title='KEAMANAN & AKUN' icon={LuLock}>
          <SettingsItem
            label='Ubah password' sub='Ganti password akun kamu'
            right={
              <button onClick={() => setShowPassword(true)} className='flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 hover:border-teal-400 hover:text-teal-500 transition-all'>
                Ubah<LuChevronRight size={12} />
              </button>
            }
          />
          <SettingsItem
            label='Keluar dari akun' sub='Sesi kamu akan diakhiri'
            right={
              <button onClick={() => navigate('/login')} className='flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-400 hover:bg-red-50 transition-all'>
                <LuLogOut size={12} />Logout
              </button>
            }
          />
        </SectionCard>

        <p className='text-center text-xs text-slate-300 pb-2'>StressTracker AI · v1.0.0</p>
      </div>
    </MainLayout>
  )
}