function toDateKey(value) {
  if (!value) return new Date().toISOString().split('T')[0]
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return String(value).split('T')[0]

  // Backend menyimpan date sebagai UTC. Format lokal browser menjaga tanggal yang dilihat user.
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function hitungStressLevel(checkin) {
  if (checkin?.stress_level_result) {
    const label = checkin.stress_level_result
    const num = label === 'Tinggi' ? 3 : label === 'Sedang' ? 2 : 1
    return { label, num }
  }

  let skor = 0
  if (checkin.durasi_tidur_menit !== null && checkin.durasi_tidur_menit !== undefined) {
    if (checkin.durasi_tidur_menit < 300) skor += 3
    else if (checkin.durasi_tidur_menit < 360) skor += 2
    else if (checkin.durasi_tidur_menit < 420) skor += 1
  }
  if (checkin.sering_terbangun_malam === 'Ya') skor += 1
  if (checkin.mimpi_buruk === 'Ya') skor += 1
  if (Number(checkin.screen_sebelum_tidur) > 60) skor += 1
  if (checkin.minum_kopi_hari_ini === 'Ya') skor += 1
  if (checkin.merokok === 'Ya') skor += 1
  if (checkin.konsumsi_alkohol === 'Ya') skor += 1
  if (Number(checkin.waktu_outdoor) < 20) skor += 1
  else if (Number(checkin.waktu_outdoor) > 60) skor -= 1
  if (checkin.deadline_hari_ini === 'Ya') skor += 1
  if (checkin.lembur === 'Ya') skor += 1
  if (checkin.aktivitas_hobi === 'Ya') skor -= 1
  if (checkin.suasana_hati === 'Negatif') skor += 2
  else if (checkin.suasana_hati === 'Campur') skor += 1
  else if (checkin.suasana_hati === 'Positif') skor -= 1
  if (checkin.konflik_interpersonal === 'Ya') skor += 2
  if (checkin.merasa_kesepian === 'Ya') skor += 1
  if (checkin.meditasi === 'Ya') skor -= 1
  if (checkin.konsentrasi !== null && checkin.konsentrasi !== undefined) skor += Math.max(0, 3 - Number(checkin.konsentrasi))
  if (checkin.interaksi_sosial !== null && checkin.interaksi_sosial !== undefined) skor += Math.max(0, 2 - Number(checkin.interaksi_sosial))

  if (skor <= 3) return { label: 'Rendah', num: 1 }
  if (skor <= 7) return { label: 'Sedang', num: 2 }
  return { label: 'Tinggi', num: 3 }
}

export function mapCheckinToLocalEntry(checkin) {
  const tanggal = toDateKey(checkin.tanggal || checkin.date)
  const stress = hitungStressLevel(checkin)

  return {
    id: checkin.id,
    tanggal,
    owner: checkin.owner,
    created_at: checkin.created_at,
    updated_at: checkin.updated_at,
    stressLevel: stress.label,
    stressNum: stress.num,

    tidur: {
      durasi_tidur_menit: Number(checkin.durasi_tidur_menit ?? checkin.tidur?.durasi_tidur_menit ?? 0),
      screen_sebelum_tidur: Number(checkin.screen_sebelum_tidur ?? checkin.tidur?.screen_sebelum_tidur ?? 0),
      sering_terbangun_malam: checkin.sering_terbangun_malam ?? checkin.tidur?.sering_terbangun_malam,
      mimpi_buruk: checkin.mimpi_buruk ?? checkin.tidur?.mimpi_buruk,
    },
    gayaHidup: {
      waktu_outdoor: Number(checkin.waktu_outdoor ?? checkin.gayaHidup?.waktu_outdoor ?? 0),
      minum_kopi_hari_ini: checkin.minum_kopi_hari_ini ?? checkin.gayaHidup?.minum_kopi_hari_ini,
      merokok: checkin.merokok ?? checkin.gayaHidup?.merokok,
      konsumsi_alkohol: checkin.konsumsi_alkohol ?? checkin.gayaHidup?.konsumsi_alkohol,
      aktivitas_hobi: checkin.aktivitas_hobi ?? checkin.gayaHidup?.aktivitas_hobi,
    },
    produktivitas: {
      deadline_hari_ini: checkin.deadline_hari_ini ?? checkin.produktivitas?.deadline_hari_ini,
      lembur: checkin.lembur ?? checkin.produktivitas?.lembur,
      konsentrasi: Number(checkin.konsentrasi ?? checkin.produktivitas?.konsentrasi ?? 0),
    },
    mentalSosial: {
      suasana_hati: checkin.suasana_hati ?? checkin.mentalSosial?.suasana_hati,
      konflik_interpersonal: checkin.konflik_interpersonal ?? checkin.mentalSosial?.konflik_interpersonal,
      merasa_kesepian: checkin.merasa_kesepian ?? checkin.mentalSosial?.merasa_kesepian,
      meditasi: checkin.meditasi ?? checkin.mentalSosial?.meditasi,
      interaksi_sosial: Number(checkin.interaksi_sosial ?? checkin.mentalSosial?.interaksi_sosial ?? 0),
    },

    durasi_tidur_menit: Number(checkin.durasi_tidur_menit ?? checkin.tidur?.durasi_tidur_menit ?? 0),
    screen_sebelum_tidur: Number(checkin.screen_sebelum_tidur ?? checkin.tidur?.screen_sebelum_tidur ?? 0),
    sering_terbangun_malam: checkin.sering_terbangun_malam ?? checkin.tidur?.sering_terbangun_malam,
    mimpi_buruk: checkin.mimpi_buruk ?? checkin.tidur?.mimpi_buruk,
    waktu_outdoor: Number(checkin.waktu_outdoor ?? checkin.gayaHidup?.waktu_outdoor ?? 0),
    minum_kopi_hari_ini: checkin.minum_kopi_hari_ini ?? checkin.gayaHidup?.minum_kopi_hari_ini,
    merokok: checkin.merokok ?? checkin.gayaHidup?.merokok,
    konsumsi_alkohol: checkin.konsumsi_alkohol ?? checkin.gayaHidup?.konsumsi_alkohol,
    aktivitas_hobi: checkin.aktivitas_hobi ?? checkin.gayaHidup?.aktivitas_hobi,
    deadline_hari_ini: checkin.deadline_hari_ini ?? checkin.produktivitas?.deadline_hari_ini,
    lembur: checkin.lembur ?? checkin.produktivitas?.lembur,
    konsentrasi: Number(checkin.konsentrasi ?? checkin.produktivitas?.konsentrasi ?? 0),
    suasana_hati: checkin.suasana_hati ?? checkin.mentalSosial?.suasana_hati,
    konflik_interpersonal: checkin.konflik_interpersonal ?? checkin.mentalSosial?.konflik_interpersonal,
    merasa_kesepian: checkin.merasa_kesepian ?? checkin.mentalSosial?.merasa_kesepian,
    meditasi: checkin.meditasi ?? checkin.mentalSosial?.meditasi,
    interaksi_sosial: Number(checkin.interaksi_sosial ?? checkin.mentalSosial?.interaksi_sosial ?? 0),
  }
}

export function mapCheckinsToLocalEntries(checkins = []) {
  return checkins.map(mapCheckinToLocalEntry).sort((a, b) => a.tanggal.localeCompare(b.tanggal))
}
