import React from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Icon, Input, Button, message } from 'antd'

import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { reqLogin } from '../../api'
import './login.less'


class Login extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    // 对表单所有字段进行统一验证
    this.props.form.validateFields(async (err, { username, password }) => {
      if (!err) {
        const result = await reqLogin(username, password)
        if (result.status === 0) {
          // 将user信息保存到local
          const user = result.data
          // localStorage.setItem('user_key', JSON.stringify(user))
          storageUtils.saveUser(user)
          // 保存到内存中
          memoryUtils.user = user
          this.props.history.replace('/')
          message.success('登录成功!')
        } else { // 登录失败
          message.error(result.msg)
        }
      }
    })
  }
  //对密码进行自定义验证
  validatePwd = (rule, value, callback) => {
    value = value.trim()
    if (!value) {
      callback('密码必须输入')
    } else if (value.length < 4) {
      callback('密码不能小于4位')
    } else if (value.length > 12) {
      callback('密码不能大于12位')
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback('密码必须是英文、数字或下划线组成')
    } else {
      callback() // 验证通过
    }
  }

  render() {
    // 读取保存的user, 如果存在, 直接跳转到管理界面
    const user = memoryUtils.user
    if (user._id) {
      return <Redirect to="/" /> // 自动跳转到指定的路由路径
    }
    const { getFieldDecorator } = this.props.form
    return (
      <div className="login">
        <div className="login-content">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {
                getFieldDecorator('username', { 
                  initialValue: '', 
                  rules: [          
                    { required: true, whitespace: true, message: '用户名是必须' },
                    { min: 4, message: '用户名不能小于4位' },
                    { max: 12, message: '用户名不能大于12位' },
                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' }
                  ]
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名"
                  />
                )
              }
            </Form.Item>

            <Form.Item>
              {
                getFieldDecorator('password', {
                  initialValue: '', 
                  rules: [
                    { validator: this.validatePwd }
                  ]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                  />
                )
              }

            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">登 录</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

const WrapperForm = Form.create()(Login)
export default WrapperForm 



