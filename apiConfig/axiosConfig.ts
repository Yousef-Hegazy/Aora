import useAuthStore from "@/state/auth";
import axios from "axios";

const appAxios = axios.create({
  baseURL: `http://10.0.2.2:8000/api`,
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

export default appAxios;
