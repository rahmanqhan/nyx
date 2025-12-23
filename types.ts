export interface Project {
  id: string;
  title: string;
  description: string;
  liveLink: string;
  repoLink: string;
}

export enum Theme {
  Minimal = 'Minimal',
  Neon = 'Neon',
  Glass = 'Glass',
  Grid = 'Grid',
  CaseStudy = 'Case Study',
}

export interface UserData {
  username: string;
  fullName: string;
  role: string;
  skills: string;
  bio: string;
  projects: Project[];
  theme: Theme;
  email?: string;
  twitter?: string;
  github?: string;
}

export type AppState = 'AUTH' | 'LANDING' | 'ONBOARDING' | 'DEPLOYMENT' | 'EDITOR';