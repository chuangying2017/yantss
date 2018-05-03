<template>
  <div class="m-head m-head-info f-border-bottom f-mg-bottom">
    <div class="pure-g">
      <div class="pure-u-1-3 tl">
        <a href="javascript:window.history.go(-1)"><i class="iconfont">&#xe628;</i></a>
      </div>
      <div class="pure-u-1-3">
        <h1 class="title">
          订单详情
        </h1>
      </div>
      <div class="pure-u-1-3 tr">
      </div>
    </div>
  </div>
  <div :class="['m-panel', order.refund_status  ? 'm-panel-return' : '']">
    <h1 class="title">
      <order-status :refund="order.refund_status" :status="order.status" :icon="true"></order-status>
    </h1>
  </div>
  <div class="m-address m-address-order">
    <div class="f-table-cell icon">
      <i class="iconfont">&#xe649;</i>
    </div>
    <div class="f-table-cell" style="width: 100%;">
      <h2 class="name">{{order.address.name}} <span class="phone fr">{{order.address.phone}}</span></h2>
      <p class="address">{{order.address.address}}</p>
    </div>
  </div>
  <!-- <div class="m-list f-mg-bottom">
    <ul>
      <li>被拒理由：{{ order.refund_order.data[0].merchant_memo }}</li>
    </ul>
  </div> -->
  <div class="m-list-links" v-if="order.status == 'deliver'">
    <ul>
      <li>
        <a href="" class="m-delivery">
          <div class="f-table-cell icon">
            <i class="iconfont">&#xe638;</i>
          </div>
          <div class="f-table-cell">
            <p class="info">点击查看第三方物流消息</p>
            <p class="tips">{{ order.child_orders['data'][0]['deliver']['data']['created_at'] }}</p>
          </div>
        </a>
      </li>
    </ul>
  </div>
  <div class="m-order-pd f-border-bottom" v-for="sku in order.skus">
    <div class="pure-g">
      <div class="pure-u-5-6">
        <div class="wrap">
          <div class="f-table-cell">
            <img :src="sku.cover_image" height="253" width="253" :alt="sku.title" class="thumbnail">
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
  <div class="m-list m-list-sm f-mg-bottom">
    <ul>
      <li>
        <span>运费</span> <span class="fr">￥0.00</span>
      </li>
      <!--<li>-->
      <!--<span>优惠价</span> <span class="fr">-￥{{order.discount_fee}}</span>-->
      <!--</li>-->
      <li v-if="order.status == 'unpaid'">
        <span>需付款</span> <span class="fr">￥{{order.total_amount}}</span>
      </li>
      <li v-if="order.status !== 'unpaid'">
        <span>实付款</span> <span class="fr">￥{{order.total_amount}}</span>
      </li>
    </ul>
  </div>
  <div class="m-list f-mg-bottom">
    <ul>
      <li>订单备注：{{order.memo.customer || '无' }}</li>
    </ul>
  </div>
  <div class="m-list">
    <ul>
      <li>订单编号：{{order.order_no}}</li>
      <li v-if="order.status !== 'unpaid'">支付方式：{{order.pay_type}}</li>
      <li>下单时间：{{order.created_at.date}}</li>
    </ul>
  </div>
  <div class="m-list mt20" v-if="order.status === 'shipping'">
    <ul>
      <li>物流公司：{{ order.deliver.company.name }}</li>
      <li>物流单号：{{ order.deliver.post_no }}</li>
      <li><a :href="'http://m.kuaidi100.com/index_all.html?type=' + order.deliver.company.name + '&postid=' + order.deliver.post_no" style="color: #C71A40;">查看快递</a></li>
      <!--<li>发货时间：{{ order.child_orders['data'][0]['deliver']['data']['created_at'] }}</li>-->
    </ul>
  </div>
  <!-- <div class="btn-wrap" v-if="order.status == 'unpaid'">
    <delete-order :order="order" style="detail"></delete-order>
  </div>
  <div class="btn-wrap" v-if="order.status !== 'unpaid' && !order.refund_status">
      <a v-link="{ path: '/orders/' + order.order_no + '/return' }" class="u-btn u-btn-info">退货</a>
  </div> -->
</template>

<script>
  import OrderStatus from './status.vue'

  export default {
    name: 'Order',

    data: function () {
      return {
        order: {}
      }
    },

    components: {
      OrderStatus
    },

    route: {
      data: function () {
        return this.$http.get('/mall/orders/' + this.$route.params.order_id).then(
          function (data) {
            // 成功获取订单信息
            return {
              order: data.data.data
            }
          },
          function (data) {
            // 获取订单信息失败
            window.alert('获取失败，请刷新重试')
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
