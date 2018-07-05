<template>
  <nav>
    <div class="pure-g">
      <div class="pure-u-1-5">
        <a v-link="{ path: '/station/subscribes/list/all', activeClass: 'active' }">
          <i class="iconfont">&#xe64e;</i><br>
          客户管理
        </a>
      </div>
      <!--<div class="pure-u-1-5">
        <a v-link="{ path: '/station/deliveryOrder', activeClass: 'active' }">
          <i class="iconfont">&#xe656;</i><br>
          送货单
        </a>
      </div>-->
       <div class="pure-u-1-5">
        <a v-link="{ path: '/station/assess/assesslist', activeClass: 'active' }">
          <i class="iconfont">&#xe656;</i><br>
     			评价
        </a>
      </div>
      <div class="pure-u-1-5">
        <a v-link="{ path: '/station/subscribes/search', activeClass: 'active' }">
          <i class="iconfont">&#xe664;</i><br>
          搜索
        </a>
      </div>
      <div class="pure-u-1-5">
        <a v-link="{ path: '/station/exchange/month', activeClass: 'active' }">
          <i class="iconfont">&#xe655;</i><br>
          账单明细
        </a>
      </div>
      <div class="pure-u-1-5">
        <a v-link="{ path: '/station/listhome/list', activeClass: 'active' }">
          <i class="iconfont">&#xe657;</i><br>
          配送员
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
  export default{
    name: 'FootNav'
  }
</script>

<style scoped>
  nav {
    position: fixed;
    width: 100%;
    text-align: center;
    bottom: 0;
    border-top: 1px solid #ddd;
    background: #fff;
  }

  nav a {
    display: block;
    padding: .5rem;
    font-size: 1.2rem;
    color: #bbb;
  }

  nav a.active {
    color: #25AD25;
  }

  nav a .iconfont {
    font-size: 2.4rem;
    -webkit-font-smoothing: antialiased;
  }
</style>
