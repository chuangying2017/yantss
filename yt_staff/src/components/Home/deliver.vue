<template>
  <div class="table">
    <table width="100%">
      <thead>
      <tr>
        <th>地址</th>
        <th>产品</th>
      </tr>
      </thead>
      <tbody>
      <tr is="DelItem" v-for="preorder in preorders | filterBy filterTime in 'daytime'" :preorder="preorder"></tr>
      <!-- <tr>
        <td>dhd</td>
        <td>待处理</td>
        <td>
          <button type="button" class="btn btn-small btn-round btn-success">详情</button>
        </td>
      </tr> -->
      </tbody>
    </table>
  </div>
</template>

<script>
  import DelItem from './delItem.vue'

  export default {
    name: 'Deliver',

    components: {
      DelItem
    },

    data: function () {
      return {
        preorders: []
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
        var date = today.getDate()
        var month = today.getMonth() + 1
        var year = today.getFullYear()
        return this.$http.get('/staffs/preorders/daily', {
          date: year + '-' + month + '-' + date,
          daytime: parseInt(this.filterTime)
        }).then(
          function (data) {
            return {
              preorders: data.data.data
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
