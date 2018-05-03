<script>
  import authService from './../../services/authService'
  import {logoutUser} from './../../vuex/actions'
  export default {
    name: 'Logout',
    vuex: {
      actions: {
        logoutUser
      }
    },
    route: {
      activate: function () {
        authService.logout()
        this.logoutUser()
        window.location.href = '/yt-admin'
      }
    }
  }
</script>
