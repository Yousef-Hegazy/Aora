import { AuthState } from "@/state/auth";

export interface AuthResponse extends AuthState {}
export interface AppUser {
  id: number;
  email: string;
  is_active: boolean;
  is_staff: boolean;
}
