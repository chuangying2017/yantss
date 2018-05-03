<template>
  <h1>导航页</h1>
  <!--{{user.nickname || '请登录'}}-->
  <ul>
    <li v-show="!auth"><a v-link="{ path: '/auth/login' }">登录</a></li>
    <li v-show="!auth"><a v-link="{ path: '/auth/register' }">注册</a></li>
    <li v-show="auth"><a v-link="{ path: '/auth/logout' }">登出</a></li>
    <li v-show="!auth"><a v-link="{ path: '/auth/wechat' }">微信登录</a></li>
  </ul>
  <hr>
  <ul v-show="auth">
    <li><a v-link="{ path: '/subscribe/init' }">订奶</a></li>
    <li><a v-link="{ path: '/mall/products' }">商城</a></li>
    <li><a v-link="{ path: '/campaigns/list' }">营销</a></li>
  </ul>
</template>

<script>
  import {getAuth, getUser} from './../../vuex/getters.js'

  export default {
    name: 'Home',

    vuex: {
      getters: {
        auth: getAuth,
        user: getUser
      }
    }
  }
</script>
