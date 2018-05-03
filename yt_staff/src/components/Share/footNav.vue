<template>
  <nav>
    <div class="pure-g">
      <div class="pure-u-1-5">
        <a v-link="{ path: '/deliver/addresses?time=0', activeClass: 'active' }">
          <i class="iconfont">&#xe64c;</i><br>
          配送地址
        </a>
      </div>
      <div class="pure-u-1-5">
        <a v-link="{ path: '/deliver/data?time=0', activeClass: 'active' }">
          <i class="iconfont">&#xe64d;</i><br>
          取货统计
        </a>
      </div>
      <div class="pure-u-1-5">
        <a v-link="{ path: '/deliver/search', activeClass: 'active' }">
          <i class="iconfont">&#xe664;</i><br>
          搜索
        </a>
      </div>
      <div class="pure-u-1-5">
        <a v-link="{ path: '/deliver/orders', activeClass: 'active' }">
          <i class="iconfont">&#xe64e;</i><br>
          客户列表
        </a>
      </div>
      <div class="pure-u-1-5">
        <a v-link="{ path: '/deliver/recommand', activeClass: 'active' }">
          <i class="iconfont">&#xe61c;</i><br>
          推荐客户
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
