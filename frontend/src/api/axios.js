import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken') || localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true
      const refreshToken = localStorage.getItem('refreshToken')

      if (refreshToken) {
        try {
          const response = await axios.put(
            `${api.defaults.baseURL}/authentications`,
            { refreshToken },
            { headers: { 'Content-Type': 'application/json' } }
          )

          const newAccessToken = response.data?.data?.accessToken
          if (newAccessToken) {
            localStorage.setItem('accessToken', newAccessToken)
            localStorage.setItem('token', newAccessToken)
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
            return api(originalRequest)
          }
        } catch {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('token')
          localStorage.removeItem('refreshToken')
          localStorage.removeItem('user')
        }
      } else {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    }

    return Promise.reject(error)
  }
)

export default api
