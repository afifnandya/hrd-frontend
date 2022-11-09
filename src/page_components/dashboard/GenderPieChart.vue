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
    { value: 50, name: 'Laki-laki' },
    { value: 50, name: 'Perempuan' }
  ]
  const color = ['#fd8420', '#ffacc7']
  if (chartEl.value) {
    init({ el: chartEl.value, data: data, title: 'Jenis Kelammin', color })
  }
})
</script>
<script lang="ts"></script>
