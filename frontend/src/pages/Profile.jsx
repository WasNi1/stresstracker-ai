import { useState } from 'react'
import {
  LuUser,
  LuMail,
  LuCalendar,
  LuTrendingDown,
  LuFlame,
  LuActivity,
  LuDownload,
  LuTrash2,
  LuLogOut,
  LuLock,
  LuBell,
  LuShield,
  LuPalette,
  LuChevronRight,
  LuPencil,
} from 'react-icons/lu'
import MainLayout from '../layouts/MainLayout'

/* ─────────────── helpers ─────────────── */

function Tag({ color, children }) {
  const colors = {
    green: 'bg-teal-500/15 text-teal-300 border-teal-500/30',
    amber: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    red: 'bg-red-500/15 text-red-400 border-red-500/30',
    blue: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
  }
  return (
    <span className={`text-xs px-3 py-1 rounded-full border font-medium ${colors[color]}`}>
      {children}
    </span>
  )
}

function Toggle({ defaultOn = false }) {
  const [on, setOn] = useState(defaultOn)
  return (
    <button
      onClick={() => setOn(!on)}
      className={`relative w-11 h-6 rounded-full transition-all ${
        on ? 'bg-teal-500' : 'bg-slate-600'
      }`}
    >
      <span
        className={`absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white transition-all ${
          on ? 'left-[22px]' : 'left-[3px]'
        }`}
      />
    </button>
  )
}

function DataRow({ label, value, last = false }) {
  return (
    <div className={`flex items-center justify-between py-3 ${!last && 'border-b border-slate-700/50'}`}>
      <span className='text-sm text-slate-500'>{label}</span>
      <span className='font-mono text-sm text-slate-200'>{value}</span>
    </div>
  )
}

function SettingsItem({ label, sub, subRed = false, right }) {
  return (
    <div className='flex items-center justify-between py-4 border-b border-slate-700/50 last:border-0'>
      <div>
        <div className='text-sm font-medium text-slate-200'>{label}</div>
        {sub && (
          <div className={`text-xs mt-0.5 ${subRed ? 'text-red-400' : 'text-slate-500'}`}>{sub}</div>
        )}
      </div>
      <div className='ml-4 shrink-0'>{right}</div>
    </div>
  )
}

function SectionCard({ title, icon: Icon, children }) {
  return (
    <div className='bg-slate-800/60 border border-slate-700/50 rounded-2xl overflow-hidden mb-4'>
      <div className='px-5 py-3 border-b border-slate-700/50 flex items-center gap-2'>
        {Icon && <Icon size={14} className='text-slate-500' />}
        <span className='text-xs font-mono text-slate-500 tracking-widest'>{title}</span>
      </div>
      <div className='px-5'>{children}</div>
    </div>
  )
}

/* ─────────────── data ─────────────── */

const achievements = [
  {
    emoji: '🔥',
    title: '7-day streak',
    sub: 'Input 7 hari berturut-turut',
    dot: 'bg-amber-400',
  },
  {
    emoji: '💚',
    title: 'Stress turun',
    sub: 'Level 3 → 2 dalam 2 minggu',
    dot: 'bg-teal-400',
  },
  {
    emoji: '🏃',
    title: 'Aktif bergerak',
    sub: 'Olahraga 5x minggu ini',
    dot: 'bg-blue-400',
  },
]

/* ─────────────── main ─────────────── */

