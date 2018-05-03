<template>
  <div class="m-head m-head-info f-border-bottom f-mg-bottom">
    <div class="pure-g">
      <div class="pure-u-1-3 tl">
      </div>
      <div class="pure-u-1-3">
        <h1 class="title">
          支付订单
        </h1>
      </div>
      <div class="pure-u-1-3 tr">
      </div>
    </div>
  </div>
  <ul class="m-list m-list-select m-list-full">
    <li>
      <input type="radio" id="pay2" v-model="channel" value="wx_pub" checked>
      <label for="pay2">
        <i class="iconfont u-pay-icon wechat">&#xe617;</i>微信支付
        <div class="fr">
          <i class="iconfont uncheck">&#xe61a;</i>
          <i class="iconfont checked">&#xe616;</i>
        </div>
      </label>
    </li>
  </ul>
  <div class="m-fixed-nav">
    <div class="pure-g">
      <div class="pure-u-1-1">
        <a href="#" class="u-nav-btn u-btn-primary" @click.prevent="submitOrder();" v-show="!working">马上支付</a>
        <a class="u-nav-btn u-btn-primary" v-show="working">处理中...</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'Pay',

    data: function () {
      return {
        channel: null
      }
    },

    methods: {
      submitOrder: function () {
        var self = this
        this.$http.post('/mall/orders/' + this.$route.params.order_id + '/checkout', {
          channel: 'wx_pub'
        }).then(
          function (charge) {
            // 成功获取charge
            window.pingpp.createPayment(charge.data.data, function (result, error) {
              if (result === 'success') {
                // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的 wap 支付结果都是在 extra 中对应的 URL 跳转。
                self.$route.router.go('/mall/result/success')
              } else if (result === 'fail') {
                // charge 不正确或者微信公众账号支付失败时会在此处返回
                self.$route.router.go('/mall/result/fail')
              } else if (result === 'cancel') {
                // 微信公众账号支付取消支付
                self.$route.router.go('/mall/result/cancel')
              }
            })
          },
          function (data) {
            // 获取charge失败
          }
        )
      }
    }
  }
</script>

<style scoped>
  #yt-mall .m-head-info .title {
    color: #000;
    font-size: 1.4rem;
  }
</style>
