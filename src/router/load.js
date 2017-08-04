function load (url,component) {//按需加载组件
  let _router=url||'components';
  console.info(`../${_router}/${component}.vue`);

  return () => System.import(`../${_router}/${component}`)
}
export default load
