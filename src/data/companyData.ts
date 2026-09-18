import { ServiceDetail } from '../types';

export const COMPANY_INFO = {
  legalName: "RAMZAN CHEMICAL CONSTRUCTION (PRIVATE) LIMITED",
  shortName: "Ramzan Chemical Construction (Pvt.) Ltd.",
  brandName: "Ramzan Chemical Construction",
  tagline: "Pioneering Chemical Engineering & Advanced Structural Protection",
  incorporationNo: "0350813",
  fbrRegistrationNo: "J664738",
  referenceNo: "J664738-7",
  taxOffice: "RTO PESHAWAR",
  taxStatus: "Income Tax: Active Taxpayer",
  principalActivity: "Professional Supply & Application of Construction Chemicals",
  address: "Office No. 38, Near Bypass, Abaseen Adda, Yousafzai Market, Mardan, Khyber Pakhtunkhwa, Pakistan",
  regionalOffices: ["Mardan (Head Office)", "Peshawar Operations Desk", "Islamabad Project Coordination"],
  phone: "+92 345 9191020",
  phoneDisplay: "0345-9191020",
  phoneEmergency: "+92 345 9191020",
  email: "info@ramzanchemical.com",
  contactEmailAlt: "azankhan727@gmail.com",
  whatsappNumber: "923459191020",
  whatsappMessage: "Hello Ramzan Chemical Construction, I would like to request a quotation and technical site survey for my project.",
  workingHours: "Monday – Saturday: 8:00 AM – 7:00 PM (Emergency Seepage Support 24/7)"
};

export const SERVICES_CATALOG: ServiceDetail[] = [
  {
    id: "waterproofing",
    title: "Waterproofing Systems",
    tagline: "Comprehensive Substructure & Roof Leak Defense",
    badge: "Most Requested",
    icon: "Droplets",
    shortDesc: "Complete supply and specialized application of membrane, liquid polyurethane, crystalline, and injection systems for 100% moisture-tight structures.",
    fullDesc: "Water intrusion causes rapid degradation of reinforced concrete, rebar corrosion, mold, and structural failure. Ramzan Chemical Construction deploys state-of-the-art waterproofing systems tailored to hydrostatic pressures and architectural parameters.",
    applications: [
      "Flat Concrete Rooftops & Terraces",
      "Basement Retaining Walls & Raft Foundations",
      "Underground Potable Water Tanks & Overhead Reservoirs",
      "Expansion, Construction & Cold Joint Treatments",
      "Bathrooms, Wet Areas & Commercial Kitchens",
      "Bridge Decks, Culverts & Below-Grade Tunnels"
    ],
    systemsIncluded: [
      "Atactic Polypropylene (APP) Torch-On Bituminous Membrane (3mm & 4mm)",
      "Liquid-Applied Polyurethane (PU) Elastomeric Waterproofing",
      "Crystalline Capillary Slurries for Deep Concrete Penetration",
      "Cementitious 2-Component Flexible Polymer Waterproofing Slurries",
      "High-Pressure Polyurethane Chemical Grout Injection for Active Leakages"
    ],
    keyBenefits: [
      "Permanently halts moisture penetration and dampness (seem/seepage)",
      "Resistant to high hydrostatic water pressure from both positive & negative sides",
      "Bridges hairline shrinkage cracks up to 2.5mm dynamically",
      "Certified safe formulations for drinking water reservoir storage"
    ],
    recommendedChemicals: [
      "APP 4mm Polyester-Reinforced Membrane",
      "Bituminous Primer D-41",
      "Crystalline Hydrophobic Admixture & Slurry",
      "2K Flexible Cementitious Polymer Polymer-Modified Slurry",
      "PU Hydrophobic Foam Injection Resin"
    ],
    sampleProject: "Yousafzai Commercial Plaza 28,000 sq.ft Roof & Underground Reservoir",
    imageUrl: "/images/project%20(13).jpeg"
  },
  {
    id: "epoxy-flooring",
    title: "Epoxy Flooring Systems",
    tagline: "Industrial-Grade Strength, Chemical Resistance & Aesthetic Sheen",
    badge: "Industrial Specialty",
    icon: "Layers",
    shortDesc: "Self-leveling epoxy, heavy-duty epoxy mortar screeds, ESD anti-static flooring, and polyurethane concrete for high-traffic environments.",
    fullDesc: "Engineered specifically for heavy industrial facilities, automotive workshops, pharmaceuticals, and modern commercial spaces that demand unyielding durability, chemical resilience, and sterile dust-free environments.",
    applications: [
      "Automobile Showrooms & 3S Service Bays",
      "Heavy Manufacturing & Warehousing Logistics Hubs",
      "Pharmaceutical Cleanrooms & Medical Laboratories",
      "Food & Beverage Processing Facilities (PU Screeds)",
      "Aircraft Hangars & Military Equipment Depots",
      "Commercial Supermarkets, Car Parks & Basements"
    ],
    systemsIncluded: [
      "Self-Leveling 2mm - 3mm Solvent-Free Epoxy Resin Floors",
      "Heavy-Duty 5mm - 8mm Epoxy Mortar Screeds for Forklift Zones",
      "Conductive & Static-Dissipative (ESD) Anti-Static Flooring",
      "Chemical & Acid Resistant Novolac Epoxy Linings",
      "Polyurethane Concrete (PU Screed) for Extreme Thermal Shock (-30°C to +120°C)",
      "Anti-Slip Quartz & Decorative Flake Epoxy Finishes"
    ],
    keyBenefits: [
      "High compressive and flexural strength against forklift rolling loads",
      "Impervious to industrial chemicals, battery acid, brake fluid, and hydraulic oils",
      "Seamless and sterile — eliminates grout joints that harbor bacteria and dust",
      "High-reflectance gloss finish reducing facility lighting energy requirements"
    ],
    recommendedChemicals: [
      "Low-Viscosity Epoxy Primer with Moisture Tolerance",
      "100% Solids Self-Leveling Epoxy Intermediate Screed",
      "High-Abrasion Aliphatic Polyurethane Topcoat",
      "Copper Mesh & Conductive Carbon Primer for ESD systems"
    ],
    sampleProject: "NLC Freight Terminal (45,000 sq.ft) & Toyota Corolla 3S Workshop (18,500 sq.ft)",
    imageUrl: "/images/project%20(12).jpeg"
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
    sampleProject: "Berger Paints KPK Central Distribution & Warehousing Complex",
    imageUrl: "/images/project%20(11).jpeg"
  }
];

