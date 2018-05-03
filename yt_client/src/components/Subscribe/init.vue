<template>
  数据获取中...
</template>

<script>
  export default {
    route: {
      activate: function () {
        var self = this
        this.$http.get('/subscribe/preorders').then(
          function (data) {
            if (!data.data.data.length) {
              self.$route.router.go('/subscribe/step1')
              return
            }
            var preorder = data.data.data[0]
            console.log(preorder)
            if (preorder.id) {
              // 订单存在
              if (preorder.status === 'assigning') {
                // 未处理
                if (preorder.charge_status === 0) {
                  // 未充值
                  self.$route.router.go('/subscribe/step2')
                } else {
                  // 已充值
                  self.$route.router.go('/subscribe/step3')
                }
              } else if (preorder.status === 'rejected') {
                // 等待处理
                self.$route.router.go('/subscribe/step3')
              } else {
                // 订单正常处理
                self.$route.router.go('/subscribe/order/' + preorder.order_no)
              }
            } else {
              // 订单不存在
              // 开始订奶
              self.$route.router.go('/subscribe/step1')
            }
          },
          function (data) {
            console.log(data)
            window.alert('网络错误无法获取订单，请刷新重试')
          }
        )
      }
    }
  }
</script>
