import api from './axios'

export const addCheckin = (payload) => {
  return api.post('/checkins', payload)
}

export const getCheckins = () => {
  return api.get('/checkins')
}
