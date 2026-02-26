<template>
  <div class="bg-white/5 border border-white/10 rounded-2xl p-6">
    <h3 class="text-white font-semibold mb-6">Top Languages</h3>

    <div v-if="stats.length === 0" class="text-gray-400 text-sm text-center py-4">
      No language data available
    </div>

    <div v-else class="flex flex-col md:flex-row items-center gap-8">

      <!-- Pie Chart -->
      <div class="w-48 h-48 shrink-0">
        <Pie :data="chartData" :options="chartOptions" />
      </div>

      <!-- Legend -->
      <div class="flex flex-col gap-3 flex-1 w-full">
        <div
          v-for="(stat, index) in stats"
          :key="stat.language"
          class="flex items-center justify-between"
        >
          <div class="flex items-center gap-2">
            <div
              class="w-3 h-3 rounded-full shrink-0"
              :style="{ backgroundColor: colors[index] }"
            />
            <span class="text-gray-300 text-sm">{{ stat.language }}</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                class="h-full rounded-full transition-all"
                :style="{
                  width: `${stat.percentage}%`,
                  backgroundColor: colors[index]
                }"
              />
            </div>
            <span class="text-gray-400 text-xs w-8 text-right">{{ stat.percentage }}%</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const props = defineProps<{ stats: LanguageStat[] }>()

const colors = [
  '#3B82F6', 
  '#10B981', 
  '#F59E0B', 
  '#EF4444', 
  '#8B5CF6', 
  '#EC4899', 
]

const chartData = computed(() => ({
  labels: props.stats.map(s => s.language),
  datasets: [
    {
      data: props.stats.map(s => s.percentage),
      backgroundColor: colors.slice(0, props.stats.length),
      borderColor: 'rgba(255,255,255,0.1)',
      borderWidth: 2
    }
  ]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      callbacks: {
        label: (context: any) => ` ${context.label}: ${context.raw}%`
      }
    }
  }
}
</script>