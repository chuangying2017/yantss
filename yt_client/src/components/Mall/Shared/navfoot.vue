<template>
  <div class="m-foot m-foot-nav">
    <div class="pure-g">
      <div class="pure-u-1-4">
        <a v-link="{ path: '/mall/home' }">
          <div class="icon-wrap">
            <i class="iconfont">&#xe63d;</i><br>
            商城首页
          </div>
        </a>
      </div>
      <div class="pure-u-1-4">
        <a v-link="{ path: '/subscribe/orders/create' }">
          <div class="icon-wrap">
            <i class="iconfont">&#xe660;</i><br>
            订奶服务
          </div>
        </a>
      </div>
      <div class="pure-u-1-4">
        <a v-link="{ path: '/subscribe/orders/create?cart=show' }">
          <div class="icon-wrap">
            <i class="iconfont">&#xe62f;</i><br>
            	
            购物车
          </div>
        </a>
      </div>
      <div class="pure-u-1-4">
        <a v-link="{ path: '/mall/user' }">
          <div class="icon-wrap">
            <i class="iconfont">&#xe629;</i><br>
            个人中心
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'NavFoot',

    components: {}

  }
</script>

<style>
  #yt-mall .m-foot.m-foot-nav a {
    height: auto;
    line-height: normal;
  }

  #yt-mall .m-foot .iconfont {
    font-size: 2.4rem;
  }

  .icon-wrap {
    padding: .5rem;
  }
  .m-foot{z-index: 1;}
</style>
