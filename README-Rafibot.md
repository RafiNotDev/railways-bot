# Rafibot Management — Railway Ready

Dashboard manajemen multi-instance bot WhatsApp berbasis Node.js 20 + Express.

## Menjalankan lokal
1. Gunakan Node.js 20.
2. Jalankan `npm install --legacy-peer-deps`.
3. Jalankan `npm start`.
4. Buka `http://localhost:3000`.
5. Buat akun pertama; akun tersebut otomatis menjadi developer pemilik instalasi. Setelah itu, pengunjung dapat mendaftar sendiri dan seluruh pendaftaran publik mendapat role User.

## Role admin dan user
- Admin membuat akun baru dari menu **Manajemen Admin**, memilih role `user` atau `admin`, dan dapat menghapus akun. Pengunjung juga dapat mendaftar dari halaman login, tetapi role pendaftaran publik selalu `user`. Akun terakhir yang memiliki role admin tidak dapat dihapus.
- Admin dapat melihat, menjalankan, menghentikan, membekukan, menghapus sesi, serta menghapus seluruh bot dari semua pengguna.
- User hanya dapat membuat dan mengelola bot miliknya sendiri. User hanya dapat membuat dan mengelola bot miliknya sendiri.
- Konfigurasi bot disimpan per bot di database dashboard. Perubahan konfigurasi dipantau oleh proses bot dan diterapkan ke `global.setting`, prefix, owner, dan metadata tanpa perlu mematikan proses. Modul yang menyimpan nilai konfigurasi ke konstanta lokal saat pertama kali diimpor mungkin tetap memerlukan restart bot.

## PostgreSQL, backup, dan auto-restart
- Tambahkan Railway PostgreSQL ke project. Railway biasanya menyediakan `DATABASE_URL` otomatis saat service dihubungkan. Aplikasi menyimpan state dashboard ke PostgreSQL (JSONB) dan tetap menulis snapshot lokal sebagai fallback.
- Pasang Railway Volume ke `/app/Cache`; PostgreSQL tidak menggantikan penyimpanan file sesi WhatsApp.
- Backup sesi otomatis saat startup, setiap 6 jam, dan saat shutdown. Maksimal 14 snapshot terakhir disimpan di `Cache/Backups`; backup manual tersedia dari halaman Status & Monitoring (khusus developer).
- Bot yang dijalankan dari dashboard ditandai auto-start. Jika proses bot keluar/crash, supervisor mencoba restart dengan jeda bertahap (5 detik hingga 60 detik), maksimal 8 percobaan. Tombol Stop dan Bekukan menonaktifkan restart otomatis.
- Reconnect koneksi WhatsApp yang masih dapat dipulihkan tetap ditangani oleh handler Baileys di bot; restart supervisor berlaku ketika proses bot benar-benar keluar. Sesi yang logout tetap perlu pairing ulang.

## Status, monitoring, dan health
- `GET /api/health` (publik): health check ringan untuk Railway, status runtime, dan uptime.
- `GET /api/monitoring` (login): metrik sistem, komponen, rekomendasi otomatis, serta log error bot.
- `GET /api/recommendations` (login): rekomendasi operasional.
- Dashboard menampilkan uptime, RAM proses, CPU time, bot aktif, komponen sistem, rekomendasi, dan error terbaru; refresh otomatis tiap 10 detik.

## Deploy ke Railway
1. Push folder proyek ini ke repository GitHub milikmu.
2. Di Railway pilih **New Project → Deploy from GitHub Repo**, lalu pilih repository tersebut.
3. Hubungkan repository. Railway akan mendeteksi `Dockerfile` dan membangun image Node.js 20 dengan library native yang dibutuhkan oleh dependency proyek.
4. Tambahkan **Volume** pada service dan mount ke `/app/Cache`. Ini penting untuk mempertahankan `Cache/Database` dan `Cache/SesiBot` saat redeploy/restart.
5. Di **Settings → Networking**, buat domain publik.
6. Di Settings → Deploy, isi Healthcheck Path dengan `/api/health` dan Restart Policy dengan `ON_FAILURE`.
7. Tunggu deployment selesai. Railway akan memeriksa `/api/health`.
8. Buka domain, buat akun developer pertama, lalu uji dashboard dan pairing bot.

