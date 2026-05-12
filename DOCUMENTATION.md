# 📘 Dokumentasi Lengkap — Portfolio Rommy Sulistio

> **Versi**: 0.0.1  
> **Terakhir diperbarui**: 11 Mei 2026  
> **URL Produksi**: [portofolio-liard-zeta.vercel.app](https://portofolio-liard-zeta.vercel.app/)  
> **Domain Kustom**: rommysulistio.my.id  
> **Repository**: [github.com/sulistiorommy/portofolio](https://github.com/sulistiorommy/portofolio)

---

## Daftar Isi

1. [Ringkasan Proyek](#1-ringkasan-proyek)
2. [Tech Stack](#2-tech-stack)
3. [Struktur Direktori](#3-struktur-direktori)
4. [Arsitektur Aplikasi](#4-arsitektur-aplikasi)
5. [Routing & Navigasi](#5-routing--navigasi)
6. [Halaman (Pages)](#6-halaman-pages)
7. [Integrasi API](#7-integrasi-api)
8. [Sistem Bahasa (i18n)](#8-sistem-bahasa-i18n)
9. [Tema (Dark/Light Mode)](#9-tema-darklight-mode)
10. [Environment Variables](#10-environment-variables)
11. [Cara Menjalankan (Development)](#11-cara-menjalankan-development)
12. [Deployment (Vercel)](#12-deployment-vercel)
13. [Alur Data (Data Flow)](#13-alur-data-data-flow)
14. [Troubleshooting](#14-troubleshooting)
15. [Catatan Pengembangan](#15-catatan-pengembangan)

---

## 1. Ringkasan Proyek

Website portfolio interaktif yang menampilkan profil profesional, proyek, sertifikat, dan dashboard analitik real-time. Dibangun sebagai Single Page Application (SPA) menggunakan React dan Vite.

### Fitur Utama
- 🏠 Landing page dengan profil dan statistik
- 👤 Halaman About dengan skill, pengalaman kerja, dan pendidikan
- 🏆 Galeri sertifikat interaktif
- 📁 Showcase proyek dengan detail dialog
- 📊 Dashboard analitik (GitHub, WakaTime, Umami)
- ✉️ Form kontak terintegrasi Formspree
- 🌍 Multi-bahasa (Indonesia / English)
- 🌙 Dark / Light mode
- 📱 Fully responsive (mobile, tablet, desktop)

---

## 2. Tech Stack

### Core
| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| React | 18.3.1 | UI Library |
| Vite | 6.3.5 | Build tool & dev server |
| TypeScript | (via Vite) | Type safety |
| React Router | 7.13.0 | Client-side routing (SPA) |

### Styling
| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| Tailwind CSS | 4.1.12 | Utility-first CSS framework |
| tw-animate-css | 1.3.8 | Animasi Tailwind |

### UI Components
| Teknologi | Fungsi |
|-----------|--------|
| Radix UI | Headless UI primitives (Dialog, Switch, Slot, dll.) |
| Lucide React | Icon library |
| Recharts | Grafik & chart di Dashboard |
| Framer Motion | Animasi komponen |
| react-github-calendar | Contribution heatmap GitHub |

### API Integrations
| Service | Fungsi |
|---------|--------|
| GitHub API | Profil, repo, commit activity |
| WakaTime API | Statistik coding (bahasa, editor, waktu) |
| Umami API | Analitik pengunjung website |
| Formspree | Pengiriman form kontak |

### Deployment
| Teknologi | Fungsi |
|-----------|--------|
| Vercel | Hosting & CDN |
| Umami Cloud | Tracking analytics |

---

## 3. Struktur Direktori

```
portofolio/
├── public/                     # Aset statis (langsung diakses browser)
│   ├── certificates/           # Gambar sertifikat
│   ├── img/                    # Foto profil & aset gambar
│   ├── project/                # Screenshot proyek
│   └── cv-rommy-sulistio.pdf   # File CV downloadable
│
├── src/
│   ├── main.tsx                # Entry point React
│   ├── styles/
│   │   ├── index.css           # Import utama (fonts + tailwind + theme)
│   │   ├── fonts.css           # Custom font imports
│   │   ├── tailwind.css        # Tailwind v4 config
│   │   └── theme.css           # CSS variables (warna, radius, dark mode)
│   │
│   └── app/
│       ├── App.tsx             # Root component (Provider + Router)
│       ├── routes.tsx          # Definisi semua route + lazy loading
│       │
│       ├── context/
│       │   ├── AppContext.tsx   # Global state (bahasa, tema)
│       │   └── translations.ts # Semua teks i18n (ID & EN)
│       │
│       ├── layout/
│       │   └── Root.tsx        # Layout utama (sidebar + outlet)
│       │
│       ├── pages/
│       │   ├── Home.tsx        # Landing page
│       │   ├── About.tsx       # Profil, skill, experience, education
│       │   ├── Achievements.tsx# Galeri sertifikat
│       │   ├── Project.tsx     # Showcase proyek
│       │   ├── Dashboard.tsx   # Analytics dashboard
│       │   └── Contact.tsx     # Form kontak
│       │
│       ├── services/
│       │   ├── types.ts        # TypeScript interfaces untuk semua API
│       │   ├── GitHubService.ts
│       │   ├── WakaTimeService.ts
│       │   └── UmamiService.ts
│       │
│       └── components/
│           ├── TechIcons.tsx   # SVG icon untuk tech stack
│           ├── figma/
│           │   └── ImageWithFallback.tsx  # Image + error fallback
│           └── ui/             # 48 Radix/shadcn UI components
│               ├── dialog.tsx
│               ├── badge.tsx
│               ├── button.tsx
│               ├── card.tsx
│               ├── chart.tsx
│               └── ... (44 lainnya)
│
├── index.html                  # HTML entry point + Umami script
├── package.json
├── vite.config.ts              # Vite + proxy WakaTime
├── vercel.json                 # Vercel rewrite rules
├── postcss.config.mjs
├── .env                        # API keys (JANGAN di-commit!)
└── .env.example                # Template environment variables
```

---

## 4. Arsitektur Aplikasi

```
┌─────────────────────────────────────────────────┐
│                    index.html                    │
│  (Umami tracking script + React root element)    │
└──────────────────────┬──────────────────────────┘
                       │
                  ┌────▼────┐
                  │ main.tsx │  Entry point
                  └────┬────┘
                       │
                  ┌────▼────┐
                  │ App.tsx  │  AppProvider (context) + RouterProvider
                  └────┬────┘
                       │
              ┌────────▼────────┐
              │   AppContext     │  State: language, theme
              │   translations   │  Data: semua teks i18n
              └────────┬────────┘
                       │
              ┌────────▼────────┐
              │   Root.tsx       │  Layout: sidebar + <Outlet />
              └────────┬────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
   ┌────▼───┐    ┌────▼────┐   ┌────▼──────┐
   │ Home   │    │ About   │   │ Dashboard │  ... (6 pages)
   └────────┘    └─────────┘   └─────┬─────┘
                                     │
                          ┌──────────┼──────────┐
                          │          │          │
                     ┌────▼───┐ ┌───▼────┐ ┌──▼────┐
                     │ GitHub │ │ Waka   │ │ Umami │
                     │Service │ │Service │ │Service│
                     └────────┘ └────────┘ └───────┘
```

### Alur Render
1. `index.html` → memuat `main.tsx`
2. `main.tsx` → render `<App />`
3. `App.tsx` → wrap dengan `AppProvider` (context) + `RouterProvider` (routing)
4. `RouterProvider` → match URL → render `Root` layout + halaman yang sesuai
5. `Root.tsx` → render sidebar + `<Outlet />` (konten halaman)

---

## 5. Routing & Navigasi

Menggunakan **React Router v7** dengan `createBrowserRouter`.

| Path | Halaman | Loading |
|------|---------|---------|
| `/` | Home | Eager (langsung dimuat) |
| `/about` | About | Lazy (dimuat saat diakses) |
| `/achievements` | Achievements | Lazy |
| `/project` | Project | Lazy |
| `/dashboard` | Dashboard | Lazy |
| `/contact` | Contact | Lazy |

### Code Splitting (Lazy Loading)
Semua halaman kecuali Home menggunakan `React.lazy()` + `Suspense`:
- Halaman dimuat **on-demand** saat user navigasi
- Mengurangi initial bundle dari **933 KB → 274 KB** (↓71%)
- Loading spinner ditampilkan saat chunk sedang dimuat

### SPA Fallback
- **Development**: Vite dev server otomatis menangani SPA routing
- **Production (Vercel)**: `vercel.json` memiliki rewrite `/(.*) → /index.html`

---

## 6. Halaman (Pages)

### 6.1 Home (`/`)
- Hero section dengan nama, role, dan deskripsi
- 3 tombol CTA: Lihat Proyek, Download CV, Kontak
- Statistik: total proyek, selesai, berjalan
- Semua teks mendukung i18n

### 6.2 About (`/about`)
- **Paragraf profil** — deskripsi diri lengkap
- **Skills** — 11 teknologi dengan filter kategori (Frontend, Backend, Database, Tools)
- **Pengalaman Kerja** — timeline 2 posisi dengan deskripsi tugas
- **Pendidikan** — sarjana psikologi, belajar otodidak, kursus online
- Icon tech stack diambil dari `TechIcons.tsx`

### 6.3 Achievements (`/achievements`)
- Grid sertifikat dengan gambar dari `/public/certificates/`
- 6 sertifikat (Dicoding & kursus lainnya)
- Setiap item menampilkan judul dan deskripsi (i18n)

### 6.4 Project (`/project`)
- Grid 3 proyek dengan gambar, tags, dan link
- **Dialog detail** dengan deskripsi, fitur utama, dan teknologi
- Handle kasus proyek "private" (link diganti badge)
- Data proyek didefinisikan sebagai konstanta `PROJECTS` di dalam file

### 6.5 Dashboard (`/dashboard`)
Halaman paling kompleks — mengambil data dari 3 API sekaligus:

#### Umami Web Analytics
- 4 stat card: Total Visits, Page Views, Avg. Visit Time, Events (30 hari)
- Visit History chart (7 hari / 12 bulan toggle)
- Visitor Locations (negara)
- Top Pages & Top Referrers

#### GitHub
- Profil card (avatar, bio, followers)
- Contribution Board (heatmap 365 hari)
- Commit Activity bar chart (7 hari)
- Productivity Insights (status berdasarkan commit)
- Recent Commit Logs
- Total Stars counter

#### WakaTime
- Total coding time & daily average
- Activity chart (jam per hari, 7 hari)
- Top Languages pie distribution
- Top Editors

### 6.6 Contact (`/contact`)
- Form dengan 3 field: Nama, Email, Pesan
- Submit via **Formspree** (no backend needed)
- Success/error state handling
- Info kontak: WhatsApp, LinkedIn, Lokasi

---

## 7. Integrasi API

### 7.1 GitHub API (`GitHubService.ts`)

| Method | Endpoint | Return |
|--------|----------|--------|
| `getUserProfile()` | `GET /users/{username}` | Profil (nama, bio, avatar, repos, followers) |
| `getUserRepos()` | `GET /users/{username}/repos` | Daftar repo (untuk hitung total stars) |
| `getCommitActivity()` | `GET /search/commits` | Commit per hari (7 hari terakhir) |
| `getRecentCommits(limit)` | `GET /search/commits` | Log commit terbaru |

**Auth**: `Authorization: Bearer {VITE_GITHUB_TOKEN}`  
**Rate Limit**: 30 req/min (authenticated)

### 7.2 WakaTime API (`WakaTimeService.ts`)

| Method | Endpoint | Return |
|--------|----------|--------|
| `getStats()` | `GET /users/current/summaries?range=last_7_days` | Total waktu, bahasa, editor, aktivitas harian |

**Auth**: `Authorization: Basic {base64(apikey:)}`  
**Proxy**: Harus melalui proxy karena CORS:
- **Dev**: Vite proxy `/api/wakatime → wakatime.com/api/v1`
- **Prod**: Vercel rewrite di `vercel.json`

**Fallback**: Jika API gagal, menampilkan mock data

### 7.3 Umami API (`UmamiService.ts`)

| Method | Endpoint | Return |
|--------|----------|--------|
| `getStats()` | `GET /v1/websites/{id}/stats` | Visitors, pageviews, sessions, events (30 hari) |
| `getLocations()` | `GET /v1/websites/{id}/metrics?type=country` | Negara pengunjung (7 hari) |
| `getChartData(view)` | `GET /v1/websites/{id}/pageviews` | Data chart (7d/12m) |
| `getMetrics(type)` | `GET /v1/websites/{id}/metrics` | URL, referrer, browser, dll. (7 hari) |

**Auth**: Header `x-umami-api-key: {VITE_UMAMI_API_KEY}`  
**Base URL**: `https://api.umami.is` (untuk REST API)  
**Tracking Script**: `https://cloud.umami.is/script.js` (di `index.html`)

> ⚠️ **PENTING**: URL tracking script dan REST API **berbeda**!
> - Tracking: `cloud.umami.is/script.js`
> - API: `api.umami.is/v1/...`

### 7.4 Formspree (Contact Form)
- Endpoint: `https://formspree.io/f/{VITE_FORMSPREE_ID}`
- Method: POST dengan JSON body
- Tidak perlu backend sendiri

### Error Handling Strategy
Dashboard menggunakan `Promise.allSettled` — jika satu API gagal, yang lain tetap tampil:
```
Promise.allSettled([
  GitHubService.getUserProfile(),    // gagal? → profile = null
  WakaTimeService.getStats(),        // gagal? → mock data
  UmamiService.getStats(),           // gagal? → stats kosong
  ...
])
```

---

## 8. Sistem Bahasa (i18n)

### Arsitektur
- State `language` disimpan di `AppContext` (`'id'` | `'en'`)
- Semua teks ada di `translations.ts` sebagai key-value pairs
- Fungsi `t(key)` mengembalikan teks sesuai bahasa aktif
- Toggle bahasa di sidebar (Switch ID ↔ EN)

### Cara Menambah Teks Baru
1. Buka `src/app/context/translations.ts`
2. Tambahkan key baru di **kedua** objek `id` dan `en`:
```typescript
id: {
  my_new_key: "Teks dalam Bahasa Indonesia",
},
en: {
  my_new_key: "Text in English",
}
```
3. Gunakan di komponen: `{t('my_new_key')}`

### Cakupan i18n
- ✅ Navigasi (sidebar menu)
- ✅ Home (greeting, role, welcome, stats)
- ✅ About (profil, pengalaman, pendidikan)
- ✅ Achievements (judul & deskripsi sertifikat)
- ✅ Project (deskripsi, fitur, teknologi, label dialog)
- ✅ Contact (label, placeholder, tombol, pesan)
- ⚠️ Dashboard (hanya header/title, label chart dalam Bahasa Inggris)

---

## 9. Tema (Dark/Light Mode)

### Cara Kerja
1. State `theme` di `AppContext` (`'light'` | `'dark'`)
2. Saat toggle, class `dark` ditambahkan/dihapus di `<html>`
3. CSS variables di `theme.css` mendefinisikan 2 set warna:
   - `:root` → warna light mode
   - `.dark` → warna dark mode
4. Tailwind `dark:` prefix menggunakan `@custom-variant dark (&:is(.dark *))` 

### Palet Warna Utama
| Variable | Light | Dark |
|----------|-------|------|
| `--background` | `#ffffff` | `oklch(0.145 0 0)` |
| `--foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` |
| `--primary` | `#030213` | `oklch(0.985 0 0)` |
| `--accent` | `#e9ebef` | `oklch(0.269 0 0)` |

---

## 10. Environment Variables

File `.env` diperlukan di root project. **Jangan commit file ini!**

```bash
# GitHub API Token (Personal Access Token)
# Buat di: https://github.com/settings/tokens
VITE_GITHUB_TOKEN=github_pat_xxxxx

# WakaTime API Key
# Ambil di: https://wakatime.com/settings/api-key
VITE_WAKATIME_API_KEY=waka_xxxxx

# Formspree ID (untuk contact form)
# Daftar di: https://formspree.io
VITE_FORMSPREE_ID=xxxxx

# Umami Analytics
# Dashboard: https://cloud.umami.is
VITE_UMAMI_WEBSITE_ID=xxxxx
VITE_UMAMI_API_KEY=api_xxxxx
VITE_UMAMI_SERVER_URL=https://api.umami.is
```

### Cara Membuat API Key

| Service | Langkah |
|---------|---------|
| **GitHub** | Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate |
| **WakaTime** | Settings → API Key → Copy |
| **Formspree** | Buat form baru → Copy form ID dari URL |
| **Umami** | Settings → API Keys → Create API key; Website → Settings → Copy Website ID |

> ⚠️ GitHub token bisa expired. Jika Dashboard menampilkan profil kosong, regenerate token baru.

---

## 11. Cara Menjalankan (Development)

### Prerequisites
- Node.js ≥ 18
- npm atau pnpm

### Setup
```bash
# Clone repository
git clone https://github.com/sulistiorommy/portofolio.git
cd portofolio

# Install dependencies
npm install

# Salin dan isi environment variables
cp .env.example .env
# Edit .env → isi semua API key

# Jalankan development server
npm run dev
```

Server berjalan di `http://localhost:5173`

### Build Production
```bash
# Jika terjadi out-of-memory saat build:
# Windows PowerShell:
$env:NODE_OPTIONS="--max-old-space-size=4096"

# Lalu build:
npm run build
```

Hasil build ada di folder `dist/`.

---

## 12. Deployment (Vercel)

### Konfigurasi
File `vercel.json` mengatur 2 rewrite rule:

1. **WakaTime Proxy**: `/api/wakatime/*` → `wakatime.com/api/v1/*`  
   (menghindari CORS di production)
2. **SPA Fallback**: `/*` → `/index.html`  
   (agar semua route ditangani React Router)

### Deploy
1. Push ke GitHub
2. Vercel auto-deploy dari branch `main`
3. Set environment variables di Vercel Dashboard → Settings → Environment Variables

### Domain
- Default: `portofolio-liard-zeta.vercel.app`
- Custom: `rommysulistio.my.id` (dikonfigurasi di Vercel + Umami)

---

## 13. Alur Data (Data Flow)

### Rendering Flow
```
User buka URL
  → React Router match route
    → Lazy load page chunk (jika belum dimuat)
      → Render Root layout (sidebar)
        → Render page component di <Outlet />
          → Page memanggil t() untuk teks i18n
          → Page memanggil service untuk data API (khusus Dashboard)
```

### Dashboard Data Flow
```
Dashboard mount
  → useEffect trigger fetchData()
    → Promise.allSettled([10 API calls])
      → Setiap call yang berhasil → setState dengan data
      → Setiap call yang gagal → setState dengan fallback/kosong
        → console.warn (tidak crash)
    → setLoading(false)
      → Render semua section dengan data yang tersedia
```

### State Management
```
AppContext (global)
├── language: 'id' | 'en'     ← toggle di sidebar
├── theme: 'light' | 'dark'   ← toggle di sidebar
└── t(key): string             ← fungsi translate

Setiap page (lokal)
└── useState untuk data spesifik halaman
    (Dashboard punya 12+ state variables untuk API data)
```

---

## 14. Troubleshooting

### Dashboard kosong / error merah
**Penyebab**: API key expired atau tidak valid  
**Solusi**: Regenerate API key di GitHub/WakaTime/Umami, update `.env`, restart dev server

### Umami stats semua 0
**Penyebab**: 
1. Tracking script salah URL → pastikan `cloud.umami.is/script.js` (bukan `api.umami.is`)
2. Domain di Umami tidak match → cek di Umami Dashboard → Website settings
3. Traffic rendah → stats mengambil data 30 hari, jika belum ada visitor akan 0

**Solusi**: Deploy ke production, buka website, cek di Umami Cloud apakah data masuk

### WakaTime menampilkan mock data
**Penyebab**: API key salah atau CORS terblokir  
**Solusi**: 
- Dev: Pastikan proxy di `vite.config.ts` aktif
- Prod: Pastikan rewrite di `vercel.json` ada

### Build out-of-memory
**Penyebab**: 3000+ module + banyak UI components  
**Solusi**: 
```bash
# Windows PowerShell
$env:NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

### GitHub "Bad credentials"
**Penyebab**: Token expired/revoked  
**Solusi**: Buat Personal Access Token baru di https://github.com/settings/tokens

---

## 15. Catatan Pengembangan

### Konvensi Kode
- **Bahasa file**: English (nama variable, function, komponen)
- **Export**: Named export (bukan default export) untuk semua pages & components
- **State types**: Semua `useState` menggunakan TypeScript generics, bukan `any`
- **API types**: Didefinisikan di `src/app/services/types.ts`
- **Translations**: Semua teks UI di `src/app/context/translations.ts`

### Menambah Halaman Baru
1. Buat file di `src/app/pages/NamaHalaman.tsx`
2. Tambahkan lazy import di `src/app/routes.tsx`
3. Tambahkan route di array `children`
4. Tambahkan navigasi di `NAV_LINKS` di `src/app/layout/Root.tsx`
5. Tambahkan teks i18n di `translations.ts`

### Menambah Proyek Baru
1. Buka `src/app/pages/Project.tsx`
2. Tambahkan objek baru di array `PROJECTS`
3. Tambahkan teks deskripsi, fitur, dan teknologi di `translations.ts`
4. Tambahkan screenshot di `public/project/`

### Menambah Sertifikat Baru
1. Buka `src/app/pages/Achievements.tsx`
2. Tambahkan objek baru di array sertifikat
3. Tambahkan teks i18n di `translations.ts`
4. Tambahkan gambar di `public/certificates/`

### Menambah Skill Baru
1. Buat SVG icon di `src/app/components/TechIcons.tsx`
2. Tambahkan item di array `SKILLS` di `src/app/pages/About.tsx`
3. Pilih kategori: `frontend` | `backend` | `database` | `tools`

### Performance Notes
- Bundle di-split ke 14 chunks via lazy loading
- Initial load: ~274 KB JS + 128 KB CSS
- Dashboard chunk: ~439 KB (dimuat on-demand)
- Gambar di `public/` sebaiknya dalam format WebP untuk performa optimal
