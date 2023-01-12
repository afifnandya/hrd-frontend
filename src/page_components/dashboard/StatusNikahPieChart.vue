<template>
  <div>
    <div ref="chartEl" class="w-full h-[200px]"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, PropType, ref, watch } from 'vue'
import { usePieChart } from '@/composable/usePieChart'
import { EChartsType } from 'echarts/core'
import { useI18n } from 'vue-i18n'
const { t } = useI18n({
  useScope: 'global'
})

const chartEl = ref<HTMLElement>()
const { init, setData } = usePieChart()
let chartInstance = ref<EChartsType>()

const props = defineProps({
  data: Array as PropType<{ value: number | string; name: string }[]>
})

const color = ['#caf0f8', '#03045e', '#0077b6', '#00b4d8', '#90e0ef']

onMounted(() => {
  if (chartEl.value) {
    chartInstance.value = init({
      el: chartEl.value,
      title: t('statusNikah'),
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
