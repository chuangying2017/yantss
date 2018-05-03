<template>
  <div class="coupon-activity">
    <div class="m-coupons" :style="'background-color:' + activity.background_color">
      <img :src="activity.cover_image" alt="" class="cover">
      <div class="panel">
        <coupon v-for="coupon in coupons" :coupon="coupon" v-show="!$loadingRouteData"></coupon>
        <loader v-show="$loadingRouteData"></loader>
        <button class="u-btn u-btn-danger" v-show="currentPage < totalPages"
                @click.prevent="loadMore" :disabled="loading">
          <span v-show="!loading">加载更多</span>
          <span v-show="loading">加载中...</span>
        </button>
      </div>
      <div class="coupon-rules" style="padding-bottom: 7rem;">
        <h3><span>使用细则</span></h3>
        <p>
          燕塘优鲜达线上商场满减券（以下简称满减券）是燕塘乳业对广大消费者的一种优惠和回馈，为使更多的消费者享受到这种优惠，特制定燕塘优鲜达线上商城优惠券规则（以下简称"本规则"）。如果您接受并使用满减券，那么您便接受了本规则。</p>
        <ul>
          <li>满减券不能兑换现金</li>
          <li>每张满减券仅能使用一次，不找零，不退换</li>
          <li>使用满减券抵扣部分的金额不开具发票</li>
          <li>满减券应在券面标示或系统显示的有效期内使用，过期作废</li>
          <li>用户同意按照满减券规则使用各类满减券</li>
          <li>按满足满减券使用条件的商品统计，满减券会按比例抵扣在每个符合条件的商品上</li>
          <li>使用满减券的订单，未支付或已支付未配货的订单如果发生订单取消在成功后，系统会在24小时内把满减券退回帐号，有效期不变</li>
          <li>使用满减券的订单为正在配货中后，订单所使用满减券将不再返回用户帐号中，该满减券将不可再使用</li>
          <li>违背优惠券使用规则的处理发生以下情形时，燕塘优鲜达线上商城有权视情况选择冻结或作废相关顾客持有的满减券、取消使用满减券的订单、取消该用户的用券资格、停止提供服务：
            <ul>
              <li>非以个人消费为目的而使用满减券的</li>
              <li>伪造、购买、销售、转让满减券，或使用伪造、购买、转让的满减券的</li>
              <li>违反本规则或优惠券中载明的规则，使用满减券的</li>
            </ul>
          </li>
          <li>本规则由燕塘优鲜达线上商城依据国家相关法律法规及规章制度予以解释</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="center-box" v-show="successMsg">
    <div class="center-content">
      <div class="coupon-message">
        <a @click.prevent="successMsg = false" class="close"><span><i class="iconfont">&#xe634;</i></span></a>
        <h1>恭喜!你已经领到一张优惠券!</h1>
        <p>长按识别二维码关注优鲜达公众号<br>马上使用优惠券</p>
        <img src="http://yt.cdn.weazm.com/qrcode.jpg">
      </div>
    </div>
  </div>
  <div class="center-box" v-show="commingStatus || expiredStatus">
    <div class="center-content">
      <div class="coupon-message">
        <h1>对不起,该活动<span v-show="commingStatus">暂未开始</span><span v-show="expiredStatus">已经结束</span></h1>
        <p>长按识别二维码关注优鲜达公众号<br>了解更多活动信息</p>
        <img src="http://yt.cdn.weazm.com/qrcode.jpg">
      </div>
    </div>
  </div>
  <div class="center-box" v-show="failMsg">
    <div class="center-content">
      <div class="coupon-message">
        <a @click.prevent="failMsg = false" class="close"><span><i class="iconfont">&#xe634;</i></span></a>
        <h1>{{message}}</h1>
        <p>我们即将跳转到您的优惠券列表</p>
        <p>长按识别二维码关注优鲜达公众号<br>马上使用优惠券</p>
        <img src="http://yt.cdn.weazm.com/qrcode.jpg">
      </div>
    </div>
  </div>
  <!--<nav-foot></nav-foot>-->
</template>

