function HealthChart() {
  return (
    <div className='bg-white rounded-3xl border border-teal-100 p-6'>
      <h2 className='text-xl font-bold text-slate-800'>
        Stress Analytics
      </h2>

      <div className='mt-8 flex items-end gap-4 h-[220px]'>
        <div className='bg-teal-200 w-12 rounded-t-2xl h-[100px]'></div>
        <div className='bg-teal-300 w-12 rounded-t-2xl h-[140px]'></div>
        <div className='bg-teal-400 w-12 rounded-t-2xl h-[170px]'></div>
        <div className='bg-teal-500 w-12 rounded-t-2xl h-[120px]'></div>
        <div className='bg-teal-600 w-12 rounded-t-2xl h-[190px]'></div>
      </div>
    </div>
  )
}

export default HealthChart