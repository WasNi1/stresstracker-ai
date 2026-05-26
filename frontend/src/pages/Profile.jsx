import { useState } from 'react'
import {
  LuMail,
  LuCalendar,
  LuPencil,
} from 'react-icons/lu'
import MainLayout from '../layouts/MainLayout'

// ─── Ambil data user dari localStorage ───────────────────────────────────────
function getUserData() {
  try {
    const raw = localStorage.getItem('user')
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function Tag({ color, children }) {
  const colors = {
    green: 'bg-teal-50 text-teal-600 border-teal-200',
    amber: 'bg-amber-50 text-amber-600 border-amber-200',
    red:   'bg-red-50 text-red-500 border-red-200',
    blue:  'bg-blue-50 text-blue-500 border-blue-200',
  }
  return (
    <span className={`text-xs px-3 py-1 rounded-full border font-medium ${colors[color]}`}>
      {children}
    </span>
  )
}

function DataRow({ label, value, last = false }) {
  return (
    <div className={`flex items-center justify-between py-3 ${!last && 'border-b border-slate-100'}`}>
      <span className='text-sm text-slate-400'>{label}</span>
      <span className='font-mono text-sm text-slate-700'>{value}</span>
    </div>
  )
}

function SectionCard({ title, icon: Icon, children }) {
  return (
    <div className='bg-white border border-slate-100 rounded-2xl overflow-hidden mb-4 shadow-sm'>
      <div className='px-5 py-3 border-b border-slate-100 flex items-center gap-2'>
        {Icon && <Icon size={14} className='text-slate-400' />}
        <span className='text-xs font-mono text-slate-400 tracking-widest'>{title}</span>
      </div>
      <div className='px-5'>{children}</div>
    </div>
  )
}

const achievements = [
  { emoji: '🔥', title: '7-day streak',  sub: 'Input 7 hari berturut-turut',    dot: 'bg-amber-400' },
  { emoji: '💚', title: 'Stress turun',  sub: 'Level 3 → 2 dalam 2 minggu',     dot: 'bg-teal-400' },
  { emoji: '🏃', title: 'Aktif bergerak', sub: 'Olahraga 5x minggu ini',         dot: 'bg-blue-400' },
]

export default function Profile() {
  const [editOpen, setEditOpen] = useState(false)

  // ── Ambil & normalkan data user ─────────────────────────────────────────
  const user = getUserData()

  const displayName   = user?.name   || user?.nama              || null
  const displayEmail  = user?.email                             || null
  const displayAge    = user?.age    || user?.usia              || null
  const displayGender = user?.gender || user?.jenis_kelamin     || null
  const displayJob    = user?.job    || user?.pekerjaan         || null

  // Inisial avatar: huruf pertama nama, atau "G" untuk guest
  const avatarInitial = displayName ? displayName.charAt(0).toUpperCase() : 'G'

  // Sub-header: gabungan pekerjaan · usia · gender (hanya yang ada)
  const subParts = [
    displayJob,
    displayAge    ? `${displayAge} tahun` : null,
    displayGender,
  ].filter(Boolean)

  return (
    <MainLayout title='Profil'>
      <div className='max-w-2xl mx-auto space-y-4'>

        {/* Avatar + Info */}
        <div className='bg-white border border-slate-100 rounded-2xl p-6 shadow-sm'>
          <div className='flex items-start gap-5'>
            <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-2xl font-bold text-white shrink-0 shadow-md shadow-teal-100'>
              {avatarInitial}
            </div>
            <div className='flex-1 min-w-0'>
              <div className='flex items-center justify-between'>
                <div>
                  {/* Nama — fallback "Guest" jika belum ada */}
                  <h2 className={`text-xl font-semibold ${displayName ? 'text-slate-800' : 'text-slate-300 italic'}`}>
                    {displayName ?? 'Guest'}
                  </h2>

                  {/* Sub-header: pekerjaan · usia · gender */}
                  <p className='text-sm text-slate-400 mt-0.5'>
                    {subParts.length > 0
                      ? subParts.join(' · ')
                      : <span className='italic text-slate-300'>Belum ada data</span>
                    }
                  </p>
                </div>
                <button
                  onClick={() => setEditOpen(!editOpen)}
                  className='flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 hover:border-teal-400 hover:text-teal-500 transition-all'
                >
                  <LuPencil size={12} />
                  Edit
                </button>
              </div>

              {/* Email */}
              <div className='flex items-center gap-1.5 mt-2 text-xs text-slate-400'>
                <LuMail size={12} />
                {displayEmail
                  ? <span>{displayEmail}</span>
                  : <span className='italic text-slate-300'>Email belum diisi</span>
                }
              </div>

              {/* Tanggal bergabung (dari token/user jika ada, atau disembunyikan) */}
              {user?.created_at && (
                <div className='flex items-center gap-1.5 mt-1 text-xs text-slate-400'>
                  <LuCalendar size={12} />
                  Bergabung {new Date(user.created_at).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                </div>
              )}
            </div>
          </div>

          {/* Form Edit */}
          {editOpen && (
            <div className='mt-5 pt-5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3'>
              {[
                { label: 'Nama lengkap', placeholder: displayName  ?? 'Nova Wijaya' },
                { label: 'Email',        placeholder: displayEmail  ?? 'nama@email.com' },
                { label: 'Usia',         placeholder: displayAge    ? String(displayAge) : '22' },
                { label: 'Pekerjaan',    placeholder: displayJob    ?? 'Mahasiswa' },
              ].map((f) => (
                <div key={f.label}>
                  <label className='text-xs text-slate-400 mb-1 block'>{f.label}</label>
                  <input
                    type='text'
                    placeholder={f.placeholder}
                    defaultValue={f.placeholder !== ('Nova Wijaya' || 'nama@email.com' || '22' || 'Mahasiswa') ? f.placeholder : ''}
                    className='w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-teal-400 transition-all'
                  />
                </div>
              ))}
              <div className='col-span-2 flex justify-end gap-2 mt-1'>
                <button onClick={() => setEditOpen(false)} className='text-xs px-4 py-2 rounded-lg border border-slate-200 text-slate-500 hover:border-slate-300 transition-all'>
                  Batal
                </button>
                <button onClick={() => setEditOpen(false)} className='text-xs px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-600 text-white font-semibold transition-all'>
                  Simpan
                </button>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className='grid grid-cols-4 gap-3 mt-5 pt-5 border-t border-slate-100'>
            {[
              { num: '42',  label: 'Total log' },
              { num: '7',   label: 'Streak hari' },
            ].map((s) => (
              <div key={s.label} className='text-center'>
                <div className='text-xl font-bold text-teal-500'>{s.num}</div>
                <div className='text-xs text-slate-400 mt-0.5'>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </MainLayout>
  )
}