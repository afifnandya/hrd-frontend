<template>
  <div class="flex flex-wrap">
    <div class="w-full lg:w-6/12 xl:w-6/12 card">
      <div ref="chartEl" class="w-full h-[200px]"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { usePieChart } from '@/composable/usePieChart'
import { EChartsType } from 'echarts/core'
import useAxios, { isAxiosError } from '@/composable/useAxios'
import { useI18n } from 'vue-i18n'


const chartEl = ref<HTMLElement>()
const { init, setData } = usePieChart()
let chartInstane = ref<EChartsType>()
const rekruitmenData = ref<{ value: number; name: string }[]>([])

async function getData() {
  const { data: responseData } = await useAxios({
    url: '/reports/recruitment'
  })
  if (responseData && responseData.status == 200) {
    const { data } = responseData
    const { work_order } = data
    rekruitmenData.value.push(
      { value: work_order['Done'], name: 'Done' },
      { value: work_order['Over Due'], name: 'Over Due' },
      { value: work_order['On Process'], name: 'On Process' }
    )
  }
}

const { t } = useI18n({
  useScope: 'global'
})

onMounted(async () => {
  if (chartEl.value) {
    chartInstane.value = init({
      el: chartEl.value,
      title: t('statusKontrak')
    })
    chartInstane.value.showLoading()
    await getData()
    setData({ data: rekruitmenData.value })
    chartInstane.value.hideLoading()
  }
})
</script>
<script lang="ts">
export default {
  name: 'DashboardRekruitmen'
}
</script>
