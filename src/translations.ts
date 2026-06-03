import { LanguageCode, Hub } from './types';

export const TRANSLATIONS: Record<string, Record<LanguageCode, string>> = {
  // Navigation & General UI
  appName: {
    am: 'ድሬ ባጃጅና እቃ ማገናኝ የጊግ ማዕከል',
    om: 'Kuula Diijitaalaa Gig Diree',
    so: 'Suuqa Dijitaalka ah ee Dire Gig',
    en: 'Dire Bajaj & Goods Gig economy portal'
  },
  tagline: {
    am: 'በድሬዳዋ ከተማ የዲጂታል ጊግ ኢኮኖሚን በመጠቀም ለወጣቶች ስራ እድል ፈጠራ የጥናት ፕሮፖዛል እና ሲሙሌተር',
    om: 'Propozaalii fi Simuleetara carraa hojii dargaggootaaf teeknoolojii uumuuf qophaa’e',
    so: 'Dasaarada Nabada iyo Shaqo abuurka dhalinyarada ee Dire Dawa',
    en: 'Digital Gig Economy Business Proposal & App Simulator for Youth Job Creation in Dire Dawa'
  },
  proposalTab: {
    am: 'የጥናት ፕሮፖዛል',
    om: 'Propozaalii Qorannoo',
    so: 'Dasaarada Cilmibaadhista',
    en: 'Business Proposal Study'
  },
  simulatorTab: {
    am: 'ድሬ ባጃጅና እቃ ማገናኝ አፕሊኬሽን',
    om: 'Appilikeeshinii Diree Bajaj',
    so: 'Codsiga "Dire Bajaj & Goods"',
    en: 'Dire Bajaj & Goods App Simulator'
  },
  managersLabel: {
    am: 'የማዕከሉ አስተባባሪዎች (ማናጀር)',
    om: 'Hogganoota Giddugalaa',
    so: 'Maareeyayaasha Xarunta',
    en: 'Marketplace Managers'
  },
  managerNames: {
    am: 'አቶ አዩብ አብድላ (📱 0915167750) እና አቶ ኤልያስ አብደላ (📱 0940887021)',
    om: 'Obbo Ayuub Abdallaa (📱 0915167750) fi Obbo Eliyaas Abdallaa (📱 0940887021)',
    so: 'Mr. Ayub Abdela (📱 0915167750) iyo Mr. Elias Abdela (📱 0940887021)',
    en: 'Owner Mr. Ayub Abdela (📱 0915167750) & Manager Mr. Elias Abdela (📱 0940887021)'
  },
  passwordInfo: {
    am: 'ይፋዊ መተግበሪያ መግቢያ ፓስወርድ፡ 12345ayub',
    om: 'Jecha iccitii seensa appilikeeshinii: 12345ayub',
    so: 'Fure-sirka codsiga: 12345ayub',
    en: 'Simulation Access Password: 12345ayub'
  },
  readTime: {
    am: '6 ደቂቃ ንባብ',
    om: 'Dubbisa Daqiiqaa 6',
    so: 'Akhriska 6 Daqiiqo',
    en: '6 min read'
  },
  financialCalculator: {
    am: 'ኢንተረአክቲቭ የፋይናንስ ካልኩሌተር',
    om: 'Hergegga Filaanshoo Herregaa',
    so: 'Xisaabiyaha Is-dheg galka ah',
    en: 'Interactive Financial Estimator'
  },

  // Proposal Section Titles
  secBackground: {
    am: '፩. የፕሮጀክቱ ዳራ እና የኢኮኖሚ እውነታዎች',
    om: '1. Seenaa fi Haala haዋሳ-diinagdee',
    so: '1. Hordhaca iyo Xaqiiqooyinka Dhaqaale',
    en: '1. Project Background & Socio-Economic Realities'
  },
  secModel: {
    am: '፪. የንግድ ሞዴሉ እና የጊግ ባለሙያዎች ማዕከል (GPM)',
    om: '2. Modeela Dalala fi Giddugala Waaltina Gig (GPM)',
    so: '2. Qaab-dhismeedka Ganacsiga iyo Suuqa GPM',
    en: '2. Business Model & Gig Professional Marketplace (GPM)'
  },
  secApps: {
    am: '፫. በከተማዋ በስራ ላይ ያሉ የዲጂታል መተግበሪያዎች ምርመራ',
    om: '3. Xiinxala Appilikeeshinoota Diijitaalaa Dire Dawaa',
    so: '3. Qiimaynta Codsiyada Dijital ah ee Dire Dawa',
    en: '3. Landmark Digital Applications Analysis'
  },
  secHubs: {
    am: '፬. የገበያ አቀማመጥ እና የከተማዋ እንቅስቃሴ ማዕከላት',
    om: '4. Waltajjii Gabaa fi Walitti hidhamiinsa Iddoowwan Socho’insaa',
    so: '4. Deegaanka Suuqa iyo Isku-xidhka Xarumaha Magaalada',
    en: '4. Market Positioning & City Movement Hubs'
  },
  secLegal: {
    am: '፭. የህግ ማዕቀፍ እና የንግድ ስራ ምዝገባ ሂደቶች',
    om: '5. Seera fi Adeemsa Galmee Daldalaa',
    so: '5. Shuruucda iyo Nidaamka Diiwaangelinta',
    en: '5. Legal Framework & Business Registration'
  },
  secFinancials: {
    am: '፮. የፋይናንስ እቅድ፣ መነሻ ካፒታል እና ትርፋማነት',
    om: '6. Karoora Maallaqa, Kaappitaala fi Pirojekshinii',
    so: '6. Qorshaha Maaliyadda, Raasumaalka iyo Saadaasha',
    en: '6. Financial Plan, Capital & Profitability Projection'
  },
  secRisks: {
    am: '፯. የስጋት ትንተና እና መከላከያ ስልቶች',
    om: '7. Xiinxala Sodaa fi Toftaa ittisaa',
    so: '7. Qiimaynta Khataraha iyo Tabaha Ka hortagga',
    en: '7. Risk Analysis & Management Strategies'
  },
  secRecs: {
    am: '፰. ማጠቃለያ እና ስልታዊ የውሳኔ ምክረ-ሀሳቦች',
    om: '8. Goolabaa fi Yaada Furmaata Toftaa',
    so: '8. Gabagabo iyo Talooyinka Istiraatiijiga ah',
    en: '8. Conclusion & Strategic Recommendations'
  },

  // Proposal Content Paragraphs
  bgPara1: {
    am: 'በኢትዮጵያ ፈጣን የህዝብ ቁጥር እድገት ጋር ተያይዞ በየዓመቱ ከሁለት እስከ ሶስት ሚሊዮን የሚጠጉ አዲስ ወጣቶች ወደ ስራ ገበያው የሚቀላቀሉ ሲሆን፣ አገሪቱ ይህንን ሰፊ የሰው ኃይል የሚያስተናግድ በቂ መደበኛ የስራ እድል መፍጠር ባለመቻሏ ከፍተኛ የማህበራዊና ኢኮኖሚያዊ ፈተናዎች ተደቅነዋል ። እንደ አውሮፓውያኑ አቆጣጠር በ2021 በተደረገው የኢትዮጵያ ስታቲስቲክስ አገልግሎት ሪፖርት መሰረት በከተሞች ውስጥ ያለው የስራ አጥነት መጠን 17.9% የደረሰ ሲሆን፣ ይህ አኃዝ በወጣቱ የዕድሜ ክልል (ከ15-29) ውስጥ እስከ 23.1% ከፍ ብሎ ይታያል ።',
    om: 'Itiyoophiyaa keessatti guddinna uummataa saffisaa ta’een walqabatee waggaatti dargaggoonni miliyoona 2 hanga 3 ta’an gara gabaa hojiitti kan makaman yoo ta’u, biyyattiin humna namaa bal’aa kana simachuu dandeessu uumuu dhabuun ishee rakkoo haዋሳ-diinagdee guddaa uumeera. Gabaasa tajaajila Staatistiksii Itiyoophiyaa bara 2021 akka agarsiisutti, magaala keessatti hamma hoji dhabdummaa 17.9% yoo ta’u, kun dargaggoota biratti (15-29) hanga 23.1% ni eega.',
    so: 'Itoobiya gudaheeda dhalinyaro gaadhaysa 2 ilaa 3 milyan oo hor leh ayaa sanad kasta ku soo biira suuqa shaqada. Sida ku cad warbixinta Adeega Sharciga Itoobiya ee 2021, heerka shaqo la’aanta magaalooyinka waa 17.9%, taas oo dhalinyarada u dhaxaysa (15-29) ay gaadhayso 23.1%, taas oo keentay caqabado adag oo dhanka bulshada iyo dhaqaalaha ah.',
    en: 'With Ethiopias rapid population growth, approximately 2 to 3 million youth enter the labor market annually. Due to insufficient formal employment, major socio-economic challenges persist. According to the 2021 Central Statistical Agency report, urban unemployment stands at 17.9%, climbing to 23.1% among the youth bracket (ages 15-29).'
  },
  bgPara2: {
    am: 'የድሬዳዋ ከተማ አስተዳደር ከብሔራዊ አማካይ በላይ የሆነ የስራ አጥነት መጠን የሚመዘገብበት ዋነኛ የከተማ መዋቅር ሲሆን፣ በተለይም በሴቶች ላይ የሚታየው ስራ አጥነት እስከ 30% በመድረስ ከፍተኛውን ድርሻ ይይዛል ። ከተማዋን በወረዳና በሰፈር ደረጃ በምናይበት ወቅትም እንደ መልካ ጀብዱ (Melka Jebdu) እና ገደንሰር (Gedenser) ባሉ አካባቢዎች የወጣቶች ስራ አጥነት በቅደም ተከተል 12.87% እና 20.34% ሆኖ ተመዝግቧል ። የዚህ ፈተና ዋነኛ መንስኤዎች የክህሎት ማነስ፣ የግብይት መረጃ እጥረት እና የመነሻ ካፒታል እጥረት ናቸው ።',
    om: 'Bulchiinsi Magaalaa Diree Dawaa hoji dhabdummaa carraa ol’aanaa kan qabu yoo ta’u, ija dubartootaan hoji dhabdummaan hanga 30% ni gaha. Naannoo ganda akka Melka Jebdu (12.87%) fi Gedenser (20.34%) keessatti rakkoon kun baay’ee ol’aanaadha. Hoji uumuuf yoo xiqqaate 61.4% dargaggoota kaappitaala uumamuu dhabuun akka rakkisaatti eeru. Teeknoolojiin Diijitaalaa fi Gig Economy immoo qabeenya muraasaan (akka moobayilaa peetrolii) carraa hojii uumuu danda’u.',
    so: 'Maamulka Magaalada Diridhabe ayaa ah mid ka mid ah magaalooyinka uu u sareeyo heerka shaqo la’aantu, isaga oo dhalinyarada gaar ahaan haweenka gaadhaya ilaa 30%. Degmooyinka sida Melka Jebdu (12.87%) iyo Gedenser (20.34%) ayay shaqo la’aantu aad u saraysaa. 61.4% dhalinyarada shaqo abuurka raba ayaa ku tilmaamay caqabada koowaad inay tahay la’aanta raasumaal. Tiknoolajiyada iyo dhaqaalaha loo yaqaan Gig ayaa bixinaya xal cusub.',
    en: 'Dire Dawa City Administration records unemployment rates significantly higher than the national average, with female unemployment peaking near 30%. At the local administrative levels, districts like Melka Jebdu and Gedenser record youth unemployment of 12.87% and 20.34% respectively. Capital scarcity is cited by 61.4% of aspiring entrepreneurs as their primary bottleneck, rendering digital gig platforms extremely prospective.'
  },
  modelPara1: {
    am: 'ይህ የቢዝነስ ፕሮፖዛል የሚመራው በግለሰብ ደረጃ ለብቻው ከመንቀሳቀስ ይልቅ ወጣቶችን በጋራ በማደራጀት የጊግ ባለሙያዎች ማዕከል (Gig Professional Marketplace - GPM) በመመስረት ላይ ነው ። የዚህ ሞዴል ዋነኛ መነሻ የማስተርካርድ ፋውንዴሽን (Mastercard Foundation) ከገበያ (Gebeya Inc.) ጋር በመተባበር የጀመረው እና በመላው አገሪቱ አንድ ሚሊዮን ወጣቶችን ወደ ስራ ለማስገባት ያለመው የ"መሰረት" (Mesirat) ፕሮጀክት ስኬታማ ተሞክሮ ነው ። ይህ የንግድ ሞዴል በድሬዳዋ ከተማ ውስጥ በሚንቀሳቀሱ ነባር የዲጂታል መተግበሪያዎች እና በስራ ፈላጊ ወጣቶች መካከል እንደ ድልድይ ሆኖ ያገለግላል ።',
    om: 'Modeelli daldalaa kun dhuunfaan deemuu mannaa dargaggoota waliin gurmeessuun "Gig Professional Marketplace (GPM)" uumuu irratti xiyyeeffata. Kunis pirojekti "Mesirat" kan Mastercard Foundation fi Gebeya Inc. waliin ta’anii dargaggoota miliyoona tokko gara hojiitti galchuuf hojjetan irra fudhatama. Maዕkalli kun bilbila fi meeshaa geejjiba (Bajaj) dhiyeessuun, odeeffannoo isaan dandeessisu uuma.',
    so: 'Qaabkan ganacsi wuxuu ku dhisanyahay in dhalinyarada la isugu geeyo xarun weyn oo loo yaqaan Suuqa Gig Professional (GPM) halkii ay kali kali u shaqayn lahaayeen. Tani waxay dhiiri galin ka helaysaa barnaamijka "Mesirat" ee ay iska kaashadeen Mastercard Foundation iyo Gebeya Inc ee loogu talagalay 1 milyan oo dhalinyaro ah. GPM wuxuu buundo u noqon doonaa dhalinyarada iyo shaqooyinka dijital ah.',
    en: 'Rather than individual freelancing, this business model leverages a consolidated Gig Professional Marketplace (GPM). Heavily inspired by the successful "Mesirat" program (co-created by Mastercard Foundation and Gebeya Inc. to place 1 million youth into modern jobs), this model acts as a physical-digital bridge to recruit, train, and support youth on popular local digital platforms.'
  },
  modelPara2: {
    am: 'ይህ ድርጅት በህጋዊ መንገድ የተደራጀ የግል ማህበር (PLC) ወይም የወጣቶች ህብረት ስራ ማህበር በመሆን ይመሰረታል ። የድርጅቱ ዋነኛ ተግባር በተለያዩ መተግበሪያዎች ላይ ተመዝግበው መስራት የሚችሉ ወጣቶችን መመልመል፣ ተገቢውን የስራ ስነ-ምግባር እና የቴክኖሎጂ አጠቃቀም ስልጠና መስጠት፣ እና ለአገልግሎት የሚሆኑ ቁሳቁሶችን (እንደ ስማርትፎኖች፣ የሞተር ብስክሌቶች ወይም ባጃጆችን) በኪራይ ወይም በግዢ በማመቻቸት ከተጠቀሱት የዲጂታል መድረኮች ጋር ማስተሳሰር ነው ።',
    om: 'Dhaabbanni kun PLC ykn Waldaa Hojii Gamtaa dargaggootaa ta’ee gurmaa’a. Hojjiin isaas dargaggoota leenjisuu, bilbila, mishiina ykn Bajaj isaan kiraan ykn bittaadhaan gargaaruun appilikeeshinoota argaman waliin walitti fiduudha. Kunis wabii hojii gahaa fi kaffaltii fooyya’aa akka argatan taasisa.',
    so: 'Shirkadan waxay u diiwaangashantahay sidii Shirkad Xaddidan (PLC) ama Iskaashato Dhalinyaro. Howsha guud waa qorista dhalinyarada, tababarida anshaxa shaqada, qalabaynta (sida taleefannada, mootooyinka, iyo bajaajta) iyada oo la kireynayo ama la siinayo habka amaah-iibsiga si ay ugu xidhmaan goobaha shaqada.',
    en: 'Establishing itself as either a Private Limited Company (PLC) or a Youth Cooperative, the GPM assumes responsibility for training youth in professional standards, digital navigation and safe operations. Crucially, the cooperative structures financing loops to lease out essential assets like smartphones, motorbikes, or Tuk-tuks.'
  },
  hubsDesc: {
    am: 'የማስትሬት እቅዱ ከተማዋን በስልታዊ መነሻዎች ያገናኛል ። ሰቢየን አውቶቡስ ጣቢያ፣ ከፊራ ጣቢያ እና መጋላ ትራንስፖርት ጣቢያ የአሽከርካሪዎች መረብ በ5-10 ደቂቃ ፍጥነት ለመድረስ የሚያስችሉ ናቸው ። እንደ ጫታራ ፣ ከፊራ ፣ አሻዋ እና የግመል ገበያዎች በብሉ ዴሊቨሪ በኩል የሚመራ ሰፊ የማድረስ ስራ ይፈጥራሉ ።',
    om: 'Karoorri kun iddoowwan akka buufata geejjiba Sabian, Kefira fi Megala walitti hidha (Daqiiqaa 5-10 keessatti tajaajiluuf). Gabaawwan gurguddoo akka Cattaraa, Kafiiraa, Ashaawaa fi Gabaa Gaalaa keessattis geessitootni "Blu Delivery" fayyadamuun daldala bal’isu.',
    so: 'Qorshahan wuxuu isku xidhayaa xarumaha gaadiidka ee Sabian, Kefira iyo Megala si adeega loo gaadhsiiyo 5-10 daqiiqo gudahood. Suuqyada waaweyn ee Chattara, Kafira, Ashawa iyo Suuqa Awrta waxay u oggolaanayaan dirista badeecadaha iyada oo la isticmaalayo "Blu Delivery".',
    en: 'The operational masterplan aligns drivers around highly congested transit terminals (Sabian Bus Station, Kefira Station, Megala Transport Station) to ensure 5-to-10 minute pickup response windows. Concurrently, bustling markets (Chattara, Kafira, Ashawa, and the Camel Market) supply constant booking opportunities for cargo delivery via Blu Delivery.'
  },
  legalSectionText: {
    am: 'በኢትዮጵያ ህጋዊ ሰውነት ለማግኘት፡- ፩) ስም ማስያዝ (ድሬዳዋ ንግድ ቢሮ)፤ ፪) መመስረቻ ፅሁፍ እና መተዳደሪያ ደንብ (DARA) ምዝገባ፤ ፫) የግብር ከፋይ ቁጥር (TIN) በገቢዎች ባለስልጣን፤ ፬) የንግድ ምዝገባና ስራ ፈቃድ መውሰድ ። በመጨረሻም በአዲሱ የስታርትአፕ አዋጅ መሰረት በኢኖቬሽንና ቴክኖሎጂ ሚኒስቴር (MInT) መመዝገብ ከቀረጥ ነጻ በረከቶችንና ዝቅተኛ ብድር ያስገኛል ።',
    om: 'Seeran gurmaa’uuf: 1. Maqaa qabachuu, 2. Memorandum fi Articles of Association (DARA) mirkaneessuu, 3. TIN baasuu, 4. Eeyyama hojii daldalaa Diree Dawaa irraa argachuu. Dhumarratti sirna "Startup" jalatti MInT biratti galmaa’uun gargaarsa kaffaltii gibiraa fi kafaltii kaffaltii salphaa argachuuf kan gargaarudha.',
    so: 'Si loo helo sharciyad dalka Itoobiya: 1. Hubinta magaca shirkada (Xafiiska Ganacsiga Dire Dawa), 2. Saxiixa dokumentiyada aasaaska ee (DARA), 3. Helida lambarka canshuurta ee (TIN), iyo 4. Keenida cadeyn cinwaan si loo helo Ruqsada Ganacsiga. Diiwaangelinta hoos timaada wasaarada (MInT) waxay sahlaysaa dhiiri-gelin canshuureed iyo daryeel dhalinyaro.',
    en: 'To establish legally in Ethiopia: One must complete 1) Name Reservation (Dire Dawa Trade Bureau), 2) Registration of Memorandum & Articles of Association (DARA), 3) TIN issuance, and 4) Trade License acquisition. Crucially, obtaining a Startup Designation Certificate from the Ministry of Innovation and Technology (MInT) unlocks tax exemptions and soft credit access.'
  },
  riskPara: {
    am: 'ዋነኞቹ ስጋቶች የነዳጅ ዋጋ ጭማሪ (አሽከርካሪዎች የኤሌክትሪክ ባጃጆች እንዲጠቀሙ ማበረታታት) እና የበይነመረብ መቆራረጥ (ከመስመር ውጭ በUSSD ማዘዝ መቻል) ናቸው ። በተጨማሪ በጊግ ስራዎች ላይ ለተሳተፉት ወጣቶች የጋራ ጤና መድን እና የቁጠባ አቅርቦት በማመቻቸት ታማኝነታቸውን እናረጋግጣለን ።',
    om: 'Rakkooleen gurguddoon gatii boba’aa (gara Bajaj Elektrikiitti jijjiiruu) fi citinsa interneetii (USSD fayyadamuu) dha. Giddugalli keenya leenjitootaaf tajaajila fayyaa fi qusannoo maallaqaa mijeessuun sodaa hawaasummaa isaanii salphisa.',
    so: 'Khataraha ugu waaweyn waa kor u kaca shidaalka (oo lagu xalinayo bajaajta korontada) iyo go’itaanka internetka (oo lagu xalinayo USSD). Xarunta waxay dhalinyarada u samayn doontaa caymiska caafimaadka iyo qorshooyin kayd ah oo daryeel leh.',
    en: 'Primary risks include steep fuel inflation (mitigated by championing electric Tuk-tuks like Alfa Green) and internet blackouts (using offline USSD code channels like Alfa Ride). To safeguard gig workers, GPM structures micro-insurance and collective health savings pools.'
  },

  // App comparison specific fields
  appNameCol: { am: 'መተግበሪያ', om: 'Appilikeeshinii', so: 'Codsiga', en: 'App Name' },
  appSectorCol: { am: 'የአገልግሎት ዘርፍ', om: 'Damee Tajaajilaa', so: 'Adeega', en: 'Sector' },
  appPaymentCol: { am: 'የክፍያ አማራጭ', om: 'Kaffaltii', so: 'Bixinta Lacagta', en: 'Payment Integration' },
  appFeaturesCol: { am: 'ልዩ መለያ', om: 'Amala Addaa', so: 'Tilmaamaha', en: 'Unique Features' },

  // Financial plan fields
  finInitialExp: { am: 'የመነሻ ካፒታል ወጪዎች', om: 'Baasii jalqabaa', so: 'Kharashka Aasaaska', en: 'Startup CapEx Requirements' },
  finCategory: { am: 'የወጪ መደብ', om: 'Damee Baasii', so: 'Qaybta Kharashka', en: 'Expense Item' },
  finAmount: { am: 'ወጪ (ETB)', om: 'Gatiin (ETB)', so: 'Kharashka (ETB)', en: 'Cost (ETB)' },
  finDesc: { am: 'ዝርዝር ማብራሪያ', om: 'Ibsa', so: 'Sharaxaad', en: 'Detailed Description' },

  // Simulator Screen Translations
  simWelcome: {
    am: 'እንኳን ወደ ድሬ ባጃጅና እቃ ማገናኝ መተግበሪያ በደህና መጡ!',
    om: 'Baga gara Appilikeeshinii Diree Bajaj nagaan dhuftan!',
    so: 'Ku soo dhawaada Codsiga "Dire Bajaj & Goods"!',
    en: 'Welcome to Dire Bajaj & Goods Driver & Booking App!'
  },
  simSubtitle: {
    am: 'እባክዎን ሚናዎን በመምረጥ ይግቡ',
    om: 'Maalummaa keessan filachuun seenaa',
    so: 'Fadlan dooro qaybtaada si aad u gasho',
    en: 'Please select a profile to access the simulator'
  },
  roleDriver: { am: 'ባለሙያ/አሽከርካሪ', om: 'Konkolaachisaa Bajaj', so: 'Darawal Bajaj', en: 'Gig Driver / Bajaj' },
  roleCustomer: { am: 'ተሳፋሪ/ደንበኛ', om: 'Fayyadamoo/Maamil', so: 'Macmiilka', en: 'Rider / Customer' },
  roleMerchant: { am: 'ነጋዴ/እቃ ላኪ', om: 'Daldalaa', so: 'Ganacsade', en: 'Retailer / Merchant' },
  enterPassword: { am: 'የመግቢያ ፓስወርድ ያስገቡ', om: 'Jecha iccitii seensiisi', so: 'Geli fure-sirka', en: 'Enter Simulator Password' },
  loginBtn: { am: 'ግባ', om: 'Seeni', so: 'Gasho', en: 'Login' },
  wrongPassword: { am: 'የተሳሳተ ፓስወርድ! ትክክለኛው 12345ayub ነው ።', om: 'Jechi iccitii dogoggora! 12345ayub dha.', so: 'Fure-sir qaldan! Waa 12345ayub.', en: 'Invalid Password! Use "12345ayub" to authenticate.' },
  driverStats: { am: 'የእለት እንቅስቃሴ እና ገቢ', om: 'Hojii fi Galii', so: 'Shaqada iyo Dakhliga', en: 'Earnings & Activity Counter' },
  dailyRemaining: { am: 'የዛሬው ጠቅላላ ገቢ', om: 'Galii Har’aa', so: 'Dakhliga Maanta', en: 'Gross Earnings Today' },
  commissionPaid: { am: '5% የማዕከል ኮሚሽን (የተከፈለ)', om: '5% Kaffaltii GPM (kan kaffalame)', so: '5% Khidmadda Xarunta', en: '5% GPM Hub Commission' },
  netEarning: { am: 'አሽከርካሪው የተረከበው ትርፍ', om: 'Galii Qulqulluu', so: 'Dakhliga Saafi ah', en: 'Drivers Net Profit' },
  availJobs: { am: 'አቅራቢያ ያሉ ክፍት የስራ ትዕዛዞች', om: 'Hojiiwwan jiran', so: 'Dalabyada Shaqo ee Furan', en: 'Available Nearby Deliveries & Rides' },
  acceptOrderBtn: { am: 'ትዕዛዝ ተቀበል', om: 'Hojii fudhadhu', so: 'Aqbal Dalabka', en: 'Accept Order' },
  completeOrderBtn: { am: 'ትዕዛዝ አጠናቅቅ', om: 'Hojii xumuri', so: 'Dhamee Dalabka', en: 'Complete Order' },
  cancelOrderBtn: { am: 'ትዕዛዝ ሰርዝ', om: 'Hojii haqi', so: 'Baabi’i Dalabka', en: 'Cancel' },
  activeOrder: { am: 'የተያዘ የአሁን ስራ', om: 'Hojii Ammaa', so: 'Dalabka Hadda Firfircoon', en: 'Active Trip / Goods Delivery' },
  noOrders: { am: 'ያልተጠናቀቁ ትዕዛዞች በአቅራቢያዎ የሉም ።', om: 'Hojiin furan hin jiru.', so: 'Ma jiraan dalabyo furan hadda.', en: 'No pending requests nearby.' },
  sosSafety: { am: 'አደጋ ጊዜ ጥሪ (SOS)', om: 'Waa’ee deeggarsa SOS', so: 'Gargaarka Degdega ah (SOS)', en: 'SOS Safety Alert Trigger' },
  sosConfirmation: { am: 'የአደጋ ጊዜ ድምፅ ተነስቷል! ለፖሊስና ለማዕከሉ መረጃ ተልኳል ።', om: 'Birmannaan SOS ergameera! Poolisiif gabaafameera.', so: 'SOS waa la diray! Xarunta iyo booliska waa lala xidhiidhay.', en: 'SOS Activated! Alert and location shared with Dire GPM and local police.' },
  orderTypeRide: { am: 'የባጃጅ ጉዞ ጥሪ', om: 'Geejjiba Bajaj', so: 'Safarka Bajaajta', en: 'Bajaj Passenger Ride' },
  orderTypeDelivery: { am: 'የእቃዎች ማድረሻ ስራ', om: 'Meesha geessuu', so: 'Gaadhsiinta Badeecada', en: 'Cargo delivery' },
  orderTypeGreen: { am: 'አልፋ ግሪን የኤሌክትሪክ ባጃጅ', om: 'Elektrik Bajaj (Koo)', so: 'Alfa Green Bajaajta Korontada', en: 'Alfa Green Electric Bajaj' },

  // Booking details
  originLabel: { am: 'መነሻ ቦታ', om: 'Ka’umsa', so: 'Goobta Laga Bilaabayo', en: 'Pickup Origin' },
  destinationLabel: { am: 'መዳረሻ ቦታ', om: 'Gahumsa', so: 'Goobta Laga Degeyso', en: 'Destination Drop-off' },
  custName: { am: 'የደንበኛ ስም', om: 'Maqaa Maamilaa', so: 'Magaca Macmiilka', en: 'Client Name' },
  orderPrice: { am: 'ዋጋ (ETB)', om: 'Gatii', so: 'Qiimaha', en: 'Price (ETB)' },
  goodsDetails: { am: 'የእቃው አይነት መግለጫ', om: 'Ibsa meeshaa', so: 'Nooca Badeecada', en: 'Goods/Item Description' },
  bookNowBtn: { am: 'አሁኑኑ እዘዝ', om: 'Amma ajaji', so: 'Dalbo Hadda', en: 'Submit Ride/Delivery Order' },
  successBooking: { am: 'ትዕዛዝዎ በተሳካ ሁኔታ ተመዝግቧል! በአቅራቢያ የሚገኝ አሽከርካሪ በባንክ ወይም በቴሌብር ይገናኝዎታል ።', om: 'Ajajni keessan fudhatameera! Diiree irratti dhiottu argatu.', so: 'Dalabkaaga si guud ah ayaa loo diivangeliyey! Darawal ayaa vula xidhiidhi doona.', en: 'Order registered successfully! Nearby driver will be assigned immediately.' },
  offlineUSSD: { am: 'ኢንተርኔት በማይኖርበት ጊዜ በUSSD ማዘዣ USSD (*6268#)', om: 'Adeemsa bilbila USSD (*6268#)', so: 'Dalabka USSD Bilaa Internet (*6268#)', en: 'Offline USSD Connection Options (*6268#)' },
  offlineUSSDActivated: { am: 'ከመስመር ውጭ በስልክ ኮድ ማዘዣ ሂደት ተጀምሯል (*6268#) ።', om: 'Mootora USSD fula (*6268#) hojiirra oole.', so: 'Dalabka USSD (*6268#) hadda waa bilowday.', en: 'Offline USSD system initiated on your device (*6268#) for network-free bookings.' },
  
  // Tab Title
  prospectsTitle: { am: 'በድሬዳዋ የታወቁ መተግበሪያዎች ንፅፅር', om: 'Madaallii Appilikeeshinoota Diree', so: 'Astaamaha Codsiyada ee Dire', en: 'Landmark App Benchmarks in Dire Dawa' },
  financialForecast: { am: 'የፋይናንስ እቅድ እና ዓመታዊ ትርፋማነት', om: 'Kaffaltii fi Raasumaala Pirojekshinii', so: 'Maaliyada iyo Saadaasha Dakhliga', en: 'Startup CapEx & Payback Modeling' },
  interactiveSimHeader: { am: 'የእውነተኛ ጊዜ አፕሊኬሽን ማሳያ (ድሬ ባጃጅና እቃ ማገናኝ)', om: 'Gargariisa Appilikeeshinii Diree Bajaj', so: 'Tijaabada Tooska ah ee "Dire Bajaj & Goods"', en: 'Live Simulation: "Dire Bajaj & Goods Connector"' },
  roleText: { am: 'ከዚህ በታች የመረጡት ሚና፡', om: 'Maalummaa keessan ammoo:', so: 'Doorkaagu hadda waa:', en: 'Active Simulator Profile:' },
  logoutBtn: { am: 'ውጣ', om: 'Ba’i', so: 'Ka bax', en: 'Log Out Profile' },
  revenueSimulatorTitle: { am: 'የገቢ እና ትርፍ ማስያዣ ስሌት', om: 'Shalaggii Galii fi Bu’aa', so: 'Xisaabinta Faaiidada iyo Komishanka', en: 'Dynamic Financial Payback Simulator' },
  driverCountLabel: { am: 'የአሽከርካሪዎች ብዛት', om: 'Lakkoofsa Konkolaachistootaa', so: 'Tirada Darawaliinta', en: 'Number of Active Gig Workers' },
  dailyIncomeLabel: { am: 'የአሽከርካሪ አማካይ የዕለት ጉልበት/ገቢ (ETB)', om: 'Gali Guyyaa Konkolaachisaa (ETB)', so: 'Dakhliga Maalinlaha ama Darawal (ETB)', en: 'Avg Driver Daily Gross (ETB)' },
  monthlyRevenue: { am: 'የማዕከሉ የወር ጠቅላላ ኮሚሽን (5%)', om: 'Galii GPM Ji’aa (5%)', so: 'Komishanka Maamulka ee Bisha (5%)', en: 'Hub Monthly Commission Revenue (5%)' },
  paybackPeriod: { am: 'ውጪውን ለመመለስ የሚፈጀው ጊዜ (ወራት)', om: 'Kaffaltii Deebisuuf Ji’oota', so: 'Mudada Dib u soo celinta (Bilood)', en: 'CapEx Payback Horizon (Months)' },
  legalFrameworkExplore: { am: 'የንግድ ስራ ምዝገባ ዝርዝር መመሪያ (ቅደም-ተከተል)', om: 'Adeemsa Seeraa fi Galmee Daldalaa Step-by-Step', so: 'Tallaabooyinka Sharciga iyo Diiwaangelinta', en: 'Cooperative & PLC Step-by-Step Registration Progress' }
};

