import { Outlet, NavLink, Link, useLocation } from "react-router";
import { useAppContext } from "../context/AppContext";
import { Moon, Sun, Languages, Home, User, Award, FolderOpen, LayoutDashboard, Mail, Menu, X, Linkedin, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import * as Switch from "@radix-ui/react-switch";

export function Root() {
  const { theme, setTheme, language, setLanguage, t } = useAppContext();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const pageTitle = navLinks.find(link => link.path === location.pathname)?.name || "Portfolio";
    document.title = `${t(pageTitle)} | ${t('fullname')}`;
  }, [location.pathname, language, t]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const toggleLanguage = () => {
    setLanguage(language === "id" ? "en" : "id");
  };

  const navLinks = [
    { name: "home", path: "/", icon: Home },
    { name: "about", path: "/about", icon: User },
    { name: "achievements", path: "/achievements", icon: Award },
    { name: "project", path: "/project", icon: FolderOpen },
    { name: "dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "contact", path: "/contact", icon: Mail },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full overflow-y-auto w-64 border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {/* 1. Header with Compact Switches */}
      <div className="flex items-center justify-between p-4 gap-2">
        {/* Theme Toggle */}
        <div className="flex items-center gap-2">
          {theme === 'light' ? <Sun size={20} className="text-amber-500" /> : <Moon size={20} className="text-blue-400" />}
          <Switch.Root
            checked={theme === 'dark'}
            onCheckedChange={toggleTheme}
            className="w-9 h-5 bg-slate-200 dark:bg-slate-700 rounded-full relative shadow-inner focus:outline-none transition-colors data-[state=checked]:bg-blue-600 border border-slate-200 dark:border-slate-600"
          >
            <Switch.Thumb className="block w-4 h-4 bg-white rounded-full shadow-lg transition-transform duration-200 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[16px]" />
          </Switch.Root>
        </div>

        {/* Language Toggle */}
        <div className="flex items-center gap-2">
          <Languages size={20} className="text-slate-500" />
          <div className="flex items-center gap-1.5">
            <span className={`text-[10px] font-bold ${language === 'id' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`}>ID</span>
            <Switch.Root
              checked={language === 'en'}
              onCheckedChange={toggleLanguage}
              className="w-9 h-5 bg-slate-200 dark:bg-slate-700 rounded-full relative shadow-inner focus:outline-none transition-colors data-[state=checked]:bg-blue-600 border border-slate-200 dark:border-slate-600"
            >
              <Switch.Thumb className="block w-4 h-4 bg-white rounded-full shadow-lg transition-transform duration-200 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[16px]" />
            </Switch.Root>
            <span className={`text-[10px] font-bold ${language === 'en' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`}>EN</span>
          </div>
        </div>
      </div>

      {/* 2 & 3. Profile Info */}
      <div className="flex flex-col items-center mt-6 mb-8 px-4">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500 dark:border-blue-400 mb-4 shadow-lg">
          <ImageWithFallback
            src="/img/rommy sulistio.jpg"
            alt="Profile Picture"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white text-center">
          {t('fullname')}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t('role')}</p>
      </div>

      {/* 4. Divider */}
      <div className="px-6 mb-4">
        <hr className="border-slate-200 dark:border-slate-800" />
      </div>

      {/* 5. Menu Links */}
      <nav className="flex-1 px-4 space-y-2">
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                  ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
                }`
              }
            >
              <Icon size={20} />
              <span className="capitalize">{t(link.name)}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* 6. Footer */}
      <div className="p-4 mt-auto">
        <p className="text-[10px] text-center text-slate-400 font-medium uppercase tracking-widest opacity-60">
          © 2026 {t('fullname')}
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden text-slate-900 dark:text-slate-100">
      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform md:hidden transition-transform duration-300 ease-in-out ${isMobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {sidebarContent}
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block h-full z-10">
        {sidebarContent}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <span className="font-bold text-lg">{t('fullname')}</span>
          <button
            onClick={() => setIsMobileOpen(true)}
            className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Outlet Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 w-full max-w-5xl mx-auto">
          <Outlet />
        </main>

        {/* Floating Contact Button */}
        <Link
          to="/contact"
          className="fixed bottom-8 right-8 z-40 group flex items-center gap-0 hover:gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-full shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/60 transition-all duration-300 overflow-hidden md:flex transition-all"
        >
          <Phone className="w-6 h-6" />
          <span className="max-w-0 group-hover:max-w-[100px] overflow-hidden transition-all duration-500 font-bold whitespace-nowrap">
            {t('contact')}
          </span>
        </Link>
      </div>
    </div>
  );
}