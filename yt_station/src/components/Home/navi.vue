<template>
  <h1>导航页</h1>
  <ul>
    <li v-show="!auth"><a v-link="{ path: '/auth/register' }">服务部注册</a></li>
    <!-- <li><a >服务部绑定</a></li> -->
    <li v-show="!auth"><a v-link="{ path: '/auth/login' }">服务部登录</a></li>
    <li v-show="auth"><a v-link="{ path: '/auth/logout' }">登出</a></li>
  </ul>
  <hr>
  <ul>
    <li><a v-link="{ path: '/subscribes' }">查看所有订单</a></li>
    <li><a v-link="{ path: '/staffs' }">配送员管理</a></li>
    <li><a v-link="{ path: '/subscribes' }">账单管理</a></li>
    <li><a v-link="{ path: '/deliveryOrder' }">提货单</a></li>
  </ul> 
</template>

<script>
  import { getAuth } from './../../vuex/getters.js'

  export default {
    name: 'Home',

    vuex: {
      getters: {
        auth: getAuth
      }
    }
  }
</script>