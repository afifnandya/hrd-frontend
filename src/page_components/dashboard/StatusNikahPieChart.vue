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
    { value: 20, name: 'K1' },
    { value: 20, name: 'K2' },
    { value: 10, name: 'K3' },
    { value: 10, name: 'k4' },
    { value: 50, name: 'K5' }
  ]
  const color = ['#caf0f8', '#03045e', '#0077b6', '#00b4d8', '#90e0ef']

  if (chartEl.value) {
    init({ el: chartEl.value, data: data, title: 'Status Nikah', color })
  }
})
</script>
<script lang="ts"></script>
