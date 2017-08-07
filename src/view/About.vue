<template>
  <div class="hello">
    这是about页
    用户：{{user.userName}}<br>
    密码：{{user.pwd}}
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },

    computed:{
      // 使用对象展开运算符将 getters 混入 computed 对象中这是vuex稳定里有的
      ...mapGetters({
        user:'userInfo'
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
