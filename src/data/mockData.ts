import { 
  TeamMember, 
  TargetCountryInfo, 
  WorkAndVisitCountryInfo,
  ServiceDetail, 
  FaqItem, 
  User, 
  StudentApplication, 
  StudentDocument, 
  NotificationItem, 
  ContactInquiry,
  SiteContent,
  JobOpportunity,
  AdminCredentials,
  DisclaimerPopupSettings
} from '../types';

export const MCS_INFO = {
  name: "MODERNMINDS CONSULTING SERVICES",
  shortName: "MCS",
  tagline: "Premier Immigration, Work Permits, Study Abroad & Visa Consultants",
  location: "Islamabad, Pakistan",
  fullAddress: "Office 402, 4th Floor, Executive Heights, Blue Area, Islamabad, Pakistan",
  phonePrimary: "03002346521",
  phoneLandline: "051-4862273",
  phoneMobile: "03002346521",
  whatsappNumber: "+923002346521",
  email: "info@modernminds.com.pk",
  supportEmail: "support@modernminds.com.pk",
  officeHours: "Monday – Saturday: 9:30 AM – 6:30 PM (PKT)",
  supportHours: "24/7 Client Emergency & Support Hotline Available",
  registrationNo: "SECP-ISB-2018-0941",
  stats: {
    studentsPlaced: "2,450+",
    visaSuccessRate: "98.8%",
    partnerUniversities: "85+",
    yearsOfExcellence: "8+",
    scholarshipsSecured: "Rs. 180M+",
    workPermitsProcessed: "650+"
  }
};

export const DEFAULT_SITE_CONTENT: SiteContent = {
  hero: {
    badgeText: "ISLAMABAD REGISTERED CONSULTING FIRM (MCS)",
    headline: "Premier Immigration, Work Permits, Study Abroad & Visit Visas for",
    headlineHighlight: "Pakistani Professionals & Students",
    subtitle: "Modernminds Consulting Services (MCS), based in Islamabad, delivers certified expertise in European Work Permits, Global Tourist & Visit Visas, and World-Class University Admissions. From legal contract attestation and bank statements to embassy interviews and seamless relocation.",
    phoneButtonText: "03002346521",
    phoneButtonNumber: "03002346521",
    primaryCtaText: "Book Free Assessment",
    stat1Value: "98.8%",
    stat1Label: "Visa Approval Rate",
    stat2Value: "2,450+",
    stat2Label: "Clients Facilitated",
    stat3Value: "Work & Visit",
    stat3Label: "Licensed Pathways",
    stat4Value: "Islamabad",
    stat4Label: "Head Office"
  },
  about: {
    badgeText: "REGISTERED CONSULTING FIRM ISLAMABAD",
    headline: "About Modernminds Consulting Services (MCS)",
    cardTag: "Head Office: Islamabad",
    cardTitle: "Excellence in Study Abroad, Work Permits & Visit Visas",
    cardSubtitle: "Personalized guidance ensuring each aspiring student, professional, and traveler secures lawful entry worldwide.",
    manifestoStatement: "MODERNMINDS CONSULTING SERVICES (MCS), BASED IN ISLAMABAD, IS A REGISTERED CONSULTING FIRM DEDICATED TO FACILITATING WORK PERMITS, STUDY ABROAD, AND VISIT VISAS.",
    paragraph1: "The organization was founded with a strong commitment to excellence, transparent guidance, and making international opportunities accessible to Pakistani citizens. Whether obtaining a European employment work permit, applying for a visitor visa to the UK or USA, or securing a prestigious university admission, we simplify every single phase from documentation to consular approval.",
    paragraph2: "With physical headquarters in Blue Area, Islamabad, Modernminds maintains direct legal pipelines across Poland, Romania, Lithuania, Portugal, the UK, Europe, Eurasia, and Central Asia. We ensure absolute documentation authenticity, legal attestation guidance, and dedicated on-ground welfare support.",
    pillar1Title: "Uncompromising Excellence",
    pillar1Desc: "Transparent advice, zero hidden charges, and authorized institutional channels for genuine degree programs, employment contracts, and visit visas.",
    pillar2Title: "Personalized Case Guidance",
    pillar2Desc: "One-on-one counseling tailored to your financial profile, academic credentials, occupational experience, and travel goals.",
    pillar3Title: "Direct Work Permits & Global Visas",
    pillar3Desc: "Fast-tracked European work permits, embassy interview coaching, and legal pathways for study, employment, and tourism."
  },
  countries: {
    badgeText: "STUDENT DESTINATIONS",
    headline: "Target Countries for Pakistani Students",
    subtitle: "Explore verified academic, medical, and scholarship opportunities across 15 authorized European, Eurasian, Central Asian, and Pacific destinations with exceptional visa grant records."
  },
  workAndVisit: {
    badgeText: "EMPLOYMENT & TRAVEL DESTINATIONS",
    headline: "Target Countries for Work Permits & Visit Visas",
    subtitle: "Explore verified global destinations for legal European Work Permits, Foreign Employment Contracts, and Tourist/Family Visit Visas with industry-leading approval rates."
  },
  services: {
    badgeText: "OUR SERVICES",
    headline: "Comprehensive Immigration, Work, Study & Visit Visa Consulting",
    subtitle: "From European work permits and university admissions to tourist visa filings and medical degrees, our Islamabad headquarters provides end-to-end facilitation."
  },
  whyUs: {
    badgeText: "WHY CHOOSE MCS",
    headline: "Why Pakistani Clients & Families Trust Modernminds",
    subtitle: "Registered in Islamabad with proven track records across student admissions, European employment permits, and tourist visa dossiers."
  },
  team: {
    badgeText: "EXECUTIVE LEADERSHIP & ADVISORS",
    headline: "Meet Our Senior Consultants & Case Directors",
    subtitle: "Directly consult with the leadership team managing your work permit files, university petitions, and embassy consular submissions."
  },
  faqs: {
    badgeText: "FREQUENTLY ASKED QUESTIONS",
    headline: "Clear Answers for Students, Workers & Travelers",
    subtitle: "Everything you need to know about European work permits, visit visa bank statements, university invitations, and embassy interviews."
  },
  contact: {
    badgeText: "ISLAMABAD CONSULTANCY DESK",
    headline: "Visit Our Blue Area Office or Inquire Online",
    subtitle: "Speak directly with our senior immigration and educational advisors in Islamabad or submit your credentials for an immediate profile assessment.",
    address: "Office 402, 4th Floor, Executive Heights, Blue Area, Islamabad, Pakistan",
    phonePrimary: "03002346521",
    phoneMobile: "051-4862273",
    email: "info@modernminds.com.pk",
    hours: "Monday – Saturday: 9:30 AM – 6:30 PM (PKT)"
  }
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "ali-anwar",
    name: "ALI ANWAR",
    role: "Founder & CEO",
    qualification: "M.Sc. International Relations & Education Strategy",
    bio: "With over 12 years of executive leadership in international academic placement, Ali Anwar founded MCS to dismantle barriers for Pakistani students aspiring to achieve prestigious European and Eurasian degrees. His diplomatic liaison with overseas education ministries guarantees direct, authorized admission pipelines.",
    expertise: ["Strategic Global Partnerships", "University Direct Accreditations", "Executive Counseling", "High-Commission Liaisons"],
    contactEmail: "ali.anwar@modernminds.com.pk",
    phone: "051-4862273",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    featuredQuote: "Every student has an extraordinary trajectory. Our duty is providing the precise runway to world-class academic success."
  },
  {
    id: "dr-sayyed-numan-akbar",
    name: "DR. SAYYED NUMAN AKBAR (MD)",
    role: "Managing Director",
    qualification: "MD, Physician & Senior Academic Director",
    bio: "Dr. Sayyed Numan Akbar oversees academic governance, curriculum equivalence, and specialized medical pathway placements (MBBS, BDS, MD). Having practiced and studied medicine internationally, he guides medical candidates through PMDC/WFME verification and international licensing.",
    expertise: ["Overseas MBBS & BDS Admissions", "PMDC / WFME Compliance", "Clinical Internship Placements", "Academic Integrity"],
    contactEmail: "dr.numan@modernminds.com.pk",
    phone: "051-4862273",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80",
    featuredQuote: "Securing clinical education abroad requires uncompromised precision in medical regulatory compliance."
  },
  {
    id: "shabana-khan",
    name: "SHABANA KHAN",
    role: "Marketing Manager",
    qualification: "MBA Marketing & Corporate Communications",
    bio: "Shabana Khan leads student outreach, public education seminars, and university exposition partnerships across Islamabad, Rawalpindi, Lahore, and KPK. She ensures transparent scholarship communication and coordinates orientation symposia for prospective applicants and parents.",
    expertise: ["Student Outreach Programs", "Pre-Departure Seminars", "Parent Advisory Sessions", "Scholarship Information"],
    contactEmail: "shabana.khan@modernminds.com.pk",
    phone: "03002346521",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    featuredQuote: "Honest, transparent guidance transforms student dreams into tangible, international achievements."
  },
  {
    id: "sher-muhammad-khan",
    name: "SHER MUHAMMAD KHAN",
    role: "Visa Consultant",
    qualification: "LL.B., Immigration & Schengen Visa Specialist",
    bio: "Sher Muhammad Khan specializes in intricate visa documentation, biometric coordination, embassy interview simulation, and financial proof vetting. He maintains a near-flawless visa endorsement record across European Schengen and Eurasian embassies in Islamabad.",
    expertise: ["Schengen & Eurasian Visa Protocols", "Embassy Interview Coaching", "Financial Documentation Vetting", "Visa Appeal Resolution"],
    contactEmail: "sher.khan@modernminds.com.pk",
    phone: "03002346521",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    featuredQuote: "A bulletproof visa application begins with meticulous preparation, total accuracy, and undeniable documentation."
  }
];

