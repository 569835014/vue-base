/**
 * 公共js主要封装一些经常用到的一些方法
 */
/**
 *
 * 设置rem数值
 * 参数itemNum 为1屏幕宽度分为多少份
 * */
const sizeRem=function (itemNum) {
  let size = itemNum || 15;
  window.onresize = remSize;
  remSize();
  function remSize() {
    let html = document.getElementsByTagName('html')[0], w = html.clientWidth;
    html.style.fontSize = w / size + 'px'
  }
};

/*****
 *
 *
 * url相关操作常见的获取url参数
 *
 * **/
const URL={
  //当前页面路径
  href:window.location.href,
  //当前页面查询字符串
  search: window.location.search,
  //查询URL传递的参数值
  query: function (key) {
    console.info(window.location)
    let reg = new RegExp('(^|&|\\?|#)' + key + '=([^&]*)(&|\x24)', '');
    let match = this.search.substr(1).match(reg);
    if (match) {
      return match[2];
    }
    return '';
  },
};

/*****
 * @source 源对象
 * @target 目标对象
 * 将源对象（ source ）的所有可枚举属性，复制到目标对象（ target ）。
 * ****/
const extend=function(source,target){
  let arr=['number','boolean','string','undefined'];
  let _arr=['number','boolean','string','object'];
  for(let key in source){
    let type=typeof source[key];
    let _type=typeof target[key]
    if( target[key]===null||_arr.indexOf(_type)>=0){
      continue;
    }
    if(arr.indexOf(type)>=0){
      target[key]=source[key]
    }else{
      if(source[key]===null){
        target[key]=source[key]
      }else if(source[key]instanceof Array){
        target[key]=source[key].slice(0);
      }else if(type==='object'){
        if(!target[key]){
          target[key]={}
        }
        extend(source[key],target[key])
      }
    }
  }
  return target
};
/*****
 *
 *
 * 判断对象是不是空对象
 *
 * **/
const isEmpty=function (obj,key) {
  let flag=true;
  let type=typeof obj
  switch (type){
    case 'number':
      if(!isNaN(obj)){
        return false
      }
      break;
    case 'string':
      if(obj&&obj!=='undefined'){
        return false
      }
      break;
    case 'boolean':
      return false
    case 'object' :
      if(obj===null || obj==='undefined'){
        return true
      }
      let keys=Object.keys(obj);
      for(let i=0;i<keys.length;i++){
        if(key===keys[i]){
          continue
        }else{
          if(obj[keys[i]]){
            flag=false;
            break;
          }
        }
      }
      return flag
    default:
      return true
  }

}
const status={
    get(obj,key,session){
      if(!obj){
        obj=session.getItem(key)
      }
    }
}
export {sizeRem,URL,extend,isEmpty,status}
