/**
 * Auth Cleanup Plugin
 * 
 * Runs ONCE on client-side app init.
 * Nukes any leftover cookies from the old cookie-based auth system
 * so they never interfere with the new localStorage-based auth.
 */
export default defineNuxtPlugin(() => {
  if (import.meta.server) return

  // One-time cleanup: remove old auth cookies completely
  const cookieNames = ['accessToken', 'refreshToken', 'user_profile']
  cookieNames.forEach(name => {
    document.cookie = `${name}=; path=/; max-age=0`
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
  })
})
