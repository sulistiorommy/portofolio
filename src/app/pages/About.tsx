import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Briefcase, GraduationCap, Calendar, Award, BookOpen } from "lucide-react";
import { TechIcons } from "../components/TechIcons";

interface Skill {
  name: string;
  icon: JSX.Element;
  category: string;
  color: string;
}

const SKILLS: Skill[] = [
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

const CATEGORIES = [
  { id: "all", name: "All" },
  { id: "frontend", name: "Frontend" },
  { id: "backend", name: "Backend" },
  { id: "database", name: "Database" },
  { id: "tools", name: "Tools" },
];

export function About() {
  const { t } = useAppContext();
  const [activeTab, setActiveTab] = useState("all");

  const filteredSkills = activeTab === "all"
    ? SKILLS
    : SKILLS.filter((s) => s.category === activeTab);

  const getCategoryCount = (id: string) =>
    id === "all" ? SKILLS.length : SKILLS.filter((s) => s.category === id).length;

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

      {/* Skills Section */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="text-blue-600">{`</>`}</span> Skills
          </h2>
          <p className="text-slate-500 dark:text-slate-400">My professional skills.</p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                activeTab === cat.id
                  ? "bg-amber-400 border-amber-400 text-slate-900 shadow-md shadow-amber-400/20"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              {cat.name}
              <span className="text-xs opacity-60 bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded-md">
                {getCategoryCount(cat.id)}
              </span>
            </button>
          ))}
        </div>

        {/* Skill Badges */}
        <div className="flex flex-wrap gap-3">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
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
            <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-blue-600 border-4 border-white dark:border-slate-950 shadow-sm shadow-blue-500/50" />
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5 uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5" /> {t('job_rahmah_period')}
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t('job_rahmah_title')}</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium mb-3">{t('job_rahmah_company')}</p>
              <ul className="flex flex-col gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i} className="text-slate-600 dark:text-slate-400 flex items-start gap-2 text-sm leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500/50 shrink-0" />
                    {t(`job_rahmah_desc${i}`)}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Experience Item 2 */}
          <div className="relative">
            <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-slate-400 dark:bg-slate-600 border-4 border-white dark:border-slate-950" />
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5" /> {t('job_syafa_period')}
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t('job_syafa_title')}</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium mb-3">{t('job_syafa_company')}</p>
              <ul className="flex flex-col gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i} className="text-slate-600 dark:text-slate-400 flex items-start gap-2 text-sm leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400/50 shrink-0" />
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
                    <span className="mt-1 w-1 h-1 rounded-full bg-blue-500 shrink-0" />
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
              {[
                { label: "Dicoding", key: "edu_courses_dicoding" },
                { label: "MySkill", key: "edu_courses_myskill" },
                { label: "YouTube", key: "edu_courses_youtube" },
              ].map((course) => (
                <div key={course.key} className="flex flex-col gap-1 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{course.label}</span>
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-300 leading-snug">{t(course.key)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}