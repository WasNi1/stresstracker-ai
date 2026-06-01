import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ForgotPassword from '../pages/ForgotPassword'
import VerifyOtp from '../pages/VerifyOtp'
import ResetPassword from '../pages/ResetPassword'
import DashboardRekomendasi from '../pages/DashboardRekomendasi'
import DailyInput from '../pages/DailyInput'
import RiwayatRekomendasi from '../pages/RiwayatRekomendasi'
import Akun from '../pages/Akun'

function getAuthToken() {
  return localStorage.getItem('accessToken') || localStorage.getItem('token')
}

function ProtectedRoute({ children }) {
  const token = getAuthToken()

  if (!token) {
    return <Navigate to='/login' replace />
  }

  return children
}

function GuestRoute({ children }) {
  const token = getAuthToken()

  if (token) {
    return <Navigate to='/dashboard' replace />
  }

  return children
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/dashboard' replace />} />

        <Route
          path='/login'
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />

        <Route
          path='/register'
          element={
            <GuestRoute>
              <Register />
            </GuestRoute>
          }
        />

        <Route
          path='/forgot-password'
          element={
            <GuestRoute>
              <ForgotPassword />
            </GuestRoute>
          }
        />

        <Route
          path='/verify-otp'
          element={
            <GuestRoute>
              <VerifyOtp />
            </GuestRoute>
          }
        />

        <Route
          path='/reset-password'
          element={
            <GuestRoute>
              <ResetPassword />
            </GuestRoute>
          }
        />

        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <DashboardRekomendasi />
            </ProtectedRoute>
          }
        />

        <Route
          path='/input-harian'
          element={
            <ProtectedRoute>
              <DailyInput />
            </ProtectedRoute>
          }
        />

        <Route
          path='/riwayat'
          element={
            <ProtectedRoute>
              <RiwayatRekomendasi />
            </ProtectedRoute>
          }
        />

        <Route
          path='/akun'
          element={
            <ProtectedRoute>
              <Akun />
            </ProtectedRoute>
          }
        />

        <Route path='*' element={<Navigate to='/dashboard' replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
