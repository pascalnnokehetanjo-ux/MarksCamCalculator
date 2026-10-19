import React from 'react';
import { useApp } from '../context/AppContext';
import { Globe, Sun, Moon, LayoutDashboard, Home } from 'lucide-react';
import { LanguageCode } from '../types/markscam';

export const Navbar: React.FC = () => {
  const { school, user, language, setLanguage, theme, toggleTheme, viewMode, setViewMode } = useApp();

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-custom shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div className="flex items-center space-x-2.5 cursor-pointer truncate mr-2" onClick={() => setViewMode('landing')}>
          <div className="w-9 h-9 rounded-xl accent-green text-white flex items-center justify-center font-extrabold text-lg shadow-sm shrink-0">
            M
          </div>
          <div className="truncate">
            <div className="flex items-center space-x-1.5">
              <span className="font-bold text-sm sm:text-base tracking-tight text-primary">MarksCam</span>
              <span className="hidden md:inline-block px-2 py-0.5 text-[10px] font-semibold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                Cameroon
              </span>
            </div>
            <p className="text-[10px] text-secondary truncate max-w-[140px] sm:max-w-xs">
              {language === 'fr' ? school.name_fr : school.name_en}
            </p>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-1.5 sm:space-x-3 shrink-0">
          
          {/* View mode toggle */}
          <div className="flex bg-secondary p-1 rounded-lg border border-custom">
            <button
              onClick={() => setViewMode('landing')}
              className={`flex items-center space-x-1 px-2 py-1 rounded-md text-[11px] font-medium transition-all ${
                viewMode === 'landing'
                  ? 'bg-card text-primary shadow-xs font-semibold'
                  : 'text-secondary hover:text-primary'
              }`}
            >
              <Home className="w-3 h-3" />
              <span className="hidden sm:inline">{language === 'fr' ? 'Accueil' : language === 'ha' ? 'Gida' : 'Home'}</span>
            </button>
            <button
              onClick={() => setViewMode('dashboard')}
              className={`flex items-center space-x-1 px-2 py-1 rounded-md text-[11px] font-medium transition-all ${
                viewMode === 'dashboard'
                  ? 'bg-card text-primary shadow-xs font-semibold'
                  : 'text-secondary hover:text-primary'
              }`}
            >
              <LayoutDashboard className="w-3 h-3" />
              <span className="hidden sm:inline">{language === 'fr' ? 'Tableau' : language === 'ha' ? 'Shafi' : 'Dashboard'}</span>
            </button>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center bg-secondary border border-custom rounded-lg px-1.5 py-1">
            <Globe className="w-3 h-3 text-secondary mr-1" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as LanguageCode)}
              aria-label="Select Interface Language"
              className="bg-transparent text-[11px] font-semibold text-primary focus:outline-none cursor-pointer"
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
            className="p-1.5 rounded-lg border border-custom bg-secondary text-secondary hover:text-primary transition-colors cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-700" />}
          </button>

        </div>

      </div>
    </header>
  );
};
