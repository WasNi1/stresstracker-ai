function RecommendationCard() {
  return (
    <div className='bg-teal-50 border border-teal-100 rounded-3xl p-6'>
      <h2 className='text-xl font-bold text-slate-800'>
        AI Recommendation
      </h2>

      <p className='text-slate-600 mt-4 leading-relaxed'>
        Tingkat stres kamu meningkat 12% minggu ini.
        Disarankan tidur lebih awal dan lakukan meditasi 10 menit.
      </p>
    </div>
  )
}

export default RecommendationCard