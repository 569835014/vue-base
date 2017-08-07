<template>
  <div class="hello">
    这里是模拟的axios测试页账号是admin123密码是111111
    这是user页<br>
    <div v-if="!user.userName">
      账号<input type="text" v-model="userName"><br>
      密码<input type="text" v-model="pwd"><br>
      <button @click="logo">登录</button>
    </div>
    <div v-else>
      <button @click="out">退出登录</button>
    </div>
    <div>
      展示异常和错误处理
      <button @click="logo">异常通用</button>
      <button @click="logo1">异常自定义</button>
      <button @click="logo2">错误</button>
    </div>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import Service from '../service/about/about'
  export default {
    name: 'hello',
    data () {
      return {
        userName:"",
        pwd:"",
        redirect:""
      }
    },
    created(){
      console.info(Service);
      this.redirect=this.$route.query.redirect//获取url参数
      Service.init(this);//把当然实例给service
      this.$observer.emit('a','1','2','3');
    },
    methods:{
      ...mapActions([
        'saveUserInfo'
      ]),
      logo(){//登录发送ajax，api是axios你可以看一下
        Service.login();
      },
      out(){//退出登录清空vuex里面保持的用户信息和localStorage里面保存的用户信息

        this.$store.commit('USER_INFO',{});
      },
      logo1(){
        Service.login1();
      },
      logo2(){
        Service.login2();
      },
      logo3(){
        this.userName='admin123'
        this.pwd="11";
        Service.login();
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
  input{
    border: 1px solid black;
  }
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
    list-style: none;
  }

  a {
    color: #42b983;
  }
</style>
