export interface Resume {
  id: string;
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  updatedAt: Date;
}

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone?: string;
  location?: string;
  summary: string;
  socialLinks: SocialLink[];
}

export interface SocialLink {
  platform: 'GitHub' | 'LinkedIn' | 'Twitter' | 'Website' | 'Other';
  url: string;
  username?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  gpa?: number;
  highlights: string[];
}

export interface Skill {
  id: string;
  category: 'Programming' | 'Framework' | 'Database' | 'Tool' | 'Other';
  name: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  yearsOfExperience?: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  role: string;
  startDate: Date;
  endDate?: Date;
  url?: string;
  technologies: string[];
  highlights: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: Date;
  expiryDate?: Date;
  credentialId?: string;
  url?: string;
}