import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LuMail, LuCalendar, LuPencil,
  LuBell, LuPalette, LuLock,
  LuLogOut, LuChevronRight,
  LuTriangleAlert, LuX, LuCheck, LuEye, LuEyeOff,
} from 'react-icons/lu'
import MainLayout from '../layouts/MainLayout'
import { useApp } from '../context/AppContext'
import { changePassword, getLoggedUser, logoutUser, updateProfile } from '../api/auth'
import { saveFcmToken, updateReminder } from '../api/notification'
import { calculateCheckinStats, fetchCheckinEntries, getCachedCheckinEntries } from '../utils/checkinData'
import { getBrowserFcmToken } from '../utils/fcmNotification'

function Toggle({ defaultOn = false, checked, onChange, disabled = false }) {
  const [internalOn, setInternalOn] = useState(defaultOn)
  const isControlled = checked !== undefined
  const on = isControlled ? checked : internalOn

  const handle = () => {
    if (disabled) return
    const next = !on
    if (!isControlled) setInternalOn(next)
    onChange?.(next)
  }

  return (
    <button
      type='button'
      onClick={handle}
      disabled={disabled}
      aria-pressed={on}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed ${on ? 'bg-teal-500' : 'bg-slate-200'}`}
    >
      <span className={`absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white shadow transition-all duration-200 ${on ? 'left-[22px]' : 'left-[3px]'}`} />
    </button>
  )
}

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

function getLogStatsFromStorage() {
  try {
    const raw = localStorage.getItem('riwayat_harian')
    const data = raw ? JSON.parse(raw) : []
    const list = Array.isArray(data) ? data : []

    const uniqueDates = [
      ...new Set(list.map((item) => item?.tanggal).filter(Boolean)),
    ].sort()

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

function DeleteModal({ onClose, onConfirm }) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      <div className='absolute inset-0 bg-black/30 backdrop-blur-sm' onClick={onClose} />
      <div className='relative bg-white border border-slate-100 rounded-2xl p-6 w-full max-w-sm shadow-2xl'>
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
          Seluruh riwayat log, analisis, dan pengaturan kamu akan dihapus permanen.
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

function LogoutModal({ onClose, onConfirm }) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      <div className='absolute inset-0 bg-black/30 backdrop-blur-sm' onClick={onClose} />
      <div className='relative bg-white border border-slate-100 rounded-2xl p-6 w-full max-w-sm shadow-2xl'>
        <button onClick={onClose} className='absolute top-4 right-4 text-slate-300 hover:text-slate-500'>
          <LuX size={18} />
        </button>

        <div className='flex items-center gap-3 mb-4'>
          <div className='w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center'>
            <LuLogOut size={20} className='text-red-500' />
          </div>
          <div>
            <div className='font-semibold text-slate-800'>Keluar dari akun?</div>
            <div className='text-xs text-slate-400'>Pastikan kamu memang ingin logout</div>
          </div>
        </div>

        <p className='text-sm text-slate-500 leading-relaxed mb-5'>
          Kamu akan keluar dari sesi saat ini dan perlu login kembali untuk masuk ke aplikasi.
        </p>

        <div className='flex gap-3'>
          <button onClick={onClose} className='flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-500 text-sm hover:border-slate-300 transition-all'>
            Batal
          </button>
          <button onClick={onConfirm} className='flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-all'>
            Ya, logout
          </button>
        </div>
      </div>
    </div>
  )
}


function PasswordModal({ onClose }) {
  const [form, setForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [visiblePasswords, setVisiblePasswords] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const passwordFields = [
    { key: 'oldPassword', label: 'Password lama' },
    { key: 'newPassword', label: 'Password baru' },
    { key: 'confirmPassword', label: 'Konfirmasi password baru' },
  ]

  const togglePassword = (key) => {
    setVisiblePasswords((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const setField = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }))
    setError('')
    setSuccess('')
  }

  const handleSubmit = async () => {
    setError('')
    setSuccess('')

    if (!form.oldPassword) {
      setError('Password lama wajib diisi')
      return
    }

    if (!form.newPassword || form.newPassword.length < 6) {
      setError('Password baru minimal 6 karakter')
      return
    }

    if (form.newPassword !== form.confirmPassword) {
      setError('Konfirmasi password baru tidak sama')
      return
    }

    try {
      setLoading(true)
      const response = await changePassword({
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      })
      setSuccess(response.data?.message || 'Password berhasil diperbarui!')
      setForm({ oldPassword: '', newPassword: '', confirmPassword: '' })
      setTimeout(onClose, 900)
    } catch (err) {
      setError(err.response?.data?.message || 'Password gagal diperbarui. Periksa password lama kamu.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      <div className='absolute inset-0 bg-black/30 backdrop-blur-sm' onClick={loading ? undefined : onClose} />
      <div className='relative bg-white border border-slate-100 rounded-2xl p-6 w-full max-w-sm shadow-2xl'>
        <button onClick={onClose} disabled={loading} className='absolute top-4 right-4 text-slate-300 hover:text-slate-500 disabled:opacity-50'>
          <LuX size={18} />
        </button>

        <div className='font-semibold text-slate-800 mb-4'>Ubah Password</div>

        {error && (
          <div className='mb-4 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-600'>
            {error}
          </div>
        )}

        {success && (
          <div className='mb-4 rounded-xl border border-teal-100 bg-teal-50 px-3 py-2 text-xs text-teal-600'>
            {success}
          </div>
        )}

        <div className='space-y-3 mb-5'>
          {passwordFields.map((field) => (
            <div key={field.key}>
              <label className='text-xs text-slate-400 mb-1 block'>{field.label}</label>
              <div className='flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus-within:border-teal-400 transition-all'>
                <input
                  type={visiblePasswords[field.key] ? 'text' : 'password'}
                  value={form[field.key]}
                  onChange={setField(field.key)}
                  disabled={loading}
                  placeholder='••••••••'
                  className='w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-300 disabled:opacity-50'
                />
                <button
                  type='button'
                  onClick={() => togglePassword(field.key)}
                  disabled={loading}
                  className='text-slate-300 hover:text-teal-500 transition-colors disabled:opacity-50'
                  aria-label={visiblePasswords[field.key] ? `Sembunyikan ${field.label}` : `Tampilkan ${field.label}`}
                >
                  {visiblePasswords[field.key] ? <LuEyeOff size={16} /> : <LuEye size={16} />}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className='flex gap-3'>
          <button onClick={onClose} disabled={loading} className='flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-500 text-sm transition-all disabled:opacity-50'>
            Batal
          </button>
          <button onClick={handleSubmit} disabled={loading} className='flex-1 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold transition-all disabled:bg-slate-300 disabled:cursor-not-allowed'>
            {loading ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>
      </div>
    </div>
  )
}


const pekerjaanOptions = [
  'Dokter',
  'Freelancer',
  'Guru',
  'Irt',
  'Karyawan',
  'Mahasiswa',
  'Wirausaha',
]

export default function Akun() {
  const navigate = useNavigate()
  const { user, updateUser } = useApp()

  const [editOpen, setEditOpen] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showLogout, setShowLogout] = useState(false)
  const [saveOk, setSaveOk] = useState(false)
  const [saveError, setSaveError] = useState('')

  const [reminderEnabled, setReminderEnabled] = useState(
    () => localStorage.getItem('pengingat_input_harian') !== 'false'
  )
  const [reminderHour, setReminderHour] = useState(
    () => localStorage.getItem('jam_pengingat_input') || '20:00'
  )
  const [notificationLoading, setNotificationLoading] = useState(false)
  const [notificationStatus, setNotificationStatus] = useState('')
  const [notificationError, setNotificationError] = useState('')

  const [logStats, setLogStats] = useState(() => calculateCheckinStats(getCachedCheckinEntries()))
  const [lang, setLang] = useState('Indonesia')

  const displayName = user?.fullname || user?.name || user?.nama || null
  const displayUsername = user?.username || null
  const displayEmail = user?.email || null
  const displayBirthDate = user?.birthDate || user?.birth_date || user?.tanggal_lahir || null
  const displayAge = user?.age || user?.usia || null
  const displayGender = user?.gender || user?.jenisKelamin || user?.jenis_kelamin || null
  const displayJob = user?.job || user?.pekerjaan || null

  const avatarInitial = displayName ? displayName.charAt(0).toUpperCase() : 'G'
  const subParts = [
    displayJob,
    displayBirthDate ? `Lahir ${new Date(displayBirthDate).toLocaleDateString('id-ID')}` : displayAge ? `${displayAge} tahun` : null,
    displayGender,
  ].filter(Boolean)

  const [form, setForm] = useState({
    fullname: displayName ?? '',
    username: displayUsername ?? '',
    email: displayEmail ?? '',
    birthDate: displayBirthDate ?? '',
    pekerjaan: displayJob ?? '',
  })

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('accessToken') || localStorage.getItem('token')
      if (!token) return

      try {
        const response = await getLoggedUser()
        const loggedUser = response.data?.data?.user
        if (!loggedUser) return

        updateUser({
          ...loggedUser,
          name: loggedUser.fullname,
          nama: loggedUser.fullname,
          username: loggedUser.username,
          birthDate: loggedUser.birthDate,
          birth_date: loggedUser.birthDate,
          gender: loggedUser.jenisKelamin,
          jenis_kelamin: loggedUser.jenisKelamin,
          job: loggedUser.pekerjaan,
          pekerjaan: loggedUser.pekerjaan,
        })
        setForm((prev) => ({
          ...prev,
          fullname: loggedUser.fullname ?? prev.fullname,
          username: loggedUser.username ?? prev.username,
          email: loggedUser.email ?? prev.email,
          birthDate: loggedUser.birthDate ?? prev.birthDate,
          pekerjaan: loggedUser.pekerjaan ?? prev.pekerjaan,
        }))
      } catch {
        // Profil tetap memakai data localStorage jika /me belum bisa diakses.
      }
    }

    fetchProfile()
  }, [])

  useEffect(() => {
    localStorage.setItem('pengingat_input_harian', String(reminderEnabled))
  }, [reminderEnabled])

  useEffect(() => {
    localStorage.setItem('jam_pengingat_input', reminderHour)
  }, [reminderHour])

  useEffect(() => {
    const refreshStats = async () => {
      try {
        const entries = await fetchCheckinEntries()
        setLogStats(calculateCheckinStats(entries))
      } catch {
        setLogStats(calculateCheckinStats(getCachedCheckinEntries()))
      }
    }

    refreshStats()
    window.addEventListener('storage', refreshStats)
    window.addEventListener('focus', refreshStats)

    return () => {
      window.removeEventListener('storage', refreshStats)
      window.removeEventListener('focus', refreshStats)
    }
  }, [])

  const handleReminderToggle = async (next) => {
    setNotificationStatus('')
    setNotificationError('')
    setReminderEnabled(next)
    localStorage.setItem('pengingat_input_harian', String(next))

    if (!next) {
      setNotificationStatus('Pengingat input harian dimatikan di perangkat ini.')
      return
    }

    try {
      setNotificationLoading(true)

      await updateReminder(reminderHour)

      const result = await getBrowserFcmToken()
      if (result.token) {
        await saveFcmToken(result.token)
        localStorage.setItem('fcmToken', result.token)
      }

      setNotificationStatus(result.message || `Pengingat berhasil diatur untuk jam ${reminderHour}.`)
    } catch (error) {
      setNotificationError(error.response?.data?.message || 'Pengingat gagal disimpan. Coba lagi.')
    } finally {
      setNotificationLoading(false)
    }
  }

  const handleReminderTimeChange = async (value) => {
    setReminderHour(value)
    localStorage.setItem('jam_pengingat_input', value)
    setNotificationStatus('')
    setNotificationError('')

    if (!reminderEnabled) return

    try {
      setNotificationLoading(true)
      const response = await updateReminder(value)
      setNotificationStatus(response.data?.message || `Pengingat berhasil diatur untuk jam ${value}.`)
    } catch (error) {
      setNotificationError(error.response?.data?.message || 'Jam pengingat gagal disimpan. Coba lagi.')
    } finally {
      setNotificationLoading(false)
    }
  }

  const handleSave = async () => {
    setSaveError('')

    if (!form.fullname.trim()) {
      setSaveError('Nama lengkap wajib diisi')
      return
    }

    if (!form.username.trim()) {
      setSaveError('Username wajib diisi')
      return
    }

    if (!form.birthDate) {
      setSaveError('Tanggal lahir wajib diisi')
      return
    }

    if (!form.pekerjaan) {
      setSaveError('Pekerjaan wajib dipilih')
      return
    }

    const payload = {
      fullname: form.fullname.trim(),
      username: form.username.trim(),
      birthDate: form.birthDate,
      pekerjaan: form.pekerjaan,
    }

    try {
      await updateProfile(payload)

      const updated = {
        ...user,
        ...payload,
        name: payload.fullname,
        nama: payload.fullname,
        birth_date: payload.birthDate,
        job: payload.pekerjaan,
        pekerjaan: payload.pekerjaan,
        email: displayEmail,
      }

      updateUser(updated)
      setEditOpen(false)
      setSaveOk(true)
      setTimeout(() => setSaveOk(false), 2500)
    } catch (error) {
      setSaveError(error.response?.data?.message || 'Profil gagal diperbarui. Coba lagi.')
    }
  }

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem('refreshToken')

    try {
      if (refreshToken) {
        await logoutUser(refreshToken)
      }
    } catch {
      // Tetap logout lokal walaupun request logout ke backend gagal.
    } finally {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
      updateUser(null)
      setShowLogout(false)
      navigate('/')
    }
  }

  return (
    <MainLayout title='Akun'>
      {showDelete && (
        <DeleteModal
          onClose={() => setShowDelete(false)}
          onConfirm={() => {
            localStorage.clear()
            navigate('/')
          }}
        />
      )}

      {showPassword && <PasswordModal onClose={() => setShowPassword(false)} />}

      {showLogout && (
        <LogoutModal
          onClose={() => setShowLogout(false)}
          onConfirm={handleLogout}
        />
      )}

      <div className='max-w-2xl mx-auto pb-8'>

        <SectionCard title='PROFIL' icon={LuPencil}>
          <div className='py-5'>
            <div className='flex items-start gap-4'>
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
                    : <span className='italic text-slate-300'>Belum ada data profil</span>}
                </p>

                <div className='flex items-center gap-1.5 mt-1.5 text-xs text-slate-400'>
                  <LuMail size={11} />
                  {displayEmail
                    ? <span>{displayEmail}</span>
                    : <span className='italic text-slate-300'>Email belum diisi</span>}
                </div>

                {user?.created_at && (
                  <div className='flex items-center gap-1.5 mt-1 text-xs text-slate-400'>
                    <LuCalendar size={11} />
                    Bergabung {new Date(user.created_at).toLocaleDateString('id-ID', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  setSaveError('')
                  setForm({
                    fullname: displayName ?? '',
                    username: displayUsername ?? '',
                    email: displayEmail ?? '',
                    birthDate: displayBirthDate ?? '',
                    pekerjaan: displayJob ?? '',
                  })
                  setEditOpen(!editOpen)
                }}
                className='flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 hover:border-teal-400 hover:text-teal-500 transition-all shrink-0'
              >
                <LuPencil size={11} />
                Edit
              </button>
            </div>

            {editOpen && (
              <div className='mt-5 pt-5 border-t border-slate-100 grid grid-cols-1 gap-4 sm:grid-cols-2'>
                {saveError && (
                  <div className='sm:col-span-2 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-600'>
                    {saveError}
                  </div>
                )}

                {[
                  { label: 'Nama lengkap', key: 'fullname', placeholder: 'Contoh: Budi Santoso', type: 'text' },
                  { label: 'Username', key: 'username', placeholder: 'Contoh: budisantoso', type: 'text' },
                  { label: 'Tanggal lahir', key: 'birthDate', placeholder: '', type: 'date' },
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

                <div>
                  <label className='text-xs text-slate-400 mb-1 block'>Email</label>
                  <input
                    type='email'
                    value={form.email}
                    readOnly
                    disabled
                    className='w-full bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-400 cursor-not-allowed'
                  />
                  <p className='text-[11px] text-slate-400 mt-1'>Email tidak dapat diubah dari halaman ini.</p>
                </div>

                <div>
                  <label className='text-xs text-slate-400 mb-1 block'>Pekerjaan</label>
                  <select
                    value={form.pekerjaan}
                    onChange={(e) => setForm((prev) => ({ ...prev, pekerjaan: e.target.value }))}
                    className='w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-teal-400 transition-all'
                  >
                    <option value=''>Pilih pekerjaan</option>
                    {pekerjaanOptions.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>

                <div className='sm:col-span-2 flex flex-col-reverse gap-2 mt-2 sm:flex-row sm:justify-end'>
                  <button
                    onClick={() => { setEditOpen(false); setSaveError('') }}
                    className='w-full sm:w-auto text-xs px-4 py-2 rounded-lg border border-slate-200 text-slate-500 hover:border-slate-300 transition-all'
                  >
                    Batal
                  </button>

                  <button
                    onClick={handleSave}
                    className='w-full sm:w-auto text-xs px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-600 text-white font-semibold transition-all flex items-center justify-center gap-1.5'
                  >
                    {saveOk ? <><LuCheck size={12} />Tersimpan</> : 'Simpan'}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className='grid grid-cols-2 gap-3 pb-5 pt-1 border-t border-slate-100'>
            {[
              { num: logStats.totalLog, label: 'Total log' },
              { num: logStats.streak, label: 'Streak hari' },
            ].map((s) => (
              <div key={s.label} className='text-center py-2'>
                <div className='text-xl font-bold text-teal-500'>{s.num}</div>
                <div className='text-xs text-slate-400 mt-0.5'>{s.label}</div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title='NOTIFIKASI' icon={LuBell}>
          {notificationError && (
            <div className='mt-4 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-600'>
              {notificationError}
            </div>
          )}

          {notificationStatus && (
            <div className='mt-4 rounded-xl border border-teal-100 bg-teal-50 px-3 py-2 text-xs text-teal-600'>
              {notificationStatus}
            </div>
          )}

          <SettingsItem
            label='Pengingat input harian'
            sub='Aktifkan push notification untuk mengingatkan check-in harian'
            right={
              <Toggle
                checked={reminderEnabled}
                onChange={handleReminderToggle}
                disabled={notificationLoading}
              />
            }
          />

          <SettingsItem
            label='Jam pengingat'
            sub={reminderEnabled ? `${reminderHour} — akan disimpan ke backend` : 'Pengingat input harian sedang mati'}
            right={
              <input
                type='time'
                value={reminderHour}
                disabled={!reminderEnabled || notificationLoading}
                onChange={(e) => handleReminderTimeChange(e.target.value)}
                className={`bg-slate-50 border border-slate-200 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-teal-400 transition-all ${
                  reminderEnabled
                    ? 'text-slate-600'
                    : 'text-slate-300 cursor-not-allowed opacity-60'
                }`}
              />
            }
          />

          <div className='py-3 text-[11px] leading-relaxed text-slate-400'>
            {notificationLoading
              ? 'Menyimpan pengaturan notifikasi...'
              : 'Saat pengingat aktif, aplikasi akan menyimpan jam pengingat dan FCM token ke backend.'}
          </div>
        </SectionCard>

        <SectionCard title='TAMPILAN' icon={LuPalette}>
          <SettingsItem label='Tema gelap' sub='Aktif secara default' right={<Toggle defaultOn />} />

          <SettingsItem
            label='Bahasa'
            sub='Bahasa tampilan aplikasi'
            right={
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className='bg-slate-50 border border-slate-200 text-slate-600 text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-teal-400 transition-all'
              >
                <option>Indonesia</option>
                <option>English</option>
              </select>
            }
          />
        </SectionCard>

        <SectionCard title='KEAMANAN & AKUN' icon={LuLock}>
          <SettingsItem
            label='Ubah password'
            sub='Ganti password akun kamu'
            right={
              <button
                onClick={() => setShowPassword(true)}
                className='flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 hover:border-teal-400 hover:text-teal-500 transition-all'
              >
                Ubah<LuChevronRight size={12} />
              </button>
            }
          />

          <SettingsItem
            label='Keluar dari akun'
            sub='Sesi kamu akan diakhiri'
            right={
              <button
                onClick={() => setShowLogout(true)}
                className='flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-400 hover:bg-red-50 transition-all'
              >
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