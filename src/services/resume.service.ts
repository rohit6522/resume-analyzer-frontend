import apiClient from "@/lib/axios";
import type { ResumeResponse, ParsedResumeResponse, AtsScoreResponse ,JobMatchResponse } from "@/types/resume.types";

export const resumeService = {
  upload: async (file: File): Promise<ResumeResponse> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post<ResumeResponse>("/resumes/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  getAll: async (): Promise<ResumeResponse[]> => {
    const response = await apiClient.get<ResumeResponse[]>("/resumes");
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/resumes/${id}`);
  },

  getParsedData: async (id: number): Promise<ParsedResumeResponse> => {
    const response = await apiClient.get<ParsedResumeResponse>(`/resumes/${id}/parsed-data`);
    return response.data;
  },

  generateAtsScore: async (id: number): Promise<AtsScoreResponse> => {
    const response = await apiClient.post<AtsScoreResponse>(`/resumes/${id}/generate-ats-score`);
    return response.data;
  },

  getAtsScore: async (id: number): Promise<AtsScoreResponse> => {
    const response = await apiClient.get<AtsScoreResponse>(`/resumes/${id}/ats-score`);
    return response.data;
  },

  matchJob: async (id: number, jobDescription: string): Promise<JobMatchResponse> => {
  const response = await apiClient.post<JobMatchResponse>(`/resumes/${id}/match-job`, {
    jobDescription,
  });
  return response.data;
},
};