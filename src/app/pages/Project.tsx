import { useAppContext } from "../context/AppContext";
import { ExternalLink, Github, Folder, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Badge } from "../components/ui/badge";

interface ProjectItem {
  id: string;
  title: string;
  shortDescription: string;
  descriptionKey: string;
  featuresKey: string;
  techKey: string;
  tech: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: "moss-wall",
    title: "Landing Page Company Profile",
    shortDescription: "Moss Wall Property adalah sebuah landing page modern untuk perusahaan properti yang mengusung konsep green living.",
    descriptionKey: "project_moss_wall_desc",
    featuresKey: "project_moss_wall_features",
    techKey: "project_moss_wall_tech_desc",
    tech: ["HTML", "CSS", "Javascript"],
    image: "/project/Moss_Wall.png",
    liveUrl: "https://splendorous-beignet-cb79c2.netlify.app/",
    githubUrl: "https://github.com/sulistiorommy/tes.git",
  },
  {
    id: "umrah-mgmt",
    title: "Umrah & Hajj Management System",
    shortDescription: "Sistem Manajemen CS untuk mengelola ekosistem jamaah secara digital.",
    descriptionKey: "project_umrah_mgmt_desc",
    featuresKey: "project_umrah_mgmt_features",
    techKey: "project_umrah_mgmt_tech_desc",
    tech: ["Tailwind CSS", "Node.js", "MySQL"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    liveUrl: "private",
    githubUrl: "private",
  },
  {
    id: "portfolio-web",
    title: "Interactive Web Portfolio & Dashboard",
    shortDescription: "Personal portfolio website featuring real-time GitHub stats and WakaTime coding activity integrations.",
    descriptionKey: "project_portfolio_desc",
    featuresKey: "project_portfolio_features",
    techKey: "project_portfolio_tech_desc",
    tech: ["React", "TailwindCSS", "API Integration"],
    image: "/project/portofolio.png",
    liveUrl: "https://portofolio-liard-zeta.vercel.app/",
    githubUrl: "https://github.com/sulistiorommy/portofolio",
  },
  {
    id: "tekma-solution",
    title: "Company Profile & Product Catalog",
    shortDescription: "Website company profile untuk PT Anugerah Jaya Tekma, penyedia jasa pemasangan CCTV, LED Videotron, dan sistem keamanan terpadu.",
    descriptionKey: "project_tekma_desc",
    featuresKey: "project_tekma_features",
    techKey: "project_tekma_tech_desc",
    tech: ["Next.js", "Tailwind CSS", "MySQL", "Node.js"],
    image: "/project/tekma_solution.png",
    liveUrl: "https://tekma-solution.com",
    githubUrl: "private",
  },
];

function ProjectLinks({ project }: { project: ProjectItem }) {
  return (
    <div className="flex items-center gap-4 mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
      {project.githubUrl === "private" ? (
        <span className="flex items-center gap-2 text-xs font-semibold text-slate-400 cursor-not-allowed">
          <Github size={16} /> Private
        </span>
      ) : (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
        >
          <Github size={16} /> Code
        </a>
      )}

      {project.liveUrl === "private" ? (
        <span className="flex items-center gap-2 text-xs font-semibold text-slate-400 cursor-not-allowed">
          <ExternalLink size={16} /> Internal
        </span>
      ) : (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
        >
          <ExternalLink size={16} /> Live Demo
        </a>
      )}
    </div>
  );
}

export function Project() {
  const { t } = useAppContext();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl pb-10">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
        {t('project')}
      </h1>
      <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">
        {t('project_text')}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((project) => (
          <Dialog key={project.id}>
            <div className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <DialogTrigger asChild>
                    <button className="bg-white text-slate-900 px-4 py-2 rounded-full font-medium text-sm flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <Info size={16} /> Details
                    </button>
                  </DialogTrigger>
                </div>
              </div>

              <div className="flex flex-col flex-1 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Folder size={18} className="text-blue-500" />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white line-clamp-1">{project.title}</h3>
                </div>

                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2 flex-1">
                  {project.shortDescription}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((techName) => (
                    <Badge key={techName} variant="secondary" className="bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 border-none">
                      {techName}
                    </Badge>
                  ))}
                </div>

                <ProjectLinks project={project} />
              </div>
            </div>

            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
                <DialogDescription className="text-slate-900 dark:text-slate-400 font-medium">
                  {t('project_detail_label')}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                <section>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2 underline decoration-blue-500 underline-offset-4">
                    {t('project_desc_label')}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed italic">
                    {t(project.descriptionKey)}
                  </p>
                </section>

                <section>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2 underline decoration-blue-500 underline-offset-4">
                    {t('project_features_label')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {t(project.featuresKey).split(',').map((feature) => (
                      <Badge key={feature.trim()} variant="outline" className="border-slate-200 dark:border-slate-700">
                        {feature.trim()}
                      </Badge>
                    ))}
                  </div>
                </section>

                <section>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2 underline decoration-blue-500 underline-offset-4">
                    {t('project_tech_label')}
                  </h4>
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl text-sm text-slate-600 dark:text-slate-400 space-y-2">
                    {t(project.techKey).split('.').map((sentence) => {
                      const trimmed = sentence.trim();
                      return trimmed ? <p key={trimmed}>{trimmed}.</p> : null;
                    })}
                  </div>
                </section>

                <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-start mt-6">
                  {project.githubUrl === "private" ? (
                    <Badge variant="outline" className="text-slate-400 border-slate-200 py-2 px-4 h-9">Private Repository</Badge>
                  ) : (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      <Github size={18} /> View Source
                    </a>
                  )}

                  {project.liveUrl === "private" ? (
                    <Badge variant="outline" className="text-slate-400 border-slate-200 py-2 px-4 h-9">Internal System Only</Badge>
                  ) : (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      <ExternalLink size={18} /> Visit Website
                    </a>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}