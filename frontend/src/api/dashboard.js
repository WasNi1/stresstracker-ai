import api from './axios'

/**
 * Ambil data dashboard hari ini
 * GET /api/dashboard
 *
 * Contoh response dari backend:
 * {
 *   success: true,
 *   data: {
 *     stressLevel: 'Moderate',  // string label
 *     stressScore: 2,           // 1-4
 *     heartRate: '72 BPM',
 *     mood: 'Happy',
 *     waterIntake: '2L',
 *     tidur: {
 *       durasi: 7.5,
 *       kualitas: 'Baik',
 *       deep: '2.5j',
 *       light: '3.5j',
 *       rem: '1.5j',
 *     },
 *     aktivitas: [
 *       { label: 'Meditasi', value: '10 Menit', progress: 100, target: '10 mnt' },
 *       { label: 'Minum Air', value: '2 Liter', progress: 80, target: '2.5 L' },
 *     ],
 *     chart: [
 *       { day: 'Sen', value: 45, height: 90 },
 *       ...
 *     ],
 *     rekomendasi: [
 *       { text: 'Meditasi 10 menit sebelum tidur.' },
 *       ...
 *     ],
 *     tanggal: '2026-05-01',
 *   }
 * }
 *
 * Jika user belum input hari ini:
 * {
 *   success: true,
 *   data: null
 * }
 */
export const getDashboard = () => {
  return api.get('/api/dashboard')
}

/**
 * Ambil data chart stress mingguan
 * GET /api/dashboard/chart?periode=minggu
 */
export const getDashboardChart = (periode = 'minggu') => {
  return api.get('/api/dashboard/chart', { params: { periode } })
}
