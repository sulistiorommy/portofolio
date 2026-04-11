import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { GitHubService } from "../services/GitHubService";
import { WakaTimeService } from "../services/WakaTimeService";
import { motion } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import { 
  Activity, 
  Clock, 
  Code, 
  GitCommit, 
  LineChart, 
  Users, 
  Github, 
  ExternalLink,
  BookOpen,
  Star,
  GitBranch
} from "lucide-react";

export function Dashboard() {
  const { t, theme } = useAppContext();
  const [profile, setProfile] = useState<any>(null);
  const [commits, setCommits] = useState<any[]>([]);
  const [wakaStats, setWakaStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [profileData, commitData, wakaData] = await Promise.all([
          GitHubService.getUserProfile(),
          GitHubService.getRecentCommits(3),
          WakaTimeService.getStats()
        ]);

        setProfile(profileData);
        setCommits(commitData);
        setWakaStats(wakaData.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat data dashboard. Pastikan API Key di .env sudah benar.");
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl text-red-600 dark:text-red-400">
        <p className="font-medium text-lg mb-2">Oops! Ada kesalahan</p>
        <p className="text-sm">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  const stats = [
    { 
      label: "Public Repos", 
      value: profile?.public_repos || "0", 
      icon: BookOpen, 
      color: "text-blue-500", 
      bgColor: "bg-blue-50 dark:bg-blue-900/20" 
    },
    { 
      label: "Followers", 
      value: profile?.followers || "0", 
      icon: Users, 
      color: "text-purple-500", 
      bgColor: "bg-purple-50 dark:bg-purple-900/20" 
    },
    { 
      label: "Total Coding Hours", 
      value: wakaStats?.human_readable_total || "0h", 
      icon: Clock, 
      color: "text-emerald-500", 
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20" 
    },
    { 
      label: "Weekly Daily Avg", 
      value: wakaStats?.daily_average || "0h", 
      icon: Activity, 
      color: "text-amber-500", 
      bgColor: "bg-amber-50 dark:bg-amber-900/20" 
    }
  ];

  return (
    <div className="max-w-5xl pb-10 space-y-8">
      {/* Profile Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm"
      >
        <div className="absolute top-0 right-0 p-8 opacity-5 dark:opacity-10 pointer-events-none">
          <Github size={160} />
        </div>
        
        <div className="relative flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
          <img 
            src={profile?.avatar_url} 
            alt={profile?.name} 
            className="w-32 h-32 rounded-3xl object-cover ring-4 ring-slate-50 dark:ring-slate-800 shadow-xl"
          />
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                {profile?.name}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                @{profile?.login}
              </p>
            </div>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl text-lg leading-relaxed">
              {profile?.bio || "Web Developer specializing in modern frontend technologies."}
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
              <a 
                href={profile?.html_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-medium text-sm hover:opacity-90 transition-all shadow-md group"
              >
                <Github size={18} /> View GitHub <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <div className="flex items-center gap-4 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-1.5"><Users size={16} /> <b>{profile?.followers}</b> Followers</span>
                <span className="flex items-center gap-1.5"><Star size={16} /> <b>{profile?.following}</b> Following</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Contribution Calendar Board */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Activity className="text-emerald-500" /> Contribution Board
          </h3>
          <span className="text-xs font-semibold px-2 py-1 bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-300 rounded-lg">Last 365 Days</span>
        </div>
        <div className="flex justify-center overflow-x-auto pb-2 scrollbar-hide">
          <div className="min-w-max p-2 rounded-xl bg-slate-50/50 dark:bg-slate-800/20">
            <GitHubCalendar 
              username="sulistiorommy" 
              colorScheme={theme === 'dark' ? 'dark' : 'light'}
              fontSize={12}
              blockSize={12}
              blockMargin={4}
            />
          </div>
        </div>
        <p className="mt-4 text-xs text-slate-400 dark:text-slate-500 text-center">
          Learn how we count contributions in GitHub
        </p>
      </motion.div>

      {/* WakaTime Board & Top Tools Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* WakaTime Board (2/3 width) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="text-emerald-500" /> Coding Activity (WakaTime)
            </h3>
            <span className="text-xs font-semibold px-2 py-1 bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-300 rounded-lg">Last 7 Days</span>
          </div>
          <div className="flex flex-col space-y-6">
            <div className="flex justify-between items-end h-32 gap-2">
              {[65, 45, 80, 55, 90, 70, 85].map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${val}%` }}
                    transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                    className="w-full bg-emerald-500/20 dark:bg-emerald-500/10 group-hover:bg-emerald-500 rounded-lg transition-all"
                  ></motion.div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</span>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-4">
               <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">Daily Average</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{wakaStats?.daily_average || "4h 06m"}</p>
               </div>
               <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">Total Time</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{wakaStats?.human_readable_total || "28h 45m"}</p>
               </div>
            </div>
          </div>
        </motion.div>

        {/* Tools & Apps (1/3 width) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800"
        >
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
            <Code className="text-blue-500" /> Software & Tools
          </h3>
          <div className="space-y-4">
             <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 group hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors">
                <div className="p-3 rounded-xl bg-blue-500 text-white shadow-md group-hover:scale-110 transition-transform">
                   <Code size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">VS Code</p>
                  <p className="text-xs text-slate-500">Primary Code Editor</p>
                </div>
             </div>
             <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 group hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-colors border-2 border-transparent hover:border-purple-500/20">
                <div className="p-3 rounded-xl bg-purple-600 text-white shadow-lg animate-pulse">
                   <Activity size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Antigravity AI</p>
                    <span className="text-[10px] px-1.5 py-0.5 bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 rounded-full font-bold uppercase tracking-tighter">Pair Partner</span>
                  </div>
                  <p className="text-xs text-slate-500">Advanced Agentic Coding</p>
                </div>
             </div>
             <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 group transition-colors">
                <div className="p-3 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400">
                   <Github size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">GitHub Desktop</p>
                  <p className="text-xs text-slate-500">Version Control</p>
                </div>
             </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Languages Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Code className="text-blue-500" /> Tech Stack Breakdown
            </h3>
            <span className="text-xs font-semibold px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500">Statistics</span>
          </div>
          <div className="space-y-6">
            {wakaStats?.languages?.map((lang: any, i: number) => (
              <div key={i}>
                <div className="flex justify-between text-sm font-medium mb-2.5">
                  <span className="text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${lang.name === 'TypeScript' ? 'bg-blue-500' : lang.name === 'JavaScript' ? 'bg-yellow-400' : 'bg-pink-500'}`}></span>
                    {lang.name}
                  </span>
                  <span className="text-slate-900 dark:text-slate-100">{lang.percent}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800/50 rounded-full h-2 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${lang.percent}%` }}
                    transition={{ duration: 1, delay: 0.7 + (i * 0.1) }}
                    className={`h-full rounded-full ${lang.name === 'TypeScript' ? 'bg-blue-500' : lang.name === 'JavaScript' ? 'bg-yellow-400' : 'bg-pink-500'}`}
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* GitHub Activity Summary */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col justify-center items-center text-center space-y-4"
        >
           <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2 w-full text-left">
            <LineChart className="text-purple-500" /> Productivity Insights
          </h3>
          <div className="flex-1 w-full flex items-center justify-center py-8">
            <div className="space-y-2">
              <p className="text-4xl font-black text-slate-900 dark:text-white">Active</p>
              <p className="text-slate-500 dark:text-slate-400 font-medium">Keep building amazing things!</p>
            </div>
          </div>
          <div className="w-full pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-4">
             <div className="text-left">
                <p className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">Total Stars</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">32</p>
             </div>
             <div className="text-left">
                <p className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">Total PRs</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">124</p>
             </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Commit Logs */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-slate-800"
      >
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <GitCommit className="text-blue-500" /> Recent Commit Logs
          </h3>
          <span className="text-xs font-semibold px-2 py-1 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 rounded-lg">Last 3 Activities</span>
        </div>
        <div className="space-y-6">
          {commits.length > 0 ? commits.map((commit, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + (i * 0.1) }}
              className="flex gap-6 items-start group"
            >
              <div className="relative flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-blue-500 group-hover:text-white transition-all shadow-sm">
                  <GitBranch size={18} />
                </div>
                {i !== commits.length - 1 && <div className="w-0.5 h-12 bg-slate-100 dark:bg-slate-800 mt-2"></div>}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                    {commit.message.split('\n')[0]}
                  </h4>
                  <span className="text-xs font-medium text-slate-400 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-md shrink-0">
                    {new Date(commit.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <span className="font-bold text-blue-500">{commit.repo}</span>
                  <span>•</span>
                  <span className="font-mono text-xs bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 rounded italic">#{commit.sha.substring(0, 7)}</span>
                </div>
              </div>
            </motion.div>
          )) : (
            <p className="text-center py-10 text-slate-500 dark:text-slate-400 italic">No recent activities found.</p>
          )}
        </div>
      </motion.div>
    </div>
  );
}