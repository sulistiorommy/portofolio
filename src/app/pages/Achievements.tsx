import { useAppContext } from "../context/AppContext";
import { Award, ExternalLink, Calendar, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

export function Achievements() {
  const { t } = useAppContext();

  const achievements = [
    {
      titleKey: "cert_web_basic_title",
      organization: "Dicoding Academy",
      year: "2024",
      image: "/certificates/Belajar_Dasar_Pemrograman_Web.PNG",
      descriptionKey: "cert_web_basic_desc",
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/30"
    },
    {
      titleKey: "cert_js_logic_title",
      organization: "Progate",
      year: "2024",
      image: "/certificates/COMPARISON_AND_LOGICAL_OPERATORS.PNG",
      descriptionKey: "cert_js_logic_desc",
      color: "text-amber-500",
      bgColor: "bg-amber-50 dark:bg-amber-900/30"
    },
    {
      titleKey: "cert_js_branch_title",
      organization: "Progate",
      year: "2024",
      image: "/certificates/CONDITIONAL_BRANCHING_AND_SWITCH_STATEMENT.PNG",
      descriptionKey: "cert_js_branch_desc",
      color: "text-emerald-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/30"
    },
    {
      titleKey: "cert_js_datatype_title",
      organization: "Progate",
      year: "2024",
      image: "/certificates/DATA _TYPE_AND_OPERATOR.PNG",
      descriptionKey: "cert_js_datatype_desc",
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/30"
    },
    {
      titleKey: "cert_js_obj_array_title",
      organization: "Progate",
      year: "2024",
      image: "/certificates/OBJECT_AND_ARRAY.PNG",
      descriptionKey: "cert_js_obj_array_desc",
      color: "text-rose-500",
      bgColor: "bg-rose-50 dark:bg-rose-900/30"
    }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
            {t('achievements')}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            {t('achievements_text')}
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl border border-emerald-100 dark:border-emerald-800/50">
          <Award size={20} />
          <span className="font-bold text-sm">Verified Credentials</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {achievements.map((item, index) => (
          <div 
            key={index} 
            className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <Dialog>
              <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800 border-b border-slate-100 dark:border-slate-800 cursor-pointer">
                <img 
                  src={item.image} 
                  alt={t(item.titleKey)} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  <DialogTrigger asChild>
                    <button className="bg-white text-slate-900 p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:scale-110">
                      <Search size={20} />
                    </button>
                  </DialogTrigger>
                </div>
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1.5 rounded-xl font-bold text-[10px] uppercase tracking-wider shadow-sm ${item.bgColor} ${item.color} border border-white/20 backdrop-blur-md`}>
                    {item.organization}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-slate-400 mb-3">
                  <Calendar size={14} />
                  <span className="text-xs font-bold uppercase tracking-widest">{item.year}</span>
                </div>
                
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                  {t(item.titleKey)}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                  {t(item.descriptionKey)}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                  <DialogTrigger asChild>
                    <button className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2 hover:gap-3 transition-all">
                      View Certificate <ExternalLink size={14} />
                    </button>
                  </DialogTrigger>
                </div>
              </div>

              <DialogContent className="max-w-4xl p-0 overflow-hidden border-none bg-transparent shadow-none">
                <DialogHeader className="sr-only">
                  <DialogTitle>{t(item.titleKey)}</DialogTitle>
                </DialogHeader>
                <div className="relative group">
                  <img 
                    src={item.image} 
                    alt={t(item.titleKey)} 
                    className="w-full h-auto rounded-lg shadow-2xl ring-1 ring-white/10"
                  />
                  <div className="absolute top-4 right-4 text-white/50 text-xs font-medium">Click outside to close</div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  );
}