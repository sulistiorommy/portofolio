import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Code2, PenTool, Layout, Terminal, Briefcase, GraduationCap, Calendar, Award, BookOpen } from "lucide-react";

// Simple SVG Icons for Tech Stack
const TechIcons = {
  html: (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#E34F26]">
      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.414-1.481.672-7.06H8.531z" />
    </svg>
  ),
  css: (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#1572B6]">
      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm5.09 8.715L6.19 13.11l5.81 1.558 5.808-1.558-.4-4.426H7.132l-.26-2.896h10.372l.26-2.897H6.6l.872 9.74 4.528 1.213 4.527-1.213.232-2.503H6.59z" />
    </svg>
  ),
  javascript: (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#F7DF1E]">
      <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.045-.705.15-.645.975-.75 1.53-.615.495.21.825.555 1.125 1.065.9.54 1.8.3 1.8-.3 0-1.41-1.245-2.085-2.52-2.025-1.635.06-2.82 1.02-2.82 2.475 0 1.155.39 1.95 2.025 2.625 1.41.555 1.905.795 2.04 1.305.18.705-.315 1.275-1.335 1.23-.78-.045-1.26-.39-1.695-1.02-.735.465-1.62.9-1.62.9 0 1.95 1.74 2.64 3.705 2.37 1.71-.24 2.625-1.23 2.625-2.535zM4.192 14.821c0 .24-.015.48-.015.72 0 1.2-.18 1.575-.18 2.37 0 2.22 1.56 2.415 3.12 2.415 1.485 0 2.76-.21 2.76-.21V11.1c-.81-.105-2.04-.15-3.21-.15-2.73 0-3.3 1.02-3.3 3.871z" />
    </svg>
  ),
  typescript: (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#3178C6]">
      <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.045-.705.15-.645.975-.75 1.53-.615.495.21.825.555 1.125 1.065.9.54 1.8.3 1.8-.3 0-1.41-1.245-2.085-2.52-2.025-1.635.06-2.82 1.02-2.82 2.475 0 1.155.39 1.95 2.025 2.625 1.41.555 1.905.795 2.04 1.305.18.705-.315 1.275-1.335 1.23-.78-.045-1.26-.39-1.695-1.02-.735.465-1.62.9-1.62.9 0 1.95 1.74 2.64 3.705 2.37 1.71-.24 2.625-1.23 2.625-2.535zM4.192 14.821c0 .24-.015.48-.015.72 0 1.2-.18 1.575-.18 2.37 0 2.22 1.56 2.415 3.12 2.415 1.485 0 2.76-.21 2.76-.21V11.1c-.81-.105-2.04-.15-3.21-.15-2.73 0-3.3 1.02-3.3 3.871z" />
    </svg>
  ),
  react: (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#61DAFB]">
      <circle cx="12" cy="12" r="2" />
      <path d="M12 7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6 2.69-6 6-6zM12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 22c-5.52 0-10-4.48-10-10S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10z" />
    </svg>
  ),
  tailwind: (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#06B6D4]">
      <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
    </svg>
  ),
  vite: (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <defs>
        <linearGradient id="vite-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#41D1FF' }} />
          <stop offset="100%" style={{ stopColor: '#BD34FE' }} />
        </linearGradient>
      </defs>
      <path fill="url(#vite-gradient)" d="M11.977 1L12.031 1.025L23.111 20.306C23.361 20.74 23.197 21.291 22.756 21.528C22.616 21.603 22.458 21.642 22.298 21.642H1.701C1.204 21.642 0.801 21.239 0.801 20.742C0.801 20.582 0.84 20.424 0.915 20.284L11.977 1Z" />
      <path fill="#FFD62E" d="M17.47 1.09L12.03 1.02L2.09 18.36L3.92 19L17.47 1.09Z" />
    </svg>
  ),
  nextjs: (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.527 18.663l-4.525-5.914.065 5.914h-1.332v-8h1.28l3.967 5.191v-5.191h1.332v8h-.787zm-7.86-8h1.333v8h-1.333v-8z" />
    </svg>
  ),
  nodejs: (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#339933]">
      <path d="M14.914 13.077v-2.155l-2.915-1.683-2.914 1.683v3.366l2.914 1.683 2.157-1.246V13.077zm-.738 1.417l-1.419.82-1.42-.82v-1.639l1.42-.82 1.419.82v1.639zM12 0L2.155 5.684v11.366L12 24l9.845-6.95V5.684L12 0zm8.384 16.353L12 22.184l-8.384-5.831V6.316L12 1.816l8.384 4.5V16.353z" />
    </svg>
  ),
  express: (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
      <path d="M4.153 17.5l-3.23.003V6.26h8.736v2.793H4.153V11l4.088-.003v2.805H4.15l.003 3.698zm11.238-6.19c.142-.239.387-.393.68-.393.125 0 .239.034.339.091l1.528-1.745c-.443-.455-1.127-.751-1.921-.751-1.353 0-2.485.83-2.96 2h-.032C12.551 9.284 11.418 8.455 10.066 8.455c-1.66 0-3 1.341-3 3s1.34 3 3 3c1.352 0 2.485-.83 2.96-2h.032c.475 1.17 1.607 2 2.96 2 1.66 0 3-1.341 3-3 0-1.659-1.34-3-3-3a1.53 1.53 0 0 0-.667.155l-1.528 1.745c.16.273.16.634 0 .91l1.528 1.741c.21.091.442.149.682.149.553 0 .999-.448.999-1 0-.554-.446-1.001-.999-1.001zm-5.325.39c-.553 0-1-.447-1-1s.447-1 1-1 1 .447 1 1-.447 1-1 1zm12.35 2.14l1.584-2.846-1.584-2.847h-1.583v5.693h1.583zm-1.583-6.696h1.583c.875 0 1.584.71 1.584 1.584v2.529c0 .873-.709 1.583-1.584 1.583h-1.583V9.155z" />
    </svg>
  ),
  mariadb: (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#003545]">
      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.143 14.857c0 1.071-.857 1.929-1.929 1.929s-1.929-.857-1.929-1.929.857-1.929 1.929-1.929 1.929.857 1.929 1.929zm-5.357-1.643c-.714.714-1.643 1.071-2.643 1.071s-1.929-.357-2.643-1.071-1.071-1.643-1.071-2.643 1.071-1.929 2.643-1.929 1.929.357 2.643 1.071.714 1.643.714 2.643z" />
    </svg>
  ),
  mysql: (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#4479A1]">
      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 18.571c-3.643 0-6.571-2.929-6.571-6.571s2.929-6.571 6.571-6.571 6.571 2.929 6.571 6.571-2.928 6.571-6.571 6.571zm0-10.714c-2.286 0-4.143 1.857-4.143 4.143s1.857 4.143 4.143 4.143 4.143-1.857 4.143-4.143-1.857-4.143-4.143-4.143z" />
    </svg>
  ),
  supabase: (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#3ECF8E]">
      <path d="M21.362 9.354H12V.338L2.638 14.646H12v9.016l9.362-14.308z" />
    </svg>
  ),
  npm: (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#CB3837]">
      <path d="M0 7.334v8h8.222v1.333H12V15.334h12v-8H0zm6.854 5.333H5.432V10h-1.422v2.667h-1.422V8.667h4.266v4zm4 0H9.432V8.667h1.422v4zm6.667 0h-1.422V10h-1.422v2.667h-1.422V8.667h4.266v4z" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  ),
  pm2: (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#2B037A]">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm0 2c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6z" />
    </svg>
  )
};

