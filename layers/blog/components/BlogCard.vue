<template>
  <div class="card">
    <h2>{{ title }}</h2>
    <p>{{ excerpt }}</p>
    <BaseButton>Read Post</BaseButton>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string; excerpt: string }>()
</script>

<style scoped>
.card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}
</style>