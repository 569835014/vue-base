// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import storage from './common/Session'
import Swal from './common/alert'
Vue.use(Swal);
Vue.use(storage);
import store from './vuex/store'
import {isEmpty} from "./common/common"
Vue.config.productionTip = false
/* eslint-disable no-new */
//路由跳转前执行的钩子函数
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    console.info(Vue.prototype.$storage.getItem('user'));
    if (!isEmpty(Vue.prototype.$storage.getItem('user'))) {  // 通过vuex state获取当前的token是否存在
      next();
    }
    else {
      next({
        path: '/user',
        query: {redirect: to.name}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
      return
    }
  }
  else {
    next();
  }

});
//路由跳转后执行的钩子这里动态改变title
router.afterEach(route => {
  document.title=route.meta.name;
});
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});

