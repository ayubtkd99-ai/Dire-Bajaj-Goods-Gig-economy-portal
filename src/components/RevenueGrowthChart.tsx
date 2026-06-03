import React, { useState } from 'react';
import { LanguageCode } from '../types';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  BarChart,
  Bar,
  ReferenceLine
} from 'recharts';
import { TrendingUp, Users, DollarSign, Calendar, RefreshCw, Layers, FileText, Printer, X, Percent, Briefcase } from 'lucide-react';

interface RevenueGrowthChartProps {
  language: LanguageCode;
}

interface GrowthDataPoint {
  month: string;
  monthName: string;
  bajajDrivers: number;
  deliveryDrivers: number;
  totalDrivers: number;
  monthlyRevenue: number;
  cumulativeRevenue: number;
}

export const RevenueGrowthChart: React.FC<RevenueGrowthChartProps> = ({ language }) => {
  const [chartMode, setChartMode] = useState<'both' | 'drivers' | 'revenue'>('both');
  const [performanceMultiplier, setPerformanceMultiplier] = useState<number>(1.0); // Allow scale factors for optimistic/conservative cases
  
  // Real-time dynamic driver baseline sliders
  const [bajajTarget, setBajajTarget] = useState<number>(100);
  const [deliveryTarget, setDeliveryTarget] = useState<number>(50);

  // PDF report modal state
  const [showPdfModal, setShowPdfModal] = useState<boolean>(false);

  // Static baseline assumptions for the models
  const BAJAJ_DAILY_GROSS = 450; // ETB average gross
  const DELIVERY_DAILY_GROSS = 550; // ETB average gross for logistics deliveries
  const COMMISSION_RATE = 0.05; // 5% Hub commission
  const LABOUR_DAYS = 26; // days a month

  // 12-month gradual ramp-up projection data culminating in the dynamic Bajaj & Delivery drivers target
  const getProjectedData = (): GrowthDataPoint[] => {
    const monthlyRamps = [
      { month: 'M1', nameAm: 'ወር ፩', nameEn: 'Month 1', bajajRatio: 0.20, deliveryRatio: 0.16 }, // 20% Bajaj, 16% delivery
      { month: 'M2', nameAm: 'ወር ፪', nameEn: 'Month 2', bajajRatio: 0.35, deliveryRatio: 0.28 }, 
      { month: 'M3', nameAm: 'ወር ፫', nameEn: 'Month 3', bajajRatio: 0.55, deliveryRatio: 0.44 }, 
      { month: 'M4', nameAm: 'ወር ፬', nameEn: 'Month 4', bajajRatio: 0.70, deliveryRatio: 0.60 }, 
      { month: 'M5', nameAm: 'ወር ፭', nameEn: 'Month 5', bajajRatio: 0.85, deliveryRatio: 0.76 }, 
      { month: 'M6', nameAm: 'ወር ፮', nameEn: 'Month 6', bajajRatio: 1.00, deliveryRatio: 1.00 }, // target!
      { month: 'M7', nameAm: 'ወር ፯', nameEn: 'Month 7', bajajRatio: 1.00, deliveryRatio: 1.00 }, // Maintain target
      { month: 'M8', nameAm: 'ወር ፰', nameEn: 'Month 8', bajajRatio: 1.05, deliveryRatio: 1.02 }, // Over-achievement
      { month: 'M9', nameAm: 'ወር ፱', nameEn: 'Month 9', bajajRatio: 1.10, deliveryRatio: 1.05 },
      { month: 'M10', nameAm: 'ወር ፲', nameEn: 'Month 10', bajajRatio: 1.15, deliveryRatio: 1.10 },
      { month: 'M11', nameAm: 'ወር ፲፩', nameEn: 'Month 11', bajajRatio: 1.20, deliveryRatio: 1.15 },
      { month: 'M12', nameAm: 'ወር ፲፪', nameEn: 'Month 12', bajajRatio: 1.25, deliveryRatio: 1.20 }, // Expansion
    ];

    let cumulative = 0;

    return monthlyRamps.map((item) => {
      const bajajCount = Math.round(bajajTarget * item.bajajRatio);
      const deliveryCount = Math.round(deliveryTarget * item.deliveryRatio);
      const totalDrivers = bajajCount + deliveryCount;

      // Calculate GPM commission revenues:
      const bajajRev = bajajCount * BAJAJ_DAILY_GROSS * LABOUR_DAYS * COMMISSION_RATE * performanceMultiplier;
      const deliveryRev = deliveryCount * DELIVERY_DAILY_GROSS * LABOUR_DAYS * COMMISSION_RATE * performanceMultiplier;
      const monthlyRevenue = Math.round(bajajRev + deliveryRev);

      cumulative += monthlyRevenue;

      return {
        month: item.month,
        monthName: language === 'am' ? item.nameAm : item.nameEn,
        bajajDrivers: bajajCount,
        deliveryDrivers: deliveryCount,
        totalDrivers: totalDrivers,
        monthlyRevenue: monthlyRevenue,
        cumulativeRevenue: cumulative,
      };
    });
  };

  const data = getProjectedData();

  // Dynamically find break-even month for CapEx of 500,000 ETB
  const capEx = 500000;
  const breakEvenMonthPoint = data.find(item => item.cumulativeRevenue >= capEx);
  const breakEvenMonthName = breakEvenMonthPoint 
    ? (language === 'am' ? breakEvenMonthPoint.monthName : `Month ${breakEvenMonthPoint.month.replace('M', '')}`)
    : null;

  // Calculates exact payback duration in fractional months for maximum real-time slider satisfaction:
  const getExactPaybackMonths = (): string => {
    let monthsSum = 0;
    const projected = getProjectedData();
    for (let i = 0; i < projected.length; i++) {
      if (projected[i].cumulativeRevenue >= capEx) {
        const prevCumulative = i > 0 ? projected[i-1].cumulativeRevenue : 0;
        const revenueInMonth = projected[i].monthlyRevenue;
        if (revenueInMonth > 0) {
          const fraction = (capEx - prevCumulative) / revenueInMonth;
          return (i + fraction).toFixed(1);
        }
        return (i + 1).toString();
      }
    }
    const lastMonthCumulative = projected[11].cumulativeRevenue;
    if (lastMonthCumulative > 0) {
      const lastMonthRevenue = projected[11].monthlyRevenue;
      if (lastMonthRevenue > 0) {
        const remaining = capEx - lastMonthCumulative;
        const extraMonths = remaining / lastMonthRevenue;
        return (12 + extraMonths).toFixed(1);
      }
    }
    return "12.0+";
  };

  const exactPayback = getExactPaybackMonths();

  // Selected multi-language strings
  const labels = {
    title: {
      am: `የ፩ ዓመት የገቢ ዕድገት ትንበያ (${bajajTarget} ባጃጅ እና ${deliveryTarget} ደረሰኞች)`,
      en: `1-Year Revenue Projection (${bajajTarget} Bajaj & ${deliveryTarget} Delivery Models)`,
    },
    subtitle: {
      am: 'የማዕከሉን ቀስ በቀስ የማሽከርከር አቅም ማደግ እና የ5% ኮሚሽን ገቢ ስብስቦችን የሚያሳይ ግራፍ',
      en: 'Interactive model tracking monthly GPM commission growth and hardware deployment scaling.',
    },
    toggleBoth: {
      am: 'ገቢ እና አሽከርካሪ',
      en: 'Overview Matrix',
    },
    toggleDrivers: {
      am: 'የአሽከርካሪዎች ዕድገት',
      en: 'Driver Adoption',
    },
    toggleRevenue: {
      am: 'የገቢ ዕድገት',
      en: 'GPM Revenue',
    },
    bajajCount: {
      am: 'ባጃጅ አሽከርካሪዎች',
      en: 'Bajaj Drivers',
    },
    deliveryCount: {
      am: 'የዕቃ አድራሾች',
      en: 'Delivery Couriers',
    },
    monthlyRev: {
      am: 'የወር ገቢ (ETB)',
      en: 'Monthly Hub Revenue (ETB)',
    },
    cumulativeRev: {
      am: 'ድምር ገቢ (ETB)',
      en: 'Cumulative Hub Revenue (ETB)',
    },
    capexTarget: {
      am: 'የመነሻ ካፒታል ግብ (500,000 ETB)',
      en: 'CapEx Initial Target (500k ETB)',
    },
    scenarioLabel: {
      am: 'የገበያ ሁኔታ መቀያየሪያ',
      en: 'Scenario Adjustment Switch',
    },
    scenarioBase: {
      am: 'የጥናቱ መደበኛ ሁኔታ',
      en: 'Baseline Model (100%)',
    },
    scenarioOptimistic: {
      am: 'ከፍተኛ ተሳትፎ (+20%)',
      en: 'Peak Activity (+20%)',
    },
    scenarioConservative: {
      am: 'ዝቅተኛ ተሳትፎ (-20%)',
      en: 'Conservative (-20%)',
    },
    paybackNotice: {
      am: 'የመመለሻ ነጥብ፡- ማዕከሉ በ፭ኛው እና ፮ኛው ወራት መካከል የመነሻ ካፒታሉን (500k ETB) ሙሉ በሙሉ ያስመልሳል ።',
      en: 'Break-even Point: Cumulative hub commissions cross the 500k ETB CapEx mark between Month 5 & Month 6.',
    }
  };

  const currentLabelByLang = (key: keyof typeof labels) => labels[key][language === 'am' ? 'am' : 'en'];

  // Custom tooltips styling for dark theme
  const CustomProjectorTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 shadow-2xl font-sans text-xs space-y-2 max-w-[240px]">
          <div className="font-bold text-slate-200 text-sm border-b border-slate-800 pb-1.5 flex justify-between">
            <span>{payload[0].payload.monthName}</span>
            <span className="text-slate-500 font-mono">({payload[0].payload.month})</span>
          </div>
          <div className="space-y-1.5 pt-1">
            {payload.map((item: any, idx: number) => {
              let color = item.color;
              if (item.name === 'bajajDrivers') color = '#f59e0b';
              if (item.name === 'deliveryDrivers') color = '#10b981';
              if (item.name === 'monthlyRevenue') color = '#6366f1';
              if (item.name === 'cumulativeRevenue') color = '#38bdf8';

              const displayVal = typeof item.value === 'number' 
                ? item.name.includes('Revenue') || item.name.includes('monthly') || item.name.includes('cumulative')
                  ? `${item.value.toLocaleString()} ETB`
                  : `${item.value} Active`
                : item.value;

              const labelText = item.name === 'bajajDrivers' ? currentLabelByLang('bajajCount') :
                                item.name === 'deliveryDrivers' ? currentLabelByLang('deliveryCount') :
                                item.name === 'monthlyRevenue' || item.name === 'monthlyRevenue' ? currentLabelByLang('monthlyRev') :
                                item.name === 'cumulativeRevenue' ? currentLabelByLang('cumulativeRev') : item.name;

              return (
                <div key={idx} className="flex justify-between items-center gap-4">
                  <div className="flex items-center space-x-1.5 text-slate-400">
                    <span className="w-2.5 h-2.5 rounded-full block" style={{ backgroundColor: color }} />
                    <span>{labelText}</span>
                  </div>
                  <span className="font-bold text-slate-100 font-mono">{displayVal}</span>
                </div>
              );
            })}
          </div>
          <div className="text-[10px] text-slate-500 italic pt-1 border-t border-slate-800/80">
            Total active team: {payload[0].payload.totalDrivers} drivers
          </div>
        </div>
      );
    }
    return null;
  };

  // Full target gross calculations for the dynamic side cards
  const fullMonthlyGpmRevenues = data[5]?.monthlyRevenue || 0;
  
  const totalInboundOverTwelveMonths = data[11]?.cumulativeRevenue || 0;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl space-y-6" id="revenue_growth_chart_segment">
      {/* Title block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center space-x-2 text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full uppercase font-mono tracking-wider font-semibold">
            <TrendingUp size={12} className="text-indigo-400" />
            <span>{language === 'am' ? 'የገበያ ስታቲስቲክስ' : 'Recharts GPM Simulation'}</span>
          </div>
          <h3 className="text-base md:text-lg font-extrabold text-white tracking-tight leading-tight">
            {currentLabelByLang('title')}
          </h3>
          <p className="text-xs text-slate-400 leading-normal max-w-3xl">
            {currentLabelByLang('subtitle')}
          </p>
        </div>

        {/* Action Controls layout (Pills + Save Cost Report PDF) */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Chart View Selection pills */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800/80 text-xs self-start md:self-auto">
            <button
              onClick={() => setChartMode('both')}
              className={`px-3 py-1.5 rounded-lg transition-all font-medium ${
                chartMode === 'both' ? 'bg-slate-800 text-amber-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {currentLabelByLang('toggleBoth')}
            </button>
            <button
              onClick={() => setChartMode('drivers')}
              className={`px-3 py-1.5 rounded-lg transition-all font-medium ${
                chartMode === 'drivers' ? 'bg-slate-800 text-teal-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {currentLabelByLang('toggleDrivers')}
            </button>
            <button
              onClick={() => setChartMode('revenue')}
              className={`px-3 py-1.5 rounded-lg transition-all font-medium ${
                chartMode === 'revenue' ? 'bg-slate-800 text-indigo-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {currentLabelByLang('toggleRevenue')}
            </button>
          </div>

          {/* Export Report PDF Action Trigger */}
          <button
            onClick={() => setShowPdfModal(true)}
            className="flex items-center space-x-1 px-3.5 py-1.5 bg-gradient-to-r from-red-600 to-amber-600 text-white rounded-xl text-xs font-semibold shadow-lg hover:brightness-110 active:scale-95 transition-all"
            id="export_cost_pdf_summary_trigger"
          >
            <FileText size={14} />
            <span>{language === 'am' ? 'የወጪ ሪፖርት PDF' : 'Export Cost PDF Report'}</span>
          </button>
        </div>
      </div>

      {/* Main Core Segment: Chart & Dynamically Calculated Summary Side-Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="chart_with_dynamic_sidebar">
        {/* Left 2/3: Recharts Area Chart */}
        <div className="lg:col-span-2 space-y-4">
          <div className="w-full h-[280px] md:h-[320px] bg-slate-950/60 rounded-xl p-3 border border-slate-800/60 relative">
            <ResponsiveContainer width="100%" height="100%">
              {chartMode === 'drivers' ? (
                <AreaChart data={data} margin={{ top: 15, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorBajaj" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorDelivery" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.3} />
                  <XAxis dataKey="monthName" stroke="#64748b" fontSize={10} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                  <Tooltip content={<CustomProjectorTooltip />} />
                  <Legend verticalAlign="top" height={36} iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
                  <Area
                    type="monotone"
                    dataKey="bajajDrivers"
                    name="bajajDrivers"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorBajaj)"
                  />
                  <Area
                    type="monotone"
                    dataKey="deliveryDrivers"
                    name="deliveryDrivers"
                    stroke="#10b981"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorDelivery)"
                  />
                  <ReferenceLine y={100} stroke="#f59e0b" strokeDasharray="3 3" opacity={0.3} />
                  <ReferenceLine y={50} stroke="#10b981" strokeDasharray="3 3" opacity={0.3} />
                </AreaChart>
              ) : chartMode === 'revenue' ? (
                <AreaChart data={data} margin={{ top: 15, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorMonthly" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorCumulative" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.3} />
                  <XAxis dataKey="monthName" stroke="#64748b" fontSize={10} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={10} tickLine={false} tickFormatter={(val) => `${(val/1000)}k`} />
                  <Tooltip content={<CustomProjectorTooltip />} />
                  <Legend verticalAlign="top" height={36} iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px' }} />
                  <Area
                    type="monotone"
                    dataKey="monthlyRevenue"
                    name="monthlyRevenue"
                    stroke="#6366f1"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorMonthly)"
                  />
                  <Area
                    type="monotone"
                    dataKey="cumulativeRevenue"
                    name="cumulativeRevenue"
                    stroke="#0ea5e9"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorCumulative)"
                  />
                  {/* Highlight CapEx Payback Line */}
                  <ReferenceLine y={500000} stroke="#14b8a6" strokeWidth={1} strokeDasharray="4 4" label={{ value: language === 'am' ? 'ካፒታል መመለሻ (500k)' : 'CapEx Goal (500k)', fill: '#14b8a6', fontSize: 10, position: 'top' }} />
                </AreaChart>
              ) : (
                // Mixed/Both mode with double Axes (Y1 for drivers count, Y2 for monthly commission revenue)
                <BarChart data={data} margin={{ top: 15, right: -10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.2} />
                  <XAxis dataKey="monthName" stroke="#64748b" fontSize={10} tickLine={false} />
                  {/* Left Y axis for Drivers count */}
                  <YAxis yAxisId="left" stroke="#64748b" fontSize={10} tickLine={false} label={{ value: language === 'am' ? 'ገባሪዎች' : 'Drivers Active', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 9, offset: 12 }} />
                  {/* Right Y axis for Commission profit in ETB */}
                  <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={10} tickLine={false} tickFormatter={(val) => `${val/1000}k`} label={{ value: language === 'am' ? 'ገቢ' : 'Hub Revenue (ETB)', angle: 90, position: 'insideRight', fill: '#64748b', fontSize: 9, offset: 12 }} />
                  <Tooltip content={<CustomProjectorTooltip />} />
                  <Legend verticalAlign="top" height={36} iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px' }} />
                  
                  {/* Bar charts for drivers */}
                  <Bar yAxisId="left" dataKey="bajajDrivers" name="bajajDrivers" fill="#f59e0b" radius={[4, 4, 0, 0]} stackId="drivers" maxBarSize={18} />
                  <Bar yAxisId="left" dataKey="deliveryDrivers" name="deliveryDrivers" fill="#10b981" radius={[4, 4, 0, 0]} stackId="drivers" maxBarSize={18} />
                  
                  {/* Combined line chart for monthly commission revenues */}
                  <Line yAxisId="right" type="monotone" dataKey="monthlyRevenue" name="monthlyRevenue" stroke="#6366f1" strokeWidth={3} dot={{ fill: '#6366f1', r: 3 }} activeDot={{ r: 5 }} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right 1/3: dynamic Summary Card displaying GPM Income & Payback metrics */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-xl p-5 border border-slate-800 flex flex-col justify-between space-y-5 shadow-xl" id="projection_dynamic_summary_card">
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-mono tracking-wider text-indigo-400 font-bold border-b border-slate-800/80 pb-2 flex items-center gap-2">
              <Layers size={13} />
              <span>{language === 'am' ? 'የገቢ እና የወጪ ድምር ሁኔታ' : 'Live Feasibility Matrix'}</span>
            </h4>

            {/* Projected GPM Monthly Commission Income */}
            <div className="space-y-1 bg-slate-900/40 p-3 rounded-lg border border-slate-800/50">
              <span className="text-[10px] uppercase font-mono text-slate-500 block">
                {language === 'am' ? 'የGPM የታቀደ ወርሃዊ የኮሚሽን ገቢ' : 'Projected GPM Monthly Income'}
              </span>
              <div className="flex items-baseline space-x-1.5">
                <span className="text-2xl font-extrabold text-indigo-400 font-mono tracking-tight">
                  {fullMonthlyGpmRevenues.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-slate-400">ETB</span>
              </div>
              <span className="text-[10px] text-slate-500 block leading-tight">
                {language === 'am' ? 'በሙሉ አቅም በወር ፮ ላይ የሚሰበሰብ' : 'Expected full capacity commission run-rate (Month 6)'}
              </span>
            </div>

            {/* Average Payback Period (500k target) */}
            <div className="space-y-1 bg-slate-900/40 p-3 rounded-lg border border-slate-800/50">
              <span className="text-[10px] uppercase font-mono text-slate-500 block">
                {language === 'am' ? 'ለካፒታል መመለሻ የሚወስደው ጊዜ' : 'Estimated Payback Period'}
              </span>
              <div className="flex items-baseline space-x-1.5">
                <span className="text-2xl font-extrabold text-emerald-400 font-mono tracking-tight">
                  {exactPayback}
                </span>
                <span className="text-xs font-bold text-slate-400">{language === 'am' ? 'ወራት' : 'Months'}</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
                <div 
                  className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min(100, Math.max(10, (5 / parseFloat(exactPayback)) * 100))}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-500 block leading-tight pt-1">
                {language === 'am' ? 'የመነሻ ካፒታል፡- 500k ETB' : 'Initial CapEx reference: 500,000 ETB'}
              </span>
            </div>

            {/* Total Annual Cumulative Income projected */}
            <div className="space-y-1 bg-slate-900/40 p-3 rounded-lg border border-slate-800/50">
              <span className="text-[10px] uppercase font-mono text-slate-500 block">
                {language === 'am' ? 'የ፩ ዓመት ጠቅላላ የተከማቸ ገቢ' : '1 Year Cumulative Commission'}
              </span>
              <div className="flex items-baseline space-x-1.5">
                <span className="text-xl font-bold text-amber-400 font-mono">
                  {totalInboundOverTwelveMonths.toLocaleString()}
                </span>
                <span className="text-xs font-medium text-slate-400">ETB</span>
              </div>
              <span className="text-[10px] text-slate-500 block">
                {language === 'am' ? 'የማዕከሉ አጠቃላይ የ፩ ዓመት ገቢ' : 'Aggregated total GPM hub income'}
              </span>
            </div>
          </div>

          {/* Quick analysis summary paragraph */}
          <div className="text-[11px] text-slate-400 italic bg-indigo-500/5 border border-indigo-500/10 p-2.5 rounded-lg leading-relaxed">
            {language === 'am' ? (
              <span>💡 የባጃጅ መጠንን ወደ <strong>{bajajTarget}</strong> እና የሞተረኞችን ወደ <strong>{deliveryTarget}</strong> ሲቀይሩ መተግበሪያው የመመለሻ ጊዜውን አስተካክሎ ያሳያል ።</span>
            ) : (
              <span>💡 Scaling driver metrics in the sliders modifies both active commission revenues and ROI vectors in real-time.</span>
            )}
          </div>
        </div>
      </div>

      {/* Dynamic Sliders Component */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950/40 border border-slate-800/40 p-4 md:p-5 rounded-xl shadow-inner" id="projection_sliders_container">
        {/* Bajaj Drivers Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
              {language === 'am' ? 'የባጃጅ አሽከርካሪዎች ዕቅድ (ዒላማ) ፡' : 
               language === 'om' ? 'Konkolaachistoota Bajaj Karooramee:' :
               language === 'so' ? 'Qorshaha Darawaliinta Bajaajta:' : 'Target Bajaj Drivers:'}
            </label>
            <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20 shadow-sm">
              {bajajTarget} Drivers
            </span>
          </div>
          <input
            id="bajaj_slider_control"
            type="range"
            min="10"
            max="300"
            step="10"
            value={bajajTarget}
            onChange={(e) => setBajajTarget(parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono font-semibold">
            <span>10</span>
            <span>100 (Baseline)</span>
            <span>300</span>
          </div>
        </div>

        {/* Delivery Drivers Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              {language === 'am' ? 'የዕቃ አድራሽ ሞተረኞች ዕቅድ (ዒላማ) ፡' : 
               language === 'om' ? 'Geessitoota Meeshaa Karooramee:' :
               language === 'so' ? 'Qorshaha Darawaliinta Adeega:' : 'Target Delivery Couriers:'}
            </label>
            <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20 shadow-sm">
              {deliveryTarget} Couriers
            </span>
          </div>
          <input
            id="delivery_slider_control"
            type="range"
            min="5"
            max="200"
            step="5"
            value={deliveryTarget}
            onChange={(e) => setDeliveryTarget(parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono font-semibold">
            <span>5</span>
            <span>50 (Baseline)</span>
            <span>200</span>
          </div>
        </div>
      </div>

      {/* Break-even progress info metrics */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl shrink-0">
            <Calendar size={18} />
          </div>
          <div className="text-xs text-slate-300 leading-normal">
            {language === 'am' ? (
              <span>
                <strong>የመመለሻ ትንተና፡ </strong> የማዕከሉ ጠቅላላ የወር ኮሚሽን በሙሉ አቅም ወር ፮ ላይ <strong>{data[5]?.monthlyRevenue.toLocaleString()} ETB</strong> የደረሰ ሲሆን፣ {breakEvenMonthName ? (
                  <span>የመነሻ ካፒታሉ <strong>(500,000 ETB)</strong> በ<strong>{exactPayback} ወራት</strong> ({breakEvenMonthName}) ውስጥ ሙሉ ለሙሉ ይመለሳል ።</span>
                ) : (
                  <span className="text-amber-400 font-medium">ካለው አነስተኛ አሽከርካሪ ቁጥር የተነሳ መነሻ CapEx ለመመለስ ከአንድ አመት በላይ ይወስዳል ።</span>
                )}
              </span>
            ) : (
              <span>
                <strong>Payback Analysis: </strong> Commission builds up to <strong>{data[5]?.monthlyRevenue.toLocaleString()} ETB/month</strong> by Month 6. {breakEvenMonthName ? (
                  <span>Complete payback of initial capital <strong>(500,000 ETB)</strong> is unlocked within <strong>{exactPayback} Months</strong> ({breakEvenMonthName}).</span>
                ) : (
                  <span className="text-amber-400 font-medium font-semibold">Given current active driver targets, initial CapEx (500,000 ETB) payback requires more than 12 months.</span>
                )}
              </span>
            )}
          </div>
        </div>

        {/* Optimistic Scenario Toggle */}
        <div className="flex items-center space-x-2 shrink-0 border-t md:border-t-0 pt-2 md:pt-0 border-slate-850 w-full md:w-auto">
          <span className="text-[10px] text-slate-500 uppercase font-mono">{currentLabelByLang('scenarioLabel')}:</span>
          <div className="flex bg-slate-900 rounded-lg p-0.5 border border-slate-800 text-[10.5px]">
            <button
              onClick={() => setPerformanceMultiplier(0.8)}
              className={`px-2 py-1 rounded transition-all font-mono ${
                performanceMultiplier === 0.8 ? 'bg-amber-500/20 text-amber-400 font-bold' : 'text-slate-500 hover:text-slate-300'
              }`}
              title="80% average daily capacity"
            >
              80%
            </button>
            <button
              onClick={() => setPerformanceMultiplier(1.0)}
              className={`px-2 py-1 rounded transition-all font-mono ${
                performanceMultiplier === 1.0 ? 'bg-indigo-500/20 text-indigo-400 font-bold' : 'text-slate-500 hover:text-slate-300'
              }`}
              title="100% baseline capacity"
            >
              100%
            </button>
            <button
              onClick={() => setPerformanceMultiplier(1.2)}
              className={`px-2 py-1 rounded transition-all font-mono ${
                performanceMultiplier === 1.2 ? 'bg-emerald-500/20 text-emerald-400 font-bold' : 'text-slate-500 hover:text-slate-300'
              }`}
              title="120% optimistic peak capacity"
            >
              120%
            </button>
          </div>
        </div>
      </div>

      {/* Model Specifications checklist footer style */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-900 pt-1 text-center font-sans">
        <div className="p-2.5 bg-slate-950/30 rounded-lg border border-slate-800/40">
          <span className="text-[9px] text-slate-500 uppercase block font-mono">Bajaj Target</span>
          <span className="text-sm font-bold text-amber-500">{bajajTarget} Drivers</span>
        </div>
        <div className="p-2.5 bg-slate-950/30 rounded-lg border border-slate-800/40">
          <span className="text-[9px] text-slate-500 uppercase block font-mono">Delivery Target</span>
          <span className="text-sm font-bold text-teal-400">{deliveryTarget} Drivers</span>
        </div>
        <div className="p-2.5 bg-slate-950/30 rounded-lg border border-slate-800/40">
          <span className="text-[9px] text-slate-500 uppercase block font-mono">GPM Commission</span>
          <span className="text-sm font-bold text-indigo-400">5.0% flat</span>
        </div>
        <div className="p-2.5 bg-slate-950/30 rounded-lg border border-slate-800/40">
          <span className="text-[9px] text-slate-500 uppercase block font-mono">Breakeven Point</span>
          <span className="text-sm font-bold text-emerald-400">
            {exactPayback} {language === 'am' ? 'ወራት' : 'Months'}
          </span>
        </div>
      </div>

      {/* Direct Hotlines and Owner Contact Support card */}
      <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800/60 mt-2 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="space-y-1 text-center md:text-left">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">የጥናቱ ባለቤት እና ስራ አስኪያጅ የእውቂያ መስመሮች (Inquiries & Direct Hotlines)</h4>
          <p className="text-[11px] text-slate-400">ለማንኛውም አይነት ኢንቨስትመንት ጥያቄዎች ወይም አስተያየቶች፣ እባክዎ በቀጥታ ያግኙን ።</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="tel:0915167750"
            className="flex items-center space-x-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400 transition"
          >
            <span>📱 Ayub (Owner): </span>
            <span className="font-bold">0915167750</span>
          </a>
          <a
            href="tel:0940887021"
            className="flex items-center space-x-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-teal-500 text-slate-950 hover:bg-teal-400 transition"
          >
            <span>📱 Elias (Manager): </span>
            <span className="font-bold">0940887021</span>
          </a>
        </div>
      </div>

      {/* INVESTMENT COST SUMMARY DOCKET / PRINT PDF REPORT PREVIEW MODAL */}
      {showPdfModal && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in" id="pdf_docket_modal_wrapper">
          <div className="bg-white text-slate-900 rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden border border-slate-250 flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
              <div className="flex items-center space-x-2.5">
                <FileText className="text-amber-400" size={18} />
                <span className="font-bold text-sm tracking-tight uppercase font-mono">
                  {language === 'am' ? 'የገቢ እና ወጪ ጥናት ሪፖርት PDF' : 'Feasibility & Capex Cost Report Preview'}
                </span>
              </div>
              <button
                onClick={() => setShowPdfModal(false)}
                className="text-slate-400 hover:text-white transition p-1.5 rounded-full hover:bg-slate-800"
                title="Close"
              >
                <X size={16} />
              </button>
            </div>

            {/* Document Printable Body */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-xs text-slate-800 font-sans leading-relaxed" id="printable_report_pdf_contents">
              {/* Header Title block */}
              <div className="border-b-2 border-slate-900 pb-4 text-center space-y-1.5">
                <h2 className="text-lg md:text-xl font-extrabold uppercase tracking-tight text-slate-900 font-sans">
                  የኮሚሽን ገቢ እና የመነሻ መዋዕለ ንዋይ (CapEx) ሪፖርት
                </h2>
                <h3 className="text-xs md:text-sm font-bold text-slate-600 font-mono">
                  FEASIBILITY, COMMISSION & INITIAL CAPEX REPORT
                </h3>
                <div className="text-[10px] text-slate-505 font-medium flex justify-center gap-3">
                  <span>📍 ድሬዳዋ ከተማ ፣ ኢትዮጵያ (Dire Dawa, Ethiopia)</span>
                  <span>•</span>
                  <span>🗓️ {new Date().toLocaleDateString(undefined, {year: 'numeric', month: 'long', day: 'numeric'})}</span>
                </div>
              </div>

              {/* Two Panel Metadata (Project and Contacts) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-800">
                <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg space-y-1.5">
                  <h4 className="font-bold text-[10px] uppercase font-mono text-slate-900 tracking-wider">PROJECT SPECS (የፕሮጀክት መረጃ)</h4>
                  <p><strong>Hub Model Name:</strong> Dire Dawa Gig Professional Marketplace (GPM)</p>
                  <p><strong>Baseline CapEx Budget Needed:</strong> 500,000 ETB</p>
                  <p><strong>Platform Service Fee:</strong> 5.0% flat on all trips accomplished</p>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg space-y-1.5">
                  <h4 className="font-bold text-[10px] uppercase font-mono text-slate-900 tracking-wider">RESPONSIBILITIES & CONTACTS (የእውቂያ መስመሮች)</h4>
                  <p><strong>Owner:</strong> Mr. Ayub Abdela • 📱 <a href="tel:0915167750" className="text-indigo-650 hover:underline">0915167750</a></p>
                  <p><strong>Manager:</strong> Mr. Elias Abdela • 📱 <a href="tel:0940887021" className="text-indigo-650 hover:underline">0940887021</a></p>
                  <p><strong>Registry Status:</strong> Dire Dawa Youth Job Creation Directorate Initiatives</p>
                </div>
              </div>

              {/* Driver Target Inputs */}
              <div>
                <h4 className="font-extrabold text-[11px] uppercase font-mono tracking-widest text-slate-900 border-b border-slate-305 pb-1 mb-2">
                  1. DYNAMIC FEEDING CAPACITY (የግብአት አቅም)
                </h4>
                <table className="w-full text-left border-collapse border border-slate-200">
                  <thead>
                    <tr className="bg-slate-100 text-[10px] font-bold text-slate-700">
                      <th className="p-2 border border-slate-200">Driver Sector (ዘርፍ)</th>
                      <th className="p-2 border border-slate-200">Active Target (ገባሪ ዒላማ)</th>
                      <th className="p-2 border border-slate-200">Daily Gross Rate (እለት ገቢ)</th>
                      <th className="p-2 border border-slate-200">Commission Rate (ድርሻ)</th>
                      <th className="p-2 border border-slate-200 text-right">Proj. Monthly Hub Yield (ወርሃዊ ገቢ)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 border border-slate-200"><strong>Bajaj Taxi Sector (ባጃጅ ታክሲ)</strong></td>
                      <td className="p-2 border border-slate-200">{bajajTarget} Drivers</td>
                      <td className="p-2 border border-slate-200">450.00 ETB</td>
                      <td className="p-2 border border-slate-200">5.0% commission</td>
                      <td className="p-2 border border-slate-200 text-right font-mono">
                        {Math.round(bajajTarget * BAJAJ_DAILY_GROSS * LABOUR_DAYS * COMMISSION_RATE * performanceMultiplier).toLocaleString()} ETB
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-slate-200"><strong>Logistics & Delivery Courier (እቃ አድራሽ)</strong></td>
                      <td className="p-2 border border-slate-200">{deliveryTarget} Couriers</td>
                      <td className="p-2 border border-slate-200">550.00 ETB</td>
                      <td className="p-2 border border-slate-200">5.0% commission</td>
                      <td className="p-2 border border-slate-200 text-right font-mono">
                        {Math.round(deliveryTarget * DELIVERY_DAILY_GROSS * LABOUR_DAYS * COMMISSION_RATE * performanceMultiplier).toLocaleString()} ETB
                      </td>
                    </tr>
                    <tr className="bg-slate-50 font-bold">
                      <td className="p-2 border border-slate-200" colSpan={4}>TOTAL COMBINED MONTHLY GPM INCOME RUN-RATE (በወር ጠቅላላ ገቢ)</td>
                      <td className="p-2 border border-slate-200 text-right font-mono text-emerald-700 text-xs shadow-inner">
                        {fullMonthlyGpmRevenues.toLocaleString()} ETB
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Startup Capital CapEx Detail */}
              <div>
                <h4 className="font-extrabold text-[11px] uppercase font-mono tracking-widest text-slate-900 border-b border-slate-305 pb-1 mb-2">
                  2. SETUP CAPEX DISBURSEMENT SCHEDULE (የመነሻ ወጪዎች ዝርዝር)
                </h4>
                <table className="w-full text-left border-collapse border border-slate-200">
                  <thead>
                    <tr className="bg-slate-100 text-[10px] font-bold text-slate-700">
                      <th className="p-2 border border-slate-200">Budget Component (የወጪ ዘርፎች)</th>
                      <th className="p-2 border border-slate-200">Description (ማብራሪያ)</th>
                      <th className="p-2 border border-slate-200 text-right">Allocated Funding (በኢትዮጵያ ብር)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 border border-slate-200"><strong>GPM Physical Hub Infrastructure</strong></td>
                      <td className="p-2 border border-slate-200">Office desk stations, registration terminal, secure room setup & rent</td>
                      <td className="p-2 border border-slate-200 text-right font-mono">220,000.00 ETB</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-slate-200"><strong>Platform Engine Customization</strong></td>
                      <td className="p-2 border border-slate-200">Offline USSD SMS integration scripts and merchant local routing architecture</td>
                      <td className="p-2 border border-slate-200 text-right font-mono">150,000.00 ETB</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-slate-200"><strong>Security Tracker & SOS Panic Hardware</strong></td>
                      <td className="p-2 border border-slate-200">GPS safety modules and key fobs integrated with central security monitor dispatch</td>
                      <td className="p-2 border border-slate-200 text-right font-mono">80,000.00 ETB</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-slate-200"><strong>Community Driver Training</strong></td>
                      <td className="p-2 border border-slate-200">Capacity building, customer service checklists, and platform operations guide</td>
                      <td className="p-2 border border-slate-200 text-right font-mono">50,000.00 ETB</td>
                    </tr>
                    <tr className="bg-indigo-50 font-bold text-indigo-950">
                      <td className="p-2 border border-slate-200" colSpan={2}>TOTAL REQUIREMENT CAPEX BUDGET (ጠቅላላ መነሻ ካፒታል)</td>
                      <td className="p-2 border border-slate-200 text-right font-mono text-emerald-800">
                        {capEx.toLocaleString()}.00 ETB
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Feasibility Outcomes */}
              <div className="bg-slate-900 text-white p-4 rounded-xl flex flex-col md:flex-row justify-between gap-4">
                <div>
                  <h4 className="text-[10px] font-bold uppercase font-mono tracking-wider text-amber-400">FINANCIAL FEASIBILITY ANALYSIS (የአዋጭነት ወሳኝ መረጃዎች)</h4>
                  <ul className="list-disc pl-4 space-y-1 text-[11px] mt-2 text-slate-300">
                    <li>At planned <strong className="text-white">{bajajTarget} Bajajs</strong> and <strong className="text-white">{deliveryTarget} couriers</strong>, maximum target platform commission generates <strong className="text-white">{fullMonthlyGpmRevenues.toLocaleString()} ETB</strong> each month.</li>
                    <li>Cumulative platform commission crosses the initial startup budget in exactly <strong className="text-emerald-400 font-bold">{exactPayback} Months</strong>.</li>
                    <li>Year 1 aggregated platform inbound cumulative yield amounts to <strong className="text-white">{totalInboundOverTwelveMonths.toLocaleString()} ETB</strong>, showing <strong className="text-emerald-400 font-extrabold">{Math.round((totalInboundOverTwelveMonths / capEx) * 100)}% ROI year one</strong>.</li>
                  </ul>
                </div>
              </div>

              {/* Sign Off Footnotes */}
              <div className="pt-2 text-[10px] text-slate-500 italic flex justify-between items-center border-t border-slate-200">
                <span>Certified by: Ayub Abdela (Owner)</span>
                <span>Co-Signed: Elias Abdela (Manager)</span>
                <span>Report ID: GPM-DD-2026-X</span>
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 shrink-0 flex justify-end gap-3">
              <button
                onClick={() => setShowPdfModal(false)}
                className="px-4 py-2 border border-slate-300 rounded-xl text-slate-700 hover:bg-slate-100 transition text-xs font-semibold"
              >
                {language === 'am' ? 'ዝጋ (Close)' : 'Close Preview'}
              </button>
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex items-center space-x-1.5 px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-lg transition-all"
                id="native_print_pdf_trigger"
              >
                <Printer size={14} />
                <span>{language === 'am' ? 'ሪፖርቱን አትም / PDF አውርድ' : 'Generate & Print PDF'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