<script>
  import Coupon from './coupon.vue'
  import Loader from './../../Share/loader.vue'
  import NavFoot from './../../Mall/Shared/navfoot.vue'
  import wx from './../../../wx.js'
  import {HOST} from './../../../config'

  export default{
    name: 'Activity',

    components: {
      Coupon,
      Loader,
      NavFoot
    },

    data: function () {
      return {
        getProcess: false,
        getSuccess: false,
        coupons: [],
        totalPages: 1,
        currentPage: 1,
        loading: false,
        successMsg: false,
        failMsg: false,
        activity: {},
        commingStatus: false,
        expiredStatus: false,
        message: ''
      }
    },

    methods: {
      loadMore: function () {
        var self = this
        self.loading = true
        this.$http.get('/promotions/coupons?&page=' + (this.currentPage + 1)).then(
          function (data) {
            self.coupons = self.coupons.concat(data.data.data)
            self.totalPages = data.data.meta.pagination.total_pages
            self.currentPage = data.data.meta.pagination.current_page
            self.loading = false
          },
          function (data) {
            window.alert('加载失败,请重新尝试')
          }
        )
      },
      shareInit: function (activity) {
        console.log(activity)
        var dataForWeixin = {}
        if (activity.can_share) {
          var imgUrl = activity.share_image
          var title = activity.share_friend_title
          var timelineTitle = activity.share_moment_title
          var desc = activity.share_desc
          dataForWeixin = {
            share_type: 'coupon',
            imgUrl: imgUrl,
            title: title,
            timelineTitle: timelineTitle,
            timelinelink: HOST + '/?#!/coupons/activity?utm_source=timeline_share_coupon',
            messagelink: HOST + '/?#!/coupons/activity?utm_source=app_share_coupon',
            desc: desc
          }
        } else {
          dataForWeixin = {
            share_type: 'coupon',
            imgUrl: 'http://yt.cdn.weazm.com/mpwechat/WechatIMG8.jpeg',
            title: '燕塘优鲜达线上商城',
            timelineTitle: '更多服务,尽在燕塘优鲜达',
            timelinelink: HOST + '/?#!/mall/home?utm_source=timeline_share',
            messagelink: HOST + '/?#!/mall/home?utm_source=app_share',
            desc: '更多服务,尽在燕塘优鲜达'
          }
        }
        wx.init(dataForWeixin)
      },
      activityInit: function (activity) {
        if (activity.status !== 'ok') {
          // 3 status: 'ok' & 'comming' & 'expired'
          if (activity.status === 'coming') {
            this.commingStatus = true
          } else {
            this.expiredStatus = true
          }
        }
      }
    },

    route: {
      activate: function () {
        if (this.$route.query.staffId) {
          window.localStorage.setItem('staffId', this.$route.query.staffId)
        }
      },
      data: function () {
        return this.$http.get('/promotions/activities/' + this.$route.params.activityId).then(
          function ({data: {data: activity}}) {
            this.shareInit(activity)
            this.activityInit(activity)
            return {
              activity: activity,
              coupons: activity.coupons
            }
          },
          function (data) {
            console.log(JSON.stringify(data))
          }
        )
      },
      deactivate: function () {
        var dataForWeixin = {
          imgUrl: 'https://ocie5114k.qnssl.com/image/logo_1027.jpg',
          title: '燕塘优鲜达线上商城',
          timelineTitle: '更多服务,尽在燕塘优鲜达',
          timelinelink: HOST + '/?#!/mall/home?utm_source=timeline_share',
          messagelink: HOST + '/?#!/mall/home?utm_source=app_share',
          desc: '更多服务,尽在燕塘优鲜达'
        }
        wx.setup(dataForWeixin)
      }
    },

    events: {
      'getSuccess': function () {
        this.successMsg = true
      },
      'getFail': function (message) {
        this.message = message
        // console.log(data.data.message)
        // console.log(JSON.stringify(data))
        this.failMsg = true
      }
    }
  }
</script>

