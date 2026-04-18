export default defineNuxtRouteMiddleware((to) => {
  // ─── Client-side only ──────────────────────────────────────────────────────
  // localStorage is not available on the server.
  if (import.meta.server) return

  // ─── Read Authentication State ─────────────────────────────────────────────
  const token = localStorage.getItem('accessToken')
  const userProfile = localStorage.getItem('user_profile')

  // Aggressive validation: Token must exist and look like a JWT (3 parts)
  const hasValidToken = !!token && token.split('.').length === 3
  const hasUser = !!userProfile && userProfile !== 'undefined' && userProfile !== 'null'

  const isAuthenticated = hasValidToken && hasUser

  // ─── Route Definitions ─────────────────────────────────────────────────────
  const authRoutes = [
    '/auth/login',
    '/auth/signup',
    '/auth/register',
    '/auth/verify',
    '/auth/forgot-password',
    '/auth/reset-password',
    '/auth/success'
  ]
  const isAuthRoute = authRoutes.includes(to.path)
  const isDashboardRoute = to.path.startsWith('/dashboard')

  // ─── Redirection Logic ─────────────────────────────────────────────────────

  // 1. If trying to access dashboard but NOT authenticated, force login
  if (!isAuthenticated && isDashboardRoute) {
    console.warn('[AUTH MIDDLEWARE] Not authenticated, redirecting to login')
    return navigateTo('/auth/login', { replace: true })
  }

  // 2. If trying to access auth pages but ALREADY authenticated, skip to dashboard
  if (isAuthenticated && isAuthRoute) {
    console.warn('[AUTH MIDDLEWARE] Already authenticated, skipping to dashboard')
    return navigateTo('/dashboard', { replace: true })
  }
})