export const TARGET_COUNTRIES: TargetCountryInfo[] = [
  {
    id: "russia",
    name: "Russia",
    flag: "🇷🇺",
    tagline: "Prestigious Federal Universities & Budget-Friendly Living",
    image: "https://images.unsplash.com/photo-1513326738677-b964603b136d?auto=format&fit=crop&w=800&q=80",
    popularPrograms: ["MBBS (6 Years English Medium)", "Aerospace & Mechanical Eng.", "Artificial Intelligence", "Oil & Gas Engineering"],
    tuitionRange: "$2,500 – $5,200 / year",
    livingCost: "$250 – $400 / month",
    visaSuccessRate: "98.5%",
    processingTime: "4 – 6 Weeks",
    workRights: "Legal 20 hrs/week with student residence permit",
    intakes: "September & October",
    highlights: [
      "Centuries-old academic heritage (Sechenov, Kazan, Peoples' Friendship)",
      "Bilateral educational cooperation with Pakistan",
      "Subsidized government university student hostels",
      "High clinical exposure and patient interaction for medical interns"
    ],
    requirements: [
      "Matric & Intermediate verified by IBCC & MOFA",
      "Passport scan (clear first 2 pages)",
      "6 passport size photos on matte paper",
      "General health and chest X-ray certificate"
    ]
  },
  {
    id: "belarus",
    name: "Belarus",
    flag: "🇧🇾",
    tagline: "High Visa Ratio & European Standard Medical & IT Degrees",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80",
    popularPrograms: ["General Medicine (MBBS in English)", "Dentistry (BDS)", "Computer Science & Software", "Telecommunications"],
    tuitionRange: "$2,800 – $4,500 / year",
    livingCost: "$200 – $350 / month",
    visaSuccessRate: "99.2%",
    processingTime: "3 – 5 Weeks",
    workRights: "Part-time student internships permitted",
    intakes: "September & February (Preparatory)",
    highlights: [
      "No mandatory IELTS test for initial conditional admission",
      "Direct Ministry of Education study invitation letters",
      "Degrees widely recognized by PMDC, WHO, ECFMG, and UNESCO",
      "Modern state-of-the-art clinical laboratories in Minsk and Vitebsk"
    ],
    requirements: [
      "F.Sc Pre-Medical / Pre-Engineering (Minimum 60%)",
      "Valid passport with min 18 months validity",
      "Medical fitness certificate (HIV, Hep B/C negative)",
      "Police clearance certificate attested by MOFA Pakistan"
    ]
  },
  {
    id: "serbia",
    name: "Serbia",
    flag: "🇷🇸",
    tagline: "Rapidly Emerging European Education Hub with Easy Entry",
    image: "https://images.unsplash.com/photo-1549144511-f099e773c147?auto=format&fit=crop&w=800&q=80",
    popularPrograms: ["Information Systems", "International Business", "Medical & Nursing Programs", "Hospitality Management"],
    tuitionRange: "€2,200 – €4,800 / year",
    livingCost: "€280 – €450 / month",
    visaSuccessRate: "97.8%",
    processingTime: "4 – 6 Weeks",
    workRights: "Student part-time employment options",
    intakes: "October & March",
    highlights: [
      "Modern European curriculum at budget-conscious rates",
      "Dynamic capital city (Belgrade) with prominent tech companies",
      "Safe and affordable living conditions for international scholars",
      "Personalized reception at Belgrade Nikola Tesla Airport by MCS"
    ],
    requirements: [
      "Academic diplomas with certified English/Serbian translations",
      "Official health assessment and travel insurance",
      "Financial guarantee statement",
      "Clean criminal background certificate"
    ]
  },
  {
    id: "portugal",
    name: "Portugal",
    flag: "🇵🇹",
    tagline: "Gateway to the Schengen Area with Post-Study Residency Pathways",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=800&q=80",
    popularPrograms: ["Information Technology", "Hospitality & Tourism Mgmt", "Business Administration", "Renewable Energy"],
    tuitionRange: "€3,000 – €7,500 / year",
    livingCost: "€450 – €700 / month",
    visaSuccessRate: "96.4%",
    processingTime: "6 – 10 Weeks",
    workRights: "Full-time work rights during breaks, 20 hrs during semester",
    intakes: "September & January",
    highlights: [
      "Access to all 29 Schengen member states without internal border checks",
      "Attractive post-study job seeker visa for Pakistani graduates",
      "Progressive European work culture and pleasant climate",
      "Straightforward path toward European permanent residency"
    ],
    requirements: [
      "Bachelor's degree or 12 years higher secondary schooling",
      "Proof of funds in bank account (Sponsor / Student)",
      "Police Character Certificate attested by MOFA",
      "Valid accommodation lease agreement in Portugal"
    ]
  },
  {
    id: "cyprus",
    name: "Cyprus",
    flag: "🇨🇾",
    tagline: "Affordable Mediterranean Campus Life with Fast Visa Approvals",
    image: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80",
    popularPrograms: ["Hotel & Tourism Management", "Computer Science", "Business & Finance", "Maritime Studies"],
    tuitionRange: "€2,500 – €5,000 / year",
    livingCost: "€300 – €500 / month",
    visaSuccessRate: "97.5%",
    processingTime: "3 – 5 Weeks",
    workRights: "20 hours/week during semester in permitted student sectors",
    intakes: "February, June & October",
    highlights: [
      "Extremely streamlined visa approval ratio for Pakistani applicants",
      "Automatic up to 50% academic scholarship evaluation",
      "English medium higher education in a safe Mediterranean paradise",
      "Simplified bank balance and sponsorship regulations"
    ],
    requirements: [
      "Higher Secondary Certificate (Intermediate / A-Levels)",
      "Bank statement showing minimum 3-6 months maintenance",
      "Police character clearance certificate attested by MOFA",
      "General medical fitness and hepatitis/TB screening"
    ]
  },
  {
    id: "malta",
    name: "Malta",
    flag: "🇲🇹",
    tagline: "English-Speaking European Schengen Island with Lucrative Work Rights",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80",
    popularPrograms: ["Business Administration", "Cyber Security & IT", "Hospitality Management", "Health Care & Nursing"],
    tuitionRange: "€4,500 – €8,500 / year",
    livingCost: "€500 – €750 / month",
    visaSuccessRate: "95.8%",
    processingTime: "5 – 8 Weeks",
    workRights: "Legal 20 hrs/week after 90 days of study",
    intakes: "February, July & October",
    highlights: [
      "Official English-speaking nation inside the European Union and Schengen zone",
      "High minimum hourly wage and vibrant part-time job opportunities",
      "Degrees fully recognized across Europe, the UK, and North America",
      "Direct residency and EU Blue Card transitions after graduation"
    ],
    requirements: [
      "Academic transcript with minimum 55% marks",
      "Sufficient financial sponsorship with legitimate bank verification",
      "MOFA attested educational certificates and police certificate",
      "Acceptance letter from a licensed Malta Further & Higher Education Authority institute"
    ]
  },
  {
    id: "poland",
    name: "Poland",
    flag: "🇵🇱",
    tagline: "Central European Academic Powerhouse with Bologna Accreditation",
    image: "https://images.unsplash.com/photo-1519197924294-4ba991a11128?auto=format&fit=crop&w=800&q=80",
    popularPrograms: ["MBBS & Medicine in English", "Computer Science & AI", "Logistics & Supply Chain", "International Economics"],
    tuitionRange: "€2,000 – €5,500 / year",
    livingCost: "€350 – €550 / month",
    visaSuccessRate: "96.2%",
    processingTime: "4 – 7 Weeks",
    workRights: "Unrestricted part-time work permitted during full-time studies",
    intakes: "October & February",
    highlights: [
      "Robust economy with hundreds of multinational tech and finance campuses",
      "Bologna system European ECTS degrees valid worldwide",
      "Significantly lower cost of living than Germany or France",
      "Straightforward European Schengen TRC (Temporary Residence Card) issuance"
    ],
    requirements: [
      "Matric / Intermediate attested by IBCC & MOFA / Degree by HEC",
      "Bank maintenance letter and 6 months active statement",
      "Valid health insurance policy covering €30,000 Schengen zone",
      "Eligibility statement / apostille translation"
    ]
  },
  {
    id: "new-zealand",
    name: "New Zealand",
    flag: "🇳🇿",
    tagline: "Top 3% World-Ranked Universities & Direct Post-Study Work Visas",
    image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=800&q=80",
    popularPrograms: ["Information Technology", "Agribusiness & Food Science", "Civil & Environmental Eng.", "Healthcare & Nursing"],
    tuitionRange: "NZ$ 22,000 – NZ$ 34,000 / year",
    livingCost: "NZ$ 1,200 – NZ$ 1,600 / month",
    visaSuccessRate: "94.5%",
    processingTime: "6 – 10 Weeks",
    workRights: "20 hours/week during semester, 40 hours during holidays; up to 3-year Post Study Work Visa",
    intakes: "February & July",
    highlights: [
      "All 8 universities ranked in the QS World University Rankings Top 500",
      "Ranked among the safest and most peaceful countries globally",
      "High post-study permanent residency (PR) transition rate for skilled graduates",
      "Dedicated partner work rights for Master's students"
    ],
    requirements: [
      "IELTS (6.0 for Bachelor's, 6.5 for Master's) or PTE equivalent",
      "Proof of funds to cover tuition fee plus NZ$ 20,000 annual living cost",
      "Chest X-ray and medical examination from panel clinic",
      "Police clearance certificate less than 6 months old"
    ]
  },
  {
    id: "turkey",
    name: "Turkey",
    flag: "🇹🇷",
    tagline: "Close Cultural Affinity, YÖK Accreditations & Modern Campuses",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80",
    popularPrograms: ["Medicine (English/Turkish)", "Mechanical & Civil Engineering", "Architecture & Interior Design", "International Relations"],
    tuitionRange: "$1,800 – $6,000 / year",
    livingCost: "$250 – $450 / month",
    visaSuccessRate: "98.9%",
    processingTime: "3 – 5 Weeks",
    workRights: "Post-graduate work permit schemes and campus assistantships",
    intakes: "September & February",
    highlights: [
      "Close diplomatic and cultural affinity with Pakistan",
      "Bologna Process compatible degrees accepted seamlessly across the EU",
      "Halal food everywhere, rich Islamic heritage, and hospitable campuses",
      "Direct flights from Islamabad, Lahore, and Karachi to Istanbul"
    ],
    requirements: [
      "Intermediate / A-Levels or Bachelor's transcript attested by MOFA",
      "Valid Pakistani passport with at least 2 blank pages",
      "Bank maintenance letter and 6 months active bank statement",
      "Denklik Belgesi (Equivalence) assistance managed directly by MCS"
    ]
  },
  {
    id: "kyrgyzstan",
    name: "Kyrgyzstan",
    flag: "🇰🇬",
    tagline: "Top MBBS Destination for Pakistani Students with PMDC/WHO Approvals",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80",
    popularPrograms: ["General Medicine (MBBS - 5 Years English Medium)", "Dentistry (BDS)", "Pharmacy & Clinical Care"],
    tuitionRange: "$3,200 – $4,800 / year",
    livingCost: "$150 – $250 / month",
    visaSuccessRate: "99.5%",
    processingTime: "2 – 4 Weeks",
    workRights: "Clinical internships and teaching hospital rotations",
    intakes: "September & February",
    highlights: [
      "Over 10,000 Pakistani medical students currently studying in Bishkek",
      "Pakistani chefs, halal food messes, and dedicated university hostels",
      "Degrees fully recognized by PMDC, WHO, WFME, and USMLE/PLAB councils",
      "Lowest overall package with direct charter flights from Islamabad"
    ],
    requirements: [
      "F.Sc Pre-Medical with minimum 60% marks",
      "Matric & F.Sc verified by IBCC & MOFA Pakistan",
      "Medical fitness certificate (HIV, Hep B/C negative)",
      "Valid passport with minimum 2 years validity"
    ]
  },
  {
    id: "uzbekistan",
    name: "Uzbekistan",
    flag: "🇺🇿",
    tagline: "Historic Silk Road Medical & Technological Universities",
    image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80",
    popularPrograms: ["MBBS (General Medicine - 5 & 6 Years)", "IT & Computer Engineering", "International Business & Trade"],
    tuitionRange: "$3,000 – $4,500 / year",
    livingCost: "$180 – $280 / month",
    visaSuccessRate: "99.1%",
    processingTime: "2 – 4 Weeks",
    workRights: "Clinical rotations and campus academic assistantships",
    intakes: "September & March",
    highlights: [
      "Tashkent Medical Academy and Samarkand State Medical University excellence",
      "Rich shared Islamic heritage and very warm brotherly ties with Pakistan",
      "Ultra-modern European simulated clinical laboratories and PMDC alignment",
      "Extremely safe cities with low living overheads and prompt visa processing"
    ],
    requirements: [
      "F.Sc Pre-Medical (Minimum 55-60%)",
      "IBCC and MOFA attested educational certificates",
      "Clean police character certificate",
      "Passport scan and verified medical test results"
    ]
  },
  {
    id: "tajikistan",
    name: "Tajikistan",
    flag: "🇹🇯",
    tagline: "Budget-Friendly Central Asian Medical & Technical Education",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
    popularPrograms: ["MBBS (General Medicine in English)", "Hydro-Power Engineering", "Civil Engineering", "Applied IT"],
    tuitionRange: "$2,600 – $4,000 / year",
    livingCost: "$160 – $260 / month",
    visaSuccessRate: "99.0%",
    processingTime: "2 – 4 Weeks",
    workRights: "Hospital training programs and graduate research positions",
    intakes: "September & October",
    highlights: [
      "Immediate geographical proximity to Pakistan with regular direct connections",
      "Abulqasim Firdowsi & Avicenna Tajik State Medical University traditions",
      "Peaceful environment with clean mountain surroundings in Dushanbe",
      "Complete on-ground support and Pakistani student welfare communities"
    ],
    requirements: [
      "F.Sc Pre-Medical or Pre-Engineering certificate",
      "Attestation from IBCC and Ministry of Foreign Affairs (MOFA)",
      "Passport valid for at least 18 months",
      "Standard blood profile and infectious disease clearance"
    ]
  },
  {
    id: "kazakhstan",
    name: "Kazakhstan",
    flag: "🇰🇿",
    tagline: "Leading Central Asian Economy with Premier Medical Universities",
    image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=800&q=80",
    popularPrograms: ["MBBS in English (5 Years)", "Petroleum & Chemical Engineering", "AI & Robotics", "Finance & Management"],
    tuitionRange: "$3,500 – $5,500 / year",
    livingCost: "$220 – $380 / month",
    visaSuccessRate: "98.7%",
    processingTime: "3 – 5 Weeks",
    workRights: "University hospital internships and licensed campus roles",
    intakes: "September & February",
    highlights: [
      "Top-tier institutions (KazNMU, Asfendiyarov, Kazakh National University)",
      "World-class simulation centers with cutting-edge robotic surgical mannequins",
      "Economic powerhouse of Central Asia with sophisticated urban hubs (Almaty, Astana)",
      "Approved by PMDC, WHO, WFME, and global medical boards"
    ],
    requirements: [
      "F.Sc Pre-Medical (minimum 60%) or relevant science background",
      "IBCC & MOFA attestation on matric & intermediate transcripts",
      "Passport scan with 2 blank visa pages",
      "Chest X-Ray and general physical fitness document"
    ]
  },
  {
    id: "azerbaijan",
    name: "Azarbijan",
    flag: "🇦🇿",
    tagline: "Cosmopolitan Baku Universities with Direct E-Visa Convenience",
    image: "https://images.unsplash.com/photo-1579282240050-352db0a14c21?auto=format&fit=crop&w=800&q=80",
    popularPrograms: ["General Medicine (MBBS)", "Oil & Gas Engineering", "International Tourism & Hospitality", "Architecture"],
    tuitionRange: "$2,000 – $4,500 / year",
    livingCost: "$220 – $350 / month",
    visaSuccessRate: "99.3%",
    processingTime: "2 – 3 Weeks",
    workRights: "Student part-time opportunities in hospitality, IT, and retail",
    intakes: "September & February",
    highlights: [
      "Special brotherly bond between Pakistan and Azerbaijan with exceptional goodwill",
      "Baku is a breathtaking, ultra-modern, European-style Caspian seaside capital",
      "Fast-track electronic student visa process with minimal paperwork friction",
      "High English fluency in university faculties and vibrant international community"
    ],
    requirements: [
      "Intermediate / A-Level diploma attested by IBCC & MOFA",
      "Pakistani passport with minimum 1-year validity",
      "Police character verification attested by MOFA",
      "Health assessment report (HIV, Hepatitis B/C negative)"
    ]
  },
  {
    id: "ukraine",
    name: "Ukraine",
    flag: "🇺🇦",
    tagline: "Prestigious European Degree Recognition & Transfer Facilitation",
    image: "https://images.unsplash.com/photo-1561542320-9a18cd340469?auto=format&fit=crop&w=800&q=80",
    popularPrograms: ["Medicine & Dentistry (Bilingual/English)", "Aviation & Aeronautical Engineering", "Software Engineering"],
    tuitionRange: "$2,800 – $4,600 / year",
    livingCost: "$250 – $400 / month",
    visaSuccessRate: "96.5%",
    processingTime: "3 – 5 Weeks",
    workRights: "Dual European university mobility and transfer options",
    intakes: "Fall & Spring",
    highlights: [
      "European ECTS degree architecture with seamless credit transfer options",
      "Specialized pathways and partnerships with EU campuses (Poland, Georgia, Serbia)",
      "Century-old academic traditions and extensive clinical dissection opportunities",
      "MCS specialized educational transfer and verification assistance"
    ],
    requirements: [
      "Secondary school credentials attested by relevant boards and MOFA",
      "Official university study invitation letter",
      "Bank solvency proof and medical certificate",
      "Pakistani passport with minimum 18 months validity"
    ]
  }
];

