<template>
  <div id="app">
    <img src="./assets/logo.png">
    <ul>
      <li>
        <router-link to="/home">home</router-link>
      </li>
      <li>
        <router-link to="/about">about</router-link>
      </li>
      <li>
        <router-link to="/user">user</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
  import 'normalize.css'//默认样式重置的css
  import 'flex.css'//flex.css 弹性盒模型的辅助css用于弹性布局
  export default {
    name: 'app'
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
<style lang="less" type="text/less">
</style>
