import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'
import {rawData ,calculateMA,data,dates} from './rawData.js'
import { Card } from 'antd';
export default class kchart extends Component {
   state = {
    rawData :rawData,
    data:data,
    dates:dates
   }

    getOption =(rawData,dates,data) =>{
    return{
        backgroundColor: '#21202D',
        legend: {
            data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30'],
            inactiveColor: '#777',
            textStyle: {
                color: '#fff'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                animation: false,
                type: 'cross',
                lineStyle: {
                    color: '#376df4',
                    width: 2,
                    opacity: 1
                }
            }
        },
        xAxis: {
            type: 'category',
            data: this.state.dates,
            axisLine: { lineStyle: { color: '#8392A5' } }
        },
        yAxis: {
            scale: true,
            axisLine: { lineStyle: { color: '#8392A5' } },
            splitLine: { show: false }
        },
        grid: {
            bottom: 80
        },
        dataZoom: [{
            textStyle: {
                color: '#8392A5'
            },
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            dataBackground: {
                areaStyle: {
                    color: '#8392A5'
                },
                lineStyle: {
                    opacity: 0.8,
                    color: '#8392A5'
                }
            },
            handleStyle: {
                color: '#fff',
                shadowBlur: 3,
                shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOffsetX: 2,
                shadowOffsetY: 2
            }
        }, {
            type: 'inside'
        }],
        animation: false,
        series: [
            {
                type: 'candlestick',
                name: '日K',
                data: this.state.data,
                itemStyle: {
                    color: '#FD1050',
                    color0: '#0CF49B',
                    borderColor: '#FD1050',
                    borderColor0: '#0CF49B'
                }
            },
            {
                name: 'MA5',
                type: 'line',
                data: calculateMA(5, this.state.data),
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    width: 1
                }
            },
            {
                name: 'MA10',
                type: 'line',
                data: calculateMA(10, this.state.data),
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    width: 1
                }
            },
            {
                name: 'MA20',
                type: 'line',
                data: calculateMA(20, this.state.data),
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    width: 1
                }
            },
            {
                name: 'MA30',
                type: 'line',
                data: calculateMA(30, this.state.data),
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    width: 1
                }
            }
        ]
    }
    };
    render() {
        return (
            <Card style={{backgroundColor:'#21202d'}}>
                <ReactEcharts option={this.getOption(rawData)} style={{height: 500,width:1200}}/>
            </Card>
        )
    }
}