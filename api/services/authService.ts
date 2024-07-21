import { AuthResponse, AppUser } from "../responses/authResponses";
import apiService from "./apiService";

const authService = {
  login: (data: { email: string; password: string }) => apiService.post<AuthResponse>({ url: "/auth/login", data }),
  register: (data: { email: string; password: string; username: string }) =>
    apiService.post<AuthResponse>({
      url: "/auth/register",
      data: {
        email: data.email,
        password: data.password,
        username: data.username,
      },
    }),
  getCurrentUser: () => apiService.get<AppUser>({ url: "/auth/me" }),
  refresh: (refreshToken: string) =>
    apiService.post<AuthResponse>({ url: "/auth/refresh", data: { refresh: refreshToken } }),
};

export default authService;
