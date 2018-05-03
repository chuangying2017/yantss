<template>
  <!-- <h1>配送员{{staff.name}}</h1>
  <ul>
    <li><a v-link="{ path: '/staffs/' + $route.params.staff_id + '/preorders' }">订单</a></li>
    <li><a v-link="{ path: '/staffs/' + $route.params.staff_id + '/info' }">信息</a></li>
  </ul> -->
  <div class="u-head">
    <div class="pure-g">
      <div class="pure-u-1-5">
        <a v-link="{ path: '/station/staffs/list' }"><i class="iconfont">&#xe628;</i></a>
      </div>
      <div class="pure-u-3-5">
        <h1>配送员信息</h1>
      </div>
      <div class="pure-u-1-5"></div>
    </div>
  </div>
  <!--<div class="m-tabs">-->
  <!--<ul class="clearfix">-->
  <!--&lt;!&ndash;<li><a v-link="{ path: '/station/staffs/' + $route.params.staff_id + '/preorders' }" class="item item1">订单</a>&ndash;&gt;-->
  <!--&lt;!&ndash;</li>&ndash;&gt;-->
  <!--<li><a v-link="{ path: '/station/staffs/' + $route.params.staff_id + '/info' }" class="item item1">个人信息</a></li>-->
  <!--</ul>-->
  <!--</div>-->
  <router-view></router-view>
  <!--<div class="m-footer">-->
  <!--<div class="footer-btn">-->
  <!--<a v-link="{ path: '/station/staffs/' + $route.params.staff_id +  '/edit'}" class="btn btn-round btn-success">编辑配送员</a>-->
  <!--</div>-->
  <!--</div>-->

</template>

<script>
  export default {
    name: 'Staff',

    data: function () {
      return {
        staff: {}
      }
    },

    route: {
      data: function () {
        var self = this
        return this.$http.get('/stations/staffs/' + self.$route.params.staff_id).then(
          function ({data: {data: staff}}) {
            // 成功获取配送员信息
            return {
              staff: staff
            }
          },
          function (data) {
            // 获取信息失败
            window.alert('获取配送员信息失败, 请刷新重试')
          }
        )
      }
    }
  }
</script>

<style>
  .u-head {
    background: #fff;
    font-size: 1.6rem;
    border-bottom: 1px solid #E4E4E4;
  }

  .u-head h1 {
    font-size: bold;
    text-align: center;
    padding: 1rem;
  }

  .u-head a {
    padding: 1rem;
    display: block;
  }

  .u-head a .iconfont {
    font-size: 2rem;
    color: #25AD25;
  }
</style>
