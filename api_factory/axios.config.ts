import axios from "axios";

const rawBaseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
const $GATEWAY_ENDPOINT = rawBaseUrl.endsWith("/api/v1") 
  ? rawBaseUrl 
  : `${rawBaseUrl.replace(/\/+$/, '')}/api/v1`;

export const GATEWAY_ENDPOINT = axios.create({
  baseURL: $GATEWAY_ENDPOINT,
  withCredentials: true,
});

export const GATEWAY_ENDPOINT_WITH_AUTH = axios.create({
  baseURL: $GATEWAY_ENDPOINT,
  withCredentials: true,
});

// ✅ Auth Token Injection - Reads exclusively from localStorage
GATEWAY_ENDPOINT_WITH_AUTH.interceptors.request.use((config) => {
  if (import.meta.client) {
    const token = localStorage.getItem('accessToken');
    if (token && token !== 'null' && token !== 'undefined') {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// ✅ 401 Response Handler - Logs errors but avoids auto-logout to prevent loops
const instances = [GATEWAY_ENDPOINT, GATEWAY_ENDPOINT_WITH_AUTH];

instances.forEach((instance) => {
  instance.interceptors.response.use(
    (response) => response,
    (err) => {
      if (err.response && err.response.status === 401) {
        console.warn(`[Axios] 401 Unauthorized at ${err.config?.url}. Session may have expired.`);
      }
      return Promise.reject(err);
    }
  );
});