<template>
  <router-view></router-view>
</template>

<script>
  import Auth from './../../auth/index'
  import {loginSuccess, userinfoSuccess} from './../../vuex/actions'

  export default {
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
            console.log(data.data.data)
//            if (data.data.data.roles.indexOf('Staff') === -1) {
//              transition.redirect('/error/nostaff')
//            } else {
//              transition.next()
//            }
            transition.next()
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
