import api from './axios'

export const saveFcmToken = (fcmToken) => {
  return api.put('/users/fcm-token', { fcmToken })
}

export const updateReminder = (reminderTime) => {
  return api.put('/users/reminder', { reminderTime })
}
