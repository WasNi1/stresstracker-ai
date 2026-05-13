import api from './axios'

/**
 * Ambil riwayat log kesehatan user
 * GET /api/riwayat
 * 
 * Query params:
 * - limit: jumlah data (default: 30)
 * - offset: pagination (default: 0)
 * - filter_stress: 'Rendah' | 'Sedang' | 'Tinggi' | 'Semua'
 *
 * Contoh response dari backend:
 * {
 *   success: true,
 *   data: {
 *     entries: [
 *       {
 *         id: 1,
 *         date: '01 Mei 2026',
 *         dateShort: '01/05',
 *         dayName: 'Kamis',
 *         stress: { level: 2, label: 'Sedang', color: 'amber' },
 *         sleep: { level: 3, label: 'Cukup', color: 'blue' },
 *         mood: { score: 7, color: 'teal' },
 *         details: {
 *           tidurJam: 7,
 *           kualitasTidur: '😊',
 *           anxiety: 2,
 *           energi: '⚡',
 *           screentime: 5,
 *           screenSebelumTidur: 25,
 *           bebanKerja: '😐',
 *           olahraga: true,
 *           jenisOlahraga: 'Lari',
 *           kafein: 2,
 *           airPutih: 2.5,
 *           deadline: false,
 *           meditasi: true,
 *         },
 *         rekomendasi: [
 *           '☕ Batasi kafein setelah jam 14.00 untuk jaga kualitas tidur.',
 *           '🧘 Pertahankan rutinitas meditasimu — sangat efektif turunkan kecemasan.',
 *         ],
 *       },
 *       ...
 *     ],
 *     stats: {
 *       avgStress: 2.1,
 *       totalLog: 25,
 *       streak: 7,
 *       logWeek: '6/7'
 *     }
 *   }
 * }
 *
 * Jika belum ada data:
 * {
 *   success: true,
 *   data: null
 * }
 */
export const getRiwayat = (params = {}) => {
  return api.get('/api/riwayat', { params })
}

/**
 * Ambil statistik riwayat kesehatan
 * GET /api/riwayat/stats
 */
export const getRiwayatStats = () => {
  return api.get('/api/riwayat/stats')
}

/**
 * Ambil data chart stress untuk riwayat
 * GET /api/riwayat/chart?periode=minggu
 */
export const getRiwayatChart = (periode = 'minggu') => {
  return api.get('/api/riwayat/chart', { params: { periode } })
}