export const WORK_AND_VISIT_COUNTRIES: WorkAndVisitCountryInfo[] = [
  {
    id: "poland-work",
    name: "Poland",
    flag: "🇵🇱",
    category: "work_permit",
    tagline: "EU National D Work Permit & Schengen Travel Mobility",
    image: "https://images.unsplash.com/photo-1519197924294-4ba991a11f28?auto=format&fit=crop&w=800&q=80",
    visaSuccessRate: "96.4%",
    processingTime: "8 – 12 Weeks",
    validity: "1 to 3 Years Renewable",
    salaryOrProof: "€950 – €1,700 / Month + Lodging Options",
    permitTypeOrPurpose: "Type-D National Work Permit (Zezwolenie na Pracę Typ A)",
    topSectorsOrDestinations: [
      "Logistics & Heavy Warehousing",
      "Civil Construction & Electricians",
      "Automotive & Factory Assembly",
      "Hospitality & Food Services"
    ],
    requirements: [
      "Valid Pakistani Passport (minimum 2 years validity)",
      "Police Character Certificate attested by MOFA Islamabad",
      "Verified Voivodeship Work Decision from Polish Labor Office",
      "Embassy visa application filed via e-Konsulat Islamabad"
    ],
    keyHighlights: [
      "Full Schengen travel rights across 27 EU member states",
      "Direct pathway to Polish Temporary Residence Card (Karta Pobytu)",
      "Official contracts include health insurance and social contributions"
    ]
  },
  {
    id: "romania-work",
    name: "Romania",
    flag: "🇷🇴",
    category: "work_permit",
    tagline: "Official Schengen Member with High Quotas for Pakistani Workforce",
    image: "https://images.unsplash.com/photo-1584646098378-0874589d76b1?auto=format&fit=crop&w=800&q=80",
    visaSuccessRate: "97.2%",
    processingTime: "6 – 10 Weeks",
    validity: "2 Years (Renewable up to Permanent Residency)",
    salaryOrProof: "€750 – €1,400 / Month + Free Overtime & Accommodation",
    permitTypeOrPurpose: "Ministry of Internal Affairs Work Authorization (Aviz de Muncă)",
    topSectorsOrDestinations: [
      "General Construction, Welding & Plumbing",
      "Food Packaging & Agricultural Processing",
      "Transport & Heavy Vehicle Driving",
      "Hotel Housekeeping & Catering"
    ],
    requirements: [
      "Clean Criminal Record Certificate attested by MOFA",
      "Secondary or vocational trade certification",
      "Medical fitness examination report",
      "Original biometric Pakistani passport"
    ],
    keyHighlights: [
      "Romania is now officially a European Schengen Area member state",
      "Low startup cost with employer-sponsored housing and air tickets",
      "Direct legal pathway toward 5-year European Long-Term Residence"
    ]
  },
  {
    id: "lithuania-work",
    name: "Lithuania & Baltics",
    flag: "🇱🇹",
    category: "work_permit",
    tagline: "Northern European High Living Standards & Professional Logistics",
    image: "https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?auto=format&fit=crop&w=800&q=80",
    visaSuccessRate: "95.0%",
    processingTime: "7 – 11 Weeks",
    validity: "1 to 2 Years Renewable",
    salaryOrProof: "€1,000 – €1,850 / Month",
    permitTypeOrPurpose: "National D Work Visa & Temporary Residence Permit (TRP)",
    topSectorsOrDestinations: [
      "International CE Long-Haul Fleet Driving",
      "Automated Warehousing Operations",
      "Meat, Dairy & Poultry Production",
      "Technical Maintenance & Metalworking"
    ],
    requirements: [
      "Pakistani Driver's License (for drivers) + MOFA attestation",
      "Police clearance certificate with Apostille / MOFA stamp",
      "Migration Department electronic mediation letter"
    ],
    keyHighlights: [
      "Euro-currency earnings with significant savings potential for Pakistan",
      "Streamlined electronic processing via Lithuanian Migration MIGRIS portal",
      "Family reunification eligibility after successful initial tenure"
    ]
  },
  {
    id: "portugal-work",
    name: "Portugal",
    flag: "🇵🇹",
    category: "work_permit",
    tagline: "Western Europe's Most Direct Pathway to Legal European Citizenship",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=800&q=80",
    visaSuccessRate: "94.8%",
    processingTime: "10 – 16 Weeks",
    validity: "1 Year Initial (Renewable for 2-Year Periods)",
    salaryOrProof: "€820 – €1,500 / Month (Guaranteed Base Wage)",
    permitTypeOrPurpose: "Subordinate Employment Visa (Visto D1 / Seasonal)",
    topSectorsOrDestinations: [
      "Agricultural Harvesting & Greenhouses",
      "Tourism, Coastal Resorts & Restaurant Management",
      "Civil Construction & Joinery",
      "Commercial Warehousing & Delivery"
    ],
    requirements: [
      "Legally verified employment contract from registered Portuguese company",
      "Clean criminal record attested by Ministry of Foreign Affairs Islamabad",
      "Travel insurance with international medical coverage"
    ],
    keyHighlights: [
      "Fastest legal pathway to European Passport & Citizenship (5 years)",
      "High safety, warm climate, and well-established Pakistani diaspora",
      "Full access to the Portuguese National Health Service (SNS)"
    ]
  },
  {
    id: "serbia-work",
    name: "Serbia & Balkans",
    flag: "🇷🇸",
    category: "work_permit",
    tagline: "Rapid Embassy Processing & Massive Infrastructure Job Quotas",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80",
    visaSuccessRate: "96.0%",
    processingTime: "5 – 8 Weeks",
    validity: "1 to 3 Years Unified Permit",
    salaryOrProof: "€700 – €1,300 / Month + Full Room & Board",
    permitTypeOrPurpose: "Single Unified Work & Residence Permit (Jedinstvena Dozvola)",
    topSectorsOrDestinations: [
      "Highways, Bridges & High-Speed Rail Projects",
      "Industrial Metal Fabrication & CNC Operations",
      "Automotive Parts Manufacturing",
      "Commercial Building Construction"
    ],
    requirements: [
      "Police Character Certificate attested by MOFA",
      "Pakistani biometric passport with 2+ years validity",
      "Medical fitness certificate"
    ],
    keyHighlights: [
      "New Unified Permit Law combines work and residence in one swift approval",
      "Serbian Embassy Islamabad conducts efficient, prompt document processing",
      "Low living expenses as company provides free meals, lodging, and transport"
    ]
  },
  {
    id: "uae-work-visit",
    name: "United Arab Emirates",
    flag: "🇦🇪",
    category: "both",
    tagline: "Tax-Free Earnings, Rapid Consular Approval & Global Commercial Hub",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
    visaSuccessRate: "99.1%",
    processingTime: "2 – 3 Weeks (Work) | 48 Hours (Tourist)",
    validity: "2 Years (Employment) | 30/60 Days (Visit)",
    salaryOrProof: "AED 2,500 – AED 8,500 / Month (Tax-Free)",
    permitTypeOrPurpose: "MOHRE 2-Year Employment Card or 30/60-Day Visit Visa",
    topSectorsOrDestinations: [
      "Retail, Corporate Sales & Real Estate",
      "Hospitality, Luxury Hotels & Fine Dining",
      "IT Support & Digital Marketing",
      "Dubai Tourism, Expo City & Shopping Festivals"
    ],
    requirements: [
      "Attested educational documents for professional designations",
      "Valid Pakistani passport with 6 months validity",
      "Passport-sized photograph with white background"
    ],
    keyHighlights: [
      "100% Tax-free monthly income and gratuity benefits",
      "Direct 3-hour flight connectivity from Islamabad International Airport",
      "Instant e-visa issuance with zero complicated embassy appointments"
    ]
  },
  {
    id: "malta-work",
    name: "Malta",
    flag: "🇲🇹",
    category: "work_permit",
    tagline: "English-Speaking Mediterranean EU Economy with High Foreign Demand",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
    visaSuccessRate: "93.5%",
    processingTime: "10 – 14 Weeks",
    validity: "1 Year Single Work Permit",
    salaryOrProof: "€1,100 – €2,200 / Month",
    permitTypeOrPurpose: "Single Permit Authorization (Identità Malta)",
    topSectorsOrDestinations: [
      "Hospitality, Restaurant Management & Bartending",
      "Healthcare, Nursing & Elderly Assistance",
      "Courier, Logistics & Dispatch Services",
      "Construction Trades & Equipment Technicians"
    ],
    requirements: [
      "Jobsplus Labor Market Clearance approval letter",
      "Police Certificate legalized by MOFA Islamabad",
      "Apostilled curriculum vitae and trade references"
    ],
    keyHighlights: [
      "English is an official national language across government and commerce",
      "Full European Schengen member with sunny Mediterranean lifestyle",
      "High remittance conversion rate for financial support back to Pakistan"
    ]
  },
  {
    id: "hungary-work",
    name: "Hungary",
    flag: "🇭🇺",
    category: "work_permit",
    tagline: "Central European Manufacturing & Logistics Hub for Skilled Workers",
    image: "https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=800&q=80",
    visaSuccessRate: "95.5%",
    processingTime: "7 – 10 Weeks",
    validity: "2 Years Renewable",
    salaryOrProof: "€850 – €1,500 / Month + Employer Housing",
    permitTypeOrPurpose: "Residence Permit for Employment (Type-D)",
    topSectorsOrDestinations: [
      "Automotive & Lithium Battery Manufacturing",
      "Automated Packing & Warehouse Inventory",
      "Hospitality & Hotel Housekeeping",
      "Commercial Greenhouse Farming"
    ],
    requirements: [
      "Prior labor authorization issued by Hungarian Government Office",
      "Police Character Certificate authenticated by MOFA",
      "Medical examination record"
    ],
    keyHighlights: [
      "Strategic central location in the heart of the Schengen Area",
      "Complimentary accommodation and organized commuting provided by employers",
      "Dependable European career growth with regulated working hours"
    ]
  },
  {
    id: "uk-visit",
    name: "United Kingdom",
    flag: "🇬🇧",
    category: "visit_visa",
    tagline: "Standard Visitor Visa for Tourism, Family Reunion & Business",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
    visaSuccessRate: "94.2%",
    processingTime: "3 – 6 Weeks (Priority Option: 5 Days)",
    validity: "6 Months Multi-Entry (2, 5 & 10-Year Long Term Available)",
    salaryOrProof: "Bank Balance PKR 1.8M – 3.0M + Tax Returns & Asset Proof",
    permitTypeOrPurpose: "UK Standard Visitor Visa (Tourism, Family, Business)",
    topSectorsOrDestinations: [
      "London, Edinburgh & Manchester Sightseeing",
      "Attending University Graduations of Relatives",
      "Business Conferences & Trade Conventions",
      "Family Visits to British Pakistani Relatives"
    ],
    requirements: [
      "6-Month Bank Statement reflecting steady legitimate financial turnover",
      "Proof of employment or business ownership in Pakistan (NTN, tax filings)",
      "Proof of accommodation in the UK or British host invitation letter",
      "Comprehensive travel itinerary demonstrating intent to return"
    ],
    keyHighlights: [
      "Detailed file curation by Senior Consultant Sher Muhammad Khan",
      "Tailored cover letter explaining economic and social ties to Pakistan",
      "VFS Global Islamabad priority biometric filing assistance"
    ]
  },
  {
    id: "schengen-visit",
    name: "Schengen Europe (France, Italy, Spain, Germany)",
    flag: "🇪🇺",
    category: "visit_visa",
    tagline: "One Single Visa Unlocks 27 European Countries without Border Checks",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    visaSuccessRate: "93.8%",
    processingTime: "3 – 5 Weeks",
    validity: "Up to 90 Days within a 180-Day Period",
    salaryOrProof: "Bank Statement PKR 1.5M – 2.5M + €30k Travel Insurance",
    permitTypeOrPurpose: "Uniform Schengen Short-Stay Type-C Visa",
    topSectorsOrDestinations: [
      "Eiffel Tower, Colosseum, Sagrada Familia & Berlin Monuments",
      "Visiting Children Enrolled in European Universities",
      "Attending Major European Trade Fairs (Milan, Frankfurt, Paris)",
      "Multi-Country Holiday Tours Across Western Europe"
    ],
    requirements: [
      "Genuine hotel reservations and verifiable flight round-trip bookings",
      "6 Months active bank statement with bank solvency letter",
      "Proof of employment, leave authorization or FBR tax documentation",
      "Accredited €30,000 Schengen travel health insurance"
    ],
    keyHighlights: [
      "Freedom of movement across 27 sovereign nations on one visa",
      "Expert dossier compilation designed to satisfy EU Visa Code articles",
      "Careful screening to prevent refusal on grounds of vague travel purpose"
    ]
  },
  {
    id: "usa-visit",
    name: "United States of America",
    flag: "🇺🇸",
    category: "visit_visa",
    tagline: "B1/B2 Visitor Visa for Tourism, Commercial Meetings & Family",
    image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=800&q=80",
    visaSuccessRate: "91.5%",
    processingTime: "Consular Interview at US Embassy Islamabad + 5 Days",
    validity: "5 Years Multiple Entry Visa",
    salaryOrProof: "Demonstrated Financial Solvency & Strong Ties to Pakistan",
    permitTypeOrPurpose: "B1/B2 Non-Immigrant Visitor Visa",
    topSectorsOrDestinations: [
      "New York, California, Washington & Florida Tourism",
      "Attending Academic Convocations and Family Weddings",
      "Medical Consultations & Advanced Diagnostic Checkups",
      "Corporate Conventions, Trade Shows & Investor Summits"
    ],
    requirements: [
      "Flawlessly completed DS-160 online application form",
      "Valid biometric Pakistani passport",
      "Appointment confirmation for US Embassy Islamabad interview",
      "Evidence of substantial economic, familial, and professional roots in Pakistan"
    ],
    keyHighlights: [
      "Intensive 1-on-1 mock interview preparation simulating Embassy officers",
      "Precise alignment of DS-160 responses with verbal declarations",
      "5-Year multiple entry grant allowing recurring visits up to 6 months per entry"
    ]
  },
  {
    id: "canada-visit",
    name: "Canada",
    flag: "🇨🇦",
    category: "visit_visa",
    tagline: "Temporary Resident Visa (TRV) & Multi-Year Super Visa",
    image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=800&q=80",
    visaSuccessRate: "92.0%",
    processingTime: "4 – 8 Weeks",
    validity: "Up to 10 Years (or until Passport Expiry) Multi-Entry",
    salaryOrProof: "Bank Statement PKR 2.0M – 3.5M + Property/Income Proof",
    permitTypeOrPurpose: "Temporary Resident Visa (TRV) / Visitor Visa (V-1)",
    topSectorsOrDestinations: [
      "Toronto, Vancouver, Banff & Niagara Falls Vacations",
      "Visiting Children and Relatives Settled in Canada",
      "Super Visa for Parents and Grandparents of Canadian Citizens",
      "Business Exploration & Investment Conferences"
    ],
    requirements: [
      "Comprehensive Purpose of Travel submission and Host Invitation",
      "Biometrics appointment at VAC Gerry's Islamabad",
      "Financial stability proof, salary slips, and Pakistan asset documentation"
    ],
    keyHighlights: [
      "Long-term multi-entry validity up to a full decade",
      "Direct online IRCC portal submission managed by Modernminds experts",
      "Detailed justification to address section 179(b) immigration compliance"
    ]
  },
  {
    id: "turkey-visit",
    name: "Turkey (Türkiye)",
    flag: "🇹🇷",
    category: "visit_visa",
    tagline: "Historic Istanbul, Bosphorus Holidays & Business Networking",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80",
    visaSuccessRate: "98.5%",
    processingTime: "7 – 14 Working Days (Instant E-Visa for US/UK/Schengen Visa Holders)",
    validity: "Single or Multiple Entry (30 to 90 Days)",
    salaryOrProof: "Bank Statement PKR 800,000 – 1,500,000",
    permitTypeOrPurpose: "Tourist Sticker Visa (via Anatolia Islamabad) or Official E-Visa",
    topSectorsOrDestinations: [
      "Istanbul Historic Palaces, Bazaars & Bosphorus Cruises",
      "Cappadocia Hot Air Ballooning & Cave Dwellings",
      "Mediterranean Beach Resorts in Antalya",
      "Textiles, Machinery & Commercial Trade Inquiries"
    ],
    requirements: [
      "3-Month Bank Statement stamped by branch manager",
      "Police Clearance Certificate",
      "Travel medical insurance coverage",
      "Hotel confirmation and round-trip flight reservation"
    ],
    keyHighlights: [
      "Instant eVisa if you hold a valid USA, UK, Schengen, or Ireland visa",
      "Fast submission through Anatolia Visa Center Islamabad",
      "Highly affordable family holiday with shared Islamic culture"
    ]
  },
  {
    id: "malaysia-visit",
    name: "Malaysia & Thailand",
    flag: "🇲🇾",
    category: "visit_visa",
    tagline: "Affordable Tropical Holidays, Shopping & Seamless Family Tours",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80",
    visaSuccessRate: "99.0%",
    processingTime: "3 – 7 Working Days",
    validity: "30 Days Single or Multiple Entry",
    salaryOrProof: "Bank Balance PKR 500,000 – 900,000",
    permitTypeOrPurpose: "Electronic Visa (eVisa) / Tourist Sticker Visa",
    topSectorsOrDestinations: [
      "Kuala Lumpur Petronas Towers & Genting Cable Cars",
      "Bangkok, Phuket & Pattaya Island Tours",
      "Budget Family Leisure Vacations",
      "Medical Tourism & Wellness Packages"
    ],
    requirements: [
      "Passport scan with at least 6 months validity",
      "Confirmed round-trip airline tickets",
      "Hotel booking voucher",
      "Recent bank account statement"
    ],
    keyHighlights: [
      "Lightning-fast approval with 99% documented track record",
      "Ideal initial international travel stamp for building a strong passport profile",
      "Completely paperless and convenient electronic application"
    ]
  }
];

