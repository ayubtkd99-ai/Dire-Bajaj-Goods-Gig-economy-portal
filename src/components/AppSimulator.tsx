import React, { useState } from 'react';
import { LanguageCode, Order, Hub, UserRole } from '../types';
import { TRANSLATIONS, STUDY_HUBS_DATA } from '../translations';
import { 
  Smartphone, 
  MapPin, 
  ShieldAlert, 
  User, 
  CheckCircle, 
  Truck, 
  Navigation,
  Clock,
  LogOut,
  Send,
  Zap,
  Check,
  AlertTriangle,
  Compass,
  Laptop,
  Mail,
  Bell,
  Plus,
  Database,
  UserCheck,
  Phone,
  Printer,
  ClipboardList
} from 'lucide-react';

export interface RegisteredProfessional {
  id: string;
  name: string;
  phone: string;
  plateNumber: string;
  autoDispatch: boolean;
  paymentMethods: string[];
  status: 'pending' | 'approved';
  earnings: number;
}

export interface SimEmail {
  id: string;
  subject: string;
  body: string;
  time: string;
  category: 'report' | 'alert' | 'system';
}

interface AppSimulatorProps {
  language: LanguageCode;
}

export const AppSimulator: React.FC<AppSimulatorProps> = ({ language }) => {
  // Simulator authentication & role state
  const [role, setRole] = useState<UserRole>('guest');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [loginError, setLoginError] = useState<boolean>(false);
  
  // NEW: Phone-number based authorization and registration flow states
  const [phoneLoginInput, setPhoneLoginInput] = useState<string>('');
  const [selectedAuthRole, setSelectedAuthRole] = useState<UserRole>('customer');
  const [isRegisteringProfessional, setIsRegisteringProfessional] = useState<boolean>(false);
  const [registrationMode, setRegistrationMode] = useState<'form' | 'success'>('form');

  // Professional registration form states
  const [regFullName, setRegFullName] = useState<string>('');
  const [regPhoneNumber, setRegPhoneNumber] = useState<string>('');
  const [regPlateNumber, setRegPlateNumber] = useState<string>('');
  const [regPlateCode, setRegPlateCode] = useState<string>('2');
  const [regPlateSerial, setRegPlateSerial] = useState<string>('');
  const [regAutoDispatch, setRegAutoDispatch] = useState<boolean>(true);
  const [regPayments, setRegPayments] = useState<string[]>(['telebirr', 'cash']);

  // Pre-populated local database of professionals/drivers
  const [professionals, setProfessionals] = useState<RegisteredProfessional[]>([
    {
      id: 'prof_1',
      name: 'Yonas Kebede (አሽከርካሪ)',
      phone: '0912345678',
      plateNumber: 'ኮድ 2 AA A4882',
      autoDispatch: true,
      paymentMethods: ['telebirr', 'cash'],
      status: 'approved',
      earnings: 1240
    },
    {
      id: 'prof_2',
      name: 'Mohammed Ahmed (አሽከርካሪ)',
      phone: '0922334455',
      plateNumber: 'ኮድ 2 DD A0041',
      autoDispatch: false,
      paymentMethods: ['telebirr', 'cbe_birr'],
      status: 'approved',
      earnings: 850
    },
    {
      id: 'prof_3',
      name: 'Fatuma Ibrahim (አሽከርካሪ)',
      phone: '0915152299',
      plateNumber: 'ኮድ 3 DD B9821',
      autoDispatch: true,
      paymentMethods: ['cbe_birr', 'cash'],
      status: 'pending',
      earnings: 0
    }
  ]);

  // Push notifications broadcasts sent by the owner to simulated devices
  const [activeBroadcastNotes, setActiveBroadcastNotes] = useState<string[]>([
    'ድሬዳዋ ማዕከል፡ አሽከርካሪዎች መተግበሪያቸውን ወደ አዲሱ ስሪት እንዲያዘምኑ ተጋብዘዋል ።',
    '🚨 የጸጥታ ጥሪ (SOS) ባህሪው በድሬዳዋ ፖሊስ መምሪያ ጋር በይፋ ተገናኝቷል ።'
  ]);
  const [newBroadcastInput, setNewBroadcastInput] = useState<string>('');

  // Simulated strategically oriented owner email inbox at ayubabdalla620@gmail.com
  const [ownerEmailInbox, setOwnerEmailInbox] = useState<SimEmail[]>([
    {
      id: 'e_1',
      subject: 'Dire Dawa Node #1 Sync Confirmation',
      body: 'GPM Platform telemetry nodes successfully linked with Sabian and Megala Stations. 94.6% feasibility status target in effect.',
      time: '02:15 PM',
      category: 'system'
    },
    {
      id: 'e_2',
      subject: 'Weekly Hub Financial Settlement Summary',
      body: 'Total registered drivers: 2. Total gross transactions completed: 1,200 ETB. Consolidated 5.0% Admin commission cut: 60.00 ETB. Reports are generated for Ayub Abdela and Elias Abdela.',
      time: '03:40 PM',
      category: 'report'
    }
  ]);

  // NEW: Owner Dashboard sub-navigation & printing triggers
  const [ownerActiveTab, setOwnerActiveTab] = useState<'analytics' | 'drivers' | 'broadcast' | 'inbox'>('analytics');
  const [showReportModal, setShowReportModal] = useState<boolean>(false);

  // Approve a pending registered professional driver
  const approveProfessional = (profId: string) => {
    setProfessionals(prev => prev.map(p => {
      if (p.id === profId) {
        // Build auto notification email dispatched to ayubabdalla620@gmail.com
        const approveEmail: SimEmail = {
          id: `e_app_${Date.now()}`,
          subject: `GPM Certified Driver Tracker: ${p.name}`,
          body: `Verification status verified by Mr. Ayub Abdela. \n\nDriver Name: ${p.name}\nPhone Contacts: ${p.phone}\nLicense Plate ID: ${p.plateNumber}\nPayment Channels Confirmed: ${p.paymentMethods.join(', ')}\n\nRegistration approved. This driver is certified to receive dispatches under the GPM Dire Dawa cluster managed by Elias Abdela.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          category: 'system'
        };
        setOwnerEmailInbox(emails => [approveEmail, ...emails]);
        return { ...p, status: 'approved' as const };
      }
      return p;
    }));
  };

  // Simulation drivers stats
  const [driverGross, setDriverGross] = useState<number>(1200);
  const [completedTripsCount, setCompletedTripsCount] = useState<number>(4);
  const [sosTriggered, setSosTriggered] = useState<boolean>(false);

  // Global Simulator Orders State (shared dispatch system!)
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ord_1',
      type: 'delivery',
      status: 'pending',
      origin: 'chattara',
      destination: 'sabian',
      price: 320,
      commission: 16,
      customerName: 'Ato Ibrahim',
      itemsDescription: '50kg Chat basket (ላኪ አቶ ኢብራሂም)',
      time: '10:14 AM'
    },
    {
      id: 'ord_2',
      type: 'ride',
      status: 'pending',
      origin: 'megala',
      destination: 'kefira_station',
      price: 150,
      commission: 7.5,
      customerName: 'Samira Yahye',
      time: '11:05 AM'
    },
    {
      id: 'ord_3',
      type: 'green',
      status: 'pending',
      origin: 'kafira_market',
      destination: 'ashawa',
      price: 260,
      commission: 13,
      customerName: 'Chaltu Yosef',
      itemsDescription: 'Electric transit requested',
      time: '11:22 AM'
    }
  ]);

  // Active accepted order for the logged-in driver
  const [activeDriverOrder, setActiveDriverOrder] = useState<Order | null>(null);

  // Booking fields state for Customer / Merchant
  const [bookingOrigin, setBookingOrigin] = useState<string>('chattara');
  const [bookingDestination, setBookingDestination] = useState<string>('sabian');
  const [bookingCustName, setBookingCustName] = useState<string>('');
  const [bookingServiceType, setBookingServiceType] = useState<'ride' | 'delivery' | 'green'>('ride');
  const [bookingCargoDesc, setBookingCargoDesc] = useState<string>('');
  const [bookingMessage, setBookingMessage] = useState<string | null>(null);

  // USSD modal state
  const [showUssdModal, setShowUssdModal] = useState<boolean>(false);
  const [ussdDialInput, setUssdDialInput] = useState<string>('*6268#');
  const [ussdScreen, setUssdScreen] = useState<string>('dial'); // 'dial', 'menu', 'confirm', 'success'

  const t = (key: string) => TRANSLATIONS[key]?.[language] || key;

  // Retrieve hub helper
  const getHubName = (id: string) => {
    const found = STUDY_HUBS_DATA.find((h) => h.id === id);
    return found ? found.name[language] : id;
  };

  // Backwards compatible PIN login handler
  const handleLogin = (selectedRole: UserRole) => {
    if (passwordInput === '12345ayub') {
      setRole(selectedRole);
      setLoginError(false);
      setPasswordInput('');
    } else {
      setLoginError(true);
    }
  };

  // NEW: Interactive Phone Number Sign-in / Authorization Handler
  const handlePhoneLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneLoginInput.trim()) {
      alert(language === 'am' ? 'እባክዎን ስልክ ቁጥር ያስገቡ' : 'Please enter a valid phone number');
      return;
    }

    // Owner validation
    if (phoneLoginInput.trim() === '0915167750') {
      setRole('owner');
      setLoginError(false);
      
      // Send email alert to ayubabdalla620@gmail.com
      const ownerLoginEmail: SimEmail = {
        id: `e_login_${Date.now()}`,
        subject: 'Application Owner Strategic Console Accessed',
        body: `Manager Ayub Abdela has signed into the Dire Dawa GPM Administration Command Console (0915167750) successfully. Direct report control and driver registries are active. All systems reporting nominal status.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        category: 'alert'
      };
      setOwnerEmailInbox([ownerLoginEmail, ...ownerEmailInbox]);
      return;
    }

    // Standard driver or customer phone login
    setRole(selectedAuthRole);
    setLoginError(false);

    // If logging in as driver, verify if they are registered or simulate instant status
    if (selectedAuthRole === 'driver') {
      const matchDriver = professionals.find(p => p.phone === phoneLoginInput.trim());
      if (matchDriver) {
        // Use registered stats or name
        setDriverGross(matchDriver.earnings || 1200);
      } else {
        // Create an unregistered temporary entry or let them explore
        const autoReg: RegisteredProfessional = {
          id: `prof_temp_${Date.now()}`,
          name: `Driver (ስልክ: ${phoneLoginInput})`,
          phone: phoneLoginInput,
          plateNumber: 'ኮድ 2 AA (ደቂቃ የሌለው ሰሌዳ)',
          autoDispatch: true,
          paymentMethods: ['telebirr', 'cash'],
          status: 'approved',
          earnings: 1200
        };
        setProfessionals(prev => [...prev, autoReg]);
      }
    }
  };

  // NEW: Professional Driver Registration Handler
  const handleRegisterProfessionalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regFullName.trim() || !regPhoneNumber.trim() || !regPlateSerial.trim()) {
      alert(language === 'am' ? 'እባክዎን ሁሉንም መስኮች በደንብ ይሙሉ' : 'Please fill all required registration fields');
      return;
    }

    const compiledPlate = `ኮድ ${regPlateCode} AA B${regPlateSerial}`;
    
    const newProfessional: RegisteredProfessional = {
      id: `prof_${Date.now()}`,
      name: regFullName,
      phone: regPhoneNumber,
      plateNumber: compiledPlate,
      autoDispatch: regAutoDispatch,
      paymentMethods: regPayments,
      status: 'pending', // Enforce approval loop!
      earnings: 0
    };

    setProfessionals([newProfessional, ...professionals]);

    // Dispatch system email alert to ayubabdalla620@gmail.com
    const registrationEmail: SimEmail = {
      id: `e_reg_${Date.now()}`,
      subject: `New Driver Registry Pending: ${regFullName}`,
      body: `Strategic recruitment alert. A new professional has initiated registration in Dire Dawa. \n\nName: ${regFullName}\nPhone: ${regPhoneNumber}\nLicense Plate: ${compiledPlate}\nAuto dispatch via calls (አውቶ ራይስ አይነት በስልክ ቁጥር ትዕዛዝ): ${regAutoDispatch ? 'ENABLED' : 'DISABLED'}\nPayment methods accepted: ${regPayments.join(', ')}\n\nStatus is currently PENDING. Please access the Super Admin Dashboard (Login with Owner Phone: 0915167750) to approve and certify this driver.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      category: 'alert'
    };

    setOwnerEmailInbox([registrationEmail, ...ownerEmailInbox]);
    setRegistrationMode('success');
  };

  // Driver Accepts Order
  const handleAcceptOrder = (orderId: string) => {
    const updated = orders.map((o) => {
      if (o.id === orderId) {
        const orderAccepted = { ...o, status: 'accepted' as const };
        setActiveDriverOrder(orderAccepted);
        return orderAccepted;
      }
      return o;
    });
    setOrders(updated);
  };

  // Driver Completes Order
  const handleCompleteOrder = () => {
    if (!activeDriverOrder) return;

    const completedId = activeDriverOrder.id;
    const completedPrice = activeDriverOrder.price;
    const computedFee = Math.round(completedPrice * 0.05 * 10) / 10;

    const updated = orders.filter((o) => o.id !== completedId);
    setOrders(updated);
    
    // Update stats
    setDriverGross((prev) => prev + completedPrice);
    setCompletedTripsCount((prev) => prev + 1);

    // Push completion report email to ayubabdalla620@gmail.com
    const transactionEmail: SimEmail = {
      id: `e_tx_${Date.now()}`,
      subject: `Transaction Settlement: Order ${completedId}`,
      body: `GPM platform fee collection success in Dire Dawa. \n\nClient Name: ${activeDriverOrder.customerName}\nOrder Type: ${activeDriverOrder.type}\nRoute: ${getHubName(activeDriverOrder.origin)} to ${getHubName(activeDriverOrder.destination)}\nFare Charged: ${completedPrice} ETB\n5% GPM Hub Commission Received: ${computedFee} ETB.\n\nAll funds have been deposited and logged under the administration guidelines managed by Ayub Abdela.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      category: 'report'
    };
    setOwnerEmailInbox(emails => [transactionEmail, ...emails]);

    setActiveDriverOrder(null);
  };

  // Customer/Merchant places order
  const handleBookOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingCustName.trim()) {
      alert(language === 'am' ? 'እባክዎን ስምዎን ያስገቡ' : 'Please provide a contact name');
      return;
    }

    // Estimate price based on random distance metric
    const priceRange = bookingServiceType === 'green' ? [150, 300] : [100, 400];
    const computedPrice = Math.floor(Math.random() * (priceRange[1] - priceRange[0])) + priceRange[0];
    const computedCommission = Math.round(computedPrice * 0.05 * 10) / 10;

    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      type: bookingServiceType,
      status: 'pending',
      origin: bookingOrigin,
      destination: bookingDestination,
      price: computedPrice,
      commission: computedCommission,
      customerName: bookingCustName,
      itemsDescription: bookingServiceType === 'delivery' ? bookingCargoDesc || 'Market Goods' : undefined,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setOrders([newOrder, ...orders]);
    setBookingMessage(t('successBooking'));
    setBookingCustName('');
    setBookingCargoDesc('');

    // Clear alert message after 6 seconds
    setTimeout(() => {
      setBookingMessage(null);
    }, 6000);
  };

  // Dial USSD Code
  const handleUssdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ussdDialInput === '*6268#') {
      setUssdScreen('menu');
    } else {
      alert(language === 'am' ? 'የተሳሳተ የUSSD ኮድ! እባክዎን *6268# ይደውሉ' : 'Unknown code. Dial *6268# for GPM menu.');
    }
  };

  // USSD option booking
  const handleUssdBook = (typeId: 'ride' | 'delivery') => {
    const computedPrice = typeId === 'ride' ? 120 : 250;
    const computedCommission = computedPrice * 0.05;

    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      type: typeId,
      status: 'pending',
      origin: 'megala', // default USSD center
      destination: 'sabian',
      price: computedPrice,
      commission: computedCommission,
      customerName: 'USSD Offline User',
      itemsDescription: typeId === 'delivery' ? 'Offline USSD market goods' : undefined,
      time: 'USSD Dial In'
    };

    setOrders([newOrder, ...orders]);
    setUssdScreen('success');
  };

  // Calculation helpers
  const driverCommissionPaid = Math.round(driverGross * 0.05 * 10) / 10;
  const driverNetEarnings = driverGross - driverCommissionPaid;

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-center justify-center p-2" id="app_simulator_container">
      
      {/* Handset/Smartphone Simulator Frame */}
      <div className="w-[360px] h-[720px] bg-slate-950 rounded-[40px] border-[10px] border-slate-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] relative flex flex-col overflow-hidden select-none" id="phone_wrapper_frame">
        {/* Phone Notch/Ear Piece */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-50 flex items-center justify-center">
          <div className="w-12 h-1 bg-slate-800 rounded-full mb-1"></div>
        </div>

        {/* Status Bar */}
        <div className="h-9 bg-slate-950 px-6 pt-1 flex justify-between items-center text-[10px] text-slate-400 font-mono z-40 shrink-0">
          <span>{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: true})}</span>
          <div className="flex items-center space-x-1.5">
            <span className="text-teal-400 font-semibold">• GPM LTE</span>
            <span>🔋 98%</span>
          </div>
        </div>

        {/* SCREEN CANVAS AREA */}
        <div className="flex-1 bg-slate-900 px-4 py-4 flex flex-col justify-between overflow-y-auto overflow-x-hidden scrollbar-none relative" id="phone_screen_content">
          
          {/* 1. GUEST/LOCK SCREEN FOR PROFILE SELECTION */}
          {role === 'guest' && (
            <div className="flex-1 flex flex-col justify-between py-2 text-center" id="lock_screen_select">
              
              {/* Profile Registration Form Overlay Modal */}
              {isRegisteringProfessional ? (
                <div className="flex-1 flex flex-col justify-between text-left space-y-3 pt-1" id="driver_reg_wizard">
                  <div className="space-y-1">
                    <div className="flex justify-between items-center bg-slate-950 p-2 rounded-lg border border-slate-850">
                      <span className="text-[11px] font-sans font-bold text-amber-400 uppercase tracking-tight">
                        {language === 'am' ? 'አዲስ ባለሙያ መመዝገቢያ ✍️' : 'New Driver Registry ✍️'}
                      </span>
                      <button 
                        onClick={() => setIsRegisteringProfessional(false)}
                        className="text-[9px] font-bold text-slate-500 hover:text-slate-300"
                        id="btn_cancel_reg"
                      >
                        ✕
                      </button>
                    </div>
                    <p className="text-[9px] text-slate-400 leading-relaxed px-1">
                      {language === 'am' ? 'በድሬዳዋ የጊግ ሥራ ፈጠራ ላይ ለመሳተፍ አሽከርካሪ በመሆን እዚህ ይመዝገቡ ።' : 'Register here to launch your dispatch profile.'}
                    </p>
                  </div>

                  {registrationMode === 'form' ? (
                    <form onSubmit={handleRegisterProfessionalSubmit} className="space-y-2.5 flex-1 overflow-y-auto max-h-[460px] pr-1 scrollbar-none" id="driver_reg_form">
                      {/* Name */}
                      <div className="space-y-0.5">
                        <label className="text-[9px] text-slate-400 font-medium block">
                          {language === 'am' ? 'ሙሉ ስም (Full Name)' : 'Full Name'}
                        </label>
                        <input
                          type="text"
                          required
                          value={regFullName}
                          onChange={(e) => setRegFullName(e.target.value)}
                          placeholder={language === 'am' ? 'ምሳሌ፡ ዮናስ ከበደ' : 'e.g. Yonas Kebede'}
                          className="w-full bg-slate-950 border border-slate-800 rounded-md px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
                          id="reg_full_name"
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-0.5">
                        <label className="text-[9px] text-slate-400 font-medium block">
                          {language === 'am' ? 'ስልክ ቁጥር (Phone Number)' : 'Phone Number'}
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            required
                            value={regPhoneNumber}
                            onChange={(e) => setRegPhoneNumber(e.target.value)}
                            placeholder="09..."
                            className="w-full bg-slate-950 border border-slate-800 rounded-md pl-7 pr-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-amber-400 font-mono"
                            id="reg_phone"
                          />
                          <span className="absolute left-2.5 top-1 font-mono text-xs text-slate-500">📱</span>
                        </div>
                      </div>

                      {/* License Plate Number Formatter (____) */}
                      <div className="space-y-1 bg-slate-950/40 p-2 rounded-lg border border-slate-900">
                        <label className="text-[9px] text-slate-300 font-bold block">
                          {language === 'am' ? 'የሰሌዳ ቁጥር መመዝገቢያ (____) 🚗' : 'License Plate Registration (____)'}
                        </label>
                        
                        <div className="grid grid-cols-3 gap-1.5 items-center">
                          <div>
                            <span className="text-[8px] text-slate-500 block mb-0.5">Code</span>
                            <select
                              value={regPlateCode}
                              onChange={(e) => setRegPlateCode(e.target.value)}
                              className="w-full bg-slate-950 border border-slate-800 rounded px-1 py-0.5 text-[10px] text-slate-300"
                              id="reg_plate_code"
                            >
                              <option value="2">ኮድ 2</option>
                              <option value="3">ኮድ 3</option>
                              <option value="4">ኮድ 4</option>
                            </select>
                          </div>
                          <div>
                            <span className="text-[8px] text-slate-500 block mb-0.5">Region</span>
                            <span className="w-full bg-slate-950/80 text-center border border-slate-850 rounded block py-0.5 text-[10px] text-slate-400 font-bold font-mono">
                              AA / DD
                            </span>
                          </div>
                          <div>
                            <span className="text-[8px] text-slate-500 block mb-0.5">Serial (____)</span>
                            <input
                              type="text"
                              required
                              maxLength={5}
                              value={regPlateSerial}
                              onChange={(e) => setRegPlateSerial(e.target.value.replace(/\D/g, ''))}
                              placeholder="48820"
                              className="w-full bg-slate-950 border border-slate-800 rounded text-center py-0.5 text-[10px] text-white font-mono"
                              id="reg_plate_serial"
                            />
                          </div>
                        </div>
                        <span className="text-[8px] text-slate-500 block leading-normal mt-1 font-mono">
                          Format Preview: <strong className="text-amber-500">ኮድ {regPlateCode} AA B{regPlateSerial || '____'}</strong>
                        </span>
                      </div>

                      {/* Auto Dispatch Trigger */}
                      <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-900 space-y-1">
                        <div className="flex items-start space-x-2">
                          <input
                            type="checkbox"
                            checked={regAutoDispatch}
                            onChange={(e) => setRegAutoDispatch(e.target.checked)}
                            className="mt-0.5 rounded border-slate-800 text-amber-500 focus:ring-transparent"
                            id="reg_auto_dispatch"
                          />
                          <div>
                            <label htmlFor="reg_auto_dispatch" className="text-[9.5px] font-bold text-slate-200 block cursor-pointer">
                              {language === 'am' ? 'አውቶ ራይስ አይነት በስልክ ቁጥር ትዕዛዝ ለመቀበል 📞' : 'Auto Ride - Voice Call Orders Dispatch'}
                            </label>
                            <p className="text-[8px] text-slate-500 leading-normal">
                              {language === 'am' 
                                ? 'ኢንተርኔት ሳይኖር በቀጥታ ወደ ስልክ ቁጥርዎ በድምፅ ትዕዛዝ ለመቀበል ይህን ያብሩ ።' 
                                : 'Toggle this to automatically accept dispatches via mobile phone calls without active cellular internet networks.'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Payment Reception Options */}
                      <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-900 space-y-1">
                        <span className="text-[9.5px] font-bold text-slate-200 block">
                          {language === 'am' ? 'ክፍያ ለመቀበል (Accept Payments) 💳' : 'Accept Payments Settings'}
                        </span>
                        <p className="text-[8px] text-slate-500 mb-1 leading-none">
                          {language === 'am' ? 'ደንበኞች እንዲከፍሉዎት የሚፈልጉትን አማራጭ ይምረጡ' : 'Select preferred money receipt gateways.'}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 pt-1">
                          {['telebirr', 'cbe_birr', 'cash'].map((method) => {
                            const isChecked = regPayments.includes(method);
                            return (
                              <button
                                type="button"
                                key={method}
                                onClick={() => {
                                  if (isChecked) {
                                    setRegPayments(regPayments.filter(p => p !== method));
                                  } else {
                                    setRegPayments([...regPayments, method]);
                                  }
                                }}
                                className={`px-2 py-0.5 text-[8.5px] font-mono rounded border transition ${
                                  isChecked 
                                    ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold' 
                                    : 'bg-slate-950 text-slate-500 border-slate-800'
                                }`}
                                id={`reg_pay_${method}`}
                              >
                                {method === 'telebirr' && 'telebirr'}
                                {method === 'cbe_birr' && 'CBE Birr'}
                                {method === 'cash' && 'Cash በእጅ'}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Submit & Cancel */}
                      <div className="grid grid-cols-2 gap-2 pt-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => setIsRegisteringProfessional(false)}
                          className="w-full bg-slate-950 border border-slate-800 text-slate-400 text-[10px] py-1.5 rounded-lg hover:text-white transition"
                          id="btn_back_to_login"
                        >
                          ተመለስ (Go Back)
                        </button>
                        <button
                          type="submit"
                          className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 text-[10px] font-bold py-1.5 rounded-lg transition"
                          id="btn_submit_reg"
                        >
                          ምዝገባን አጠናቅቅ ✓
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="p-4 bg-slate-950 border border-slate-850 rounded-xl space-y-4 my-auto text-center" id="reg_success_panel">
                      <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-full mx-auto flex items-center justify-center border border-emerald-500/20">
                        <CheckCircle size={20} className="animate-bounce" />
                      </div>
                      
                      <div className="space-y-1 px-1">
                        <h4 className="text-xs font-bold text-slate-100">ባለሙያ ምዝገባ በተሳካ ሁኔታ ተልኳል!</h4>
                        <p className="text-[10px] text-slate-400 leading-relaxed">
                          እርስዎ የፈጠሩት ምዝገባ ማሳሰቢያ በቀጥታ ለፕሮጀክቱ ባለቤት ደርሷል ። ዝርዝሩ በ <strong>ayubabdalla620@gmail.com</strong> በኩል ይጣራል ።
                        </p>
                      </div>

                      <div className="bg-slate-900 p-2.5 rounded-lg text-left text-[9px] border border-slate-850 font-mono space-y-1">
                        <div className="text-emerald-400">• ስም: {regFullName}</div>
                        <div className="text-slate-300">• የሰሌዳ ቁጥር: ಕೋድ {regPlateCode} AA B{regPlateSerial}</div>
                        <div className="text-slate-300">• አውቶ ራይድ ጥሪ በስልክ: {regAutoDispatch ? 'በስልክ ጥሪ ተቆልፏል' : 'የለም'}</div>
                      </div>

                      <div className="space-y-1.5 pt-2">
                        <button
                          onClick={() => {
                            // Automatically authorize them as driver and let them tour
                            setRole('driver');
                            setIsRegisteringProfessional(false);
                            setRegistrationMode('form');
                          }}
                          className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-sans font-bold py-1.5 px-3 rounded-lg text-xs"
                          id="btn_explore_registered"
                        >
                          አሽከርካሪ መተግበሪያውን ጎብኝ 🌐
                        </button>
                        <button
                          onClick={() => {
                            setIsRegisteringProfessional(false);
                            setRegistrationMode('form');
                          }}
                          className="w-full bg-slate-900 text-slate-400 font-sans py-1 rounded text-[10px]"
                        >
                          ተመለስ ወደ መግቢያ
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Interactive Authorization Sign-in screen */
                <div className="flex-1 flex flex-col justify-between" id="phone_authorize_login">
                  <div className="space-y-2 pt-2">
                    <div className="w-12 h-12 bg-amber-500 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-amber-500/20">
                      <Phone className="text-slate-950 animate-pulse" size={24} />
                    </div>
                    <div>
                      <h3 className="text-slate-100 font-sans font-extrabold text-xs tracking-wide">
                        {language === 'am' ? 'የድሬ ጊግ መተግበሪያ መግቢያ በር' : 'Dire GPM Security Login'}
                      </h3>
                      <p className="text-[10px] text-slate-400 mt-1 px-4 leading-normal">
                        {language === 'am' ? 'ለደምበኛው user ና login authorize ፈቃድ በስልክ ቁጥር መግቢያ' : 'User authorize and client registration sing-in gateway'}
                      </p>
                    </div>
                  </div>

                  {/* Authorization input form */}
                  <form onSubmit={handlePhoneLogin} className="space-y-2.5 px-2.5 mt-3 text-left">
                    {/* Phone field */}
                    <div className="space-y-1">
                      <label className="text-[9px] text-slate-500 font-mono tracking-wider block uppercase">
                        {language === 'am' ? 'ስልክ ቁጥር (Phone Number)' : 'Authorized Phone Number'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={phoneLoginInput}
                        onChange={(e) => setPhoneLoginInput(e.target.value)}
                        placeholder="0915167750 (የባለቤት መግቢያ)"
                        className="w-full bg-slate-950 border border-slate-800 text-slate-100 text-xs px-3 py-1.5 rounded-lg focus:outline-none focus:border-amber-500 font-mono"
                        id="auth_phone_login_field"
                      />
                      <span className="text-[8px] text-slate-500 block leading-tight font-mono">
                        ⚙️ Owner / Admin login: <strong className="text-amber-500 font-bold">0915167750</strong>
                      </span>
                    </div>

                    {/* Role selector interface */}
                    <div className="space-y-1">
                      <label className="text-[9px] text-slate-500 font-mono tracking-wider block uppercase">
                        {language === 'am' ? 'የመግቢያ መገለጫ መሪ' : 'Select Access Profile'}
                      </label>
                      <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-lg border border-slate-900">
                        {[
                          { id: 'customer', label: language === 'am' ? 'ደንበኛ' : 'Commuter', icon: User },
                          { id: 'driver', label: language === 'am' ? 'ባለሙያ' : 'Driver', icon: Navigation },
                          { id: 'merchant', label: language === 'am' ? 'ነጋዴ' : 'Merchant', icon: Truck }
                        ].map((item) => {
                          const IconComp = item.icon;
                          const isSel = selectedAuthRole === item.id;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setSelectedAuthRole(item.id as UserRole)}
                              className={`py-1 rounded flex flex-col items-center justify-center transition-all ${
                                isSel ? 'bg-amber-500 text-slate-950 border border-amber-500 font-bold' : 'bg-transparent text-slate-400'
                              }`}
                              style={{ touchAction: 'manipulation' }}
                            >
                              <IconComp size={10} className="mb-0.5" />
                              <span className="text-[8px] truncate max-w-full">{item.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Action buttons stack */}
                    <div className="space-y-1.5 pt-1">
                      <button
                        type="submit"
                        className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-1.5 rounded-lg text-xs leading-none transition"
                        style={{ touchAction: 'none' }}
                        id="btn_authorize_login"
                      >
                        ግባ & ፍቀድ (Log In & Authorize) 🔐
                      </button>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            // Explore instantly without entering phone
                            setRole(selectedAuthRole);
                          }}
                          className="w-full bg-slate-950 border border-slate-800 text-slate-300 py-1 text-[9px] rounded-lg hover:text-white"
                          title="Explore Application immediately"
                          id="btn_explore_instantly"
                        >
                          መተግበሪያውን ለመጎብኘት 🌐
                        </button>
                        
                        <button
                          type="button"
                          onClick={() => {
                            setIsRegisteringProfessional(true);
                            setRegistrationMode('form');
                          }}
                          className="w-full bg-indigo-950/40 border border-indigo-900/40 text-amber-400 font-sans text-[9px] py-1 rounded-lg"
                          id="btn_open_reg_driver"
                        >
                          አዲስ ባለሙያ መመዝገቢያ ✍️
                        </button>
                      </div>
                    </div>
                  </form>

                  {/* Expandable Backup credentials Pin Fallback */}
                  <div className="px-5 mt-2 bg-slate-950/30 py-1 rounded-xl border border-slate-950 space-y-1">
                    <details className="cursor-pointer group">
                      <summary className="text-[8.5px] text-slate-500 group-hover:text-slate-400 font-mono select-none outline-none">
                        🔑 Or Use Passcode (የበፊቱ የኮድ መግቢያ)
                      </summary>
                      <div className="space-y-1.5 pt-1 text-left">
                        <input
                          type="password"
                          placeholder={t('enterPassword')}
                          value={passwordInput}
                          onChange={(e) => setPasswordInput(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-850 text-center text-xs px-2.5 py-1 rounded text-slate-100 focus:outline-none focus:border-amber-500 font-mono"
                          id="lock_screen_password_field"
                        />
                        <button
                          type="button"
                          onClick={() => handleLogin(selectedAuthRole)}
                          className="w-full bg-slate-850 text-slate-300 hover:text-white font-mono text-[9px] py-0.5 rounded"
                        >
                          Validate pin
                        </button>
                        <span className="text-[8px] text-slate-600 block text-center">
                          Default simulation pin: 12345ayub
                        </span>
                        {loginError && (
                          <p className="text-[8px] text-rose-400 font-mono text-center">
                            Invalid PIN fallback
                          </p>
                        )}
                      </div>
                    </details>
                  </div>
                </div>
              )}

            </div>
          )}


          {/* 2. LIVE ROLE SPECIFIC SCREENS - WHEN LOGGED IN */}
          {role !== 'guest' && (
            <div className="flex-1 flex flex-col justify-between space-y-4" id="role_active_screen">
              
              {/* Internal Mini App Header */}
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></span>
                  <span className="text-[10px] font-sans font-bold text-slate-200 tracking-tight">
                    {t('appName')}
                  </span>
                </div>
                
                <button
                  onClick={() => {
                    setRole('guest');
                    setActiveDriverOrder(null);
                  }}
                  className="flex items-center space-x-1 text-[9px] bg-slate-950 border border-slate-850 px-2 py-1 rounded text-red-400 hover:text-red-300 transition cursor-pointer"
                  id="btn_phone_logout"
                >
                  <LogOut size={10} />
                  <span>{t('logoutBtn')}</span>
                </button>
              </div>

              {/* Active Profile indicators */}
              <div className="bg-slate-950/80 px-2.5 py-1 rounded-md flex justify-between items-center text-[10px] text-slate-400">
                <span>{t('roleText')}</span>
                <span className="font-bold text-amber-400 uppercase tracking-wide">
                  {role === 'driver' && t('roleDriver')}
                  {role === 'customer' && t('roleCustomer')}
                  {role === 'merchant' && t('roleMerchant')}
                  {role === 'owner' && (language === 'am' ? 'የድርጅት ባለቤት (Super Admin)' : 'Super Admin Owner')}
                </span>
              </div>


              {/* A. ACTIVE DRIVER PANEL SCREEN */}
              {role === 'driver' && (
                <div className="flex-1 flex flex-col justify-between space-y-3" id="panel_driver_screen">
                  
                  {/* Earnings Tracker */}
                  <div className="bg-slate-950 border border-slate-805 p-3 rounded-xl space-y-2">
                    <span className="text-[9px] uppercase font-mono tracking-wider text-slate-500 font-bold block">
                      {t('driverStats')}
                    </span>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <span className="text-[8px] text-slate-500 block">Gross Today</span>
                        <span className="text-xs font-bold text-slate-200 font-mono">{driverGross} ETB</span>
                      </div>
                      <div>
                        <span className="text-[8px] text-slate-500 block">5% GPM Fee</span>
                        <span className="text-xs font-bold text-amber-500 font-mono">-{driverCommissionPaid} ETB</span>
                      </div>
                      <div>
                        <span className="text-[8px] text-emerald-400 block font-semibold">Net Earnings</span>
                        <span className="text-xs font-extrabold text-emerald-400 font-mono">{driverNetEarnings} ETB</span>
                      </div>
                    </div>
                    <div className="text-[9px] text-slate-500 text-center font-mono pt-1.5 border-t border-slate-900/60 flex justify-between">
                      <span>Completed Today: <strong>{completedTripsCount} trips</strong></span>
                      <span>Rate: 5.0 ★</span>
                    </div>
                  </div>

                  {/* Driver Order Queue (Current Order OR Dispatch) */}
                  <div className="flex-1 flex flex-col justify-start space-y-2.5 min-h-[220px]">
                    {activeDriverOrder ? (
                      /* ACTIVE ASSIGNED ORDER SCREEN */
                      <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-3.5 space-y-3" id="active_trip_panel">
                        <div className="flex justify-between items-center">
                          <span className="text-[9px] bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded-full uppercase font-mono">
                            {t('activeOrder')}
                          </span>
                          <span className="text-xs font-mono font-bold text-amber-500">
                            {activeDriverOrder.price} ETB
                          </span>
                        </div>

                        <div className="space-y-1.5">
                          <div className="flex items-center text-xs text-slate-300">
                            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                            <span>From: <strong>{getHubName(activeDriverOrder.origin)}</strong></span>
                          </div>
                          <div className="flex items-center text-xs text-slate-200">
                            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2"></span>
                            <span>To: <strong>{getHubName(activeDriverOrder.destination)}</strong></span>
                          </div>
                          {activeDriverOrder.itemsDescription && (
                            <div className="text-[10px] text-slate-400 bg-slate-950/80 p-1.5 rounded-md mt-1 border border-slate-900">
                              📦 {activeDriverOrder.itemsDescription}
                            </div>
                          )}
                        </div>

                        <div className="pt-2 border-t border-slate-805 flex justify-between items-center text-[11px] text-slate-300">
                          <span>Client: <strong className="text-white">{activeDriverOrder.customerName}</strong></span>
                          <span>USSD Status: Online</span>
                        </div>

                        {/* Completion Trigger */}
                        <button
                          onClick={handleCompleteOrder}
                          className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2 px-3 rounded-lg text-xs tracking-tight transition cursor-pointer"
                          id="driver_complete_active_trip"
                        >
                          ✓ {t('completeOrderBtn')}
                        </button>
                      </div>
                    ) : (
                      /* DISPATCH FEED SCREEN - VIEW PENDING JOBS */
                      <div className="space-y-2 flex-1 overflow-y-auto max-h-[240px] scrollbar-none">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                          {t('availJobs')} ({orders.filter(o => o.status === 'pending').length})
                        </span>

                        {orders.filter((o) => o.status === 'pending').length === 0 ? (
                          <div className="text-center py-8 text-xs text-slate-500 italic bg-slate-950/40 rounded-xl" id="no_orders_panel">
                            {t('noOrders')}
                          </div>
                        ) : (
                          orders.filter((o) => o.status === 'pending').map((order) => (
                            <div
                              key={order.id}
                              className="bg-slate-950 border border-slate-850 p-2.5 rounded-xl space-y-1.5 hover:border-slate-800 transition"
                              id={`dispatch_order_${order.id}`}
                            >
                              <div className="flex justify-between items-center">
                                <span className={`text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded font-mono ${
                                  order.type === 'ride' 
                                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                                    : order.type === 'green'
                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 animate-pulse'
                                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                }`}>
                                  {order.type === 'ride' && t('orderTypeRide')}
                                  {order.type === 'delivery' && t('orderTypeDelivery')}
                                  {order.type === 'green' && t('orderTypeGreen')}
                                </span>
                                <span className="text-xs font-mono font-bold text-amber-500">
                                  {order.price} ETB
                                </span>
                              </div>

                              <div className="text-[10px] text-slate-300 space-y-0.5">
                                <div className="truncate">📍 {getHubName(order.origin)} → {getHubName(order.destination)}</div>
                                <div className="text-slate-400 text-[9px] flex justify-between">
                                  <span>Client: {order.customerName}</span>
                                  <span>Time: {order.time}</span>
                                </div>
                              </div>

                              {/* Interaction to Accept */}
                              <button
                                onClick={() => handleAcceptOrder(order.id)}
                                className="w-full bg-slate-900 border border-slate-800 hover:border-slate-700 font-bold py-1 px-2.5 rounded-md text-[10px] text-slate-300 transition cursor-pointer"
                                id={`accept_btn_${order.id}`}
                              >
                                {t('acceptOrderBtn')} (GPM Fee: {order.commission} ETB)
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>

                  {/* SOS Safety Alarm Trigger */}
                  <div className="pt-2 border-t border-slate-900">
                    {sosTriggered ? (
                      <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-2 text-center space-y-1 animate-pulse">
                        <span className="text-red-500 text-xs font-bold block">🚨 SOS ACTIVATED</span>
                        <p className="text-[9px] text-slate-300 leading-normal">{t('sosConfirmation')}</p>
                        <button
                          onClick={() => setSosTriggered(false)}
                          className="text-[9px] bg-red-600 hover:bg-red-500 text-white font-mono px-2 py-0.5 rounded mt-0.5"
                          id="btn_sos_deactivate"
                        >
                          TAP TO RESET
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setSosTriggered(true)}
                        className="w-full bg-red-600 hover:bg-red-500 text-white font-extrabold py-2 px-3 rounded-lg text-[10px] tracking-wide flex items-center justify-center space-x-1.5 animate-pulse cursor-pointer"
                        id="btn_sos_trigger"
                      >
                        <ShieldAlert size={12} />
                        <span>{t('sosSafety')}</span>
                      </button>
                    )}
                  </div>
                </div>
              )}


              {/* B. ACTIVE COMMUTER / CUSTOMER BOOKING SCREEN */}
              {role === 'customer' && (
                <div className="flex-1 flex flex-col justify-between space-y-3" id="panel_customer_screen">
                  
                  {/* Custom Order Booking form */}
                  <form onSubmit={handleBookOrder} className="bg-slate-950 border border-slate-805 p-3 rounded-xl space-y-2.5">
                    <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-400 block border-b border-slate-900 pb-1.5">
                      {language === 'am' ? 'የጉዞ ወይም የእቃዎች ማድረሻ ጥሪ' : 'New Dispatch Booking Form'}
                    </span>

                    {/* Customer Name */}
                    <div className="space-y-1">
                      <label className="text-[9px] text-slate-500 font-medium block">{t('custName')}</label>
                      <input
                        type="text"
                        required
                        value={bookingCustName}
                        onChange={(e) => setBookingCustName(e.target.value)}
                        placeholder={language === 'am' ? 'ለምሳሌ፡ አቶ አዩብ' : 'e.g. Mr. Elias'}
                        className="w-full bg-slate-900 border border-slate-800 rounded-md px-2.5 py-1 text-xs text-slate-100 focus:outline-none focus:border-amber-500 transition"
                        id="book_cust_name"
                      />
                    </div>

                    {/* Service Type Selection */}
                    <div className="space-y-1">
                      <label className="text-[9px] text-slate-500 font-medium block">
                        {language === 'am' ? 'የአገልግሎት አይነት' : 'Service class requested'}
                      </label>
                      <div className="grid grid-cols-3 gap-1.5">
                        <button
                          type="button"
                          onClick={() => setBookingServiceType('ride')}
                          className={`py-1 text-[9px] rounded font-medium border transition ${
                            bookingServiceType === 'ride'
                              ? 'bg-blue-500/10 text-blue-400 border-blue-500/50'
                              : 'bg-slate-900 text-slate-400 border-slate-800'
                          }`}
                          id="service_btn_ride"
                        >
                          {language === 'am' ? 'ባጃጅ (Ride)' : 'Normal Bajaj'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setBookingServiceType('delivery')}
                          className={`py-1 text-[9px] rounded font-medium border transition ${
                            bookingServiceType === 'delivery'
                              ? 'bg-amber-500/10 text-amber-400 border-amber-500/50'
                              : 'bg-slate-900 text-slate-400 border-slate-800'
                          }`}
                          id="service_btn_delivery"
                        >
                          {language === 'am' ? 'እቃ ላኪ' : 'Goods Truck'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setBookingServiceType('green')}
                          className={`py-1 text-[9px] rounded font-medium border transition ${
                            bookingServiceType === 'green'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/50'
                              : 'bg-slate-900 text-slate-400 border-slate-800'
                          }`}
                          id="service_btn_green"
                        >
                          {language === 'am' ? 'ኤሌክትሪክ ባጃጅ' : 'Green Electric'}
                        </button>
                      </div>
                    </div>

                    {/* From / To location dropdown selection */}
                    <div className="grid grid-cols-2 gap-1.5">
                      <div>
                        <label className="text-[9px] text-slate-500 font-medium block">{t('originLabel')}</label>
                        <select
                          value={bookingOrigin}
                          onChange={(e) => setBookingOrigin(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-md p-1 px-1.5 text-[10px] text-slate-300 focus:outline-none"
                          id="book_origin"
                        >
                          {STUDY_HUBS_DATA.map((h) => (
                            <option key={h.id} value={h.id}>{h.name[language]}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-[9px] text-slate-500 font-medium block">{t('destinationLabel')}</label>
                        <select
                          value={bookingDestination}
                          onChange={(e) => setBookingDestination(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-md p-1 px-1.5 text-[10px] text-slate-300 focus:outline-none"
                          id="book_destination"
                        >
                          {STUDY_HUBS_DATA.slice().reverse().map((h) => (
                            <option key={h.id} value={h.id}>{h.name[language]}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Extra Cargo Details if Goods Delivery */}
                    {bookingServiceType === 'delivery' && (
                      <div className="space-y-1">
                        <label className="text-[9px] text-slate-500 font-medium block">{t('goodsDetails')}</label>
                        <input
                          type="text"
                          value={bookingCargoDesc}
                          onChange={(e) => setBookingCargoDesc(e.target.value)}
                          placeholder="e.g. 2 bags of garments, Chat boxes"
                          className="w-full bg-slate-900 border border-slate-800 rounded-md px-2 py-1 text-xs text-slate-100"
                          id="book_cargo_desc"
                        />
                      </div>
                    )}

                    {/* Booking Response prompt */}
                    {bookingMessage && (
                      <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-md text-[10px] leading-relaxed">
                        ✓ {bookingMessage}
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-amber-500 text-slate-950 hover:bg-amber-400 font-extrabold py-1.5 px-3 rounded-lg text-xs transition cursor-pointer"
                      id="btn_book_submit"
                    >
                      🚀 {t('bookNowBtn')}
                    </button>
                  </form>

                  {/* USSD Trigger helper panel */}
                  <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-900 flex justify-between items-center">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-bold text-slate-300 block">
                        {t('offlineUSSD')}
                      </span>
                      <span className="text-[8.5px] text-slate-500 block">
                        {language === 'am' ? 'የበይነመረብ ኔትወርክ በማይኖርበት ጊዜ ማዘዣ' : 'Works offline via network towers'}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setShowUssdModal(true);
                        setUssdScreen('dial');
                      }}
                      className="bg-indigo-600/10 text-indigo-400 hover:bg-indigo-600/20 px-2 py-1.5 rounded-lg text-[9px] font-bold font-mono tracking-tight"
                      id="btn_open_ussd"
                    >
                      DIAL *6268#
                    </button>
                  </div>
                </div>
              )}


              {/* C. ACTIVE MERCHANT BULK POSTER SCREEN */}
              {role === 'merchant' && (
                <div className="flex-1 flex flex-col justify-between space-y-3" id="panel_merchant_screen">
                  
                  {/* Bulk shipment posters */}
                  <form onSubmit={handleBookOrder} className="bg-slate-950 border border-slate-805 p-3 rounded-xl space-y-2.5">
                    <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-slate-400 block border-b border-slate-900 pb-1.5">
                      {language === 'am' ? 'የነጋዴ የጅምላ እቃ መጫኛ ፎርም' : 'Kafira / Chattara Merchant Freight Posting'}
                    </span>

                    {/* Merchant Owner identifier */}
                    <div className="space-y-1">
                      <label className="text-[9px] text-slate-500 font-medium block">
                        {language === 'am' ? 'የነጋዴው ስም (ዱካን ስም)' : 'Merchant Name / Shop Label'}
                      </label>
                      <input
                        type="text"
                        required
                        value={bookingCustName}
                        onChange={(e) => setBookingCustName(e.target.value)}
                        placeholder="e.g. Camel Market Grain Store"
                        className="w-full bg-slate-900 border border-slate-800 rounded-md px-2 py-1 text-xs text-slate-100"
                        id="merchant_cust_name"
                      />
                    </div>

                    {/* Origin Hub fixed to markets usually */}
                    <div className="grid grid-cols-2 gap-1.5">
                      <div>
                        <label className="text-[9px] text-slate-500 font-medium block">
                          {language === 'am' ? 'መጫኛ ገበያ' : 'Loading Market origin'}
                        </label>
                        <select
                          value={bookingOrigin}
                          onChange={(e) => {
                            setBookingOrigin(e.target.value);
                            setBookingServiceType('delivery');
                          }}
                          className="w-full bg-slate-900 border border-slate-850 rounded-md p-1 px-1.5 text-[10px] text-slate-300"
                          id="merchant_origin"
                        >
                          <option value="chattara">ጫታራ ገበያ (Chattara)</option>
                          <option value="kafira_market">ከፊራ ገበያ (Kafira)</option>
                          <option value="ashawa">አሻዋ ገበያ (Ashawa)</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[9px] text-slate-500 font-medium block">
                          {language === 'am' ? 'መድረሻ ጣቢያ' : 'Destination station drop'}
                        </label>
                        <select
                          value={bookingDestination}
                          onChange={(e) => setBookingDestination(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-850 rounded-md p-1 px-1.5 text-[10px] text-slate-300"
                          id="merchant_destination"
                        >
                          <option value="sabian">ሰቢየን አውቶቡስ ጣቢያ</option>
                          <option value="kefira_station">ከፊራ ሚኒባስ ጣቢያ</option>
                          <option value="megala">መጋላ ትራንስፖርት ጣቢያ</option>
                        </select>
                      </div>
                    </div>

                    {/* Cargo description */}
                    <div className="space-y-1">
                      <label className="text-[9px] text-slate-500 font-medium block">
                        {language === 'am' ? 'የሚላከው እቃ ዝርዝር እና ክብደት' : 'Freight list & Weight'}
                      </label>
                      <input
                        type="text"
                        required
                        value={bookingCargoDesc}
                        onChange={(e) => {
                          setBookingCargoDesc(e.target.value);
                          setBookingServiceType('delivery'); // enforce cargo delivery
                        }}
                        placeholder="e.g. 100kg Grain, 3 boxes Tomatoes"
                        className="w-full bg-slate-900 border border-slate-800 rounded-md px-2 py-1 text-xs text-slate-100"
                        id="merchant_cargo_desc"
                      />
                    </div>

                    {/* Alert */}
                    {bookingMessage && (
                      <div className="p-2 bg-teal-500/10 text-teal-400 rounded-md text-[9px]">
                        ✓ {bookingMessage}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full bg-emerald-500 text-slate-950 font-bold py-1.5 px-3 rounded-lg text-xs transition hover:bg-emerald-400"
                      id="btn_merchant_submit"
                    >
                      📤 {language === 'am' ? 'ለአቅርቦት አሽከርካሪዎች ላክ' : 'Broad Cast to Gig Network'}
                    </button>
                  </form>

                  {/* Corporate Rates Info */}
                  <div className="bg-slate-950 border border-slate-850 p-2.5 rounded-xl text-[10px] text-slate-400">
                    <span className="font-bold text-slate-300 text-[10.5px] block mb-0.5">Corporate Rate Discount:</span>
                    {language === 'am' 
                      ? 'ማስታወሻ፡ በመጋላ እና ከፊራ ገበያዎች ለተደራጁ ነጋዴዎች ማዕከላዊ ማስተላለፊያ ማሳያ ቅናሽ በባለስልጣን ይፈቀዳል ።' 
                      : 'Active GPM members receive standard 15% discount on massive terminal postings.'}
                  </div>
                </div>
              )}

              {/* D. SUPER ADMIN / APPLICATION OWNER DASHBOARD SCREEN (🔑 Accessed via 0915167750) */}
              {role === 'owner' && (
                <div className="flex-1 flex flex-col justify-between space-y-2 text-left" id="panel_owner_screen">
                  
                  {/* Strategic Identity Badge */}
                  <div className="bg-slate-950 border border-slate-800 p-2 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1.5">
                        <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                        <span className="text-[10px] font-sans font-bold text-slate-200">
                          {language === 'am' ? 'ማስተባበሪያ ቦርድ' : 'Owner Control Room'}
                        </span>
                      </div>
                      <span className="text-[8px] bg-amber-500/10 text-amber-400 px-1 py-0.5 rounded font-mono font-bold">
                        ayubabdalla620@gmail.com
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-[8px] text-slate-500 font-mono mt-1 pt-1 border-t border-slate-900 leading-tight">
                      <div>👤 {language === 'am' ? 'ባለቤት' : 'Owner'}: Mr. Ayub Abdela</div>
                      <div className="text-right">📱 0915167750</div>
                      <div>🛠️ {language === 'am' ? 'ስራ አስኪያጅ' : 'Manager'}: Mr. Elias Abdela</div>
                      <div className="text-right">📱 0940887021</div>
                    </div>
                  </div>

                  {/* Owner Inner Navigation Tabs */}
                  <div className="grid grid-cols-4 gap-1 bg-slate-950 p-1 rounded-lg border border-slate-900">
                    {[
                      { id: 'analytics', label: language === 'am' ? 'ከተማ ሪፖርት' : 'Stats' },
                      { id: 'drivers', label: language === 'am' ? 'ባለሙያ' : 'Drivers' },
                      { id: 'broadcast', label: language === 'am' ? 'አዋጅ' : 'Push' },
                      { id: 'inbox', label: 'Inbox' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setOwnerActiveTab(tab.id as any)}
                        className={`py-1 text-[9px] rounded font-sans transition-all text-center ${
                          ownerActiveTab === tab.id
                            ? 'bg-amber-500 text-slate-950 font-bold'
                            : 'bg-transparent text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* TAB 1: ANALYTICS & STATS SUMMARY */}
                  {ownerActiveTab === 'analytics' && (
                    <div className="space-y-2 flex-1 scrollbar-none" id="owner_tab_analytics">
                      {/* Interactive Metrics Grid */}
                      <div className="grid grid-cols-2 gap-1.5">
                        <div className="bg-slate-950 border border-slate-850 p-2 rounded-lg text-left">
                          <span className="text-[8px] text-slate-500 block uppercase leading-none mb-1">Approved Gigs</span>
                          <span className="text-[10px] font-bold text-amber-400 block leading-none">
                            {professionals.filter(p => p.status === 'approved').length} Verified
                          </span>
                        </div>
                        <div className="bg-slate-950 border border-slate-850 p-2 rounded-lg text-left">
                          <span className="text-[8px] text-slate-500 block uppercase leading-none mb-1">Unapproved Waitlist</span>
                          <span className="text-[10px] font-bold text-orange-400 block leading-none">
                            {professionals.filter(p => p.status === 'pending').length} Pending
                          </span>
                        </div>
                        <div className="bg-slate-950 border border-slate-850 p-2 rounded-lg text-left">
                          <span className="text-[8px] text-slate-500 block uppercase leading-none mb-1">Total System Revenue</span>
                          <span className="text-[10px] font-bold text-emerald-400 block font-mono leading-none">
                            {driverGross} ETB
                          </span>
                        </div>
                        <div className="bg-slate-950 border border-slate-850 p-2 rounded-lg text-left">
                          <span className="text-[8px] text-slate-500 block uppercase leading-none mb-1">Owner 5% Share Commission</span>
                          <span className="text-[10px] font-bold text-indigo-400 block font-mono leading-none">
                            {(Math.round(driverGross * 0.05 * 100) / 100).toFixed(2)} ETB
                          </span>
                        </div>
                      </div>

                      {/* Summary strategic presentation PDF prompt block */}
                      <div className="bg-gradient-to-r from-blue-950/20 to-amber-950/20 border border-slate-850 p-2 rounded-lg space-y-1.5 text-center">
                        <span className="text-[9px] font-sans font-bold text-slate-300 block">
                          📂 Consolidated GPM Economic Blueprint
                        </span>
                        <p className="text-[8px] text-slate-400 leading-normal">
                          Generate printable cost summaries and financial projections PDF built for Dire Dawa's economic youth drivers project.
                        </p>
                        
                        <button
                          type="button"
                          onClick={() => setShowReportModal(true)}
                          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-sans font-bold py-1 px-2 rounded text-[9px] transition flex items-center justify-center space-x-1 cursor-pointer"
                          id="btn_owner_open_pdf"
                        >
                          <span>📄 All report summary Cost PDF</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: REGISTERED PROFESSIONALS LIST */}
                  {ownerActiveTab === 'drivers' && (
                    <div className="space-y-1.5 flex-1 scrollbar-none text-left" id="owner_tab_drivers">
                      <div className="flex justify-between items-center px-1">
                        <span className="text-[8px] uppercase font-mono tracking-wider text-slate-550 block">
                          Registry Database
                        </span>
                        <span className="text-[8px] text-slate-400 block font-mono">
                          Count: {professionals.length}
                        </span>
                      </div>

                      <div className="space-y-1 overflow-y-auto max-h-[145px] pr-0.5 scrollbar-none">
                        {professionals.map((prof) => (
                          <div 
                            key={prof.id} 
                            className="bg-slate-950 p-1.5 rounded-lg border border-slate-900 flex items-center justify-between"
                            id={`owner_prof_row_${prof.id}`}
                          >
                            <div className="space-y-0.5 text-left min-w-0 flex-1 pr-1">
                              <div className="flex items-center space-x-1.5 min-w-0">
                                <span className="text-[9px] font-bold text-slate-200 truncate">{prof.name}</span>
                                <span className={`text-[7px] px-1 font-mono rounded leading-none shrink-0 ${
                                  prof.status === 'approved' 
                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                    : 'bg-orange-500/10 text-orange-400 border border-orange-500/20 animate-pulse'
                                }`}>
                                  {prof.status === 'approved' ? 'Active' : 'Pending Verification'}
                                </span>
                              </div>
                              <div className="text-[8px] text-slate-500 font-mono flex items-center space-x-1">
                                <span>📱 {prof.phone}</span>
                                <span className="text-slate-700">|</span>
                                <span className="text-amber-500">{prof.plateNumber}</span>
                              </div>
                            </div>

                            {/* Pending drivers state toggle */}
                            {prof.status === 'pending' && (
                              <button
                                type="button"
                                onClick={() => approveProfessional(prof.id)}
                                className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-[8px] font-sans font-extrabold px-1.5 py-0.5 rounded leading-none transition shrink-0 cursor-pointer"
                                id={`btn_approve_owner_${prof.id}`}
                              >
                                {language === 'am' ? 'ያጽድቁ' : 'Approve'}
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 3: BROADCAST SYSTEM */}
                  {ownerActiveTab === 'broadcast' && (
                    <div className="space-y-2 flex-1 text-left bg-slate-950 p-2 rounded-lg border border-slate-900" id="owner_tab_broadcast">
                      <span className="text-[8.5px] uppercase font-mono tracking-wider font-semibold text-slate-400 block border-b border-slate-900 pb-1">
                        {language === 'am' ? 'የአስተላላፊ ማስታወቂያ' : 'Direct Call Dispatch Alert'}
                      </span>
                      
                      <div className="space-y-1.5 pt-0.5">
                        <label className="text-[8px] text-slate-500 block leading-tight">
                          Post push alert notifications shown on simulated driver devices:
                        </label>
                        <input
                          type="text"
                          placeholder={language === 'am' ? 'ምሳሌ፡ ዛሬ በከፊራ ገበያ ከፍተኛ ጭነት አለ !' : 'e.g. Surge at Sabian Terminal'}
                          className="w-full bg-slate-900 border border-slate-800 rounded px-1.5 py-1 text-[9.5px] text-slate-100 font-sans focus:outline-none"
                          id="owner_broadcast_textarea"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              const text = (e.target as HTMLInputElement).value;
                              if (text.trim()) {
                                setActiveBroadcastNotes(prev => [text, ...prev]);
                                (e.target as HTMLInputElement).value = '';
                                // Email dispatch log
                                const broadcastEmail: SimEmail = {
                                  id: `e_abc_${Date.now()}`,
                                  subject: `Broadcast sent to all drivers`,
                                  body: `Global GPM network dispatch annotation posted by Owner:\n"${text}"\n\nNotification successfully cached to all offline hubs.`,
                                  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                                  category: 'system'
                                };
                                setOwnerEmailInbox(emails => [broadcastEmail, ...emails]);
                              }
                            }
                          }}
                        />
                        <span className="text-[7.5px] text-slate-500 block italic leading-normal">
                          ✓ Press <strong className="text-slate-300">ENTER</strong> to broadcast this message to drivers and log alerts.
                        </span>
                      </div>

                      {activeBroadcastNotes.length > 0 && (
                        <div className="bg-indigo-950/20 border border-indigo-900/30 p-1.5 rounded mt-1">
                          <span className="text-[7.5px] font-bold text-indigo-400 block uppercase">Active Call Board:</span>
                          <p className="text-[8px] text-slate-300 mt-0.5">"{activeBroadcastNotes[0]}"</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 4: EMAIL SIMULATION INBOX */}
                  {ownerActiveTab === 'inbox' && (
                    <div className="space-y-1.5 flex-1 text-left" id="owner_tab_inbox">
                      <div className="flex justify-between items-center px-1">
                        <span className="text-[8px] uppercase font-mono tracking-wider text-slate-500 block">
                          ayubabdalla620@gmail.com Inbox
                        </span>
                        <span className="text-[7.5px] text-emerald-400 block font-bold">
                          ● Online
                        </span>
                      </div>

                      <div className="space-y-1 overflow-y-auto max-h-[145px] pr-0.5 scrollbar-none">
                        {ownerEmailInbox.map((mail) => (
                          <div 
                            key={mail.id} 
                            className="bg-slate-950 p-1.5 rounded-lg border border-slate-900 space-y-0.5 text-[8px]"
                            id={`owner_mail_${mail.id}`}
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-slate-200 truncate pr-1 max-w-[140px]">
                                {mail.subject}
                              </span>
                              <span className="text-slate-500 font-mono text-[7px] flex-shrink-0">
                                {mail.time}
                              </span>
                            </div>
                            <p className="text-slate-400 leading-normal font-sans whitespace-pre-wrap">
                              {mail.body}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>
          )}
        </div>

        {/* Home key / Navigation simulation bar */}
        <div className="h-10 bg-slate-950 flex justify-center items-center shrink-0 z-40">
          <button
            onClick={() => {
              setRole('guest');
              setActiveDriverOrder(null);
            }}
            className="w-24 h-1.5 bg-slate-700 hover:bg-slate-500 rounded-full cursor-pointer"
            title="Go to locked profile select screen"
            id="phone_home_indicator_button"
          ></button>
        </div>
      </div>

      {/* USSD OFFLINE PHONE OVERLAY MODAL */}
      {showUssdModal && (
        <div className="fixed inset-0 bg-slate-950/80 flex items-center justify-center p-4 z-50 animate-fade-in" id="ussd_modal_backdrop">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full overflow-hidden shadow-2xl relative">
            <div className="bg-slate-950 p-3 flex justify-between items-center text-xs text-slate-400 font-mono border-b border-slate-850">
              <span className="text-amber-500">GSM USSD Gateway Simulator</span>
              <button
                onClick={() => setShowUssdModal(false)}
                className="text-slate-400 hover:text-white"
                id="btn_close_ussd_modal"
              >
                ✕
              </button>
            </div>

            <div className="p-5 font-mono text-xs text-green-400 bg-slate-950 min-h-[180px] flex flex-col justify-between">
              
              {/* Dial Menu State */}
              {ussdScreen === 'dial' && (
                <form onSubmit={handleUssdSubmit} className="space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-slate-400 text-[10px] leading-relaxed mb-3">
                      {language === 'am' 
                        ? 'ከመስመር ውጭ በስልክ ኮድ ለማዘዝ ኮዱን ይደውሉ፡' 
                        : 'Simulate dialling the offline GPM short code:'}
                    </p>
                    <input
                      type="text"
                      value={ussdDialInput}
                      onChange={(e) => setUssdDialInput(e.target.value)}
                      className="w-full bg-slate-900 font-bold tracking-wider text-center py-2 rounded text-sm text-white border border-slate-800"
                      id="ussd_dial_input"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white font-bold py-2 rounded text-xs tracking-wide"
                    id="btn_ussd_dial_submit"
                  >
                    SEND QUERY
                  </button>
                </form>
              )}

              {/* Main Selection Menu State */}
              {ussdScreen === 'menu' && (
                <div className="space-y-3">
                  <p className="text-white font-bold text-[10.5px]">DIRE GPM COOP SERVICES:</p>
                  <p>1. Call a Tuk-Tuk / Bajaj Ride</p>
                  <p>2. Request Goods Freight Delivery</p>
                  <p>3. Join GPM Network (As Driver)</p>
                  <p>4. Emergency Contact Station</p>

                  <div className="pt-3 border-t border-slate-900 flex gap-2">
                    <button
                      onClick={() => handleUssdBook('ride')}
                      className="flex-1 bg-slate-900 hover:bg-slate-800 text-[10px] text-indigo-400 font-bold py-1 rounded"
                      id="ussd_book_ride_btn"
                    >
                      [SELECT Option 1]
                    </button>
                    <button
                      onClick={() => handleUssdBook('delivery')}
                      className="flex-1 bg-slate-900 hover:bg-slate-800 text-[10px] text-amber-500 font-bold py-1 rounded"
                      id="ussd_book_delivery_btn"
                    >
                      [SELECT Option 2]
                    </button>
                  </div>
                </div>
              )}

              {/* Confirmation / Success Screen */}
              {ussdScreen === 'success' && (
                <div className="text-center py-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <CheckCircle className="mx-auto text-emerald-400" size={32} />
                    <p className="font-bold text-white text-xs">USSD ORDER POSTED! OK</p>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-normal">
                    {language === 'am' 
                      ? 'ባጃጅ ከተማ ማእከል (መጋላ ጣቢያ) በተሳካ ሁኔታ ተመዝግቧል ። አቅራቢያ የሚገኝ አሽከርካሪ ወዲያውኑ ይደውልልዎታል ።'
                      : 'Your offline order has been broad-casted over local GSM networks. Assigned driver will phone your line.'}
                  </p>
                  <button
                    onClick={() => setShowUssdModal(false)}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-1.5 rounded text-[10px]"
                    id="btn_ussd_success_dismiss"
                  >
                    DISMISS SCREEN
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* PROFESSIONAL FINANCIAL PROSPECTUS SUMMARY MODAL (PDF Simulator) */}
      {showReportModal && (
        <div className="fixed inset-0 bg-slate-950/90 flex items-center justify-center p-3 z-50 overflow-y-auto" id="report_pdf_modal">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[92vh]">
            
            {/* Header */}
            <div className="bg-slate-950 p-3.5 flex justify-between items-center border-b border-slate-800 shrink-0">
              <div className="space-y-0.5 text-left">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-tight">Dire Dawa Youth Economic GPM Proposal Report</h3>
                <span className="text-[9px] text-slate-400 font-mono font-light block">Authoritative Project Analysis Model & Financial Projections</span>
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-2.5 py-1 rounded text-xs transition-colors font-semibold"
                id="btn_close_pdf_modal"
              >
                ✕ Close
              </button>
            </div>

            {/* Document Content (Scrollable printable format) */}
            <div className="p-6 overflow-y-auto space-y-5 text-slate-900 bg-white leading-relaxed font-sans" id="printed_pdf_prospectus">
              
              {/* Report Header Logo */}
              <div className="border-b-2 border-amber-500 pb-3 flex justify-between items-start text-left">
                <div className="max-w-[70%]">
                  <h1 className="text-lg font-black text-slate-900 tracking-tight leading-snug">ድሬዳዋ ዲጂታል ጊግ ኢኮኖሚ የንግድ ሥራ ፕሮፖዛል</h1>
                  <p className="text-[10px] text-amber-800 font-semibold tracking-wide uppercase mt-0.5">Dire Dawa Youth Gig Professional Marketplace (GPM)</p>
                  <p className="text-[9px] text-slate-500 font-mono">Model Blueprint Configuration & Revenue Forecasts</p>
                </div>
                <div className="text-right text-[8.5px] text-slate-500 font-mono space-y-0.5 leading-tight">
                  <div>DATE: June 2026</div>
                  <div>VERSION: v2.4 (Strategic Release)</div>
                  <div>OFFICIAL REPORT #DD-GPM-2026</div>
                </div>
              </div>

              {/* Identity & Strategic Ownership Block */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded-lg border border-slate-200 text-left text-xs">
                <div>
                  <h4 className="font-bold text-amber-850 uppercase text-[9px] tracking-wide mb-1">PROPOSAL SPONSOR / OWNER:</h4>
                  <div className="font-semibold text-slate-900 text-[11.5px]">Mr. Ayub Abdela</div>
                  <div className="text-slate-600 font-mono text-[10px]">📱 Phone: 0915167750</div>
                  <div className="text-slate-600 font-mono text-[10px]">📬 Email: ayubabdalla620@gmail.com</div>
                </div>
                <div>
                  <h4 className="font-bold text-amber-850 uppercase text-[9px] tracking-wide mb-1">STRATEGIC OPERATIONS MANAGER:</h4>
                  <div className="font-semibold text-slate-900 text-[11.5px]">Mr. Elias Abdela</div>
                  <div className="text-slate-600 font-mono text-[10px]">📱 Phone: 0940887021</div>
                  <div className="text-slate-600 font-mono text-[10px]">📍 Region: Dire Dawa GPM Administration Hub</div>
                </div>
              </div>

              {/* Economic Summary */}
              <div className="space-y-1.5 text-left">
                <h3 className="text-xs font-bold text-slate-950 uppercase border-b border-slate-200 pb-1 flex items-center">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-1.5"></span>
                  1. የፕሮጀክቱ ዳራ እና የማህበራዊና ኢኮኖሚያዊ እውነታዎች ትንተና
                </h3>
                <p className="text-[10px] text-slate-700 leading-normal">
                  በድሬዳዋ ከተማ አስተዳደር ውስጥ ከፍተኛ ቁጥር ያለውን የከተማውን ወጣት የስራ አጥነት ችግር በተግባር ለመፍታት የተቀረጸ የቴክኖሎጂና መደበኛ የድልድይ ስርቆት አልጎሪዝም ፕሮጀکٹ ነው ። ይህ ጥናት <strong>100 የባጃጅ (Bajaj)</strong> አሽከርካሪዎች እና <strong>50 የዕቃዎች ማድረሻ (Delivery drivers)</strong> ባለሙያዎችን በድሬዳዋ በጋራ በማስተባበር በሚፈጠረው የኮሚሽን ገቢ ላይ የተመሰረተ ነው ።
                </p>
              </div>

              {/* Model Projections Variables */}
              <div className="space-y-1.5 text-left">
                <h3 className="text-xs font-bold text-slate-950 uppercase border-b border-slate-200 pb-1 flex items-center">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-1.5"></span>
                  2. የገቢዎች ትንበያ እና ፊዚቢሊቲ ጥናት (Financial Projections)
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="border border-slate-200 p-2 rounded bg-slate-50">
                    <span className="text-[9px] text-slate-500 block leading-none mb-0.5">ባለሙያ አሽከርካሪዎች ብዛት</span>
                    <strong className="text-[11px] text-slate-900 block font-semibold">100 የባጃጅ + 50 እቃ አቅራቢዎች</strong>
                  </div>
                  <div className="border border-slate-200 p-2 rounded bg-slate-50">
                    <span className="text-[9px] text-slate-500 block leading-none mb-0.5">የአንድ የማህበር አባል ወርሃዊ ክፍያ</span>
                    <strong className="text-[11px] text-slate-900 block font-semibold">300/400 ETB ወርሃዊ ክፍያ ኮታ</strong>
                  </div>
                </div>

                {/* Main Tables */}
                <table className="w-full text-left text-[9px] border-collapse mt-2">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-300 text-slate-750 font-bold">
                      <th className="p-1 px-2">እቃ / አገልግሎት ክፍል</th>
                      <th className="p-1 text-center">መጠን (Drivers)</th>
                      <th className="p-1 text-right">የወረሃዊ ኮሚሽን ክፍያ</th>
                      <th className="p-1 text-right">አጠቃላይ ገቢ (Monthly ETB)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-200 text-slate-800">
                      <td className="p-1.5 px-2 font-medium">1. የባጃጅ አሽከርካሪዎች ባለሙያ ስብስብ (Bajaj Class)</td>
                      <td className="p-1.5 text-center font-mono">100</td>
                      <td className="p-1.5 text-right font-mono">300 ETB</td>
                      <td className="p-1.5 text-right font-mono font-bold text-slate-900">30,000.00 ETB</td>
                    </tr>
                    <tr className="border-b border-slate-200 text-slate-800">
                      <td className="p-1.5 px-2 font-medium">2. የጭነትና እቃዎች አቅራቢያ ባለሙያዎች (Delivery Class)</td>
                      <td className="p-1.5 text-center font-mono">50</td>
                      <td className="p-1.5 text-right font-mono">400 ETB</td>
                      <td className="p-1.5 text-right font-mono font-bold text-slate-900">20,000.00 ETB</td>
                    </tr>
                    <tr className="bg-slate-50 text-slate-900 font-bold border-t border-slate-350">
                      <td className="p-2" colSpan={3}>አጠቃላይ ወርሃዊ የተጣራ የባለቤት ገቢ (Projected Monthly GPM Income)</td>
                      <td className="p-2 text-right font-mono text-[11px] text-amber-800">50,000.00 ETB</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Payback period and ROI Analysis */}
              <div className="space-y-1.5 text-left">
                <h3 className="text-xs font-bold text-slate-950 uppercase border-b border-slate-200 pb-1 flex items-center">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-1.5"></span>
                  3. የመልሶ ማገገሚያ ጊዜ እና የROI ቀመር
                </h3>
                <p className="text-[10px] text-slate-700 leading-normal">
                  አጠቃላይ ለዚህ ሲስተም እና ስልጠና ልማት የሚወጣው የመጀመሪያ መዋዕለ ንዋይ (Initial Capital Cost) የተገመተው <strong>450,000 ETB</strong> ሲሆን፣ በአቶ አዩብ አብድላ የሚመራው ማስተባበሪያ ይሄን ወጪ ሙሉ በሙሉ የሚመልስበት ጊዜ (Estimated Payback Period) <strong>9.0 ወራት (Months)</strong> ብቻ ነው ።
                </p>
              </div>

              {/* Signatures */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200 text-xs mt-3 text-left">
                <div className="space-y-3">
                  <span className="text-[8px] uppercase tracking-wider text-slate-400 block font-bold">የፕሮጀክቱ ባለቤት (Applet Sponsor)</span>
                  <div className="space-y-0.5">
                    <div className="font-mono text-slate-300 text-[10px] leading-tight">Signed via OTP Authentication</div>
                    <div className="font-bold text-slate-900 text-[11px]">አቶ አዩብ አብድላ</div>
                    <div className="text-[8.5px] text-slate-500 font-mono">Senior GPM Project Owner</div>
                  </div>
                </div>
                <div className="space-y-3 text-right">
                  <span className="text-[8px] uppercase tracking-wider text-slate-400 block font-bold">የስራዎች ስራ አስኪያጅ (Operations Director)</span>
                  <div className="space-y-0.5">
                    <div className="font-mono text-slate-300 text-[10px] leading-tight flex justify-end">Signed via App Token Security</div>
                    <div className="font-bold text-slate-900 text-[11px]">አቶ ኤልያስ አብድላ</div>
                    <div className="text-[8.5px] text-slate-500 font-mono">Operational & Dispatch Team Lead</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Printable Controls Footer */}
            <div className="bg-slate-950 p-4 flex justify-between items-center border-t border-slate-800 shrink-0">
              <span className="text-[8.5px] text-slate-500 font-mono">
                💡 Printer Settings: Use "Save as PDF" to save or print this strategic blueprint securely.
              </span>
              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1 cursor-pointer"
                id="btn_launch_native_printer"
              >
                <span>🖨️ PDF አውርድ / Print Report</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Simulator Guidance instructions sheet */}
      <div className="max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4" id="simulator_guidelines_sheet">
        <div className="flex items-center space-x-2 text-amber-500">
          <Laptop size={18} />
          <h3 className="font-sans font-bold text-slate-100 text-md">
            {language === 'am' ? 'የሲሙሌተር መሞከሪያ መመሪያ' : 'App Simulator Guidelines'}
          </h3>
        </div>

        <div className="space-y-3 text-xs text-slate-300 leading-relaxed font-sans">
          <p>
            {language === 'am'
              ? 'ይህ የስልክ መተግበሪያ ማሳያ በድሬዳዋ ከተማ ለወጣቶች የታቀደውን "ድሬ ባጃጅና እቃ ማገናኝ" መተግበሪያ ቴክኖሎጂ አሰራርን የሚያሳይ ነው ።'
              : 'This smartphone simulator runs the proposed "Dire Bajaj & Goods Connector" app structure directly in your web browser.'}
          </p>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1.5">
            <span className="font-semibold text-amber-400 block">{language === 'am' ? 'ለመደሰት እነዚህን ደረጃዎች ይከተሉ፡' : 'How to test:'}</span>
            <ul className="list-decimal list-inside space-y-1 pl-1 text-[11px] text-slate-400">
              <li>
                {language === 'am' ? 'የመግቢያ ፓስወርዱን ' : 'Use the security pin '}
                <strong className="text-white font-mono">12345ayub</strong>
                {language === 'am' ? ' በመጠቀም ወደ "ተሳፋሪ/ደንበኛ" ወይም "ነጋዴ" በመግባት የጉዞ/የእቃ ማድረሻ ጥያቄ ያስገቡ ።' : ' to log into "Rider/Customer" or "Merchant" profile & submit a ride request.'}
              </li>
              <li>
                {language === 'am' ? 'ከዚያም በመውጣት በድጋሚ በፓስወርዱ ወደ "ባለሙያ/አሽከርካሪ" ሚና ይግቡ ።' : 'Log out of the phone, and re-login using the same pin as a "Driver".'}
              </li>
              <li>
                {language === 'am' ? 'እዚያም ቅድም ያዘዙትን ትዕዛዝ ያያሉ! "ትዕዛዝ ተቀበል" የሚለውን በመጫንና በመጨረስ ኮሚஷኑ በ5% ሲሰላ ማየት ይችላሉ ።' : 'You will see your own order live in the nearby queue! Accept and Complete it to watch the 5% commission calculation run in real-time.'}
              </li>
              <li>
                {language === 'am' ? 'በተጨማሪ አደጋ ጊዜ ጥሪ (SOS) እና የበይነመረብ ከመስመር ውጭ USSD ማዘዙን እንዲሞክሩ ይመከራል ።' : 'Dial *6268# to test network-free dispatch scenarios.'}
              </li>
            </ul>
          </div>

          <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-500 italic">
            {language === 'am'
              ? 'ለማዕከሉ አብሳሪ የሆኑት Mr. Ayub Abdela እና Mr. Elias Abdela ባቀረቡት ጥናት መሰረት ከአሽከርካሪው ገቢ 5% የሚቀነሰው ኮሚሽን ማዕከሉ ለወጣቶች የቁጠባና ጤና መድን እንዲያቀርብ ዋስትና ይሆናል ።'
              : 'Constructed strictly to visually prototype GPM economic models presented by managers Mr. Ayub Abdela & Mr. Elias Abdela.'}
          </div>
        </div>
      </div>

    </div>
  );
};
