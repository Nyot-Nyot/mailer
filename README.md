# Mailer (Express + Nodemailer + Mailgen)

Proyek ini adalah boilerplate backend Node.js (Express) untuk mengirim email. Dibuat sebagai tugas mata kuliah Pemrograman Jaringan (minggu 13) untuk menunjukkan dua mode pengiriman email:

-   Pengujian: menggunakan Ethereal (akun SMTP sementara) untuk pengujian tanpa risiko spam.
-   Produksi: menggunakan Gmail lewat App Password (Sandi Aplikasi) Google untuk konfigurasi aman.

Fitur:

-   Integrasi Nodemailer untuk SMTP.
-   Template HTML email menggunakan Mailgen.
-   Contoh konfigurasi untuk Ethereal dan Gmail App Password.

Cara pakai (singkat):

1. Clone repo ini (atau gunakan repository yang telah dibuat otomatis):

    git clone https://github.com/Nyot-Nyot/mailer.git

2. Pasang dependensi:

```bash
# fish shell
npm install
```

3. Environment variables yang direkomendasikan:

-   Untuk Ethereal (testing), Anda bisa membuat akun Ethereal secara programatik dari code (contoh tersedia) dan tidak perlu menyimpan kredensial.
-   Untuk Gmail (produksi), buat App Password di Google Account Anda dan simpan di file `.env` atau secret manager:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your.email@gmail.com
SMTP_PASS=your_google_app_password
```

Catatan keamanan: jangan pernah commit App Password atau kredensial nyata ke repository publik.

4. Struktur yang diharapkan (boilerplate):

-   `index.js` / `src/` - entry Express
-   `services/mail.js` - wrapper Nodemailer + generator Mailgen
-   `templates/` - template email (mailgen config)
