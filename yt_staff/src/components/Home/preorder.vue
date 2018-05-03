<template>
  <div class="m-head">
    <a v-link="{ path: '/staff/info' }" class="icon"><i class="iconfont">&#xe604;</i><span class="text">返回</span></a>
  </div>
  <div class="m-tabs mt40">
    <ul class="clearfix">
      <li><a v-link="{ path: '/staff/preorders/deliver?time=' + $route.query.time, activeClass: 'active' }"
             class="item">配送地址</a></li>
      <li><a v-link="{ path: '/staff/preorders/data?time=' + $route.query.time, activeClass: 'active' }" class="item">配送统计</a>
      </li>
    </ul>
  </div>
  <router-view></router-view>
</template>

<script>
  export default {
    name: 'PreOrders'
  }
</script>
