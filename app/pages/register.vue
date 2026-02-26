<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
    <UContainer class="max-w-sm w-full px-4">

      <!-- Header -->
      <div class="text-center mb-8">
        <div class="flex justify-center mb-4">
          <div class="bg-white/10 p-4 rounded-full ring-1 ring-white/20">
            <UIcon name="i-heroicons-user-plus" class="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 class="text-3xl font-bold text-white">Create Account</h1>
        <p class="text-gray-400 mt-2 text-sm">Sign up to get started</p>
      </div>

      <!-- Card -->
      <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col gap-4">
        <UInput
          v-model="name"
          placeholder="Full Name"
          size="lg"
          icon="i-heroicons-user"
        />
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

        <UButton size="lg" class="w-full justify-center" :loading="loading" @click="handleSignUp">
          Create Account
        </UButton>

        <p class="text-center text-sm text-gray-400">
          Already have an account?
          <NuxtLink to="/login" class="text-white hover:underline">Sign in</NuxtLink>
        </p>
      </div>

    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '../../layers/auth/composables/useAuth'

const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const { signUp } = useAuth()
const router = useRouter()

const handleSignUp = async () => {
  if (!name.value || !email.value || !password.value) {
    error.value = 'Please fill in all fields'
    return
  }
  error.value = ''
  loading.value = true
  try {
    await signUp(email.value, password.value, name.value)
    router.push('/login')
  } catch (e: any) {
    error.value = e?.data?.message || 'Something went wrong'
  } finally {
    loading.value = false
  }
}
</script>