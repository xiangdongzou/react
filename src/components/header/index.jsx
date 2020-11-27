import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Modal } from 'antd'

import LinkButton from '../../components/link-button'
import {reqWeather} from '../../api'
import { formateDate } from '../../utils/dateUtils'
import menuList from '../../config/menuConfig'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'

import './index.less'

class Header extends Component {

  state = {
    currentTime: formateDate(Date.now()),
    dayPictureUrl: '', 
    weather: '', 
    temperature:''
  }

  // 退出登陆
  logout = () => {
    Modal.confirm({
      title: '确认退出吗?',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        storageUtils.removeUser()
        memoryUtils.user = {}
        this.props.history.replace('/login')
      }
    })
  }

  // 根据当前请求的path得到对应的title
  getTitle = () => {
    let title = ''
    const path = this.props.location.pathname
    menuList.forEach(item => {
      if (item.key===path) {
        title = item.title
      } else if (item.children) {
        const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
        if (cItem) {
          title = cItem.title
        }
      }
    }) 
    return title
  }

  // 获取天气信息显示
  getWeather = async () => {
    const { dayPictureUrl, weather,temperature } = await reqWeather('深圳')
    // 更新状态
    this.setState({
      dayPictureUrl, 
      weather,
      temperature
    })
  }

  componentDidMount () {
    // 启动定时器
    this.intervalId = setInterval(() => {
      // 将currentTime更新为当前时间值
      this.setState({
        currentTime: formateDate(Date.now())
      })
    }, 1000);
    // 发jsonp请求获取天气信息显示
    this.getWeather()
  }

  componentWillUnmount () {
    clearInterval(this.intervalId)
  }

  render() {
    const { currentTime, dayPictureUrl, weather,temperature } = this.state 
    const user = memoryUtils.user
    // 得到当前需要显示的title
    const title = this.getTitle()

    return (
      <div className="header">
        <div className="header-top">
          <span style={{float:'left'}}>欢迎, {user.username} </span>
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{ currentTime }</span>
            <img src={dayPictureUrl} alt="weather"/>
            <span>{weather}</span>
            <span>{temperature}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
