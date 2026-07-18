export interface ResumeResponse {
  id: number;
  originalFileName: string;
  fileType: string;
  fileSize: number;
  active: boolean;
  uploadedAt: string;
}

export interface ParsedResumeResponse {
  fullName: string | null;
  email: string | null;
  phone: string | null;
  linkedin: string | null;
  github: string | null;
}

export interface AtsScoreResponse {
  overallScore: number;
  formattingScore: number;
  keywordScore: number;
  grammarScore: number;
  projectsScore: number;
  experienceScore: number;
  educationScore: number;
  skillsScore: number;
  strengths: string;
  weaknesses: string;
  suggestions: string;
}