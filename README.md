# Mailer (Express + Nodemailer + Mailgen)

Proyek ini adalah boilerplate backend Node.js (Express) untuk mengirim email. Dibuat sebagai tugas mata kuliah Pemrograman Jaringan (minggu 13) untuk menunjukkan dua mode pengiriman email:

-   Pengujian: menggunakan Ethereal (akun SMTP sementara) untuk pengujian tanpa risiko spam.
-   Produksi: menggunakan Gmail lewat App Password (Sandi Aplikasi) Google untuk konfigurasi aman.

Fitur:

-   Integrasi Nodemailer untuk SMTP.
-   Template HTML email menggunakan Mailgen.
-   Contoh konfigurasi untuk Ethereal dan Gmail App Password.

## Mailer (Express + Nodemailer + Mailgen)

Mailer adalah sebuah aplikasi backend sederhana menggunakan Express yang menunjukkan cara mengirim email dari server Node.js. Proyek ini dibuat sebagai contoh praktis yang memperlihatkan dua skenario: pengujian pengiriman email secara lokal menggunakan akun Ethereal yang dihasilkan secara programatik dan pengiriman lewat SMTP nyata (misalnya Gmail App Password) untuk lingkungan produksi. Tujuannya adalah menyediakan contoh yang mudah diikuti, sehingga Anda bisa mengirim email berformat HTML yang dihasilkan oleh Mailgen dari endpoint HTTP yang sederhana.

Sebelum menjalankan aplikasi pastikan Node.js dan npm sudah terpasang pada mesin Anda. Dependensi utama proyek ini adalah Express untuk server HTTP, Nodemailer untuk pengiriman email, dan Mailgen untuk membuat konten email HTML yang konsisten. Untuk konfigurasi produksi Anda dapat menyimpan kredensial SMTP di `env.js` atau di file environment yang tidak di-commit, tetapi untuk pengujian (development) aplikasi juga menyediakan cara menggunakan Ethereal agar Anda mendapatkan preview URL tanpa perlu kredensial nyata.

### Persyaratan

Proyek ini hanya membutuhkan Node.js (versi modern, misal 14+) dan akses internet jika Anda mengirim lewat SMTP eksternal seperti Gmail. Pastikan juga port yang digunakan (default 5000) tidak diblokir pada mesin Anda.

### Instalasi dan pengaturan cepat

Clone repository dan pasang dependensi. Berikut perintah yang bisa Anda copy-paste langsung ke terminal (fish shell):

```bash
# clone (jika belum)
git clone https://github.com/Nyot-Nyot/mailer.git
cd mailer

# pasang dependensi
npm install
```

### Konfigurasi kredensial

Untuk pengujian lokal tidak wajib menambahkan kredensial karena fungsi signup pada project ini membuat akun Ethereal sementara secara otomatis. Jika Anda ingin mengirim email lewat SMTP nyata (misal Gmail) buat konfigurasi di `env.js` atau di sistem environment Anda. Contoh isi `env.js` atau variabel environment yang diperlukan adalah `EMAIL` dan `PASSWORD`.

contoh `env.js`:

```js
module.exports = {
	EMAIL: "emailAnda@gmail.com",
	PASSWORD: "appPasswordAnda",
};
```

### Menjalankan server

Setelah dependensi terpasang jalankan server dengan perintah berikut (fish shell):

```bash
# jalankan server
npm start
```

### Endpoint utama

Server mengekspos rute API di bawah prefix `/api`. Dua endpoint yang disediakan oleh kode contoh ini adalah `/api/user/signup` untuk demonstrasi pembuatan akun pengujian dan pengiriman email melalui Ethereal, serta `/api/product/getBill` yang menghasilkan faktur (bill) dalam bentuk email HTML dan mencoba mengirimkannya ke alamat yang Anda berikan.

### Panduan testing cepat

Langkah paling langsung untuk menguji endpoint adalah menjalankan dua perintah curl ini di terminal Anda. Perintah pertama menguji endpoint signup (menggunakan Ethereal test account dan mengembalikan preview URL), sedangkan perintah kedua mengirim email bill ke alamat yang Anda tentukan. Salin dan jalankan baris berikut di terminal (fish shell). Pastikan server sedang berjalan sebelum mengeksekusi.

```bash
# Test signup (menggunakan Ethereal; response akan menyertakan previewURL)
curl -i -X POST http://localhost:5000/api/user/signup \
    -H 'Content-Type: application/json' -d '{}'

# Test getBill (ganti recipient@example.com dengan alamat tujuan Anda)
curl -i -X POST http://localhost:5000/api/product/getBill \
    -H 'Content-Type: application/json' -d '{"userEmail":"recipient@example.com"}'
```

#### /api/user/signup

![user signup test](/assets/user-signup-test.png)

#### /api/product/getBill

![get bill test](/assets/product-email-test.png)
