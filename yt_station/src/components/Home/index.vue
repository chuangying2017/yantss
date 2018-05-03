<template>
  <div style="padding-bottom: 60px;">
    <router-view></router-view>
  </div>
  <foot-nav></foot-nav>
</template>

<script>
  import Auth from './../../auth/index'
  import {loginSuccess, userinfoSuccess} from './../../vuex/actions'
  import FootNav from './../Share/footNav.vue'

  export default {
    name: 'Home',

    components: {
      FootNav
    },

    vuex: {
      actions: {
        loginSuccess,
        userinfoSuccess
      }
    },

    route: {
      activate: function (transition) {
        var self = this
        this.loginSuccess(Auth.token())
        this.$http.get('/users/info').then(
          function (data) {
            self.userinfoSuccess(data.data.data)
            if (data.data.data.roles.indexOf('Station') === -1) {
              transition.redirect('/error/nostation')
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


