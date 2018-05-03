<template>
  <div class="m-head m-head-info f-border-bottom f-mg-bottom">
    <div class="pure-g">
      <div class="pure-u-1-3 tl">
        <a v-link="{ path: '/mall/user' }"><i class="iconfont">&#xe628;</i></a>
      </div>
      <div class="pure-u-1-3">
        <h1 class="title">
          订单列表
        </h1>
      </div>
      <div class="pure-u-1-3 tr">
      </div>
    </div>
  </div>
  <div class="m-nav f-border-bottom" style="margin-top: -1rem;">
    <div class="pure-g">
      <div class="pure-u-1-4">
        <a v-link="{ path: '/mall/orders?status=' }" :class="[$route.query.status == '' ? 's-active' : '']">全部订单</a>
      </div>
      <div class="pure-u-1-4">
        <a v-link="{ path: '/mall/orders?status=unpaid' }" :class="[$route.query.status == 'unpaid' ? 's-active' : '']">待付款</a>
      </div>
      <div class="pure-u-1-4">
        <a v-link="{ path: '/mall/orders?status=paid' }"
           :class="[$route.query.status == 'paid' ? 's-active' : '']">已支付</a>
      </div>
      <div class="pure-u-1-4">
        <a v-link="{ path: '/mall/orders?status=done' }"
           :class="[$route.query.status == 'done' ? 's-active' : '']">已完成</a>
      </div>
    </div>
  </div>
  <ul class="m-order-list">
    <li class="m-order-item" v-for="order in orders | strictFilter orderState">
      <div class="heading">
        <span class="num">订单号：{{order.order_no}}</span>
	            <span class="info fr">
	            	<order-status :refund="order.refund_status" :status="order.status"
                              :icon="false"></order-status>
	            </span>
      </div>
      <div class="m-order-pd" v-for="sku in order.skus">
        <div class="pure-g">
          <div class="pure-u-5-6">
            <div class="wrap">
              <div class="f-table-cell">
                <img :src="sku.cover_image" :alt="sku.title"
                     class="thumbnail">
              </div>
              <div class="f-table-cell">
                <p class="text">{{sku.name}}</p>
                <!--<span class="tips" v-for="attr in sku.attributes">-->
                <!--{{attr.attribute_value_name}}-->
                <!--</span>-->
              </div>
            </div>
          </div>
          <div class="pure-u-1-6">
            <p class="price">￥{{sku.price}}</p>
            <p class="num">x {{sku.quantity}}</p>
          </div>
        </div>
      </div>
      <div class="footer clearfix f-border-bottom">
        <div class="pure-g">
          <div class="pure-u-5-6">
            <span>共 {{order.skus.length}} 件商品，总计：</span>
          </div>
          <div class="pure-u-1-6 tr">
            <span class="total">￥{{order.pay_amount}}</span>
          </div>
        </div>
      </div>
      <div class="footer clearfix">
        <a v-link="{ path: '/mall/orders/' + order.order_no }" class="fl more">查看订单详情</a>
        <div class="m-btn-groups fr">
          <!--<a v-link="{ path: '/mall/orders/' + order.order_no + '/return' }" class="u-order-btn u-order-btn-info"-->
          <!--v-if="order.status !== 'unpaid' && order.refund_status === 'none'">退货/退款</a>-->
          <a class="u-order-btn u-order-btn-info" v-if="order.status !== 'unpaid' && !order.refund_status">查看物流</a>
          <delete-order :order="order" style="list"></delete-order>
          <a v-link="{ path: '/pay/' + order.order_no }" class="u-order-btn" v-if="order.status == 'unpaid'">去支付</a>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
  import OrderStatus from './status.vue'

  export default{
    name: 'Orders',

    components: {
      OrderStatus
    },

    data: function () {
      return {
        orders: []
      }
    },

    computed: {
      orderState: function () {
        return this.$route.query.status
      }
    },

    route: {
      activate: function () {
        var self = this
        this.$http.get('/mall/orders').then(
          function (data) {
            // 成功获取订单
            self.orders = data.data.data
          },
          function (data) {
            // 获取失败
            window.alert('请刷新重试')
          }
        )
      }
    }
  }
</script>

<style scoped>
  #yt-mall .m-head-info .title {
    color: #000;
  }
</style>
