import { useAppContext } from "../context/AppContext";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Home() {
  const { t } = useAppContext();

  return (
    <div className="flex flex-col justify-center min-h-[calc(100vh-6rem)] animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
          {t('greeting')} <span className="text-blue-600 dark:text-blue-400">{t('fullname')}</span>
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-700 dark:text-slate-300 mb-6">
          {t('role')}
        </h2>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-2xl">
          {t('welcome')}
        </p>
        
        <div className="flex flex-wrap gap-4">
          <Link 
            to="/project"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg shadow-blue-500/30"
          >
            {t('project')} <ArrowRight size={18} />
          </Link>
          <a 
            href="/cv-rommy-sulistio.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 dark:text-blue-300 px-6 py-3 rounded-xl font-medium transition-all shadow-sm border border-blue-200 dark:border-blue-800"
          >
            Download CV
          </a>
          <Link 
            to="/contact"
            className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white px-6 py-3 rounded-xl font-medium transition-all shadow-sm border border-slate-200 dark:border-slate-700"
          >
            {t('contact')}
          </Link>
        </div>
      </div>
      
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 opacity-60">
        <div className="flex flex-col gap-2">
          <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">11</span>
          <span className="text-sm font-medium text-slate-500">Project</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">9</span>
          <span className="text-sm font-medium text-slate-500">Project Selesai</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">2</span>
          <span className="text-sm font-medium text-slate-500">Project OnProgres</span>
        </div>
      </div>
    </div>
  );
}