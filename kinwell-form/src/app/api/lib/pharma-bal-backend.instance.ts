import axios from "axios";

export const pharmaPalInstance = axios.create({
  baseURL: "https://api.curedclick.com/",
  withCredentials: true,
});
