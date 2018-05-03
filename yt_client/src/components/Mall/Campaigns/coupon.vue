<template>
  <button @click.prevent="getCoupon(coupon.id)" :disabled="!canUse">获取优惠券 {{coupon.id}}</button>
</template>

<script>
  import campaignService from './../../../wilddog/campaignService'
  import memberService from './../../../wilddog/memberService'

  export default{
    name: 'Coupon',

    data: function () {
      return {
        canUse: true
      }
    },

    props: ['coupon', 'member'],

    methods: {
      getCoupon: function (id) {
        var self = this
        this.$http.post('/promotions/tickets', {
          coupon_id: id
        }).then(
          function (data) {
            var ticketId = data.data.data.id
            var memberId = this.member.providers.weixin.openid
            Promise.all([
              campaignService.updateMember(self.$route.params.cam_id, memberId, this.member, ticketId),
              memberService.updateTicket(self.$route.params.cam_id, memberId, ticketId),
              memberService.updateCampaign(self.$route.params.cam_id, memberId, ticketId)
            ]).then(
              function () {
                self.canUse = false
              },
              function () {
                window.alert('领取有误,请刷新重试')
              }
            )
          },
          function (data) {
            window.alert('获取失败,请重新尝试')
          }
        )
      }
    }
  }
</script>
