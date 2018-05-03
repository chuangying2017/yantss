<script>
  import {logoutUser} from './../../vuex/actions'
  import Auth from './../../auth/index.js'

  export default {
    name: 'Logout',

    route: {
      activate: function () {
        this.logoutUser()
        Auth.logout()
        this.$route.router.go('/auth/login')
      }
    },

    vuex: {
      actions: {
        logoutUser
      }
    }
  }
</script>