export function About() {
  const { t } = useAppContext();
  const [activeTab, setActiveTab] = useState("all");

  const skills = [
    { name: "HTML", icon: TechIcons.html, category: "frontend", color: "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800" },
    { name: "CSS", icon: TechIcons.css, category: "frontend", color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800" },
    { name: "JavaScript", icon: TechIcons.javascript, category: "frontend", color: "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800" },
    { name: "React.js", icon: TechIcons.react, category: "frontend", color: "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800" },
    { name: "TailwindCSS", icon: TechIcons.tailwind, category: "frontend", color: "bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-800" },
    { name: "Node.js", icon: TechIcons.nodejs, category: "backend", color: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800" },
    { name: "Express.js", icon: TechIcons.express, category: "backend", color: "bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700" },
    { name: "MySQL", icon: TechIcons.mysql, category: "database", color: "bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-400 border-sky-200 dark:border-sky-800" },
    { name: "Supabase", icon: TechIcons.supabase, category: "database", color: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800" },
    { name: "NPM", icon: TechIcons.npm, category: "tools", color: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800" },
    { name: "GitHub", icon: TechIcons.github, category: "tools", color: "bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700" },
  ];

  const filteredSkills = activeTab === "all" ? skills : skills.filter(s => s.category === activeTab);

  const categories = [
    { id: "all", name: "All", count: skills.length },
    { id: "frontend", name: "Frontend", count: skills.filter(s => s.category === "frontend").length },
    { id: "backend", name: "Backend", count: skills.filter(s => s.category === "backend").length },
    { id: "database", name: "Database", count: skills.filter(s => s.category === "database").length },
    { id: "tools", name: "Tools", count: skills.filter(s => s.category === "tools").length },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl pb-10">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
        {t('about')}
      </h1>
      
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-800 mb-10">
        <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
          {t('about_text')}
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
             <span className="text-blue-600">{`</>`}</span> Skills
          </h2>
          <p className="text-slate-500 dark:text-slate-400">My professional skills.</p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                activeTab === cat.id
                  ? "bg-amber-400 border-amber-400 text-slate-900 shadow-md shadow-amber-400/20"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              {cat.name} <span className="text-xs opacity-60 bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded-md">{cat.count}</span>
            </button>
          ))}
        </div>

        {/* Skill Badges */}
        <div className="flex flex-wrap gap-3">
          {filteredSkills.map((skill, index) => (
            <div 
              key={index}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl border transition-all hover:scale-105 ${skill.color} shadow-sm`}
            >
              {skill.icon}
              <span className="font-semibold text-sm">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Work Experience Section */}
      <div className="mt-16 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
             <span className="text-blue-600"><Briefcase className="w-6 h-6" /></span> {t('experience_title')}
          </h2>
          <p className="text-slate-500 dark:text-slate-400">My professional journey.</p>
        </div>

        <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 pl-8 flex flex-col gap-12">
          {/* Experience Item 1 */}
          <div className="relative">
            <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-blue-600 border-4 border-white dark:border-slate-950 shadow-sm shadow-blue-500/50"></div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5 uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5" /> {t('job_rahmah_period')}
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t('job_rahmah_title')}</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium mb-3">{t('job_rahmah_company')}</p>
              <ul className="flex flex-col gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i} className="text-slate-600 dark:text-slate-400 flex items-start gap-2 text-sm leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500/50 shrink-0"></span>
                    {t(`job_rahmah_desc${i}`)}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Experience Item 2 */}
          <div className="relative">
            <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-slate-400 dark:bg-slate-600 border-4 border-white dark:border-slate-950"></div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5" /> {t('job_syafa_period')}
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t('job_syafa_title')}</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium mb-3">{t('job_syafa_company')}</p>
              <ul className="flex flex-col gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i} className="text-slate-600 dark:text-slate-400 flex items-start gap-2 text-sm leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400/50 shrink-0"></span>
                    {t(`job_syafa_desc${i}`)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Education Section */}
      <div className="mt-16 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
             <span className="text-blue-600"><GraduationCap className="w-6 h-6" /></span> {t('education_title')}
          </h2>
          <p className="text-slate-500 dark:text-slate-400">Academic and self-taught background.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Degree */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-bold text-slate-900 dark:text-white">{t('edu_psych_degree')}</h3>
                <span className="text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-1 rounded-md">{t('edu_psych_period')}</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">{t('edu_psych_univ')}</p>
              <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mt-2">{t('edu_psych_gpa')}</p>
            </div>
          </div>

          {/* Self Taught */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-bold text-slate-900 dark:text-white">{t('edu_selftaught_title')}</h3>
                <span className="text-xs font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-md">{t('edu_selftaught_period')}</span>
              </div>
              <ul className="mt-3 flex flex-col gap-1.5">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
                    <span className="mt-1 w-1 h-1 rounded-full bg-blue-500 shrink-0"></span>
                    {t(`edu_selftaught_desc${i}`)}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Online Courses */}
          <div className="md:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white">{t('edu_courses_title')}</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Dicoding</span>
                <p className="text-xs font-medium text-slate-700 dark:text-slate-300 leading-snug">{t('edu_courses_dicoding')}</p>
              </div>
              <div className="flex flex-col gap-1 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">MySkill</span>
                <p className="text-xs font-medium text-slate-700 dark:text-slate-300">{t('edu_courses_myskill')}</p>
              </div>
              <div className="flex flex-col gap-1 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">YouTube</span>
                <p className="text-xs font-medium text-slate-700 dark:text-slate-300">{t('edu_courses_youtube')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}