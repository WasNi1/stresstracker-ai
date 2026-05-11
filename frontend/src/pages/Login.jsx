function Login() {
  return (
    <div className='min-h-screen bg-[#F8FFFE] flex items-center justify-center'>
      <div className='bg-white p-10 rounded-[32px] w-[420px] border border-teal-100 shadow-sm'>
        <h1 className='text-4xl font-bold text-teal-600'>
          HealthTrack
        </h1>

        <p className='text-slate-400 mt-2'>
          Monitor kesehatan harianmu
        </p>

        <form className='mt-8 flex flex-col gap-4'>
          <input
            type='email'
            placeholder='Email'
            className='border border-slate-200 rounded-2xl px-4 py-4 outline-none'
          />

          <input
            type='password'
            placeholder='Password'
            className='border border-slate-200 rounded-2xl px-4 py-4 outline-none'
          />

          <button className='bg-teal-500 hover:bg-teal-600 text-white py-4 rounded-2xl font-semibold mt-2'>
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login