export const STUDY_FINANCIALS_DATA = [
  { item: 'የቢሮ ኪራይ እና እድሳት (Office Rent)', amount: 120000, desc: 'ለስራ ማስኬጃ የሚሆን የ6 ወራት የቢሮ ኪራይ እና መሰረታዊ እድሳቶች' },
  { item: 'የቢሮ ቁሳቁሶች እና ፈርኒቸር (Office Furniture)', amount: 80000, desc: 'የቢሮ ጠረጴዛዎች፣ ወንበሮች፣ የደንበኞች መቀመጫ እና ፋይል ማስቀመጫዎች' },
  { item: 'የቴክኖሎጂ መሰረተ ልማት (Technology Setup)', amount: 180000, desc: '6 ዴስክቶፕ ኮምፒውተሮች፣ 1 ፕሪንተር እና የበይነመረብ ራውተር መጫኛ' },
  { item: 'የህግ እና የስራ ማስፈቀጃ (Legal Fees)', amount: 30000, desc: 'ለንግድ ስም ምዝገባ፣ ውል ማረጋገጫ እና ለንግድ ፈቃድ የሚከፈሉ ህጋዊ ክፍያዎች' },
  { item: 'የማስተዋወቂያ ስራዎች (Marketing & Promo)', amount: 40000, desc: 'በድሬዳዋ ከተማ ውስጥ ለሚደረጉ የሬዲዮ፣ የዲጂታል ሚዲያ እና የከተማ ማስታወቂያዎች' },
  { item: 'መጠባበቂያ ፈንድ (Contingency Fund)', amount: 50000, desc: 'ለተለያዩ ድንገተኛ ወጪዎች እና ለመጀመሪያዎቹ ወራት የኤሌክትሪክ እና የውሃ ክፍያዎች' }
];

