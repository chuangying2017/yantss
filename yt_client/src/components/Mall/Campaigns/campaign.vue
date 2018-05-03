<template>
  {{{imgTag}}}
  领券人数: {{memberLength}} | 使用人数: {{userLength}}
</template>

<script>
  import campaignService from './../../../wilddog/campaignService'
  import qrcode from 'qrcode-generator'
  import {HOST} from './../../../config'
  import _ from 'underscore'

  export default {
    name: 'Campaign',

    data: function () {
      return {
        campaign: {
          members: '',
          users: ''
        },
        imgTag: '',
        memberLength: 0,
        userLength: 0
      }
    },

    vuex: {
      getters: {
        getUser: function (state) {
          return state.user.info
        }
      }
    },

    methods: {
      makeQrcode: function (url, type) {
        var qr = qrcode(type || 6, 'M')
        qr.addData(url)
        qr.make()
        return qr.createImgTag()
      }
    },

    route: {
      activate: function (transition) {
        if (this.getUser.providers.weixin.openid !== this.$route.params.cam_id) {
          transition.redirect('/mall/campaign/' + this.$route.params.cam_id + '/coupons')
        } else {
          transition.next()
        }
      },
      data: function (transition) {
        var self = this
        return campaignService.getCampaign(self.$route.params.cam_id).then(
          function (data) {
            if (!data) {
              transition.redirect('/mall/campaign/create')
            } else {
              self.memberLength = _.size(data.members)
              self.userLength = _.size(data.users)
              return {
                campaign: data
              }
            }
          }
        )
      }
    },

    ready: function () {
      var self = this
      var url = HOST + '/?#!/mall/campaign/' + self.$route.params.cam_id + '/coupons'
      console.log(url)
      self.imgTag = self.makeQrcode(url)
    }
  }
</script>
