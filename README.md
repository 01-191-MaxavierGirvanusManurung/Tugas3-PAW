# 🔍 Product Review Analyzer

Aplikasi web full-stack yang menganalisis ulasan produk menggunakan analisis sentimen dan ekstraksi poin-poin kunci berbasis AI. Dibangun dengan Flask, React, PostgreSQL, Hugging Face Transformers, dan Google Gemini.

## ✨ Fitur Utama

- **Analisis Sentimen**: Menganalisis sentimen ulasan (positif/negatif/netral) menggunakan model DistilBERT dari Hugging Face
- **Ekstraksi Poin Kunci**: Mengekstrak insight penting dari ulasan menggunakan Google Gemini AI
- **Input Nama Produk**: Kolom untuk memasukkan nama produk yang diulas
- **Manajemen Review**: Menyimpan dan melihat semua ulasan yang telah dianalisis
- **UI Modern**: Interface React yang cantik dan responsif dengan tema warna cyan
- **RESTful API**: Backend terstruktur dengan endpoint yang jelas
- **Integrasi Database**: Penyimpanan persisten menggunakan PostgreSQL

## 🏗️ Struktur Proyek

```
Tugas3/
├── backend/
│   ├── app.py              # Aplikasi Flask utama
│   ├── requirements.txt    # Dependensi Python
│   ├── .env.example        # Template environment variables
│   └── .gitignore
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── ReviewForm.js       # Form input review
    │   │   ├── ReviewForm.css
    │   │   ├── ReviewResult.js     # Tampilan hasil analisis
    │   │   ├── ReviewResult.css
    │   │   ├── ReviewsList.js      # Daftar history review
    │   │   └── ReviewsList.css
    │   ├── App.js
    │   ├── App.css
    │   ├── index.js
    │   └── index.css
    ├── package.json
    └── .gitignore
```

## 🚀 Cara Memulai

### Prasyarat

- Python 3.8+
- Node.js 16+ dan npm
- PostgreSQL 12+
- Gemini API Key (Dapatkan dari [Google AI Studio](https://makersuite.google.com/app/apikey))

### Setup Backend

1. **Navigasi ke direktori backend**:
   ```powershell
   cd backend
   ```

2. **Buat dan aktifkan virtual environment**:
   ```powershell
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   ```

3. **Install dependensi**:
   ```powershell
   pip install -r requirements.txt
   ```

4. **Setup database PostgreSQL**:
   ```powershell
   # Koneksi ke PostgreSQL
   psql -U postgres
   
   # Buat database
   CREATE DATABASE product_reviews;
   
   # Keluar dari psql
   \q
   ```

5. **Konfigurasi environment variables**:
   ```powershell
   # Copy file example
   cp .env.example .env
   
   # Edit file .env dengan nilai Anda:
   # DATABASE_URL=postgresql://postgres:password_anda@localhost:5432/product_reviews
   # GEMINI_API_KEY=api_key_gemini_anda
   ```

6. **Jalankan server backend**:
   ```powershell
   python app.py
   ```

   Backend akan berjalan di `http://localhost:5000`

### Setup Frontend

1. **Buka terminal baru dan navigasi ke direktori frontend**:
   ```powershell
   cd frontend
   ```

2. **Install dependensi**:
   ```powershell
   npm install
   ```

3. **Jalankan development server**:
   ```powershell
   npm start
   ```

   Frontend akan otomatis terbuka di `http://localhost:3000`

## 📡 API Endpoints

### 1. Analisis Review
```http
POST /api/analyze-review
Content-Type: application/json

{
  "product_name": "iPhone 15 Pro",
  "review_text": "Produk ini luar biasa! Kualitas bagus dan pengiriman cepat."
}
```

```json
{
  "success": true,
  "data": {
    "id": 1,
    "product_name": "iPhone 15 Pro",
    "review_text": "Produk ini luar biasa! Kualitas bagus dan pengiriman cepat.",
    "sentiment": "positive",
    "sentiment_score": 0.9998,
    "key_points": "- Kualitas produk tinggi\n- Layanan pengiriman cepat\n- Kepuasan keseluruhan tinggi",
    "created_at": "2025-12-12T10:30:00"
  }
}
```

### 2. Ambil Semua Review
### 2. Get All Reviews
```http
GET /api/reviews?page=1&per_page=10
```
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "product_name": "iPhone 15 Pro",
      "review_text": "Produk ini luar biasa!...",
      "sentiment": "positive",
      "sentiment_score": 0.9998,
      "key_points": "- Kualitas produk tinggi...",
      "created_at": "2025-12-12T10:30:00"
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 10,
    "total": 1,
    "pages": 1
  }
}
```

### 3. Cek Status Server

### 3. Health Check
```http
GET /api/health
```

**Response**:
```json
{
  "status": "healthy",
  "sentiment_analyzer": true,
  "gemini_configured": true
}
```

## 🛠️ Teknologi yang Digunakan

### Backend
- **Flask**: Framework web Python
- **Flask-CORS**: Menangani Cross-Origin Resource Sharing
- **Flask-SQLAlchemy**: ORM untuk operasi database
- **PostgreSQL**: Database relasional
- **Hugging Face Transformers**: Model analisis sentimen (DistilBERT)
- **Google Gemini AI**: Ekstraksi poin-poin kunci
- **python-dotenv**: Manajemen environment variables

### Frontend
- **React**: Library UI JavaScript
- **Axios**: HTTP client untuk API calls
- **CSS3**: Styling dengan desain modern tema cyan
- **Axios**: HTTP client
- **CSS3**: Styling with modern design
## 📊 Skema Database

### Tabel Reviews
| Kolom | Tipe | Deskripsi |
|-------|------|-----------|
| id | INTEGER | Primary key |
| product_name | VARCHAR(255) | Nama produk yang diulas |
| review_text | TEXT | Teks ulasan asli |
| sentiment | VARCHAR(20) | Label sentimen (positive/negative/neutral) |
| sentiment_score | FLOAT | Skor kepercayaan (0-1) |
| key_points | TEXT | Poin-poin kunci yang diekstrak |
| created_at | DATETIME | Timestamp pembuatan |oints |
## 🎨 Fitur Detail

### 1. Form Input Review
- Input field untuk nama produk
- Textarea untuk memasukkan ulasan produk
- Penghitung karakter
- Validasi minimum 10 karakter
- Loading state selama analisis
- Form reset otomatis setelah submit

### 2. Tampilan Hasil Analisis
- Badge sentimen dengan emoji dan kode warna cyan
- Persentase skor kepercayaan
- Poin-poin kunci dalam format bullet
- Tampilan teks ulasan asli
- Timestamp analisis

### 3. Riwayat Review
- Layout grid untuk semua review yang dianalisis
- Indikator sentimen dengan warna
- Cuplikan review (dipotong)
- Preview poin-poin kunci
- Dukungan pagination
- Fungsi refresh

### 4. Penanganan Error
- Validasi input
- Pesan error dari API
- Loading states
- Error koneksi database
- Error layanan AI
- Database connection errors
## 🔧 Konfigurasi

### Konfigurasi Database
Edit file `backend/.env`:

```env
DATABASE_URL=postgresql://username:password@host:port/database_name
```

### Gemini API Key
Dapatkan API key Anda dari [Google AI Studio](https://makersuite.google.com/app/apikey) dan tambahkan ke `backend/.env`:
```env
GEMINI_API_KEY=api_key_anda_disini
```

## 📝 Contoh Penggunaan

1. Buka aplikasi di `http://localhost:3000`
2. Masukkan nama produk (contoh: "iPhone 15 Pro")
3. Masukkan ulasan produk di text area
4. Klik "Analyze Review"
5. Lihat hasil analisis sentimen dan poin-poin kunci
6. Pindah ke tab "Review History" untuk melihat semua review
7. Klik "Refresh" untuk memperbarui daftary points
## 🐛 Troubleshooting

