<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
    <UContainer class="max-w-4xl py-10 px-4">

      <!-- Back -->
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition mb-8"
      >
        <UIcon name="i-heroicons-arrow-left" class="w-4 h-4" />
        Back to search
      </NuxtLink>

      <!-- Header -->
      <div class="text-center mb-10">
        <h1 class="text-3xl font-bold text-white">Compare GitHub Users</h1>
        <p class="text-gray-400 mt-2 text-sm">Enter two usernames to compare their stats</p>
      </div>

      <!-- Inputs -->
      <div class="grid grid-cols-2 gap-4 mb-8">
        <UInput
          v-model="username1"
          placeholder="First username"
          size="lg"
          icon="i-heroicons-user"
          @keyup.enter="compare"
        />
        <UInput
          v-model="username2"
          placeholder="Second username"
          size="lg"
          icon="i-heroicons-user"
          @keyup.enter="compare"
        />
      </div>

      <div class="flex justify-center mb-8">
        <UButton size="lg" :loading="loading" @click="compare">
          Compare
        </UButton>
      </div>

      <!-- Error -->
      <UAlert
        v-if="error"
        class="mb-6"
        color="error"
        variant="soft"
        icon="i-heroicons-exclamation-circle"
        :description="error"
      />

      <!-- Results -->
      <div v-if="user1 && user2" class="flex flex-col gap-6">

        <!-- Avatars and names -->
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <img :src="user1.avatar_url" class="w-20 h-20 rounded-full mx-auto ring-4 ring-white/10" />
            <h2 class="text-xl font-bold text-white mt-3">{{ user1.name || user1.login }}</h2>
            <p class="text-gray-400 text-sm">@{{ user1.login }}</p>
            <p v-if="user1.bio" class="text-gray-400 text-xs mt-2 line-clamp-2">{{ user1.bio }}</p>
            <UButton :to="user1.html_url" target="_blank" variant="link" color="neutral" size="xs" class="mt-3">
              <UIcon name="i-simple-icons-github" class="w-3 h-3 mr-1" />
              View Profile
            </UButton>
          </div>

          <div class="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <img :src="user2.avatar_url" class="w-20 h-20 rounded-full mx-auto ring-4 ring-white/10" />
            <h2 class="text-xl font-bold text-white mt-3">{{ user2.name || user2.login }}</h2>
            <p class="text-gray-400 text-sm">@{{ user2.login }}</p>
            <p v-if="user2.bio" class="text-gray-400 text-xs mt-2 line-clamp-2">{{ user2.bio }}</p>
            <UButton :to="user2.html_url" target="_blank" variant="link" color="neutral" size="xs" class="mt-3">
              <UIcon name="i-simple-icons-github" class="w-3 h-3 mr-1" />
              View Profile
            </UButton>
          </div>
        </div>

        <!-- Stats Comparison -->
        <div class="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">

          <!-- Repos -->
          <div class="grid grid-cols-3 items-center p-4 border-b border-white/10">
            <div
              class="text-center text-2xl font-bold"
              :class="user1.public_repos >= user2.public_repos ? 'text-green-400' : 'text-gray-400'"
            >
              {{ user1.public_repos }}
              <span v-if="user1.public_repos > user2.public_repos" class="text-xs ml-1">👑</span>
            </div>
            <div class="text-center text-xs text-gray-500 uppercase tracking-widest">Repos</div>
            <div
              class="text-center text-2xl font-bold"
              :class="user2.public_repos >= user1.public_repos ? 'text-green-400' : 'text-gray-400'"
            >
              {{ user2.public_repos }}
              <span v-if="user2.public_repos > user1.public_repos" class="text-xs ml-1">👑</span>
            </div>
          </div>

          <!-- Followers -->
          <div class="grid grid-cols-3 items-center p-4 border-b border-white/10">
            <div
              class="text-center text-2xl font-bold"
              :class="user1.followers >= user2.followers ? 'text-green-400' : 'text-gray-400'"
            >
              {{ user1.followers }}
              <span v-if="user1.followers > user2.followers" class="text-xs ml-1">👑</span>
            </div>
            <div class="text-center text-xs text-gray-500 uppercase tracking-widest">Followers</div>
            <div
              class="text-center text-2xl font-bold"
              :class="user2.followers >= user1.followers ? 'text-green-400' : 'text-gray-400'"
            >
              {{ user2.followers }}
              <span v-if="user2.followers > user1.followers" class="text-xs ml-1">👑</span>
            </div>
          </div>

          <!-- Following -->
          <div class="grid grid-cols-3 items-center p-4 border-b border-white/10">
            <div
              class="text-center text-2xl font-bold"
              :class="user1.following >= user2.following ? 'text-green-400' : 'text-gray-400'"
            >
              {{ user1.following }}
              <span v-if="user1.following > user2.following" class="text-xs ml-1">👑</span>
            </div>
            <div class="text-center text-xs text-gray-500 uppercase tracking-widest">Following</div>
            <div
              class="text-center text-2xl font-bold"
              :class="user2.following >= user1.following ? 'text-green-400' : 'text-gray-400'"
            >
              {{ user2.following }}
              <span v-if="user2.following > user1.following" class="text-xs ml-1">👑</span>
            </div>
          </div>

          <!-- Overall Winner -->
          <div class="p-4 text-center">
            <p class="text-xs text-gray-500 uppercase tracking-widest mb-2">Overall Winner</p>
            <p class="text-xl font-bold text-green-400">
              {{ getWinner() }}
            </p>
          </div>

        </div>
      </div>

    </UContainer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const username1 = ref('')
const username2 = ref('')
const user1 = ref<GHUser | null>(null)
const user2 = ref<GHUser | null>(null)
const loading = ref(false)
const error = ref('')
const { getUser } = useGitHub()

const compare = async () => {
  if (!username1.value.trim() || !username2.value.trim()) {
    error.value = 'Please enter both usernames'
    return
  }
  error.value = ''
  loading.value = true
  user1.value = null
  user2.value = null
  try {
    const [u1, u2] = await Promise.all([
      getUser(username1.value),
      getUser(username2.value)
    ])
    user1.value = u1
    user2.value = u2
  } catch {
    error.value = 'One or both usernames not found'
  } finally {
    loading.value = false
  }
}

const getWinner = () => {
  if (!user1.value || !user2.value) return ''
  let score1 = 0
  let score2 = 0
  if (user1.value.public_repos > user2.value.public_repos) score1++
  else if (user2.value.public_repos > user1.value.public_repos) score2++
  if (user1.value.followers > user2.value.followers) score1++
  else if (user2.value.followers > user1.value.followers) score2++
  if (user1.value.following > user2.value.following) score1++
  else if (user2.value.following > user1.value.following) score2++
  if (score1 > score2) return `${user1.value.name || user1.value.login} wins!`
  if (score2 > score1) return `${user2.value.name || user2.value.login} wins!`
  return "It's a tie!"
}
</script>