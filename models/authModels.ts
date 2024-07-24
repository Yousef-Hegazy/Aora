export interface Auth {
  access: string;
  refresh: string;
  user: AppUser | null;
}

export interface AppUser {
  id: number;
  username: string;
  email: string;
  is_active: boolean;
  is_staff: boolean;
}
