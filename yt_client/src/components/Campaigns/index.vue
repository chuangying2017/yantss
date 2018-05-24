<template>
  <router-view></router-view>
</template>

<script>
  import Auth from './../../auth/index'
  import {loginSuccess, userinfoSuccess} from './../../vuex/actions'

  export default {
    name: 'Subscribe',

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
            transition.next()
          },
          function (data) {
//          console.log(data)
            transition.next()
          }
        )
      }
    }
  }
</script>
