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

const color = ['#ffbe0b', '#fb5607', '#ff006e', '#8338ec', '#3a86ff']

onMounted(() => {
  if (chartEl.value) {
    chartInstance.value = init({
      el: chartEl.value,
      title: 'Agama',
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
