import React from 'react';
import { useApp } from '../context/AppContext';
import { Globe, Sun, Moon, LayoutDashboard, Home } from 'lucide-react';
import { LanguageCode } from '../types/markscam';

export const Navbar: React.FC = () => {
  const { school, user, language, setLanguage, theme, toggleTheme, viewMode, setViewMode } = useApp();

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-custom shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-0 sm:h-18 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
        
        {/* Brand / Logo */}
        <div className="flex items-center space-x-3 cursor-pointer w-full sm:w-auto justify-between sm:justify-start" onClick={() => setViewMode('landing')}>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl accent-green text-white flex items-center justify-center font-extrabold text-xl shadow-md shrink-0">
              M
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-base sm:text-lg tracking-tight text-primary">MarksCam</span>
                <span className="px-2 py-0.5 text-[10px] sm:text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                  Cameroon SaaS
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-secondary truncate max-w-[220px] sm:max-w-xs">
                {language === 'fr' ? school.name_fr : school.name_en}
              </p>
            </div>
          </div>

          {/* Mobile user avatar */}
          <div className="flex sm:hidden items-center space-x-2 bg-secondary px-2.5 py-1 rounded-lg border border-custom">
            <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px]">
              {user.full_name.charAt(0)}
            </div>
            <span className="text-[11px] font-semibold text-primary">{user.role}</span>
          </div>
        </div>

        {/* Center / Right controls */}
        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-2 sm:space-x-3">
          
          {/* View mode toggle */}
          <div className="flex bg-secondary p-1 rounded-xl border border-custom">
            <button
              onClick={() => setViewMode('landing')}
              className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'landing'
                  ? 'bg-card text-primary shadow-xs font-semibold'
                  : 'text-secondary hover:text-primary'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span className="text-xs">{language === 'fr' ? 'Accueil' : language === 'ha' ? 'Gida' : 'Home'}</span>
            </button>
            <button
              onClick={() => setViewMode('dashboard')}
              className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'dashboard'
                  ? 'bg-card text-primary shadow-xs font-semibold'
                  : 'text-secondary hover:text-primary'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span className="text-xs">{language === 'fr' ? 'Tableau' : language === 'ha' ? 'Shafi' : 'Dashboard'}</span>
            </button>
          </div>

          {/* Language Switcher */}
          <div className="relative flex items-center bg-secondary border border-custom rounded-xl px-2 py-1.5">
            <Globe className="w-3.5 h-3.5 text-secondary mr-1" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as LanguageCode)}
              aria-label="Select Interface Language"
              className="bg-transparent text-xs font-semibold text-primary focus:outline-none cursor-pointer"
            >
              <option value="en" className="bg-card text-primary">EN</option>
              <option value="fr" className="bg-card text-primary">FR</option>
              <option value="ha" className="bg-card text-primary">HA</option>
            </select>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark/Light Mode"
            className="p-2 rounded-xl border border-custom bg-secondary text-secondary hover:text-primary transition-colors cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Desktop User Profile */}
          <div className="hidden lg:flex items-center space-x-2 pl-3 border-l border-custom">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
              {user.full_name.charAt(0)}
            </div>
            <div className="text-left text-xs">
              <p className="font-semibold text-primary truncate max-w-[120px]">{user.full_name}</p>
              <p className="text-[10px] text-secondary capitalize">{user.role.replace('_', ' ')}</p>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};
