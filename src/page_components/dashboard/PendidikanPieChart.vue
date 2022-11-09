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
    { value: 20, name: 'D1' },
    { value: 20, name: 'D3' },
    { value: 20, name: 'S1' },
    { value: 18, name: 'S2' },
    { value: 2, name: 'SD' },
    { value: 10, name: 'SMA' },
    { value: 10, name: 'SMP' }
  ]
  const color = [
    '#001219',
    '#005f73',
    '#0a9396',
    '#94d2bd',
    '#e9d8a6',
    '#ee9b00',
    '#ca6702',
    '#bb3e03',
    '#ae2012',
    '#9b2226'
  ]

  if (chartEl.value) {
    init({ el: chartEl.value, data: data, title: 'Pendidikan', color })
  }
})
</script>
<script lang="ts"></script>