<style lang="scss">
  $light: #fff;
  $dark: #8c8c8c;

  /*.m-coupons.activity {*/
  /*background: #ffa63e;*/
  /*}*/

  .coupon-rules {
    padding: 0 2rem;
    font-size: 1.2rem;
    // color: #fff;
    color: #404040;

    &.dark {
      color: $dark;
      h3 {
        color: $dark;
        span {
          &:before,
          &:after {
            border-top: 1px solid $dark;
          }
        }
      }
    }

    h3 {
      position: relative;
      overflow: hidden;
      text-align: center;
      font-size: 1.4rem;
      // color: #fff;
      color: #404040;
      margin-bottom: 1rem;

      span {
        display: inline-block;
        vertical-align: baseline;
        zoom: 1;
        *display: inline;
        *vertical-align: auto;
        position: relative;
        padding: 0 20px;

        &:before,
        &:after {
          content: '';
          display: block;
          width: 1000px;
          position: absolute;
          top: 0.70em;
          border-top: 1px solid #404040;
          // border-top: 1px solid white;
        }

        &:before {
          right: 100%;
        }
        &:after {
          left: 100%;
        }
      }
    }
    & > ul {
      list-style-type: decimal;
      padding-left: 2rem;
      line-height: 180%;

      li > ul {
        list-style-type: circle;
        padding-left: 2rem;
      }

    }
  }

  .m-coupons .cover {
    width: 100%;
    height: auto;
  }

  .m-coupons .panel {
    width: 90%;
    margin: 2rem auto;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
  }

  .m-coupons .title {
    font-size: 2rem;
    text-align: center;
    color: #C71A40;
  }

  .u-coupon {
    background: #fff;
    border-radius: 3px;
    overflow: hidden;
    &.s-expired {
      .info {
        .price {
          color: #d2d2d2;
        }
      }
      .detail {
        color: #d2d2d2;
        .des {
          color: #d2d2d2 !important;
        }
      }
      .expired {
        p {
          background: #d2d2d2;
        }
      }
    }
    &.s-get {
      .info .price {
        background: #ff8080;
        color: #fff;
        border: 0 none;
        padding: 2rem 0;
        display: block;
        outline: none;
        width: 100%;
        height: 100%;
      }
      .j-get.s-success span {
        color: #fff;
        background: #ff8080;
      }
      .j-get span {
        border: 1px solid #fff;
        border-radius: 3px;
        padding: .1rem .3rem;
        font-size: 1.2rem !important;
        display: inline-block;
        margin-top: 1rem;
        background: #fff;
        color: #ff8080;
      }
      .expired {
        display: none;
      }
    }
    .info {
      .pure-u-1-4 {
        position: relative;
      }
      .price {
        padding: 3rem 0rem;
        font-size: 1.4rem;
        text-align: center;
        color: #f95757;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        span {
          font-size: 2.6rem;
        }
      }
      .detail-wrap {
        background-image: url('https://dn-weazm-work.qbox.me/coupons/bg.jpg');
        background-size: cover;
        background-position: 50% 50%;
        border-left: 2px dotted #ddd;
        margin: 0;
        padding: 2rem 0;
      }
      .detail {
        padding: 0 1rem;
        .name {
          font-size: 1.6rem;
        }
        .des {
          font-size: 1.2rem;
          color: #8c8c8c;
        }
      }
    }
    .expired {
      p {
        background: #ff8080;
        padding: .2rem;
        color: #fff;
        font-size: 1.2rem;
      }
    }
    & + .u-coupon {
      margin-top: 1rem;
    }
  }

  .coupon-activity {
    width: 100%;
    height: 100%;
  }

  .u-btn {
    &.u-btn-danger {
      background: #c71a40;
      color: #fff;
      border-radius: 3px;
      width: 60%;
      display: block;
      margin: 2rem auto 1rem;
      &:disabled {
        background: #8c8c8c;
        color: #fff;
      }
      .iconfont {
        -webkit-font-smoothing: antialiased;
        font-size: 1.8rem;
      }
    }
  }

  .center-box {
    display: table;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10000;
  }

  .center-content {
    display: table-cell;
    vertical-align: middle;
  }

  .coupon-message {
    width: 80%;
    margin: 0 auto;
    background: #fff;
    padding: 3rem 2rem 2rem;
    border-radius: 3px;
    position: relative;
    h1 {
      font-size: 1.6rem;
      text-align: center;
      font-weight: bold;
      color: #333333;
      border-bottom: 1px solid #ddd;
      padding-bottom: 1rem;
    }
    p {
      font-size: 1.4rem;
      color: #505050;
      margin: 1rem 0;
      text-align: center;
    }
    img {
      width: 100%;
    }
    .close {
      display: block;
      position: absolute;
      padding: 1rem;
      right: 0;
      top: 0;
      color: #000;
    }
  }

  .coupon-activity {
    .detail-wrap {
      border-left: 0 none !important;
    }
  }
</style>
