<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
    <UContainer class="max-w-sm w-full px-4">

      <!-- Header -->
      <div class="text-center mb-8">
        <div class="flex justify-center mb-4">
          <div class="bg-white/10 p-4 rounded-full ring-1 ring-white/20">
            <UIcon name="i-heroicons-lock-closed" class="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 class="text-3xl font-bold text-white">Welcome Back</h1>
        <p class="text-gray-400 mt-2 text-sm">Sign in to your account</p>
      </div>

      <!-- Card -->
      <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col gap-4">
        <UInput
          v-model="email"
          placeholder="Email"
          size="lg"
          icon="i-heroicons-envelope"
        />
        <UInput
          v-model="password"
          type="password"
          placeholder="Password"
          size="lg"
          icon="i-heroicons-lock-closed"
        />

        <UAlert
          v-if="error"
          color="error"
          variant="soft"
          icon="i-heroicons-exclamation-circle"
          :description="error"
        />

        <UButton size="lg" class="w-full justify-center" :loading="loading" @click="handleSignIn">
          Sign In
        </UButton>

        <p class="text-center text-sm text-gray-400">
          Don't have an account?
          <NuxtLink to="/register" class="text-white hover:underline">Register</NuxtLink>
        </p>
      </div>

    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '../../layers/auth/composables/useAuth'

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const { signIn } = useAuth()
const router = useRouter()

const handleSignIn = async () => {
  if (!email.value || !password.value) {
    error.value = 'Please fill in all fields'
    return
  }
  error.value = ''
  loading.value = true
  try {
    await signIn(email.value, password.value)
    router.push('/')
  } catch (e: any) {
    error.value = e?.data?.message || 'Invalid email or password'
  } finally {
    loading.value = false
  }
}
</script>