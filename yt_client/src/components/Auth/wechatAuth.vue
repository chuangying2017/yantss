<template>
  <h1 style="font-size: 20px; font-weight: bold; color: #ddd;padding: 20px; text-align: center;">获取用户数据...</h1>
</template>

<script>
  import Auth from './../../auth/index.js'
  import {loginSuccess, userinfoSuccess} from './../../vuex/actions.js'
  export default {
    route: {
      activate: function () {
        var self = this
        self.$http.post('/auth/login/weixin', {
          code: self.$route.query.code
        }).then(
          function (data) {
  
            // 成功获取token
            Auth.login(data.data.data.token)
            self.loginSuccess(data.data.data.token)
            self.$http.get('/users/info').then(
              function (data) {
                var userinfo = data.data.data
                // 成功获取用户信息
                self.userinfoSuccess(userinfo)
                // 跳转到相对应的链接
                if (window.localStorage.getItem('backURL')) {
                  var url = window.localStorage.getItem('backURL')
                  window.localStorage.removeItem('backURL')
                  self.$route.router.go(url)
                } else {
                  self.$route.router.go('/')
                }
              },
              function () {
                // 获取手机号码失败
                self.$route.router.go('/')
              }
            )
          },
          function (data) {
            // 获取token失败
           
            window.alert('获取登录令牌失败，请重试')
            self.$route.router.go('/')
          }
        )
      }
    },
    vuex: {
      actions: {
        loginSuccess,
        userinfoSuccess
      }
    }
  }
</script>
