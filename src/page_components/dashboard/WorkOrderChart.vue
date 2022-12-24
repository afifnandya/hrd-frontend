<template>
  <div>
    <div ref="chartEl" class="w-full h-[500px]"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts/core'
import {
  TooltipComponent,
  GridComponent,
  LegendComponent,
  MarkLineComponent
} from 'echarts/components'
import { BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { EChartsOption } from 'echarts/types/dist/shared'

const chartEl = ref<HTMLElement>()

const departementName = [
  'Electric',
  'Engineering',
  'GA',
  'HR',
  'HSE',
  'Land Acquisition',
  'Logistic',
  'Security',
  'Warehouse'
]

function init() {
  echarts.use([
    TooltipComponent,
    GridComponent,
    LegendComponent,
    MarkLineComponent,
    BarChart,
    CanvasRenderer
  ])

  const option: EChartsOption = {
    title: {
      text: 'Man Power Target 2023',
      left: 'center',
      right: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      bottom: '0'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: departementName,
        axisLabel: {
          interval: 0,
          rotate: 30
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Jumlah Karyawan',
        type: 'bar',
        stack: 'Ad',
        emphasis: {
          focus: 'series'
        },
        data: [200, 110, 100, 100, 150, 80, 90, 50, 500]
      },
      {
        name: 'Target Karyawan',
        type: 'bar',
        stack: 'Ad',
        emphasis: {
          focus: 'series'
        },
        data: [1200, 1100, 1000, 1000, 1500, 800, 900, 500, 1000]
      }
    ]
  }

  if (chartEl.value) {
    const myChart = echarts.init(chartEl.value)
    myChart.setOption(option)
  }
}

onMounted(() => {
  init()
})
</script>
<script lang="ts"></script>