export const SERVICES_LIST: ServiceDetail[] = [
  {
    id: "student-admission",
    title: "Student Admission with Complete Process",
    iconName: "GraduationCap",
    summary: "End-to-end university selection, application drafting, documentation attestation, and guaranteed official admission letters.",
    popularFor: "Undergraduate, Master's, and Doctoral Applicants",
    details: [
      "Comprehensive evaluation of academic transcripts and profile matching",
      "Direct application processing through our authorized university channels",
      "Securing official Ministry invitation letters and unconditional offers",
      "Tuition fee transfer advice through State Bank of Pakistan authorized channels"
    ],
    benefits: ["Zero application rejection risk", "Direct institutional representation", "Priority processing timeline"]
  },
  {
    id: "work-permit",
    title: "European Work Permits & Employment Visas",
    iconName: "Briefcase",
    summary: "Professional assistance in acquiring legal European work permits, employer contract verification, and consular work visa stamping.",
    popularFor: "Skilled Professionals, Tradesmen, Drivers & Factory Workers",
    details: [
      "Employer quota verification and labor ministry pre-approvals across Europe (Poland, Romania, Lithuania, Portugal, Serbia)",
      "Employment contract translation, legalization, and apostille verification",
      "Work visa category submission at respective embassies and consulates in Islamabad",
      "Extension of temporary residency (TRP / Karta Pobytu) and post-arrival work registrations"
    ],
    benefits: ["100% legal government-registered permits", "Strict contract protection", "Post-arrival residency filing"]
  },
  {
    id: "visit-visa",
    title: "Visit & Tourist Visas Worldwide",
    iconName: "Plane",
    summary: "Professional visa dossier compilation, bank statement structuring, confirmed itineraries, and embassy interview coaching for UK, USA, Schengen, Canada & Gulf.",
    popularFor: "Families, Business Travelers, Tourists & Parents Visiting Students Abroad",
    details: [
      "Expert bank solvency & financial ties documentation audit to prevent refusals",
      "Tailored travel itinerary, hotel confirmations, and verified flight reservations",
      "VFS Global, Gerry's, and Embassy Islamabad appointment scheduling",
      "Thorough review to prevent common refusals (section 214b or lack of return ties)"
    ],
    benefits: ["Flawless dossier documentation", "High visa grant ratios", "Fast-track appointment booking"]
  },
  {
    id: "visa-consultant",
    title: "Visa Consultant & Embassy Representation",
    iconName: "FileCheck2",
    summary: "Complete visa dossier drafting, financial sponsorship structuring, embassy appointment booking, and realistic interview drills.",
    popularFor: "Schengen, Eurasian, and Study Visa Applicants",
    details: [
      "Detailed financial proof, affidavit of support, and tax documentation audit",
      "Cover letter and study plan drafting aligned with embassy visa officers' criteria",
      "Embassy appointment acquisition at Islamabad diplomatic missions",
      "One-on-one mock interview drills simulating actual visa questions"
    ],
    benefits: ["98.8% documented visa success", "Avoid common rejection pitfalls", "Expert legal guidance by Sher Muhammad Khan"]
  },
  {
    id: "medical-services",
    title: "Medical & Clinical Degree Admissions",
    iconName: "Stethoscope",
    summary: "Specialized admissions to PMDC and WHO recognized MBBS/BDS programs in Belarus and Russia under Dr. Sayyed Numan Akbar.",
    popularFor: "Aspiring Doctors, Dentists, and Clinical Specialists",
    details: [
      "Curriculum alignment with Pakistan Medical and Dental Council (PMDC) guidelines",
      "Direct admission into 100% English-medium medical faculties",
      "Hospital clinical rotation verification and internship placements",
      "USMLE, PLAB, and NLE preparatory guidance during studies"
    ],
    benefits: ["Direct physician mentorship", "Approved PMDC foreign institutes", "Hands-on hospital rotations"]
  },
  {
    id: "article-services",
    title: "Academic Writing & Article Services",
    iconName: "BookOpenCheck",
    summary: "Expert research writing, Statement of Purpose (SOP), Letters of Recommendation (LOR), research proposals, and academic articles.",
    popularFor: "Scholarship Applicants, Master's & PhD Candidates",
    details: [
      "Custom-crafted Statement of Purpose (SOP) tailored to visa officers & admissions",
      "Academic Letter of Recommendation (LOR) structuring",
      "Research proposals for European scholarship grants (e.g., DSU Italy, Turkiye Burslari)",
      "Proofreading, plagiarism checking, and academic grammar polishing"
    ],
    benefits: ["Plagiarism-free content", "Compelling personal narratives", "High scholarship conversion"]
  },
  {
    id: "support-24-7",
    title: "24/7 Student Overseas Support",
    iconName: "Headphones",
    summary: "Continuous assistance from departure in Pakistan to graduation day abroad, including emergency hotlines and local coordinators.",
    popularFor: "All enrolled Pakistani students and their families",
    details: [
      "Emergency contact helpline operating 24 hours a day, 7 days a week",
      "On-ground coordinators in Minsk, Moscow, Lisbon, Rome, Istanbul, and Belgrade",
      "Dormitory check-in, apartment lease assistance, and local SIM card setup",
      "Student bank account opening and residence permit (TRC) assistance"
    ],
    benefits: ["Peace of mind for parents", "Smooth cultural transition", "Rapid emergency resolution"]
  },
  {
    id: "documentation-assistance",
    title: "Comprehensive Documentation & Attestation",
    iconName: "ShieldCheck",
    summary: "Flawless document preparation, IBCC, HEC, MOFA attestations, legal certified translations, and apostille services.",
    popularFor: "All international document verification needs",
    details: [
      "Guidance for Inter Board Committee of Chairmen (IBCC) attestation",
      "Higher Education Commission (HEC) degree verification and equivalence",
      "Ministry of Foreign Affairs (MOFA) Islamabad stamping service guidance",
      "Sworn and court-certified translation into Russian, Portuguese, Italian, Turkish, Serbian"
    ],
    benefits: ["Error-free submission", "Expedited processing", "Full compliance with foreign embassies"]
  },
  {
    id: "pre-departure",
    title: "Pre-Departure Orientation Sessions",
    iconName: "PlaneTakeoff",
    summary: "Structured briefing workshops for prospective students and parents on airport transit, luggage rules, laws, and cultural adaptation.",
    popularFor: "All departing students prior to international flights",
    details: [
      "Luggage allowances, medical kit packing, and winter clothing advisory",
      "Transit airport navigation (Istanbul, Dubai, Doha) and immigration protocols",
      "Foreign currency carrying limits and international student forex cards",
      "Crucial legal do's and don'ts in the destination country"
    ],
    benefits: ["Confidence on travel day", "Avoid customs hassles", "Parent reassurance"]
  }
];

