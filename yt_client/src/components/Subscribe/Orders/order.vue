<template>
  <Modal v-if="isShowModal && shouldShowModal" :detail="groupDetail" v-on:close="isShowModal = false"></Modal>
  <Trackr :order="trackrOrder" :openid="getUser.providers.weixin.openid" v-show="trackrShow"></Trackr>
  <!--<div class="center-box" v-show="bonusShow">-->
  <!--<div class="center-content">-->
  <!--<div class="bonus-tickets">-->
  <!--<span class="close" @click.prevent="bonusShow = false"><i class="iconfont">&#xe634;</i></span>-->
  <!--<img src="http://yt.cdn.weazm.com//client/photo.jpg">-->
  <!--<h2 class="title">恭喜你获得<br><span v-for="ticket in order.tickets">{{ticket.coupon.name}}券</span><br></h2>-->
  <!--<a v-link="{ path: '/coupons/list/usable' }" class="u-btn u-btn-primary">点击查看</a>-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
  <div class="center-box" v-show="hbShow">
    <div :class="['share-info', shareShow ? 'show' : '']">
      <p><i class="iconfont wechat">&#xe617;</i> 点击右上角的按钮,分享红包给好友</p>
    </div>
    <div class="center-content">
      <div class="bonus-tickets red-pocket">
        <span class="close" @click.prevent="hbShow = false"><i class="iconfont">&#xe634;</i></span>
        <img src="https://ocie5114k.qnssl.com/pocket.jpg">
        <h2 class="title">恭喜您获得了一个红包<br><span>您的红包已悄悄塞到账户中<br>把红包分享出去<br>让更多好友一起收获健康</span></h2>
        <a class="u-btn u-btn-primary" @click.prevent="shareShow = !shareShow">发红包</a>
      </div>
    </div>
  </div>
  <div class="m-head m-head-info f-border-bottom f-mg-bottom">
    <div class="pure-g">
      <div class="pure-u-1-3 tl">
        <a v-link="{ path: '/subscribe/orders/list' }"><i class="iconfont">&#xe628;</i></a>
      </div>
      <div class="pure-u-1-3">
        <h1 class="title" style="color: #000;font-size: 1.4rem;">
          我的奶卡
        </h1>
      </div>
      <div class="pure-u-1-3 tr hb-icon">
        <a @click.prevent="hbInit" v-show="hbIconShow"><span class="info">派红包</span><span class="tossing"><i
          class="iconfont">&#xe66c;</i></span></a>
      </div>
    </div>
  </div>
  <div class="center-box" v-show="cancelView">
    <div class="center-content">
      <div class="cancel-box">
        <h2>取消订单 <span @click.prevent="cancelView = false"><i class="iconfont">&#xe634;</i></span></h2>
        <form v-form name="cancelForm" @submit.prevent="cancelOrder">
          <textarea name="memo" cols="30" rows="5" placeholder="请输入订单取消理由" v-model="memo" v-form-ctrl
                    required></textarea>
          <p class="item-info">* 微信退款时间为1-3天</p>
          <button type="submit" class="u-btn u-btn-primary" :disabled="cancelForm.$invalid || cancelProcess">
            <span v-show="!cancelProcess">确认取消</span>
            <span v-show="cancelProcess">正在处理中...</span>
          </button>
        </form>
      </div>
    </div>
  </div>
  <loader v-show="$loadingRouteData"></loader>
  <div v-show="!$loadingRouteData">
    <div class="m-order-list">
      <div class="pure-g" v-for="sku in order.skus">
        <div class="pure-u-1-2">
          <span class="title">{{sku.name|filtproductit}}</span>
        </div>
        <div class="pure-u-1-2">
          <span class="content">共{{sku.total}}瓶/<i style="font-style: normal;" v-if="order.status === 'shipping'">剩{{sku.remain}}瓶/</i>日送{{sku.per_day}}瓶</span>
        </div>
      </div>
      <div class="pure-g">
        <div class="pure-u-1-2">
          <span class="title">预计配送开始时间</span>
        </div>
        <div class="pure-u-1-2">
          <span class="content">{{order.start_time}}</span>
        </div>
      </div>
    </div>
    <div class="m-order-list">
      <div class="pure-g">
        <div class="pure-u-1-3">
          <span class="title">配送时间</span>
        </div>
        <div class="pure-u-2-3">
          <div class="content">
            <span v-if="order.weekday_type === 'all'">周一到周日</span>
            <span v-else>周一到周五</span> /
            <span v-if="order.daytime === 1">上午</span>
            <span v-else>下午</span>
          </div>
        </div>
      </div>
      <!--<div class="pure-g">-->
      <!--<div class="pure-u-1-3">-->
      <!--<span class="title">配送日期</span>-->
      <!--</div>-->
      <!--<div class="pure-u-2-3">-->
      <!--<div class="content">-->
      <!--<span>{{order.start_time}}</span>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <div class="pure-g">
        <div class="pure-u-1-3">
          <span class="title">配送区域</span>
        </div>
        <div class="pure-u-2-3">
          <div class="content">
            <span>{{order.address}}</span>
          </div>
        </div>
      </div>
      <div class="pure-g">
        <div class="pure-u-2-5">
          <span class="title">配送客户</span>
        </div>
        <div class="pure-u-3-5">
          <div class="content">
            <span>{{order.name}} / {{order.phone}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="m-order-list">
      <div class="pure-g">
        <div class="pure-u-2-5">
          <span class="title">订单号</span>
        </div>
        <div class="pure-u-3-5">
          <div class="content">
            <span>{{order.order.order_no}}</span>
          </div>
        </div>
      </div>
      <div class="pure-g">
        <div class="pure-u-2-5">
          <span class="title">订单金额</span>
        </div>
        <div class="pure-u-3-5">
          <div class="content">
            <span>{{order.order.total_amount}}元</span>
          </div>
        </div>
      </div>
      <div class="pure-g" v-show="order.order.discount_amount !== '0.00'">
        <div class="pure-u-2-5">
          <span class="title">优惠金额</span>
        </div>
        <div class="pure-u-3-5">
          <div class="content">
            <span>{{order.order.discount_amount}}元</span>
          </div>
        </div>
      </div>
      <div class="pure-g" v-show="order.order.discount_amount !== '0.00'">
        <div class="pure-u-2-5">
          <span class="title">实付金额</span>
        </div>
        <div class="pure-u-3-5">
          <div class="content">
            <span>{{order.order.pay_amount}}元</span>
          </div>
        </div>
      </div>
      <div class="pure-g">
        <div class="pure-u-2-5">
          <span class="title">订单状态</span>
        </div>
        <div class="pure-u-3-5">
          <div class="content">
            <p v-if="order.order.refund_status === 'none'">
              <span v-if="order.status === 'unpaid'">未支付</span>
              <span v-if="order.status === 'shipping'">正常派送</span>
              <span v-if="order.status === 'assigning'">待处理</span>
              <span v-if="order.status === 'done'">订单结束</span>
              <span v-if="order.status === 'cancel'">订单取消</span>
            </p>
            <p v-else>
              <span v-if="order.order.refund_status === 'apply'">退款申请</span>
              <span v-if="order.order.refund_status === 'reject'">退款被拒</span>
              <span v-if="order.order.refund_status === 'approve'">审核通过</span>
              <span v-if="order.order.refund_status === 'shipping'">退货中</span>
              <span v-if="order.order.refund_status === 'shipped'">已退货</span>
              <span v-if="order.order.refund_status === 'refunding'">退款中</span>
              <span v-if="order.order.refund_status === 'done'">退款成功</span>
              <span v-if="order.order.refund_status === 'fail'">退款失败</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <button href="#" class="ios-btn ios-btn-success mt20" @click.prevent="payOrder"
            v-show="order.status === 'unpaid'" :disabled="payProcess">
      <span v-show="!payProcess">马上支付</span>
      <span v-show="payProcess">正在处理中...</span>
    </button>
    <a href="#" class="ios-btn ios-btn-danger mb20" @click.prevent="cancelView = true"
       v-show="order.status === 'assigning' || order.status === 'unpaid'">取消订单</a>
    <p class="item-info" v-show="order.status === 'assigning'">* 订单取消功能仅限未派送订单,取消订单需审核</a>
    <ul v-show="order.order.refund_status === 'none' && order.status !== 'unpaid' && order.status !== 'cancel'">
      <!--<li v-show="order.status !== 'assigning'"><a-->
      <!--v-link="{ path: '/subscribe/orders/' + $route.params.order_no + '/exchanges' }" class="list-link">送奶记录 <i-->
      <!--class="iconfont">&#xe603;</i></a></li>-->
      <li v-show="order.status !== 'assigning'"><a
        v-link="{ path: '/subscribe/orders/' + $route.params.order_no + '/station' }" class="list-link">服务点信息 <i
        class="iconfont">&#xe603;</i></a></li>
      <!--<li><a v-link="{ path: '/subscribe/orders/' + $route.params.order_no + '/details' }" class="list-link">订单信息 <i-->
      <!--class="iconfont">&#xe603;</i></a></li>-->
    </ul>
  </div>
  <div class="notice">
    <ul>
      <li>瓶奶剩余数量以实际配送为准，如有异议可联系公众号客服与服务部或致电公司服务热线。</li>
    </ul>
  </div>
  <div class="pt50"></div>
  <div class="m-fixed-nav" v-show="order.order.refund_status === 'none' && order.status !== 'unpaid' && order.status !== 'cancel' && !$loadingRouteData">
    <div class="pure-g">
      <div class="pure-u-1-1">
        <button class="u-nav-btn u-btn-primary" @click.prevent="createNewOrder()">
          <span>一键续订</span>
        </button>
      </div>
    </div>
  </div>
  <div class="center-box" v-show="campaignProcess || testApiProcess || newOrderProcess">
    <div class="center-content">
      <loader></loader>
    </div>
  </div>
  <!--<a v-show="order.status === 'assigning'" v-link="{ path: '/subscribe/orders/' + $route.params.order_no + '/delete' }">取消订单</a>-->
</template>

<script>
  import Loader from './../../Share/loader.vue'
  import Trackr from './modules/trackr.vue'
  import Modal from 'src/components/Mall/GroupPurchase/event_modal'
  import {HOST} from './../../../config'
  import wx from './../../../wx.js'
  import campaignService from './../../../wilddog/campaignService'
  import memberService from './../../../wilddog/memberService'
  import staffService from './../../../wilddog/staffService'
  import {cleCart} from './../../../vuex/actions'
  import _ from 'underscore'

  export default {
    name: 'Order',
    data: function () {
      return {
        order: {
          order: {
            refund_status: 'none'
          }
        },
        cancelView: false,
        memo: '',
        cancelForm: '',
        cancelProcess: false,
        payProcess: false,
        trackrShow: false,
        trackrOrder: {},
        bonusShow: false,
        shareShow: false,
        hbShow: false,
        hbId: null,
        shareInit: false,
        testApiProcess: false,
        hbIconShow: false,
        newOrderProcess: false,
        isShowModal: true//控制modal显示
      }
    },
    vuex: {
      actions: {
        cleCart: cleCart
      },
      getters: {
        getUser: function (state) {
          return state.user.info
        }
      }
    },
    components: {
      Loader,
      Trackr,
      Modal
    },
    computed: {
      shouldShowModal(){//是否显示团购活动弹窗
        return false //团购活动已结束，不再显示弹窗
        if(this.order && this.order.hasOwnProperty('residence_id') && !isNaN(parseInt(this.order.residence_id, 10))){
          return true
        }
        return false
      },
      groupDetail(){
        if(!this.shouldShowModal) return null
        const { residence_id, residence } = this.order
        return { residence_id, residence }
      }
    },
    route: {
      activate: function () {
        if (this.$route.query.trackr === 'true') {
          if (window.localStorage.getItem('trackOrder')) {
            this.trackrOrder = JSON.parse(window.localStorage.getItem('trackOrder'))
            this.trackrShow = true
          }
        }
      },
      data: function () {
        var self = this
        return this.$http.get('/subscribe/preorders/' + this.$route.params.order_no).then(
          function ({data: {data: order}}) {
            if (order.redEnvelope) {
              if (order.redEnvelope.status !== '2') {
                self.hbIconShow = true
              }
            }
            self.order = order
            self.trackFirstTime()
            return {
              order: order
            }
          },
          function (data) {
            window.alert('获取数据有误')
            console.log(data)
          }
        )
      }
    },
    methods: {
      payOrder: function () {
        var self = this
        self.payProcess = true
        this.$http.post('/subscribe/orders/' + this.order.order.order_no + '/checkout', {
          channel: 'wx_pub'
        }).then(
          function (charge) {
//            var orderInfo = charge.data.data
            window.pingpp.createPayment(charge.data.data, function (result, error) {
              self.payProcess = false
              if (result === 'success') {
                // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的 wap 支付结果都是在 extra 中对应的 URL 跳转。
                self.cleCart()
                window.localStorage.setItem('trackOrder', JSON.stringify(self.order))
                self.checkStatus(self.order)
              } else if (result === 'fail') {
                // charge 不正确或者微信公众账号支付失败时会在此处返回
                self.$route.router.go('/subscribe/orders/list')
              } else if (result === 'cancel') {
                // 微信公众账号支付取消支付
                self.$route.router.go('/subscribe/orders/list')
              }
            })
          },
          function (data) {
            window.alert('获取支付数据失败,请刷新重试')
          }
        )
      },
      cancelOrder: function () {
        var self = this
        if (this.cancelForm.$invalid) {
          window.alert('请填写退款理由')
          return false
        }
        self.cancelProcess = true
        this.$http.delete('/subscribe/orders/' + this.order.order_no, {
          memo: this.memo
        }).then(
          function (data) {
            // 成功
            self.cancelProcess = false
            window.alert('取消订单操作成功')
            self.$route.router.go('/subscribe/orders/list')
          },
          function (data) {
            // 失败
            window.alert('取消订单失败')
            self.cancelProcess = false
            self.cancelView = false
          }
        )
      },
      hbInit: function () {
        this.hbShow = true
        if (!this.shareInit) {
          var dataForWeixin = {
            share_type: 'envelope',
            imgUrl: 'https://ocie5114k.qnssl.com/image/hb2_1020.jpg',
            title: this.getUser.nickname + '请您喝燕塘牛奶啦',
            timelineTitle: this.getUser.nickname + '请您喝燕塘牛奶啦',
            timelinelink: HOST + '/?#!/hongbao/' + this.order.redEnvelope.id + '?utm_source=timeline_share_envelope',
            messagelink: HOST + '/?#!/hongbao/' + this.order.redEnvelope.id + '?utm_source=app_share_envelope',
            desc: '燕塘优鲜达，服务新升级，价格更优惠～'
          }
          wx.init(dataForWeixin)
          this.shareInit = true
        }
      },
      campaignInit: function (fn) {
        /**
         * 拼团逻辑
         * 1. 是否为member
         * 2. 券是否为member绑定的券
         */
        var self = this
        self.campaignProcess = true
        var openId = self.getUser.providers.weixin.openid
        if (self.order.order.promotions.length) {
          var ticketId = self.order.order.promotions[0].ticket_id
        }
        if (ticketId) {
          memberService.getMember(openId).then(
            function (data) {
              if (data) {
                if (data.tickets.hasOwnProperty(ticketId)) {
                  var campaignId = data.tickets[ticketId].campaignId
                  var memberId = self.getUser.providers.weixin.openid
                  campaignService.updateUser(campaignId, memberId, self.getUser, self.order).then(
                    function (data) {
                      self.campaignProcess = false
                      fn()
                    },
                    function (data) {
                      window.alert('存储拼团数据可能有误')
                      self.campaignProcess = false
                      fn()
                    }
                  )
                } else {
                  fn()
                }
              } else {
                self.campaignProcess = false
                fn()
              }
            }
          )
        } else {
          self.campaignProcess = false
          fn()
        }
      },
      staffBonusInit: function () {
        var self = this
        // 判断是否存在 staffId
        if (window.localStorage.getItem('staffId')) {
          // 判断该 staffId 是否存在该客户的 openid
          var staffId = window.localStorage.getItem('staffId')
          var clientInfo = self.getUser
          var clientId = clientInfo.providers.weixin.openid
          staffService.exist(staffId).then(
            // staffId 存在
            function (data) {
              if (data) {
                // 判断 staff 是否推荐过该 client
                staffService.isClientExist(staffId, clientId).then(
                  function (data) {
                    console.log(data)
                    if (data) {
                      // 当该客户已经被推荐过了
                      window.localStorage.removeItem('staffId')
                    } else {
                      // 当该客户没被推荐过了
                      console.log('无推荐')
                      staffService.addNewClient(staffId, clientId, clientInfo, self.order).then(
                        function (data) {
                          // 成功添加记录
                          window.localStorage.removeItem('staffId')
                        },
                        function (data) {
                          // 添加记录失败
                        }
                      )
                    }
                  }
                )
                // staffId 不存在
              } else {
                // 该 staff 是第一次推荐
                staffService.createStaff(staffId).then(
                  function () {
                    staffService.addNewClient(staffId, clientId, clientInfo, self.order).then(
                      function (data) {
                        // 成功添加记录
                        window.localStorage.removeItem('staffId')
                      },
                      function (data) {
                        // 添加记录失败
                      }
                    )
                  },
                  function () {
                    console.log('创建配送员失败')
                  }
                )
              }
            }
          )
        }
      },
      toRedirect: function () {
        this.trackrOrder = JSON.parse(window.localStorage.getItem('trackOrder'))
        this.trackrShow = true
      },
      checkStatus: function (order) {
        var self = this
        self.testApiProcess = true
        var testApi = setInterval(function () {
          self.$http.get('/subscribe/preorders/' + order.order_no).then(
            function (data) {
              if (data.data.data.order.status === 'paid') {
                console.log(123)
                clearInterval(testApi)
                self.order = data.data.data
                self.testApiProcess = false
                if (window.localStorage.getItem('trackOrder')) {
                  if (self.order.redEnvelope !== undefined) {
                    console.log('init')
                    self.campaignInit(self.hbInit)
                  }
                  self.staffBonusInit()
                  window.localStorage.removeItem('trackOrder')
                }
              }
            }
          )
        }, 1000)
      },
      trackFirstTime: function () {
        if (this.$route.query.trackr === 'true') {
          if (window.localStorage.getItem('trackOrder')) {
            if (this.order.redEnvelope !== undefined) {
              console.log('init')
              this.campaignInit(this.hbInit)
            }
            this.staffBonusInit()
            window.localStorage.removeItem('trackOrder')
          }
        }
      },
      createNewOrder: function () {
        var deliverDay = new Date()
        var self = this
        self.newOrderProcess = true
        deliverDay.setDate(deliverDay.getDate() + 3)
        this.fetchAddress().then(
          function (data) {
            var addressId = self.checkAddressId(data)
            var orderData = {
              address_id: addressId,
              daytime: self.order.daytime,
              skus: self.order.skus,
              weekday_type: self.order.weekday_type,
              start_time: deliverDay.toISOString().split('T')[0]
            }
            self.newTempOrder(orderData)
          }
        )
      },
      fetchAddress: function () {
        var self = this
        return new Promise(function (resolve, reject) {
          self.$http.get('/subscribe/address').then(
            function (data) {
              resolve(data)
            },
            function (error) {
              reject(error)
            }
          )
        })
      },
      checkAddressId: function (data) {
        var self = this
        var addresses = data.data.data
        var address = _.find(addresses, function (item) {
          return self.order.address.indexOf(item.detail) !== -1
        })
        return address.id
      },
      newTempOrder: function (orderData) {
        var self = this
        self.$http.post('/subscribe/orders', orderData).then(
          function (data) {
            // 成功，进入充值
            var tempOrder = data.data.data
            self.payNewOrder(tempOrder)
          },
          function (response) {
            var message = '网络出错，请重新下单'
            if( 'message' in response.data ){
              message = JSON.parse(response.data.message)
              if(typeof message == 'Array') {
                message = message.join("\n")
              }
            }
            window.alert(message);
            self.newOrderProcess = false
          }
        )
      },
      payNewOrder: function (tempOrder) {
        var self = this
        console.log(tempOrder)
        this.$http.put('/subscribe/orders/' + tempOrder.temp_order_id + '/confirm', {
          channel: 'wx_pub'
        }).then(
          function (data) {
            var order = data.data.data
            var charge = data.data.meta.charge
            if (charge === 'paid') {
              // charge 已经支付过了
              self.$route.router.go('/subscribe/orders/list')
            } else {
              window.pingpp.createPayment(charge, function (result, error) {
                if (result === 'success') {
                  // 支付成功
                  // 测试后端端口
                  var testApi = setInterval(function () {
                    self.$http.get('/subscribe/preorders/' + order.order_no).then(
                      function (data) {
                        if (data.data.data.order.status === 'paid') {
                          clearInterval(testApi)
                          self.$route.router.go('/subscribe/orders/list')
                        }
                      }
                    )
                  }, 1000)
                  setTimeout(function () {
                    clearInterval(testApi)
                    self.$route.router.go('/subscribe/orders/list')
                  }, 5000)
                } else if (result === 'fail') {
                  // charge 不正确或者微信公众账号支付失败时会在此处返回
                  self.newOrderProcess = false
                  self.$route.router.go('/subscribe/orders/create')
                } else if (result === 'cancel') {
                  // 微信公众账号支付取消支付
                  self.newOrderProcess = false
                  self.$route.router.go('/subscribe/orders/list')
                }
              })
            }
          },
          function (data) {
            console.log(data)
          }
        )
      }
    },
    events: {
      'tracked': function () {
        this.trackrShow = false
//        if (this.order.tickets.length) {
//          this.bonusShow = true
//        }
        if (this.order.redEnvelope !== undefined) {
          this.campaignInit(this.hbInit)
        }
//        this.staffBonusInit()
        window.localStorage.removeItem('trackOrder')
      },
      'closeModal': function(){
        this.isShowModal = false
      }
    }
  }
</script>

<style scoped>
  .m-order-list {
    margin: 1rem;
    padding: 1rem;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 2px;
    font-size: 1.4rem;
  }

  .m-order-list .title {
    display: inline-block;
    width: 100%;
    font-weight: bold;
  }

  .m-order-list .pure-g {
    border-bottom: 1px solid #ddd;
    padding: 1rem 0;
  }

  .m-order-list .pure-g:last-child {
    border-bottom: 0 none;
  }

  .m-order-list .content {
    display: inline-block;
    width: 100%;
    text-align: right;
    color: #C71A40;
  }

  .list-link {
    display: block;
    margin: 1rem;
    padding: 1rem;
    border: 1px solid #C71A40;
    color: #C71A40;
    font-size: 1.4rem;
    border-radius: 3px;
    background: #fff;
  }

  .list-link .iconfont {
    float: right;
  }

  .ios-btn {
    display: block;
    padding: 1rem;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    background: #fff;
    font-size: 1.4rem;
    color: #C71A40;
    text-align: center;
  }

  .ios-btn.ios-btn-danger {
    border: 0 none;
    background: transparent;
    text-decoration: underline;
  }

  .ios-btn + .ios-btn {
    margin-top: 20px;
  }

  button.ios-btn {
    -webkit-appearance: none;
    width: 100%;
    border-left: 0 none;
    border-right: 0 none;
    outline: none;
  }

  button.ios-btn:disabled {
    color: #c5c5c5;
  }

  .item-info {
    color: #bbb;
    font-size: 1.2rem;
    text-align: center;
    margin-top: 1rem;
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

  .cancel-box {
    width: 80%;
    margin: 0 auto;
    padding: 2rem;
    background: #fff;
    border-radius: 3px;
    position: relative;
  }

  .cancel-box textarea {
    border: 1px solid #ddd;
    border-radius: 3px;
  }

  .cancel-box h2 {
    text-align: center;
    font-size: 1.4rem;
    margin-bottom: 2rem;
  }

  .cancel-box h2 .iconfont {
    padding: 1rem;
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  .u-btn.u-btn-primary {
    background: #C71A40;
    color: #fff;
    border-radius: 3px;
    width: 100%;
    margin-top: 2rem;
  }

  .u-btn.u-btn-primary:disabled {
    background: #ddd;
  }

  .bonus-tickets {
    width: 65%;
    margin: 0 auto;
    padding: 3rem;
    background: #fff;
    border-radius: .3rem;
    position: relative;
  }

  .bonus-tickets.red-pocket {
    width: 80%;
    padding: 2rem 3rem;
  }

  .bonus-tickets img {
    width: 100%;
  }

  .bonus-tickets .title {
    font-size: 1.6rem;
    font-weight: bold;
    text-align: center;
    margin: 1rem 0;
    color: #C71A40;
  }

  .bonus-tickets .title span {
    font-size: 1.4rem;
    color: #b1b1b1;
    font-weight: normal;
    margin-top: 1rem;
    display: inline-block;
  }

  .bonus-tickets .u-btn {
    display: block;
    width: 100%;
  }

  .bonus-tickets .close {
    display: inline-block;
    position: absolute;
    padding: 1rem;
    right: 0;
    top: 0;
  }

  .share-info {
    position: absolute;
    box-sizing: border-box;
    width: 100%;
    transition: .3s all ease;
    transform: translateY(-100%);
  }

  .share-info.show {
    transform: translateY(0);
  }

  .share-info p {
    margin: 2rem 1rem 1rem;
    padding: 1rem;
    background: #fff;
    border-radius: .3rem;
    font-size: 1.4rem;
    position: relative;
  }

  .share-info p .wechat {
    color: #57d257;
    font-size: 2rem;
    vertical-align: middle;
  }

  .share-info p:before {
    content: '';
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 8px solid #fff;
    position: absolute;
    right: 16px;
    top: -6px;
  }

  .notice {
    font-size: 1.2rem;
    margin: 1rem 1rem;
    padding: 1rem 1rem;
    color: #fff;
    background: #bfbfbf;
  }

  .notice ul {
    list-style-type: circle;
    padding-left: 2rem;
  }

  .hb-icon .iconfont {
    color: red;
    font-size: 1.8rem;
    -webkit-font-smoothing: antialiased;
  }

  .hb-icon .info {
    color: #F98500;
    font-size: 1.2rem;
  }

  .tossing {
    display: inline-block;
    line-height: 3.6rem;
    animation-name: tossing;
    -webkit-animation-name: tossing;
    animation-duration: 2.5s;
    -webkit-animation-duration: 2.5s;
    animation-iteration-count: infinite;
    -webkit-animation-iteration-count: infinite;
  }

  @keyframes tossing {
    0% {
      transform: rotate(-20deg);
    }
    50% {
      transform: rotate(20deg);
    }
    100% {
      transform: rotate(-20deg);
    }
  }

  @-webkit-keyframes tossing {
    0% {
      -webkit-transform: rotate(-20deg);
    }
    50% {
      -webkit-transform: rotate(20deg);
    }
    100% {
      -webkit-transform: rotate(-20deg);
    }
  }

  .u-nav-btn.u-btn-primary {
    border: 0 none;
    outline: none;
  }
</style>
