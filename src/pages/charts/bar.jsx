import React, {Component} from 'react'
import {Card, Button} from 'antd'
import ReactEcharts from 'echarts-for-react'

export default class Bar extends Component {

  state = {
    sales: [5, 20, 36, 10, 10, 20], 
    stores: [6, 10, 25, 20, 15, 10], 
  }

  update = () => {
    this.setState(state => ({
      sales: state.sales.map(sale => sale + 1),
      stores: state.stores.reduce((pre, store) => {
        pre.push(store-1)
        return pre
      }, []),
    }))
  }


  getOption = (sales, stores) => {
    return {
      title: {
        text: '手机当前月销量'
      },
      color: ['#0094ff','#e690d1'],
      tooltip: {},
      legend: {
        data:['销量', '库存']
      },
      xAxis: {
        data: ["Apple","华为","小米","oppo","vivo","荣耀"]
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: sales
      }, {
        name: '库存',
        type: 'bar',
        data: stores
      }]
    }
  }

  render() {
    const {sales, stores} = this.state
    return (
      <div>
        <Card>
          <Button type='primary' onClick={this.update}>更新</Button>
        </Card>
        <Card >
          <ReactEcharts option={this.getOption(sales, stores)} />
        </Card>

      </div>
    )
  }
}