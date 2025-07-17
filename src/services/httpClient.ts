import axios from "axios";

export const httpClient = axios.create({
  baseURL: "http://localhost:3000",
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
