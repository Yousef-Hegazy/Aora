import useAuthStore from "@/state/authStore";
import axios from "axios";

export const BASE_URL = "http://192.168.75.91:8000";

const appAxios = axios.create({
  // baseURL: `http://10.0.2.2:8000/api`,
  baseURL: `${BASE_URL}/api`,
});

appAxios.interceptors.request.use(
  (config) => {
    const state = useAuthStore.getState();
    const token = state.access;
    if (token) {
      const authHeader = `Bearer ${token}`;
      config.headers.Authorization = authHeader;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

appAxios.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().setAccessToken("");
    } else {
      console.log(error);
    }

    return Promise.reject(error);
  }
);

export default appAxios;