export const STUDY_APP_COMPARISON = [
  {
    name: 'ብሉ ዴሊቨሪ (Blu Delivery)',
    sector: { am: 'የምግብ እና የሸቀጦች አቅርቦት', om: 'Mootummaa Midhaan Dhiyeessuu', so: 'Gaadhsiinta Raashinka', en: 'Food & Cargo Delivery' },
    payment: { am: 'የባንክ ዝውውር፣ በእጅ ክፍያ', om: 'Kaffaltii Baankii / Cash', so: 'Xawilaada Bangiga / Kaash', en: 'Bank Transfer, Cash on delivery' },
    features: { am: 'በድሬዳዋ የተመሰረተ፣ ከሆቴሎች እና ሱቆች ጋር ቀጥተኛ ትስስር', om: 'Waliin daldaltoota walgargaaran', so: 'Ku saleysan Dire Dawa oo toos ula xidhiidha hoteelada', en: 'Dire Dawa based pioneer, direct API integration with local dining outlets' }
  },
  {
    name: 'ሊፍት ታክሲ (Lift Taxi)',
    sector: { am: 'የትራንስፖርት እና የባጃጅ ጥሪ', om: 'Geejjiba Tuk-tuk', so: 'Gaadiidka & Bajaajta', en: 'Ride-Hailing (Bajaj/TukTuk)' },
    payment: { am: 'ቴሌብር፣ ቻፓ፣ ጥሬ ገንዘብ', om: 'Telebirr, Chapa, Cash', so: 'Telebirr, Chapa, Kaash', en: 'Telebirr, Chapa, Cash' },
    features: { am: 'በ6268 ስልክ መጥራት ይቻላል፣ ለአሽከርካሪ ደህንነት የSOS ቁልፍ', om: 'Bilbila 6268 fi SOS qaba', so: 'Wicitaanka gaaban ee 6268, badhanka degdega SOS', en: 'Dedicated local 6268 shortcode and built-in SOS status monitor' }
  },
  {
    name: 'ፈረስ (Feres)',
    sector: { am: 'የትራንስፖርት ጥሪ', om: 'Geejjiba Taaksii', so: 'Dalabka Gaadiidka', en: 'Ride-Hailing (Taxi & Bajaj)' },
    payment: { am: 'ኢ-ብር፣ ቴሌብር፣ ጥሬ ገንዘብ', om: 'E-birr, Telebirr, Cash', so: 'E-birr, Telebirr, Kaash', en: 'E-Birr, Telebirr, Cash' },
    features: { am: 'በ6090 ስልክ መጥራት ይቻላል፣ "ፈረስ ማይልስ" የሽልማት ነጥብ', om: 'Bilbila 6090 fi Feres Miles', so: 'Wicitaanka 6090, qorshaha Feres Miles', en: '6090 shortcode, Feres Miles loyalty system convertible to airtime or cash' }
  },
  {
    name: 'ታክሲዬ (Taxiye)',
    sector: { am: 'የትራንስፖርት እና የባጃጅ ጥሪ', om: 'Geejjiba Boda boda / Bajaj', so: 'Bajaajta & Gaadiidka', en: 'Ride-Hailing & Corporate' },
    payment: { am: 'የባንክ ካርዶች፣ ጥሬ ገንዘብ', om: 'Karta Baankii, Cash', so: 'Kaadhka Bangiga, Kaash', en: 'Bank Cards, Mobile payments, Cash' },
    features: { am: 'ለድርጅቶች የሚሆን የጋራ ትራንስፖርት (Corporate Rate) ያቀርባል', om: 'Kaffaltii Dhaabbileef gargaaru', so: 'Khad la wadaago oo shirkadaha u gaar ah', en: 'Corporate account pooling for business contract routing' }
  },
  {
    name: 'አልፋ ራይድ (Alfa Ride)',
    sector: { am: 'የትራንስፖርት፣ የሞተር እና የባጃጅ ጥሪ', om: 'GeejjibaUSSD fi Elektrik', so: 'Bajaajta Korontada & USSD', en: 'Budget USSD Ride & Green Bajaj' },
    payment: { am: 'የባንክ ዝውውር፣ ጥሬ ገንዘብ', om: 'Kaffaltii Baankii / Cash', so: 'Xawilaad & Lacag caddaan', en: 'Bank accounts, Mobile Wallets, Cash' },
    features: { am: 'ከመስመር ውጭ በUSSD ማዘዝ ይቻላል፣ የኤሌክትሪክ ተሽከርካሪዎችን ያካትታል', om: 'USSD fi Alfa Green (Elektrik)', so: ' USSD bilaa internet ah iyo bajaajta korontada', en: 'USSD offline interface, incorporates electric "Alfa Green" Tuk-tuks' }
  }
];

