import { useAppContext } from "../context/AppContext";
import { Award, Trophy, Star, ShieldCheck } from "lucide-react";

export function Achievements() {
  const { t } = useAppContext();

  const achievements = [
    {
      title: "1st Place Web Design Competition",
      organization: "Tech University",
      year: "2024",
      icon: Trophy,
      description: "Won first place among 50 participants for designing an accessible and modern web interface.",
      color: "text-amber-500",
      bgColor: "bg-amber-50 dark:bg-amber-900/30"
    },
    {
      title: "Frontend Developer Certificate",
      organization: "Dicoding Academy",
      year: "2023",
      icon: Award,
      description: "Graduated with honors in completing React and Web Performance courses.",
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/30"
    },
    {
      title: "Top Contributor Open Source",
      organization: "GitHub",
      year: "2023",
      icon: Star,
      description: "Recognized as an active contributor in building accessible UI components.",
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/30"
    },
    {
      title: "Certified Responsive Web Design",
      organization: "freeCodeCamp",
      year: "2022",
      icon: ShieldCheck,
      description: "Completed 300 hours of coursework focusing on modern CSS and HTML semantics.",
      color: "text-emerald-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/30"
    }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl pb-10">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
        {t('achievements')}
      </h1>
      <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">
        {t('achievements_text')}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((item, index) => {
          const Icon = item.icon;
          return (
            <div 
              key={index} 
              className="group bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all duration-300 hover:border-blue-500/50"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${item.bgColor} ${item.color}`}>
                  <Icon size={28} />
                </div>
                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold rounded-full">
                  {item.year}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-3">
                {item.organization}
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}