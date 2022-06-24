import axios from 'axios'
import Auth from '../auth'

// ES6 Promise的封装
export function request(options) {
  return new Promise((resolve, reject) => {
    // 1.创建axios的实例对象
    const instance = axios.create({
      baseURL: 'http://192.168.137.247:8080',
      // baseURL: 'http://192.168.137.15:8080',
      // baseURL: 'http://192.168.43.159:8080',
      timeout: 5000
    })

    // 设置请求头中携带token
    instance.interceptors.request.use(config => {
      const token = Auth.getToken();
      if(token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    })

    // 过滤器(拦截器)
    instance.interceptors.response.use(res => {
      return res.data
    })

    // 通过实例发送网络请求
    instance(options)
        .then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
    })
  })
}
