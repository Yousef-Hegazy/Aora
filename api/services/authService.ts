import { AppUser } from "@/models/authModels";
import axios from "axios";
import { BASE_URL } from "../axiosConfig";
import apiService from "./apiService";
import { Auth } from "@/models/authModels";

const authService = {
  login: (data: { email: string; password: string }) => apiService.post<Auth>({ url: "/auth/login", data }),
  register: (data: { email: string; password: string; username: string }) =>
    apiService.post<Auth>({
      url: "/auth/register",
      data: {
        email: data.email,
        password: data.password,
        username: data.username,
      },
    }),
  getCurrentUser: () => apiService.get<AppUser>({ url: "/auth/me" }),
  refresh: (refreshToken: string) => axios.post<Auth>(`${BASE_URL}/api/auth/refresh`, { refresh: refreshToken }),
};

export default authService;
