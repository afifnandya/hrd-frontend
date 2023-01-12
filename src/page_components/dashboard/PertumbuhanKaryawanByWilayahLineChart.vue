<template>
  <div>
    <div ref="chartEl" class="w-full h-[400px]"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts/core'
import {
  TitleComponent,
  TitleComponentOption,
  ToolboxComponent,
  ToolboxComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption
} from 'echarts/components'
import { LineChart, LineSeriesOption } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition
])

type EChartsOption = echarts.ComposeOption<
  | TitleComponentOption
  | ToolboxComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
  | LineSeriesOption
>

const chartEl = ref<HTMLElement>()

function initChart() {
  const chartTitle = 'Grafik Pertumbuhan Karyawan By Wilayah'
  if (!chartEl.value) {
    return
  }

  const myChart = echarts.init(chartEl.value)
  const option: EChartsOption = {
    title: {
      text: chartTitle,
      left: 'center',
      right: 'center',
      top: '10'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Ambunu', 'Topogaro', 'Tondo', 'Bungku Barat', 'Morowali', 'Nasional'],
      bottom: 10
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Ambunu',
        type: 'line',
        stack: 'Total',
        data: [120, 132, 101, 134, 90, 230, 210, 132, 101]
      },
      {
        name: 'Topogaro',
        type: 'line',
        stack: 'Total',
        data: [220, 182, 191, 234, 290, 330, 310, 191, 234]
      },
      {
        name: 'Bungku Barat',
        type: 'line',
        stack: 'Total',
        data: [150, 232, 201, 154, 190, 330, 410, 201, 154]
      },
      {
        name: 'Morowali',
        type: 'line',
        stack: 'Total',
        data: [150, 232, 201, 154, 190, 330, 410, 201, 154]
      },
      {
        name: 'Nasional',
        type: 'line',
        stack: 'Total',
        data: [320, 332, 301, 334, 390, 330, 320, 301, 334]
      }
    ]
  }

  myChart.setOption(option)
}

onMounted(() => {
  initChart()
})
</script>
<script lang="ts">
export default {
  name: 'PertumbuhanKaryawanByWilayahLineChart'
}
</script>
