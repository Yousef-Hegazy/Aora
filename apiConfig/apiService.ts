import appAxios from "./axiosConfig";

const apiService = {
  post: <T>({ url, parameters, data }: { url: string; parameters?: any; data?: any }) =>
    appAxios.post<T>(url, data, { params: parameters }),
  get: <T>({ url, parameters }: { url: string; parameters?: any }) => appAxios.get<T>(url, { params: parameters }),
  delete: <T>({ url, parameters }: { url: string; parameters?: any }) =>
    appAxios.delete<T>(url, { params: parameters }),
  put: <T>({ url, parameters, data }: { url: string; parameters?: any; data?: any }) =>
    appAxios.put<T>(url, data, { params: parameters }),
};

export default apiService;