export const STUDY_RISKS_DATA = [
  {
    risk: { am: 'የነዳጅ ዋጋ በከፍተኛ ሁኔታ መጨመር', om: 'Gatiin Boba’aa Dabaluu', so: 'Heerka Shidaalka oo aad u Kordha', en: 'Volatile fuel price inflation' },
    impact: 'High',
    mitigation: {
      am: 'አሽከርካሪዎች እንደ "አልፋ ግሪን" ያሉ የኤሌክትሪክ ተሽከርካሪዎችን እንዲጠቀሙ ማበረታታት ።',
      om: 'Gara tajaajila elektrikii Alfa Greenitti deemuu',
      so: 'Xalinta dhalinyarada badasho mootooyinka korontada',
      en: 'Establishing importation pipelines for low-maintenance electric Tuk-tuks.'
    }
  },
  {
    risk: { am: 'የበይነመረብ መቆራረጥ ወይም መጥፋት', om: 'Citinsa Interneetii', so: 'Go’itaanka Adeega Internet-ka', en: 'Frequent internet blackouts' },
    impact: 'Medium',
    mitigation: {
      am: 'እንደ አልፋ ራይድ ያሉ የዩኤስኤስዲ (USSD) ከመስመር ውጭ የትዕዛዝ አማራጮችን መጠቀም ።',
      om: 'Odeeffannoo USSD fayyadamuu',
      so: 'In la sameeyo dalabaadka gaaban ee USSD bilaa internetka ah',
      en: 'Deploying fallback USSD dial strings (*6268#) connected to dispatch.'
    }
  },
  {
    risk: { am: 'የህግ እና የታክስ መመሪያዎች አለመሟላት', om: 'Seera fi Gibira Dhabachuu', so: 'Xeerarka Canshuuraha oo Isbaddala', en: 'Incomplete compliance under evolving tax regulations' },
    impact: 'High',
    mitigation: {
      am: 'ከአገር ውስጥ የንግድ ቢሮ እና ከገቢዎች ባለስልጣን ጋር ተከታታይ ውይይት ማድረግ ።',
      om: 'Biroo Galiiwwan waliin haasa’uu',
      so: 'La tashiga xafiiska canshuuraha iyo ganacsiga magaalada',
      en: 'Maintaining constant alignment with the Revenues Bureau and Trade office.'
    }
  },
  {
    risk: { am: 'የአሽከርካሪዎች እና የደንበኞች አለመተማመን', om: 'Amanamummaa Dhabuu driver fi customer', so: 'Kalsooni darrada Macmiilka iyo Darawalka', en: 'Trust deficits between workers and remote customers' },
    impact: 'Medium',
    mitigation: {
      am: 'ሁሉንም አሽከርካሪዎች በወንጀል ሪከርድ መመርመር እና ደህንነቱ የተጠበቀ የጂፒኤስ መከታተያ መጠቀም ።',
      om: 'Seenaa dhuunfaa qorachuu fi GPS',
      so: 'La socodka GPS-ka darawalka iyo baadhista taariikhda dembiyada',
      en: 'Instituting biological criminal background clearances and telemetry GPS tracking.'
    }
  }
];

