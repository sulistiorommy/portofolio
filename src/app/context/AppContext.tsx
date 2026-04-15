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
    welcome: "Tujuan utama saya adalah membantu proses digitalisasi berbagai ide dan layanan melalui teknologi web. Berangkat dari fokus utama di ranah Frontend (menggunakan React dan Tailwind CSS), saat ini saya terus mengembangkan keahlian menjadi seorang Full-stack Developer (Node.js, Express.js, MySQL). Di tengah perkembangan teknologi yang sangat pesat, kemampuan beradaptasi dan kemauan untuk terus belajar adalah fondasi saya dalam menciptakan solusi digital yang benar-benar bisa diandalkan dan nyaman digunakan.",
    about_text: "Halo! Saya Rommy Sulistio, seorang Junior Web Developer dengan latar belakang unik di bidang Psikologi. Kombinasi ini memungkinkan saya untuk membangun aplikasi web yang tidak hanya kuat secara teknis, tetapi juga dirancang dengan pemahaman mendalam tentang kebutuhan dan perilaku pengguna. Perjalanan teknologi saya dimulai secara otodidak hingga akhirnya saya dipercaya sebagai Software Engineer di PT Rahmah Grup Internasional, di mana saya bertanggung jawab mengelola fitur customer service menggunakan Node.js dan Express.js. Saat ini, saya fokus mendalami ekosistem React dan Tailwind CSS untuk menciptakan antarmuka yang responsif, intuitif, dan user-friendly. Saya adalah seorang pembelajar cepat yang senang memecahkan masalah kompleks melalui kode. Mari berkolaborasi untuk membangun solusi digital yang berdampak!",
    achievements_text: "Berikut adalah beberapa sertifikasi dan pencapaian saya di bidang web development.",
    project_text: "Beberapa proyek menarik yang pernah saya kerjakan selama ini.",
    dashboard_text: "Ini adalah halaman dasbor. Anda dapat melihat ringkasan aktivitas saya di sini.",
    contact_text: "Mari berkolaborasi! Hubungi saya melalui formulir atau kontak di bawah ini.",
    contact_name_label: "Nama Lengkap",
    contact_email_label: "Alamat Email",
    contact_message_label: "Pesan Anda",
    contact_name_placeholder: "Masukkan nama lengkap",
    contact_email_placeholder: "nama@email.com",
    contact_message_placeholder: "Berikan saran, masukan, atau mari diskusikan rencana dan konsultasi digital Anda di sini...",
    contact_send_button: "Kirim Pesan",
    contact_sending_button: "Mengirim...",
    contact_success_title: "Pesan Terkirim!",
    contact_success_text: "Terima kasih telah menghubungi saya. Saya akan segera membalas pesan Anda.",
    contact_send_another: "Kirim Pesan Lain",
    contact_error_text: "Terjadi kesalahan. Silakan coba lagi atau hubungi kontak langsung.",
    contact_whatsapp: "WhatsApp",
    contact_linkedin: "LinkedIn",
    contact_location: "Lokasi",
    fullname: "Rommy Sulistio",
    project_moss_wall_desc: "Moss Wall Property adalah sebuah landing page modern untuk perusahaan properti yang mengusung konsep green living (hunian hijau) dan desain minimalis. Website ini dirancang untuk menampilkan profil perusahaan, layanan utama, portofolio proyek, serta menyediakan saluran komunikasi yang mudah bagi calon pembeli.",
    project_moss_wall_features: "Hero Section yang Menarik, Company Profile, Service Showcase, Project Gallery, Form Kontak Terintegrasi, Responsive Design",
    project_moss_wall_tech_desc: "HTML5, CSS3 (dengan framework CSS seperti Tailwind CSS untuk desain modern dan responsif). Interaktivitas: JavaScript (untuk navigasi yang mulus/smooth scroll dan penanganan interaksi formulir). Assets: Gambar berkualitas tinggi dari Unsplash yang dioptimalkan untuk performa web. Deployment: Di-host menggunakan Netlify untuk integrasi berkelanjutan yang cepat dan andal.",
    project_umrah_mgmt_desc: "Sistem Manajemen Customer Service (CS) ini adalah platform internal yang dirancang untuk mengelola ekosistem jamaah secara digital. Fokus utama aplikasi ini adalah mengotomatisasi pendataan jamaah aktif, mengorganisir database alumni, serta mengelola program loyalitas melalui sistem referal. Dilengkapi dengan visualisasi data, sistem ini membantu manajemen mengambil keputusan berbasis data secara cepat dan akurat.",
    project_umrah_mgmt_features: "Manajemen Database Jamaah (CRUD), Sistem Inventori Alumni, Program Referal Alumni, Dashboard Analitik & Grafik, Pencarian & Filter Lanjutan",
    project_umrah_mgmt_tech_desc: "Tailwind CSS untuk antarmuka dashboard yang bersih, modern, dan sepenuhnya responsif. Node js & Express js sebagai mesin server yang tangguh untuk menangani logika bisnis. MySQL untuk penyimpanan data yang terstruktur. Chart js atau ApexCharts untuk visualisasi data grafik interaktif. JavaScript modern (ES6+) untuk memproses data referal dan kalkulasi statistik.",
    project_portfolio_desc: "Website portofolio interaktif ini dibangun untuk merangkum perjalanan saya di dunia web development. Portofolio ini tidak hanya menampilkan proyek dan sertifikat, tetapi juga memiliki Dasbor (Dashboard) khusus yang mengintegrasikan data aktivitas ngoding secara real-time dari API WakaTime, statistik repositori dari GitHub API, serta analitik statistik pengunjung dari Umami API.",
    project_portfolio_features: "Real-time GitHub Stats, Live WakaTime Coding Activity Chart, Integrasi Analitik Umami, Dark/Light Mode, Multi-bahasa (ID/EN), Galeri Proyek & Sertifikat Interaktif",
    project_portfolio_tech_desc: "React 18 dengan Vite untuk performa super cepat. Tailwind CSS untuk styling komponen modern. Recharts untuk visualisasi grafik. Integrasi langsung dengan REST API GitHub, WakaTime & Umami. Framer Motion untuk animasi yang halus.",
    cert_web_basic_title: "Belajar Dasar Pemrograman Web",
    cert_web_basic_desc: "Sertifikat dasar yang mencakup HTML5 dan CSS3 untuk membangun struktur dan desain web yang responsif.",
    cert_js_logic_title: "Comparison and Logical Operators",
    cert_js_logic_desc: "Mempelajari cara membandingkan nilai dan menggunakan logika Boolean untuk mengontrol alur program dalam JavaScript.",
    cert_js_branch_title: "Conditional Branching and Switch Statement",
    cert_js_branch_desc: "Menguasai struktur percabangan if, else if, else, dan switch untuk membuat keputusan kompleks dalam kode.",
    cert_js_datatype_title: "Data Type and Operator",
    cert_js_datatype_desc: "Pemahaman mendalam tentang tipe data dasar (String, Number, Boolean) dan operator aritmatika dalam JavaScript.",
    cert_js_obj_array_title: "Object and Array",
    cert_js_obj_array_desc: "Mempelajari cara mengelola kumpulan data kompleks menggunakan objek dan array untuk struktur data yang lebih efisien.",
    experience_title: "Pengalaman Kerja",
    job_rahmah_title: "Software Engineer",
    job_rahmah_company: "PT Rahmah Grup Internasional",
    job_rahmah_period: "Januari 2026 – Februari 2026",
    job_rahmah_desc1: "Mengembangkan dan migrasi fitur customer service (CS) untuk meningkatkan alur komunikasi pengguna di platform travel umroh",
    job_rahmah_desc2: "Membangun fungsionalitas backend menggunakan Node.js dan Express.js untuk menangani pemrosesan permintaan dan data",
    job_rahmah_desc3: "Memastikan stabilitas sistem dan kesiapan untuk penerapan produksi melalui pengujian dan debugging",
    job_rahmah_desc4: "Berhasil mengirimkan fitur sesuai timeline tanpa masalah kritis.",
    job_syafa_title: "Technician (Maintenance & Repair - Videotron)",
    job_syafa_company: "PT Syafa Nofrida Indonesia",
    job_syafa_period: "Juni 2025 – Desember 2025",
    job_syafa_desc1: "Menjaga uptime sistem hingga 98% di berbagai lokasi layar LED melalui pemeliharaan preventif dan korektif",
    job_syafa_desc2: "Melakukan troubleshooting dan perbaikan komponen perangkat keras (modul LED, power supply, receiver card) untuk meminimalkan downtime",
    job_syafa_desc3: "Melakukan pengecekan sistem secara rutin untuk memastikan performa visual optimal dan stabilitas listrik",
    job_syafa_desc4: "Membuat laporan teknis terstruktur untuk mendukung proses pemantauan dan pengambilan keputusan.",
    education_title: "Pendidikan",
    edu_psych_degree: "Sarjana Psikologi",
    edu_psych_univ: "Universitas Bhayangkara Jakarta Raya",
    edu_psych_gpa: "IPK: 3.38 / 4.00",
    edu_psych_period: "2019 - 2023",
    edu_selftaught_title: "Belajar Pengembangan Web Secara Otodidak",
    edu_selftaught_desc1: "Mempelajari pengembangan web secara mandiri melalui sumber daya dan kursus online",
    edu_selftaught_desc2: "Fokus pada HTML, CSS, JavaScript, dan desain web responsif",
    edu_selftaught_desc3: "Membangun proyek dunia nyata untuk menerapkan pengetahuan dalam skenario praktis",
    edu_selftaught_desc4: "Terus meningkatkan keterampilan melalui pengembangan proyek langsung",
    edu_selftaught_period: "2025 - Sekarang",
    edu_courses_title: "Kursus Online",
    edu_courses_dicoding: "Dicoding (Coding Camp 2026 powered by DBS Foundation 2.0 - Full-Stack Web Developer)",
    edu_courses_myskill: "Myskill (Web Development)",
    edu_courses_youtube: "YouTube (tutorial pemrograman dan latihan langsung)",
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
    welcome: "My main goal is to help digitalize various ideas and services through web technology. Starting from a core focus in Frontend (using React and Tailwind CSS), I am currently expanding my expertise into a Full-stack Developer (Node.js, Express.js, MySQL). Amidst rapid technological developments, adaptability and a willingness to keep learning are my foundation in creating digital solutions that are truly reliable and comfortable to use.",
    about_text: "Hello! I'm Rommy Sulistio, a Junior Web Developer with a unique background in Psychology. This combination allows me to build web applications that are not only technically robust but also designed with a deep understanding of user needs and behavior. My tech journey began self-taught until I was entrusted as a Software Engineer at PT Rahmah Grup Internasional, where I managed customer service features using Node.js and Express.js. Currently, I am focused on mastering the React and Tailwind CSS ecosystem to create responsive, intuitive, and user-friendly interfaces. I am a fast learner who enjoys solving complex problems through code. Let's collaborate to build impactful digital solutions!",
    achievements_text: "Here are some of my certifications and achievements in web development.",
    project_text: "Some interesting projects I have worked on so far.",
    dashboard_text: "This is the dashboard page. You can see a summary of my activities here.",
    contact_text: "Let's collaborate! Contact me via the form or contacts below.",
    contact_name_label: "Full Name",
    contact_email_label: "Email Address",
    contact_message_label: "Your Message",
    contact_name_placeholder: "Enter full name",
    contact_email_placeholder: "name@email.com",
    contact_message_placeholder: "Share your feedback, suggestions, or let's discuss your digital plans and consultations here...",
    contact_send_button: "Send Message",
    contact_sending_button: "Sending...",
    contact_success_title: "Message Sent!",
    contact_success_text: "Thank you for reaching out. I'll get back to you as soon as possible.",
    contact_send_another: "Send Another Message",
    contact_error_text: "Something went wrong. Please try again or use direct contact.",
    contact_whatsapp: "WhatsApp",
    contact_linkedin: "LinkedIn",
    contact_location: "Location",
    fullname: "Rommy Sulistio",
    project_moss_wall_desc: "Moss Wall Property is a modern landing page for a real estate company that embraces the green living concept and minimalist design. This website is designed to showcase company profile, core services, project portfolio, and provide easy communication channels for potential buyers.",
    project_moss_wall_features: "Stunning Hero Section, Company Profile, Service Showcase, Project Gallery, Integrated Contact Form, Responsive Design",
    project_moss_wall_tech_desc: "HTML5, CSS3 (using CSS frameworks like Tailwind CSS for modern and responsive design). Interactivity: JavaScript (for smooth navigation/scroll and form interaction handling). Assets: High-quality Unsplash images optimized for web performance. Deployment: Hosted on Netlify for fast and reliable continuous integration.",
    project_umrah_mgmt_desc: "This Customer Service (CS) Management System is an internal platform designed to digitally manage the pilgrim ecosystem. The main focus is to automate active pilgrim data collection, organize alumni databases, and manage loyalty programs through a referral system. Equipped with data visualization, it helps management make data-driven decisions quickly and accurately.",
    project_umrah_mgmt_features: "Pilgrim Database Management (CRUD), Alumni Inventory System, Alumni Referral Program, Analytical Dashboard & Charts, Advanced Search & Filtering",
    project_umrah_mgmt_tech_desc: "Tailwind CSS for clean and responsive dashboard interface. Node js & Express js as a robust server engine for business logic. MySQL for structured data storage. Chart js or ApexCharts for interactive data visualization. Modern JavaScript (ES6+) for processing referral data and statistical calculations.",
    project_portfolio_desc: "This interactive portfolio website is built to summarize my journey in web development. It not only showcases projects and certificates but also features a dedicated Dashboard that integrates real-time coding activity data from the WakaTime API, repository statistics from the GitHub API, and visitor analytics from the Umami API.",
    project_portfolio_features: "Real-time GitHub Stats, Live WakaTime Coding Activity Chart, Umami Analytics Integration, Dark/Light Mode, Multi-language (ID/EN), Interactive Project & Certificate Galleries",
    project_portfolio_tech_desc: "React 18 with Vite for lightning-fast performance. Tailwind CSS for modern component styling. Recharts for data visualization. Direct integration with GitHub, WakaTime & Umami REST APIs. Framer Motion for smooth animations.",
    cert_web_basic_title: "Basic Web Programming Learning",
    cert_web_basic_desc: "Basic certificate covering HTML5 and CSS3 for building responsive web structures and designs.",
    cert_js_logic_title: "Comparison and Logical Operators",
    cert_js_logic_desc: "Learn how to compare values and use Boolean logic to control program flow in JavaScript.",
    cert_js_branch_title: "Conditional Branching and Switch Statement",
    cert_js_branch_desc: "Master if, else if, else, and switch branching structures to make complex decisions in code.",
    cert_js_datatype_title: "Data Type and Operator",
    cert_js_datatype_desc: "Deep understanding of basic data types (String, Number, Boolean) and arithmetic operators in JavaScript.",
    cert_js_obj_array_title: "Object and Array",
    cert_js_obj_array_desc: "Learn how to manage complex data collections using objects and arrays for more efficient data structures.",
    experience_title: "Work Experience",
    job_rahmah_title: "Software Engineer",
    job_rahmah_company: "PT Rahmah Grup Internasional",
    job_rahmah_period: "January 2026 – February 2026",
    job_rahmah_desc1: "Developed and migrated a customer service (CS) feature to improve user communication flow in a travel umroh platform",
    job_rahmah_desc2: "Built backend functionality using Node.js and Express.js to handle request and data processing",
    job_rahmah_desc3: "Ensured system stability and readiness for production deployment through testing and debugging",
    job_rahmah_desc4: "Successfully delivered the feature within the given timeline without critical issues.",
    job_syafa_title: "Technician (Maintenance & Repair - Videotron)",
    job_syafa_company: "PT Syafa Nofrida Indonesia",
    job_syafa_period: "June 2025 – December 2025",
    job_syafa_desc1: "Maintained up to 98% system uptime across multiple LED display locations through preventive and corrective maintenance",
    job_syafa_desc2: "Performed troubleshooting and repair on hardware components (LED modules, power supply, receiver card) to minimize downtime",
    job_syafa_desc3: "Conducted regular system checks to ensure optimal visual performance and electrical stability",
    job_syafa_desc4: "Created structured technical reports to support monitoring and decision-making processes.",
    education_title: "Education",
    edu_psych_degree: "Bachelor of Psychology",
    edu_psych_univ: "Universitas Bhayangkara Jakarta Raya",
    edu_psych_gpa: "GPA: 3.38 / 4.00",
    edu_psych_period: "2019 - 2023",
    edu_selftaught_title: "Self-Taught Web Development",
    edu_selftaught_desc1: "Learned web development independently through online resources and courses",
    edu_selftaught_desc2: "Focused on HTML, CSS, JavaScript, and responsive web design",
    edu_selftaught_desc3: "Built real-world projects to apply knowledge in practical scenarios",
    edu_selftaught_desc4: "Continuously improving skills through hands-on project development",
    edu_selftaught_period: "2025 - Present",
    edu_courses_title: "Online Courses",
    edu_courses_dicoding: "Dicoding (Coding Camp 2026 powered by DBS Foundation 2.0 - Full-Stack Web Developer)",
    edu_courses_myskill: "Myskill (Web Development)",
    edu_courses_youtube: "YouTube (programming tutorials and hands-on practice)",
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

