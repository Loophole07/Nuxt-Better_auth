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

    <!-- Loading -->
    <div v-if="pending" class="flex flex-col items-center justify-center py-32 gap-4">
      <div class="w-12 h-12 rounded-full border-4 border-white/10 border-t-white animate-spin" />
      <p class="text-gray-400 text-sm">Loading profile...</p>
    </div>

    <div v-else-if="user" class="px-6 py-8 max-w-7xl mx-auto">

      <!-- Top Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

        <!-- Profile Card — takes 1 col -->
        <div class="lg:col-span-1">
          <ProfileCard :user="user" />
        </div>

        <!-- Language Chart — takes 2 cols -->
        <div class="lg:col-span-2">
          <LanguageChart v-if="languageStats.length > 0" :stats="languageStats" />
        </div>

      </div>

      <!-- Repos Section -->
      <div>
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold text-white">Top Repositories</h2>
          <span class="text-xs text-gray-500 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
            {{ repos?.length ?? 0 }} repos
          </span>
        </div>

        <div v-if="reposPending" class="flex justify-center py-10">
          <div class="w-8 h-8 rounded-full border-4 border-white/10 border-t-white animate-spin" />
        </div>

        <!-- Repos 3 column grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <RepoCard v-for="repo in repos" :key="repo.id" :repo="repo" />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const route = useRoute()
const { getUser, getRepos, getLanguageStats } = useGitHub()

const username = route.params.username as string

const { data: user, pending } = await useAsyncData(
  `user-${username}`,
  () => getUser(username)
)

const { data: repos, pending: reposPending } = await useAsyncData(
  `repos-${username}`,
  () => getRepos(username)
)

const languageStats = computed(() => {
  if (!repos.value) return []
  return getLanguageStats(repos.value)
})
</script>