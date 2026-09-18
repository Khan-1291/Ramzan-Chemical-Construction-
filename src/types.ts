export interface Project {
  id: string;
  title: string;
  client: string;
  category: 'Waterproofing' | 'Epoxy Flooring' | 'Paint & Coating Systems' | string;
  secondaryCategory?: string;
  location: string;
  areaSqFt: number;
  year: number;
  status: 'Completed' | 'Ongoing' | 'Under Tender';
  featured: boolean;
  description: string;
  chemicalsUsed: string[];
  highlights: string[];
  imageUrl: string;
  videoUrl?: string;
  beforeAfterImages?: string[];
  createdAt?: string;
}

export interface Inquiry {
  id: string;
  name: string;
  organization: string;
  phone: string;
  email: string;
  service: string;
  estimatedArea: string;
  location: string;
  message: string;
  status: 'New' | 'Contacted' | 'Site Survey Scheduled' | 'Completed';
  createdAt: string;
}

export interface AdminUser {
  username: string;
  fullName: string;
  role: string;
}

export interface ServiceDetail {
  id: string;
  title: string;
  tagline: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  badge: string;
  applications: string[];
  systemsIncluded: string[];
  keyBenefits: string[];
  recommendedChemicals: string[];
  sampleProject: string;
  imageUrl: string;
}

export interface CMSFrameworkComparison {
  name: string;
  type: string;
  database: string;
  suitabilityRating: string;
  pros: string[];
  cons: string[];
  bestFor: string;
}
