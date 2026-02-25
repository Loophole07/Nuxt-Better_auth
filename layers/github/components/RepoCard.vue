<template>
  <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all shadow-lg">

    <div class="flex items-start justify-between gap-4">
      <div class="flex-1">
        <UButton
          :to="repo.html_url"
          target="_blank"
          variant="link"
          color="neutral"
          class="p-0 font-semibold text-white hover:text-blue-400"
        >
          <UIcon name="i-heroicons-book-open" class="w-4 h-4 text-gray-400 mr-2" />
          {{ repo.name }}
        </UButton>
        <p v-if="repo.description" class="text-sm text-gray-400 mt-1 line-clamp-2">
          {{ repo.description }}
        </p>
        <p class="text-xs text-gray-500 mt-2">
          Updated {{ useTimeAgo(new Date(repo.updated_at).getTime() / 1000) }}
        </p>
      </div>
      <UBadge v-if="repo.language" color="primary" variant="soft" class="shrink-0">
        {{ repo.language }}
      </UBadge>
    </div>

    <!-- Stats -->
    <div class="flex gap-4 mt-4 text-sm text-gray-400">
      <span class="flex items-center gap-1">
        <UIcon name="i-heroicons-star" class="w-4 h-4 text-yellow-400" />
        {{ repo.stargazers_count }}
      </span>
      <span class="flex items-center gap-1">
        <UIcon name="i-heroicons-code-bracket" class="w-4 h-4 text-blue-400" />
        {{ repo.forks_count }}
      </span>
    </div>

  </div>
</template>

<script setup lang="ts">
defineProps<{ repo: GHRepo }>()
</script>