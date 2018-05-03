<template>
  <div class="u-tab">
    <div class="pure-g">
      <div class="pure-u-1-2">
        <a v-link="{ path: '/deliver/addresses?time=0' }" :class="[ $route.query.time === '0' ? 'active' : '' ]">
          <i class="iconfont">&#xe64f;</i> 今日上午
        </a>
      </div>
      <div class="pure-u-1-2">
        <a v-link="{ path: '/deliver/addresses?time=1' }" :class="[ $route.query.time === '1' ? 'active' : '' ]">
          <i class="iconfont">&#xe650;</i> 今日下午
        </a>
      </div>
    </div>
  </div>
  <loader v-show="$loadingRouteData"></loader>
  <empty v-show="!$loadingRouteData && !preorders.length">该时间段没有配送订单</empty>
  <div class="u-table u-table-scroll" v-show="!$loadingRouteData && preorders.length">
    <table class="pure-table pure-table-bordered">
      <thead>
      <tr>
        <th>配送地址</th>
        <th>投递产品</th>
        <th>剩余瓶数</th>
        <th>客户姓名</th>
        <th>客户电话</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="preorder in preorders">
        <td class="lg-column"><span v-show="preorder.is_new" class="new"><i class="iconfont">&#xe653;</i></span>
          {{preorder.address}}
        </td>
        <td class="lg-column">
          <p v-for="product in preorder.skus">
            {{product.name}} *{{product.quantity}}瓶
          </p>
        </td>
        <td class="lg-column">
          <span v-for="sku in preorder.skus">{{sku.name}}剩余{{sku.remain}}瓶<br></span>
        </td>
        <td class="md-column">{{preorder.name}}</td>
        <td>{{preorder.phone}}</td>
        <td>
          <a href="#" v-link="{path:'/deliver/orders/' + preorder.id}"
             class="act-link">
            <span><i class="iconfont">&#xe65c;</i> 查看</span>
          </a>
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
        preorders: []
      }
    },

    components: {
      Loader,
      Empty
    },

    computed: {
      dayChange: function () {
        if (this.$route.query.time === '1') {
          return '0'
        } else {
          return '1'
        }
      }
    },

    route: {
      data: function () {
        var today = new Date()
        var date = today.getDate()
        var month = today.getMonth() + 1
        var year = today.getFullYear()
        var self = this
        return this.$http.get('/staffs/preorders/daily', {
          date: year + '-' + month + '-' + date,
          daytime: self.dayChange
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
    },

    ready: function () {
      window.mixpanel.track('配送员追踪', {
        action: '配送员打开客户端'
      })
    }
  }
</script>

<style>
  .u-tab {
    margin: 1rem;
    text-align: center;
    border: 1px solid #25AD25;
    border-radius: 3px;
  }

  .u-tab a {
    display: block;
    padding: .5rem;
    font-size: 1.4rem;
    color: #25AD25;
    background: #fff;
  }

  .u-tab a.active {
    background: #25AD25;
    color: #fff;
  }

  .u-table.u-table-scroll {
    font-size: 1.4rem;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
  }

  .u-table.u-table-scroll table {
    width: auto;
    background: #fff;
    table-layout: fixed;
  }

  .u-table.u-table-scroll th, .u-table.u-table-scroll td {
    min-width: 80px;
  }

  .u-table.u-table-scroll .lg-column {
    min-width: 180px;
  }

  .u-table.u-table-scroll .md-column {
    min-width: 100px;
  }

  .u-table {
    margin: 0 1rem;
    font-size: 1.4rem;
    padding-bottom: 6rem;
  }

  .u-table table {
    width: 100%;
    background: #fff;
  }

  .u-table a {
    color: #25AD25;
  }

  .new .iconfont {
    color: #DC2222;
    -webkit-font-smoothing: antialiased;
  }
</style>
