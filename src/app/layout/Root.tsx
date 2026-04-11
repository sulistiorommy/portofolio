import { Outlet, NavLink } from "react-router";
import { useAppContext } from "../context/AppContext";
import { Moon, Sun, Languages, Home, User, Award, FolderOpen, LayoutDashboard, Mail, Menu, X } from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Root() {
  const { theme, setTheme, language, setLanguage, t } = useAppContext();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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
      {/* 1. Header with Switches */}
      <div className="flex items-center justify-between p-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle Theme"
        >
          {theme === "light" ? <Moon size={20} className="text-slate-700 dark:text-slate-300" /> : <Sun size={20} className="text-slate-700 dark:text-slate-300" />}
        </button>
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          <Languages size={18} />
          {language.toUpperCase()}
        </button>
      </div>

      {/* 2 & 3. Profile Info */}
      <div className="flex flex-col items-center mt-6 mb-8 px-4">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500 dark:border-blue-400 mb-4 shadow-lg">
          <ImageWithFallback
            src="../public/img/rommy sulistio.jpg"
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
      <nav className="flex-1 px-4 space-y-2 pb-8">
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
      </div>
    </div>
  );
}