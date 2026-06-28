// core/models/auth.model.ts

// ===== Requests =====

export interface RegisterRequest {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
   consentGiven: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface GoogleLoginRequest {
  idToken: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  token: string;
  newPassword: string;
}

// ===== Responses =====

// register / login / google-login
export interface AuthResponse {
  token: string;
  role: string;
}

// forget-password
export interface ForgotPasswordResponse {
  resetToken: string;
}

// reset-password → 204 NoContent مفيش response