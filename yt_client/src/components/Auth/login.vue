<template>
  <form v-form name="logForm" @submit.prevent="onSubmit">
    <input v-form-ctrl v-model="form.phone" required type="text" name="phone" placeholder="手机号码"
           custom-validator="phoneVerified"><br>
    <label v-show="(logForm.phone.$dirty || logForm.$submitted) && logForm.phone.$invalid"
           class="error">请正确填写手机号码</label><br>
    <input v-form-ctrl v-model="form.password" required type="password" name="password" placeholder="密码"><br>
    <label v-show="(logForm.password.$dirty || logForm.$submitted) && logForm.password.$invalid"
           class="error">请正确填写密码</label><br>
    <button type="submit">提交</button>
  </form>
</template>

<script>
  import Auth from './../../auth/index.js'
  import {loginSuccess, userinfoSuccess} from './../../vuex/actions.js'

  export default {
    name: 'Login',

    data: function () {
      return {
        logForm: {},
        form: {
          phone: '',
          password: ''
        }
      }
    },

    vuex: {
      actions: {
        loginSuccess,
        userinfoSuccess
      }
    },

    methods: {
      onSubmit: function () {
        var self = this
        if (self.logForm.$invalid) {
          return false
        }
        self.$http.post('/auth/login', {
          phone: self.form.phone,
          password: self.form.password
        }).then(
          function (result) {
            var token = result.data.data.token
            if (token) {
              Auth.login(token)
              self.loginSuccess(token)
              self.$http.get('/user/info').then(
                function (data) {
                  self.userinfoSuccess(data.data.data)
                  self.$route.router.go('/')
                },
                function (data) {
                  
                }
              )
            }
          },
          function () {
            // fail
            window.alert('网络出错，请刷新重试')
          }
        )
      },

      phoneVerified: function (value) {
        return /^1[3|4|5|7|8|6]\d{9}$/.test(value)
      }
    }
  }
</script>
