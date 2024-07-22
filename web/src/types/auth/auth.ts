export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  userId: string;
  avatar: string;
}
