function SleepCard() {
  return (
    <div className='bg-white rounded-3xl border border-teal-100 p-6'>
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-slate-400'>Sleep Duration</p>

          <h1 className='text-4xl font-bold text-slate-800 mt-3'>
            7.5h
          </h1>
        </div>

        <div className='w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center text-2xl'>
          😴
        </div>
      </div>

      <div className='mt-6 w-full h-3 bg-slate-100 rounded-full'>
        <div className='w-[75%] h-3 bg-teal-500 rounded-full'></div>
      </div>
    </div>
  )
}

export default SleepCard