// import { message } from 'ant-design-vue/lib'
import axios from 'axios'
/**
 * 创建axios实例对象
 */
const service = axios.create({
  baseURL: 'http://127.0.0.1:3000',
  withCredentials: false,
  timeout: 30000
})
/**
 * 所有axios请求拦截
 */
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
/**
 * 所有axios返回拦截
 */
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code == 500) {
      // message.error('返回错误')
      console.log('服务器发生未知错误')
    } else {
      return res
    }
  },
  error => {
    // message.error('返回错误')
    return Promise.reject(error)
  }
)

export default service