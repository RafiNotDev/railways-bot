# Monitoring eksternal dengan Uptime Kuma

Uptime Kuma adalah layanan monitoring eksternal opsional. Jalankan pada VPS/Docker host terpisah dari aplikasi Rafibot agar tetap bisa memeriksa aplikasi ketika Railway sedang tidak tersedia.

## Menjalankan

```bash
docker compose -f docker-compose.monitoring.yml up -d
```

Buka `http://IP-SERVER:3001`, buat akun admin, lalu tambahkan monitor:

- **Monitor Type:** HTTP(s)
- **Friendly Name:** Rafibot Railway Health
- **URL:** `https://DOMAIN-RAILWAY/api/health`
- **Heartbeat Interval:** 60 seconds
- **Retries:** 3
- **Accepted Status Codes:** 200

Opsional tambahkan monitor kedua untuk halaman utama `https://DOMAIN-RAILWAY/`. Jangan menaruh Uptime Kuma pada service/instance Railway yang sama jika tujuan utamanya adalah mendeteksi outage Railway secara independen. Amankan port 3001 dengan firewall/reverse proxy dan HTTPS; jangan mengekspos dashboard admin tanpa autentikasi.
