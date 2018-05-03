<template>
  <div class="pd10">
    <div class="m-media mt10">
      <div class="left">
        <img :src="info.avatar" alt="" class="thumbnail">
        <p class="name">{{ info.nickname }}</p>
        <p class="integral">状态：
          <span v-if="preorder.charge_status === 2">余额不足</span>
          <span v-else>正常</span>
        </p>
      </div>
      <div class="right">
        <div class="content">
          <!-- <p class="wrap">
            <span class="text">剩余瓶数</span>
            <span class="num fr">30瓶</span>
          </p> -->
          <p class="wrap mb20">
            <span class="text">奶卡余额</span>
            <span class="num fr">{{balance}}元</span>
          </p>
          <div class="link fl pr5">
            <a v-link="{ path: '/subscribe/order/' + preorder.order_no + '/weekinfo?weekday=1' }" type="button"
               class="btn btn-round btn-letter">查看送奶信息</a>
          </div>
          <div class="link fr pl5">
            <a v-link="{ path: '/subscribe/order/' + preorder.order_no + '/payrecord' }"
               class="btn btn-round btn-letter">查看充值记录</a>
          </div>
        </div>
      </div>
    </div>
    <div class="m-list mt20">
      <ul class="clearfix">
        <li class="text">
          <a href="tel:86-132466665701">
            联系服务员修改送奶配置
            <i class="iconfont fr">&#xe603;</i>
          </a>
        </li>
      </ul>
    </div>
    <div class="m-footer">
      <ul class="clearfix" style="padding: 0 20px;">
        <!-- <li class="item">
          <button type="button" class="btn btn-round btn-success" @click.prevent="toggleOrder('stop')"
                  :disabled="working">
            <span v-show="!working">暂停配送</span>
            <span v-show="working">正在处理...</span>
          </button>
        </li> -->
        <button type="button" class="btn btn-round btn-success" @click.prevent="toggleCharge">我要充值</button>
        <!-- <li class="item">
        </li> -->
      </ul>
    </div>
  </div>
  <div class="m-mask" v-show="chargeMask">
    <div>
      <charge></charge>
      <a href="#" class="u-mask-close" @click.prevent="toggleCharge"><i class="iconfont">&#xe60a;</i> 关闭</a>
    </div>
  </div>
  <div class="m-mask" v-show="pauseTime">
    <div class="mask-box">
      <p class="icon">
        <i class="iconfont">&#xe609;</i>
      </p>
      <p class="text">当前配送服务已停止</p>
      <p class="text mb10">点击按钮开始配送</p>
      <button type="button" class="btn btn-round btn-success" @click.prevent="toggleOrder('start')" :disabled="working">
        <span v-show="!working">开始配送</span>
        <span v-show="working">正在处理...</span>
      </button>
    </div>
  </div>
</template>

<script>
  import Charge from './../share/charge.vue'

  export default {
    name: 'Order',

    components: {
      Charge
    },

    data: function () {
      return {
        pauseTime: false,
        preorder: {
          order: {
            charge_status: ''
          }
        },
        balance: null,
        info: {},
        chargeMask: false,
        working: false
      }
    },

    route: {
      data: function () {
        return Promise.all([
          this.$http.get('/subscribe/preorders'),
          this.$http.get('/users/info'),
          this.$http.get('/users/wallets/balance')
        ]).then(function ([preorder, info, balance]) {
          var pauseTime = false
          if (preorder.data.data.pause_time == null) {
            pauseTime = false
          } else {
            pauseTime = true
          }
          return {
            preorder: preorder.data.data[0],
            info: info.data.data,
            pauseTime: pauseTime,
            balance: balance.data.data.amount
          }
        })
      }
    },

    methods: {
      toggleOrder: function (act) {
        this.working = true
        var putData = {}
        var today = new Date()
        var year = today.getFullYear()
        var month = today.getMonth() + 1
        var date = today.getDate()
        if (act === 'stop') {
          putData = {
            pause_time: year + '-' + month + '-' + date,
            restart_time: ''
          }
          this.$http.put('/stations/preorders/' + this.$route.params.order_no + '/pause', putData).then(
            function (data) {
              // 成功暂停送奶
              this.pauseTime = !this.pauseTime
              this.working = false
            },
            function (data) {
              // 设置失败
              window.alert('设置失败，请刷新后重新操作')
              this.working = false
            }
          )
        } else {
          date = date + 1
          putData = {
            start_time: year + '-' + month + '-' + date
          }
          this.$http.put('/stations/preorders/' + this.$route.params.order_no, putData).then(
            function (data) {
              // 成功暂停送奶
              this.pauseTime = !this.pauseTime
              this.working = false
            },
            function (data) {
              // 设置失败
              window.alert('设置失败，请刷新后重新操作')
              this.working = false
            }
          )
        }
      },
      toggleCharge: function () {
        this.chargeMask = !this.chargeMask
      }
    },

    events: {
      chargeSuccess: function () {
        this.$route.router.go('/subscribe/order/' + this.$route.params.order_no + '/payrecord')
      }
    }
  }
</script>

<style>
  .u-mask-close {
    margin-top: 3rem;
    display: block;
    width: 100%;
    text-align: center;
    font-size: 1.6rem;
    color: #fff;
  }

  .u-mask-close .iconfont {
    font-size: 1.6rem;
    color: #fff;
  }
</style>
