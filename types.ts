
import type React from 'react';
import type { IconProps } from './components/Icons';

export interface Profile {
  name: string;
  tagline: string;
  bioSummary: string;
  profilePictureUrl: string;
  socialLinks: {
    github: string;
    linkedin: string;
    email: string;
  };
}

export enum ProjectType {
  PERSONAL = 'Pessoal',
  COLLABORATIVE = 'Colaborativo'
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  projectUrl?: string;
  repoUrl?: string;
  type: ProjectType;
}

export interface EducationItem {
  id: string;
  institution: string;
  degreeOrCertificate: string;
  fieldOfStudy: string;
  startDate: string;
  endDateOrExpected: string;
  description?: string;
  certificateImageUrl?: string; // Added for image preview
}

export interface Skill {
  id: string;
  name: string;
  icon?: React.ReactElement<IconProps>; 
  level?: number; // Optional: 1-5 for proficiency bar
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'system';
  timestamp: Date;
  metadata?: Record<string, any>; // For potential future use, like showing JSON
}