export const FAQS_LIST: FaqItem[] = [
  {
    id: "faq-1",
    category: "general",
    question: "Where is Modernminds Consulting Services (MCS) located in Islamabad?",
    answer: "Our head office is situated in Islamabad at Office 402, 4th Floor, Executive Heights, Blue Area, Islamabad. You can visit us Monday through Saturday (9:30 AM to 6:30 PM PKT) for in-person counseling, or reach us via our hotlines 051-4862273 and 03002346521."
  },
  {
    id: "faq-2",
    category: "countries",
    question: "Which destination countries do you specialize in?",
    answer: "We specialize in Belarus, Russia, Portugal, Italy, Turkey, Serbia, Poland, Romania, Lithuania, the UK, and USA. Each destination has dedicated case officers who handle admissions, work permits, tourist visas, and embassy submissions."
  },
  {
    id: "faq-3",
    category: "visas",
    question: "What is the visa success rate of Modernminds Consulting Services?",
    answer: "Our verified visa success rate stands at 98.8%. Led by our senior visa consultant Sher Muhammad Khan, we run multi-stage document audits, mock interview preparations, and financial proof vetting to prevent visa refusals before the file reaches the embassy."
  },
  {
    id: "faq-4",
    category: "admissions",
    question: "Can I study MBBS in Belarus or Russia without IELTS?",
    answer: "Yes! Many top state medical universities in Belarus and Russia offer 100% English-medium General Medicine (MBBS) and Dentistry (BDS) without requiring an IELTS exam. Admissions are granted based on your F.Sc Pre-Medical grades (minimum 60%) and an institutional interview conducted under Dr. Sayyed Numan Akbar's supervision."
  },
  {
    id: "faq-5",
    category: "finance",
    question: "How does the Italian DSU Scholarship work for Pakistani students?",
    answer: "The Italian Government DSU (Diritto allo Studio Universitario) scholarship is a regional need-based grant providing up to €7,200 per year, full tuition fee exemption, and free meal vouchers. We help you gather the required family income, property, and wealth documents with necessary MOFA attestations to maximize your scholarship approval."
  },
  {
    id: "faq-6",
    category: "general",
    question: "Do you provide assistance with work permits and post-study work?",
    answer: "Yes, we handle work permit processing for European countries like Portugal and Serbia, as well as student work rights advisories. For Portugal, graduates can transition to job seeker visas and residency permits seamlessly."
  },
  {
    id: "faq-7",
    category: "general",
    question: "What does your 24/7 student support entail?",
    answer: "Our 24/7 support means you are never alone abroad. We provide airport reception, hostel/apartment placement, resident registration (TRC), local SIM cards, emergency medical coordination, and continuous communication with your parents in Pakistan."
  }
];

