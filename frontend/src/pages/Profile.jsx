import { useState } from 'react'
import {
  LuMail,
  LuCalendar,
  LuPencil,
} from 'react-icons/lu'
import MainLayout from '../layouts/MainLayout'

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

  return (
    <MainLayout title='Profil'>
      <div className='max-w-2xl mx-auto space-y-4'>

        {/* Avatar + Info */}
        <div className='bg-white border border-slate-100 rounded-2xl p-6 shadow-sm'>
          <div className='flex items-start gap-5'>
            <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-2xl font-bold text-white shrink-0 shadow-md shadow-teal-100'>
              N
            </div>
            <div className='flex-1 min-w-0'>
              <div className='flex items-center justify-between'>
                <div>
                  <h2 className='text-xl font-semibold text-slate-800'>Nova Wijaya</h2>
                  <p className='text-sm text-slate-400 mt-0.5'>Mahasiswa · 22 tahun · Laki-laki</p>
                </div>
                <button
                  onClick={() => setEditOpen(!editOpen)}
                  className='flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 hover:border-teal-400 hover:text-teal-500 transition-all'
                >
                  <LuPencil size={12} />
                  Edit
                </button>
              </div>
              <div className='flex items-center gap-1.5 mt-2 text-xs text-slate-400'>
                <LuMail size={12} />
                nova@email.com
              </div>
              <div className='flex items-center gap-1.5 mt-1 text-xs text-slate-400'>
                <LuCalendar size={12} />
                Bergabung April 2026
              </div>
            </div>
          </div>

          {editOpen && (
            <div className='mt-5 pt-5 border-t border-slate-100 grid grid-cols-2 gap-3'>
              {[
                { label: 'Nama lengkap', placeholder: 'Nova Wijaya' },
                { label: 'Email',        placeholder: 'nova@email.com' },
                { label: 'Usia',         placeholder: '22' },
                { label: 'Pekerjaan',    placeholder: 'Mahasiswa' },
              ].map((f) => (
                <div key={f.label}>
                  <label className='text-xs text-slate-400 mb-1 block'>{f.label}</label>
                  <input
                    type='text'
                    placeholder={f.placeholder}
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

          <div className='grid grid-cols-4 gap-3 mt-5 pt-5 border-t border-slate-100'>
            {[
              { num: '42',  label: 'Total log' },
              { num: '7',   label: 'Streak hari' },
              { num: '2.1', label: 'Avg stress' },
              { num: '7.3', label: 'Avg tidur' },
            ].map((s) => (
              <div key={s.label} className='text-center'>
                <div className='text-xl font-bold text-teal-500'>{s.num}</div>
                <div className='text-xs text-slate-400 mt-0.5'>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Fisik + Pencapaian */}
        <div className='grid md:grid-cols-2 gap-4'>
          <SectionCard title='DATA FISIK'>
            <DataRow label='Tinggi badan' value='170 cm' />
            <DataRow label='Berat badan' value='65 kg' />
            <DataRow label='BMI' value={<span className='text-teal-500'>22.5 (Normal)</span>} />
            <DataRow label='Level aktivitas' value={<Tag color='green'>Sedang</Tag>} last />
          </SectionCard>

          <SectionCard title='PENCAPAIAN'>
            <div className='py-2 space-y-4'>
              {achievements.map((a) => (
                <div key={a.title} className='flex items-center gap-3'>
                  <div className={`w-2 h-2 rounded-full shrink-0 ${a.dot}`} />
                  <div>
                    <div className='text-sm font-medium text-slate-700'>{a.emoji} {a.title}</div>
                    <div className='text-xs text-slate-400 mt-0.5'>{a.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

      </div>
    </MainLayout>
  )
}
