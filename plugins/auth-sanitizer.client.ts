/**
 * Auth Cleanup Plugin
 *
 * Runs ONCE on client-side app init.
 *
 * Auth now lives in cookies (`accessToken` / `refreshToken` / `user_profile`),
 * which are the single source of truth for the middleware, `useAuth`,
 * `useUser` and the axios interceptors. This plugin used to delete exactly
 * those cookies on every app init, which logged the user out on every hard
 * navigation (e.g. right after `window.location.replace('/dashboard')`).
 *
 * It now only removes the legacy *localStorage* keys from the old auth
 * implementation, which must never be trusted again.
 */
export default defineNuxtPlugin(() => {
  if (import.meta.server) return

  // One-time cleanup: drop the legacy localStorage auth keys.
  const legacyKeys = ['accessToken', 'refreshToken', 'user_profile']
  legacyKeys.forEach((key) => {
    try {
      localStorage.removeItem(key)
    } catch {
      // Ignore storage access errors (private mode, blocked storage, ...)
    }
  })
})
