import Vue from 'vue'
import Vuex from 'vuex'
import settings from './modules/settings'
import viewsBar from './modules/views-bar'
import user from './modules/user'
import getters from './getters'

// 安装插件
Vue.use(Vuex)

// 创建对象
const store = new Vuex.Store({
  state: {
    loginUser: {}
  },
  modules: {
    settings, viewsBar, user
  },
  getters
})

// 导出store对象
export default store
