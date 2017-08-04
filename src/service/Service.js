/**
 * Created by Administrator on 2017/5/22 0022.
 */
import config from './config'
import axios from 'axios'
import * as CODE from '../common/code'
import Vue from 'vue'
import {extend} from '../common/common'

class Service {
  constructor(){
    this.vm=Vue.prototype;
  }
  //异常
  error(){
    this.vm.$swal({
      title: 'error',
      text: arguments[0],
      type: 'warning',
    });
  }
  //ajax调用前
   before(){
    this.vm.$swal({
      title: '请求开始前执行',
      text: '弹出一个框',
      type: 'info',
    })
    let promise= new Promise(function(resolve, reject) {
      setTimeout(()=>{
        resolve()
      },2000)
    });
     promise.then(()=>{
       this.vm.$swal({
         title: '开始发送请求',
         text: '弹出一个框',
         type: 'info',
       })
     })
     return promise
  }
  //ajax调用后
  after(){}
  //通用异常返回code不为10000的时候做通用处理也可以在参数里自定义
  abnormal(res){

    this.vm.$swal({
      title: '异常',
      text: res.msg,
      type: 'warning',
    })
  }
  //token超时重新登录
  loginAgain(){
  }
  /*
   * 对象合并把用户参数和基本配置合并
   * */
  configure(param){

    if(param){
      return extend(config,param)
    }
    return param
  }
  //通用api
  async common(param){
    let _config=this.configure(param);
    if(param.method.toUpperCase()==='GET'){
      param.params.time=new Date().getTime();
    }
    await this.before();//等待请求前的操作完成
    let _axios=axios(param.url,_config)
      .then( (res)=> {
        console.info(2)
      if(res.data.rcd===CODE.API_SUCCESS_CODE||!res.data.rcd){
        param.success(res.data)//正确的返回参数
      } else{//异常处理，需要特殊处理的时候再参数里面加入异常函数
        if(param.abnormal){
          param.abnormal(res.data);
        }else{
          this.abnormal(res.data)
        }
      }
      if(res.data.rcd===CODE.API_LOGIN_OUT){//嵌套的业务逻辑，当登录超时的时候调用超时函数
        this.loginAgain();
      }
      this.after();
    })
      .catch((error)=>{
      this.error(error);
    });
    return _axios;
  };
  //ajax嵌套，像父ajax返回的结果子ajax拿来继续发ajax这类的调用这个
  async nesting(params){
    await this.common(params.param)
    let obj=params.child;
    while (true){

      if(obj){
        await this.common(obj.param);
        if(obj.fn){
          obj.fn();
        }
        obj=obj.child;
      }else{
        break;
      }
    }

  }
  all(params){
    let arr=[];
    let _this=this;
    params.map(function (item,index) {
      arr[index]=_this.common(item);
    });
    return axios.all(arr)
      .then(axios.spread(function (acct, perms) {
        // Both requests are now complete
      }));
  }
  init(vue){
    this.vm=vue;
  }

}
export default Service
