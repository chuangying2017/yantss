<template>
  <h1 style="font-size: 20px; font-weight: bold; color: #ddd;padding: 20px; text-align: center;">微信登录中...</h1>
</template>

<script>
  export default {
    route: {
      activate: function () {
        var self = this
        // 获取登录链接
        self.$http.get('/auth/login/weixin?role=staff').then(
          function (data) {
            // 获取成功，准备跳转
            var url = data.data.data.url
            window.location.href = url
          },
          function (data) {
            // 获取失败，回到首页
            window.alert('获取微信登录链接失败，请重试')
            self.$route.router.go('/')
          }
        )
      }
    }
  }
</script>
