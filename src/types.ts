import type { Dispatch, ReactNode, SetStateAction } from "react";

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
}

export type SkillCategory = "Technical" | "Soft Skills" | "Tools";

export interface Skill {
  id: number;
  name: string;
  category: SkillCategory;
}

export interface ProjectFormData {
  title: string;
  description: string;
  technologies: string;
  category: string;
  status: string;
  link: string;
}

export interface Project extends Omit<ProjectFormData, "technologies"> {
  id: number;
  createdAt: string;
  technologies: string[];
}

export interface ContactInfo {
  email?: string;
  phone?: string;
  linkedin?: string;
}

export interface SocialMedia {
  github?: string;
}

export interface Settings {
  showEmail: boolean;
  showProjects: boolean;
  language: string;
}

export interface AppContextValue {
  theme: string;
  toggleTheme: () => void;
  settings: Settings;
  setSettings: Dispatch<SetStateAction<Settings>>;
}

export interface HeaderProps {
  name: string;
  title: string;
  children?: ReactNode;
}
