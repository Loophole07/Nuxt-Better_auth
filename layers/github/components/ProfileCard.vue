<template>
  <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-2xl">

    <!-- Top section -->
    <div class="flex gap-6 items-center">
      <img
        :src="user.avatar_url"
        class="w-24 h-24 rounded-full ring-4 ring-white/10"
      />
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

    <!-- Button -->
    <div class="mt-5">
      <UButton
        :to="user.html_url"
        target="_blank"
        color="neutral"
        size="sm"
      >
        <UIcon name="i-simple-icons-github" class="w-4 h-4 mr-2" />
        View on GitHub
      </UButton>
    </div>

  </div>
</template>

<script setup lang="ts">
defineProps<{ user: GHUser }>()
</script>