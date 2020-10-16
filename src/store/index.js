import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 再用这个数据的时候就从本地storage中去获取，但一开始时'rightList'是没有数据的，做这个操作会报错
    // 所以设置个默认值字符串数组
    // 拿出来的是字符串，要变为数组
    rightList: JSON.parse(sessionStorage.getItem('rightList') || '[]'),
    username: sessionStorage.getItem('username')
  },
  mutations: {
    setRightList(state, data) {
      state.rightList = data
      // 菜单数据是登录后才获取到的，刷新页面后vuex重新初始化，之前state的数据变为空
      // 所以再第一次登录获取数据后直接保存在storage中，并让其和vuex中的数据保持同步
      // data原本是json格式，存入的话需要变为字符串
      sessionStorage.setItem('rightList', JSON.stringify(data))
    },
    setUserName(state, data) {
      state.username = data
      sessionStorage.setItem('username', data)
    }
  },
  actions: {},
  getters: {}
})