### Variables yang disarankan
- `NODE_ENV=production` (sudah diset di Dockerfile)
- `PORT` disediakan otomatis oleh Railway; jangan hardcode.
- `TZ=Asia/Jakarta` (sudah diset di Dockerfile).

## Catatan penting Railway & WhatsApp
- Deploy dashboard tidak otomatis menjamin bot WhatsApp dapat pairing/terhubung. Uji satu instance terlebih dahulu dan periksa log.
- WhatsApp Web/Baileys memerlukan koneksi keluar yang stabil. Hindari menjalankan banyak instance sebelum mengukur RAM.
- Jangan mengandalkan filesystem container tanpa Volume. Tanpa volume, database dan sesi dapat hilang ketika container diganti.
- Health endpoint memeriksa proses dashboard, bukan validitas sesi WhatsApp atau koneksi setiap bot.
- `CPU time` adalah akumulasi waktu CPU proses, bukan persentase CPU real-time. Metrik RAM menampilkan RSS dan heap Node.js.
- Railway deployment membutuhkan akses ke akun/proyek Railway dan repository GitHub. Paket ini sudah disiapkan, tetapi belum dipublikasikan ke akun Railway dari sesi ini.

## Keamanan
- Gunakan password unik minimal 10 karakter.
- Jangan commit `.env`, token, kredensial, atau folder `Cache`.
- Akun pertama pada instalasi kosong menjadi developer pemilik awal. Pendaftaran umum setelahnya selalu menjadi User.
- Audit source dan dependency sebelum produksi. Upload pembaruan developer hanya dari ZIP tepercaya.

## Perintah pemeriksaan
`npm run check` memeriksa sintaks file server utama.

### Uptime Kuma eksternal
- Konfigurasi Docker tersedia di `docker-compose.monitoring.yml`; panduan ada di `UPTIME-KUMA.md`.
- Jalankan Uptime Kuma pada VPS/Docker host terpisah, lalu monitor `https://DOMAIN-RAILWAY/api/health` tiap 60 detik. Ini memberi pemeriksaan independen saat Railway mengalami gangguan.

### Build & storage
- `Dockerfile` menginstal library sistem untuk `canvas`, `sharp`, dan `ffmpeg`, serta menonaktifkan unduhan Chromium otomatis Puppeteer untuk mengurangi build.
- Mount Volume pada `/app/Cache`; folder ini menyimpan database dashboard dan sesi bot.
- Railway Healthcheck hanya memverifikasi kesiapan saat deployment, bukan pemantauan terus-menerus. Monitoring dashboard tetap berjalan setelah login.


## Login, pendaftaran, dan lupa password

- Pengunjung dapat mendaftar sendiri dari halaman login. Pendaftaran publik selalu diberi role `user`.
- Akun pertama pada instalasi kosong tetap menjadi `developer` sebagai pemilik awal sistem. Setelah akun pertama dibuat, pendaftaran publik berikutnya hanya menjadi `user`.
- Role `admin` dan `developer` tidak dapat dipilih melalui form pendaftaran publik.
- Fitur **Lupa password** membuat password acak baru dan mengirimkannya ke email akun. Semua sesi aktif akun tersebut akan dicabut setelah email berhasil dikirim.
- Konfigurasikan `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, dan `SMTP_FROM` dari `.env.example`. Untuk Gmail gunakan App Password, bukan password login Gmail biasa.
- Jika SMTP belum dikonfigurasi, endpoint reset mengembalikan pesan konfigurasi SMTP dan tidak mengubah password akun.
