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
// const data = [
//   ['2020-01-02', 'Jan', 20],
//   ['2020-02-02', 'Feb', 10],
//   ['2020-03-02', 'Marc', 30],
//   ['2020-04-02', 'Apr', 22],
//   ['2021-01-02', 'Jan', 40],
//   ['2021-02-02', 'Feb', 23],
//   ['2021-03-02', 'Marc', 50]
// ]
const data = [
  ['Mar', 20],
  ['Apr', 10],
  ['May', 30],
  ['Jun', 22],
  ['Jul', 40],
  ['Aug', 23]
]

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
  const dataSet = [
    ['year', '2020', '2021', '2022'],
    ['month', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    [''],
    ['score', 'amount', 'product'],
    [89.3, 58212, 'Matcha Latte'],
    [57.1, 78254, 'Milk Tea'],
    [74.4, 41032, 'Cheese Cocoa']
  ]
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
        },
        symbol: 'circle',
        symbolSize: 10,
        itemStyle: {
          color: 'white'
        }
        // markPoint: {
        //   symbol: 'triangle',
        //   // silent: true,
        //   symbolSize: 200,
        //   label: {
        //     color: 'red'
        //   },
        //   itemStyle: {
        //     color: 'red'
        //   }
        // }
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
