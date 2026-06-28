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

const getCookie = (name: string): string | null => {
    if (typeof document === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
};

const setCookie = (name: string, value: string, maxAgeDays: number) => {
    if (typeof document === 'undefined') return;
    document.cookie = `${name}=${value}; path=/; max-age=${maxAgeDays * 86400}; SameSite=Lax`;
};

// ✅ Auth Token Injection - Reads exclusively from cookies
GATEWAY_ENDPOINT_WITH_AUTH.interceptors.request.use((config) => {
  if (import.meta.client) {
    const token = getCookie('accessToken');
    if (token && token !== 'null' && token !== 'undefined') {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

GATEWAY_ENDPOINT_WITH_AUTH.interceptors.response.use(
  (response) => response,
  async (err) => {
    const originalRequest = err.config;

    if (err.response && err.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function(resolve, reject) {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return GATEWAY_ENDPOINT_WITH_AUTH(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = import.meta.client ? getCookie('refreshToken') : null;

      if (!refreshToken) {
         if (import.meta.client) {
            setCookie('accessToken', '', -1);
            setCookie('refreshToken', '', -1);
            setCookie('user_profile', '', -1);
            window.location.href = '/auth/login';
         }
         return Promise.reject(err);
      }

      try {
        const { data } = await GATEWAY_ENDPOINT.post('/auth/refresh', { refreshToken });
        
        const newToken = data?.data?.accessToken || data?.accessToken;
        const newRefreshToken = data?.data?.refreshToken || data?.refreshToken;
        
        if (import.meta.client && newToken) {
          setCookie('accessToken', newToken, 7);
          if (newRefreshToken) {
             setCookie('refreshToken', newRefreshToken, 30);
          }
          processQueue(null, newToken);
          originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
          return GATEWAY_ENDPOINT_WITH_AUTH(originalRequest);
        } else {
          throw new Error('No token returned');
        }
      } catch (refreshError) {
        processQueue(refreshError, null);
        if (import.meta.client) {
            setCookie('accessToken', '', -1);
            setCookie('refreshToken', '', -1);
            setCookie('user_profile', '', -1);
            window.location.href = '/auth/login';
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);