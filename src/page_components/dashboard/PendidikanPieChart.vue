<template>
  <div>
    <div ref="chartEl" class="w-full h-[200px]"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, PropType, ref, watch } from 'vue'
import { usePieChart } from '@/composable/usePieChart'
import { EChartsType } from 'echarts/core'

const chartEl = ref<HTMLElement>()
const { init, setData } = usePieChart()
let chartInstance = ref<EChartsType>()

const props = defineProps({
  data: Array as PropType<{ value: number | string; name: string }[]>
})

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

onMounted(() => {
  if (chartEl.value) {
    chartInstance.value = init({
      el: chartEl.value,
      title: 'Pendidikan',
      color
    })
    chartInstance.value.showLoading()
  }
})

watch(
  () => props.data,
  (newVal) => {
    if (newVal?.length) {
      setData({
        data: newVal,
        color: color
      })
      chartInstance.value?.hideLoading()
    }
  },
  {
    immediate: true,
    deep: true
  }
)
</script>
<script lang="ts"></script>
