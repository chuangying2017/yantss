<style scoped>
  .hide{
    display: none;
  }
</style>

<template>
  <span v-if="refund !== 'none'">
    <span v-if="refund == 'verify'">退货审核 <i :class="['iconfont', icon ? 'show' : 'hide']">&#xe646;</i></span>
    <span v-if="refund == 'approve'">审核通过 <i :class="['iconfont', icon ? 'show' : 'hide']">&#xe646;</i></span>
    <span v-if="refund == 'deliver'">退货中 <i :class="['iconfont', icon ? 'show' : 'hide']">&#xe646;</i></span>
    <span v-if="refund == 'refunding'">退款中 <i :class="['iconfont', icon ? 'show' : 'hide']">&#xe646;</i></span>
    <span v-if="refund == 'refunded'">已退款 <i :class="['iconfont', icon ? 'show' : 'hide']">&#xe646;</i></span>
    <span v-if="refund == 'reject'">退货被拒 <i :class="['iconfont', icon ? 'show' : 'hide']">&#xe646;</i></span>
  </span>
  <span v-if="refund === 'none'">
    <span v-if="status === 'unpaid'">待付款 <i :class="['iconfont', icon ? 'show' : 'hide']">&#xe61e;</i></span>
    <span v-if="status === 'paid'">待发货 <i :class="['iconfont', icon ? 'show' : 'hide']">&#xe61d;</i></span>
    <span v-if="status === 'shipping'">待收货 <i :class="['iconfont', icon ? 'show' : 'hide']">&#xe621;</i></span>
    <span v-if="status === 'done'">已完成 <i :class="['iconfont', icon ? 'show' : 'hide']">&#xe648;</i></span>
  </span>
</template>

<script>
  export default{

    name: 'OrderStatus',

    props: ['status', 'refund', 'icon']

  }
</script>
