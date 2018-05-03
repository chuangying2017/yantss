<template>
  <div class="u-head">
    <div class="pure-g">
      <div class="pure-u-1-3">
        <a v-link="{ path: '/station/exchange/month' }"><i class="iconfont">&#xe628;</i></a>
      </div>
      <div class="pure-u-1-3">
        <h1>账单信息</h1>
      </div>
      <div class="pure-u-1-3">
        <a class="error" @click.prevent="showError = true" v-show="statement.status === 'pending'"><i class="iconfont">
          &#xe61c;</i> 有误</a>
      </div>
    </div>
  </div>
  <div class="pd10">
    <div class="select-wrap">
      <div class="pure-g">
        <div class="pure-u-1-4">
          <div class="select-ui">
            <select v-model="order_type" @change="changeType">
              <option selected value="subscribe">线上商城</option>
              <option value="collect">线下收款</option>
            </select>
          </div>
        </div>
        <div class="pure-u-3-4">
          <div class="select-ui">
            <select v-model="selected" @change="changeType">
              <option selected value="">全部配送员</option>
              <option :value="staff.id" v-for="staff in staffs">{{staff.name}}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <p class="tips"><i class="iconfont">&#xe663;</i>
      左右滑动表单可以查看所有信息
    </p>
    <loader v-show="$loadingRouteData"></loader>
    <div class="u-table" v-show="invoices.length !== 0 && !$loadingRouteData">
      <!--<div class="content">-->
      <!--<p class="text">日期: <span>{{statement.year}} - {{statement.month}}</span></p>-->
      <!--</div>-->
      <table class="pure-table pure-table-bordered" v-show="order_type === 'subscribe' ">
        <thead>
        <tr>
          <th>接单日期</th>
          <th>订单号</th>
          <th>姓名</th>
          <th>电话</th>
          <th>地址</th>
          <th>商品详情</th>
          <th>下单时间</th>
          <th>配送状态</th>
          <th>订单总价</th>
          <th>促销费</th>
          <th>实付金额</th>
          <th>手续费</th>
          <th>实收金额</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="invoice in invoices">
          <td>{{invoice.confirm_at}}</td>
          <td>{{invoice.order_no}}</td>
          <td>{{invoice.name}}</td>
          <td>{{invoice.phone}}</td>
          <td>{{invoice.address}}</td>
          <td>
            <span v-for="sku in invoice.detail">{{sku.name}}</span>
          </td>
          <td>{{invoice.order_at}}</td>
          <td>
            <span v-if="invoice.status === 'unpaid'">未支付</span>
            <span v-if="invoice.status === 'shipping'">正常派送</span>
            <span v-if="invoice.status === 'assigning'">待处理</span>
            <span v-if="invoice.status === 'done'">订单结束</span>
          </td>
          <td>￥{{invoice.total_amount}}</td>
          <td>￥{{invoice.discount_amount}}</td>
          <td>￥{{invoice.pay_amount}}</td>
          <td>￥{{invoice.service_amount}}</td>
          <td>￥{{invoice.receive_amount}}</td>
        </tr>
      </table>

      <table class="pure-table pure-table-bordered" v-show="order_type === 'collect' ">
        <thead>
        <tr>
          <th>支付日期</th>
          <th>订单号</th>
          <th>姓名</th>
          <th>电话</th>
          <th>地址</th>
          <th>商品详情</th>
          <th>订单总价</th>
          <th>促销费</th>
          <th>实付金额</th>
          <th>手续费</th>
          <th>实收金额</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="invoice in invoices">
          <td>{{invoice.pay_at}}</td>
          <td>{{invoice.order_no}}</td>
          <td>{{invoice.name}}</td>
          <td>{{invoice.phone}}</td>
          <td>{{invoice.address}}</td>
          <td>{{invoice.detail.name}}</td>
          <td>￥{{invoice.total_amount}}</td>
          <td>￥{{invoice.discount_amount}}</td>
          <td>￥{{invoice.pay_amount}}</td>
          <td>￥{{invoice.service_amount}}</td>
          <td>￥{{invoice.receive_amount}}</td>
        </tr>
      </table>
    </div>
    <div v-show="invoices.length === 0">
    无结果
    </div>
  </div>
  <button class="ios-btn ios-btn-success mb20" @click.prevent="loadmore"
          v-show="currentPage !== totalPages && invoices.length"
          :disabled="processing">
    <span v-show="!processing">加载更多</span>
    <span v-show="processing">正在处理中...</span>
  </button>
  <div class="m-footer">
    <div class="pure-g">
      <div class="pure-u-1-5">
      </div>
      <div class="pure-u-3-5">
        <div class="btn-mg">
          <button type="button" v-show="statement.status === 'pending'" class="btn btn-round btn-success"
                  @click="show()">
            确认对账
          </button>
          <button type="button" v-show="statement.status === 'reject'" class="btn btn-round btn-success"
                  @click="show()">
            再次对账
          </button>
        </div>
      </div>
    </div>
    <button type="button" v-show="statement.status === 'confirm' || statement.status === 'reconfirm'"
            class="btn btn-danger" style="border: 0">已对账
    </button>
    <!--<button type="button" v-show="statement.status === 'reject'" class="btn btn-danger" style="border: 0">账单有异议</button>-->
  </div>
  <div class="m-mask" v-show="willshow">
    <div class="mask-box">
      <p class="title">对账金额:<span class="c-green">￥{{statement.receive_amount}}</span></p>
      <p class="text">活动期间的促销费和手续由公司承担</p>
      <p class="text">确认对账后无法修改对账单</p>
      <div class="left">
        <button type="button" class="btn btn-round btn-success" @click="check(statement.status)"
                v-show="statement.status === 'pending'">确定
        </button>
        <button type="button" class="btn btn-round btn-success" @click="check(statement.status)"
                v-show="statement.status === 'reject'">
          确定
        </button>
      </div>
      <div class="right">
        <button type="button" class="btn btn-round" @click="close()">取消</button>
      </div>
    </div>
  </div>
  <div class="m-mask" v-show="showError">
    <div class="mask-box">
      <p class="title">
        <i class="iconfont">&#xe602;</i> 账单有误
      </p>
      <p class="text">请提供有误的订单信息详情<br>我们将会在后台处理</p>
      <textarea placeholder="请填写详细信息" class="mt20" v-model="memo"></textarea>
      <div class="left">
        <button type="button" class="btn btn-round btn-success" @click="report()">确定</button>
      </div>
      <div class="right">
        <button type="button" class="btn btn-round" @click.prevent="showError = false">取消</button>
      </div>
    </div>
  </div>
  <div class="center-box" v-show="tipsView">
    <div class="center-wrap">
      <div class="center-content">
        <h1>功能更新<span @click.prevent="tipsView = false"><i class="iconfont">&#xe634;</i></span></h1>
        <div class="body">
          <i class="iconfont">&#xe663;</i>
          <p class="info">账单的信息更加完善了, 左右滑动表格查看更多信息</p>
          <button class="btn btn-success mt20" @click.prevent="learnTips">
            <span>我知道了</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Loader from './../Share/loader.vue'

  export default{
    data () {
      return {
        station: '',
        products: [],
        willshow: false,
        date: '',
        total: 0,
        invoices: {},
        currentPage: null,
        totalPages: null,
        processing: false,
        tipsView: false,
        statement: {
          status: 'pending'
        },
        showError: false,
        memo: '',
        staffs: [],
        selected: '',
        loading: false,
        order_type: 'subscribe'
      }
    },
    components: {
      Loader
    },
    methods: {
      show: function () {
        this.willshow = true
      },
      close: function () {
        this.willshow = false
      },
      check: function (statusInfo) {
        var status = 'confirm'
        if (statusInfo === 'reject') {
          status = 'reconfirm'
        }
        console.log(status)
        this.$http.put('/stations/invoices/' + this.$route.params.statement_no, {
          action: status
        }).then(
          function (data) {
            window.alert('对账成功!')
            this.$route.router.go('/station/exchange/month')
          },
          function (data) {
            window.alert('操作失败,请重试')
          })
      },
      report: function () {
        if (!this.memo) {
          window.alert('请填写有误信息')
          return false
        }
        this.$http.put('/stations/invoices/' + this.$route.params.statement_no, {
          action: 'reject',
          memo: this.memo
        }).then(
          function (data) {
            window.alert('操作成功,后台人员将会尽快给你核对!')
            this.$route.router.go('/station/exchange/month')
          },
          function (data) {
            window.alert('操作失败,请重试')
          })
      },
      loadmore: function () {
        var path = 'orders'
        if (this.order_type === 'collect') {
          path = 'collect_' + path
        }

        var self = this
        self.processing = true
        this.$http.get('/stations/invoices/' + this.$route.params.statement_no + '/' + path + '?staff=' + this.selected + '&page=' + (this.currentPage + 1)).then(
          function (data) {
            self.processing = false
            self.invoices = self.invoices.concat(data.data.data)
            self.currentPage = data.data.meta.pagination.current_page
          },
          function (data) {
            window.alert('加载出错,请重新尝试')
          }
        )
      },
      learnTips: function () {
        window.localStorage.setItem('showTips', 'true')
        this.tipsView = false
      },
      change: function () {
        var self = this
        self.$loadingRouteData = true
        this.$http.get('/stations/invoices/' + this.$route.params.statement_no + '/orders?staff=' + this.selected
        ).then(
          function ({data: invoices}) {
            self.invoices = invoices.data
            self.currentPage = invoices.meta.pagination.current_page
            self.totalPages = invoices.meta.pagination.total_pages
            self.$loadingRouteData = false
          },
          function (data) {
            window.alert('获取数据出错,请重试')
          }
        )
      },
      changeType: function () {
        if (this.order_type === 'collect') {
          this.loadCollectOrders()
        } else {
          this.change()
        }
      },
      loadCollectOrders: function () {
        var self = this
        self.$loadingRouteData = true
        var query = ''
        if (this.selected) {
          query = 'staff=' + this.selected
        }
        this.$http.get('/stations/invoices/' + this.$route.params.statement_no + '/collect_orders?' + query
        ).then(
          function ({data: invoices}) {
            self.invoices = invoices.data
            self.currentPage = invoices.meta.pagination.current_page
            self.totalPages = invoices.meta.pagination.total_pages
            self.$loadingRouteData = false
          },
          function (data) {
            window.alert('获取数据出错,请重试')
          }
        )
      }
    },
    route: {
      activate: function () {
        if (!window.localStorage.getItem('showTips')) {
          this.tipsView = true
        }
      },
      data: function () {
        this.store = window.localStorage.getItem('store')
        return Promise.all([
          this.$http.get('/stations/invoices/' + this.$route.params.statement_no + '/orders'),
          this.$http.get('/stations/invoices/' + this.$route.params.statement_no),
          this.$http.get('/stations/staffs?all=1')
        ]).then(
          function ([
            {data: invoices},
            {data: {data: statement}},
            {data: {data: staffs}}
          ]) {
            return {
              invoices: invoices.data,
              currentPage: invoices.meta.pagination.current_page,
              totalPages: invoices.meta.pagination.total_pages,
              statement: statement,
              staffs: staffs
            }
          }
        )
      }
    }
  }