export const STUDY_HUBS_DATA: Hub[] = [
  {
    id: 'sabian',
    name: { am: 'ሰቢየን አውቶቡስ ጣቢያ', om: 'Buufata Geejjiba Sabiyen', so: 'Rugta Gaadiidka Sabian', en: 'Sabian Bus Station' },
    type: 'station',
    description: {
      am: 'በከተማዋ ሰሜናዊ አቅጣጫ የሚገኝ ዋነኛ የትራንስፖርት መነሻ ክፍት ጣቢያ',
      om: 'Buufata geejjiba kaaba magaalaa Diree Dawaa',
      so: 'Xarun muhiim ah oo ku taala waqooyiga magaalada',
      en: 'Highly congested northern terminal handling intercity transit flows.'
    },
    coords: { x: 25, y: 35 }
  },
  {
    id: 'kefira_station',
    name: { am: 'ከፊራ ሚኒባስ ጣቢያ', om: 'Buufata Kefira', so: 'Rugta Kefira', en: 'Kefira Minibus Station' },
    type: 'station',
    description: {
      am: 'ወደ ገፊራ የግብይት ማዕከል እና አካባቢ ወረዳዎች የሚሄዱ ባጃጆች መነሻ',
      om: 'Geejjiba gabaa Kafiiraatti dhiyoo argamu',
      so: 'Xiriirka gaadiidka ee suuqa caanka ah ee Kefira',
      en: 'Busy terminus connecting urban commuters to the historic old town sector.'
    },
    coords: { x: 65, y: 45 }
  },
  {
    id: 'megala',
    name: { am: 'መጋላ ትራንስፖርት ጣቢያ', om: 'Buufata Geejjiba Megala', so: 'Xarunta Gaadiidka Megala', en: 'Megala Transport Station' },
    type: 'station',
    description: {
      am: 'በከተማዋ እምብርት ላይ የሚገኝ እጅግ በጣም የተጨናነቀ የሶስት እግር ተሽከርካሪዎች መቆሚያ',
      om: 'Gidddugala magaalaa keessatti waltajjii Bajaj gurguddoo',
      so: 'Rugta ugu mashquulka badan ee ku taala badhtamaha magaalada',
      en: 'Central retail city hub supporting dense daily circular Bajaj routes.'
    },
    coords: { x: 45, y: 55 }
  },
  {
    id: 'chattara',
    name: { am: 'ጫታራ ገበያ', om: 'Gabaa Chattaraa', so: 'Suuqa Chattara', en: 'Chattara Market' },
    type: 'market',
    description: {
      am: 'ታዋቂ የጫት እና የቅመም ግብይት በሰፊው የሚከናወንበት እና እቃዎች የሚላኩበት ስፍራ',
      om: 'Iddoo gabaa Jimaa fi spices beekamaa',
      so: 'Suuqa ugu weyn ee jaadka iyo dhirta udgoon laga diro',
      en: 'Major agricultural wholesale hub generating intense local delivery load.'
    },
    coords: { x: 30, y: 75 }
  },
  {
    id: 'kafira_market',
    name: { am: 'ከፊራ ገበያ', om: 'Gabaa Kafiiraa', so: 'Suuqa Weyn ee Kafira', en: 'Kafira Market' },
    type: 'market',
    description: {
      am: 'የድሬዳዋ ትልቁ እና ታሪካዊው የምግብ ፣ የቁም እንስሳት እና የፍራፍሬ የኢኮኖሚ ማዕከል',
      om: 'Gabaa seena qabeessa midhaanii fi fulaa midhaanii',
      so: 'Suuqa ugu taariikhda dheer ee raashinka iyo khudaarta',
      en: 'Historic central marketplace filled with thousands of daily retail buyers.'
    },
    coords: { x: 80, y: 35 }
  },
  {
    id: 'ashawa',
    name: { am: 'አሻዋ ገበያ', om: 'Gabaa Ashaawaa', so: 'Suuqa Ashawa', en: 'Ashawa Market' },
    type: 'market',
    description: {
      am: 'የልብስ ፣ የቤት ቁሳቁስ እና የኢንዱስትሪ ምርቶች የጅምላ መገበያያ',
      om: 'Gabaa uffataa fi meeshaan gurguramu',
      so: 'Suuqa dharka iyo agabyada guriga ee jumlada',
      en: 'Heavy trade center specializing in ready-made apparel, textiles, and household goods.'
    },
    coords: { x: 50, y: 20 }
  },
  {
    id: 'camel',
    name: { am: 'የግመል ገበያ', om: 'Gabaa Gaalaa', so: 'Suuqa Awrta', en: 'Camel Market' },
    type: 'market',
    description: {
      am: 'ከተማዋን ከገጠር ምርቶች እና ከእንስሳት አቅርቦት ጋር የሚያገናኝ የጫፍ መገበያያ',
      om: 'Gabaa loonii fi horii geessitootaaf kan gargaaru',
      so: 'Suuq xoolaha ee geeska magaalada oo alaabada looga kireeyo bajaajta',
      en: 'Outskirt cargo trade post generating daily heavy bulk delivery streams.'
    },
    coords: { x: 85, y: 70 }
  }
];
