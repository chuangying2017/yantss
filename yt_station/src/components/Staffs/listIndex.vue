<script>
  export default{
//    route: {
//      activate: function (transition) {
//        transition.redirect('/station/subscribes/list/all')
//      }
//    }
    ready: function () {
      this.$route.router.go('/station/staffs/list/all')
    }
  }
</script>
