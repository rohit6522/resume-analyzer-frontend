export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  fullName: string;
  email: string;
  message: string;
}

export interface User {
  fullName: string;
  email: string;
}

export interface UserProfileResponse {
  fullName: string;
  email: string;
  phone: string | null;
  bio: string | null;
  photoUrl: string | null;
}

export interface UpdateProfileRequest {
  fullName: string;
  phone?: string;
  bio?: string;
}