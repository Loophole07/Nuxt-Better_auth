<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
    <UContainer class="max-w-lg w-full px-4">

      <!-- Header -->
      <div class="text-center mb-10">
        <div class="flex justify-center mb-5">
          <div class="bg-white/10 p-5 rounded-full ring-1 ring-white/20">
            <UIcon name="i-simple-icons-github" class="w-12 h-12 text-white" />
          </div>
        </div>
        <h1 class="text-5xl font-extrabold text-white tracking-tight">GitHub Finder</h1>
        <p class="text-gray-400 mt-3 text-base">Search any GitHub username instantly</p>
      </div>

      <!-- Search Card -->
      <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-2xl">
        <div class="flex gap-3">
          <UInput
            v-model="username"
            placeholder="e.g. torvalds"
            size="lg"
            class="flex-1"
            :loading="loading"
            icon="i-heroicons-magnifying-glass"
            @keyup.enter="search"
          />
          <UButton
            size="lg"
            :loading="loading"
            class="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-5 rounded-xl"
            @click="search"
          >
            Search
          </UButton>
        </div>

        <!-- Error -->
        <UAlert
          v-if="error"
          class="mt-4"
          color="error"
          variant="soft"
          icon="i-heroicons-exclamation-circle"
          title="User not found"
          description="Please check the username and try again."
        />

        <!-- Suggestions -->
        <div class="mt-5">
          <p class="text-xs text-gray-500 uppercase tracking-widest mb-3">Popular searches</p>
          <div class="flex gap-2 flex-wrap">
            <button
              v-for="name in suggestions"
              :key="name"
              class="px-3 py-1.5 rounded-full text-sm bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white transition-all border border-white/10 cursor-pointer"
              @click="quickSearch(name)"
            >
              {{ name }}
            </button>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <p class="text-center text-xs text-gray-600 mt-8">
        Powered by GitHub Public API
      </p>

    </UContainer>
  </div>
</template>

<script setup lang="ts">
const username = ref('')
const error = ref(false)
const loading = ref(false)
const { getUser } = useGitHub()
const router = useRouter()

const suggestions = ['torvalds', 'gaearon', 'yyx990803', 'sindresorhus']

const search = async () => {
  if (!username.value.trim()) return
  error.value = false
  loading.value = true
  try {
    await getUser(username.value)
    router.push(`/user/${username.value}`)
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
}

const quickSearch = (name: string) => {
  username.value = name
  search()
}
</script>