<template>
  <button
    class="flex items-center justify-center w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition"
    @click="toggleMode"
  >
    <UIcon
      :name="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'"
      class="w-4 h-4"
      :class="isDark ? 'text-yellow-400' : 'text-blue-400'"
    />
  </button>
</template>

<script setup lang="ts">
const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')

const toggleMode = () => {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>