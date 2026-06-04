# StressTracker AI - Frontend

StressTracker AI adalah aplikasi web untuk membantu pengguna mencatat kondisi harian, memantau tingkat stres, melihat riwayat kesehatan, serta mendapatkan rekomendasi tindakan berdasarkan pola tidur, aktivitas, gaya hidup, produktivitas, dan kondisi mental sosial.

Aplikasi ini dibuat menggunakan React + Vite dengan tampilan bertema kesehatan. Frontend sudah disiapkan untuk terhubung ke backend melalui REST API dan mendukung fitur autentikasi, input harian, dashboard, riwayat, akun pengguna, serta notifikasi pengingat menggunakan Firebase Cloud Messaging.

## Daftar Isi

- [Fitur Utama](#fitur-utama)
- [Teknologi yang Digunakan](#teknologi-yang-digunakan)
- [Struktur Folder](#struktur-folder)
- [Alur Aplikasi](#alur-aplikasi)
- [Instalasi dan Menjalankan Project](#instalasi-dan-menjalankan-project)
- [Konfigurasi Environment](#konfigurasi-environment)
- [Route Halaman](#route-halaman)
- [Integrasi API Backend](#integrasi-api-backend)
- [Notifikasi Firebase Cloud Messaging](#notifikasi-firebase-cloud-messaging)
- [Penyimpanan Lokal](#penyimpanan-lokal)
- [Build dan Deploy](#build-dan-deploy)
- [Catatan Pengembangan](#catatan-pengembangan)

## Fitur Utama

### 1. Landing Page

Halaman awal aplikasi yang menampilkan pengenalan aplikasi, fitur, dan ajakan untuk masuk atau mendaftar.

### 2. Autentikasi Pengguna

Aplikasi memiliki fitur autentikasi lengkap, yaitu:

- Register pengguna baru
- Login pengguna
- Forgot password
- Verifikasi OTP
- Reset password
- Logout
- Protected route untuk halaman yang membutuhkan login

Token login disimpan pada `localStorage` dengan key:

- `accessToken`
- `token`
- `refreshToken`
- `user`

### 3. Dashboard Kesehatan

Dashboard menampilkan ringkasan kondisi pengguna berdasarkan input harian, seperti:

- Level stres hari ini
- Ringkasan tidur
- Faktor yang terlihat
- Rekomendasi tindakan
- Data check-in terbaru

Dashboard mengambil data dari backend melalui endpoint check-in, lalu menyimpan cache sementara ke `localStorage` agar data tetap dapat ditampilkan.

### 4. Input Harian

Halaman input harian digunakan untuk mencatat kondisi pengguna setiap hari. Data yang dicatat meliputi:

- Tidur
- Gaya hidup
- Produktivitas
- Mental dan sosial

Aplikasi juga menghitung estimasi tingkat stres berdasarkan data yang diinput, kemudian mengirimkan data ke backend.

### 5. Riwayat Kesehatan

Halaman riwayat menampilkan data input harian pengguna dalam bentuk:

- Statistik total log
- Rata-rata stres
- Streak input
- Log dalam 7 hari terakhir
- Chart mingguan
- Daftar riwayat harian
- Detail faktor dan rekomendasi per hari
- Filter berdasarkan level stres
- Pencarian berdasarkan tanggal atau isi riwayat

### 6. Akun dan Pengaturan

Halaman akun berisi fitur:

- Menampilkan profil pengguna
- Mengedit profil
- Mengubah password
- Mengatur bahasa tampilan
- Mengatur tema gelap atau terang
- Mengaktifkan pengingat input harian
- Mengatur jam pengingat
- Logout
- Hapus data lokal

### 7. Notifikasi Pengingat

Aplikasi sudah disiapkan untuk notifikasi browser menggunakan Firebase Cloud Messaging. Token FCM dikirim ke backend melalui endpoint `/users/fcm-token`.

## Teknologi yang Digunakan

- React 19
- Vite 8
- React Router DOM 7
- Tailwind CSS 4
- Axios
- Firebase
- React Icons
- ESLint
- Vercel rewrite configuration

## Struktur Folder

```bash
frontend/
├── public/
│   ├── dashboard-preview.png
│   ├── favicon.png
│   └── firebase-messaging-sw.js
├── src/
│   ├── api/
│   │   ├── auth.js
│   │   ├── axios.js
│   │   ├── checkin.js
│   │   ├── dailyInput.js
│   │   ├── dashboard.js
│   │   ├── notification.js
│   │   └── riwayat.js
│   ├── components/
│   │   ├── ActivityCard.jsx
│   │   ├── BottomNav.jsx
│   │   ├── EmptyState.jsx
│   │   ├── FaktorRow.jsx
│   │   ├── HealthChart.jsx
│   │   ├── MetricCard.jsx
│   │   ├── RecommendationCard.jsx
│   │   ├── Re komendasiHarian.jsx
│   │   ├── Sidebar.jsx
│   │   ├── SleepCard.jsx
│   │   ├── SleepStressChart.jsx
│   │   ├── StatCard.jsx
│   │   ├── Tabs.jsx
│   │   └── Topbar.jsx
│   ├── context/
│   │   └── AppContext.jsx
│   ├── layouts/
│   │   └── MainLayout.jsx
│   ├── pages/
│   │   ├── Akun.jsx
│   │   ├── DailyInput.jsx
│   │   ├── DashboardRekomendasi.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── Landing.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── ResetPassword.jsx
│   │   ├── RiwayatRekomendasi.jsx
│   │   └── VerifyOtp.jsx
│   ├── routes/
│   │   └── AppRoutes.jsx
│   ├── styles/
│   │   └── index.css
│   ├── utils/
│   │   ├── checkinData.js
│   │   ├── checkinMapper.js
│   │   └── fcmNotification.js
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
└── vercel.json
```

> Catatan: pada nama file sebenarnya terdapat `RekomendasiHarian.jsx`. Jika muncul spasi pada dokumentasi struktur folder, gunakan nama file asli di project.

## Alur Aplikasi

1. Pengguna membuka landing page.
2. Pengguna melakukan register atau login.
3. Setelah login berhasil, token disimpan ke `localStorage`.
4. Pengguna diarahkan ke dashboard.
5. Pengguna mengisi input harian melalui halaman input harian.
6. Data input dikirim ke backend menggunakan endpoint check-in.
7. Dashboard dan riwayat membaca data dari backend dan cache lokal.
8. Pengguna dapat melihat rekomendasi berdasarkan data harian.
9. Pengguna dapat mengatur profil, password, tema, bahasa, dan notifikasi di halaman akun.

## Instalasi dan Menjalankan Project

Pastikan sudah menginstall Node.js dan npm.

### 1. Clone repository

```bash
git clone <url-repository>
cd frontend
```

### 2. Install dependency

```bash
npm install
```

### 3. Jalankan development server

```bash
npm run dev
```

Setelah itu buka aplikasi melalui alamat yang muncul di terminal, biasanya:

```bash
http://localhost:5173
```

## Konfigurasi Environment

Buat file `.env` di root project.

```env
VITE_API_URL=http://localhost:5000
```

Jika backend sudah online, ganti nilainya menjadi URL backend production.

Contoh:

```env
VITE_API_URL=https://api-domain-kamu.com
```

Konfigurasi ini digunakan pada file:

```bash
src/api/axios.js
```

Jika `VITE_API_URL` tidak diisi, aplikasi akan menggunakan default:

```bash
http://localhost:5000
```

## Route Halaman

| Route | Halaman | Akses |
|---|---|---|
| `/` | Landing Page | Guest |
| `/login` | Login | Guest |
| `/register` | Register | Guest |
| `/forgot-password` | Forgot Password | Guest |
| `/verify-otp` | Verifikasi OTP | Guest |
| `/reset-password` | Reset Password | Guest |
| `/dashboard` | Dashboard | Login wajib |
| `/input-harian` | Input Harian | Login wajib |
| `/riwayat` | Riwayat | Login wajib |
| `/akun` | Akun | Login wajib |

Route yang membutuhkan login dilindungi oleh `ProtectedRoute`. Jika pengguna belum login, pengguna akan diarahkan ke landing page.

## Integrasi API Backend

Base URL API diatur melalui Axios instance pada file:

```bash
src/api/axios.js
```

Axios sudah memiliki interceptor untuk:

- Menambahkan header Authorization Bearer Token
- Refresh access token ketika response `401`
- Menghapus token ketika refresh token gagal

### Endpoint Auth

| Method | Endpoint | Fungsi |
|---|---|---|
| `POST` | `/register` | Register pengguna |
| `POST` | `/login` | Login pengguna |
| `GET` | `/me` | Mengambil data pengguna login |
| `PUT` | `/authentications` | Refresh access token |
| `DELETE` | `/authentications` | Logout |
| `POST` | `/forgot-password` | Meminta OTP reset password |
| `POST` | `/verify-otp` | Verifikasi OTP |
| `POST` | `/reset-password` | Reset password |
| `PUT` | `/change-password` | Mengubah password |
| `PUT` | `/me/change` | Mengubah profil |

### Endpoint Check-in

| Method | Endpoint | Fungsi |
|---|---|---|
| `POST` | `/checkins` | Menambahkan check-in harian |
| `GET` | `/checkins` | Mengambil daftar check-in |

### Endpoint Input Harian Alternatif

Beberapa file API juga menyiapkan endpoint berikut:

| Method | Endpoint | Fungsi |
|---|---|---|
| `POST` | `/api/input-harian` | Submit input harian |
| `GET` | `/api/input-harian` | Ambil input berdasarkan tanggal |
| `GET` | `/api/input-harian/riwayat` | Ambil riwayat input |

### Endpoint Dashboard

| Method | Endpoint | Fungsi |
|---|---|---|
| `GET` | `/api/dashboard` | Ambil data dashboard |
| `GET` | `/api/dashboard/chart` | Ambil chart dashboard |

### Endpoint Riwayat

| Method | Endpoint | Fungsi |
|---|---|---|
| `GET` | `/api/riwayat` | Ambil riwayat kesehatan |
| `GET` | `/api/riwayat/stats` | Ambil statistik riwayat |
| `GET` | `/api/riwayat/chart` | Ambil chart riwayat |

### Endpoint Notifikasi

| Method | Endpoint | Fungsi |
|---|---|---|
| `PUT` | `/users/fcm-token` | Menyimpan token FCM pengguna |
| `PUT` | `/users/reminder` | Mengubah jam pengingat |

## Contoh Payload Check-in Harian

```json
{
  "tidur": {
    "durasi_tidur_menit": 420,
    "sering_terbangun_malam": "Tidak",
    "mimpi_buruk": "Tidak",
    "screen_sebelum_tidur": 30
  },
  "gayaHidup": {
    "waktu_outdoor": 30,
    "minum_kopi_hari_ini": "Ya",
    "merokok": "Tidak",
    "konsumsi_alkohol": "Tidak",
    "aktivitas_hobi": "Ya"
  },
  "produktivitas": {
    "deadline_hari_ini": "Tidak",
    "lembur": "Tidak",
    "konsentrasi": 4
  },
  "mentalSosial": {
    "suasana_hati": "Positif",
    "konflik_interpersonal": "Tidak",
    "merasa_kesepian": "Tidak",
    "meditasi": "Ya",
    "interaksi_sosial": 4
  },
  "tanggal": "2026-06-04"
}
```

## Notifikasi Firebase Cloud Messaging

Aplikasi menggunakan Firebase Cloud Messaging untuk fitur pengingat input harian.

File terkait:

```bash
src/utils/fcmNotification.js
public/firebase-messaging-sw.js
src/api/notification.js
```

Alur notifikasi:

1. User mengaktifkan pengingat di halaman akun.
2. Browser meminta izin notifikasi.
3. Firebase menghasilkan FCM token.
4. Token disimpan ke `localStorage`.
5. Token dikirim ke backend melalui endpoint `/users/fcm-token`.
6. Backend dapat menggunakan token tersebut untuk mengirim notifikasi pengingat.

### Catatan Penting Firebase

File `src/utils/fcmNotification.js` masih berisi konfigurasi Firebase secara langsung di frontend. Untuk pengembangan tim, pastikan konfigurasi yang bersifat publik tetap aman digunakan dan jangan menyimpan secret backend di frontend.

File `public/firebase-messaging-sw.js` masih berisi placeholder seperti:

```js
apiKey: "ISI_API_KEY_MILIHMU"
```

Sebelum deploy, samakan konfigurasi Firebase pada service worker dengan konfigurasi project Firebase yang digunakan.

## Penyimpanan Lokal

Aplikasi menggunakan `localStorage` untuk menyimpan beberapa data sementara:

| Key | Fungsi |
|---|---|
| `accessToken` | Token akses login |
| `token` | Token akses cadangan |
| `refreshToken` | Token untuk refresh access token |
| `user` | Data user login |
| `riwayat_harian` | Cache data input/check-in harian |
| `theme` | Tema tampilan |
| `language` | Bahasa aplikasi |
| `fcmToken` | Token Firebase Cloud Messaging |
| `jam_pengingat_input` | Jam pengingat input harian |
| `pengingat_input_harian` | Status pengingat input harian |

## Build dan Deploy

### Build production

```bash
npm run build
```

Hasil build akan berada di folder:

```bash
dist/
```

### Preview build

```bash
npm run preview
```

### Deploy ke Vercel

Project sudah memiliki file `vercel.json` untuk mendukung routing SPA:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Konfigurasi ini penting agar route seperti `/dashboard`, `/riwayat`, dan `/akun` tidak error saat halaman di-refresh.

## Script NPM

| Script | Fungsi |
|---|---|
| `npm run dev` | Menjalankan development server |
| `npm run build` | Build aplikasi untuk production |
| `npm run preview` | Preview hasil build |
| `npm run lint` | Menjalankan ESLint |

## Catatan Pengembangan

Berdasarkan analisis kode, ada beberapa hal yang perlu diperhatikan:

1. **README lama masih bawaan template Vite**  
   File README sebelumnya belum menjelaskan aplikasi. File ini sudah disesuaikan dengan fitur aplikasi StressTracker AI.

2. **Endpoint check-in dan input harian masih bercampur**  
   Halaman `DailyInput.jsx`, `DashboardRekomendasi.jsx`, dan `RiwayatRekomendasi.jsx` lebih banyak memakai endpoint `/checkins`, sedangkan file `dailyInput.js`, `dashboard.js`, dan `riwayat.js` menyiapkan endpoint `/api/...`. Sebaiknya tim frontend dan backend menyepakati satu pola endpoint agar tidak membingungkan.

3. **Data masih memakai fallback localStorage**  
   Ini bagus untuk sementara agar tampilan tetap muncul, tetapi untuk production sebaiknya sumber data utama tetap dari backend.

4. **Service worker Firebase masih placeholder**  
   File `public/firebase-messaging-sw.js` perlu disesuaikan sebelum fitur notifikasi benar-benar digunakan.

5. **Konfigurasi Firebase ditulis langsung di frontend**  
   Untuk project frontend, Firebase config memang bisa berada di client, tetapi sebaiknya gunakan `.env` agar lebih rapi dan mudah diganti antar environment.

6. **Validasi password sudah diterapkan di login dan register**  
   Password harus minimal 8 karakter, mengandung huruf kapital, dan angka.

7. **Protected route sudah berjalan**  
   Halaman dashboard, input harian, riwayat, dan akun hanya bisa dibuka jika token tersedia di `localStorage`.

## Rekomendasi Pengembangan Berikutnya

- Samakan semua endpoint frontend dengan dokumentasi backend.
- Pindahkan konfigurasi Firebase ke `.env`.
- Tambahkan file `.env.example` agar anggota tim mudah setup project.
- Tambahkan loading dan error state yang konsisten di semua halaman.
- Tambahkan validasi response backend agar aplikasi tidak error ketika struktur data berubah.
- Tambahkan testing sederhana untuk form login, register, dan input harian.
- Tambahkan dokumentasi khusus untuk backend agar integrasi frontend-backend lebih jelas.

## Status Project

Frontend sudah memiliki struktur yang cukup lengkap untuk aplikasi kesehatan mental berbasis check-in harian. Aplikasi sudah siap diintegrasikan dengan backend, terutama pada bagian autentikasi, check-in harian, riwayat, profil pengguna, dan notifikasi FCM.
