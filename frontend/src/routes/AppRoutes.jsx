import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import DailyInput from '../pages/DailyInput'
import Riwayat from '../pages/Riwayat'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Dashboard />} />
        <Route path='/input-harian' element={<DailyInput />} />
        <Route path='/riwayat' element={<Riwayat />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
