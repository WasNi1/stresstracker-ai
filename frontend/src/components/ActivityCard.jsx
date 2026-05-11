function ActivityCard() {
  return (
    <div className='bg-white rounded-3xl border border-teal-100 p-6'>
      <h2 className='text-xl font-bold text-slate-800'>
        Aktivitas Hari Ini
      </h2>

      <div className='mt-5 flex flex-col gap-4'>
        <div className='flex justify-between'>
          <p className='text-slate-500'>Meditasi</p>
          <p className='text-teal-600 font-medium'>10 Menit</p>
        </div>

        <div className='flex justify-between'>
          <p className='text-slate-500'>Minum Air</p>
          <p className='text-teal-600 font-medium'>2 Liter</p>
        </div>

        <div className='flex justify-between'>
          <p className='text-slate-500'>Jalan Kaki</p>
          <p className='text-teal-600 font-medium'>5.2 KM</p>
        </div>
      </div>
    </div>
  )
}

export default ActivityCard