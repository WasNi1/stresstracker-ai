import { createContext, useContext, useEffect, useState } from 'react'

const AppContext = createContext()

const translations = {
  id: {
    settings: 'Pengaturan',
    notifications: 'NOTIFIKASI',
    appearance: 'TAMPILAN',
    account: 'AKUN',
    darkMode: 'Tema gelap',
    darkModeSub: 'Aktif secara default',
    language: 'Bahasa',
    languageSub: 'Bahasa tampilan aplikasi',
    dailyReminder: 'Pengingat input harian',
    dailyReminderSub: 'Ingatkan untuk isi log setiap hari',
    reminderTime: 'Jam pengingat',
    changePassword: 'Ubah password',
    changePasswordSub: 'Ganti password akun kamu',
    logout: 'Keluar dari akun',
    logoutSub: 'Sesi kamu akan diakhiri',
    cancel: 'Batal',
    save: 'Simpan',
    deleteTitle: 'Hapus semua data?',
    deleteSub: 'Tindakan ini tidak bisa dibatalkan',
    deleteDesc: 'Seluruh riwayat log, analisis AI, dan pengaturan kamu akan dihapus permanen.',
    yesDelete: 'Ya, hapus',
    oldPassword: 'Password lama',
    newPassword: 'Password baru',
    confirmPassword: 'Konfirmasi password baru',
  },

  en: {
    settings: 'Settings',
    notifications: 'NOTIFICATIONS',
    appearance: 'APPEARANCE',
    account: 'ACCOUNT',
    darkMode: 'Dark mode',
    darkModeSub: 'Enable by default',
    language: 'Language',
    languageSub: 'Application display language',
    dailyReminder: 'Daily reminder',
    dailyReminderSub: 'Remind me to fill daily log',
    reminderTime: 'Reminder time',
    changePassword: 'Change password',
    changePasswordSub: 'Change your account password',
    logout: 'Logout',
    logoutSub: 'Your session will end',
    cancel: 'Cancel',
    save: 'Save',
    deleteTitle: 'Delete all data?',
    deleteSub: 'This action cannot be undone',
    deleteDesc: 'All logs, AI analysis, and your settings will be permanently deleted.',
    yesDelete: 'Yes, delete',
    oldPassword: 'Old password',
    newPassword: 'New password',
    confirmPassword: 'Confirm new password',
  },
}

function getUserFromStorage() {
  try {
    const raw = localStorage.getItem('user')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'id')
  const [user, setUser] = useState(getUserFromStorage)

  const updateUser = (data) => {
    setUser(data)
    if (data) localStorage.setItem('user', JSON.stringify(data))
    else localStorage.removeItem('user')
  }

  useEffect(() => {
    localStorage.setItem('theme', theme)

    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const t = translations[language]

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        language,
        setLanguage,
        t,
        user,
        updateUser,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}