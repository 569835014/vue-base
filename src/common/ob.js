import Vue from 'vue'
const obs=new Vue();
const ob={}
ob.install = function (Vue) {
  // 4. 添加实例方法
  Vue.prototype.$ob =obs
};
export default ob;
