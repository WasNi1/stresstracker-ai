function MetricCard({ title, value, desc }) {
  return (
    <div className='bg-white rounded-3xl border border-teal-100 p-6 shadow-sm'>
      <p className='text-slate-400 text-sm'>
        {title}
      </p>

      <h1 className='text-3xl font-bold text-teal-600 mt-3'>
        {value}
      </h1>

      <p className='text-sm text-emerald-500 mt-2'>
        {desc}
      </p>
    </div>
  )
}

export default MetricCard