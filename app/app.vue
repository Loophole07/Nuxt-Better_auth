<script setup>
import { SpeedInsights } from '@vercel/speed-insights/vue'
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
    <SpeedInsights />
  </div>
</template>