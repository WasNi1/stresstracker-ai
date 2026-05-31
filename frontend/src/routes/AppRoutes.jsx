import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ForgotPassword from '../pages/ForgotPassword'
import VerifyOtp from '../pages/VerifyOtp'
import DashboardRekomendasi from '../pages/DashboardRekomendasi'
import DailyInput from '../pages/DailyInput'
import RiwayatRekomendasi from '../pages/RiwayatRekomendasi'
import Akun from '../pages/Akun'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/dashboard' element={<DashboardRekomendasi />} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/input-harian' element={<DailyInput />} />
        <Route path='/riwayat' element={<RiwayatRekomendasi />} />
        <Route path='/akun' element={<Akun />} />
        <Route path='/verify-otp' element={<VerifyOtp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes