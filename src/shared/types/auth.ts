export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
};

export interface LoginRequest {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface MeResponse {
  id: number;
  age: number;
  username: string;
  maidenName: string;
  phone: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}
