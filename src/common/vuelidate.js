import {extend} from "./common"

/**
 *
 * @param rules 正则或者正则数组
 * @param val
 * 验证正则或者正则数组
 *
 */
function regularVerification(rules,val) {
  if(rules.connect){
    return ruleArr(rules,val)
  }else{
    return rules.test(val)
  }
}
function required(value) {
  if (Array.isArray(value)) return !!value.length;
  if (value === undefined || value === null || value === false) {
    return false;
  }

  if (typeof value === 'object') {
    for (var _ in value) {
      return true;
    }return false;
  }

  return !!String(value).length;
}
/*******
 * 验证正则数组，当连接符为or只要一个验证成功就返回ture，如果是and要所有正则验证成功才返回true
 * @param rules
 * @param val
 * @returns {boolean}
 */
function ruleArr(rules,val) {
  let l=rules.rule.length;
  if(rules.connect==='or'){
    for(let i=0;i<l;i++){
      let rex=rules.rule[i];
      if(rex.test(val)){
        return true
      }
    }
    return false
  }else {
    let flag=true;
    for(let i=0;i<l;i++){
      let rex=rules.rule[i];
      if(!rex.test(val)){
        flag=false;
        break
      }
    }
    return flag
  }
}

/***********
 * 根据验证的结果修改返回信息
 * @param result
 * @param item
 * @param imp
 */
function impResult(result,item,imp) {
  let flag=true;
  let msg="";
  if(imp){
    msg="";
    flag=true
  }else{
    flag=false;
    msg=item.msg
  }
  result.flg=flag;
  result.msg=msg;
}

/***************8
 * 通过当前验证的对象和值把获得验证信息
 * @param obj 当前验证的对象
 * @param builtIn 内置的正则或者方法
 * @param val 待验证的值
 * @param result 验证结果
 */
function implement(obj,builtIn,val,result) {
  for(let i=0;i<obj.length;i++){
    let item=obj[i];
    let flag;
    if(item.type==='require'){
      flag=required(val);
    }else{
      flag=regularVerification(builtIn[item.type],val);
    }
    impResult(result,item,flag);
    if(!flag){
      return;
    }
  }
}

class Vuelidate{
  constructor(){
    this.rules={
      'tel':/^1[34578]\d{9}$/,
      'email':/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
      'idCard':/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
      'url':'^http://([\\w-]+\\.)+[\\w-]+(/[\\w-./?%&=]*)?$ ；^[a-zA-z]+://(w+(-w+)*)(.(w+(-w+)*))*(?S*)?$',
      'username':{
        rule:[/^1[34578]\d{9}$/,/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/],
        connect:'or'
      }
    }
  }
  install(Vue, options){
    let builtIn=this.rules;
    extend(options,this);//用户自定义rules
    Vue.directive('lidate', {
      bind (el, binding, vnode, oldVnode) {
        let vm=vnode.context//上下文
        let modifiers=Object.keys(binding.modifiers);
        let directives=vnode.data.directives;//指令集，通过model指令拿到对应的data里面的属性
        let expression,from;
        directives.map((item)=>{
          if(item.name==='model'){
            expression=item.expression;
          }
        });
        let val,validation
        val=expression.split('.');
        if(!vm.validations){
          console.error('没有验证对象')
        }
        validation=vm.validations;//validation为验证结果对象
        let obj;
        val.map((item,index)=>{
          if(index===0){
            obj=validation[item]
          }else{
            obj=obj[item]
          }

        });
        if(!obj){
          console.error('没有验证对象')
        }
        let name=modifiers[0]||'change';
        let result={};
        try{
          el.addEventListener(name, ()=>{
            console.info(obj);
            implement(obj.rule,builtIn,el.value,result);
            vm.$set(obj,'result',result);
            if(modifiers[1]){
              if(el.value!==vm[val[0]][modifiers[1]]){
                result={
                  flg:false,
                  msg:"两次输入不匹配"
                };
                vm.$set(obj,'result',result);
              }
            }
          }, false);
        }catch (e){

        }
        //
      }
    });
    Vue.directive('form', {
      bind (el, binding, vnode, oldVnode) {
        let vm= vnode.context;
        vm.$observer.on(binding.expression,()=>{
          let validations=vm.validations[binding.expression];
          for(let key in validations){
            let result={};
            implement(validations[key].rule,builtIn,vm[binding.expression][key],result);
            vm.$set(validations[key],'result',result)
          }

        })
      }
    });
  }
}
export default new Vuelidate()
