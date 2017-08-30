
//初始化配置操作根据生产环境还是线上环境
class Api{
  constructor(){

    if(process.env.NODE_ENV==='development'){
      this.BASE_URL='本地'
    }else{
       this.BASE_URL='线上'
    }
  }
}
export default new Api();
