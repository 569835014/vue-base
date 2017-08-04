/**
 * Created by geek on 2017/7/11.
 * 这里是vuex状态树
 * 当页面刷新的话vuex是会失效，为了解决这一问题我们引入localStorage作为辅助，刷新后从localStorage取回状态
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
import * as NAME from '../common/constant'
import {isEmpty} from '../common/common'
const store = new Vuex.Store({
  state: {
    userInfo:{
    }
  },
  mutations: {
    // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [NAME.USER_INFO] (state,userInfo) {
      state.userInfo=userInfo;
      Vue.prototype.$storage.saveItem('user',userInfo);
    }
  },
  getters: {
    getUserInfo: state => {
      if(isEmpty(state.userInfo)){
        state.userInfo=Vue.prototype.$storage.getItem('user')||{};
      }
      return state.userInfo
    }
  }
});

export default store
