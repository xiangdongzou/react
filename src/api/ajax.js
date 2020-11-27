
import axios from 'axios'
import qs from 'qs'
import {message} from 'antd'

// 添加请求拦截器: 让post请求的请求体格式为urlencoded格式 a=1&b2
axios.interceptors.request.use(function (config) {
  // 处理post请求, 将data对象转换成query参数格式字符串
  if (config.method.toLowerCase() === 'post' && typeof config.data==='object') {
    config.data = qs.stringify(config.data) 
  }
  return config
})
// 添加响应拦截器
axios.interceptors.response.use(function (response) { 
  // 优化代码减少每个组件获取返回值的data 
  return response.data 
  // 统一处理所有请求出错
}, function (error) { 
  message.error('请求出错 ' + error.message)
  // 中断promise链,返回一个pending状态promise
  return new Promise(() => {})
});

export default axios