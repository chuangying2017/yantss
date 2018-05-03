<script>
  import {logoutUser} from './../../vuex/actions.js'
  import Auth from './../../auth/index.js'

  export default {
    name: 'Logout',

    route: {
      activate: function (transition) {
        this.logoutUser()
        Auth.logout()
        transition.redirect('/admin/login')
      }
    },

    vuex: {
      actions: {
        logoutUser
      }
    }
  }
</script>
