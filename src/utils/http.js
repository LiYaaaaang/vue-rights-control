import axios from 'axios'
import Vue from 'vue'
import router from '../router'
// 配置请求的跟路径, 目前用mock模拟数据, 所以暂时把这一项注释起来
// axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
const actionMapping = {
  'get': 'view',
  'post': 'add',
  'put': 'edit',
  'delete': 'delete'
}
// 请求拦截
axios.interceptors.request.use((config) => {
  if (config.url !== 'login') {
    // 不是登录的请求，就在请求头中加入token
    config.headers.Authorization = sessionStorage.getItem('token')
    const action = actionMapping[config.method]
    // 判断非权限范围内的请求 add view edit delete
    const currentRight = router.currentRoute.meta
    if (currentRight && currentRight.indexOf(action) === -1) {
      // 没有权限
      alert('没有权限')
      return Promise.reject(new Error('没有权限'))
    }
    // 判断当前请求的行为
    // restful风格请求 get请求=>view  post请求=>add  put请求=>edit  delete请求=>delete
  }
  return config
})
// 响应拦截
axios.interceptors.response.use((res) => {
  if (res.data.meta.status === 401) {
    router.push('/login')
    sessionStorage.clear()
    window.location.reload()
  }
  console.log(res)
  return res
})
Vue.prototype.$http = axios
