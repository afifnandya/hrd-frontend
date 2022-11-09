import * as echarts from 'echarts/core'
import { PieChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'

type Option = {
  el: HTMLElement
  data: any
  title: string
  color?: string[]
}

const DEFAULT_COLOR = [
  '#37A2DA',
  '#32C5E9',
  '#67E0E3',
  '#9FE6B8',
  '#FFDB5C',
  '#ff9f7f',
  '#fb7293',
  '#E062AE',
  '#E690D1',
  '#e7bcf3',
  '#9d96f5',
  '#8378EA',
  '#96BFFF'
]

export function usePieChart() {
  echarts.use([
    PieChart,
    CanvasRenderer,
    TitleComponent,
    TooltipComponent,
    LegendComponent
  ])

  function init({ el, data, title, color }: Option) {
    const myChart = echarts.init(el)
    const option = {
      title: {
        text: title,
        // subtext: 'Fake Data',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      // legend: {
      //   orient: 'vertical',
      //   left: 'left'
      // },
      series: [
        {
          // name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          color: color || DEFAULT_COLOR
        }
      ]
    }

    myChart.setOption(option)
  }

  return {
    init
  }
}
