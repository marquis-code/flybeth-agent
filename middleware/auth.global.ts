export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie('token')
  const publicRoutes = ['/', '/auth/login', '/auth/signup', '/onboarding']
  
  if (!token.value && !publicRoutes.includes(to.path) && to.path.startsWith('/dashboard')) {
    return navigateTo('/')
  }
})
