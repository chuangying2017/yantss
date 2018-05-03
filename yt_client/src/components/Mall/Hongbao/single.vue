<template>
  <div class="center-box" v-show="qrMask">
    <div class="center-content">
      <div class="coupon-message">
        <h1>你还没有关注公众号哦~</h1>
        <p>长按识别二维码关注优鲜达公众号<br>马上使用优惠券</p>
        <img src="http://yt.cdn.weazm.com/qrcode.jpg">
      </div>
    </div>
  </div>
  <div class="m-hongbao">
    <img src="https://ocie5114k.qnssl.com/image/top_banner.jpg" class="cover">
    <div class="loadingHB" v-show="loadingHB">
      <div class="loader"></div>
      <p>红包加载中</p>
    </div>
    <div class="empty-display" v-show="hongbaoError">
      <empty>
        红包已经过期或者领完啦
      </empty>
    </div>
    <div class="mine" v-if="!loadingHB && !hongbaoError">
      <h1 class="title">恭喜你获取优惠券一张!</h1>
      <p class="info reciever clearfix">
        <img :src="currentReceiver.avatar" class="avatar">
        <span class="name">{{currentReceiver.nickname}}</span>
        <span class="time fr">{{currentReceiver.receive_at}}</span>
      </p>
      <div class="u-coupon">
        <div class="info">
          <div class="pure-g">
            <div class="pure-u-1-4">
              <div class="price">
                <span>{{currentReceiver.ticket.coupon.content.split(currentReceiver.ticket.coupon.content.slice(-1))[0]}}</span>{{currentReceiver.ticket.coupon.content.slice(-1)}}
              </div>
            </div>
            <div class="pure-u-3-4">
              <div class="detail-wrap">
                <div class="detail">
                  <h2 class="name">{{currentReceiver.ticket.coupon.name}}</h2>
                  <p class="des">{{currentReceiver.ticket.coupon.desc}}</p>
                  <p class="des">
                    使用时间: {{currentReceiver.ticket.created_at.split(' ')[0]}} 至
                    {{getPreviousTime(currentReceiver.ticket.end_time.split(' ')[0])}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="friends" v-if="!loadingHB">
      <h3><span>看看朋友手气如何</span></h3>
      <p v-show="!receivers.length" class="empty">还没有人来抢红包哦,分享给朋友吧!</p>
      <ul v-show="receivers.length">
        <li class="item" v-for="receiver in receivers">
          <div class="pure-g">
            <div class="pure-u-1-5">
              <img :src="receiver.avatar" class="avatar">
            </div>
            <div class="pure-u-3-5">
              <p class="info clearfix">
                <span class="name">{{receiver.nickname}}</span>
                <span class="time">{{receiver.receive_at}}</span>
              </p>
              <p class="word">
                以后买牛奶就靠它了!
              </p>
            </div>
            <div class="pure-u-1-5">
              <p class="price">{{receiver.ticket.coupon.content}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="foot-btn">
      <button class="btn" @click.prevent="toUse" :disabled="getWXPublic">
        <span v-show="!getWXPublic">马上订奶</span>
        <span v-show="getWXPublic">正在准备跳转...</span>
      </button>
    </div>
  </div>
</template>

<script>
  import utils from 'src/utils'
  import Loader from './../../Share/loader.vue'
  import Empty from './../../Share/empty.vue'
  import wx from './../../../wx.js'
  import {HOST} from './../../../config'

  export default{
    name: 'Hongbao',

    data: function () {
      return {
        currentReceiver: {
          ticket: {
            coupon: {
              name: '',
              desc: ''
            }
          }
        },
        receivers: [],
        loadingHB: true,
        hongbaoStatus: false,
        hongbaoError: false,
        qrMask: false,
        getWXPublic: false
      }
    },

    components: {
      Loader,
      Empty
    },

    route: {
      data: function () {
        var self = this
        // 获取红包信息
        self.$http.get('/promotions/red-envelopes/' + self.$route.params.hbid).then(
          function (data) {
            var pocket = data.data.data
            var currentReceiver = pocket.current_receiver
            self.receivers = pocket.receivers
            self.hongbaoStatus = pocket.status === '2' || (pocket.dispatch === pocket.total)
            if (!self.hongbaoStatus) {
              // 红包的状态是可以领取的时候
              if (!currentReceiver) {
                // 还没领取, 发送请求
                self.$http.post('/promotions/red-envelopes', {
                  record: self.$route.params.hbid
                }).then(
                  function (data) {
                    if (data.status !== 201) {
                      self.hongbaoError = true
                      self.loadingHB = false
                    } else {
                      // 获取红包数据
                      currentReceiver = data.data.data
                      self.currentReceiver = currentReceiver
                      self.loadingHB = false
                      window.mixpanel.track('领取红包', {
                        first_time: self.receivers.length === 0
                      })
                      window.mixpanel.track('领取优惠券', self.currentReceiver.ticket.coupon)
                      window.mixpanel.people.increment({
                        'get_coupon_time': 1,
                        'get_envelope_time': 1
                      })
                    }
                  },
                  function (data) {
                    window.alert('领取红包失败,请刷新重试')
                  }
                )
              } else {
                // 已经领取,获取相关数据
                self.currentReceiver = currentReceiver
                self.loadingHB = false
              }
            } else {
              // 红包的状态是不可领取的时候
              if (!currentReceiver) {
                // 还没有领取,便不再领取
                self.hongbaoError = true
                self.loadingHB = false
              } else {
                // 已经领取,不影响该次加载
                self.currentReceiver = currentReceiver
                self.loadingHB = false
              }
            }
          },
          function (data) {
            window.alert('获取红包数据失败,请刷新重试')
          }
        )
      }
    },

    methods: {
      getPreviousTime: function (str) {
        return utils.getPreviousTime(str)
      },
      toUse: function () {
        var self = this
        self.getWXPublic = true
        this.$http.get('/users/weixin/subscribe').then(
          function (data) {
            // 获取关注数据
            if (data.data.data.subscribe) {
              self.getWXPublic = false
              self.$route.router.go('/subscribes/orders/create')
            } else {
              self.getWXPublic = false
              self.qrMask = true
            }
          },
          function (data) {
            self.$route.router.go('/subscribes/orders/create')
          }
        )
      }
    },

    ready: function () {
      var dataForWeixin = {
        share_type: 'envelope',
        imgUrl: 'https://ocie5114k.qnssl.com/image/hb2_1020.jpg',
        title: '燕塘优鲜达请您喝燕塘牛奶啦',
        timelineTitle: '燕塘优鲜达请您喝燕塘牛奶啦',
        timelinelink: HOST + '/?#!/hongbao/' + this.$route.params.hbid + '?utm_source=timeline_share_envelope',
        messagelink: HOST + '/?#!/hongbao/' + this.$route.params.hbid + '?utm_source=app_share_envelope',
        desc: '燕塘优鲜达，服务新升级，价格更优惠～'
      }
      wx.init(dataForWeixin)
    }
  }
</script>

<style lang="scss" scoped>
  .m-hongbao {
    width: 100%;
    height: 100%;
    background: #fff;
    .cover {
      width: 100%;
    }
    .mine {
      margin-bottom: 1rem;
      .title {
        font-size: 2rem;
        font-weight: bold;
        text-align: center;
        margin: 1rem 0;
        color: #e20e1c;
      }
      .info.reciever {
        padding: 1rem 2rem 1rem 3rem;
        font-size: 1.4rem;
        color: #808080;
        .avatar {
          float: left;
          width: 5rem;
          border-radius: 100%;
          vertical-align: middle;
          margin-right: 1rem;
        }
        .name {
          font-size: 1.6rem;
          color: #000;
          width: 60px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: inline-block;
          float: left;
          margin: 1.5rem 0;
        }
        .time {
          margin: 1.5rem 0;
        }
      }
    }
    .friends {
      padding: 2rem 2rem 6rem;
      background: #fff;
      h3 {
        position: relative;
        overflow: hidden;
        text-align: center;
        font-size: 1.4rem;
        color: #f76868;
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
            border-top: 1px solid #f76868;
          }
          &:before {
            right: 100%;
          }
          &:after {
            left: 100%;
          }
        }
      }
      .item {
        padding: 1rem 0;
        border-bottom: 1px dotted #ddd;
      }
      .item:last-child {
        border-bottom: 0 none;
      }
      .avatar {
        width: 4rem;
        display: block;
        margin: 0 auto;
        border-radius: 100%;
      }
      .info {
        font-size: 1.2rem;
        .name {
          margin-right: 1rem;
        }
        .time {
          color: #c1c1c1;
        }
      }
      .word {
        font-size: 1.4rem;
        color: #9a9a9a;
      }
      .price {
        font-size: 1.6rem;
        text-align: right;
        line-height: 3.8rem;
        color: #f9a712;
      }
      .empty {
        font-size: 1.4rem;
        color: #ddd;
        text-align: center;
        margin-top: 2rem;
      }
    }
    .foot-btn {
      padding: 1rem;
      border-top: 1px solid #ddd;
      position: fixed;
      bottom: 0;
      width: 100%;
      background: #fff;
      .btn {
        -webkit-appearance: none;
        border: 0 none;
        display: block;
        padding: 1rem;
        background: #f95757;
        color: #fff;
        border-radius: .3rem;
        text-align: center;
        font-size: 1.4rem;
        outline: none;
        &:disabled {
          opacity: .8;
        }
      }
    }
    .empty-display {
      padding: 4rem 0;
    }
    .loadingHB {
      text-align: center;
      margin: 3rem 0;
      color: #8c8c8c;
      font-size: 1.8rem;
      .iconfont {
        color: #f9a712;
        font-size: 6rem;
      }
    }
  }

  .u-coupon {
    box-shadow: 0 0 10px 0 #e0e0e0;
    margin: 0 2rem;
    .info {
      padding: 0 !important;
    }
  }

  .loader {
    display: inline-block;
    font-size: 10px;
    margin: 3rem 0;
    text-indent: -9999em;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background: #8c8c8c;
    background: -moz-linear-gradient(left, #8c8c8c 10%, rgba(255, 255, 255, 0) 42%);
    background: -webkit-linear-gradient(left, #8c8c8c 10%, rgba(255, 255, 255, 0) 42%);
    background: -o-linear-gradient(left, #8c8c8c 10%, rgba(255, 255, 255, 0) 42%);
    background: -ms-linear-gradient(left, #8c8c8c 10%, rgba(255, 255, 255, 0) 42%);
    background: linear-gradient(to right, #8c8c8c 10%, rgba(255, 255, 255, 0) 42%);
    position: relative;
    -webkit-animation: load3 1.4s infinite linear;
    animation: load3 1.4s infinite linear;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }

  .loader:before {
    width: 50%;
    height: 50%;
    background: #8c8c8c;
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
  }

  .loader:after {
    background: #fff;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: '';
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  @-webkit-keyframes load3 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes load3 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
</style>
