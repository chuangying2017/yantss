<template>
  <router-view></router-view>
</template>

<script>
  import Auth from './../../auth/index'
  import {loginSuccess, userinfoSuccess} from './../../vuex/actions'
  import _ from 'underscore'

  export default {
    name: 'Bind',

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
            if (_.indexOf(data.data.data.roles, 'Station') !== -1) {
              console.log('123')
              transition.redirect('/error/station')
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
