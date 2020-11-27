/* 
包含应用中所有请求接口的函数: 接口请求函数
函数的返回值都是promise对象
*/
import jsonp from 'jsonp' 
import ajax from './ajax'
import { message } from 'antd';

// 请求登陆
export const reqLogin = (username, password) => ajax.post('/login', { username, password })

// 发送jsonp请求得到天气信息
export const reqWeather = (city) => {
  return new Promise((resolve, reject) => {
    const url =`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    jsonp(url, {}, (error, data) => {
      if (!error && data.error === 0) { 
        const { dayPictureUrl, weather,temperature } = data.results[0].weather_data[0]
        resolve({ dayPictureUrl, weather, temperature })
      } else { 
        message.error('获取天气信息失败')
      }
    })
  })
}

// 获取分类列表
export const reqCategorys = () => ajax('/manage/category/list')

// 添加分类
export const reqAddCategory = (categoryName) => ajax.post('/manage/category/add', {categoryName})

// 修改分类
export const reqUpdateCategory = ({ categoryId, categoryName }) => ajax.post('/manage/category/update', {
  categoryId,
  categoryName
})

// 根据分类id获取分类
export const reqCategory = (categoryId) => ajax('/manage/category/info', {
  params: {
    categoryId
  }
})

// 获取商品分页列表 
export const reqProducts = (pageNum, pageSize) => ajax('/manage/product/list', {
  params: { 
    pageNum,
    pageSize
  }
})

// 根据Name/desc搜索产品分页列表
export const reqSearchProducts = ({
  pageNum,
  pageSize,
  searchName,
  searchType // 它的值是'productName'或者'productDesc'
}) => ajax('/manage/product/search', {
  params: {
    pageNum,
    pageSize,
    [searchType]: searchName,
  }
})

/* 根据商品ID获取商品 */
export const reqProduct = (productId) => ajax('/manage/product/info', {
  params: {
    productId
  }
})

/* 对商品进行上架/下架处理 */
export const reqUpdateStatus = (productId, status) => ajax('/manage/product/updateStatus', {
  method: 'POST',
  data: {
    productId,
    status
  }
})

/* 删除图片 */
export const reqDeleteImg = (name) => ajax.post('/manage/img/delete', { name })

/* 添加/修改商品 */
export const reqAddUpdateProduct = (product) => ajax.post(
  '/manage/product/' + (product._id ? 'update' : 'add'),
  product
)

// 获取所有角色的列表
export const reqRoles = () => ajax('/manage/role/list')
// 添加角色
export const reqAddRole = (roleName) => ajax.post('/manage/role/add', {
  roleName
})
// 更新角色
export const reqUpdateRole = (role) => ajax.post('/manage/role/update', role)

// 获取所有用户的列表
export const reqUsers = () => ajax('/manage/user/list')
// 删除指定用户
export const reqDeleteUser = (userId) => ajax.post('/manage/user/delete', {
  userId
})
// 添加/更新用户
export const reqAddOrUpdateUser = (user) => ajax.post('/manage/user/' + (user._id ? 'update' : 'add'), user)