export default function Profile() {
  const [editOpen, setEditOpen] = useState(false)

  return (
    <MainLayout title='Profil'>
      <div className='max-w-2xl mx-auto space-y-4'>

        {/* ── Avatar + Info ── */}
        <div className='bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6'>
          <div className='flex items-start gap-5'>
            {/* Avatar */}
            <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-2xl font-bold text-slate-900 shrink-0'>
              N
            </div>

            {/* Bio */}
            <div className='flex-1 min-w-0'>
              <div className='flex items-center justify-between'>
                <div>
                  <h2 className='text-xl font-semibold text-slate-100'>Nova Wijaya</h2>
                  <p className='text-sm text-slate-500 mt-0.5'>Mahasiswa · 22 tahun · Laki-laki</p>
                </div>
                <button
                  onClick={() => setEditOpen(!editOpen)}
                  className='flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-slate-600 text-slate-400 hover:border-teal-500/50 hover:text-teal-300 transition-all'
                >
                  <LuPencil size={12} />
                  Edit
                </button>
              </div>
              <div className='flex items-center gap-1.5 mt-2 text-xs text-slate-500'>
                <LuMail size={12} />
                nova@email.com
              </div>
              <div className='flex items-center gap-1.5 mt-1 text-xs text-slate-500'>
                <LuCalendar size={12} />
                Bergabung April 2026
              </div>
            </div>
          </div>

          {/* Edit form (collapsible) */}
          {editOpen && (
            <div className='mt-5 pt-5 border-t border-slate-700/50 grid grid-cols-2 gap-3'>
              {[
                { label: 'Nama lengkap', placeholder: 'Nova Wijaya' },
                { label: 'Email', placeholder: 'nova@email.com' },
                { label: 'Usia', placeholder: '22' },
                { label: 'Pekerjaan', placeholder: 'Mahasiswa' },
              ].map((f) => (
                <div key={f.label}>
                  <label className='text-xs text-slate-500 mb-1 block'>{f.label}</label>
                  <input
                    type='text'
                    placeholder={f.placeholder}
                    className='w-full bg-slate-900/60 border border-slate-600 rounded-xl px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-teal-500 transition-all'
                  />
                </div>
              ))}
              <div className='col-span-2 flex justify-end gap-2 mt-1'>
                <button
                  onClick={() => setEditOpen(false)}
                  className='text-xs px-4 py-2 rounded-lg border border-slate-600 text-slate-400 hover:border-slate-500 transition-all'
                >
                  Batal
                </button>
                <button
                  onClick={() => setEditOpen(false)}
                  className='text-xs px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-900 font-semibold transition-all'
                >
                  Simpan
                </button>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className='grid grid-cols-4 gap-3 mt-5 pt-5 border-t border-slate-700/50'>
            {[
              { num: '42', label: 'Total log' },
              { num: '7', label: 'Streak hari' },
              { num: '2.1', label: 'Avg stress' },
              { num: '7.3', label: 'Avg tidur' },
            ].map((s) => (
              <div key={s.label} className='text-center'>
                <div className='text-xl font-semibold text-teal-300'>{s.num}</div>
                <div className='text-xs text-slate-500 mt-0.5'>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Grid: Data Fisik + Pencapaian ── */}
        <div className='grid md:grid-cols-2 gap-4'>

          {/* Data Fisik */}
          <SectionCard title='DATA FISIK'>
            <DataRow label='Tinggi badan' value='170 cm' />
            <DataRow label='Berat badan' value='65 kg' />
            <DataRow label='BMI' value={<span className='text-teal-400'>22.5 (Normal)</span>} />
            <DataRow
              label='Level aktivitas'
              value={<Tag color='green'>Sedang</Tag>}
              last
            />
          </SectionCard>

          {/* Pencapaian */}
          <SectionCard title='PENCAPAIAN'>
            <div className='py-2 space-y-4'>
              {achievements.map((a) => (
                <div key={a.title} className='flex items-center gap-3'>
                  <div className={`w-2 h-2 rounded-full shrink-0 ${a.dot}`} />
                  <div>
                    <div className='text-sm font-medium text-slate-200'>
                      {a.emoji} {a.title}
                    </div>
                    <div className='text-xs text-slate-500 mt-0.5'>{a.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* ── Notifikasi ── */}
        <SectionCard title='NOTIFIKASI' icon={LuBell}>
          <SettingsItem
            label='Pengingat input harian'
            sub='Ingatkan untuk isi log setiap hari'
            right={<Toggle defaultOn />}
          />
          <SettingsItem
            label='Jam pengingat'
            sub='Sebelum tidur malam'
            right={
              <select className='bg-slate-700 border border-slate-600 text-slate-200 text-xs rounded-lg px-2 py-1.5 focus:outline-none'>
                <option>19:00</option>
                <option selected>20:00</option>
                <option>21:00</option>
              </select>
            }
          />
          <SettingsItem
            label='Alert stress tinggi'
            sub='Notif jika stress mencapai level 3–4'
            right={<Toggle defaultOn />}
          />
          <SettingsItem
            label='Ringkasan mingguan'
            sub='Laporan performa setiap Minggu pagi'
            right={<Toggle defaultOn />}
          />
        </SectionCard>

        {/* ── Privasi & Data ── */}
        <SectionCard title='PRIVASI & DATA' icon={LuShield}>
          <SettingsItem
            label='Data anonim untuk riset'
            sub='Bantu tingkatkan akurasi model AI'
            right={<Toggle />}
          />
          <SettingsItem
            label='Export data saya'
            sub='Unduh semua log dalam format CSV'
            right={
              <button className='flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-slate-600 text-slate-300 hover:border-teal-500/50 hover:text-teal-300 transition-all'>
                <LuDownload size={12} />
                Export
              </button>
            }
          />
          <SettingsItem
            label='Hapus semua data'
            sub='Tindakan ini tidak bisa dibatalkan'
            subRed
            right={
              <button className='flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-red-500/40 text-red-400 hover:bg-red-500/10 transition-all'>
                <LuTrash2 size={12} />
                Hapus
              </button>
            }
          />
        </SectionCard>

        {/* ── Tampilan ── */}
        <SectionCard title='TAMPILAN' icon={LuPalette}>
          <SettingsItem
            label='Tema gelap'
            sub='Aktif secara default'
            right={<Toggle defaultOn />}
          />
          <SettingsItem
            label='Bahasa'
            sub='Bahasa tampilan aplikasi'
            right={
              <select className='bg-slate-700 border border-slate-600 text-slate-200 text-xs rounded-lg px-2 py-1.5 focus:outline-none'>
                <option selected>Indonesia</option>
                <option>English</option>
              </select>
            }
          />
        </SectionCard>

        {/* ── Akun ── */}
        <SectionCard title='AKUN' icon={LuLock}>
          <SettingsItem
            label='Ubah password'
            right={
              <button className='flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-slate-600 text-slate-300 hover:border-slate-500 transition-all'>
                Ubah
                <LuChevronRight size={12} />
              </button>
            }
          />
          <SettingsItem
            label='Keluar dari akun'
            right={
              <button className='flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-red-500/40 text-red-400 hover:bg-red-500/10 transition-all'>
                <LuLogOut size={12} />
                Logout
              </button>
            }
          />
        </SectionCard>

        {/* Footer */}
        <p className='text-center text-xs text-slate-600 pb-6'>
          StressTracker AI · v1.0.0 · Dibuat dengan ❤️
        </p>

      </div>
    </MainLayout>
  )
}

export default Profile;