// Initial demo users for Auth
export const INITIAL_USERS: User[] = [
  {
    id: "user-admin-1",
    name: "Ali Anwar",
    email: "admin@modernminds.pk",
    phone: "051-4862273",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    city: "Islamabad",
    createdAt: "2024-01-15T10:00:00Z"
  },
  {
    id: "user-student-1",
    name: "Hamza Ali Khan",
    email: "hamza.ali@gmail.com",
    phone: "0312-9876543",
    role: "student",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
    targetCountry: "Belarus",
    city: "Rawalpindi",
    createdAt: "2024-02-10T14:30:00Z"
  },
  {
    id: "user-student-2",
    name: "Ayesha Malik",
    email: "ayesha.malik@outlook.com",
    phone: "0333-5551234",
    role: "student",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    targetCountry: "Italy",
    city: "Islamabad",
    createdAt: "2024-02-18T11:15:00Z"
  },
  {
    id: "user-work-1",
    name: "Tariq Mahmood",
    email: "tariq.work@gmail.com",
    phone: "0300-8899112",
    role: "client",
    applicantCategory: "work_permit",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    targetCountry: "Poland",
    city: "Lahore",
    createdAt: "2024-03-01T09:00:00Z"
  },
  {
    id: "user-visit-1",
    name: "Zainab Bibi",
    email: "zainab.visit@gmail.com",
    phone: "0321-4433221",
    role: "client",
    applicantCategory: "visit_visa",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    targetCountry: "United Kingdom",
    city: "Islamabad",
    createdAt: "2024-03-05T14:20:00Z"
  }
];

// Initial Applications
export const INITIAL_APPLICATIONS: StudentApplication[] = [
  {
    id: "app-hamza-01",
    studentId: "user-student-1",
    studentName: "Hamza Ali Khan",
    studentEmail: "hamza.ali@gmail.com",
    studentPhone: "0312-9876543",
    targetCountry: "Belarus",
    program: "General Medicine (MBBS - 6 Years, English Medium)",
    university: "Belarusian State Medical University (Minsk)",
    intake: "Fall 2026",
    serviceType: "Student Admission & Visa Processing",
    currentStage: "visa_file_prep",
    progressPercentage: 65,
    assignedCounselor: "Sher Muhammad Khan",
    lastUpdated: "2026-09-20T16:45:00Z",
    caseRef: "MCS-BY-2026-089",
    milestones: [
      {
        id: "m1",
        stage: "initial_assessment",
        title: "Initial Profile & Document Evaluation",
        description: "F.Sc Pre-Medical credentials and eligibility assessment completed by Dr. Sayyed Numan Akbar.",
        status: "completed",
        completedDate: "2026-07-15",
        remarks: "Eligibility verified with 78% marks in F.Sc."
      },
      {
        id: "m2",
        stage: "document_attestation",
        title: "IBCC & MOFA Attestation",
        description: "Matric, F.Sc, and Police Clearance certificates attested at Ministry of Foreign Affairs Islamabad.",
        status: "completed",
        completedDate: "2026-08-02",
        remarks: "Attestations completed and notarized."
      },
      {
        id: "m3",
        stage: "university_admission",
        title: "University Application Submission",
        description: "Formal application forwarded to Ministry of Education of the Republic of Belarus.",
        status: "completed",
        completedDate: "2026-08-18",
        remarks: "Application acknowledged with registration no. BSMU-7721."
      },
      {
        id: "m4",
        stage: "offer_letter",
        title: "Official Ministry Invitation Letter Issued",
        description: "Original state study invitation letter received at MCS Islamabad office.",
        status: "completed",
        completedDate: "2026-09-05",
        remarks: "Original hard copy secured for embassy submission."
      },
      {
        id: "m5",
        stage: "visa_file_prep",
        title: "Visa Dossier & Financial File Assembly",
        description: "Sher Muhammad Khan preparing embassy file, medical tests, and insurance coverage.",
        status: "in_progress",
        actionRequired: "Submit bank statement maintenance certificate to Blue Area office.",
        remarks: "File 85% ready. Appointment booking in queue."
      },
      {
        id: "m6",
        stage: "embassy_interview",
        title: "Embassy Visa Submission & Interview",
        description: "Appearance at Embassy of Belarus in Islamabad for biometric and visa stamping.",
        status: "upcoming"
      },
      {
        id: "m7",
        stage: "visa_approved",
        title: "Visa Granted & Passport Collection",
        description: "Receiving stamped student entry visa from the consular section.",
        status: "upcoming"
      },
      {
        id: "m8",
        stage: "pre_departure",
        title: "Pre-Departure Briefing & Airport Transit",
        description: "Orientation at MCS office and flight coordination to Minsk International Airport.",
        status: "upcoming"
      }
    ]
  },
  {
    id: "app-ayesha-02",
    studentId: "user-student-2",
    studentName: "Ayesha Malik",
    studentEmail: "ayesha.malik@outlook.com",
    studentPhone: "0333-5551234",
    targetCountry: "Italy",
    program: "M.Sc. Data Science & Engineering",
    university: "Politecnico di Milano",
    intake: "Winter 2026",
    serviceType: "Admissions + DSU Scholarship + Schengen Visa",
    currentStage: "offer_letter",
    progressPercentage: 50,
    assignedCounselor: "Ali Anwar",
    lastUpdated: "2026-09-18T12:00:00Z",
    caseRef: "MCS-IT-2026-114",
    milestones: [
      {
        id: "m1",
        stage: "initial_assessment",
        title: "Initial Profile & Document Evaluation",
        description: "BS Computer Science CGPA 3.65 assessed for Italian public universities.",
        status: "completed",
        completedDate: "2026-06-20"
      },
      {
        id: "m2",
        stage: "document_attestation",
        title: "HEC & MOFA Attestation & CIMEA",
        description: "Degree and transcript verified by HEC Islamabad; CIMEA Statement of Comparability initiated.",
        status: "completed",
        completedDate: "2026-07-10"
      },
      {
        id: "m3",
        stage: "university_admission",
        title: "Universitaly & Politecnico Submission",
        description: "Application submitted with tailored SOP and Letters of Recommendation.",
        status: "completed",
        completedDate: "2026-08-01"
      },
      {
        id: "m4",
        stage: "offer_letter",
        title: "Admission Confirmed & DSU Filing",
        description: "Conditional offer letter received from Politecnico di Milano. DSU scholarship application lodged.",
        status: "in_progress",
        actionRequired: "Provide updated family FBR tax returns.",
        remarks: "Ranking favorable for €7,200/year DSU grant."
      },
      {
        id: "m5",
        stage: "visa_file_prep",
        title: "Schengen Visa File Preparation",
        description: "Compiling financial support and DOV for Italian Embassy Islamabad.",
        status: "upcoming"
      },
      {
        id: "m6",
        stage: "embassy_interview",
        title: "Embassy Appointment & Biometrics",
        description: "Visa submission at Gerry's / Italian Embassy Islamabad.",
        status: "upcoming"
      },
      {
        id: "m7",
        stage: "visa_approved",
        title: "Schengen National D-Visa Granted",
        description: "Passport collection with endorsed study visa.",
        status: "upcoming"
      },
      {
        id: "m8",
        stage: "pre_departure",
        title: "Pre-Departure & Milan Welcome",
        description: "Flight booking, housing in Milan, and Codice Fiscale arrangement.",
        status: "upcoming"
      }
    ]
  },
  {
    id: "app-tariq-03",
    studentId: "user-work-1",
    studentName: "Tariq Mahmood",
    studentEmail: "tariq.work@gmail.com",
    studentPhone: "0300-8899112",
    targetCountry: "Poland",
    category: "work_permit",
    program: "Type-D Work Permit (Voivodeship) - Logistics Specialist",
    university: "Warsaw Logistics Hub & Transport S.A.",
    intake: "Autumn Quota 2026",
    serviceType: "European Work Permit & Employment Visa",
    occupationOrField: "Supply Chain & Logistics Specialist",
    permitType: "Type-D National Work Visa (1-3 Years Renewable)",
    currentStage: "work_permit_issued",
    progressPercentage: 75,
    assignedCounselor: "Sher Muhammad Khan",
    lastUpdated: "2026-09-22T10:30:00Z",
    caseRef: "MCS-PL-WP-2026-302",
    milestones: [
      {
        id: "m1",
        stage: "initial_assessment",
        title: "Trade Skills & Occupational Assessment",
        description: "Review of 5 years logistics documentation, driver/equipment certifications, and passport.",
        status: "completed",
        completedDate: "2026-06-12",
        remarks: "Approved for Polish Voivodeship sponsorship quota."
      },
      {
        id: "m2",
        stage: "labor_market_approval",
        title: "Polish Labor Market Clearance & Job Offer",
        description: "Employer filed test with local labor office in Warsaw; labor clearance certificate issued.",
        status: "completed",
        completedDate: "2026-07-28",
        remarks: "Official employment contract signed with €1,450/month base salary."
      },
      {
        id: "m3",
        stage: "work_permit_issued",
        title: "Voivodeship Work Permit Approval (Zezwolenie na Pracę)",
        description: "Official provincial government work permit issued and courier dispatched to Islamabad.",
        status: "completed",
        completedDate: "2026-09-02",
        remarks: "Original Voivodeship permit received at MCS Blue Area office."
      },
      {
        id: "m4",
        stage: "visa_file_prep",
        title: "National D-Visa Dossier & Medical Insurance",
        description: "Compiling Polish Embassy Islamabad file, €30,000 Schengen insurance, and biometric slot.",
        status: "in_progress",
        actionRequired: "Collect passport size biometrics photos and finalize bank maintenance certificate.",
        remarks: "Submission file 90% assembled."
      },
      {
        id: "m5",
        stage: "embassy_interview",
        title: "Embassy Visa Appointment (Islamabad)",
        description: "Biometrics and file submission at Embassy of the Republic of Poland in Islamabad.",
        status: "upcoming"
      },
      {
        id: "m6",
        stage: "visa_approved",
        title: "Work Visa Grant & Passport Stamping",
        description: "Passport collection with National Type-D Employment Visa sticker.",
        status: "upcoming"
      },
      {
        id: "m7",
        stage: "pre_departure",
        title: "Employer Liaison & Warsaw Flight Briefing",
        description: "Airport pick-up coordination, housing handover in Warsaw, and residency registration (PESEL).",
        status: "upcoming"
      }
    ]
  },
  {
    id: "app-zainab-04",
    studentId: "user-visit-1",
    studentName: "Zainab Bibi & Family",
    studentEmail: "zainab.visit@gmail.com",
    studentPhone: "0321-4433221",
    targetCountry: "United Kingdom",
    category: "visit_visa",
    program: "UK Standard Visitor Visa (6 Months Multiple Entry)",
    university: "London, Manchester & Scottish Highlands Tour",
    intake: "Winter Holidays 2026",
    serviceType: "Worldwide Visit & Tourist Visas",
    occupationOrField: "Commercial Business Owner & Family Traveler",
    permitType: "Tourist / Family Visitor (6-Month Multiple)",
    currentStage: "financial_ties_vetting",
    progressPercentage: 60,
    assignedCounselor: "Sher Muhammad Khan",
    lastUpdated: "2026-09-21T15:10:00Z",
    caseRef: "MCS-UK-VV-2026-518",
    milestones: [
      {
        id: "m1",
        stage: "initial_assessment",
        title: "Travel History & Visit Purpose Assessment",
        description: "Detailed interview regarding proposed itinerary, accommodations, and genuine tourist intent.",
        status: "completed",
        completedDate: "2026-08-14",
        remarks: "Approved for full family dossier filing."
      },
      {
        id: "m2",
        stage: "financial_ties_vetting",
        title: "Home Ties & Financial Audit (FBR & Bank)",
        description: "Auditing 6-month bank statement (PKR 3.8M), FBR tax returns, and property deeds in Islamabad.",
        status: "in_progress",
        actionRequired: "Provide updated bank maintenance letter signed by branch manager.",
        remarks: "Strong socioeconomic ties demonstrated."
      },
      {
        id: "m3",
        stage: "document_attestation",
        title: "NADRA FRC & Sponsor Invitation Review",
        description: "NADRA Family Registration Certificate (FRC) and verifiable UK hotel bookings compiled.",
        status: "completed",
        completedDate: "2026-09-10"
      },
      {
        id: "m4",
        stage: "visa_file_prep",
        title: "UK Visas and Immigration (UKVI) Online Lodgment",
        description: "Drafting comprehensive legal cover letter explaining purpose, self-funding, and return guarantee.",
        status: "upcoming"
      },
      {
        id: "m5",
        stage: "biometrics_scheduled",
        title: "Gerry's / VFS Global Biometrics Slot",
        description: "Digital fingerprinting and photo capture at VFS Islamabad.",
        status: "upcoming"
      },
      {
        id: "m6",
        stage: "visa_approved",
        title: "UK Visitor Visa Grant",
        description: "Passport delivery via courier with valid 6-month UK entry vignette.",
        status: "upcoming"
      }
    ]
  }
];

// Initial Documents
export const INITIAL_DOCUMENTS: StudentDocument[] = [
  {
    id: "doc-1",
    userId: "user-student-1",
    studentName: "Hamza Ali Khan",
    title: "International Passport (Color Scan)",
    type: "passport",
    fileName: "Hamza_Ali_Passport_Front_Back.pdf",
    fileSize: "2.4 MB",
    uploadDate: "2026-07-10",
    status: "verified",
    notes: "Verified by Sher Muhammad Khan. 24 months validity intact."
  },
  {
    id: "doc-2",
    userId: "user-student-1",
    studentName: "Hamza Ali Khan",
    title: "F.Sc Pre-Medical Transcript & Certificate",
    type: "academic_fsc_degree",
    fileName: "Hamza_FSc_Marksheet_IBCC_MOFA.pdf",
    fileSize: "4.1 MB",
    uploadDate: "2026-08-01",
    status: "verified",
    notes: "IBCC & MOFA QR stamps validated."
  },
  {
    id: "doc-3",
    userId: "user-student-1",
    studentName: "Hamza Ali Khan",
    title: "Police Clearance Certificate",
    type: "police_clearance",
    fileName: "Police_Clearance_Rawalpindi_MOFA.pdf",
    fileSize: "1.8 MB",
    uploadDate: "2026-08-04",
    status: "verified",
    notes: "Issued within 90 days requirement."
  },
  {
    id: "doc-4",
    userId: "user-student-1",
    studentName: "Hamza Ali Khan",
    title: "Sponsor Bank Statement & Maintenance Letter",
    type: "bank_statement",
    fileName: "Bank_Statement_6Months_HBL.pdf",
    fileSize: "5.6 MB",
    uploadDate: "2026-09-18",
    status: "under_review",
    notes: "Reviewing closing balance consistency against Embassy of Belarus thresholds."
  },
  {
    id: "doc-5",
    userId: "user-student-2",
    studentName: "Ayesha Malik",
    title: "BS Degree & Transcript (HEC Attested)",
    type: "academic_fsc_degree",
    fileName: "Ayesha_BS_CS_Degree_HEC.pdf",
    fileSize: "3.8 MB",
    uploadDate: "2026-07-08",
    status: "verified",
    notes: "Compliant with Universitaly pre-enrollment requirement."
  },
  {
    id: "doc-6",
    userId: "user-student-2",
    studentName: "Ayesha Malik",
    title: "Family Wealth & Income Certificate",
    type: "other",
    fileName: "Income_Certificate_Tehsildar_Attested.pdf",
    fileSize: "2.1 MB",
    uploadDate: "2026-09-14",
    status: "needs_revision",
    notes: "Please provide translation into Italian along with MOFA seal for DSU scholarship."
  },
  {
    id: "doc-7",
    userId: "user-work-1",
    studentName: "Tariq Mahmood",
    title: "Official Voivodeship Work Permit (Poland)",
    type: "employment_contract",
    fileName: "Zezwolenie_Wojewodzkie_Typ_D_Warszawa.pdf",
    fileSize: "3.2 MB",
    uploadDate: "2026-09-03",
    status: "verified",
    notes: "Original hardcopy verified by Sher Muhammad Khan. Ready for Polish Embassy."
  },
  {
    id: "doc-8",
    userId: "user-work-1",
    studentName: "Tariq Mahmood",
    title: "5-Year Logistics Work Experience Certificates",
    type: "work_experience",
    fileName: "Tariq_Logistics_Experience_Notarized.pdf",
    fileSize: "4.5 MB",
    uploadDate: "2026-06-15",
    status: "verified",
    notes: "Company letterhead and tax verification confirmed."
  },
  {
    id: "doc-9",
    userId: "user-visit-1",
    studentName: "Zainab Bibi & Family",
    title: "6-Month Bank Statement & Maintenance Letter",
    type: "bank_statement",
    fileName: "Bank_AlHabib_6Month_Statement_3.8M.pdf",
    fileSize: "6.1 MB",
    uploadDate: "2026-09-12",
    status: "verified",
    notes: "PKR 3.8M balance verified. Healthy turnover and genuine funding source."
  },
  {
    id: "doc-10",
    userId: "user-visit-1",
    studentName: "Zainab Bibi & Family",
    title: "FBR Tax Returns & Wealth Statements",
    type: "tax_fbr_record",
    fileName: "FBR_Active_Taxpayer_Returns_2024_2025.pdf",
    fileSize: "2.9 MB",
    uploadDate: "2026-09-15",
    status: "verified",
    notes: "Active taxpayer status verified on FBR Iris portal."
  }
];

// Initial Notifications
export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    userId: "user-student-1",
    title: "🎉 Official Study Invitation Letter Received!",
    message: "Your study invitation letter from Belarusian State Medical University has arrived at our Islamabad office. Sher Muhammad Khan is compiling your embassy visa file.",
    timestamp: "2026-09-05T10:30:00Z",
    isRead: false,
    type: "milestone"
  },
  {
    id: "notif-2",
    userId: "user-student-1",
    title: "Document Verified: Police Clearance",
    message: "Your Police Clearance Certificate has been verified and approved for embassy submission.",
    timestamp: "2026-08-05T14:20:00Z",
    isRead: true,
    type: "document"
  },
  {
    id: "notif-3",
    userId: "user-student-2",
    title: "DSU Scholarship Filing Milestone Alert",
    message: "Your DSU regional scholarship application for Politecnico di Milano has been filed. Please upload the revised Italian income translation.",
    timestamp: "2026-09-15T09:00:00Z",
    isRead: false,
    type: "milestone"
  },
  {
    id: "notif-4",
    userId: "all",
    title: "📢 Islamabad Office Seminar: European Work Permits & Schengen Visas",
    message: "Modernminds Consulting Services is hosting a free walk-in seminar this Saturday at Executive Heights, Blue Area, Islamabad. Call 051-4862273 to reserve a seat.",
    timestamp: "2026-09-19T08:00:00Z",
    isRead: false,
    type: "alert"
  }
];

// Initial Contact Leads
export const INITIAL_LEADS: ContactInquiry[] = [
  {
    id: "lead-1",
    fullName: "Muhammad Rizwan",
    email: "rizwan.engr@gmail.com",
    phone: "0301-4433221",
    city: "Lahore",
    targetCountry: "Portugal",
    serviceRequired: "Work Permit & Job Seeker Visa",
    qualification: "B.Sc Mechanical Engineering (PEC Registered)",
    message: "Looking for European work permit in Portugal or Serbia. I have 4 years of industrial experience in manufacturing.",
    createdAt: "2026-09-20T14:15:00Z",
    status: "new"
  },
  {
    id: "lead-2",
    fullName: "Zainab Fatima",
    email: "zainab.premed@yahoo.com",
    phone: "0345-9988776",
    city: "Peshawar",
    targetCountry: "Belarus",
    serviceRequired: "MBBS Admission (Medical)",
    qualification: "F.Sc Pre-Medical (82% marks)",
    message: "Interested in MBBS at Belarusian State Medical University or Vitebsk. Please advise on tuition fees and hostel accommodations.",
    createdAt: "2026-09-19T18:40:00Z",
    status: "assessment_scheduled",
    notes: "Appointment scheduled for telephonic consultation with Dr. Sayyed Numan Akbar."
  },
  {
    id: "lead-3",
    fullName: "Bilal Tariq",
    email: "bilal.tariq@gmail.com",
    phone: "0321-7766554",
    city: "Islamabad",
    targetCountry: "Italy",
    serviceRequired: "Master Admission with DSU Scholarship",
    qualification: "BBA Marketing (CGPA 3.4)",
    message: "Want to apply for English-taught Master programs in Rome or Milan with complete DSU scholarship assistance.",
    createdAt: "2026-09-18T10:20:00Z",
    status: "contacted",
    notes: "Shabana Khan called and shared the DSU document checklist."
  }
];

// Default Admin Credentials
export const DEFAULT_ADMIN_CREDENTIALS: AdminCredentials = {
  username: "admin",
  password: "admin123",
  displayName: "Ali Anwar",
  email: "admin@modernminds.pk",
  updatedAt: "2026-09-01T00:00:00Z"
};

// Initial Verified Job Opportunities with Designed Brochures
export const INITIAL_JOB_OPPORTUNITIES: JobOpportunity[] = [
  {
    id: "job-pl-01",
    title: "International Heavy Fleet Driver (Category CE)",
    country: "Poland",
    countryFlag: "🇵🇱",
    sector: "Logistics & Transport",
    companyName: "EuroLogistics Trans Sp. z o.o.",
    location: "Warsaw & Katowice, Poland",
    salary: "€1,400 – €2,100 / Month + Overtime",
    vacanciesCount: "35 Open Vacancies",
    contractDuration: "2 Years (Renewable with TRC / Karta Pobytu)",
    accommodationBenefits: "Free Driver Cabin / Shared Apartment & Medical Insurance",
    deadline: "November 25, 2026",
    requirements: [
      "Valid Pakistani HTV / Commercial Driver's License (Minimum 2 years experience)",
      "Police Character Clearance Certificate attested by MOFA Islamabad",
      "Medical & Fitness Examination for long-haul routes",
      "Basic English or willingness to undergo route orientation"
    ],
    brochureUrl: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80",
    brochureTheme: "navy",
    isFeatured: true,
    postedAt: "2026-09-28T10:00:00Z"
  },
  {
    id: "job-ro-02",
    title: "Commercial Building Electrician & Cable Technician",
    country: "Romania",
    countryFlag: "🇷🇴",
    sector: "Construction & Engineering",
    companyName: "Danube Metro Builders S.R.L.",
    location: "Bucharest & Cluj-Napoca, Romania",
    salary: "€850 – €1,400 / Month + Free Overtime",
    vacanciesCount: "50 Open Vacancies",
    contractDuration: "2 Years Unified Permit (Aviz de Muncă)",
    accommodationBenefits: "Free Company Accommodation, Lunch & Transport Included",
    deadline: "December 10, 2026",
    requirements: [
      "Vocational Trade / DAE Diploma or verified experience letter",
      "Knowledge of electrical wiring, circuit breakers, and conduit piping",
      "Clean criminal record attested by MOFA",
      "Biometric Pakistani passport with 2+ years validity"
    ],
    brochureUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
    brochureTheme: "emerald",
    isFeatured: true,
    postedAt: "2026-09-25T12:30:00Z"
  },
  {
    id: "job-lt-03",
    title: "Warehouse Inventory & Automated Forklift Operator",
    country: "Lithuania",
    countryFlag: "🇱🇹",
    sector: "Warehousing & Supply Chain",
    companyName: "Baltic Hub Distribution UAB",
    location: "Vilnius & Kaunas, Lithuania",
    salary: "€1,100 – €1,650 / Month",
    vacanciesCount: "25 Open Vacancies",
    contractDuration: "1 to 2 Years Renewable (MIGRIS TRP)",
    accommodationBenefits: "Subsidized Modern Apartment (€100/mo) + Full Health Cover",
    deadline: "November 30, 2026",
    requirements: [
      "Prior experience in warehouse picking, palletization, or forklift handling",
      "Ability to handle handheld barcode scanner systems",
      "Police Certificate legalized by MOFA Islamabad",
      "Age 20 – 45 years"
    ],
    brochureUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    brochureTheme: "amber",
    isFeatured: true,
    postedAt: "2026-09-22T08:15:00Z"
  },
  {
    id: "job-hu-04",
    title: "Automotive Assembly & EV Battery Pack Assembler",
    country: "Hungary",
    countryFlag: "🇭🇺",
    sector: "Manufacturing & Automotive",
    companyName: "Magyar Green Energy Kft.",
    location: "Debrecen, Hungary",
    salary: "€950 – €1,500 / Month + Night Shift Bonus",
    vacanciesCount: "40 Open Vacancies",
    contractDuration: "2 Years Type-D Residence Permit",
    accommodationBenefits: "100% Free Shared Accommodation & Daily Factory Commute",
    deadline: "December 05, 2026",
    requirements: [
      "Secondary school certificate (Matric / Intermediate / Technical)",
      "Good hand-eye coordination for precision assembly line work",
      "Standard physical fitness checkup",
      "No prior Schengen visa refusal on criminal grounds"
    ],
    brochureUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    brochureTheme: "navy",
    isFeatured: false,
    postedAt: "2026-09-18T14:00:00Z"
  },
  {
    id: "job-mt-05",
    title: "Hospitality Line Cook & Chef de Partie",
    country: "Malta",
    countryFlag: "🇲🇹",
    sector: "Hospitality & Tourism",
    companyName: "Azure Coast Resort & Hotels Ltd.",
    location: "St. Julian's & Valletta, Malta",
    salary: "€1,200 – €1,800 / Month + Tips & Service Charges",
    vacanciesCount: "15 Open Vacancies",
    contractDuration: "1 Year Single Work Permit (Identità Malta)",
    accommodationBenefits: "Shared Staff Housing & Free Duty Meals",
    deadline: "December 15, 2026",
    requirements: [
      "Minimum 2 years commercial culinary or restaurant experience",
      "Food safety hygiene certification or vocational hospitality diploma",
      "Jobsplus Malta labor pre-approval processing via MCS",
      "Passionate culinary enthusiasm and teamwork"
    ],
    brochureUrl: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80",
    brochureTheme: "crimson",
    isFeatured: true,
    postedAt: "2026-09-15T11:45:00Z"
  }
];

// Default Public Warning / Fraud Alert Disclaimer Popup
export const DEFAULT_DISCLAIMER_POPUP: DisclaimerPopupSettings = {
  isEnabled: true,
  warningLevel: 'critical',
  badgeText: 'PUBLIC NOTICE & FRAUD WARNING',
  title: 'Important Disclaimer: Beware of Unauthorized Agents & Fraudulent Impersonators',
  subtitle: 'Modernminds Consulting Services (Pvt) Ltd Official Public Advisory Notice',
  personName: 'Reported Unauthorized Individual / Impersonator',
  personRoleOrAlias: 'Operating with Fake Representation & Unverified Foreign Work Claims',
  personImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
  personCnicOrDetails: 'Caution: Unauthorized person collecting private cash fees or distributing fake visa letters without MCS authorization.',
  warningMessage: 'Modernminds Consulting Services (Pvt) Ltd (SECP Registration No. SECP-ISB-2018-0941) hereby explicitly informs the public that the pictured individual and any unauthorized sub-agents are NOT permitted to represent MCS or collect any money, cash payments, or original documents.',
  bulletPoints: [
    'Strict No Cash Policy: Modernminds never accepts cash payments in public, at home, or through unauthorized personal accounts.',
    'Official Bank Verification: All genuine consultation fees are solely paid into our registered Modernminds Corporate Bank Accounts with official printed & stamped invoices.',
    'Head Office Only: All contracts and consultations take place exclusively at our Islamabad Head Office (Executive Heights, Blue Area).',
    'Verify Immediately: If any individual approaches you claiming affiliation with MCS, immediately report or verify via our Head Office Hotline: 051-4862273 or 0300-2346521.'
  ],
  officialNotice: 'Modernminds Consulting Services accepts zero legal or financial liability for unofficial transactions entered into with unauthorized persons outside our documented Islamabad office process.',
  showOnEveryVisit: true,
  updatedAt: new Date().toISOString()
};


