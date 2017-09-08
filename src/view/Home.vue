<template>
  <div class="hello">
    这是home页{{sum}}
    <div>测试简单的表单验证</div>
    <div>
      <form v-form="form">
        <div>
          用户名：<input type="text" name="username" v-lidate.input v-model="form.username" @click="">
          <p v-if="validations.form.username.result&&validations.form.username.result.flg===false">{{validations.form.username.result.msg}}</p>
        </div>
        <div>
          用户名2：<input type="text" name="username2" v-lidate.input.username v-model="form.username2" @click="">
          <p v-if="validations.form.username2.result&&validations.form.username2.result.flg===false">{{validations.form.username2.result.msg}}</p>
        </div>
        <div>
          idCard：<input type="text" name="idCard" v-lidate.input v-model="form.idCard" @click="">
          <p v-if="validations.form.idCard.result&&validations.form.idCard.result.flg===false">{{validations.form.idCard.result.msg}}</p>
        </div>
        <div>
          电话：<input type="text" name="tel" v-lidate.change v-model="form.tel">
          <p v-if="validations.form.tel.result&&validations.form.tel.result.flg===false">{{validations.form.tel.result.msg}}</p>
        </div>
        <div @click="submit">subitm</div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        x:4,
        y:5,
        form:{
          username:"",
          tel:"",
          idCard:"",
          username2:""
        },
        validations:{
          form:{
            username:{
              rule:[
                {
                  type:"require",
                  msg:"用户名不能为空"
                },
                {
                  type:"username",
                  msg:"填入的用户名格式不对"
                }
              ]
            },
            tel:{
              rule:[
                {
                  type:"require",
                  msg:"手机号不能为空"
                },
                {
                  type:"tel",
                  msg:"手机号格式不正确"
                }
              ]
            },
            username2:{
              rule:[
                {
                  type:"require",
                  msg:"用户名不能为空1"
                },
                {
                  type:"username",
                  msg:"填入的用户名格式不对2"
                }
              ]
            },
            idCard:{
              rule:[
                {
                  type:"require",
                  msg:"身份证不能为空"
                },
                {
                  type:"idCard",
                  msg:"身份证格式不对"
                }
              ]
            }
          },
        }
      }
    },
    created(){
    },
    computed:{
      sum2(){
        return this.x + this.y
      }
    },
    asyncComputed: {
      async sum() {

        return  await this.setY();
      }
    },
    methods:{
      setY(){
        return new Promise(resolve=>{
          const total = this.x + this.y
          setTimeout(()=>resolve(total),4000)
        })

      },
      submit(){
        this.$observer.emit('form');
      }
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
