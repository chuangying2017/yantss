<template>
  <div class="u-tab">
    <div class="pure-g">
      <div class="pure-u-1-2">
        <a v-link="{ path: '/station/exchange/month', activeClass: 'active' }">
          <i class="iconfont">&#xe659;</i> 月账单
        </a>
      </div>
      <div class="pure-u-1-2">
        <a v-link="{ path: '/station/exchange/day', activeClass: 'active' }">
          <i class="iconfont">&#xe65a;</i> 日明细
        </a>
      </div>
    </div>
  </div>
  <router-view></router-view>
</template>

<script>
  export default {
    name: 'Exchange'
  }
</script>

<style scoped>
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
</style>
