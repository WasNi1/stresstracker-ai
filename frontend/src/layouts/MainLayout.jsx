import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import BottomNav from '../components/BottomNav'

function MainLayout({ children, title }) {
  return (
    <div className='flex bg-[#F8FFFE] min-h-screen'>
      {/* Sidebar — hidden di mobile */}
      <div className='hidden md:block'>
        <Sidebar />
      </div>

      <div className='flex-1 min-w-0'>
        <Topbar title={title} />
        <div className='p-4 md:p-8 pb-24 md:pb-8'>
          {children}
        </div>
      </div>

      {/* Bottom Nav — hanya di mobile */}
      <div className='md:hidden'>
        <BottomNav />
      </div>
    </div>
  )
}

export default MainLayout
