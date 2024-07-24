import { Video } from "@/models/videoModels";
import apiService from "./apiService";

const videosService = {
  getAll: () => apiService.get<Video[]>({ url: "/videos" }),
  getLatest: () => apiService.get<Video[]>({ url: "/videos", parameters: { latest: true } }),
};

export default videosService;
