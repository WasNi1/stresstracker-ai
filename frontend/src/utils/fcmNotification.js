import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
//import axios from "axios"; // Buka komentar ini kalau frontend-nya pakai axios

const firebaseConfig = {
  apiKey: "AIzaSyDH_JmW8DPAOc0aviQd-KxoeGrHwmgPcEs",
  authDomain: "stresstracker-804ea.firebaseapp.com",
  projectId: "stresstracker-804ea",
  storageBucket: "stresstracker-804ea.firebasestorage.app",
  messagingSenderId: "618822045440",
  appId: "1:618822045440:web:8603d700ffcc7e99f6ede5",
  measurementId: "G-6D7QZ4GQGQ"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export async function getBrowserFcmToken() {
  try {
    if (!('Notification' in window)) {
      return { token: null, message: 'Browser tidak mendukung notifikasi.' };
    }

    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      return { token: null, message: 'Izin notifikasi ditolak oleh user.' };
    }

    const currentToken = await getToken(messaging, {
      vapidKey: "BAqoi1YQ96KX68AIgWn3RAePQBv1T8JdG7ZdrBc1ZLzyvWukUaNSI7oFzHwokhOB0z1gPMBiAYxrdL-bZPqfTVM" 
    });

    if (currentToken) {
      console.log('FCM TOKEN BERHASIL DIDAPAT:', currentToken);
      localStorage.setItem('fcmToken', currentToken);
      return { token: currentToken, message: 'FCM Token berhasil di-generate!' };
    } else {
      return { token: null, message: 'Gagal mendapatkan token.' };
    }
  } catch (error) {
    console.error('Error FCM:', error);
    return { token: null, message: 'Terjadi kesalahan sistem.' };
  }
}