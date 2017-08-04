
const Observer = {
  // 通过on接口监听事件eventName
  // 如果事件eventName被触发，则执行callback回调函数
  handles:{},
  on: function (eventName, callback) {
    //你的代码
    if(!this.handles){
      //this.handles={};
      Object.defineProperty(this, "handles", {
        value: {},
        enumerable: false,
        configurable: true,
        writable: true
      })
    }

    if(!this.handles[eventName]){
      this.handles[eventName]=[];
    }
    this.handles[eventName].push(callback);
  },
  // 触发事件 eventName
  emit: function (eventName) {
    //你的代码
    console.info(this);
    if(this.handles[eventName]){
      for(var i=0;i<this.handles[eventName].length;i++){
        this.handles[eventName][i](arguments[1]);
      }
    }
  }
};
const Ob={}
Ob.install = function (Vue, type) {
  // 4. 添加实例方法
  Vue.prototype.$observer = Observer
};
export default Ob
