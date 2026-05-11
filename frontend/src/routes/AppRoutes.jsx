import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import Analytics from '../pages/Analytics'
import Profile from '../pages/Profile'
import Settings from '../pages/Settings'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/input-harian' element={<Dashboard />} />
        <Route path='/riwayat' element={<Dashboard />} />
        <Route path='/analytics' element={<Analytics />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/settings' element={<Settings />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
