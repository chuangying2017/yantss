<template>
  <div v-for="coupon in coupons">
    <coupon :coupon="coupon" :member="getUser"></coupon>
  </div>
  <span v-show="isInCampaign">已经领过券了,不能再领了哦</span>
</template>

<script>
  //  import campaignService from './../../../wilddog/campaignService'
  import memberService from './../../../wilddog/memberService'
  import Coupon from './coupon.vue'

  export default {
    name: 'Coupons',

    components: {
      Coupon
    },

    data: function () {
      return {
        coupons: [],
        isInCampaign: false
      }
    },

    vuex: {
      getters: {
        getUser: function (state) {
          return state.user.info
        }
      }
    },

    route: {
      activate: function (transition) {
        /**
         * 权限处理
         */
        var openId = this.getUser.providers.weixin.openid
        var self = this
        // 判断是否为本人帐号
        if (openId === self.$route.params.cam_id) {
          transition.redirect('/mall/campaign/' + self.$route.params.cam_id)
        } else {
          // 判断是否有 memberid
          memberService.exsit(openId).then(
            function (data) {
              if (data) {
                // 判断 memberid 是否已参团
                memberService.inCampaign(openId, self.$route.params.cam_id).then(
                  function (data) {
                    if (data) {
                      self.isInCampaign = true
                    }
                    transition.next()
                  }
                )
              } else {
                // 创建 member
                memberService.createMember(openId).then(
                  function (data) {
                    // 创建成功
                    transition.next()
                  },
                  function (data) {
                    window.alert('加载失败,请重试')
                    transition.next()
                  }
                )
              }
            }
          )
        }
      },
      data: function () {
        return this.$http.get('/promotions/coupons/14').then(
          function (data) {
            var arr = []
            arr.push(data.data.data)
            console.log(arr)
            return {
              coupons: arr
            }
          },
          function (data) {
            window.alert('获取优惠券失败,请刷新重试')
          }
        )
      }
    }
  }
</script>
