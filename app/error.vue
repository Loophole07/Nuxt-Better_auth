<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
    <div class="text-center px-4">

      <!-- Icon -->
      <div class="flex justify-center mb-6">
        <div class="bg-white/10 p-6 rounded-full ring-1 ring-white/20">
          <UIcon name="i-heroicons-face-frown" class="w-16 h-16 text-gray-400" />
        </div>
      </div>

      <!-- Error Code -->
      <h1 class="text-8xl font-extrabold text-white tracking-tight mb-2">
        {{ error?.statusCode || 404 }}
      </h1>

      <!-- Message -->
      <p class="text-xl font-semibold text-gray-300 mb-2">
        {{ error?.statusCode === 404 ? 'Page not found' : 'Something went wrong' }}
      </p>
      <p class="text-gray-500 text-sm mb-8">
        {{ error?.statusCode === 404
          ? "The page you're looking for doesn't exist."
          : 'An unexpected error occurred. Please try again.' }}
      </p>

      <!-- Actions -->
      <div class="flex items-center justify-center gap-4">
        <UButton
          size="lg"
          class="bg-white text-gray-900 hover:bg-gray-100 font-semibold"
          @click="handleError"
        >
          Go Home
        </UButton>
        <UButton
          size="lg"
          variant="outline"
          color="neutral"
          @click="handleSignIn"
        >
          Sign In
        </UButton>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const handleError = () => clearError({ redirect: '/' })
const handleSignIn = () => clearError({ redirect: '/login' })
</script>
