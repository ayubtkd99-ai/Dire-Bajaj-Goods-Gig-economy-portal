import React from 'react';
import { LanguageCode } from '../types';
import { TRANSLATIONS } from '../translations';
import { ShieldCheck, LogOut, HeartHandshake, Languages } from 'lucide-react';

interface HeaderProps {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  activeTab: 'proposal' | 'simulator';
  setActiveTab: (tab: 'proposal' | 'simulator') => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  setLanguage,
  activeTab,
  setActiveTab
}) => {
  const t = (key: string) => TRANSLATIONS[key]?.[language] || key;

  return (
    <header className="bg-slate-900 text-white shadow-md border-b border-slate-800" id="app_header">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:flex sm:items-center sm:justify-between">
        {/* Brand/Title */}
        <div className="flex items-center space-x-3 mb-4 sm:mb-0">
          <div className="p-2.5 bg-amber-500 text-slate-950 rounded-xl font-bold shadow-lg shadow-amber-500/20 flex items-center justify-center animate-pulse">
            <span className="text-xl font-mono">D</span>
            <span className="text-sm font-sans font-semibold">G</span>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-white flex items-center flex-wrap gap-2">
              <span>{t('appName')}</span>
              <span className="text-xs bg-amber-500/15 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-full uppercase font-mono tracking-wider">
                Dire Dawa GPM
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5 line-clamp-1">
              {t('tagline')}
            </p>
          </div>
        </div>

        {/* Dynamic Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          {/* Multi-Language Selector */}
          <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700/60" id="lang_selector">
            <span className="text-slate-400 p-1.5" title="Select Language">
              <Languages size={15} />
            </span>
            <button
              onClick={() => setLanguage('am')}
              className={`px-2.5 py-1 text-xs rounded font-medium transition ${
                language === 'am'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
              id="lang_am"
            >
              አማርኛ
            </button>
            <button
              onClick={() => setLanguage('om')}
              className={`px-2.5 py-1 text-xs rounded font-medium transition ${
                language === 'om'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
              id="lang_om"
            >
              Oromoo
            </button>
            <button
              onClick={() => setLanguage('so')}
              className={`px-2.5 py-1 text-xs rounded font-medium transition ${
                language === 'so'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
              id="lang_so"
            >
              Soomaali
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 text-xs rounded font-medium transition ${
                language === 'en'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
              id="lang_en"
            >
              English
            </button>
          </div>

          {/* Tab Toggles */}
          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800" id="view_tabs">
            <button
              onClick={() => setActiveTab('proposal')}
              className={`px-4 py-1.5 text-xs sm:text-sm font-medium rounded-md transition ${
                activeTab === 'proposal'
                  ? 'bg-slate-800 text-amber-400 border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              id="tab_proposal"
            >
              {t('proposalTab')}
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-4 py-1.5 text-xs sm:text-sm font-medium rounded-md transition ${
                activeTab === 'simulator'
                  ? 'bg-slate-800 text-amber-400 border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              id="tab_simulator"
            >
              💬 {t('simulatorTab')}
            </button>
          </div>
        </div>
      </div>

      {/* Managers & Credentials Banner */}
      <div className="bg-slate-950 border-t border-slate-800/80 px-4 py-1.5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between text-[11px] text-slate-400 gap-1 opacity-90">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-amber-500">{t('managersLabel')}:</span>
            <span className="text-slate-200 font-sans tracking-wide">{t('managerNames')}</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5 text-teal-400">
              <ShieldCheck size={12} />
              <span>{t('passwordInfo')}</span>
            </div>
            <div className="hidden sm:inline-block text-slate-500">|</div>
            <div>
              <span>📍 Dire Dawa, Ethiopia (ድሬዳዋ)</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
