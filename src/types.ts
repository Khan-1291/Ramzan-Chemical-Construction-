export interface Project {
  id: string;
  title: string;
  client: string;
  category: 'Waterproofing' | 'Epoxy Flooring' | 'Paint & Coating Systems' | string;
  secondaryCategory?: string;
  location: string;
  year: number | string;
  areaSqFt?: number;
  status: 'Completed' | 'In Progress';
  featured: boolean;
  imageUrl: string;
  videoUrl?: string;
  description: string;
  chemicalsUsed: string[];
  scopeOfWork?: string[];
  highlights: string[];
  beforeAfterImages?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Inquiry {
  id: string;
  name: string;
  organization?: string;
  phone: string;
  email?: string;
  serviceRequested: string;
  estimatedArea?: string;
  location: string;
  notes?: string;
  status: 'New' | 'Contacted' | 'Survey Scheduled' | 'Proposal Sent' | 'Closed';
  createdAt: string;
}

export interface MediaFile {
  fileName: string;
  url: string;
  size: number;
  mtime: string;
}

export interface Service {
  id: string;
  title: string;
  tagline: string;
  badge: string;
  icon: string;
  shortDesc: string;
  fullDesc: string;
  applications: string[];
  systemsIncluded: string[];
  keyBenefits: string[];
  recommendedChemicals: string[];
  sampleProject: string;
  imageUrl: string;
}

export interface ClientLogo {
  name: string;
  sector: string;
  badge: string;
  projectsDelivered: string;
  logoText: string;
  color: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface CostEstimatorSystem {
  id: string;
  name: string;
  category: string;
  baseRatePerSqFt: number;
  recommendedSystem: string;
  coats: string;
  turnaroundPer1000SqFtDays: number;
}

export interface CompanyProfile {
  legalName: string;
  incorporationNo: string;
  fbrRegistrationNo: string;
  referenceNo: string;
  taxOffice: string;
  address: string;
  phone: string;
  phoneDisplay: string;
  phoneEmergency: string;
  email: string;
  whatsappNumber: string;
  whatsappMessage: string;
  workingHours: string;
}

export interface CMSFramework {
  name: string;
  type: string;
  database: string;
  bestFor: string;
  suitabilityRating: string;
  pros: string[];
  cons: string[];
}
