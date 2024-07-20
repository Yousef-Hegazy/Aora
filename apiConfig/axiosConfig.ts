import axios from "axios";

const appAxios = axios.create({
  baseURL: `${process.env.BASE_URL}/api`,
});

appAxios.interceptors.request.use(
  (config) => {
    const token = "Bearer ";
    config.headers.Authorization = token;
    return config;
  },
  (err) => Promise.reject(err)
);

export default appAxios;
