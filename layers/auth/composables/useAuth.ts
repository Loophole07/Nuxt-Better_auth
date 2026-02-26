import { ofetch } from 'ofetch'
import { ref } from 'vue'

interface AuthUser {
  id: string
  email: string
  name: string
}

const user = ref<AuthUser | null>(null)

const getBaseURL = () => {
  if (process.server) return 'http://localhost:3000'
  return ''
}

export const useAuth = () => {
  const signUp = async (email: string, password: string, name: string) => {
    const res = await ofetch(`${getBaseURL()}/api/auth/sign-up/email`, {
      method: 'POST',
      body: { email, password, name }
    })
    user.value = res.user
    return res
  }

  const signIn = async (email: string, password: string) => {
    const res = await ofetch(`${getBaseURL()}/api/auth/sign-in/email`, {
      method: 'POST',
      body: { email, password }
    })
    user.value = res.user
    return res
  }

  const signOut = async () => {
    await ofetch(`${getBaseURL()}/api/auth/sign-out`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {}
    })
    user.value = null
  }

  const getSession = async (headers?: Record<string, string>) => {
    try {
      const res = await ofetch(`${getBaseURL()}/api/auth/get-session`, {
        credentials: 'include',
        headers: headers ?? {}
      })
      console.log('get-session response:', res)
      user.value = res?.user ?? null
    } catch (e) {
      console.log('get-session error:', e)
      user.value = null
    }
  }

  const changePassword = async (currentPassword: string, newPassword: string) => {
    const res = await ofetch(`${getBaseURL()}/api/auth/change-password`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: { currentPassword, newPassword }
    })
    return res
  }

  return { user, signUp, signIn, signOut, getSession, changePassword }
}