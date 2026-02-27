<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
    <div class="max-w-2xl mx-auto px-4 py-10">

      <!-- Navbar -->
      <div class="flex items-center justify-between mb-12">
        <div class="flex items-center gap-2">
          <UIcon name="i-simple-icons-github" class="w-6 h-6 text-white" />
          <span class="text-white font-semibold text-sm">GitHub Finder</span>
        </div>
        <div class="flex items-center gap-4">

          <!-- User greeting -->
          <div v-if="user" class="flex items-center gap-2">
            <div class="w-7 h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
              <span class="text-white text-xs font-bold">
                {{ user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() }}
              </span>
            </div>
            <span class="text-gray-300 text-xs">{{ user.name || user.email }}</span>
          </div>

          <NuxtLink to="/compare" class="text-xs text-gray-400 hover:text-white transition">
            Compare
          </NuxtLink>
          <NuxtLink to="/bookmarks" class="text-xs text-gray-400 hover:text-white transition">
            Bookmarks
          </NuxtLink>
          <NuxtLink to="/change-password" class="text-xs text-gray-400 hover:text-white transition">
            Settings
          </NuxtLink>
          <button
            class="text-xs bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white px-3 py-1.5 rounded-full border border-white/10 transition"
            @click="handleSignOut"
          >
            Sign Out
          </button>
        </div>
      </div>

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

      <!-- Quick Actions -->
      <div class="grid grid-cols-3 gap-3 mt-4">
        <NuxtLink
          to="/compare"
          class="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition flex items-center gap-3"
        >
          <UIcon name="i-heroicons-scale" class="w-5 h-5 text-blue-400" />
          <div>
            <p class="text-white text-sm font-semibold">Compare Users</p>
            <p class="text-gray-500 text-xs">Side by side stats</p>
          </div>
        </NuxtLink>
        <NuxtLink
          to="/bookmarks"
          class="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition flex items-center gap-3"
        >
          <UIcon name="i-heroicons-bookmark" class="w-5 h-5 text-yellow-400" />
          <div>
            <p class="text-white text-sm font-semibold">Bookmarks</p>
            <p class="text-gray-500 text-xs">Saved profiles</p>
          </div>
        </NuxtLink>
        <NuxtLink
          to="/change-password"
          class="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition flex items-center gap-3"
        >
          <UIcon name="i-heroicons-key" class="w-5 h-5 text-purple-400" />
          <div>
            <p class="text-white text-sm font-semibold">Change Password</p>
            <p class="text-gray-500 text-xs">Update your credentials</p>
          </div>
        </NuxtLink>
      </div>

      <!-- Easter Egg -->
      <Transition name="bounce">
        <div
          v-if="easterEgg"
          class="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
        >
          <div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center shadow-2xl">
            <p class="text-5xl mb-4">🎉</p>
            <p class="text-2xl font-bold text-white">You found it!</p>
            <p class="text-gray-400 mt-2 text-sm">Konami Code activated</p>
            <p class="text-gray-500 mt-1 text-xs">↑ ↑ ↓ ↓ ← → ← → B A</p>
          </div>
        </div>
      </Transition>

      <!-- Footer -->
      <p class="text-center text-xs text-gray-600 mt-8">
        Powered by GitHub Public API
      </p>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuth } from '../../layers/auth/composables/useAuth'

definePageMeta({
  middleware: 'auth'
})

const username = ref('')
const error = ref(false)
const loading = ref(false)
const { getUser } = useGitHub()
const { signOut, user, getSession } = useAuth()
const router = useRouter()

onMounted(async () => {
  await getSession()
})

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

const handleSignOut = async () => {
  await signOut()
  router.push('/login')
}

// Konami Code Easter egg
const konamiCode = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a'
]
const konamiProgress = ref<string[]>([])
const easterEgg = ref(false)

const handleKeydown = (e: KeyboardEvent) => {
  konamiProgress.value.push(e.key)
  if (konamiProgress.value.length > konamiCode.length) {
    konamiProgress.value.shift()
  }
  if (JSON.stringify(konamiProgress.value) === JSON.stringify(konamiCode)) {
    easterEgg.value = true
    setTimeout(() => easterEgg.value = false, 4000)
    konamiProgress.value = []
  }
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.4s;
}
.bounce-leave-active {
  animation: bounce-in 0.3s reverse;
}
@keyframes bounce-in {
  0% { transform: scale(0.5); opacity: 0; }
  60% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); }
}
</style>