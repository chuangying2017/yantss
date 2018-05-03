<template>
  <!-- <h1>配送员主页</h1>
  <p>姓名：{{ staff.name }}</p>
  <p>工号：{{ staff.staff_no }}</p>
  <a v-link="{ path: '/preorders/deliver?time=morning' }">上午配送</a>
  <a v-link="{ path: '/preorders/deliver?time=afternoon' }">下午配送</a> -->
  <div class="m-card pb20">
    <p class="time f16">
      <i class="iconfont">&#xe606;</i>
      <span>上午配送</span>
    </p>
    <div class="content">
      <!-- <p class="pb10">订单总量：<span class="num">128</span></p>
      <p>订单总量：<span class="num">128</span></p> -->
    </div>
    <a v-link="{ path: '/staff/preorders/deliver?time=morning' }" type="button" class="btn btn-defalute btn-round">
      查看详情
    </a>
  </div>
  <div class="m-card pb20 mt20">
    <p class="time f16">
      <i class="iconfont">&#xe605;</i>
      <span>下午配送</span>
    </p>
    <div class="content">
      <!-- <p class="pb10">订单总量：<span class="num">128</span></p>
      <p>订单总量：<span class="num">128</span></p> -->
    </div>
    <a v-link="{ path: '/staff/preorders/deliver?time=afternoon' }" type="button" class="btn btn-defalute btn-round">
      查看详情
    </a>
  </div>
  <a v-link="{ path: '/staff/orders' }" class="list-link mt20">查看所有配送商户 <i class="iconfont">&#xe603;</i></a>
</template>

<script>
  export default {
    name: 'Home',

    data: function () {
      return {
        staff: {}
      }
    },

    ready: function () {
      var self = this
      this.$http.get('/staffs/info').then(
        function (data) {
          // 成功获取
          self.staff = data.data.data
        },
        function (data) {
          // 获取失败
          window.alert('获取信息失败，请刷新重试')
        }
      )
    }
  }
</script>

<style class="scoped">
  .list-link {
    display: block;
    padding: 1rem;
    background: #fff;
    font-size: 1.4rem;
    color: #5DBB1A;
  }

  .list-link .iconfont {
    float: right;
  }
</style>