export const CLIENT_PARTNERS = [
  {
    name: "NLC (National Logistics Cell)",
    sector: "Infrastructure & Logistics",
    badge: "Federal Enterprise",
    projectsDelivered: "Heavy-Duty Epoxy Warehousing & Terminal Waterproofing",
    logoText: "NLC",
    color: "bg-emerald-950 text-emerald-400 border-emerald-800"
  },
  {
    name: "Berger Paints Pakistan",
    sector: "Chemicals & Coatings",
    badge: "Industry Leader",
    projectsDelivered: "Protective Facility Coatings & Industrial Epoxy Floor Systems",
    logoText: "BERGER",
    color: "bg-red-950 text-red-400 border-red-800"
  },
  {
    name: "Toyota Corolla / Frontier Motors",
    sector: "Automotive 3S Centers",
    badge: "Authorized Dealership",
    projectsDelivered: "High-Gloss Service Bay Epoxy & Chemical-Resistant Screeds",
    logoText: "TOYOTA",
    color: "bg-zinc-900 text-amber-400 border-zinc-700"
  },
  {
    name: "Pak Suzuki Motors Authorized",
    sector: "Automotive Workshops",
    badge: "Automotive Giant",
    projectsDelivered: "Basement Waterproofing & Anti-Static ESD Diagnostic Floors",
    logoText: "SUZUKI",
    color: "bg-blue-950 text-blue-400 border-blue-800"
  }
];

export const WORK_PROCESS_STEPS = [
  {
    step: "01",
    title: "Engineering Site Survey & Substrate Analysis",
    description: "Our certified chemical engineers inspect your site, perform moisture vapor emission tests (calcium chloride / Tramex), evaluate concrete compressive strength, and identify root causes of seepage or surface deterioration."
  },
  {
    step: "02",
    title: "Chemical Specification & Customized Proposal",
    description: "We prepare an itemized technical BOQ with precise chemical formulations (millimeter thickness, resin-to-hardener ratios, membrane ratings) matching your exact traffic, chemical exposure, and budget parameters."
  },
  {
    step: "03",
    title: "Rigorous Mechanical Surface Preparation",
    description: "80% of coating success relies on substrate prep. We utilize diamond grinding, shot blasting, dust-free vacuuming, crack V-grooving, and high-strength mortar patching to achieve concrete surface profile (CSP 2-4)."
  },
  {
    step: "04",
    title: "Precision Application & Climate-Controlled Curing",
    description: "Our trained applicator crews mix chemicals with digital scales, monitor dew point and ambient temperature, apply basecoats, reinforcement meshes, self-leveling resins, and high-durability UV topcoats."
  },
  {
    step: "05",
    title: "Quality Testing & Written Warranty Handover",
    description: "We conduct 72-hour ponding flood tests for waterproofing and cross-hatch adhesion/spark tests for epoxy flooring, issuing comprehensive company warranties and post-installation maintenance guides."
  }
];

export const FAQS = [
  {
    q: "Why should we choose professional chemical application over traditional cement plaster?",
    a: "Traditional cement mortar has zero flexibility and inevitably develops micro-cracks under thermal expansion, causing persistent seepage. Modern construction chemicals—like APP elastomeric membranes, crystalline slurries, and pure epoxy resins—form seamless, chemically bonded barriers with high elongation (up to 400%), guaranteeing total moisture impermeability and decades of durability."
  },
  {
    q: "What is the difference between regular floor paint and industrial epoxy flooring?",
    a: "Regular floor paint is simply a thin acrylic coating (0.05mm) that scratches easily and peels under tire heat. Industrial epoxy flooring is a two-component thermosetting resin and polyamine hardener system (2mm to 6mm thick) that chemically crosslinks into a rock-solid, non-porous surface capable of bearing 10-ton forklifts and resistant to motor oils, brake fluid, and harsh industrial detergents."
  },
  {
    q: "How soon can an epoxy floor or waterproofing project be used after application?",
    a: "Light foot traffic is typically permitted within 18 to 24 hours. Full mechanical strength and chemical cure are achieved in 48 to 72 hours. For fast-turnaround industrial facilities, we also offer rapid-cure polyaspartic and polyurethane systems ready in as little as 6 to 12 hours."
  },
  {
    q: "Does Ramzan Chemical Construction provide warranties on completed projects?",
    a: "Yes. Every commercial, industrial, and residential project is backed by our official corporate written warranty ranging from 5 to 10 years depending on the specified chemical system and substrate conditions."
  },
  {
    q: "Can you provide site inspection and quotation outside Mardan?",
    a: "Yes! While our head office is located at Office No. 38, Near Bypass, Abaseen Adda, Yousafzai Market, Mardan, our teams operate extensively across Khyber Pakhtunkhwa, Islamabad/Rawalpindi, Punjab, and nationwide across Pakistan."
  }
];
