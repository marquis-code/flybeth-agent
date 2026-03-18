import axios from "axios";

const $GATEWAY_ENDPOINT = import.meta.env.VITE_BASE_URL 
  ? `${import.meta.env.VITE_BASE_URL}/api/v1` 
  : "http://localhost:3000/api/v1";

export const GATEWAY_ENDPOINT = axios.create({
  baseURL: $GATEWAY_ENDPOINT,
});

export const GATEWAY_ENDPOINT_WITH_AUTH = axios.create({
  baseURL: $GATEWAY_ENDPOINT,
});

// Add interceptors if needed (e.g., for auth tokens)
GATEWAY_ENDPOINT_WITH_AUTH.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
