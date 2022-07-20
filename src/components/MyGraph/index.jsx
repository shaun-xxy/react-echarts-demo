// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
import { GraphChart } from 'echarts/charts'
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent
} from 'echarts/components'
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'
import ReactEChartsCore from 'echarts-for-react/lib/core'

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  GraphChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
])

export const MyGraph = ({ networksData }) => {
  if (Object.keys(networksData).length === 0) return null

  const options = {
    animationDuration: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        // name: networksData,
        type: 'graph',
        layout: 'force',
        data: networksData.nodes.map((d) => ({
          name: d.key,
          symbolSize: d.attributes.size,
          itemStyle:{
            opacity:0.9,
            borderWidth:2,
            borderColor:'#000'
          }
        })),
        links: networksData.edges.map((d) => ({
          ...d,
          lineStyle: {
            width: d.attributes.size
          }
        })),
        force: {
          edgeLength: 5,
          repulsion: 20,
          gravity: 0.2
        },
        roam: true,
        zoom:8,
        label: {
          position: 'right',
          formatter: '{b}'
        },
        // lineStyle: {
        //   color: 'source',
        //   curveness: 0.3
        // },
        emphasis: {
          focus: 'adjacency'
        }
      }
    ]
  }
  return (
    <div style={{ width: '100%',height:"100%", border: '1px solid' }}>
      <ReactEChartsCore
        echarts={echarts}
        option={options}
        notMerge={true}
        lazyUpdate={true}
        style={{height: '100%'}}
        //   theme={"theme_name"}
        //   onChartReady={this.onChartReadyCallback}
        //   onEvents={EventsDict}
      />
    </div>
  )
}
