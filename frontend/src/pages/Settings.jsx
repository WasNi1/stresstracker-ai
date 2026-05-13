import { useState } from 'react'
import {
  LuBell,
  LuShield,
  LuPalette,
  LuLock,
  LuDownload,
  LuTrash2,
  LuLogOut,
  LuChevronRight,
  LuTriangleAlert,
  LuX,
} from 'react-icons/lu'
import MainLayout from '../layouts/MainLayout'

function Toggle({ defaultOn = false, onChange }) {
  const [on, setOn] = useState(defaultOn)
  const handle = () => { setOn(!on); onChange?.(!on) }
  return (
    <button
      onClick={handle}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${on ? 'bg-teal-500' : 'bg-slate-200'}`}
    >
      <span className={`absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white shadow transition-all duration-200 ${on ? 'left-[22px]' : 'left-[3px]'}`} />
    </button>
  )
}

function SettingsItem({ label, sub, subRed = false, right }) {
  return (
    <div className='flex items-center justify-between py-4 border-b border-slate-100 last:border-0'>
      <div className='flex-1 pr-4'>
        <div className='text-sm font-medium text-slate-700'>{label}</div>
        {sub && <div className={`text-xs mt-0.5 leading-relaxed ${subRed ? 'text-red-400' : 'text-slate-400'}`}>{sub}</div>}
      </div>
      <div className='shrink-0'>{right}</div>
    </div>
  )
}

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

function DeleteModal({ onClose, onConfirm }) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      <div className='absolute inset-0 bg-black/30 backdrop-blur-sm' onClick={onClose} />
      <div className='relative bg-white border border-slate-100 rounded-2xl p-6 w-full max-w-sm shadow-2xl shadow-slate-200'>
        <button onClick={onClose} className='absolute top-4 right-4 text-slate-300 hover:text-slate-500'>
          <LuX size={18} />
        </button>
        <div className='flex items-center gap-3 mb-4'>
          <div className='w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center'>
            <LuTriangleAlert size={18} className='text-red-400' />
          </div>
          <div>
            <div className='font-semibold text-slate-800'>Hapus semua data?</div>
            <div className='text-xs text-slate-400 mt-0.5'>Tindakan ini tidak bisa dibatalkan</div>
          </div>
        </div>
        <p className='text-sm text-slate-500 leading-relaxed mb-5'>
          Seluruh riwayat log, analisis AI, dan pengaturan kamu akan dihapus permanen.
        </p>
        <div className='flex gap-3'>
          <button onClick={onClose} className='flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-500 text-sm hover:border-slate-300 transition-all'>
            Batal
          </button>
          <button onClick={onConfirm} className='flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-all'>
            Ya, hapus
          </button>
        </div>
      </div>
    </div>
  )
}

function PasswordModal({ onClose }) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      <div className='absolute inset-0 bg-black/30 backdrop-blur-sm' onClick={onClose} />
      <div className='relative bg-white border border-slate-100 rounded-2xl p-6 w-full max-w-sm shadow-2xl shadow-slate-200'>
        <button onClick={onClose} className='absolute top-4 right-4 text-slate-300 hover:text-slate-500'>
          <LuX size={18} />
        </button>
        <div className='font-semibold text-slate-800 mb-4'>Ubah Password</div>
        <div className='space-y-3 mb-5'>
          {['Password lama', 'Password baru', 'Konfirmasi password baru'].map((label) => (
            <div key={label}>
              <label className='text-xs text-slate-400 mb-1 block'>{label}</label>
              <input
                type='password'
                placeholder='••••••••'
                className='w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-50 transition-all'
              />
            </div>
          ))}
        </div>
        <div className='flex gap-3'>
          <button onClick={onClose} className='flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-500 text-sm hover:border-slate-300 transition-all'>
            Batal
          </button>
          <button onClick={onClose} className='flex-1 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold transition-all'>
            Simpan
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Settings() {
  const [showDelete, setShowDelete] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [reminderHour, setReminderHour] = useState('20:00')
  const [lang, setLang] = useState('Indonesia')

  return (
    <MainLayout title='Pengaturan'>
      {showDelete && <DeleteModal onClose={() => setShowDelete(false)} onConfirm={() => setShowDelete(false)} />}
      {showPassword && <PasswordModal onClose={() => setShowPassword(false)} />}

      <div className='max-w-2xl mx-auto'>

        {/* Notifikasi */}
        <SectionCard title='NOTIFIKASI' icon={LuBell}>
          <SettingsItem label='Pengingat input harian' sub='Ingatkan untuk isi log setiap hari' right={<Toggle defaultOn />} />
          <SettingsItem
            label='Jam pengingat'
            sub={`${reminderHour} — sebelum tidur`}
            right={
              <select value={reminderHour} onChange={(e) => setReminderHour(e.target.value)}
                className='bg-slate-50 border border-slate-200 text-slate-600 text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-teal-400 transition-all'>
                {['18:00', '19:00', '20:00', '21:00', '22:00'].map((h) => <option key={h}>{h}</option>)}
              </select>
            }
          />
          <SettingsItem label='Alert stress tinggi' sub='Notif jika stress mencapai level 3–4' right={<Toggle defaultOn />} />
          <SettingsItem label='Ringkasan mingguan' sub='Laporan performa setiap Minggu pagi' right={<Toggle defaultOn />} />
        </SectionCard>

        {/* Privasi & Data */}
        <SectionCard title='PRIVASI & DATA' icon={LuShield}>
          <SettingsItem label='Data anonim untuk riset' sub='Bantu tingkatkan akurasi model AI kami' right={<Toggle />} />
          <SettingsItem
            label='Export data saya'
            sub='Unduh semua log dalam format CSV'
            right={
              <button className='flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 hover:border-teal-400 hover:text-teal-500 transition-all'>
                <LuDownload size={12} />Export
              </button>
            }
          />
          <SettingsItem
            label='Hapus semua data' sub='Tindakan ini tidak bisa dibatalkan' subRed
            right={
              <button onClick={() => setShowDelete(true)} className='flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-400 hover:bg-red-50 transition-all'>
                <LuTrash2 size={12} />Hapus
              </button>
            }
          />
        </SectionCard>

        {/* Tampilan */}
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

        {/* Akun */}
        <SectionCard title='AKUN' icon={LuLock}>
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
              <button className='flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-400 hover:bg-red-50 transition-all'>
                <LuLogOut size={12} />Logout
              </button>
            }
          />
        </SectionCard>

        <p className='text-center text-xs text-slate-300 pb-8'>
          StressTracker AI · v1.0.0
        </p>

      </div>
    </MainLayout>
  )
}
