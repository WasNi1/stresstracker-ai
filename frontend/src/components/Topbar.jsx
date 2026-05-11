function Topbar({title}) {
    return (
        <div className='bg-white border-b border-teal-100 px-8 py-5 flex items-center justify-between'>
            <div>
                <h1 className='text-2xl font-bold text-slate-800'>
                    {title}
                </h1>

                <p className='text-slate-400 text-sm mt-1'>
                    Monitor kesehatan harianmu
                </p>
            </div>

            <div className='flex items-center gap-3'>
                <img
                    src='https://i.pravatar.cc/40'
                    alt='profile'
                    className='rounded-full'
                />

                <div>
                    <h3 className='font-semibold text-slate-700'>
                        Nova Wijaya
                    </h3>

                    <p className='text-xs text-slate-400'>
                        Healthy Lifestyle
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Topbar;