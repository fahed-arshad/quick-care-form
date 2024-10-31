import axios from "axios";

export const pharmaPalInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PHARMA_PAL_API_URL,
  withCredentials: true,
});
