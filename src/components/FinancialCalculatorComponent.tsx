import React, { useState } from 'react';
import { LanguageCode } from '../types';
import { TRANSLATIONS } from '../translations';
import { Coins, PiggyBank, CalendarRange, Landmark, HelpCircle } from 'lucide-react';

interface FinancialCalculatorProps {
  language: LanguageCode;
}

export const FinancialCalculatorComponent: React.FC<FinancialCalculatorProps> = ({ language }) => {
  const [driverCount, setDriverCount] = useState<number>(150);
  const [dailyAvgIncome, setDailyAvgIncome] = useState<number>(400);
  const [initialCapital, setInitialCapital] = useState<number>(500000);

  const t = (key: string) => TRANSLATIONS[key]?.[language] || key;

  // Constants
  const GPM_COMMISSION_RATE = 0.05; // 5%
  const ACTIVE_WORKING_DAYS_MONTHLY = 26; // Sunday rest or optional shift

  // Calculations
  const dailyHubCommission = driverCount * dailyAvgIncome * GPM_COMMISSION_RATE;
  const monthlyHubRevenue = dailyHubCommission * ACTIVE_WORKING_DAYS_MONTHLY;
  
  // Prevent division by zero
  const paybackMonths = monthlyHubRevenue > 0
    ? Math.round((initialCapital / monthlyHubRevenue) * 10) / 10
    : 0;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl" id="financial_calculator">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg">
          <Coins size={20} />
        </div>
        <h3 className="font-sans font-bold text-lg text-slate-100">
          {t('revenueSimulatorTitle')}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Sliders Input Controls */}
        <div className="space-y-6">
          {/* Driver Count Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-medium">{t('driverCountLabel')}</span>
              <span className="text-amber-400 font-bold font-mono text-sm">{driverCount} {language === 'am' ? 'ወጣቶች' : 'workers'}</span>
            </div>
            <input
              type="range"
              min="10"
              max="500"
              step="5"
              value={driverCount}
              onChange={(e) => setDriverCount(parseInt(e.target.value))}
              className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              id="slider_driver_count"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>10</span>
              <span>150 (የጥናቱ ግብ)</span>
              <span>500</span>
            </div>
          </div>

          {/* Average Driver Income Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-medium">{t('dailyIncomeLabel')}</span>
              <span className="text-amber-400 font-bold font-mono text-sm">{dailyAvgIncome.toLocaleString()} ETB</span>
            </div>
            <input
              type="range"
              min="100"
              max="1500"
              step="50"
              value={dailyAvgIncome}
              onChange={(e) => setDailyAvgIncome(parseInt(e.target.value))}
              className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              id="slider_daily_income"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>100 ETB</span>
              <span>400 ETB (ባጃጅ መደበኛ)</span>
              <span>1,500 ETB</span>
            </div>
          </div>

          {/* Initial Capital Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-semibold">
                {language === 'am' ? 'የመነሻ ካፒታል መጠን (CapEx)' : 'Target Startup Capital'}
              </span>
              <span className="text-teal-400 font-bold font-mono text-sm">
                {initialCapital.toLocaleString()} ETB
              </span>
            </div>
            <input
              type="range"
              min="100000"
              max="2000000"
              step="50000"
              value={initialCapital}
              onChange={(e) => setInitialCapital(parseInt(e.target.value))}
              className="w-full accent-teal-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              id="slider_initial_capital"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>100k ETB</span>
              <span>500k ETB (የጥናቱ መነሻ)</span>
              <span>2M ETB</span>
            </div>
          </div>
        </div>

        {/* Output Metrics Presentation */}
        <div className="flex flex-col justify-between bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Daily Net Commission for GPM */}
            <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-800/80">
              <div className="text-[10px] text-slate-500 uppercase tracking-wide">
                {language === 'am' ? 'የማዕከሉ የዕለት ኮሚሽን (5%)' : 'Hub Comm. Daily'}
              </div>
              <div className="text-lg font-bold font-mono text-amber-500 mt-1">
                {dailyHubCommission.toLocaleString()} <span className="text-xs font-sans">ETB</span>
              </div>
              <span className="text-[9px] text-slate-500 mt-0.5 block">
                {driverCount} × {dailyAvgIncome} × 5%
              </span>
            </div>

            {/* Monthly Total Net Commission */}
            <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-800/80">
              <div className="text-[10px] text-slate-500 uppercase tracking-wide">
                {t('monthlyRevenue')}
              </div>
              <div className="text-lg font-bold font-mono text-amber-500 mt-1">
                {monthlyHubRevenue.toLocaleString()} <span className="text-xs font-sans">ETB</span>
              </div>
              <span className="text-[9px] text-slate-500 mt-0.5 block">
                {ACTIVE_WORKING_DAYS_MONTHLY} {language === 'am' ? 'የስራ ቀናት' : 'days/mo'}
              </span>
            </div>
          </div>

          {/* Payback duration progress gauge representation */}
          <div className="pt-3 border-t border-slate-900 flex flex-col justify-center items-center text-center">
            <div className="text-xs text-slate-400 font-medium mb-1 flex items-center gap-1">
              <CalendarRange size={14} className="text-indigo-400" />
              <span>{t('paybackPeriod')}</span>
            </div>
            
            <div className="text-3xl font-extrabold font-mono text-teal-400 my-1">
              {paybackMonths} {language === 'am' ? 'ወራት' : 'Months'}
            </div>

            {/* Color indicator message */}
            <div className="mt-2 text-[11px] text-slate-400 leading-relaxed max-w-[280px]">
              {paybackMonths <= 6 ? (
                <span className="text-emerald-400 font-semibold">
                  🚀 {language === 'am' ? 'እጅግ ፈጣን ትርፋማነት! የመነሻ ካፒታሉ በ6 ወራት ወይም ከዚያ በታች ይመለሳል ።' : 'Surgically sound! Break-even achieved in under 6 months.'}
                </span>
              ) : paybackMonths <= 12 ? (
                <span className="text-amber-400 font-semibold">
                  ⚡ {language === 'am' ? 'ጥሩ የኢኮኖሚ ምላሽ! በ1 ዓመት ውስጥ ሙሉ በሙሉ ይመለሳል ።' : 'Strong yield. Break-even achieved within 1 year.'}
                </span>
              ) : (
                <span className="text-rose-400 font-semibold">
                  ⚠️ {language === 'am' ? 'ረጅም መመለሻ ጊዜ! ተጨማሪ አሽከርካሪዎችን መመልመል ይመረጣል ።' : 'Longer payback window. Scale up gig workers to quicken return.'}
                </span>
              )}
            </div>
          </div>

          <div className="text-[10px] text-slate-500 italic text-center">
            {language === 'am'
              ? 'ማስታወሻ፡ ስሌቱ የተመሰረተው ከእያንዳንዱ አሽከርካሪ 5% ኮሚሽን ላይ ብቻ ነው ። ተጨማሪ የሸቀጣሸቀጥ ክፍያዎች እና የአድቨርታይዝመንት ገቢዎች አልተካተቱም ።'
              : '*Excludes support ad-revenue pipelines or logistics handling premiums; calculated on standard 5% Tuk-tuk commission.'}
          </div>
        </div>
      </div>
    </div>
  );
};
