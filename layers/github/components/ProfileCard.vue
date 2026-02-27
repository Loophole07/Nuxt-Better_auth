<template>
  <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-2xl">

    <!-- Top section -->
    <div class="flex gap-6 items-center">
      <img :src="user.avatar_url" class="w-24 h-24 rounded-full ring-4 ring-white/10" />
      <div>
        <h2 class="text-2xl font-bold text-white">{{ user.name || user.login }}</h2>
        <p class="text-gray-400 text-sm">@{{ user.login }}</p>
        <p v-if="user.bio" class="mt-2 text-sm text-gray-300">{{ user.bio }}</p>
        <p v-if="user.location" class="text-sm text-gray-400 mt-1 flex items-center gap-1">
          <UIcon name="i-heroicons-map-pin" class="w-4 h-4" />
          {{ user.location }}
        </p>
      </div>
    </div>

    <!-- Stats -->
    <div class="flex gap-4 mt-6">
      <div class="flex-1 bg-white/5 rounded-xl p-4 text-center border border-white/10">
        <p class="text-2xl font-bold text-white">{{ user.public_repos }}</p>
        <p class="text-xs text-gray-400 mt-1">Repos</p>
      </div>
      <div class="flex-1 bg-white/5 rounded-xl p-4 text-center border border-white/10">
        <p class="text-2xl font-bold text-white">{{ user.followers }}</p>
        <p class="text-xs text-gray-400 mt-1">Followers</p>
      </div>
      <div class="flex-1 bg-white/5 rounded-xl p-4 text-center border border-white/10">
        <p class="text-2xl font-bold text-white">{{ user.following }}</p>
        <p class="text-xs text-gray-400 mt-1">Following</p>
      </div>
    </div>

    <!-- Buttons -->
    <div class="mt-5 flex gap-3">
      <UButton :to="user.html_url" target="_blank" color="neutral" size="sm">
        <UIcon name="i-simple-icons-github" class="w-4 h-4 mr-2" />
        View on GitHub
      </UButton>
      <button
        class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition"
        :class="isBookmarked(user.login)
          ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/20 hover:bg-yellow-500/30'
          : 'bg-white/10 text-gray-300 border border-white/10 hover:bg-white/20'"
        @click="toggleBookmark"
      >
        <UIcon
          :name="isBookmarked(user.login) ? 'i-heroicons-bookmark-solid' : 'i-heroicons-bookmark'"
          class="w-4 h-4"
        />
        {{ isBookmarked(user.login) ? 'Saved' : 'Bookmark' }}
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import confetti from 'canvas-confetti'

const props = defineProps<{ user: GHUser }>()
const { add, remove, isBookmarked } = useBookmarks()

const fireConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']
  })
}

const toggleBookmark = () => {
  if (isBookmarked(props.user.login)) {
    remove(props.user.login)
  } else {
    add({
      login: props.user.login,
      name: props.user.name,
      avatar_url: props.user.avatar_url,
      bio: props.user.bio,
      followers: props.user.followers,
      following: props.user.following,
      public_repos: props.user.public_repos,
      html_url: props.user.html_url
    })
    fireConfetti()
  }
}
</script>