import api from './axios'

export const registerUser = (payload) => {
  return api.post('/register', payload)
}

export const verifyOtp = (payload) => {
  return api.post('/verify-otp', payload)
}

export const loginUser = (payload) => {
  return api.post('/login', payload)
}

export const getLoggedUser = () => {
  return api.get('/me')
}

export const refreshAccessToken = (refreshToken) => {
  return api.put('/authentications', { refreshToken })
}

export const logoutUser = (refreshToken) => {
  return api.delete('/authentications', { data: { refreshToken } })
}
