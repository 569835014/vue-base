
class Session{
  constructor(type='sessionStorage'){
    this.type=type;
  }
  saveItem(key,value){
    window[this.type].setItem(key,JSON.stringify(value));
  }
  getItem(key){
    let value= window[this.type].getItem(key);
    try{
      return JSON.parse(value)
    }catch (e){
      return value
    }
  }
  removeItem(key){
    window[this.type].removeItem(key)
  }
  clear(){
    window[this.type].clear()
  }
}
const storage={};
 storage.install = function (Vue, type) {
  // 4. 添加实例方法
  Vue.prototype.$storage = new Session(type)
};
const session =new Session();
export default session;
