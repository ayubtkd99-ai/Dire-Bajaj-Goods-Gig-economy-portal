import React, { useState } from 'react';
import { LanguageCode, Hub } from '../types';
import { TRANSLATIONS, STUDY_FINANCIALS_DATA, STUDY_APP_COMPARISON, STUDY_RISKS_DATA, STUDY_HUBS_DATA } from '../translations';
import { FinancialCalculatorComponent } from './FinancialCalculatorComponent';
import { RevenueGrowthChart } from './RevenueGrowthChart';
import {
  BookOpen,
  MapPin,
  ClipboardList,
  Flame,
  Lightbulb,
  Building,
  DollarSign,
  TrendingUp,
  Map,
  Compass,
  AlertTriangle,
  Award,
  X,
  Printer,
  FileText,
  CheckSquare
} from 'lucide-react';

interface ProposalViewerProps {
  language: LanguageCode;
}

export const ProposalViewer: React.FC<ProposalViewerProps> = ({ language }) => {
  const [activeSegment, setActiveSegment] = useState<string>('all');
  const [selectedHub, setSelectedHub] = useState<Hub | null>(STUDY_HUBS_DATA[0]);
  const [completedLegalSteps, setCompletedLegalSteps] = useState<number[]>([1, 2]);
  const [showProposalSummaryModal, setShowProposalSummaryModal] = useState<boolean>(false);

  const t = (key: string) => TRANSLATIONS[key]?.[language] || key;

  // Render a visual map highlighting stations and markets in Dire Dawa
  const renderInteractiveMap = () => {
    return (
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-xl relative overflow-hidden" id="interactive_map_section">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Compass className="text-amber-500 animate-spin" size={18} />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-300">
              {language === 'am' ? 'የድሬዳዋ እንቅስቃሴ ማዕከላት ካርታ' : 'Dire Dawa Hubs Interlink'}
            </span>
          </div>
          <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full uppercase font-mono">
            SVG Vector Map
          </span>
        </div>

        {/* The Graphic Canvas Map wrapper */}
        <div className="relative aspect-[16/10] bg-slate-900/60 rounded-xl border border-slate-800/80 overflow-hidden flex items-center justify-center">
          
          {/* Subtle desert grid backing */}
          <div className="absolute inset-0 bg-[radial-gradient(#334155_1.2px,transparent_1.2px)] [background-size:16px_16px] opacity-20"></div>

          {/* Connected Hub paths (SVGs to draw connecting trade channels) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            {/* Draw direct connecting loops between stations and markets to represent gig demand lanes */}
            <path d="M 25 35 Q 50 15 50 20" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 4" fill="none" className="opacity-40" />
            <path d="M 50 20 Q 65 25 80 35" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 4" fill="none" className="opacity-40" />
            <path d="M 25 35 Q 35 55 45 55" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="6 3" fill="none" className="opacity-50" />
            <path d="M 45 55 L 65 45" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="6 3" fill="none" className="opacity-50" />
            <path d="M 45 55 L 30 75" stroke="#10b981" strokeWidth="2.5" fill="none" className="opacity-45" />
            <path d="M 65 45 L 80 35" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="6 3" fill="none" className="opacity-50" />
            <path d="M 65 45 L 85 70" stroke="#10b981" strokeWidth="2.5" fill="none" className="opacity-45" />
            <path d="M 80 35 L 85 70" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 4" fill="none" className="opacity-40" />
          </svg>

          {/* Hub Pins on the map */}
          {STUDY_HUBS_DATA.map((hub) => {
            const isSelected = selectedHub?.id === hub.id;
            return (
              <button
                key={hub.id}
                onClick={() => setSelectedHub(hub)}
                className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all p-1.5 rounded-full z-10 flex flex-col items-center group cursor-pointer ${
                  isSelected
                    ? 'scale-125 z-20'
                    : 'hover:scale-110'
                }`}
                style={{
                  position: 'absolute',
                  left: `${hub.coords.x}%`,
                  top: `${hub.coords.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                id={`map_pin_${hub.id}`}
              >
                <div className={`p-1.5 rounded-xl shadow-lg border transition-all ${
                  hub.type === 'station'
                    ? isSelected ? 'bg-amber-500 text-slate-950 border-white scale-110' : 'bg-slate-850 text-amber-400 border-amber-500/40'
                    : isSelected ? 'bg-emerald-500 text-slate-950 border-white scale-110' : 'bg-slate-850 text-emerald-400 border-emerald-500/40'
                }`}>
                  <MapPin size={15} />
                </div>
                
                {/* Micro Label */}
                <span className={`mt-1 text-[9px] px-1.5 py-0.5 rounded font-medium whitespace-nowrap border tracking-wide transition-all ${
                  isSelected 
                    ? 'bg-slate-950 text-white border-amber-500/40 max-w-[150px]'
                    : 'bg-slate-900/90 text-slate-400 border-slate-800 group-hover:text-slate-200'
                }`}>
                  {hub.name[language]}
                </span>
              </button>
            );
          })}

          {/* Compass Rose Graphics overlay */}
          <div className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-600 bg-slate-950/80 px-2 py-1 rounded border border-slate-900/60 pointer-events-none select-none">
            DIRE DAWA (ድሬዳዋ) <br/> Latitude: 9.6009° N <br/> Longitude: 41.8596° E
          </div>
        </div>

        {/* Selected Hub Description Panel */}
        {selectedHub && (
          <div className="mt-4 bg-slate-900/90 border border-slate-800 rounded-xl p-4 transition-all" id="hub_details_panel">
            <div className="flex items-center justify-between mb-1">
              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                selectedHub.type === 'station'
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              }`}>
                {selectedHub.type === 'station' 
                  ? (language === 'am' ? 'የትራንስፖርት ጣቢያ (Commute Station)' : 'Transit Hub')
                  : (language === 'am' ? 'የገበያ ስፍራ (Wholesale Market)' : 'Marketplace')}
              </span>
              <span className="font-mono text-[10px] text-slate-500">
                Coords: {selectedHub.coords.x}x, {selectedHub.coords.y}y
              </span>
            </div>
            <h4 className="font-sans font-bold text-slate-200 text-sm">
              {selectedHub.name[language]}
            </h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              {selectedHub.description[language]}
            </p>
            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800/80">
              <span>
                {language === 'am' ? 'ዋነኛ ተንቀሳቃሽ፡' : 'Key Fleet Users:'} <strong className="text-slate-300">{selectedHub.type === 'station' ? 'ባጃጆች (Bajaj & Tuk-tuk)' : 'የሸቀጥ አድራሾች (Cargo Motors)'}</strong>
              </span>
              <span className="text-amber-500 font-semibold font-mono">
                {selectedHub.type === 'station' ? 'Avg. Commute Wave: 5-10 min' : 'High delivery density'}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render Business Registration steps
  const renderLegalSteps = () => {
    const steps = [
      { id: 1, title: language === 'am' ? 'የንግድ ስም ምዝገባ (Name Reservation)' : '1. Name Reservation', desc: language === 'am' ? 'ሶስት አማራጭ ስሞችን በማዘጋጀት በድሬዳዋ ንግድ ቢሮ ማስያዝ ።' : 'Submit 3 potential names to the Dire Dawa Trade Bureau for clearance.', agency: 'Dire Dawa Trade Bureau' },
      { id: 2, title: language === 'am' ? 'መተዳደሪያ ደንብ ምዝገባ (Memorandum/Articles)' : '2. Memorandum of Association', desc: language === 'am' ? 'የንግድ ማህበሩን መተዳደሪያ ሰነዶች በሰነዶች ምዝገባና ማረጋገጫ ኤጀንሲ (DARA) ማስፈረም' : 'Draft legal articles and register under the Federal Documents Authentications Agency (DARA).', agency: 'DARA Agency' },
      { id: 3, title: language === 'am' ? 'የግብር ከፋይ መለያ ቁጥር (TIN)' : '3. Taxpayer Identification Number', desc: language === 'am' ? 'በአካባቢው የገቢዎች ባለስልጣን ቢሮ TIN ምርመራና የባዮሜትሪክስ ምዝገባ ማጠናቀቅ ።' : 'Complete biometric capture and obtain a unique TIN for tax filings.', agency: 'Revenues Authority' },
      { id: 4, title: language === 'am' ? 'የንግድ ምዝገባ ምስክርና ፈቃድ' : '4. Commercial Registration & Trade License', desc: language === 'am' ? 'የባንክ መነሻ ካፒታል አስገብቶ የሊዝ ኪራይ ቢሮ አድራሻ በማረጋገጥ የንግድ ፈቃድ መውሰድ ።' : 'Deposit capital in bank, present authenticated office lease, and acquire the trade license.', agency: 'Dire Dawa Trade Bureau' },
      { id: 5, title: language === 'am' ? 'የስታርትአፕ ሰርተፊኬት በMInT' : '5. Startup Designation Certificate', desc: language === 'am' ? 'ኢኖቬሽንና ቴክኖሎጂ ሚኒስቴር ስር በመመዝገብ ከቀረጥ ነፃ የግብር መብቶችና ዝቅተኛ ብድሮች ማግኘት ።' : 'File for label in MInT to claim standard tax exemptions, duty-free hardware, and tech grants.', agency: 'Ministry of Innovation & Technology (MInT)' }
    ];

    const toggleStep = (id: number) => {
      if (completedLegalSteps.includes(id)) {
        setCompletedLegalSteps(completedLegalSteps.filter((s) => s !== id));
      } else {
        setCompletedLegalSteps([...completedLegalSteps, id]);
      }
    };

    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4" id="legal_framework_section">
        <div className="flex items-center space-x-2">
          <Building className="text-amber-500" size={20} />
          <h3 className="font-sans font-bold text-slate-100 text-lg">
            {t('legalFrameworkExplore')}
          </h3>
        </div>

        <div className="space-y-3">
          {steps.map((step) => {
            const isCompleted = completedLegalSteps.includes(step.id);
            return (
              <div
                key={step.id}
                onClick={() => toggleStep(step.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                  isCompleted
                    ? 'bg-emerald-500/5 border-emerald-500/30 shadow-indigo-500/5'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700/80'
                }`}
                id={`legal_step_${step.id}`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center border font-mono text-xs font-bold transition-all ${
                    isCompleted
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                      : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}>
                    {isCompleted ? '✓' : step.id}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className={`text-xs font-bold tracking-tight transition-all ${
                        isCompleted ? 'text-emerald-400' : 'text-slate-200'
                      }`}>
                        {step.title}
                      </h4>
                      <span className="text-[10px] font-mono text-slate-500 font-medium">
                        {step.agency}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Navigation segment helper
  const segments = [
    { id: 'all', title: language === 'am' ? 'ሁሉንም እይ' : 'Full Study', icon: <BookOpen size={14} /> },
    { id: 'bg', title: language === 'am' ? 'ዳራ እና ሞዴል' : 'Context & GPM Model', icon: <TrendingUp size={14} /> },
    { id: 'apps', title: language === 'am' ? 'የመተግበሪያዎች ንፅፅር' : 'App Landscape', icon: <Award size={14} /> },
    { id: 'hubs', title: language === 'am' ? 'እንቅስቃሴ ማዕከላት' : 'City Hubs & Map', icon: <Map size={14} /> },
    { id: 'financials', title: language === 'am' ? 'ፋይናንስና ካልኩሌተር' : 'Finance & ROI Model', icon: <DollarSign size={14} /> },
    { id: 'risks', title: language === 'am' ? 'ስጋቶችና ምክረ-ሀሳብ' : 'Risks & Action Plan', icon: <AlertTriangle size={14} /> }
  ];

  return (
    <div className="space-y-6" id="proposal_viewer_wrapper">
      {/* Sub Section Select Tab Navigation & High Fidelity Business Model Summary PDF */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-2 border-b border-slate-800/80" id="proposal_viewer_header_panel">
        <div className="flex overflow-x-auto gap-2 scrollbar-none w-full md:w-auto" id="segment_nav_wrapper">
          {segments.map((seg) => (
            <button
              key={seg.id}
              onClick={() => setActiveSegment(seg.id)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
                activeSegment === seg.id
                  ? 'bg-amber-500 text-slate-950 border-white font-semibold'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-300'
              }`}
              id={`seg_btn_${seg.id}`}
            >
              {seg.icon}
              <span>{seg.title}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowProposalSummaryModal(true)}
          className="flex items-center space-x-1.5 px-4 py-1.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-amber-500 hover:brightness-110 active:scale-95 transition text-white rounded-xl text-xs font-bold shadow-lg shrink-0 self-stretch md:self-auto justify-center cursor-pointer"
          id="proposal_summary_pdf_trigger"
        >
          <FileText size={14} />
          <span>{language === 'am' ? 'የጥናት ማጠቃለያ PDF' : 'Download Business Summary PDF'}</span>
        </button>
      </div>

      {/* Main Contents based on Segment selected */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Rich text description (takes 7 cols when map/calculator or elements are shown) */}
        <div className={`space-y-6 ${activeSegment === 'all' ? 'lg:col-span-7' : 'lg:col-span-6'}`}>

          {/* Section 1: Background & GPM Model */}
          {(activeSegment === 'all' || activeSegment === 'bg') && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4" id="section_bg_model_details">
              <div className="border-b border-slate-800 pb-3">
                <h2 className="font-sans font-bold text-lg text-slate-100 flex items-center gap-2">
                  <span className="p-1 px-2.5 bg-indigo-500/10 text-indigo-400 rounded-lg text-sm font-mono font-bold">1</span>
                  {t('secBackground')}
                </h2>
              </div>
              <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
                <p>{t('bgPara1')}</p>
                <p>{t('bgPara2')}</p>
              </div>

              <div className="border-b border-slate-805 pb-3 pt-3">
                <h2 className="font-sans font-bold text-lg text-slate-100 flex items-center gap-2">
                  <span className="p-1 px-2.5 bg-emerald-500/10 text-emerald-400 rounded-lg text-sm font-mono font-bold">2</span>
                  {t('secModel')}
                </h2>
              </div>
              <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
                <p>{t('modelPara1')}</p>
                <p>{t('modelPara2')}</p>
              </div>
            </div>
          )}

          {/* Section 2: Apps Benchmarks */}
          {(activeSegment === 'all' || activeSegment === 'apps') && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4" id="section_apps_matrix">
              <div className="border-b border-slate-800 pb-3">
                <h2 className="font-sans font-bold text-lg text-slate-100 flex items-center gap-2">
                  <span className="p-1 px-2.5 bg-amber-500/10 text-amber-500 rounded-lg text-sm font-mono font-bold">3</span>
                  {t('prospectsTitle')}
                </h2>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {language === 'am' 
                  ? 'በድሬዳዋ ከተማ በምግብ፣ በሸቀጣሸቀጥ አቅርቦት፣ በትራንስፖርት እና በልዩ ልዩ የዲጂታል ግብይቶች ዘርፍ በስፋት ጥቅም ላይ የሚውሉ እና ለወጣቶች ስራ እድል ትልቅ ምሰሶ የሆኑ መተግበሪያዎች ዝርዝር ንፅፅር፡-'
                  : 'A comparative benchmark covering digital delivery and ride-hailing services piloting local workflows in Dire Dawa:'}
              </p>

              {/* Benchmarked Apps table */}
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="min-w-full divide-y divide-slate-800 text-xs text-left text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[9px] tracking-wider">
                    <tr>
                      <th scope="col" className="px-3.5 py-2.5">{t('appNameCol')}</th>
                      <th scope="col" className="px-3.5 py-2.5">{t('appSectorCol')}</th>
                      <th scope="col" className="px-3.5 py-2.5">{t('appPaymentCol')}</th>
                      <th scope="col" className="px-3.5 py-2.5">{t('appFeaturesCol')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 bg-slate-900/60">
                    {STUDY_APP_COMPARISON.map((app, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/20 font-sans">
                        <td className="px-3.5 py-2.5 font-bold text-white whitespace-nowrap">{app.name}</td>
                        <td className="px-3.5 py-2.5 text-slate-300">{app.sector[language]}</td>
                        <td className="px-3.5 py-2.5 text-amber-500/90 font-medium">{app.payment[language]}</td>
                        <td className="px-3.5 py-2.5 text-slate-400 leading-normal max-w-[260px]">{app.features[language]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Section 3: Legal & Registration stepped overview */}
          {(activeSegment === 'all' || activeSegment === 'hubs') && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4" id="section_hubs_and_legal">
              <div className="border-b border-slate-800 pb-3">
                <h2 className="font-sans font-bold text-lg text-slate-100 flex items-center gap-2">
                  <span className="p-1 px-2.5 bg-emerald-500/10 text-emerald-400 rounded-lg text-sm font-mono font-bold">4</span>
                  {t('secHubs')}
                </h2>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{t('hubsDesc')}</p>

              <div className="border-b border-slate-800 pb-3 pt-3">
                <h2 className="font-sans font-bold text-lg text-slate-100 flex items-center gap-2">
                  <span className="p-1 px-2.5 bg-amber-500/10 text-amber-500 rounded-lg text-sm font-mono font-bold">5</span>
                  {t('secLegal')}
                </h2>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{t('legalSectionText')}</p>
            </div>
          )}

          {/* Section 4: Budget plan table */}
          {(activeSegment === 'all' || activeSegment === 'financials') && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4" id="section_financial_matrix">
              <div className="border-b border-slate-800 pb-3">
                <h2 className="font-sans font-bold text-lg text-slate-100 flex items-center gap-2">
                  <span className="p-1 px-2.5 bg-indigo-500/10 text-indigo-400 rounded-lg text-sm font-mono font-bold">6</span>
                  {t('finInitialExp')}
                </h2>
              </div>
              
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="min-w-full divide-y divide-slate-800 text-xs text-left text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[9px]">
                    <tr>
                      <th scope="col" className="px-3.5 py-2.5">{t('finCategory')}</th>
                      <th scope="col" className="px-3.5 py-2.5 text-right font-semibold">{t('finAmount')}</th>
                      <th scope="col" className="px-3.5 py-2.5">{t('finDesc')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-900/60 font-sans">
                    {STUDY_FINANCIALS_DATA.map((fin, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/10">
                        <td className="px-3.5 py-2.5 font-medium text-slate-200">{fin.item}</td>
                        <td className="px-3.5 py-2.5 text-right font-mono font-bold text-teal-400">{fin.amount.toLocaleString()}</td>
                        <td className="px-3.5 py-2.5 text-slate-400 max-w-[250px] leading-relaxed">{fin.desc}</td>
                      </tr>
                    ))}
                    <tr className="bg-slate-950/80 font-bold border-t border-slate-700/80">
                      <td className="px-3.5 py-3 text-white uppercase font-mono text-[10px]">TOTAL INITIAL RESOURCE CAPEX</td>
                      <td className="px-3.5 py-3 text-right font-mono text-amber-400 text-sm">500,000</td>
                      <td className="px-3.5 py-3 text-xs text-amber-500/80 italic font-normal">
                        {language === 'am' ? 'ማዕከሉን በድሬዳዋ ከተማ ለመመስረት የመነሻ ፍላጎት መጠን' : 'Base budget for physical establishment'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Section 4.5: Projected monthly revenue growth chart */}
          {(activeSegment === 'all' || activeSegment === 'financials') && (
            <RevenueGrowthChart language={language} />
          )}

          {/* Section 5: Risks & Recommendations */}
          {(activeSegment === 'all' || activeSegment === 'risks') && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4" id="section_risks_recs">
              <div className="border-b border-slate-800 pb-3">
                <h2 className="font-sans font-bold text-lg text-slate-100 flex items-center gap-2">
                  <span className="p-1 px-2.5 bg-rose-500/10 text-rose-400 rounded-lg text-sm font-mono font-bold">7</span>
                  {t('secRisks')}
                </h2>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{t('riskPara')}</p>

              {/* Risks Table overlay */}
              <div className="space-y-3">
                {STUDY_RISKS_DATA.map((item, idx) => (
                  <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex items-start gap-3">
                    <span className="mt-0.5 text-rose-500 p-1.5 bg-rose-500/5 rounded-lg border border-rose-500/15">
                      <Flame size={14} />
                    </span>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs font-bold text-slate-200">
                          {item.risk[language]}
                        </h4>
                        <span className={`text-[8.5px] uppercase font-mono px-2 py-0.5 rounded-full border ${
                          item.impact === 'High' 
                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' 
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        }`}>
                          Impact: {item.impact}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        <strong className="text-slate-300 font-medium">Mitigation: </strong> {item.mitigation[language]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Strategic recommendations */}
              <div className="border-b border-slate-800 pb-3 pt-3">
                <h2 className="font-sans font-bold text-lg text-slate-100 flex items-center gap-2">
                  <span className="p-1 px-2.5 bg-teal-500/10 text-teal-400 rounded-lg text-sm font-mono font-bold">8</span>
                  {t('secRecs')}
                </h2>
              </div>

              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4 space-y-3">
                <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold">
                  <Lightbulb size={16} />
                  <span>{language === 'am' ? 'የጥናቱ ስልታዊ ምክረ-ሀሳቦች (Strategic Actions)' : 'Actionable Guidelines'}</span>
                </div>
                <div className="space-y-2 text-xs text-slate-300 pl-2 leading-relaxed">
                  <div className="flex items-start space-x-2">
                    <span className="text-emerald-400 mt-0.5">•</span>
                    <span>
                      {language === 'am'
                        ? 'የድሬዳዋ ከተማ አስተዳደር የስራ እድል ፈጠራ ቢሮ ከግል የቴክኖሎጂ ኩባንያዎች ጋር የጋራ ስምምነት በመፈራረም ወጣቶች መተግበሪያዎቹን እንዲጠቀሙ ምቹ ሁኔታዎችን መፍጠር ይኖርበታል ።'
                        : 'Sign bilateral facilitation agreements with Mager and Chapa to subsidize transaction costs.'}
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-emerald-400 mt-0.5">•</span>
                    <span>
                      {language === 'am'
                        ? 'በሚያከናውናቸው የስልጠና መርሃ ግብሮች ውስጥ ቢያንስ 50% የሚሆኑትን የስራ እድሎች ለወጣት ሴቶች ቅድሚያ በመስጠት፣ በከተማዋ ያለውን ከፍተኛ የሴቶች ስራ አጥነት በከፍተኛ ሁኔታ መቀነስ ይቻላል ።'
                        : 'Allocate a strict gender quota of 50%+ for specialized female digital ride-hailing cohorts.'}
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-emerald-400 mt-0.5">•</span>
                    <span>
                      {language === 'am'
                        ? 'ወጣቶች የራሳቸውን ባጃጆች እና ሞተር ብስክሌቶች እንዲገዙ ለማስቻል፣ ማዕከሉ ከኢትዮጵያ ንግድ ባንክ እና የማይክሮ ፋይናንስ ተቋማት ጋር በመሆን ዝቅተኛ ወለድ ያለው ብድር የሚያገኝበትን ስርአት ማመቻቸት አለበት ።'
                        : 'Partner with Commercial Bank of Ethiopia (CBE) and local microfinance entities to source soft asset capital loan guarantees.'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Map and Interactive financial tools widget (takes 5-6 cols) */}
        <div className={`space-y-6 ${activeSegment === 'all' ? 'lg:col-span-12 xl:col-span-5' : 'lg:col-span-6'}`}>
          {/* Renders Map in any non-financial specific tab */}
          {activeSegment !== 'financials' && activeSegment !== 'risks' && renderInteractiveMap()}

          {/* Renders Calculator in financial or general views */}
          {(activeSegment === 'all' || activeSegment === 'financials') && (
            <FinancialCalculatorComponent language={language} />
          )}

          {/* Renders Legal registrations checklist */}
          {(activeSegment === 'all' || activeSegment === 'hubs') && renderLegalSteps()}
        </div>
      </div>

      {/* COMPREHENSIVE BUSINESS PROPOSAL SUMMARY PDF GENERATOR MODAL */}
      {showProposalSummaryModal && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in" id="proposal_modal_docket_wrapper">
          <div className="bg-white text-slate-900 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden border border-slate-205 flex flex-col max-h-[90vh]">
            {/* Modal Navigation header */}
            <div className="bg-slate-950 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
              <div className="flex items-center space-x-2.5">
                <FileText className="text-amber-400" size={18} />
                <span className="font-bold text-sm tracking-tight uppercase font-mono">
                  {language === 'am' ? 'የስራ ስትራቴጂ እና የገቢ ተንበያ ሰነድ PDF' : 'Strategic Business Proposal & Feasibility Report'}
                </span>
              </div>
              <button
                onClick={() => setShowProposalSummaryModal(false)}
                className="text-slate-400 hover:text-white transition p-1.5 rounded-full hover:bg-slate-850 cursor-pointer"
                title="Close"
              >
                <X size={16} />
              </button>
            </div>

            {/* Document Printable Body */}
            <div className="p-8 md:p-10 overflow-y-auto space-y-6 text-xs text-slate-800 font-sans leading-relaxed" id="printable_proposal_summary_report">
              
              {/* Document Header Panel */}
              <div className="border-b-4 border-slate-900 pb-5 text-center space-y-2">
                <span className="text-[10px] font-mono font-bold tracking-widest text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
                  DIRE DAWA YOUTH EMPLOYMENT OPPORTUNITY FEASIBILITY STUDY
                </span>
                <h1 className="text-xl md:text-2xl font-extrabold uppercase tracking-tight text-slate-950 mt-1">
                  የድሬ ባጃጅና እቃ ማገናኝ የጊግ ማዕከል ስልታዊ ጥናት
                </h1>
                <h2 className="text-xs md:text-sm font-bold text-slate-600 font-mono">
                  DIRE DAWA GIG PROFESSIONAL MARKETPLACE (GPM) STRATEGIC BLUEPRINT
                </h2>
                <div className="text-[10px] text-slate-500 font-medium flex justify-center gap-4 mt-2">
                  <span>📍 ድሬዳዋ ከተማ ፣ ኢትዮጵያ (Dire Dawa, Ethiopia)</span>
                  <span>•</span>
                  <span>🗓️ {new Date().toLocaleDateString(undefined, {year: 'numeric', month: 'long', day: 'numeric'})}</span>
                </div>
              </div>

              {/* Responsible Contacts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-1">
                  <h3 className="font-extrabold text-[10px] uppercase font-mono text-slate-900 tracking-wider">PROJECT LEADERSHIP (አስኪያጆች)</h3>
                  <div className="space-y-1 text-slate-700 mt-1">
                    <p><strong>Owner:</strong> Mr. Ayub Abdela — 📱 <a href="tel:0915167750" className="text-indigo-650 hover:underline">0915167750</a></p>
                    <p><strong>Manager:</strong> Mr. Elias Abdela — 📱 <a href="tel:0940887021" className="text-indigo-650 hover:underline">0940887021</a></p>
                    <p><strong>Initiated By:</strong> Youth Job Creation & Tech Directorate, Dire Dawa Administration</p>
                  </div>
                </div>
                <div className="bg-slate-55 border border-slate-200 p-4 rounded-xl space-y-1">
                  <h3 className="font-extrabold text-[10px] uppercase font-mono text-slate-900 tracking-wider">FEASIBILITY BASELINE SPECS (የጥናቱ ዝቅተኛ ግምቶች)</h3>
                  <div className="space-y-1 text-slate-700 mt-1">
                    <p><strong>Estimated Capital (CapEx):</strong> 500,000 ETB</p>
                    <p><strong>Hub Commision Rate:</strong> Flat 5.0% flat cut per trip transaction value</p>
                    <p><strong>Target Markets Supported:</strong> Merkat, Ashawa, Gendakor Stations</p>
                  </div>
                </div>
              </div>

              {/* SECTION 1: EXEC SUMMARY */}
              <div className="space-y-2">
                <h3 className="font-extrabold text-[11px] uppercase font-mono tracking-widest text-slate-900 border-b border-slate-300 pb-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-3 bg-indigo-700 rounded-sm"></span>
                  1. Executive Summary & Gig Model Overview (አጠቃላይ የስራ ስትራቴጂ ማጠቃለያ)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-700 bg-slate-50/50 p-3 rounded-lg border border-slate-100">
                  <div className="space-y-2">
                    <p className="font-semibold text-slate-900">{language === 'am' ? 'የጊግ ሞዴል አስፈላጊነት' : 'The Gig Hub Opportunity'}</p>
                    <p className="text-[11px] leading-relaxed">
                      {language === 'am' 
                        ? 'ጥናቱ በድሬዳዋ ከተማ አስተዳደር ወጣቶች በቀላሉ ስራ እንዲያገኙ እና የራሳቸውን ገቢ እንዲያመነጩ ለማስቻል የባጃጅ ትራንስፖርት እና የሎጂስቲክስ እቃዎች አቅርቦትን በቴክኖሎጂ በማደራጀት ላይ ያተኩራል ። ማዕከሉ በ5% የኮሚሽን ክፍያ እራሱን በስልታዊ መልኩ ያስተዳድራል ።'
                        : 'This strategic initiative focuses on solving youth unemployment in Dire Dawa through a digitised marketplace. By interlinking local commuters, cargo agents and retail merchants with active drivers, the Gig Professional Hub manages transactions transparently at a nominal 5.0% standard commission rate.'}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-slate-900">{language === 'am' ? 'ዲጂታል መተግበሪያዎች' : 'App Technology Synergies'}</p>
                    <p className="text-[11px] leading-relaxed">
                      {language === 'am' 
                        ? 'መተግበሪያው ከማጃር፣ ሴፍ፣ እና ዴሊቨሪ መተግበሪያዎች ጋር በማቀናጀት የድሬዳዋን ወጣቶች ሞተረኞች እና ባጃጅ አሽከርካሪዎች ቀጥታ ከደንበኞች ጋር በቅጽበት በማገናኘት በየቀኑ የሚሰሩበትን ጠንካራ የስራ እድል ይፈጥራል ።'
                        : 'Leveraging synergies with existing mobile booking backbones (Mager, Safe, Delivery), local ride-hailing cohorts and cargo networks are optimized. Drivers receive streamlined notifications, digital fare calculations, and embedded USSD offline support to guarantee resilient operations.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION 2: APP LANDSCAPE */}
              <div className="space-y-2">
                <h3 className="font-extrabold text-[11px] uppercase font-mono tracking-widest text-slate-900 border-b border-slate-300 pb-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-3 bg-indigo-700 rounded-sm"></span>
                  2. Competitive Application Landscape (በድሬዳዋ ያሉ መተግበሪያዎች ንጽጽር)
                </h3>
                <table className="w-full text-left border-collapse border border-slate-200">
                  <thead>
                    <tr className="bg-slate-100 text-[9px] font-bold text-slate-700 uppercase font-mono">
                      <th className="p-2 border border-slate-200">Application (መተግበሪያ)</th>
                      <th className="p-2 border border-slate-200">Key Sector (ዘርፍ)</th>
                      <th className="p-2 border border-slate-200">Payment Engine (ክፍያ)</th>
                      <th className="p-2 border border-slate-200">Service Focus in Dire Dawa (ትኩረት)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {STUDY_APP_COMPARISON.map((app, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="p-2 border border-slate-200 font-bold text-slate-900">{app.name}</td>
                        <td className="p-2 border border-slate-200 text-slate-700">{app.sector[language]}</td>
                        <td className="p-2 border border-slate-200 text-indigo-700 font-medium font-mono">{app.payment[language]}</td>
                        <td className="p-2 border border-slate-200 text-slate-600 text-[11px] leading-snug">{app.features[language]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* SECTION 3: CITY HUBS DISTRIBUTION */}
              <div className="space-y-2">
                <h3 className="font-extrabold text-[11px] uppercase font-mono tracking-widest text-slate-900 border-b border-slate-300 pb-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-3 bg-indigo-700 rounded-sm"></span>
                  3. GPM High Density Hub Operations (የእንቅስቃሴ ጣቢያዎች ዝርዝር)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {STUDY_HUBS_DATA.slice(0, 3).map((hub, idx) => (
                    <div key={idx} className="border border-slate-200 p-3 rounded-lg space-y-1 bg-slate-50/30">
                      <div className="flex justify-between items-center">
                        <span className="p-1 px-2 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded font-mono text-[9px] font-extrabold">Hub #{idx+1}</span>
                        <span className="text-[9px] font-mono text-slate-400 capitalize">{hub.type}</span>
                      </div>
                      <h4 className="font-bold text-slate-900">{hub.name[language]}</h4>
                      <p className="text-[10px] text-slate-600 leading-normal">{hub.description[language]}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 4: CAPEX BILL & FINANCIAL CALCULATIONS */}
              <div className="space-y-2">
                <h3 className="font-extrabold text-[11px] uppercase font-mono tracking-widest text-slate-900 border-b border-slate-300 pb-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-3 bg-indigo-700 rounded-sm"></span>
                  4. Setup Resource Budget Schedules & Financial Projections (መነሻ ካፒታል ወጪዎችና ተንባይ ሁኔታዎች)
                </h3>
                <table className="w-full text-left border-collapse border border-slate-200">
                  <thead>
                    <tr className="bg-slate-100 text-[9px] font-bold text-slate-700 uppercase font-mono">
                      <th className="p-2 border border-slate-200">Feasibility Cost Categories (የወጪ ዘርፎች)</th>
                      <th className="p-2 border border-slate-200">Allocated Budget (በኢትዮጵያ ብር)</th>
                      <th className="p-2 border border-slate-200">Detailed Allocation Descriptions (ማብራሪያ)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {STUDY_FINANCIALS_DATA.map((fin, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="p-2 border border-slate-200 font-semibold text-slate-800">{fin.item}</td>
                        <td className="p-2 border border-slate-200 text-slate-900 font-bold font-mono text-right">{fin.amount.toLocaleString()}.00 ETB</td>
                        <td className="p-2 border border-slate-200 text-slate-600 text-[11px] leading-snug">{fin.desc}</td>
                      </tr>
                    ))}
                    <tr className="bg-indigo-50/70 font-bold text-slate-900 border-t-2 border-slate-400">
                      <td className="p-2 border border-slate-200">TOTAL CAPITAL ALLOCATION PRESCRIBED (የድምር መነሻ ወጪ)</td>
                      <td className="p-2 border border-slate-200 font-mono text-indigo-950 text-right text-xs">500,000.00 ETB</td>
                      <td className="p-2 border border-slate-200 text-[11px] font-normal text-slate-500 italic">
                        {language === 'am' ? 'የድሬዳዋ ከተማ ወጣቶች ስራ እድል ጥናት መነሻ ካፒታል ወጪ መቶኛ' : 'Baseline cap for model implementation'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* FEASIBILITY ANALYSIS REPORT CARD */}
              <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-2">
                <h4 className="text-xs font-bold uppercase font-mono tracking-wider text-amber-400">
                  FINANCIAL FEASIBILITY DECLARATION (የፋይናንስና አዋጭነት መግለጫ)
                </h4>
                <ul className="list-disc pl-5 space-y-1.5 text-[11.5px] text-slate-350 leading-relaxed">
                  <li>
                    {language === 'am' 
                      ? 'የባጃጅ አሽከርካሪዎች ዕቅድ እና የሞተረኞች ቁጥር በሚያድግበት ሁኔታ ማዕከሉ በምቹ ወርሃዊ ቀመር የካፒታል ወጪውን (500k ETB) በጥቂት ወራት ውስጥ ይመልሳል ።'
                      : 'The financial baseline demonstrates that with stable registration indices, the initial CapEx budget is rapidly covered. 12-month projections establish high GPM commission yield margins.'}
                  </li>
                  <li>
                    {language === 'am' 
                      ? 'የማዕከሉ አጠቃላይ አዋጭነት ሁኔታ 94.6% ከፍተኛ የአዋጭነት ደረጃ ላይ ያለ ሲሆን፣ ለአስተዳደሩ ወጣቶች ቋሚና አስተማማኝ የስራ እድልን ይፈጥራል ።'
                      : 'The strategic viability coefficient averages 94.6% out of 100%, indicating robust resilience under volatile local fuel price constraints.'}
                  </li>
                </ul>
              </div>

              {/* SIGN OFF FOOTNOTES */}
              <div className="pt-4 text-[10px] text-slate-505 italic border-t border-slate-200 grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="font-bold text-slate-800">Approved for Implementation:</p>
                  <p>Mr. Ayub Abdela (Owner & Lead Investor) — 📱 0915167750</p>
                  <p className="text-[9px] text-slate-400">Dire Dawa, Administration</p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="font-bold text-slate-800">Certified operational directive:</p>
                  <p>Mr. Elias Abdela (Project Hub Manager) — 📱 0940887021</p>
                  <p className="text-[9px] text-slate-400">Dire Dawa gig-marketplace network hub registry</p>
                </div>
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 shrink-0 flex justify-end gap-3">
              <button
                onClick={() => setShowProposalSummaryModal(false)}
                className="px-4 py-2 border border-slate-300 rounded-xl text-slate-700 hover:bg-slate-100 transition text-xs font-semibold"
              >
                {language === 'am' ? 'ዝጋ (Close)' : 'Close'}
              </button>
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex items-center space-x-1.5 px-5 py-2 bg-slate-950 hover:bg-slate-850 text-white rounded-xl text-xs font-bold shadow-lg transition-all cursor-pointer"
                id="proposal_modal_native_print_btn"
              >
                <Printer size={14} />
                <span>{language === 'am' ? 'ሰነዱን አትም / PDF አውርድ' : 'Print & Download PDF'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
