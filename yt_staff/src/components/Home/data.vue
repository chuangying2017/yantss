<template>
  <div class="table">
    <table width="100%">
      <tr>
        <td>产品</td>
        <td>数量</td>
      </tr>
      <tr v-for="product in data">
        <td>{{ product.name }}</td>
        <td>{{ product.quantity }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'Data',

    data: function () {
      return {
        data: []
      }
    },

    computed: {
      filterTime: function () {
        if (this.$route.query.time === 'morning') {
          return 0
        } else {
          return 1
        }
      }
    },

    route: {
      data: function () {
        var today = new Date()
        var year = today.getFullYear()
        var month = today.getMonth() + 1
        var date = today.getDate()
        return this.$http.get('/staffs/preorders/daily', {
          date: year + '-' + month + '-' + date,
          daytime: parseInt(this.filterTime)
        }).then(
          function (data) {
            return {
              data: data.data.meta.summary
            }
          },
          function () {
            window.alert('获取订单失败，请刷新重试')
          }
        )
      }
    }
  }
</script>
