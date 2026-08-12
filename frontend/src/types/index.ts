export interface Project {
  _id?: string;
  id?: number;
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  features?: string[];
  category?: string;
  featured?: boolean;
  displayOrder?: number;
  isVisible?: boolean;
}

export interface Experience {
  _id?: string;
  id?: number;
  company: string;
  location: string;
  role: string;
  duration: string;
  responsibilities: string[];
  skillsUsed?: string[];
  order?: number;
  isVisible?: boolean;
}

export interface Education {
  _id?: string;
  id?: number;
  degree: string;
  institution: string;
  detail: string;
  year: string;
  order?: number;
  isVisible?: boolean;
}

export interface Certification {
  id: number;
  name: string;
  provider: string;
  year: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  _id?: string;
  id?: number;
  name: string;
  icon: string;
  skills: Skill[];
  order?: number;
  isVisible?: boolean;
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Interest {
  id: number;
  name: string;
  icon: string;
  description: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface NavItem {
  label: string;
  path: string;
  icon: string;
}

export interface SiteSettings {
  _id?: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  ogImage: string;
  siteStatus: 'live' | 'maintenance';
}

export interface PortfolioInfo {
  _id?: string;
  name: string;
  title: string;
  tagline: string;
  heroDescription: string;
  location: string;
  phone: string;
  email: string;
  photo: string;
  resume: string;
  profileImage: string;
  professionalSummary: string;
  social: {
    linkedin: string;
    github: string;
    twitter: string;
  };
  ctaButtons: { label: string; url: string; type: 'primary' | 'secondary' }[];
  theme?: any;
  siteName?: string;
}

export interface DashboardStats {
  totalProjects: number;
  totalSkills: number;
  totalExperiences: number;
  totalEducation: number;
  siteStatus: string;
}
