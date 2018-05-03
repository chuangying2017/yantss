<template>
  <div>
    <div class="select-wrap">
      <div class="pure-g">
        <div class="pure-u-1-3">
          <span>请选择状态: </span>
        </div>
        <div class="pure-u-2-3">
          <div class="select-ui">
            <select v-model="selected" @change="change">
              <option selected value="">全部</option>
              <option value="pending">未对账</option>
              <option value="confirm">已对账</option>
              <option value="reject">有异议</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <!--<span>{{ selected }}</span>-->
    <!--</div>-->
    <!--</div>-->
    <loader v-show="$loadingRouteData"></loader>
    <empty v-show="!$loadingRouteData && !statements.length" icon="&#xe64d;">当前表单没有数据</empty>
    <p v-show="!$loadingRouteData && statements.length" class="tips"><i class="iconfont">&#xe663;</i>
      左右滑动表单可以查看所有信息
    </p>
    <div class="u-table" v-show="!$loadingRouteData && statements.length">
      <table class="pure-table pure-table-bordered">
        <thead>
        <tr>
          <th>日期</th>
          <th>状态</th>
          <th>订单总数</th>
          <th>订单总额</th>
          <th>促销费</th>
          <th>客户实付金额</th>
          <th>手续费</th>
          <th>实收金额</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="statement in statements">
          <td>{{statement.invoice_date}}</td>
          <td>
            <span v-if="statement.status === 'pending'">未对账</span>
            <span v-if="statement.status === 'confirm'">已对账</span>
            <span v-if="statement.status === 'reconfirm'">已重新对账</span>
            <span v-if="statement.status === 'reject'">异议</span>
          </td>
          <td>{{statement.total_count}}</td>
          <td>￥{{statement.total_amount}}</td>
          <td>￥{{statement.discount_amount}}</td>
          <td>￥{{statement.pay_amount}}</td>
          <td>￥{{statement.service_amount}}</td>
          <td>￥{{statement.receive_amount}}</td>
          <td>
            <a href="#" v-link="{path:'/station/exchange/statement/' + statement.invoice_no}"
               class="act-link">
              <span v-if="statement.status === 'pending'"><i class="iconfont">&#xe65b;</i> 对账</span>
              <span v-if="statement.status === 'reject'"><i class="iconfont">&#xe65b;</i> 对账</span>
              <span v-if="statement.status === 'confirm'"><i class="iconfont">&#xe65c;</i> 查看</span>
              <span v-if="statement.status === 'reconfirm'"><i class="iconfont">&#xe65c;</i> 查看</span>
            </a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <button class="ios-btn ios-btn-success mb20" @click.prevent="loadmore"
            v-show="currentPage !== totalPages && statements.length"
            :disabled="processing">
      <span v-show="!processing">加载更多</span>
      <span v-show="processing">正在处理中...</span>
    </button>
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
  </div>
</template>
<script>
  import Empty from './../Share/empty.vue'
  import Loader from './../Share/loader.vue'

  export default{
    data () {
      return {
        statements: [],
        years: '',
        status: '',
        selected: '',
        loading: false,
        tipsView: false,
        currentPage: null,
        totalPages: null,
        processing: false
      }
    },

    components: {
      Empty,
      Loader
    },
    methods: {
      change: function () {
        this.$loadingRouteData = true
        var self = this
        this.$http.get('/stations/invoices?status=' + this.selected).then(
          function (data) {
            self.$loadingRouteData = false
            self.statements = data.data.data
          },
          function (data) {
            window.alert('获取数据有误,请刷新重试')
          })
      },
      learnTips: function () {
        window.localStorage.setItem('showTips', 'true')
        this.tipsView = false
      },
      loadmore: function () {
        var self = this
        self.processing = true
        this.$http.get('/stations/invoices/?page=' + (this.currentPage + 1)).then(
          function (data) {
            self.processing = false
            self.statements = self.statements.concat(data.data.data)
            self.currentPage = data.data.meta.pagination.current_page
          },
          function (data) {
            window.alert('加载出错,请重新尝试')
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
        return this.$http.get('/stations/invoices').then(
          function (data) {
            return {
              statements: data.data.data,
              currentPage: data.data.meta.pagination.current_page,
              totalPages: data.data.meta.pagination.total_pages
            }
          },
          function (data) {
            window.alert('加载数据有误, 请刷新重试')
          })
      }
    }
  }
</script>

<style scoped>
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

  .act-link {
    display: block;
    text-align: center;
    background: #fff;
    padding: .5rem;
    color: #25AD25;
    border-radius: 3px;
  }

  .act-link .iconfont {
    color: #25AD25;
  }

  .u-table {
    margin: 1rem;
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

  .transition-bar {
    width: 20px;
    height: 100%;
  }

  .center-box .body {
    text-align: center;
  }

  .center-box .body .iconfont {
    font-size: 10rem;
    color: #009e35;
  }

  .center-box .body p.info {
    color: #6d6d6d;
  }
</style>
