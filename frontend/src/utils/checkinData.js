import { getCheckins } from '../api/checkin'
import { mapCheckinsToLocalEntries } from './checkinMapper'

export function getCachedCheckinEntries() {
  try {
    const raw = localStorage.getItem('riwayat_harian')
    const data = raw ? JSON.parse(raw) : []
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

export async function fetchCheckinEntries({ useCacheFallback = true } = {}) {
  const token = localStorage.getItem('accessToken') || localStorage.getItem('token')

  if (token) {
    try {
      const response = await getCheckins()
      const checkins = response.data?.data?.checkin || []
      const mapped = mapCheckinsToLocalEntries(checkins)
      localStorage.setItem('riwayat_harian', JSON.stringify(mapped.slice(-30)))
      return mapped
    } catch (error) {
      if (!useCacheFallback) throw error
    }
  }

  return useCacheFallback ? getCachedCheckinEntries() : []
}

export function calculateCheckinStats(entries = []) {
  const list = Array.isArray(entries) ? entries : []
  const uniqueDates = [...new Set(list.map((item) => item?.tanggal).filter(Boolean))].sort()

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
}
