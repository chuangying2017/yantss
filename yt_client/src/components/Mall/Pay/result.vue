<style scoped>
  .m-result {
    margin-top: 5rem;
    font-size: 3rem;
    text-align: center;
  }

  .m-result .iconfont {
    font-size: 6rem;
    color: #CE5288;
  }

  .m-result .title {
    font-weight: bold;
  }

  .btn-wrap {
    margin-top: 1rem;
    padding: 1rem;
  }

  .btn-wrap a {
    display: block;
  }
</style>

<template>
  <div class="m-head m-head-info f-border-bottom f-mg-bottom">
    <div class="pure-g">
      <div class="pure-u-1-3 tl">
      </div>
      <div class="pure-u-1-3">
        <h1 class="title">
          支付结果
        </h1>
      </div>
      <div class="pure-u-1-3 tr">
      </div>
    </div>
  </div>
  <div class="m-result" v-if="$route.params.type == 'success'">
    <i class="iconfont">&#xe630;</i>
    <h1 class="title">支付成功</h1>
  </div>
  <div class="m-result" v-if="$route.params.type == 'fail'">
    <i class="iconfont">&#xe62c;</i>
    <h1 class="title">支付失败</h1>
  </div>
  <div class="m-result" v-if="$route.params.type == 'cancel'">
    <i class="iconfont">&#xe63f;</i>
    <h1 class="title">支付取消</h1>
  </div>
  <div class="btn-wrap">
    <a class="u-btn u-btn-info" v-link="{ path: '/mall/orders?status=' }">查看我的订单</a>
  </div>
  <foot-nav></foot-nav>
</template>

<script>
  import FootNav from './../Shared/navfoot.vue'

  export default {

    name: 'Result',

    components: {
      FootNav
    }

  }
</script>

<style scoped>
  #yt-mall .m-head-info .title {
    color: #000;
  }
</style>
