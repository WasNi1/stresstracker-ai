import api from './axios'

/**
 * Ambil data chart tren harian (stress, mood, tidur)
 * GET /api/trend/chart
 *
 * Query params:
 * - periode: '7hari' | '20hari' | '30hari' (default: '20hari')
 *
 * Contoh response:
 * {
 *   success: true,
 *   data: {
 *     entries: [
 *       {
 *         day: '01/05',          // label sumbu X
 *         stress: 2,             // 1–4 (PSS)
 *         mood: 7,               // 1–10
 *         sleep: 3,              // 1–4 (PSQI)
 *         olahraga: true,        // untuk outline bar olahraga
 *       },
 *       ...
 *     ]
 *   }
 * }
 *
 * Jika belum ada data:
 * { success: true, data: null }
 */
export const getTrendChart = (params = {}) => {
  return api.get('/api/trend/chart', { params })
}

/**
 * Ambil rata-rata stress per hari dalam seminggu
 * GET /api/trend/per-hari
 *
 * Contoh response:
 * {
 *   success: true,
 *   data: [
 *     { hari: 'Sen', stress: 3.1, label: 'Senin'   },
 *     { hari: 'Sel', stress: 2.8, label: 'Selasa'  },
 *     { hari: 'Rab', stress: 2.5, label: 'Rabu'    },
 *     { hari: 'Kam', stress: 2.7, label: 'Kamis'   },
 *     { hari: 'Jum', stress: 3.0, label: 'Jumat'   },
 *     { hari: 'Sab', stress: 1.8, label: 'Sabtu'   },
 *     { hari: 'Min', stress: 2.0, label: 'Minggu'  },
 *   ]
 * }
 */
export const getTrendPerHari = () => {
  return api.get('/api/trend/per-hari')
}

/**
 * Ambil data korelasi kualitas tidur ↔ rata-rata stress
 * GET /api/trend/sleep-stress-corr
 *
 * Contoh response:
 * {
 *   success: true,
 *   data: {
 *     pearson: -0.72,            // koefisien korelasi Pearson
 *     entries: [
 *       { label: 'Sangat Buruk', stressAvg: 3.6, pct: 90 },
 *       { label: 'Buruk',        stressAvg: 2.9, pct: 65 },
 *       { label: 'Cukup',        stressAvg: 2.1, pct: 40 },
 *       { label: 'Sangat Baik',  stressAvg: 1.3, pct: 18 },
 *     ]
 *   }
 * }
 */
export const getSleepStressCorr = () => {
  return api.get('/api/trend/sleep-stress-corr')
}

/**
 * Ambil daftar faktor protektif & risiko berdasarkan data user
 * GET /api/trend/faktor
 *
 * Contoh response:
 * {
 *   success: true,
 *   data: [
 *     {
 *       iconKey: 'LuActivity',          // key untuk mapping icon di frontend
 *       label:   'Olahraga rutin',
 *       impact:  -0.8,                  // negatif = protektif, positif = risiko
 *       type:    'protektif',           // 'protektif' | 'risiko'
 *       desc:    '5/7 hari minggu ini',
 *     },
 *     {
 *       iconKey: 'LuSmartphone',
 *       label:   'Screen time sebelum tidur',
 *       impact:  +0.9,
 *       type:    'risiko',
 *       desc:    'Rata-rata 68 menit/malam',
 *     },
 *     ...
 *   ]
 * }
 *
 * iconKey yang tersedia di frontend:
 * LuActivity | LuMoon | LuDroplets | LuSmartphone | LuBrain | LuCoffee
 */
export const getFaktorData = () => {
  return api.get('/api/trend/faktor')
}

/**
 * Ambil AI insight otomatis berdasarkan pola data user
 * GET /api/trend/insights
 *
 * Contoh response:
 * {
 *   success: true,
 *   data: {
 *     summary: {
 *       tidurTerbaik:    'Sabtu',
 *       subTidur:        'Rata-rata 8.2 jam',
 *       hariPalingStres: 'Senin',
 *       subStres:        'PSS rata-rata level 3',
 *       faktorPelindung: 'Olahraga',
 *       subPelindung:    'Turunkan stress 0.8 level',
 *     },
 *     insights: [
 *       {
 *         icon:     '📊',
 *         text:     'Stress-mu turun 40% di hari-hari ketika kamu olahraga.',
 *         tag:      'Pola kuat',
 *         tagColor: 'teal',        // 'teal' | 'amber' | 'red' | 'blue'
 *       },
 *       ...
 *     ]
 *   }
 * }
 *
 * Jika belum cukup data (< 7 hari log):
 * { success: true, data: { summary: null, insights: [] } }
 */
export const getAiInsights = () => {
  return api.get('/api/trend/insights')
}