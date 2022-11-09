<template>
  <div>
    <div ref="chartEl" class="w-full h-[400px]"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts/core'
import { LineChart, LineSeriesOption } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import {
  TitleComponent,
  TitleComponentOption,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  GridComponentOption,
  VisualMapComponent,
  VisualMapComponentOption
} from 'echarts/components'

type ECOption = echarts.ComposeOption<
  | GridComponentOption
  | TitleComponentOption
  | LineSeriesOption
  | VisualMapComponentOption
>
const data = [50, 20, 100, 140, 210, 330, 110, 440, 610]

echarts.use([
  LineChart,
  CanvasRenderer,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  VisualMapComponent,
  GridComponent
])
const chartEl = ref<HTMLElement>()

function initChart() {
  const chartTitle = 'Grafik Pertumbuhan Karyawan'
  console.log('chartEl', chartEl.value)
  if (!chartEl.value) {
    return
  }

  const myChart = echarts.init(chartEl.value)
  const option: ECOption = {
    backgroundColor: '#3a86ff',
    color: 'white',
    title: [
      {
        left: 'center',
        text: chartTitle,
        textStyle: {
          color: 'white'
        }
      }
    ],
    tooltip: {
      trigger: 'item'
    },
    xAxis: {
      type: 'category',
      data: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      axisLabel: {
        color: 'white'
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: 'white'
      }
    },
    series: [
      {
        type: 'line',
        data: data,
        lineStyle: {
          color: 'white'
        }
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
  name: 'PertumbuhanKaryawanLineChart'
}
</script>
