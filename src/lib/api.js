import axios from "axios"; // es module

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:8000",
  withCredentials: true,
  withXSRFToken: true,
});
