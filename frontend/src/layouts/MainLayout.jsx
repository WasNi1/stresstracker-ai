import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'

function MainLayout({ children, title }) {
  return (
    <div className='flex bg-[#F8FFFE] min-h-screen'>
      <Sidebar />

      <div className='flex-1'>
        <Topbar title={title} />

        <div className='p-8'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default MainLayout