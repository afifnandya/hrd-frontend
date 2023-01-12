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
let chartInstance = ref<EChartsType>()
const { init, setData } = usePieChart()
const props = defineProps({
  data: Array as PropType<{ value: number | string; name: string }[]>
})



onMounted(() => {
  if (chartEl.value) {
    chartInstance.value = init({
      el: chartEl.value,
      title: t('statusKontrak')
    })
    chartInstance.value.showLoading()
  }
})

watch(
  () => props.data,
  (newVal) => {
    if (newVal?.length) {
      setData({
        data: newVal
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
