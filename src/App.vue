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
  export default {
    name: 'app'
  }
</script>

<style>

</style>
<style lang="less" type="text/less">
</style>
