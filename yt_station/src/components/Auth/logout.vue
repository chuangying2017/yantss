<script>
  import { logout } from './../../vuex/actions.js'
  import Auth from './../../auth/index.js'

  export default {
    name: 'Logout',

    route: {
      activate: function () {
        this.logout()
        Auth.logout()
        this.$route.router.go('/')
      }
    },

    vuex: {
      actions: {
        logout
      }
    }
  }
</script>
