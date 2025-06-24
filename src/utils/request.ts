import axios from 'axios'
import { message } from 'ant-design-vue'

const http = axios.create({
  baseURL: '/api',
  timeout: 10000
})

// 请求拦截器：自动携带 token
http.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    message.error('请求发送失败')
    return Promise.reject(error)
  }
)

// 响应拦截器：统一处理响应和错误
http.interceptors.response.use(
  response => {
    // 这里可以根据后端返回结构做统一处理
    if (response.data && response.data.code !== 0) {
      message.error(response.data.msg || '请求失败')
      return Promise.reject(response.data)
    }
    return response.data
  },
  error => {
    // 统一处理 HTTP 错误
    if (error.response) {
      switch (error.response.status) {
        case 401:
          message.error('未登录或登录已过期')
          // 可以跳转到登录页
          break
        case 403:
          message.error('没有权限')
          break
        case 404:
          message.error('接口不存在')
          break
        default:
          message.error('服务器错误')
      }
    } else {
      message.error('网络连接异常')
    }
    return Promise.reject(error)
  }
)

export default http
