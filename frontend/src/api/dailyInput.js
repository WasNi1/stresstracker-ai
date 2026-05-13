import api from './axios'

/**
 * Submit input harian user
 *
 * Contoh payload yang dikirim ke backend:
 * {
 *   tidur: {
 *     durasi: 7,           // jam (number)
 *     kualitas: 3,         // index 0-4 (number)
 *     kebangunMalam: true, // boolean
 *     mimpiburuk: false,   // boolean
 *   },
 *   perasaan: {
 *     mood: 6,             // 1-10 (number)
 *     kecemasan: 2,        // 1-5 (number)
 *     energi: 3,           // index 0-4 (number)
 *     emosi: ['Senang', 'Tenang'], // array string
 *   },
 *   aktivitas: {
 *     olahraga: true,      // boolean
 *     jenisOlahraga: 'Lari',
 *     durasiOlahraga: 30,  // menit
 *     intensitas: 'Sedang',
 *     langkah: 6000,       // number
 *   },
 *   gayaHidup: {
 *     kafein: 2,           // gelas
 *     airPutih: 2.5,       // liter
 *     kualitasMakan: 3,    // 1-5
 *     alkohol: false,
 *     merokok: false,
 *   },
 *   gadgetKerja: {
 *     screentime: 7,       // jam
 *     screenSebelumTidur: 30, // menit
 *     bebanKerja: 2,       // index 0-4
 *     scrollingSosmed: true,
 *     lembur: false,
 *     deadline: true,
 *   },
 *   sosial: {
 *     interaksiSosial: 3,  // 1-5
 *     konflik: false,
 *     kesepian: false,
 *     meditasi: true,
 *     hobi: false,
 *     luarRuangan: 20,     // menit
 *   },
 *   tanggal: '2026-05-01', // ISO date string
 * }
 *
 * Contoh response dari backend:
 * {
 *   success: true,
 *   data: {
 *     id: 1,
 *     stressLevel: 'Sedang',
 *     stressScore: 2,
 *     prediksi: { ... }
 *   }
 * }
 */
export const submitInputHarian = (payload) => {
  return api.post('/api/input-harian', payload)
}

/**
 * Ambil input harian berdasarkan tanggal
 * GET /api/input-harian?tanggal=2026-05-01
 */
export const getInputHarian = (tanggal) => {
  return api.get('/api/input-harian', { params: { tanggal } })
}

/**
 * Ambil semua riwayat input harian user
 * GET /api/input-harian/riwayat
 */
export const getRiwayatInput = () => {
  return api.get('/api/input-harian/riwayat')
}
