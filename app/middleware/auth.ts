import { useAuth } from '../../layers/auth/composables/useAuth'
import { useRequestHeaders } from '#app'

export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === '/login' || to.path === '/register') return

  const { user, getSession } = useAuth()
  const headers = useRequestHeaders(['cookie']) as Record<string, string>

  await getSession(headers)

  console.log('session user:', user.value)
  console.log('user exists:', !!user.value)

  if (!user.value || !user.value.id) {
    return navigateTo('/login')
  }
})