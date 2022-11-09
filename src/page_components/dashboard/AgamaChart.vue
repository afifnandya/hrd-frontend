<template>
  <div>
    <div ref="chartEl" class="w-full h-[200px]"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { usePieChart } from '@/composable/usePieChart'

const chartEl = ref<HTMLElement>()
const { init } = usePieChart()

onMounted(() => {
  const data = [
    { value: 80, name: 'Islam' },
    { value: 10, name: 'Kristen' },
    { value: 5, name: 'Hindu' },
    { value: 5, name: 'Katolik' }
  ]
  const color = ['#ffbe0b', '#fb5607', '#ff006e', '#8338ec', '#3a86ff']

  if (chartEl.value) {
    init({ el: chartEl.value, data: data, title: 'Agama', color })
  }
})
</script>
<script lang="ts"></script>
