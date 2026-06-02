export async function getBrowserFcmToken() {
  if (!('Notification' in window)) {
    return {
      token: null,
      message: 'Browser ini belum mendukung notifikasi.',
    }
  }

  const permission = await Notification.requestPermission()

  if (permission !== 'granted') {
    return {
      token: null,
      message: 'Izin notifikasi belum diberikan.',
    }
  }

  const storedToken = localStorage.getItem('fcmToken')

  if (storedToken) {
    return {
      token: storedToken,
      message: 'Push notification aktif dan FCM token siap dikirim ke backend.',
    }
  }

  return {
    token: null,
    message: 'Izin notifikasi aktif. Hubungkan Firebase SDK untuk mendapatkan FCM token lalu simpan ke localStorage fcmToken atau kirim langsung ke endpoint.',
  }
}
