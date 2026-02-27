<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 light:from-gray-50 light:via-white light:to-gray-100">
    <UContainer class="max-w-sm w-full px-4">

      <!-- Back -->
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition mb-8"
      >
        <UIcon name="i-heroicons-arrow-left" class="w-4 h-4" />
        Back
      </NuxtLink>

      <!-- Header -->
      <div class="text-center mb-8">
        <div class="flex justify-center mb-4">
          <div class="bg-white/10 p-4 rounded-full ring-1 ring-white/20">
            <UIcon name="i-heroicons-key" class="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 class="text-3xl font-bold text-white">Change Password</h1>
        <p class="text-gray-400 mt-2 text-sm">Update your account password</p>
      </div>

      <!-- Card -->
      <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col gap-4">

        <UInput
          v-model="currentPassword"
          type="password"
          placeholder="Current Password"
          size="lg"
          icon="i-heroicons-lock-closed"
        />
        <UInput
          v-model="newPassword"
          type="password"
          placeholder="New Password"
          size="lg"
          icon="i-heroicons-lock-open"
        />
        <UInput
          v-model="confirmPassword"
          type="password"
          placeholder="Confirm New Password"
          size="lg"
          icon="i-heroicons-lock-open"
        />

        <!-- Error -->
        <UAlert
          v-if="error"
          color="error"
          variant="soft"
          icon="i-heroicons-exclamation-circle"
          :description="error"
        />

        <!-- Success -->
        <UAlert
          v-if="success"
          color="success"
          variant="soft"
          icon="i-heroicons-check-circle"
          description="Password changed successfully!"
        />

        <UButton
          size="lg"
          class="w-full justify-center"
          :loading="loading"
          @click="handleChangePassword"
        >
          Update Password
        </UButton>

      </div>

    </UContainer>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '../../layers/auth/composables/useAuth'

definePageMeta({
  middleware: 'auth'
})

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const error = ref('')
const success = ref(false)
const loading = ref(false)
const { changePassword } = useAuth()

const handleChangePassword = async () => {
  error.value = ''
  success.value = false

  if (!currentPassword.value || !newPassword.value || !confirmPassword.value) {
    error.value = 'Please fill in all fields'
    return
  }

  if (newPassword.value !== confirmPassword.value) {
    error.value = 'New passwords do not match'
    return
  }

  if (newPassword.value.length < 8) {
    error.value = 'New password must be at least 8 characters'
    return
  }

  loading.value = true
  try {
    await changePassword(currentPassword.value, newPassword.value)
    success.value = true
    currentPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
  } catch (e: any) {
    error.value = e?.data?.message || 'Failed to change password'
  } finally {
    loading.value = false
  }
}
</script>