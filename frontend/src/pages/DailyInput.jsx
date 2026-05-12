import {
  LuMoon,
  LuBrain,
  LuActivity,
  LuChevronLeft,
  LuChevronRight,
} from 'react-icons/lu'

function DailyInput() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-teal-50/40 py-10 px-4'>
      <div className='max-w-3xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex items-center gap-3 mb-3'>
            <div className='w-12 h-12 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-teal-200'>
              <LuBrain size={24} className='text-white' />
            </div>

            <div>
              <h1 className='text-3xl font-bold text-slate-800'>
                Input Harian
              </h1>

              <p className='text-slate-400 text-sm mt-1'>
                Isi kondisi harianmu untuk mendapatkan insight AI yang lebih
                personal
              </p>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className='bg-white/70 backdrop-blur-xl border border-white/80 shadow-lg shadow-teal-100/40 rounded-[28px] p-6 mb-6'>
          <div className='flex items-center justify-between mb-3'>
            <span className='text-sm font-medium text-slate-500'>
              Progress Input
            </span>

            <span className='text-sm font-semibold text-teal-500'>
              1 / 6
            </span>
          </div>

          <div className='w-full h-3 bg-slate-100 rounded-full overflow-hidden'>
            <div className='h-full w-[16%] bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full'></div>
          </div>
        </div>

        {/* Main Form */}
        <div className='bg-white/70 backdrop-blur-xl border border-white/80 shadow-xl shadow-teal-100/50 rounded-[32px] p-8'>
          {/* Step Badge */}
          <div className='inline-flex items-center gap-2 bg-teal-50 text-teal-600 px-4 py-2 rounded-2xl text-sm font-semibold mb-6'>
            <LuMoon size={16} />
            Tidur semalam
          </div>

          {/* Question */}
          <div className='mb-8'>
            <h2 className='text-3xl font-bold text-slate-800 leading-tight'>
              Semalam tidur berapa jam?
            </h2>

            <p className='text-slate-400 mt-2'>
              Geser slider sesuai durasi tidurmu tadi malam
            </p>
          </div>

          {/* Sleep Duration */}
          <div className='mb-10'>
            <div className='flex items-center justify-between mb-4'>
              <span className='text-sm font-medium text-slate-500'>
                Durasi tidur
              </span>

              <span className='text-lg font-bold text-teal-500'>
                7 jam
              </span>
            </div>

            <input
              type='range'
              min='2'
              max='12'
              defaultValue='7'
              className='w-full accent-teal-500 h-2'
            />

            <div className='flex justify-between mt-2 text-xs text-slate-400'>
              <span>2 jam</span>
              <span>12 jam</span>
            </div>
          </div>

          {/* Sleep Quality */}
          <div className='mb-10'>
            <h3 className='text-xl font-bold text-slate-800 mb-2'>
              Gimana kualitas tidurmu?
            </h3>

            <p className='text-slate-400 text-sm mb-5'>
              Pilih emoji yang paling sesuai
            </p>

            <div className='grid grid-cols-5 gap-3'>
              {[
                { emoji: '😩', label: 'Buruk' },
                { emoji: '😔', label: 'Kurang' },
                { emoji: '😐', label: 'Biasa' },
                { emoji: '😊', label: 'Baik' },
                { emoji: '😄', label: 'Nyenyak' },
              ].map((item, index) => (
                <button
                  key={index}
                  className={`flex flex-col items-center justify-center gap-2 rounded-3xl border transition-all py-5 ${
                    index === 3
                      ? 'bg-gradient-to-r from-teal-500 to-emerald-500 border-transparent text-white shadow-lg shadow-teal-200'
                      : 'bg-white border-slate-200 hover:border-teal-300 text-slate-700'
                  }`}
                >
                  <span className='text-3xl'>{item.emoji}</span>

                  <span className='text-sm font-medium'>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Questions */}
          <div className='space-y-4 mb-10'>
            <div className='flex items-center justify-between rounded-3xl border border-slate-200 bg-white px-5 py-5'>
              <div>
                <h4 className='font-semibold text-slate-700'>
                  Kebangun tengah malam?
                </h4>

                <p className='text-sm text-slate-400 mt-1'>
                  Apakah tidurmu sempat terganggu
                </p>
              </div>

              <div className='flex gap-3'>
                <button className='px-5 py-2 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-medium shadow-md shadow-teal-100'>
                  Ya
                </button>

                <button className='px-5 py-2 rounded-2xl border border-slate-200 text-slate-500 hover:border-slate-300'>
                  Tidak
                </button>
              </div>
            </div>

            <div className='flex items-center justify-between rounded-3xl border border-slate-200 bg-white px-5 py-5'>
              <div>
                <h4 className='font-semibold text-slate-700'>
                  Ada mimpi buruk?
                </h4>

                <p className='text-sm text-slate-400 mt-1'>
                  Opsional
                </p>
              </div>

              <div className='flex gap-3'>
                <button className='px-5 py-2 rounded-2xl border border-slate-200 text-slate-500 hover:border-slate-300'>
                  Ya
                </button>

                <button className='px-5 py-2 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-medium shadow-md shadow-teal-100'>
                  Tidak
                </button>
              </div>
            </div>
          </div>

          {/* Insight Card */}
          <div className='rounded-[28px] bg-gradient-to-r from-teal-500 to-emerald-500 p-6 text-white mb-10'>
            <div className='flex items-start gap-4'>
              <div className='w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0'>
                <LuActivity size={22} />
              </div>

              <div>
                <h3 className='font-bold text-lg'>
                  AI Sleep Insight
                </h3>

                <p className='text-teal-50 mt-2 leading-relaxed text-sm'>
                  Tidur 7 jam dengan kualitas baik biasanya berkorelasi
                  dengan tingkat stress yang lebih rendah keesokan harinya.
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className='flex items-center justify-between'>
            <button className='flex items-center gap-2 px-5 py-3 rounded-2xl border border-slate-200 text-slate-500 hover:border-slate-300 transition-all'>
              <LuChevronLeft size={18} />
              Sebelumnya
            </button>

            <button className='flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-semibold shadow-lg shadow-teal-200 transition-all active:scale-[0.98]'>
              Selanjutnya
              <LuChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DailyInput