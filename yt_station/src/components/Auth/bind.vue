<script>
  export default {
    name: 'Bind',

    route: {
      activate: function () {
        var self = this
        this.$http.get('/stations/bind_station', {
          station_id: self.$route.params.station_id
        }).then(
          function (data) {
            window.alert('绑定成功')
            self.$route.router.go('/')
//            console.log(data)
          },
          function (data) {
            console.log(data)
          }
        )
      }
    }
  }
</script>
