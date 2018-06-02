<template>
  <div v-if="$loadingRouteData" transition="fade">
    <loader></loader>
  </div>
  <div v-if="!$loadingRouteData" transition="show">
    <div class="pb70">
      <div class="m-card">
        <div class="cover">
          <img :src="campaign.cover_image" alt="" width="100%" class="image">
          <div class="mask">
            <div class="message message-green">
              {{ campaign.name }}
            </div>
          </div>
        </div>
      </div>
      <div class="m-press">
        <p class="title f16">{{ campaign.name }}</p>
        <p class="name f14">{{ campaign.desc }}</p>
        <p class="time f14">{{ campaign.created_at }}</p>
        <!--<p class="content f14">-->
          <!--{{ campaign.detail }}-->
        <!--</p>-->
        <p class="content">
          <img src="http://o7tep4eu1.bkt.clouddn.com/detail/4.jpg" alt="">
          <img src="http://o7tep4eu1.bkt.clouddn.com/detail/5.jpg" alt="">
          <img src="http://o7tep4eu1.bkt.clouddn.com/detail/1.jpg" alt="">
          <img src="http://o7tep4eu1.bkt.clouddn.com/detail/2.jpg" alt="">
          <img src="http://o7tep4eu1.bkt.clouddn.com/detail/3.jpg" alt="">
        </p>
      </div>
      <div class="m-card mt20" v-for="product in campaign.products">
        <div class="cover">
          <img :src="product.cover_image" alt="" width="100%" class="image">
          <div class="mask">
            <p class="title f16">
            {{product.title|}}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="m-footer">
    <div class="footer-btn">
      <button type="button" class="btn btn-round btn-success" @click.prevent="onPay" :disabled="working">
        <span v-show="!working">￥{{campaign.product_sku.price}} 一键购买</span>
        <span v-show="working">处理中...</span>
      </button>
    </div>
  </div>
</template>

<script>
  import Loader from './../Share/loader.vue'

  export default {
    name: 'Campaign',

    data: function () {
      return {
        campaign: {},
        working: false
      }
    },

    components: {
      Loader
    },
    route: {
      data: function (transition) {
        var self = this
        return self.$http.get('/campaigns/campaigns/' + transition.to.params.cam_id).then(
          function (data) {
            // 获取优惠券内容成功
            return {
              campaign: data.data.data
            }
          },
          function () {
            // 获取优惠券内容失败
            window.alert('获取优惠券内容失败')
            self.$route.router.go('/campaigns')
          }
        )
      }
    },

    methods: {
      onPay: function () {
        var self = this
        self.working = true
        // 提交订单
        this.$http.post('/campaigns/orders', {
//          amount: this.campaign.product_sku.price,
          campaign: this.$route.params.cam_id,
          channel: 'wx_pub'
        }).then(
          function (data) {
            // console.log(data.data.data)
            self.working = false
//          console.log(data.data.meta.charge)
            // 创建订单成功，调用支付接口
//          console.log(typeof window.XMLHttpRequest)
//          console.log(window.XMLHttpRequest)
            window.pingpp.createPayment(data.data.meta.charge, function (result, error) {
//            console.log(result)
//            console.log(error)
              if (result === 'success') {
                // 公众号内支付成功
                self.$route.router.go('/campaigns/tickets?status=')
              } else if (result === 'fail') {
                // 支付失败
                self.$route.router.go('/campaigns/list')
              } else if (result === 'cancel') {
                // 支付取消
                self.$route.router.go('/campaigns/list')
              }
            })
          },
          function (data) {
            // charge获取失败
            self.working = false
            window.alert('网络出错')
//            self.$route.router.go('/subscribe')
          }
        )
      }
    }
  }
</script>

<style scoped>
  .content img {
    width: 100%;
  }
</style>
