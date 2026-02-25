<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
    <UContainer class="max-w-2xl py-10 px-4">

      <!-- Back -->
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition mb-8"
      >
        <UIcon name="i-heroicons-arrow-left" class="w-4 h-4" />
        Back to search
      </NuxtLink>

      <!-- Loading -->
      <div v-if="pending" class="flex flex-col items-center justify-center py-32 gap-4">
        <div class="w-12 h-12 rounded-full border-4 border-white/10 border-t-white animate-spin" />
        <p class="text-gray-400 text-sm">Loading profile...</p>
      </div>

      <div v-else-if="user" class="flex flex-col gap-8">

        <!-- Profile Card -->
        <ProfileCard :user="user" />

        <!-- Repos -->
        <div>
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold text-white">Top Repositories</h2>
            <span class="text-xs text-gray-500 bg-white/10 px-3 py-1 rounded-full">
              {{ repos?.length ?? 0 }} repos
            </span>
          </div>

          <!-- Repos Loading -->
          <div v-if="reposPending" class="flex justify-center py-10">
            <div class="w-8 h-8 rounded-full border-4 border-white/10 border-t-white animate-spin" />
          </div>

          <div v-else class="flex flex-col gap-4">
            <RepoCard v-for="repo in repos" :key="repo.id" :repo="repo" />
          </div>
        </div>

      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { getUser, getRepos } = useGitHub()

const username = route.params.username as string

const { data: user, pending } = await useAsyncData(
  `user-${username}`,
  () => getUser(username)
)

const { data: repos, pending: reposPending } = await useAsyncData(
  `repos-${username}`,
  () => getRepos(username)
)
</script>