</script>
<style scoped>
  .mask-box {
    border-radius: 5px;
  }

  .mask-box .left, .mask-box .right {
    float: left;
    width: 50%;
    padding: 20px 5px 0;
  }

  .head-nav {
    width: 100%;
    height: 44px;
    background: #00A739;
    color: #fff;
  }

  .table .title {
    width: 100%;
    height: auto;
    padding: 10px 0;
    font-size: 18px;
    border-bottom: 2px solid #EAEAEA;
    text-align: center;
  }

  .table .content {
    width: 100%;
    height: auto;
    padding: 5px 0;
  }

  .table .content .text {
    font-size: 16px;
    padding: 0 10px;
    color: #00A739;
  }

  .back {
    width: 100%;
    height: 44px;
    display: block;
    color: #fff;
    font-size: 1.8rem;
    text-align: left;
    margin-left: 10px;
    line-height: 44px;
    border: none;
  }

  .back .iconfont {
    font-size: 25px;
    margin-right: 5px;
  }

  .head-nav .item {
    color: #fff;
  }

  .sum {
    width: 100%;
    height: auto;
    font-size: 16px;
    padding: 10px;
  }

  .u-table {
    margin: 1rem 0;
    font-size: 1.4rem;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
  }

  .u-table table {
    background: #fff;
    text-align: center;
    table-layout: fixed;
  }

  .u-table thead th {
    text-align: center;
  }

  .u-table th, .u-table td {
    min-width: 120px;
  }

  p.tips {
    font-size: 1.2rem;
    margin: 0 1rem;
    text-align: right;
    color: #989898;
  }

  .btn-mg {
    padding: 0 1rem;
  }

  a.error {
    color: #ff6969;
    text-align: right;
    font-size: 1.4rem;
    line-height: 2.4rem;
  }

  a.error .iconfont {
    color: #f95151;
    font-size: 1.6rem;
  }

  .mask-box .iconfont {
    color: #f95151;
    font-size: 2.4rem;
  }

  .mask-box textarea {
    height: 10rem;
    border: 1px solid #b3b3b3;
    border-radius: 5px;
  }

  .select-wrap {
    font-size: 1.4rem;
    padding: 1rem 1rem;
  }

  .select-wrap span {
    display: block;
    padding: .5rem 0;
    text-align: center;
  }

  .select-wrap select {
    border: 1px solid #bbb;
    width: 100%;
    padding: .6rem;
    font-size: 1.4rem;
    background: #fff;
    outline: none;
    -webkit-appearance: none;
  }

  .select-ui {
    position: relative;
  }

  .select-ui:after {
    content: '';
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 8px solid #bbb;
    position: absolute;
    right: 1rem;
    top: 1.2rem;
  }
</style>

