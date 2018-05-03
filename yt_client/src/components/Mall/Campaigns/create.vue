<template>
  create
  <button @click.prevent="createCampaign">create</button>
</template>

<script>
  import campaignService from './../../../wilddog/campaignService'

  export default {
    name: 'Create',

    vuex: {
      getters: {
        getUser: function (state) {
          return state.user.info
        }
      }
    },

    route: {
      activate: function (transition) {
        var organiserId = this.getUser.providers.weixin.openid
        campaignService.exist(organiserId).then(
          function (data) {
            if (!data) {
              transition.next()
            } else {
              transition.redirect('/mall/campaign/' + organiserId)
            }
          }
        )
      }
    },

    methods: {
      createCampaign: function () {
        var organiserId = this.getUser.providers.weixin.openid
        var self = this
        campaignService.createCampaign(organiserId, self.getUser).then(
          function () {
            self.$route.router.go('/mall/campaign/' + organiserId)
          },
          function () {
            window.alert('发起失败,请重新尝试')
          }
        )
      }
    }
  }
</script>
