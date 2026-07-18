import apiClient from "@/lib/axios";
import type { UserProfileResponse, UpdateProfileRequest } from "@/types/auth.types";

export const userService = {
  getProfile: async (): Promise<UserProfileResponse> => {
    const response = await apiClient.get<UserProfileResponse>("/users/me");
    return response.data;
  },

  updateProfile: async (data: UpdateProfileRequest): Promise<UserProfileResponse> => {
    const response = await apiClient.put<UserProfileResponse>("/users/me", data);
    return response.data;
  },

  uploadPhoto: async (file: File): Promise<UserProfileResponse> => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await apiClient.post<UserProfileResponse>("/users/me/photo", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
};