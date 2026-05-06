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

// ✅ Global 401 event bus — triggers the in-app AuthModal instead of redirecting
export const authEventTarget = new EventTarget();

// ✅ 401 Response Handler - Emits a custom event so the AuthModal can react
const instances = [GATEWAY_ENDPOINT, GATEWAY_ENDPOINT_WITH_AUTH];

instances.forEach((instance) => {
  instance.interceptors.response.use(
    (response) => response,
    (err) => {
      if (err.response && err.response.status === 401) {
        console.warn(`[Axios] 401 Unauthorized at ${err.config?.url}. Showing auth modal.`);
        // Dispatch a global event for the AuthModal to catch
        if (import.meta.client) {
          authEventTarget.dispatchEvent(new CustomEvent('auth:required'));
        }
      }
      return Promise.reject(err);
    }
  );
});