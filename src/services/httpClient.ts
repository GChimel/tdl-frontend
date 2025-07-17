import axios from "axios";

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

httpClient.interceptors.request.use((config) => {
  let token = null;
  try {
    const authState = JSON.parse(
      localStorage.getItem("auth-storage") || "null"
    );
    token = authState?.state?.token;
  } catch {}
  if (token) {
    config.headers = config.headers || {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});
