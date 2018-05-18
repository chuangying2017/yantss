<template>
  <div class="m-global-wrap">
    <div class="m-user f-mg-bottom">
      <div class="heading clearfix">
        <a href="javascript:window.history.go(-1)"><i class="iconfont">&#xe628;</i></a>
      </div>
      <div class="body">
        <img :src="user.avatar" alt="" width="70" height="70" class="avatar">
        <h1 class="name">{{ user.nickname }}</h1>
        <!-- <p class="member"><span>V1会员</span></p> -->
        <!--<div class="btn">-->
        <!--<div class="pure-g">-->
        <!--<div class="pure-u-1-2">-->
        <!--<a v-link="{ path: '/userinfo' }">-->
        <!--<i class="iconfont">&#xe623;</i>个人设置-->
        <!--</a>-->
        <!--</div>-->
        <!--<div class="pure-u-1-2">-->
        <!--<a v-link="{ path: '/favs' }">-->
        <!--<i class="iconfont">&#xe618;</i>我的收藏-->
        <!--</a>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
      </div>
    </div>
    <!--<div class="m-user-section f-mg-bottom">-->
    <!--<div class="title">-->
    <!--<span>我的订单</span>-->
    <!--<a v-link="{ path: '/mall/orders?status=' }" class="fr" style="color: #C71A40;"><span>查看全部订单</span><i-->
    <!--class="iconfont">&#xe603;</i></a>-->
    <!--</div>-->
    <!--<div class="content">-->
    <!--<div class="pure-g">-->
    <!--<div class="pure-u-1-3">-->
    <!--<a v-link="{ path: '/mall/orders?status=unpaid' }">-->
    <!--<i class="iconfont">&#xe61e;</i>-->
    <!--<p>待付款</p>-->
    <!--</a>-->
    <!--</div>-->
    <!--<div class="pure-u-1-3">-->
    <!--<a v-link="{ path: '/mall/orders?status=paid' }">-->
    <!--<i class="iconfont">&#xe61d;</i>-->
    <!--<p>待收货</p>-->
    <!--</a>-->
    <!--</div>-->
    <!--<div class="pure-u-1-3">-->
    <!--<a v-link="{ path: '/mall/orders?status=done' }">-->
    <!--<i class="iconfont">&#xe62c;</i>-->
    <!--<p>待评价</p>-->
    <!--</a>-->
    <!--</div>-->
    <!--&lt;!&ndash; <div class="pure-u-1-4">-->
    <!--<a href="">-->
    <!--<i class="iconfont">&#xe60e;</i>-->
    <!--<p>退货/退款</p>-->
    <!--</a>-->
    <!--</div> &ndash;&gt;-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <ul class="m-list-links m-list-section">
      <li>
        <h2 class="title"> 优鲜达</h2>
      </li>
      <li>
        <a v-link="{ path: '/subscribe/orders/list' }">
          <i class="iconfont">&#xe642;</i> 我的奶卡
          <i class="iconfont fr">&#xe603;</i>
        </a>
      </li>
      <li>
        <a v-link="{ path: '/coupons/list/usable' }">
          <i class="iconfont">&#xe630;</i> 我的优惠券
          <i class="iconfont fr">&#xe603;</i>
        </a>
      </li>
      <li>
        <a v-link="{ path: '/coupons/gifts' }">
          <i class="icon-card"></i> 我的优鲜卡
          <i class="iconfont fr">&#xe603;</i>
        </a>
      </li>
       <li>
        <a v-link="{ path: '/subscribe/myaddress/addrlist' }">
          <i class="iconfont">&#xe632;</i> 我的收货地址
          <i class="iconfont fr">&#xe603;</i>
        </a>
      </li>
      <li>
        <a v-link="{ path: '/subscribe/agreement' }">
          <i class="iconfont">&#xe639;</i> 用户使用协议
          <i class="iconfont fr">&#xe603;</i>
        </a>
      </li>
      <!--<li>-->
        <!--<a v-link="{ path: '/coupons/list/usable' }">-->
          <!--<i class="iconfont">&#xe630;</i> 积分商城-->
          <!--<i class="iconfont fr">&#xe603;</i>-->
        <!--</a>-->
      <!--</li>-->
    </ul>
    <!--<ul class="m-list-links m-list-section">
      <li>
        <a v-link="{ path: '/subscribe/agreement' }">
          <i class="iconfont">&#xe639;</i> 用户使用协议
          <i class="iconfont fr">&#xe603;</i>
        </a>
      </li>
    </ul>-->
  </div>
  <div class="placeholder">
    <i class="iconfont">&#xe660;</i>
  </div>
  <nav-foot></nav-foot>
</template>

<script>
  import NavFoot from './../Shared/navfoot.vue'

  export default {
    name: 'User',

    data: function () {
      return {
        user: {}
      }
    },

    components: {
      NavFoot
    },

    route: {
      data: function () {
        return this.$http.get('/users/info').then(
          function (data) {
            // 获取用户数据成功
            return {
              user: data.data.data
            }
          },
          function () {
            // 获取用户数据失败
            window.alert('获取用户数据失败')
          }
        )
      }
    }
  }
</script>

<style scoped>
  .btn {
    display: block;
    font-size: 1.6rem;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    border: 1px solid #fff;
    color: #000;
    outline: none;
    cursor: pointer;
    text-align: center;
    background: none;
    height: auto;
    padding: 0;
  }

  .icon-card{
    display: inline-block;
    width: 1.4rem;
    height: 1.4rem;
    background: url('../../../assets/mall-card.png') no-repeat center/contain;
  }

  #yt-mall .m-list-links.m-list-section .title {
    font-size: 1.4rem;
  }

  #yt-mall .m-list-links a {
    font-size: 1.4rem;
  }

  #yt-mall .m-list-links a .iconfont {
    font-size: 1.4rem;
  }

  #yt-mall .m-user {
    background-image: url('http://yt.cdn.weazm.com/blur-images-8626602.jpg?imageView2/2/w/600');
    background-size: cover;
    background-position: 50% 50%;
    padding-bottom: 2rem;
  }

  .placeholder {
    margin-top: 5rem;
    text-align: center;
  }

  .placeholder .iconfont {
    font-size: 10rem;
    color: #ddd;
  }

  #yt-mall .m-user .name {
    font-size: 1.6rem;
  }
</style>
