import axios from "axios";

export const pharmaPalInstance = axios.create({
  baseURL: process.env.QUICK_CARE_API_URL,
  withCredentials: true,
});
