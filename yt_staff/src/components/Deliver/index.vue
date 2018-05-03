<template>
  <router-view keep-alive></router-view>
  <div style="padding-bottom: 70px;"></div>
  <foot-nav></foot-nav>
</template>

<script>
  import Auth from './../../auth/index'
  import {loginSuccess, userinfoSuccess} from './../../vuex/actions'
  import FootNav from './../Share/footNav.vue'

  export default {
    vuex: {
      actions: {
        loginSuccess,
        userinfoSuccess
      }
    },

    components: {
      FootNav
    },

    route: {
      activate: function (transition) {
        var self = this
        this.loginSuccess(Auth.token())
        this.$http.get('/users/info').then(
          function (data) {
            self.userinfoSuccess(data.data.data)
            if (data.data.data.roles.indexOf('Staff') === -1) {
              transition.redirect('/error/nostaff')
            } else {
              transition.next()
            }
          },
          function (data) {
            console.log(data)
            transition.next()
          }
        )
      }
    }
  }
</script>
