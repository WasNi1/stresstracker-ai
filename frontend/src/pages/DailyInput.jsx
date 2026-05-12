import { useState } from 'react'
import {
  LuMoon,
  LuBrain,
  LuActivity,
  LuChevronLeft,
  LuChevronRight,
  LuHeartPulse,
  LuCoffee,
  LuSmile,
} from 'react-icons/lu'
import MainLayout from '../layouts/MainLayout'

const steps = [
  {
    id: 1,
    icon: <LuMoon size={16} />,
    badge: 'Tidur',
    title: 'Semalam tidur berapa jam?',
    description: 'Geser slider sesuai durasi tidurmu tadi malam',
  },
  {
    id: 2,
    icon: <LuHeartPulse size={16} />,
    badge: 'Stress',
    title: 'Seberapa stress kamu hari ini?',
    description: 'Pilih level stress yang paling sesuai',
  },
  {
    id: 3,
    icon: <LuCoffee size={16} />,
    badge: 'Aktivitas',
    title: 'Bagaimana aktivitasmu hari ini?',
    description: 'Isi energi dan produktivitasmu hari ini',
  },
  {
    id: 4,
    icon: <LuSmile size={16} />,
    badge: 'Mood',
    title: 'Bagaimana mood kamu sekarang?',
    description: 'Pilih emoji yang paling menggambarkan moodmu',
  },
]

