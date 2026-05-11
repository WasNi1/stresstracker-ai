import { LuBot, LuBrain, LuDroplets, LuFootprints } from 'react-icons/lu'

const tips = [
  { icon: <LuBrain size={16} />, text: 'Meditasi 10 menit sebelum tidur untuk menurunkan kortisol.' },
  { icon: <LuDroplets size={16} />, text: 'Tambah asupan air 500ml untuk hidrasi optimal.' },
  { icon: <LuFootprints size={16} />, text: 'Jalan kaki 20 menit di pagi hari meningkatkan mood.' },
]

function RecommendationCard() {
  return (
    <div className='bg-gradient-to-br from-teal-500 to-emerald-500 rounded-3xl p-6 text-white shadow-md shadow-teal-100'>
      <div className='flex items-center gap-2 mb-4'>
        <div className='w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center'>
          <LuBot size={18} className='text-white' />
        </div>
        <div>
          <h2 className='text-base font-bold'>AI Recommendation</h2>
          <p className='text-xs text-teal-100'>Berdasarkan data minggu ini</p>
        </div>
      </div>

      <p className='text-sm text-teal-50 leading-relaxed mb-5'>
        Tingkat stres kamu meningkat <span className='font-bold text-white'>12%</span> minggu ini. Berikut saran personal untukmu:
      </p>

      <div className='flex flex-col gap-3'>
        {tips.map(({ icon, text }) => (
          <div key={text} className='flex items-start gap-3 bg-white/10 rounded-2xl p-3'>
            <span className='mt-0.5 text-white'>{icon}</span>
            <p className='text-xs text-teal-50 leading-relaxed'>{text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecommendationCard
