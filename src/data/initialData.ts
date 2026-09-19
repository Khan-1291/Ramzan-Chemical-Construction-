import { CompanyProfile, Service, ClientLogo, ProcessStep, FAQItem, CostEstimatorSystem, CMSFramework, Project } from '../types';

export const COMPANY_PROFILE: CompanyProfile = {
  legalName: "RAMZAN CHEMICAL CONSTRUCTION (PRIVATE) LIMITED",
  incorporationNo: "0350813",
  fbrRegistrationNo: "J664738",
  referenceNo: "J664738-7",
  taxOffice: "RTO PESHAWAR",
  address: "Office No. 38, Near Bypass, Abaseen Adda, Yousafzai Market, Mardan, Khyber Pakhtunkhwa, Pakistan",
  phone: "+92 345 9191020",
  phoneDisplay: "0345-9191020",
  phoneEmergency: "+92 345 9191020",
  email: "info@ramzanchemical.com",
  whatsappNumber: "923459191020",
  whatsappMessage: "Hello Ramzan Chemical Construction, I would like to request a quotation and technical site survey for my project.",
  workingHours: "Monday – Saturday: 8:00 AM – 7:00 PM (Emergency Seepage Support 24/7)"
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "proj-1-nlc-epoxy",
    title: "Industrial Epoxy Flooring Application",
    client: "NLC",
    category: "Epoxy Flooring",
    secondaryCategory: "Industrial Solutions",
    location: "Pakistan",
    year: 2024,
    status: "Completed",
    featured: true,
    imageUrl: "/images/project-1.jpeg",
    description: "Professional supply and application of durable industrial epoxy flooring executed using quality construction chemicals and modern application techniques for NLC.",
    chemicalsUsed: [
      "Industrial Epoxy Flooring Resin",
      "Epoxy Primer",
      "Protective Topcoat"
    ],
    highlights: [
      "Reliable, durable, and cost-effective flooring solution",
      "High-gloss seamless finish with quality construction chemicals",
      "Executed with modern application techniques and professional service",
      "Delivered with a commitment to quality workmanship and customer satisfaction"
    ],
    beforeAfterImages: [
      "/images/project-2.jpeg",
      "/images/project-3.jpeg",
      "/images/project-16.jpeg"
    ],
    createdAt: "2024-01-15T08:00:00.000Z"
  },
  {
    id: "proj-2-toyota-epoxy",
    title: "Commercial Workshop Epoxy Flooring",
    client: "Toyota Corolla",
    category: "Epoxy Flooring",
    secondaryCategory: "Commercial Solutions",
    location: "Pakistan",
    year: 2023,
    status: "Completed",
    featured: true,
    imageUrl: "/images/project-15.jpeg",
    description: "Quality supply and application of durable, chemical-resistant epoxy flooring for Toyota Corolla automotive workshop and service facilities.",
    chemicalsUsed: [
      "High-Build Epoxy Floor Coating",
      "Moisture-Tolerant Primer",
      "Chemical-Resistant Polyurethane Sealer"
    ],
    highlights: [
      "Seamless chemical-resistant surface designed for automotive service environments",
      "High-gloss reflective finish enhancing workspace visibility",
      "Applied by experienced team using modern application techniques",
      "Durable and wear-resistant commercial flooring"
    ],
    beforeAfterImages: [
      "/images/project-9.jpeg"
    ],
    createdAt: "2023-11-20T09:30:00.000Z"
  },
  {
    id: "proj-3-berger-coating",
    title: "Paint & Protective Coating Systems",
    client: "Berger",
    category: "Paint & Coating Systems",
    secondaryCategory: "Industrial Solutions",
    location: "Pakistan",
    year: 2024,
    status: "Completed",
    featured: true,
    imageUrl: "/images/project-10.jpeg",
    description: "Specialized paint and coating systems providing high-performance protective barrier coatings and durable surface finishes for Berger.",
    chemicalsUsed: [
      "Protective Surface Coating",
      "Specialized Primer",
      "Durable Topcoat System"
    ],
    highlights: [
      "Durable and weather-resistant protective finish",
      "High-grade chemical coatings for long-term surface protection",
      "Applied using modern application techniques",
      "Commitment to quality workmanship and customer satisfaction"
    ],
    beforeAfterImages: [
      "/images/project-11.jpeg"
    ],
    createdAt: "2024-03-10T11:00:00.000Z"
  },
  {
    id: "proj-4-suzuki-waterproofing",
    title: "Facility Waterproofing & Chemical Solutions",
    client: "Suzuki",
    category: "Waterproofing",
    secondaryCategory: "Industrial Solutions",
    location: "Pakistan",
    year: 2023,
    status: "Completed",
    featured: true,
    imageUrl: "/images/project-13.jpeg",
    description: "Professional waterproofing and specialized chemical application delivering durable, reliable moisture defense for Suzuki facility.",
    chemicalsUsed: [
      "Waterproofing Membrane System",
      "Penetrating Chemical Slurry",
      "Joint Sealing Compounds"
    ],
    highlights: [
      "Reliable moisture protection preventing seepage and structural dampness",
      "High-performance construction chemicals and precision application",
      "Cost-effective and durable solution for industrial and commercial facilities",
      "Experienced applicator team ensuring reliable results"
    ],
    beforeAfterImages: [
      "/images/project-14.jpeg"
    ],
    createdAt: "2023-08-14T10:15:00.000Z"
  },
  {
    id: "proj-5-commercial-epoxy",
    title: "Seamless Interior Epoxy Flooring",
    client: "Commercial Client",
    category: "Epoxy Flooring",
    secondaryCategory: "Commercial Solutions",
    location: "Pakistan",
    year: 2024,
    status: "Completed",
    featured: false,
    imageUrl: "/images/project-4.jpeg",
    description: "Turnkey supply and application of seamless colored epoxy flooring with coved base borders for commercial interior spaces.",
    chemicalsUsed: [
      "High-Gloss Epoxy Resin",
      "Coved Base Epoxy Mortar",
      "Surface Sealer"
    ],
    highlights: [
      "Vibrant seamless finish with integrated coved borders",
      "Hygienic, smooth, and easily sanitized surface",
      "Applied using modern application techniques",
      "Professional service and reliable durability"
    ],
    beforeAfterImages: [
      "/images/project-7.jpeg",
      "/images/project-8.jpeg"
    ],
    createdAt: "2024-02-01T14:20:00.000Z"
  },
  {
    id: "proj-6-infrastructure-flooring",
    title: "Flooring & Surface Coating Solutions",
    client: "Infrastructure Client",
    category: "Epoxy Flooring",
    secondaryCategory: "Infrastructure Solutions",
    location: "Pakistan",
    year: 2023,
    status: "Completed",
    featured: false,
    imageUrl: "/images/project-5.jpeg",
    description: "Comprehensive supply and application of modern epoxy flooring and protective surface coatings for residential, commercial, and infrastructure projects.",
    chemicalsUsed: [
      "Self-Leveling Epoxy Screed",
      "Bonding Primer",
      "Protective Finish"
    ],
    highlights: [
      "Reliable, durable, and cost-effective surface protection",
      "Engineered using quality construction chemicals",
      "Applied by experienced team",
      "Customer satisfaction guaranteed"
    ],
    beforeAfterImages: [
      "/images/project-6.jpeg",
      "/images/project-12.jpeg"
    ],
    createdAt: "2023-09-05T12:00:00.000Z"
  }
];

export const SERVICES: Service[] = [
  {
    id: "waterproofing",
    title: "Waterproofing Systems",
    tagline: "Comprehensive Substructure & Roof Leak Defense",
    badge: "Most Requested",
    icon: "Droplets",
    shortDesc: "Complete supply and specialized application of membrane, liquid polyurethane, crystalline, and injection systems for 100% moisture-tight structures.",
    fullDesc: "Water intrusion causes rapid degradation of reinforced concrete, rebar corrosion, mold, and structural failure. Ramzan Chemical Construction deploys state-of-the-art waterproofing systems tailored to hydrostatic pressures and architectural parameters across Pakistan.",
    applications: [
      "Flat Concrete Rooftops & Terraces",
      "Basement Retaining Walls & Raft Foundations",
      "Underground Potable Water Tanks & Overhead Reservoirs",
      "Expansion, Construction & Cold Joint Treatments",
      "Bathrooms, Wet Areas & Commercial Kitchens",
      "Bridge Decks, Culverts & Below-Grade Tunnels"
    ],
    systemsIncluded: [
      "Atactic Polypropylene (APP) Torch-On Bituminous Membranes (3mm - 4mm)",
      "Two-Component Flexible Polymer-Modified Cementitious Coatings",
      "Liquid Polyurethane Elastomeric Waterproofing (200%+ Elongation)",
      "Negative & Positive Side Deep-Penetrating Crystalline Slurries",
      "Hydrophilic Polyurethane Chemical Crack Pressure Injection",
      "High-Density Polyethylene (HDPE) Substructure Geomembranes"
    ],
    keyBenefits: [
      "Reliable and durable moisture barrier preventing seepage",
      "Protects interior finishes, ceiling plaster, and electrical wiring from dampness",
      "Arrests reinforcement steel corrosion and concrete deterioration",
      "Resistant to hydrostatic pressure and standing ponding water"
    ],
    recommendedChemicals: [
      "Bituminous Primer ASTM D-41",
      "4mm Polyester APP Torch Membrane",
      "2-Component Crystalline Slurry",
      "Hydrophobic Polyurethane Grout"
    ],
    sampleProject: "Specialized Waterproofing & Moisture Defense Application",
    imageUrl: "/images/project-13.jpeg"
  },
  {
    id: "epoxy-flooring",
    title: "Epoxy Flooring Systems",
    tagline: "High-Load Industrial, Commercial & Hygienic Seamless Screeds",
    badge: "Industrial Benchmark",
    icon: "ShieldCheck",
    shortDesc: "Engineered epoxy and polyurethane screeds from 2mm to 6mm designed for extreme forklift traffic, chemical exposure, and seamless hygiene.",
    fullDesc: "Modern industrial facilities require high-performance floors that endure relentless chemical spills, heavy forklift wheels, and thermal shock. We provide precision surface preparation (CSP 2-4 diamond grinding) followed by 100% solids epoxy screeds and safety demarcation.",
    applications: [
      "Automotive 3S Workshops, Showrooms & Service Pits",
      "Pharmaceutical Manufacturing Plants & Sterile Cleanrooms",
      "Logistics Warehouses & Heavy-Duty Freight Distribution Hubs",
      "Food & Beverage Processing Facilities (HACCP Compliant)",
      "Electronic Assembly Workshops (Electrostatic Discharge ESD)",
      "Multi-Storey Commercial Basement Parking Garages"
    ],
    systemsIncluded: [
      "Self-Leveling Epoxy Flooring (1.5mm - 3mm High-Gloss & Matte)",
      "Heavy-Duty Epoxy Mortar Screeds (4mm - 6mm High Impact)",
      "Polyurethane (PU) Concrete Screeds for Thermal Shock (-20°C to +120°C)",
      "Electrostatic Conductive & Dissipative (ESD) Flooring Systems",
      "Non-Slip Aggregated Textured Safety Flooring (R10 - R12)",
      "Chemical-Resistant Novolac Epoxy Linings for Battery & Acid Rooms"
    ],
    keyBenefits: [
      "Seamless, non-porous finish prevents dust generation and bacterial buildup",
      "High-strength compressive performance and wear resistance",
      "Impervious to automotive motor oils, fuels, hydraulic fluids, and mild chemicals",
      "Vibrant color demarcation zones enhance workplace safety and productivity"
    ],
    recommendedChemicals: [
      "100% Solids Solvent-Free Epoxy Resin",
      "Polyamide Hardener System",
      "Aliphatic Polyurethane Topcoat",
      "Graded Silica Quartz Aggregates"
    ],
    sampleProject: "Heavy-Duty Industrial Epoxy Flooring Application",
    imageUrl: "/images/project-1.jpeg"
  },
  {
    id: "paint-coatings",
    title: "Paint & Coating Systems",
    tagline: "High-Performance Protective & Architectural Coatings",
    badge: "Architectural & Protective",
    icon: "Paintbrush",
    shortDesc: "Specialized elastomeric weather-shielding, anti-carbonation coatings, industrial steel anti-corrosion primers, and hygiene coatings.",
    fullDesc: "Providing barrier protection against severe weathering, atmospheric carbonation, UV degradation, industrial fumes, and microbial growth for residential estates, high-rise buildings, and industrial steel infrastructures.",
    applications: [
      "Commercial Building Facades & Exterior Walls",
      "Industrial Structural Steelwork & Pipe Bridges",
      "Concrete Bridges, Flyovers & Retaining Structures",
      "Interior Hygiene Walls for Hospitals & Cleanrooms",
      "Water Supply Pipelines & Steel Storage Tanks",
      "Residential Luxury Villas & Modern Housing Societies"
    ],
    systemsIncluded: [
      "Elastomeric Anti-Carbonation Coatings (Crack-Bridging)",
      "Two-Component Polyamide Epoxy Zinc-Phosphate Steel Primers",
      "Aliphatic Polyurethane Protective Exterior Enamels",
      "Silicone-Enhanced Weather-Shield Waterproof Paints",
      "Intumescent Fire-Retardant Structural Steel Coatings",
      "Textured Architectural Finishes & Mineral Plasters"
    ],
    keyBenefits: [
      "Blocks CO2 diffusion, arresting concrete carbonation and rebar corrosion",
      "High UV resistance prevents fading, chalking, and blistering under Pakistani sun",
      "Vapor-permeable membrane allows moisture inside walls to evaporate safely",
      "Exceptional washability and dirt-pickup resistance"
    ],
    recommendedChemicals: [
      "2-Pack Epoxy Zinc Phosphate Anti-Rust Primer",
      "Microporous Elastomeric Facade Coating",
      "Aliphatic 2K Acrylic Polyurethane Finish",
      "Silane-Siloxane Hydrophobic Impregnation Primer"
    ],
    sampleProject: "Protective Surface Paint & Coating Systems",
    imageUrl: "/images/project-10.jpeg"
  }
];

export const CLIENTS: ClientLogo[] = [
  {
    name: "NLC",
    sector: "Infrastructure & Logistics",
    badge: "Reputable Organization",
    projectsDelivered: "Industrial Epoxy Flooring & Construction Solutions",
    logoText: "NLC",
    color: "bg-slate-900 text-amber-400 border-slate-700"
  },
  {
    name: "Berger",
    sector: "Paint & Coating Systems",
    badge: "Reputable Organization",
    projectsDelivered: "Paint & Protective Coating Systems",
    logoText: "BERGER",
    color: "bg-slate-900 text-amber-400 border-slate-700"
  },
  {
    name: "Toyota Corolla",
    sector: "Automotive Facilities",
    badge: "Reputable Organization",
    projectsDelivered: "Commercial Workshop Epoxy Flooring",
    logoText: "TOYOTA",
    color: "bg-slate-900 text-amber-400 border-slate-700"
  },
  {
    name: "Suzuki",
    sector: "Automotive Facilities",
    badge: "Reputable Organization",
    projectsDelivered: "Facility Waterproofing & Construction Chemical Solutions",
    logoText: "SUZUKI",
    color: "bg-slate-900 text-amber-400 border-slate-700"
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Site Survey & Substrate Analysis",
    description: "Our experienced team inspects your site, evaluates concrete strength, and identifies root causes of seepage or surface deterioration to formulate the right solution."
  },
  {
    step: "02",
    title: "Chemical Specification & Cost-Effective Proposal",
    description: "We prepare an itemized technical BOQ with quality construction chemicals matching your exact traffic, chemical exposure, and budget parameters at competitive rates."
  },
  {
    step: "03",
    title: "Surface Preparation & Substrate Profiling",
    description: "Quality application relies on substrate prep. We utilize mechanical grinding, dust-free vacuuming, crack treatment, and high-strength patching mortars."
  },
  {
    step: "04",
    title: "Precision Application & Quality Control",
    description: "Our experienced applicator crews apply basecoats, reinforcement meshes, self-leveling resins, and durable protective topcoats using modern application techniques."
  },
  {
    step: "05",
    title: "Inspection & Quality Handover",
    description: "We conduct thorough quality checks and joint inspections on completed waterproofing, epoxy flooring, or protective coatings to ensure total customer satisfaction."
  }
];

export const FAQS: FAQItem[] = [
  {
    q: "Why choose professional chemical application over traditional cement plaster?",
    a: "Traditional cement mortar has zero flexibility and inevitably develops micro-cracks under thermal expansion, causing persistent seepage. Modern construction chemicals—such as APP elastomeric membranes, crystalline slurries, and pure epoxy resins—form seamless, chemically bonded barriers that provide reliable, long-lasting protection."
  },
  {
    q: "What is the difference between regular floor paint and industrial epoxy flooring?",
    a: "Regular floor paint is simply a thin coating that scratches easily and peels under tire heat. Industrial epoxy flooring is a two-component thermosetting resin and hardener system that chemically crosslinks into a durable, non-porous surface resistant to heavy traffic, motor oils, and industrial wear."
  },
  {
    q: "How soon can an epoxy floor or waterproofing project be used after application?",
    a: "Light foot traffic is typically permitted within 18 to 24 hours. Full mechanical strength and cure are achieved in 48 to 72 hours, delivering durable, long-term performance."
  },
  {
    q: "What is Ramzan Chemical Construction's commitment to quality and service?",
    a: "Our commitment to quality workmanship, competitive rates, professional service, and customer satisfaction makes us a trusted name in construction solutions. We provide reliable supply and application services using quality construction chemicals and modern application techniques."
  },
  {
    q: "Can you provide site inspection and quotation outside Mardan?",
    a: "Yes. While our head office is located at Office No. 38, Near Bypass, Abaseen Adda, Yousafzai Market, Mardan, our experienced team provides quality supply and application services across Khyber Pakhtunkhwa and throughout Pakistan."
  }
];

export const ESTIMATOR_SYSTEMS: CostEstimatorSystem[] = [
  {
    id: "roof-app",
    name: "Flat Concrete Roof (4mm APP Torch-On Bituminous Membrane)",
    category: "Waterproofing",
    baseRatePerSqFt: 180,
    recommendedSystem: "Bitumen D-41 Primer + 4mm Polyester-Reinforced Torch Membrane + Solar Reflective Coating",
    coats: "1 Primer + 1 Membrane Layer + 1 Reflective Finish",
    turnaroundPer1000SqFtDays: 1.5
  },
  {
    id: "roof-pu",
    name: "Exposed Terrace / Metal Roof (Liquid Polyurethane Elastomeric)",
    category: "Waterproofing",
    baseRatePerSqFt: 220,
    recommendedSystem: "High-Penetration Moisture Barrier + 2-Pack Liquid PU Resin + Geotextile Fleece Reinforcement",
    coats: "1 Primer + 2 Liquid PU Body Coats + 1 UV Topcoat",
    turnaroundPer1000SqFtDays: 2
  },
  {
    id: "epoxy-self-level",
    name: "Automotive Workshop / Commercial Epoxy Floor (2mm High-Gloss)",
    category: "Epoxy Flooring",
    baseRatePerSqFt: 260,
    recommendedSystem: "Diamond Grinding + Moisture Tolerant Epoxy Primer + 2mm 100% Solids Self-Leveling Resin",
    coats: "Diamond Grind + 1 Primer + 1 Body Screed + 1 Gloss Sealer",
    turnaroundPer1000SqFtDays: 2.5
  },
  {
    id: "epoxy-heavy-screed",
    name: "Heavy Industrial Warehouse Floor (4mm - 5mm Epoxy Mortar)",
    category: "Epoxy Flooring",
    baseRatePerSqFt: 380,
    recommendedSystem: "Mechanical Shot Blasting + Heavy Epoxy Mortar Screed + High-Abrasion Aliphatic Topcoat",
    coats: "Substrate Profiling + 1 Tack Coat + Mortar Troweling + 2 Topcoats",
    turnaroundPer1000SqFtDays: 3
  },
  {
    id: "basement-waterproofing",
    name: "Basement Retaining Walls (Negative Side Crystalline Slurry)",
    category: "Waterproofing",
    baseRatePerSqFt: 195,
    recommendedSystem: "V-Groove Crack Injection + Deep-Penetrating Crystalline Hydrophobic Slurry",
    coats: "2 Slurry Slush Coats + Hydraulic Water Plug on Active Seams",
    turnaroundPer1000SqFtDays: 2
  },
  {
    id: "facade-coating",
    name: "Exterior Building Facade (Anti-Carbonation Weather-Shield)",
    category: "Paint & Coating Systems",
    baseRatePerSqFt: 130,
    recommendedSystem: "Silane-Siloxane Water Repellent + Flexible Elastomeric Anti-Carbonation Barrier",
    coats: "1 Penetrating Primer + 2 Anti-Carbonation Protective Coats",
    turnaroundPer1000SqFtDays: 1
  },
  {
    id: "water-tank",
    name: "Underground / Overhead Potable Water Tank (Food-Grade Epoxy)",
    category: "Waterproofing",
    baseRatePerSqFt: 240,
    recommendedSystem: "High-Pressure Hydro Jetting + Solvent-Free Non-Toxic Potable Water Certified Epoxy",
    coats: "1 Moisture Barrier Primer + 2 High-Build Chemical Lining Coats",
    turnaroundPer1000SqFtDays: 2
  }
];

