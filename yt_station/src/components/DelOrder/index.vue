<template>
  <!-- <h1>{{ activeDay }}提货单</h1>
  <a href="#" @click.prevent="dateTo(-1)" v-show="activeDay !== yesterday">< 昨天</a>
  <a href="#" @click.prevent="dateTo(0)" v-show="activeDay !== today">今天</a>
  <a href="#" @click.prevent="dateTo(1)" v-show="activeDay !== tomorrow">明天> </a> -->
  <!-- <table>
    <tr>
      <td>产品名称</td>
      <td>数量</td>
    </tr>
    <tr v-for="order in orders">
      <td>{{ order.title }}</td>
      <td>{{ order.count }}</td>
    </tr>
  </table> -->
  <div class="tab2">
    <div class="m-tabs">
      <ul class="clearfix">
        <li><a href="#" @click.prevent="dateTo(-1)" v-show="activeDay !== yesterday" class="item item1 fl">前一天</a></li>
        <li><a href="#" @click.prevent="dateTo(0)" class="item item1"><i class="iconfont"
                                                                         style="-webkit-font-smoothing: antialiased;">
          &#xe658;</i> {{ activeDay
          }}</a>
        </li>
        <li><a href="#" @click.prevent="dateTo(1)" v-show="activeDay !== tomorrow" class="item item1 fr">后一天</a></li>
      </ul>
    </div>
    <div class="u-table" v-show="!$loadingRouteData && orders.length && !loading">
      <table width="100%" class="pure-table pure-table-bordered">
        <thead>
        <tr>
          <th>产品</th>
          <th>数量</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="order in orders">
          <td>{{ order.name }}</td>
          <td>{{ order.quantity }}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <loader v-show="$loadingRouteData || loading"></loader>
    <empty v-show="!$loadingRouteData && !orders.length && !loading" icon="&#xe651;">当日没有需要取的货品</empty>
  </div>
</template>

<script>
  import Empty from './../Share/empty.vue'
  import Loader from './../Share/loader.vue'

  export default {
    name: 'DelOrder',

    data: function () {
      return {
        orders: [],
        activeDay: '',
        loading: false
      }
    },

    components: {
      Empty,
      Loader
    },

    computed: {
      tomorrow: function () {
        return this.addDay(5)
      },
      today: function () {
        return this.addDay(4)
      },
      yesterday: function () {
        return this.addDay(3)
      }
    },

    route: {
      data: function () {
        var self = this
        var someDate = new Date()
        var numberOfDaysToAdd = 4
        someDate.setDate(someDate.getDate() + numberOfDaysToAdd)
        var date = someDate.getDate()
        var month = someDate.getMonth() + 1
        var year = someDate.getFullYear()
        return self.$http.get('/stations/preorders/daily', {
          date: year + '-' + month + '-' + date
        }).then(
          function (data) {
            return {
              orders: data.data.data,
              activeDay: year + '-' + month + '-' + date
            }
          },
          function (data) {
            window.alert('获取数据失败，请重试')
          }
        )
      }
    },

    methods: {
      getCurrentDay: function (currentDate) {
        var day = currentDate.getDate()
        var month = currentDate.getMonth() + 1
        var year = currentDate.getFullYear()
        return year + '-' + month + '-' + day
      },
      dateTo: function (n) {
        switch (n) {
          case -1:
            if (this.activeDay === this.tomorrow) {
              this.$set('activeDay', this.today)
            } else {
              this.$set('activeDay', this.yesterday)
            }
            this.getCurrentProducts()
            break
          case 0:
            this.$set('activeDay', this.today)
            this.getCurrentProducts()
            break
          case 1:
            if (this.activeDay === this.yesterday) {
              this.$set('activeDay', this.today)
            } else {
              this.$set('activeDay', this.tomorrow)
            }
            this.getCurrentProducts()
            break
        }
      },
      getCurrentProducts: function () {
        var self = this
        self.loading = true
        self.$http.get('/stations/preorders/daily', {
          date: self.activeDay
        }).then(
          function (data) {
            self.orders = data.data.data
            self.loading = false
          },
          function (data) {
            window.alert('获取数据失败，请重试')
          }
        )
      },
      addDay: function (days) {
        var someDate = new Date()
        var numberOfDaysToAdd = days
        someDate.setDate(someDate.getDate() + numberOfDaysToAdd)
        var dd = someDate.getDate()
        var mm = someDate.getMonth() + 1
        var yyyy = someDate.getFullYear()
        return yyyy + '-' + (('0' + mm).slice(-2)) + '-' + (('0' + dd).slice(-2))
      }
    }
  }
</script>

<style scoped>
  .u-table {
    margin: 1rem;
    font-size: 1.4rem;
  }

  .u-table table {
    background: #fff;
    text-align: center;
  }

  .u-table thead th {
    text-align: center;
  }
</style>