function DailyInput() {
  const [currentStep, setCurrentStep] = useState(0)
  const [sleepHours, setSleepHours] = useState(7)

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <MainLayout title='Input Harian'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex items-center gap-3 mb-3'>
            <div className='w-14 h-14 rounded-3xl bg-gradient-to-r from-teal-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-teal-200'>
              <LuBrain size={26} className='text-white' />
            </div>
            <div>
              <h1 className='text-3xl font-bold text-slate-800'>Daily Wellness Check</h1>
              <p className='text-slate-400 text-sm mt-1'>Isi kondisi harianmu untuk analisis AI yang lebih akurat</p>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className='bg-white/70 backdrop-blur-xl border border-white/80 shadow-lg shadow-teal-100/40 rounded-[32px] p-6 mb-6'>
          <div className='flex items-center justify-between mb-4'>
            <div>
              <h3 className='font-semibold text-slate-700'>Progress Harian</h3>
              <p className='text-sm text-slate-400 mt-1'>Step {currentStep + 1} dari {steps.length}</p>
            </div>
            <div className='w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center'>
              <span className='text-teal-600 font-bold text-sm'>{Math.round(progress)}%</span>
            </div>
          </div>
          <div className='w-full h-3 bg-slate-100 rounded-full overflow-hidden'>
            <div
              className='h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transition-all duration-500'
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Card */}
        <div className='relative overflow-hidden bg-white/70 backdrop-blur-xl border border-white/80 shadow-xl shadow-teal-100/50 rounded-[40px] p-8 lg:p-10 min-h-[650px] flex flex-col justify-between'>
          <div className='absolute top-0 right-0 w-72 h-72 bg-teal-100/30 rounded-full blur-3xl'></div>

          <div className='relative z-10'>
            {/* Step Badge */}
            <div className='inline-flex items-center gap-2 bg-teal-50 text-teal-600 px-5 py-2.5 rounded-2xl text-sm font-semibold mb-8'>
              {steps[currentStep].icon}
              {steps[currentStep].badge}
            </div>

            {/* STEP 1 - Tidur */}
            {currentStep === 0 && (
              <>
                <div className='mb-10'>
                  <h2 className='text-4xl font-bold text-slate-800 leading-tight'>{steps[0].title}</h2>
                  <p className='text-slate-400 mt-3 text-lg'>{steps[0].description}</p>
                </div>

                <div className='mb-12'>
                  <div className='flex items-center justify-between mb-5'>
                    <span className='text-sm font-medium text-slate-500'>Durasi tidur</span>
                    <div className='px-5 py-2 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold text-lg shadow-lg shadow-teal-200'>
                      {sleepHours} jam
                    </div>
                  </div>
                  <input
                    type='range' min='2' max='12' value={sleepHours}
                    onChange={(e) => setSleepHours(e.target.value)}
                    className='w-full accent-teal-500 h-3'
                  />
                  <div className='flex justify-between mt-3 text-sm text-slate-400'>
                    <span>2 jam</span>
                    <span>12 jam</span>
                  </div>
                </div>

                <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
                  {[
                    { emoji: '😩', label: 'Buruk' },
                    { emoji: '😔', label: 'Kurang' },
                    { emoji: '😐', label: 'Biasa' },
                    { emoji: '😊', label: 'Baik' },
                    { emoji: '😴', label: 'Nyenyak' },
                  ].map((item, index) => (
                    <button
                      key={index}
                      className={`flex flex-col items-center justify-center gap-3 rounded-3xl border py-6 transition-all hover:scale-[1.03] ${
                        index === 3
                          ? 'bg-gradient-to-r from-teal-500 to-emerald-500 border-transparent text-white shadow-xl shadow-teal-200'
                          : 'bg-white border-slate-200 hover:border-teal-300'
                      }`}
                    >
                      <span className='text-4xl'>{item.emoji}</span>
                      <span className='text-sm font-semibold'>{item.label}</span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* STEP 2 - Stress */}
            {currentStep === 1 && (
              <>
                <div className='mb-10'>
                  <h2 className='text-4xl font-bold text-slate-800 leading-tight'>{steps[1].title}</h2>
                  <p className='text-slate-400 mt-3 text-lg'>{steps[1].description}</p>
                </div>

                <div className='space-y-4'>
                  {[
                    { level: 'Rendah', desc: 'Hari terasa santai dan terkendali' },
                    { level: 'Sedang', desc: 'Ada tekanan tapi masih manageable' },
                    { level: 'Tinggi', desc: 'Mulai terasa berat dan melelahkan' },
                    { level: 'Sangat Tinggi', desc: 'Stress terasa sangat mengganggu' },
                  ].map((item, index) => (
                    <button
                      key={index}
                      className={`w-full flex items-center justify-between rounded-3xl border p-6 transition-all ${
                        index === 1
                          ? 'bg-gradient-to-r from-teal-500 to-emerald-500 border-transparent text-white shadow-xl shadow-teal-200'
                          : 'bg-white border-slate-200 hover:border-teal-300'
                      }`}
                    >
                      <div className='text-left'>
                        <h3 className='font-bold text-lg'>{item.level}</h3>
                        <p className={`text-sm mt-1 ${index === 1 ? 'text-teal-50' : 'text-slate-400'}`}>{item.desc}</p>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 ${index === 1 ? 'border-white bg-white' : 'border-slate-300'}`}></div>
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* STEP 3 - Aktivitas */}
            {currentStep === 2 && (
              <>
                <div className='mb-10'>
                  <h2 className='text-4xl font-bold text-slate-800 leading-tight'>{steps[2].title}</h2>
                  <p className='text-slate-400 mt-3 text-lg'>{steps[2].description}</p>
                </div>

                <div className='grid md:grid-cols-2 gap-5'>
                  {[
                    { title: 'Energi Hari Ini', value: '80%' },
                    { title: 'Produktivitas', value: '75%' },
                    { title: 'Fokus', value: '70%' },
                    { title: 'Aktivitas Fisik', value: '60%' },
                  ].map((item, index) => (
                    <div key={index} className='rounded-3xl border border-slate-200 bg-white p-6'>
                      <div className='flex items-center justify-between mb-4'>
                        <h3 className='font-semibold text-slate-700'>{item.title}</h3>
                        <span className='font-bold text-teal-500'>{item.value}</span>
                      </div>
                      <input type='range' min='0' max='100' defaultValue='70' className='w-full accent-teal-500' />
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* STEP 4 - Mood */}
            {currentStep === 3 && (
              <>
                <div className='mb-10'>
                  <h2 className='text-4xl font-bold text-slate-800 leading-tight'>{steps[3].title}</h2>
                  <p className='text-slate-400 mt-3 text-lg'>{steps[3].description}</p>
                </div>

                <div className='grid grid-cols-2 md:grid-cols-4 gap-5 mb-10'>
                  {['😄', '😊', '😐', '😔', '😩', '🥱', '🤩', '😴'].map((emoji, index) => (
                    <button
                      key={index}
                      className={`rounded-[32px] py-10 border transition-all hover:scale-[1.03] ${
                        index === 1
                          ? 'bg-gradient-to-r from-teal-500 to-emerald-500 border-transparent shadow-xl shadow-teal-200'
                          : 'bg-white border-slate-200 hover:border-teal-300'
                      }`}
                    >
                      <span className='text-5xl'>{emoji}</span>
                    </button>
                  ))}
                </div>

                <div className='rounded-[32px] bg-gradient-to-r from-teal-500 to-emerald-500 p-7 text-white'>
                  <div className='flex items-start gap-4'>
                    <div className='w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center shrink-0'>
                      <LuActivity size={24} />
                    </div>
                    <div>
                      <h3 className='font-bold text-xl'>AI Wellness Insight</h3>
                      <p className='text-teal-50 mt-3 leading-relaxed'>
                        Berdasarkan data hari ini, kondisi mentalmu cukup stabil dengan kualitas tidur yang baik dan tingkat stress yang masih terkendali.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Navigation */}
          <div className='relative z-10 flex items-center justify-between pt-10'>
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 px-6 py-4 rounded-2xl transition-all ${
                currentStep === 0
                  ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                  : 'border border-slate-200 text-slate-600 hover:border-teal-300 bg-white'
              }`}
            >
              <LuChevronLeft size={18} />
              Sebelumnya
            </button>

            <button
              onClick={nextStep}
              disabled={currentStep === steps.length - 1}
              className={`flex items-center gap-2 px-7 py-4 rounded-2xl font-semibold shadow-lg transition-all active:scale-[0.98] ${
                currentStep === steps.length - 1
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                  : 'bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white shadow-teal-200'
              }`}
            >
              {currentStep === steps.length - 1 ? 'Selesai' : 'Selanjutnya'}
              <LuChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default DailyInput
