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
    { value: 20, name: '17-30' },
    { value: 20, name: '31-40' },
    { value: 20, name: '>41' }
  ]
  const color = ['#8ecae6', '#219ebc', '#023047', '#ffb703', '#fb8500']

  if (chartEl.value) {
    init({ el: chartEl.value, data: data, title: 'Umur', color })
  }
})
</script>
<script lang="ts">
export default {
  name: 'UmurPieChart'
}
</script>
