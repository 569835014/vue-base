//
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

    if(this.handles[eventName].indexOf(callback)<0){
      this.handles[eventName].push(callback);
    }
  },
  // 触发事件 eventName
  emit: function (eventName) {
    //你的代码
    if(this.handles[eventName]){
      for(let i=0;i<this.handles[eventName].length;i++){
        let arr=Array.prototype.slice.call(arguments).splice(1);
        this.handles[eventName][i].apply(this,arr);
      }
    }
    this.handles[eventName]=[];
  }
};
const Ob={}
Ob.install = function (Vue) {
  // 4. 添加实例方法
  Vue.prototype.$observer = Observer
};
export default Ob