### Masalah Backend

**Masalah**: ModuleNotFoundError
```powershell
# Solusi: Aktifkan virtual environment dan reinstall
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

**Masalah**: Error koneksi database
```powershell
# Solusi: Cek apakah PostgreSQL berjalan
Get-Service -Name postgresql*

# Cek database sudah ada
psql -U postgres -l
```

**Masalah**: Download model Hugging Face lambat
- Pada run pertama akan mendownload model analisis sentimen (~250MB)
- Run selanjutnya akan menggunakan cached model

### Masalah Frontend

**Masalah**: npm install gagal
```powershell
# Solusi: Hapus cache dan reinstall
npm cache clean --force
rm -r node_modules
npm install
```

**Masalah**: Proxy error / Backend tidak terjangkau
- Pastikan backend berjalan di port 5000
- Cek setting proxy di `package.json`: `"proxy": "http://localhost:5000"`
**Problem**: Proxy error / Backend not reachable
## 🔒 Catatan Keamanan

- Jangan pernah commit file `.env` ke version control
- Gunakan environment variables untuk data sensitif
- Implementasi rate limiting untuk production
- Tambahkan autentikasi untuk penggunaan production
- Sanitasi input pengguna
- Gunakan HTTPS di production

## 📈 Pengembangan Kedepan

- [ ] Autentikasi dan otorisasi user
- [ ] Filtering dan pencarian lanjutan
- [ ] Export review ke CSV/PDF
- [ ] Analisis review secara batch
- [ ] Chart trend sentimen
- [ ] Dukungan multi-bahasa
- [ ] Kategorisasi review
- [ ] API rate limiting
- [ ] Caching layer
- [ ] Containerisasi Docker

## 📄 Lisensi

Proyek ini dibuat untuk tujuan edukasi sebagai bagian dari mata kuliah Pemrograman Web.

## 👨‍💻 Pembuat

**Maxavier Girvanus Manurung**  
**NIM: 01-191**  
Tugas 3 - Pemrograman Aplikasi Web

## 🙏 Acknowledgments

- [Hugging Face](https://huggingface.co/) untuk model analisis sentimen
- [Google Gemini](https://ai.google.dev/) untuk analisis teks berbasis AI
- [Flask](https://flask.palletsprojects.com/) untuk backend framework
- [React](https://react.dev/) untuk frontend library
- [PostgreSQL](https://www.postgresql.org/) untuk database

## 📸 Screenshot

### Halaman Analyze Review
Tampilan form input dengan tema cyan untuk menganalisis review produk.

### Halaman Review History
Tampilan grid menampilkan semua review yang telah dianalisis dengan indikator sentimen.

---

## 📌 Catatan Penting

**Aplikasi ini memerlukan koneksi internet aktif untuk:**
- Download pertama kali model Hugging Face
- API calls ke Google Gemini untuk ekstraksi poin kunci

**Untuk pertanyaan atau masalah:**
- Lihat bagian troubleshooting di atas
- Cek status server di `http://localhost:5000/api/health`

## 🚀 Repository

GitHub: [https://github.com/01-191-MaxavierGirvanusManurung/Tugas3-PAW](https://github.com/01-191-MaxavierGirvanusManurung/Tugas3-PAW) troubleshooting section or check the API health endpoint at `http://localhost:5000/api/health`.
=======
# Tugas3-PAW
>>>>>>> 97f4b51131093a706fbc1e7f56c57e56d092c22c
