/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { LanguageCode } from './types';
import { Header } from './components/Header';
import { ProposalViewer } from './components/ProposalViewer';
import { AppSimulator } from './components/AppSimulator';
import { Award, Briefcase, FileCode, CheckCircle, Info } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<LanguageCode>('am');
  const [activeTab, setActiveTab] = useState<'proposal' | 'simulator'>('proposal');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950" id="main_app_element">
      {/* Localized Header & Navigation */}
      <Header
        language={language}
        setLanguage={setLanguage}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Interactive Workspaces */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 md:py-8 space-y-8" id="workspace_main">
        {activeTab === 'proposal' ? (
          <div className="space-y-6 animate-fade-in" id="proposal_view_segment">
            {/* Short Introduction card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6" id="intro_quick_banner">
              <div className="space-y-2">
                <div className="inline-flex items-center space-x-2 text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full uppercase font-mono tracking-wider">
                  <Briefcase size={13} className="text-amber-400" />
                  <span>{language === 'am' ? 'ፕሮፖዛል ጥናት' : 'Active Venture Proposal'}</span>
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
                  {language === 'am' 
                    ? 'በድሬዳዋ የዲጂታል ጊግ ኢኮኖሚን በመጠቀም የወጣቶች ስራ እድል ፈጠራ' 
                    : 'Unlocking Dire Dawa’s Gig Potential for Young Freelancers'}
                </h2>
                <p className="text-xs md:text-sm text-slate-400 leading-normal max-w-3xl">
                  {language === 'am' 
                    ? 'ይህ በሀገሪቱ የመጀመሪያውን ራሱን የቻለ የጊግ ባለሙያዎች ማዕከል (GPM - Gig Professional Marketplace) በድሬዳዋ ከተማ ለማቋቋም የተዘጋጀ ፕሮፖዛል ሲሆን፣ የከተማዋን ነባራዊ የትራንስፖርትና የገበያ ባህል መሰረት ያደረገ ነው ።'
                    : 'Socio-economic research centering on deploying the first Gig Professional Marketplace (GPM) in Dire Dawa to organize informal Bajaj transport and goods delivery sectors.'}
                </p>
              </div>

              {/* Core numbers showcase */}
              <div className="flex gap-4 shrink-0 font-sans">
                <div className="bg-slate-950 px-4 py-3 rounded-xl border border-slate-800 text-center min-w-[100px]">
                  <span className="text-[10px] text-slate-500 uppercase font-mono">CAPEX Target</span>
                  <div className="text-lg font-bold text-amber-400 font-mono mt-0.5">500k</div>
                  <span className="text-[9px] text-slate-400">ETB Capital</span>
                </div>
                <div className="bg-slate-950 px-4 py-3 rounded-xl border border-slate-800 text-center min-w-[100px]">
                  <span className="text-[10px] text-slate-500 uppercase font-mono">Est. Launch</span>
                  <div className="text-lg font-bold text-teal-400 font-mono mt-0.5">6 Mo</div>
                  <span className="text-[9px] text-slate-400">Payback Period</span>
                </div>
              </div>
            </div>

            {/* Complete Interactive Chapters */}
            <ProposalViewer language={language} />
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in" id="applet_simulator_segment">
            {/* Simulator header introduction */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6" id="simulator_quick_banner">
              <div className="space-y-2">
                <div className="inline-flex items-center space-x-2 text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full uppercase font-mono tracking-wider">
                  <CheckCircle size={13} className="text-emerald-400 animate-pulse" />
                  <span>Live App Simulator</span>
                </div>
                <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
                  {language === 'am' ? 'ድሬ ባጃጅና እቃ ማገናኝ መተግበሪያ' : 'Dire Bajaj & Goods Mobile Platform'}
                </h2>
                <p className="text-xs md:text-sm text-slate-400 leading-normal max-w-3xl">
                  {language === 'am'
                    ? 'ባጃጆችና የሸቀጣሸቀጥ አድራሾችን ከደንበኞችና ከነጋዴዎች ጋር በቀጥታ የሚያገናኝ መተግበሪያ የሙከራ ማሳያ ። የቢዝነስ ሞዴሉን በትክክል ለመፈተሽ ይረዳዎታል ።'
                    : 'Visual smartphone simulation showing dispatch synchronization, offline USSD dialling, SOS security monitors, and 5% GPM commission loops.'}
                </p>
              </div>

              {/* Password badge */}
              <div className="bg-slate-950 px-4 py-3 rounded-xl border border-teal-500/20 text-center shrink-0">
                <span className="text-[9px] text-slate-500 uppercase font-mono block">Access Password</span>
                <span className="text-sm font-bold text-teal-400 font-mono">12345ayub</span>
              </div>
            </div>

            {/* Phone handset simulator component */}
            <AppSimulator language={language} />
          </div>
        )}
      </main>

      {/* Elegant minimalist footer */}
      <footer className="bg-slate-950 text-slate-500 text-xs py-8 border-t border-slate-900 mt-12" id="app_footer">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-1 text-center md:text-left">
            <p className="font-bold text-slate-400">ድሬ ባጃጅና እቃ ማገናኝ የጊግ ማዕከል © 2026</p>
            <p className="text-[11px]">በድሬዳዋ ከተማ አስተዳደር የወጣቶች ስራ እድል ፈጠራ የተዘጋጀ ሀገራዊ ስልታዊ ጥናት ።</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 text-[11px] text-slate-400 font-mono">
            <div className="flex flex-wrap justify-center items-center gap-2">
              <span className="text-slate-500">Call Owner (Ayub):</span>
              <a href="tel:0915167750" className="text-amber-400 hover:underline hover:text-amber-300 transition-colors">0915167750</a>
              <span className="text-slate-700">|</span>
              <span className="text-slate-500">Manager (Elias):</span>
              <a href="tel:0940887021" className="text-teal-400 hover:underline hover:text-teal-300 transition-colors">0940887021</a>
            </div>
            <span className="hidden md:inline text-slate-800">|</span>
            <div className="text-center md:text-right">
              <span className="text-slate-500 font-bold">Pass: <span className="text-teal-400 font-semibold select-all font-mono">12345ayub</span></span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
