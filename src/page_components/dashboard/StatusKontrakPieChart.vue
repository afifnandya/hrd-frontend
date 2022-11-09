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
    { value: 36, name: 'HL' },
    { value: 64, name: 'PKWTT & PKWTT' }
  ]
  if (chartEl.value) {
    init({ el: chartEl.value, data: data, title: 'Status Kontrak' })
  }
})
</script>
<script lang="ts"></script>