export const CMS_FRAMEWORKS: { frameworks: CMSFramework[] } = {
  frameworks: [
    {
      name: "Native Integrated SQLite / Express API",
      type: "Lightweight Built-In Engine",
      database: "Local File / Cloudflare KV",
      bestFor: "Current Production (Zero Monthly Cost & Instant Delivery)",
      suitabilityRating: "9.8/10 (Recommended for Phase 1)",
      pros: [
        "Zero additional monthly cloud infrastructure costs or subscriptions",
        "Sub-millisecond API response latency for portfolio queries",
        "Custom fields specifically designed for construction chemicals (APP, Screed, CSP)",
        "Zero DevOps complexity or external vendor lock-in"
      ],
      cons: [
        "Requires developer maintenance for new custom content models"
      ]
    },
    {
      name: "Payload CMS 3.0",
      type: "Modern Headless Node / Next.js CMS",
      database: "PostgreSQL / MongoDB",
      bestFor: "Future Phase 2: Multi-engineer site reporting with offline photos",
      suitabilityRating: "9.2/10 (High Suitability)",
      pros: [
        "TypeScript-first schema definitions with automatic React admin UI",
        "Granular Role-Based Access Control (Admins, Field Engineers, Clients)",
        "Powerful asset transformations and S3/R2 storage adapters"
      ],
      cons: [
        "Requires persistent Node.js server and managed PostgreSQL database instance"
      ]
    },
    {
      name: "Directus 10+",
      type: "Open Data Platform & Headless API",
      database: "Any SQL (Postgres, MySQL, SQLite)",
      bestFor: "ERP & Project Milestones Integration",
      suitabilityRating: "8.7/10 (Good Fit)",
      pros: [
        "Instant REST and GraphQL APIs over existing SQL database schemas",
        "Intuitive visual dashboard with map/geospatial location pins for projects",
        "Built-in webhook and email notification automation"
      ],
      cons: [
        "Higher RAM footprint requires at least 1 GB dedicated container"
      ]
    },
    {
      name: "Strapi 5",
      type: "Headless Node.js CMS",
      database: "PostgreSQL / MySQL",
      bestFor: "Traditional Editorial Content & Blogs",
      suitabilityRating: "7.8/10 (Moderate)",
      pros: [
        "Massive community plugin marketplace",
        "Extensive internationalization and multi-language support"
      ],
      cons: [
        "Heavier memory footprint and more complex database migration overhead"
      ]
    }
  ]
};
