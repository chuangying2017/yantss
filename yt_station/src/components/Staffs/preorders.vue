<template>
  <div class="table">
    <table width="100%">
      <tr>
        <td>用户</td>
        <td>电话</td>
        <td>地址</td>
      </tr>
      <tr v-for="preorder in preorders">
        <td>{{ preorder.name }}</td>
        <td>{{ preorder.phone }}</td>
        <td>{{ preorder.address }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'StaffOrders',

    data: function () {
      return {
        preorders: []
      }
    },

    route: {
      data: function () {
        var self = this
        return self.$http.get('/stations/staffs/' + self.$route.params.staff_id + '/preorders').then(
          function (data) {
            return {
              preorders: data.data.data
            }
          },
          function (data) {
            window.alert('获取订单失败')
            self.$route.router.go('/station/staffs/' + self.$route.params.staff_id + '/info')
          }
        )
      }
    }
  }
</script>
