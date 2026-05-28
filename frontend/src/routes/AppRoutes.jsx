import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ForgotPassword from '../pages/ForgotPassword'
import Dashboard from '../pages/Dashboard'
import DashboardRingkasanAI from '../pages/DashboardRingkasanAI'
import DailyInput from '../pages/DailyInput'
import Riwayat from '../pages/Riwayat'
import RiwayatRingkasanAI from '../pages/RiwayatRingkasanAI'
import Akun from '../pages/Akun'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/dashboard-ai' element={<DashboardRingkasanAI />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/input-harian' element={<DailyInput />} />
        <Route path='/riwayat' element={<Riwayat />} />
        <Route path='/riwayat-ai' element={<RiwayatRingkasanAI />} />
        <Route path='/akun' element={<Akun />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes