import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LuMoon, LuSun, LuLeaf, LuSmartphone, LuBriefcase,
  LuHeart, LuUsers, LuSave,
} from 'react-icons/lu'
import MainLayout from '../layouts/MainLayout'

/* ─────────────────────────────────
   Util: hitung menit tidur
─────────────────────────────────── */
function hitungDurasiTidur(mulai, bangun) {
  if (!mulai || !bangun) return null
  const [hm, mm] = mulai.split(':').map(Number)
  const [hb, mb] = bangun.split(':').map(Number)
  let menit = (hb * 60 + mb) - (hm * 60 + mm)
  if (menit < 0) menit += 1440 // tidur melewati tengah malam
  return menit
}

function menitKeJam(menit) {
  if (menit === null) return '-'
  const j = Math.floor(menit / 60)
  const m = menit % 60
  return `${j} jam ${m} menit`
}

/* ─────────────────────────────────
   Hitung stress level (1=Rendah, 2=Sedang, 3=Tinggi)
─────────────────────────────────── */
function hitungStress(d) {
  let skor = 0
  if (d.durasi_tidur_menit !== null) {
    if (d.durasi_tidur_menit < 300) skor += 3
    else if (d.durasi_tidur_menit < 360) skor += 2
    else if (d.durasi_tidur_menit < 420) skor += 1
  }
  if (d.sering_terbangun_malam === 'Ya') skor += 1
  if (d.mimpi_buruk === 'Ya') skor += 1
  if (d.screen_sebelum_tidur > 60) skor += 1
  if (d.minum_kopi_hari_ini === 'Ya') skor += 1
  if (d.merokok === 'Ya') skor += 1
  if (d.konsumsi_alkohol === 'Ya') skor += 1
  if (d.waktu_outdoor < 20) skor += 1
  else if (d.waktu_outdoor > 60) skor -= 1
  if (d.deadline_hari_ini === 'Ya') skor += 1
  if (d.lembur === 'Ya') skor += 1
  if (d.aktivitas_hobi === 'Ya') skor -= 1
  if (d.suasana_hati === 'Negatif') skor += 2
  else if (d.suasana_hati === 'Campur') skor += 1
  else if (d.suasana_hati === 'Positif') skor -= 1
  if (d.konflik_interpersonal === 'Ya') skor += 2
  if (d.merasa_kesepian === 'Ya') skor += 1
  if (d.meditasi === 'Ya') skor -= 1
  // konsentrasi: rendah = stres lebih tinggi
  if (d.konsentrasi !== null) skor += Math.max(0, 3 - d.konsentrasi)
  // interaksi sosial: rendah = lebih stres
  if (d.interaksi_sosial !== null) skor += Math.max(0, 2 - d.interaksi_sosial)

  if (skor <= 3) return { label: 'Rendah', num: 1 }
  if (skor <= 7) return { label: 'Sedang', num: 2 }
  return { label: 'Tinggi', num: 3 }
}

/* ─────────────────────────────────
   Komponen UI kecil
─────────────────────────────────── */

function FieldLabel({ children, sub }) {
  return (
    <div className='mb-2'>
      <span className='text-sm font-medium text-slate-700'>{children}</span>
      {sub && <p className='text-xs text-slate-400 mt-0.5'>{sub}</p>}
    </div>
  )
}

function SectionHeader({ icon: Icon, title }) {
  return (
    <div className='flex items-center gap-2 mb-4 pt-2'>
      <div className='w-8 h-8 bg-teal-50 rounded-xl flex items-center justify-center'>
        <Icon size={15} className='text-teal-500' />
      </div>
      <h3 className='text-base font-semibold text-slate-800'>{title}</h3>
      <div className='flex-1 h-px bg-slate-100 ml-2' />
    </div>
  )
}

