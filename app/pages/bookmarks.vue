<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">

    <!-- Navbar -->
    <div class="border-b border-white/10 px-6 py-4 flex items-center justify-between">
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
      >
        <UIcon name="i-heroicons-arrow-left" class="w-4 h-4" />
        Back to search
      </NuxtLink>
      <div class="flex items-center gap-2">
        <UIcon name="i-simple-icons-github" class="w-5 h-5 text-white" />
        <span class="text-white font-semibold text-sm">GitHub Finder</span>
      </div>
    </div>

    <div class="px-6 py-8 max-w-7xl mx-auto">

      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-white">Bookmarks</h1>
          <p class="text-gray-400 text-sm mt-1">Your saved GitHub profiles</p>
        </div>
        <span class="text-xs text-gray-500 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
          {{ bookmarks.length }} saved
        </span>
      </div>

      <!-- Empty State -->
      <div v-if="bookmarks.length === 0" class="flex flex-col items-center justify-center py-32 gap-4">
        <div class="bg-white/10 p-6 rounded-full ring-1 ring-white/20">
          <UIcon name="i-heroicons-bookmark" class="w-12 h-12 text-gray-400" />
        </div>
        <p class="text-white font-semibold text-lg">No bookmarks yet</p>
        <p class="text-gray-400 text-sm">Search for a GitHub user and bookmark them</p>
        <NuxtLink
          to="/"
          class="mt-2 text-sm text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl border border-white/10 transition"
        >
          Search Users
        </NuxtLink>
      </div>

      <!-- Bookmarks Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="user in bookmarks"
          :key="user.login"
          class="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition"
        >
          <div class="flex items-start gap-4">
            <img :src="user.avatar_url" class="w-14 h-14 rounded-full ring-2 ring-white/10" />
            <div class="flex-1 min-w-0">
              <h3 class="text-white font-semibold truncate">{{ user.name || user.login }}</h3>
              <p class="text-gray-400 text-sm">@{{ user.login }}</p>
              <p v-if="user.bio" class="text-gray-500 text-xs mt-1 line-clamp-2">{{ user.bio }}</p>
            </div>
          </div>

          <!-- Stats -->
          <div class="flex gap-4 mt-4 text-center">
            <div class="flex-1 bg-white/5 rounded-xl py-2">
              <p class="text-white font-bold text-sm">{{ user.public_repos }}</p>
              <p class="text-gray-500 text-xs">Repos</p>
            </div>
            <div class="flex-1 bg-white/5 rounded-xl py-2">
              <p class="text-white font-bold text-sm">{{ user.followers }}</p>
              <p class="text-gray-500 text-xs">Followers</p>
            </div>
            <div class="flex-1 bg-white/5 rounded-xl py-2">
              <p class="text-white font-bold text-sm">{{ user.following }}</p>
              <p class="text-gray-500 text-xs">Following</p>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-2 mt-4">
            <NuxtLink
              :to="`/user/${user.login}`"
              class="flex-1 text-center text-xs bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white py-2 rounded-xl border border-white/10 transition"
            >
              View Profile
            </NuxtLink>
            <button
              class="text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 px-3 py-2 rounded-xl border border-red-500/20 transition"
              @click="remove(user.login)"
            >
              <UIcon name="i-heroicons-trash" class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const { bookmarks, remove } = useBookmarks()

onMounted(() => {
  const stored = localStorage.getItem('gh-bookmarks')
  bookmarks.value = stored ? JSON.parse(stored) : []
})
</script>