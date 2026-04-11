import React, { createContext, useState, useEffect, useContext } from 'react';

type Language = 'id' | 'en';
type Theme = 'light' | 'dark';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  t: (key: string) => string;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

const translations: Record<string, Record<string, string>> = {
  id: {
    home: "Beranda",
    about: "Tentang",
    achievements: "Pencapaian",
    project: "Proyek",
    dashboard: "Dasbor",
    contact: "Kontak",
    greeting: "Halo, Saya",
    role: "Junior Web Developer",
    welcome: "Spesialis dalam membangun antarmuka pengguna yang responsif dan intuitif dengan React dan Tailwind CSS. Meskipun fokus utama saya adalah Frontend, saya secara aktif memperluas keahlian ke Full-stack Development dengan menguasai Node.js, Express.js, dan MySQL untuk membangun solusi web yang lengkap.",
    about_text: "Halo! Saya Rommy Sulistio, seorang Junior Web Developer dengan latar belakang unik di bidang Psikologi. Kombinasi ini memungkinkan saya untuk membangun aplikasi web yang tidak hanya kuat secara teknis, tetapi juga dirancang dengan pemahaman mendalam tentang kebutuhan dan perilaku pengguna. Perjalanan teknologi saya dimulai secara otodidak hingga akhirnya saya dipercaya sebagai Software Engineer di PT Rahmah Grup Internasional, di mana saya bertanggung jawab mengelola fitur customer service menggunakan Node.js dan Express.js. Saat ini, saya fokus mendalami ekosistem React dan Tailwind CSS untuk menciptakan antarmuka yang responsif, intuitif, dan user-friendly. Saya adalah seorang pembelajar cepat yang senang memecahkan masalah kompleks melalui kode. Mari berkolaborasi untuk membangun solusi digital yang berdampak!",
    achievements_text: "Berikut adalah beberapa sertifikasi dan pencapaian saya di bidang web development.",
    project_text: "Beberapa proyek menarik yang pernah saya kerjakan selama ini.",
    dashboard_text: "Ini adalah halaman dasbor. Anda dapat melihat ringkasan aktivitas saya di sini.",
    contact_text: "Mari berkolaborasi! Hubungi saya melalui formulir atau kontak di bawah ini.",
    fullname: "Rommy Sulistio",
    project_moss_wall_desc: "Moss Wall Property adalah sebuah landing page modern untuk perusahaan properti yang mengusung konsep green living (hunian hijau) dan desain minimalis. Website ini dirancang untuk menampilkan profil perusahaan, layanan utama, portofolio proyek, serta menyediakan saluran komunikasi yang mudah bagi calon pembeli.",
    project_moss_wall_features: "Hero Section yang Menarik, Company Profile, Service Showcase, Project Gallery, Form Kontak Terintegrasi, Responsive Design",
    project_moss_wall_tech_desc: "HTML5, CSS3 (dengan framework CSS seperti Tailwind CSS untuk desain modern dan responsif). Interaktivitas: JavaScript (untuk navigasi yang mulus/smooth scroll dan penanganan interaksi formulir). Assets: Gambar berkualitas tinggi dari Unsplash yang dioptimalkan untuk performa web. Deployment: Di-host menggunakan Netlify untuk integrasi berkelanjutan yang cepat dan andal.",
    project_umrah_mgmt_desc: "Sistem Manajemen Customer Service (CS) ini adalah platform internal yang dirancang untuk mengelola ekosistem jamaah secara digital. Fokus utama aplikasi ini adalah mengotomatisasi pendataan jamaah aktif, mengorganisir database alumni, serta mengelola program loyalitas melalui sistem referal. Dilengkapi dengan visualisasi data, sistem ini membantu manajemen mengambil keputusan berbasis data secara cepat dan akurat.",
    project_umrah_mgmt_features: "Manajemen Database Jamaah (CRUD), Sistem Inventori Alumni, Program Referal Alumni, Dashboard Analitik & Grafik, Pencarian & Filter Lanjutan",
    project_umrah_mgmt_tech_desc: "Tailwind CSS untuk antarmuka dashboard yang bersih, modern, dan sepenuhnya responsif. Node js & Express js sebagai mesin server yang tangguh untuk menangani logika bisnis. MySQL untuk penyimpanan data yang terstruktur. Chart js atau ApexCharts untuk visualisasi data grafik interaktif. JavaScript modern (ES6+) untuk memproses data referal dan kalkulasi statistik.",
  },
  en: {
    home: "Home",
    about: "About",
    achievements: "Achievements",
    project: "Project",
    dashboard: "Dashboard",
    contact: "Contact",
    greeting: "Hello, I am",
    role: "Junior Web Developer",
    welcome: "Specializing in building responsive and intuitive user interfaces with React and Tailwind CSS. While my core is in Frontend, I am actively expanding into Full-stack Development by mastering Node.js, Express.js, and MySQL to build complete, end-to-end web solutions",
    about_text: "Hello! I'm Rommy Sulistio, a Junior Web Developer with a unique background in Psychology. This combination allows me to build web applications that are not only technically robust but also designed with a deep understanding of user needs and behavior. My tech journey began self-taught until I was entrusted as a Software Engineer at PT Rahmah Grup Internasional, where I managed customer service features using Node.js and Express.js. Currently, I am focused on mastering the React and Tailwind CSS ecosystem to create responsive, intuitive, and user-friendly interfaces. I am a fast learner who enjoys solving complex problems through code. Let's collaborate to build impactful digital solutions!",
    achievements_text: "Here are some of my certifications and achievements in web development.",
    project_text: "Some interesting projects I have worked on so far.",
    dashboard_text: "This is the dashboard page. You can see a summary of my activities here.",
    contact_text: "Let's collaborate! Contact me via the form or contacts below.",
    fullname: "Rommy Sulistio",
    project_moss_wall_desc: "Moss Wall Property is a modern landing page for a real estate company that embraces the green living concept and minimalist design. This website is designed to showcase company profile, core services, project portfolio, and provide easy communication channels for potential buyers.",
    project_moss_wall_features: "Stunning Hero Section, Company Profile, Service Showcase, Project Gallery, Integrated Contact Form, Responsive Design",
    project_moss_wall_tech_desc: "HTML5, CSS3 (using CSS frameworks like Tailwind CSS for modern and responsive design). Interactivity: JavaScript (for smooth navigation/scroll and form interaction handling). Assets: High-quality Unsplash images optimized for web performance. Deployment: Hosted on Netlify for fast and reliable continuous integration.",
    project_umrah_mgmt_desc: "This Customer Service (CS) Management System is an internal platform designed to digitally manage the pilgrim ecosystem. The main focus is to automate active pilgrim data collection, organize alumni databases, and manage loyalty programs through a referral system. Equipped with data visualization, it helps management make data-driven decisions quickly and accurately.",
    project_umrah_mgmt_features: "Pilgrim Database Management (CRUD), Alumni Inventory System, Alumni Referral Program, Analytical Dashboard & Charts, Advanced Search & Filtering",
    project_umrah_mgmt_tech_desc: "Tailwind CSS for clean and responsive dashboard interface. Node js & Express js as a robust server engine for business logic. MySQL for structured data storage. Chart js or ApexCharts for interactive data visualization. Modern JavaScript (ES6+) for processing referral data and statistical calculations.",
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('id');
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <AppContext.Provider value={{ language, setLanguage, theme, setTheme, t }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

