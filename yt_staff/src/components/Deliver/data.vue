<template>
  <div class="u-tab">
    <div class="pure-g">
      <div class="pure-u-1-2">
        <a v-link="{ path: '/deliver/data?time=0' }" :class="[ $route.query.time === '0' ? 'active' : '' ]">
          <i class="iconfont">&#xe64f;</i> {{tomorrow}} 上午
        </a>
      </div>
      <div class="pure-u-1-2">
        <a v-link="{ path: '/deliver/data?time=1' }" :class="[ $route.query.time === '1' ? 'active' : '' ]">
          <i class="iconfont">&#xe650;</i> {{tomorrow}} 下午
        </a>
      </div>
    </div>
  </div>
  <loader v-show="$loadingRouteData"></loader>
  <empty v-show="!$loadingRouteData && !summary.length">该时间段没有配送订单</empty>
  <div class="u-table" v-show="!$loadingRouteData && summary.length">
    <table class="pure-table pure-table-bordered">
      <thead>
      <tr>
        <th>配送产品</th>
        <th>数量</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="sku in summary">
        <td>{{sku.name|filtproductit}}</td>
        <td>
          {{sku.quantity}}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import Loader from './../Share/loader.vue'
  import Empty from './../Share/empty.vue'

  export default{
    name: 'Addresses',

    data: function () {
      return {
        summary: []
      }
    },

    components: {
      Loader,
      Empty
    },

    route: {
      data: function () {
        var someDate = new Date()
        var numberOfDaysToAdd = 1
        someDate.setDate(someDate.getDate() + numberOfDaysToAdd)
        var dd = someDate.getDate()
        var mm = someDate.getMonth() + 1
        var yyyy = someDate.getFullYear()
        var self = this
        return this.$http.get('/staffs/preorders/daily', {
          date: yyyy + '-' + mm + '-' + dd,
          daytime: self.$route.query.time
        }).then(
          function (data) {
            return {
              summary: data.data.meta.summary
            }
          },
          function () {
            window.alert('获取订单失败，请刷新重试')
          }
        )
      }
    },

    computed: {
      tomorrow: function () {
        var someDate = new Date()
        var numberOfDaysToAdd = 1
        someDate.setDate(someDate.getDate() + numberOfDaysToAdd)
        var dd = someDate.getDate()
        var mm = someDate.getMonth() + 1
//        var yyyy = someDate.getFullYear()
        return (('0' + mm).slice(-2)) + '-' + (('0' + dd).slice(-2))
      }
    }
  }
</script>