function YesNo({ value, onChange }) {
  return (
    <div className='flex gap-2'>
      {['Ya', 'Tidak'].map((opt) => (
        <button
          key={opt}
          type='button'
          onClick={() => onChange(opt)}
          className={`px-5 py-2 rounded-xl border text-sm font-medium transition-all ${
            value === opt
              ? opt === 'Ya'
                ? 'bg-teal-500 border-teal-500 text-white'
                : 'bg-slate-100 border-slate-300 text-slate-700'
              : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}

function ChipGroup({ options, value, onChange }) {
  return (
    <div className='flex flex-wrap gap-2'>
      {options.map((opt) => (
        <button
          key={opt}
          type='button'
          onClick={() => onChange(opt)}
          className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
            value === opt
              ? 'bg-teal-500 border-teal-500 text-white'
              : 'bg-white border-slate-200 text-slate-500 hover:border-teal-300'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}

function OrdinalRow({ min = 1, max = 5, value, onChange, leftLabel, rightLabel }) {
  return (
    <div>
      <div className='flex gap-2 mb-1.5'>
        {Array.from({ length: max - min + 1 }, (_, i) => i + min).map((n) => (
          <button
            key={n}
            type='button'
            onClick={() => onChange(n)}
            className={`w-11 h-11 rounded-xl border text-sm font-semibold transition-all ${
              value === n
                ? 'bg-teal-500 border-teal-500 text-white shadow shadow-teal-100'
                : 'bg-white border-slate-200 text-slate-500 hover:border-teal-300'
            }`}
          >
            {n}
          </button>
        ))}
      </div>
      <div className='flex justify-between text-xs text-slate-400'>
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
    </div>
  )
}

function SliderRow({ min, max, step = 1, value, onChange, unit }) {
  return (
    <div className='flex items-center gap-3'>
      <input
        type='range'
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className='flex-1 accent-teal-500 h-2'
      />
      <span className='font-mono font-semibold text-teal-500 min-w-[72px] text-right text-sm'>
        {value}{unit}
      </span>
    </div>
  )
}

/* ─────────────────────────────────
   INIT STATE
─────────────────────────────────── */
const INIT = {
  // Tidur
  jam_mulai_tidur: '',
  jam_bangun: '',
  // durasi_tidur_menit dihitung otomatis
  sering_terbangun_malam: null,
  mimpi_buruk: null,
  screen_sebelum_tidur: 30,
  // Konsumsi
  minum_kopi_hari_ini: null,
  merokok: null,
  konsumsi_alkohol: null,
  // Aktivitas
  waktu_outdoor: 30,
  deadline_hari_ini: null,
  lembur: null,
  aktivitas_hobi: null,
  // Mood
  suasana_hati: null,
  // Sosial
  konflik_interpersonal: null,
  merasa_kesepian: null,
  meditasi: null,
  // Ordinal
  konsentrasi: null,
  interaksi_sosial: null,
}

/* ─────────────────────────────────
   Main
─────────────────────────────────── */
function DailyInput() {
  const navigate = useNavigate()
  const [form, setForm] = useState(INIT)
  const [submitted, setSubmitted] = useState(false)

  const set = (key) => (val) => setForm((f) => ({ ...f, [key]: val }))

  const durasi = useMemo(
    () => hitungDurasiTidur(form.jam_mulai_tidur, form.jam_bangun),
    [form.jam_mulai_tidur, form.jam_bangun]
  )

  const handleSubmit = () => {
    const tanggal = new Date().toISOString().split('T')[0]
    const durasi_tidur_menit = durasi ?? 0
    const stress = hitungStress({ ...form, durasi_tidur_menit })
    const entry = {
      tanggal,
      stressLevel: stress.label,
      stressNum: stress.num,
      durasi_tidur_menit,
      ...form,
    }

    const raw = localStorage.getItem('riwayat_harian')
    const riwayat = raw ? JSON.parse(raw) : []
    const filtered = riwayat.filter((r) => r.tanggal !== tanggal)
    filtered.push(entry)
    filtered.sort((a, b) => a.tanggal.localeCompare(b.tanggal))
    localStorage.setItem('riwayat_harian', JSON.stringify(filtered.slice(-30)))

    navigate('/')
  }

  return (
    <MainLayout title='Input Harian'>
      <div className='max-w-2xl mx-auto pb-8'>

        {/* Header */}
        <div className='mb-6'>
          <h1 className='text-xl font-bold text-slate-800'>Input Harian</h1>
          <p className='text-sm text-slate-400 mt-1'>Isi data hari ini untuk melihat prediksi stress level kamu.</p>
        </div>

        <div className='space-y-2'>

          {/* ── TIDUR ── */}
          <div className='bg-white border border-slate-100 rounded-2xl p-5 shadow-sm'>
            <SectionHeader icon={LuMoon} title='Tidur' />

            <div className='grid grid-cols-2 gap-4 mb-4'>
              <div>
                <FieldLabel>Mulai tidur</FieldLabel>
                <input
                  type='time'
                  value={form.jam_mulai_tidur}
                  onChange={(e) => set('jam_mulai_tidur')(e.target.value)}
                  className='w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-teal-400 bg-slate-50'
                />
              </div>
              <div>
                <FieldLabel>Bangun tidur</FieldLabel>
                <input
                  type='time'
                  value={form.jam_bangun}
                  onChange={(e) => set('jam_bangun')(e.target.value)}
                  className='w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-teal-400 bg-slate-50'
                />
              </div>
            </div>

            {/* Durasi otomatis */}
            <div className={`rounded-xl px-4 py-3 mb-4 flex items-center justify-between ${durasi !== null ? 'bg-teal-50 border border-teal-100' : 'bg-slate-50 border border-slate-100'}`}>
              <span className='text-xs text-slate-500'>Durasi tidur (otomatis)</span>
              <span className={`text-sm font-semibold ${durasi !== null ? 'text-teal-600' : 'text-slate-400'}`}>
                {durasi !== null ? menitKeJam(durasi) : 'Isi jam tidur & bangun'}
              </span>
            </div>

            <div className='space-y-0 divide-y divide-slate-50'>
              <div className='flex justify-between items-center py-3'>
                <FieldLabel>Sering terbangun saat tidur malam?</FieldLabel>
                <YesNo value={form.sering_terbangun_malam} onChange={set('sering_terbangun_malam')} />
              </div>
              <div className='flex justify-between items-center py-3'>
                <FieldLabel>Mengalami mimpi buruk?</FieldLabel>
                <YesNo value={form.mimpi_buruk} onChange={set('mimpi_buruk')} />
              </div>
            </div>

            <div className='mt-3'>
              <FieldLabel sub='Durasi penggunaan layar (HP/laptop) sebelum tidur dalam menit'>
                Screen time sebelum tidur
              </FieldLabel>
              <SliderRow min={0} max={240} step={5} value={form.screen_sebelum_tidur} onChange={set('screen_sebelum_tidur')} unit=' mnt' />
            </div>
          </div>

          {/* ── KONSUMSI ── */}
          <div className='bg-white border border-slate-100 rounded-2xl p-5 shadow-sm'>
            <SectionHeader icon={LuLeaf} title='Konsumsi' />
            <div className='space-y-0 divide-y divide-slate-50'>
              <div className='flex justify-between items-center py-3'>
                <FieldLabel>Minum kopi hari ini?</FieldLabel>
                <YesNo value={form.minum_kopi_hari_ini} onChange={set('minum_kopi_hari_ini')} />
              </div>
              <div className='flex justify-between items-center py-3'>
                <FieldLabel>Merokok?</FieldLabel>
                <YesNo value={form.merokok} onChange={set('merokok')} />
              </div>
              <div className='flex justify-between items-center py-3'>
                <FieldLabel>Konsumsi alkohol hari ini?</FieldLabel>
                <YesNo value={form.konsumsi_alkohol} onChange={set('konsumsi_alkohol')} />
              </div>
            </div>
          </div>

          {/* ── AKTIVITAS & KERJA ── */}
          <div className='bg-white border border-slate-100 rounded-2xl p-5 shadow-sm'>
            <SectionHeader icon={LuBriefcase} title='Aktivitas & Kerja' />

            <div className='mb-4'>
              <FieldLabel sub='Durasi waktu di luar ruangan hari ini dalam menit'>
                Waktu outdoor
              </FieldLabel>
              <SliderRow min={0} max={480} step={10} value={form.waktu_outdoor} onChange={set('waktu_outdoor')} unit=' mnt' />
            </div>

            <div className='space-y-0 divide-y divide-slate-50'>
              <div className='flex justify-between items-center py-3'>
                <FieldLabel>Ada deadline pekerjaan / tugas hari ini?</FieldLabel>
                <YesNo value={form.deadline_hari_ini} onChange={set('deadline_hari_ini')} />
              </div>
              <div className='flex justify-between items-center py-3'>
                <FieldLabel>Bekerja melebihi jam normal (lembur)?</FieldLabel>
                <YesNo value={form.lembur} onChange={set('lembur')} />
              </div>
              <div className='flex justify-between items-center py-3'>
                <FieldLabel>Melakukan aktivitas hobi hari ini?</FieldLabel>
                <YesNo value={form.aktivitas_hobi} onChange={set('aktivitas_hobi')} />
              </div>
            </div>
          </div>

          {/* ── SUASANA HATI ── */}
          <div className='bg-white border border-slate-100 rounded-2xl p-5 shadow-sm'>
            <SectionHeader icon={LuHeart} title='Suasana Hati' />

            <div className='mb-5'>
              <FieldLabel sub='Kondisi suasana hati secara umum hari ini'>
                Suasana hati
              </FieldLabel>
              <ChipGroup
                options={['Positif', 'Negatif', 'Netral', 'Campur']}
                value={form.suasana_hati}
                onChange={set('suasana_hati')}
              />
            </div>

            <div>
              <FieldLabel sub='Tingkat konsentrasi yang dirasakan hari ini (self-report)'>
                Konsentrasi
              </FieldLabel>
              <OrdinalRow
                min={1} max={5}
                value={form.konsentrasi}
                onChange={set('konsentrasi')}
                leftLabel='Sangat rendah'
                rightLabel='Sangat tinggi'
              />
            </div>
          </div>

          {/* ── SOSIAL ── */}
          <div className='bg-white border border-slate-100 rounded-2xl p-5 shadow-sm'>
            <SectionHeader icon={LuUsers} title='Sosial & Relaksasi' />

            <div className='space-y-0 divide-y divide-slate-50 mb-4'>
              <div className='flex justify-between items-center py-3'>
                <FieldLabel>Terjadi konflik / pertengkaran dengan orang lain?</FieldLabel>
                <YesNo value={form.konflik_interpersonal} onChange={set('konflik_interpersonal')} />
              </div>
              <div className='flex justify-between items-center py-3'>
                <FieldLabel>Merasa kesepian hari ini?</FieldLabel>
                <YesNo value={form.merasa_kesepian} onChange={set('merasa_kesepian')} />
              </div>
              <div className='flex justify-between items-center py-3'>
                <FieldLabel>Melakukan meditasi hari ini?</FieldLabel>
                <YesNo value={form.meditasi} onChange={set('meditasi')} />
              </div>
            </div>

            <div>
              <FieldLabel sub='Tingkat interaksi sosial yang dilakukan hari ini (self-report)'>
                Interaksi sosial
              </FieldLabel>
              <OrdinalRow
                min={1} max={5}
                value={form.interaksi_sosial}
                onChange={set('interaksi_sosial')}
                leftLabel='Sangat sedikit'
                rightLabel='Sangat banyak'
              />
            </div>
          </div>

        </div>

        {/* Submit */}
        <div className='mt-6'>
          <button
            onClick={handleSubmit}
            className='w-full flex items-center justify-center gap-2 py-4 bg-teal-500 hover:bg-teal-400 active:scale-[0.98] text-white font-semibold rounded-2xl text-sm transition-all shadow-lg shadow-teal-100'
          >
            <LuSave size={16} />
            Simpan & Lihat Hasil
          </button>
          <p className='text-center text-xs text-slate-400 mt-3'>
            Data akan diproses model deep learning untuk memprediksi stress level kamu.
          </p>
        </div>

      </div>
    </MainLayout>
  )
}

export default DailyInput