import useAuthStore from "@/state/auth";
import axios, { AxiosResponse } from "axios";

const appAxios = axios.create({
  // baseURL: `http://10.0.2.2:8000/api`,
  baseURL: `http://192.168.75.91:8000/api`,
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

// appAxios.interceptors.response.use(
//   async (res: AxiosResponse<any, any>) => {
//     if (res.status === 401) {
//       const state = useAuthStore.getState();
//       const refresh = state.refresh;

//       if (refresh) {
//         const result =
//       } else {
//         useAuthStore.setState({
//           access: "",
//           refresh: "",
//           user: null,
//         });
//       }
//     }
//     return res;
//   },
//   (err) => Promise.reject(err)
// );

export default appAxios;
