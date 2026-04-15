import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { GitHubService } from "../services/GitHubService";
import { WakaTimeService } from "../services/WakaTimeService";
import { UmamiService } from "../services/UmamiService";
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
  GitBranch,
  Eye,
  MousePointerClick,
  Globe,
  TrendingUp,
  FileText,
  Share2
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  AreaChart,
  Area,
  YAxis
} from "recharts";

const UmamiLogo = ({ className = "" }) => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 40 40" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Handle (Top Arc) */}
    <path 
      d="M8 20C8 13.3726 13.3726 8 20 8C26.6274 8 32 13.3726 32 20" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round"
    />
    {/* Bowl (Bottom Solid) */}
    <path 
      d="M8 20C8 26.6274 13.3726 32 20 32C26.6274 32 32 26.6274 32 20H8Z" 
      fill="currentColor"
    />
  </svg>
);

export function Dashboard() {
  const { t, theme } = useAppContext();
  const [profile, setProfile] = useState<any>(null);
  const [commits, setCommits] = useState<any[]>([]);
  const [wakaStats, setWakaStats] = useState<any>(null);
  const [umamiStats, setUmamiStats] = useState<any>(null);
  const [umamiLocations, setUmamiLocations] = useState<any[]>([]);
  const [umamiPages, setUmamiPages] = useState<any[]>([]);
  const [umamiReferrers, setUmamiReferrers] = useState<any[]>([]);
  const [umamiChartData, setUmamiChartData] = useState<any[]>([]);
  const [chartView, setChartView] = useState<'7d' | '12m'>('7d');
  const [commitActivity, setCommitActivity] = useState<any[]>([]);
  const [totalStars, setTotalStars] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchingChart, setFetchingChart] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [profileData, commitData, wakaData, umamiData, locationsData, pagesData, referrersData, chartData, reposData, activityData] = await Promise.all([
          GitHubService.getUserProfile(),
          GitHubService.getRecentCommits(3),
          WakaTimeService.getStats(),
          UmamiService.getStats(),
          UmamiService.getLocations(),
          UmamiService.getMetrics('url'),
          UmamiService.getMetrics('referrer'),
          UmamiService.getChartData('7d'),
          GitHubService.getUserRepos(),
          GitHubService.getCommitActivity()
        ]);

        setProfile(profileData);
        setCommits(commitData);
        setWakaStats(wakaData.data);
        setUmamiStats(umamiData);
        setUmamiLocations(locationsData);
        setUmamiPages(pagesData);
        setUmamiReferrers(referrersData);
        setUmamiChartData(chartData);
        setCommitActivity(activityData);
        
        const stars = reposData.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0);
        setTotalStars(stars);
        
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat data dashboard. Pastikan API Key di .env sudah benar.");
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleToggleChart = async (view: '7d' | '12m') => {
    setChartView(view);
    setFetchingChart(true);
    const data = await UmamiService.getChartData(view);
    setUmamiChartData(data);
    setFetchingChart(false);
  };

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

  const formatTime = (seconds: number) => {
    if (!seconds) return "0s";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-900 p-3 border border-slate-200 dark:border-slate-700 shadow-xl rounded-xl">
          <p className="text-xs font-bold text-slate-400 uppercase mb-1">{payload[0].payload.x || payload[0].payload.day}</p>
          <p className="text-sm font-black text-blue-500">{payload[0].value} Visits</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-5xl pb-10 space-y-12">
      {/* Umami Web Analytics Section */}
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
            <UmamiLogo />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Web Analytics</h2>
            <p className="text-xs font-medium text-slate-500">Real-time website traffic via Umami</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              label: "Live Visitors", 
              value: umamiStats?.visitors || 0, 
              icon: <Activity size={20}/>, 
              color: "text-emerald-500", 
              bg: "bg-emerald-50 dark:bg-emerald-900/20" 
            },
            { 
              label: "Page Views", 
              value: umamiStats?.pageviews || 0, 
              icon: <Eye size={20}/>, 
              color: "text-blue-500", 
              bg: "bg-blue-50 dark:bg-blue-900/20" 
            },
            { 
              label: "Avg. Visit Time", 
              value: formatTime(umamiStats?.sessions > 0 ? umamiStats.totaltime / umamiStats.sessions : 0),
              icon: <Clock size={20}/>, 
              isString: true,
              color: "text-purple-500", 
              bg: "bg-purple-50 dark:bg-purple-900/20" 
            },
            { 
              label: "Events", 
              value: umamiStats?.events || 0, 
              icon: <TrendingUp size={20}/>, 
              color: "text-amber-500", 
              bg: "bg-amber-50 dark:bg-amber-900/20" 
            }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color}`}>
                  {stat.icon}
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">24h</span>
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900 dark:text-white group-hover:scale-105 transition-transform origin-left">
                  {stat.isString ? stat.value : stat.value.toLocaleString()}
                </p>
                <p className="text-xs font-medium text-slate-500 mt-1">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Visit History & Locations Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Visit History Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <LineChart className="text-blue-500" size={20} /> Visit History
              </h3>
              
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                <button 
                  onClick={() => handleToggleChart('7d')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${chartView === '7d' ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  7 Hari
                </button>
                <button 
                  onClick={() => handleToggleChart('12m')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${chartView === '12m' ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  12 Bulan
                </button>
              </div>
            </div>

            <div className={`h-64 w-full transition-opacity duration-300 ${fetchingChart ? 'opacity-30' : 'opacity-100'}`}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={umamiChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="x" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }}
                    tickFormatter={(val) => chartView === '7d' ? val.split('-').slice(2).join('') : val}
                  />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="y" 
                    stroke="#3b82f6" 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#colorVisits)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            {fetchingChart && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
              </div>
            )}
          </motion.div>

          {/* Visitor Locations */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm"
          >
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-8">
              <Globe className="text-purple-500" size={20} /> Visitor Locations
            </h3>
            
            <div className="space-y-6">
              {umamiLocations.length > 0 ? (
                umamiLocations.map((loc, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                         {loc.x}
                      </span>
                      <span className="text-slate-400 text-xs font-black">{loc.y}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((loc.y / (umamiLocations[0]?.y || 1)) * 100, 100)}%` }}
                        transition={{ duration: 1, delay: 0.3 + (i * 0.1) }}
                        className="h-full bg-purple-500 rounded-full"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center py-10 text-slate-400 text-sm italic">No location data available</p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Detailed Metrics: Pages & Referrers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Pages */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm"
          >
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-8">
              <FileText className="text-blue-500" size={20} /> Top Pages
            </h3>
            
            <div className="space-y-6">
              {umamiPages.length > 0 ? (
                umamiPages.map((page, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-bold text-slate-700 dark:text-slate-300 truncate max-w-[80%]" title={page.x}>
                         {page.x}
                      </span>
                      <span className="text-slate-400 text-xs font-black">{page.y}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((page.y / (umamiPages[0]?.y || 1)) * 100, 100)}%` }}
                        transition={{ duration: 1, delay: 0.4 + (i * 0.1) }}
                        className="h-full bg-blue-500 rounded-full"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center py-10 text-slate-400 text-sm italic">No page data available</p>
              )}
            </div>
          </motion.div>

          {/* Top Referrers */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm"
          >
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-8">
              <Share2 className="text-emerald-500" size={20} /> Top Referrers
            </h3>
            
            <div className="space-y-6">
              {umamiReferrers.length > 0 ? (
                umamiReferrers.map((ref, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-bold text-slate-700 dark:text-slate-300 truncate max-w-[80%]" title={ref.x}>
                         {ref.x === "direct" ? "Link Langsung" : ref.x}
                      </span>
                      <span className="text-slate-400 text-xs font-black">{ref.y}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((ref.y / (umamiReferrers[0]?.y || 1)) * 100, 100)}%` }}
                        transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                        className="h-full bg-emerald-500 rounded-full"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center py-10 text-slate-400 text-sm italic">No referrer data available</p>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* GitHub Section */}
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl shadow-lg ring-4 ring-slate-100 dark:ring-slate-800">
            <Github size={22} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">GitHub</h2>
            <p className="text-xs font-medium text-slate-500">Real-time repository and contribution metrics</p>
          </div>
        </div>

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
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* GitHub Activity Summary (Productivity Insights) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4"
          >
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2 w-full text-left">
              <LineChart className="text-purple-500" /> Productivity Insights
            </h3>
            
            <div className="flex-1 w-full flex flex-col items-center justify-center">
              {commitActivity.length > 0 ? (
                <div className="h-32 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={commitActivity}>
                      <defs>
                        <linearGradient id="colorCommits" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Tooltip 
                        contentStyle={{ backgroundColor: theme === 'dark' ? '#0f172a' : '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        labelStyle={{ color: '#94a3b8', fontWeight: 'bold' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="commits" 
                        stroke="#8b5cf6" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorCommits)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="space-y-2 text-center py-4">
                  <p className="text-4xl font-black text-slate-900 dark:text-white">Active</p>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">Keep building amazing things!</p>
                </div>
              )}
            </div>

            <div className="w-full pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-3 gap-2">
              <div className="text-left">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-1">Stars</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{totalStars}</p>
              </div>
              <div className="text-left">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-1">Repos</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{profile?.public_repos || 0}</p>
              </div>
              <div className="text-left">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-1">Followers</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{profile?.followers || 0}</p>
              </div>
            </div>
          </motion.div>

          {/* Recent Commit Logs */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <GitCommit className="text-blue-500" /> Recent Commit Logs
              </h3>
              <span className="text-xs font-semibold px-2 py-1 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 rounded-lg">Last 3</span>
            </div>
            <div className="space-y-4">
              {commits.length > 0 ? (
                commits.slice(0, 3).map((commit, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-blue-500 shrink-0">
                      <GitBranch size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{commit.message.split('\n')[0]}</p>
                      <p className="text-[10px] text-slate-500">{commit.repo} • {new Date(commit.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center py-6 text-slate-500 italic text-sm">No recent commits</p>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* WakaTime Activity Section */}
      <div className="space-y-8 pt-8 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl shadow-lg ring-4 ring-slate-100 dark:ring-slate-800">
            <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current">
              <path d="M128,0 C57.308,0 0,57.308 0,128 C0,198.693 57.308,256 128,256 C198.693,256 256,198.693 256,128 C256,57.308 198.693,0 128,0 M128,33.805 C179.939,33.805 222.195,76.061 222.195,128 C222.195,179.94 179.939,222.195 128,222.195 C76.061,222.195 33.805,179.94 33.805,128 C33.805,76.061 76.061,33.805 128,33.805 M115.4993,155.6431 L115.3873,155.6431 C113.4353,155.6081 111.6083,154.6751 110.4343,153.1151 L81.5593,114.7321 C79.4553,111.9351 80.0173,107.9611 82.8143,105.8561 C85.6123,103.7511 89.5853,104.3131 91.6903,107.1111 L115.6833,139.0051 L122.5463,130.5271 C123.7493,129.0411 125.5603,128.1771 127.4723,128.1771 L127.4803,128.1771 C129.3973,128.1791 131.2093,129.0471 132.4103,130.5411 L139.0003,138.7281 L176.6923,90.1341 C178.8353,87.3681 182.8173,86.8651 185.5843,89.0111 C188.3493,91.1561 188.8533,95.1371 186.7073,97.9041 L144.1003,152.8371 C142.9143,154.3681 141.0883,155.2721 139.1503,155.2901 L139.0933,155.2901 C137.1743,155.2901 135.3583,154.4221 134.1553,152.9261 L127.4583,144.6071 L120.4253,153.2931 C119.2213,154.7811 117.4103,155.6431 115.4993,155.6431"/>
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">WakaTime</h2>
            <p className="text-xs font-medium text-slate-500">Language distribution and time tracking by WakaTime</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* WakaTime Board */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="text-emerald-500" /> Time Spent
              </h3>
              <span className="text-xs font-semibold px-2 py-1 bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-300 rounded-lg">Last 7 Days</span>
            </div>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={wakaStats?.activity || []} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} 
                    dy={10}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                  <Bar 
                    dataKey="hours" 
                    radius={[6, 6, 0, 0]} 
                    barSize={40}
                  >
                    {wakaStats?.activity?.map((entry: any, index: number) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={theme === 'dark' ? '#10b98120' : '#10b98140'} 
                        className="hover:fill-emerald-500 transition-colors duration-300 cursor-pointer"
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-4">
               <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">Daily Average</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{wakaStats?.daily_average || "0h"}</p>
               </div>
               <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">Total Time</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{wakaStats?.human_readable_total || "0h"}</p>
               </div>
            </div>
          </motion.div>

          {/* Software & Tools */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800"
          >
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-6">
              <Code className="text-blue-500" /> Environment
            </h3>
            <div className="space-y-4">
               {[
                 { name: "VS Code", desc: "Primary Editor", icon: <Code size={18}/>, color: "bg-blue-500" },
                 { name: "Antigravity AI", desc: "AI Partner", icon: <Activity size={18}/>, color: "bg-purple-600" },
                 { name: "GitHub Desktop", desc: "Version Control", icon: <Github size={18}/>, color: "bg-slate-500" }
               ].map((tool, i) => (
                 <div key={i} className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 transition-colors">
                    <div className={`p-2.5 rounded-xl ${tool.color} text-white shadow-sm`}>
                       {tool.icon}
                    </div>
                    <div>
                       <p className="text-sm font-bold text-slate-900 dark:text-white">{tool.name}</p>
                       <p className="text-[10px] text-slate-500">{tool.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
          </motion.div>
        </div>

        {/* Top Languages Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-slate-800"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Code className="text-blue-500" /> Tech Stack Breakdown
            </h3>
            <span className="text-xs font-semibold px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500">Top Languages</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {wakaStats?.languages?.slice(0, 4).map((lang: any, i: number) => (
              <div key={i} className="space-y-3">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-slate-700 dark:text-slate-300">{lang.name}</span>
                  <span className="text-blue-500">{lang.percent}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${lang.percent}%` }}
                    transition={{ duration: 1, delay: 0.8 + (i * 0.1) }}
                    className="h-full bg-blue-500 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}