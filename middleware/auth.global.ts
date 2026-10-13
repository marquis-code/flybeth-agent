export default defineNuxtRouteMiddleware((to) => {
  // ─── Client-side only ──────────────────────────────────────────────────────
  // Authentication is enforced on the client, exactly as before.
  if (import.meta.server) return

  // ─── Read Authentication State ─────────────────────────────────────────────
  // SINGLE SOURCE OF TRUTH: cookies.
  //
  // `useAuth.persistSession()` writes the `accessToken` / `refreshToken` /
  // `user_profile` cookies, `api_factory/axios.config.ts` reads those same
  // cookies for the `Authorization` header and the refresh flow, and
  // `useUser()` hydrates `user_profile` from the cookie. The middleware must
  // read the same place — reading localStorage here (which nothing ever wrote)
  // was what produced the infinite login loop.
  const token = useCookie<string | null>('accessToken').value
  const userProfile = useCookie<string | null>('user_profile').value

  // Aggressive validation: Token must exist and look like a JWT (3 parts)
  const hasValidToken =
    !!token &&
    token !== 'null' &&
    token !== 'undefined' &&
    token.split('.').length === 3
  const hasUser =
    !!userProfile &&
    userProfile !== 'undefined' &&
    userProfile !== 'null' &&
    userProfile !== '{}'

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
