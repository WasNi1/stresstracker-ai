import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import DailyInput from '../pages/DailyInput'
import Riwayat from '../pages/Riwayat'
import TrendInsight from '../pages/Trend-Insight'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/input-harian' element={<DailyInput />} />
        <Route path='/riwayat' element={<Riwayat />} />
        <Route path='/trend-insight' element={<TrendInsight />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
