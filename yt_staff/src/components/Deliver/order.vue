<template>
  <div class="u-head">
    <div class="pure-g">
      <div class="pure-u-1-5">
        <a href="javascript:history.back()"><i class="iconfont">&#xe628;</i></a>
      </div>
      <div class="pure-u-3-5">
        <h1>客户奶卡</h1>
      </div>
      <div class="pure-u-1-5"></div>
    </div>
  </div>
  <loader v-show="$loadingRouteData"></loader>
  <div class="u-body" v-show="!$loadingRouteData">
    <div class="m-order-list">
      <div class="pure-g" v-for="sku in order.skus">
        <div class="pure-u-1-2">
          <span class="title">{{sku.name}}</span>
        </div>
        <div class="pure-u-1-2">
          <span class="content">剩余{{sku.remain}}{{sku.show_unit}}/日送{{sku.per_day}}{{sku.show_unit}}</span>
        </div>
      </div>
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
      <div class="pure-g">
        <div class="pure-u-1-3">
          <span class="title">配送日期</span>
        </div>
        <div class="pure-u-2-3">
          <div class="content">
            <span>{{order.start_time}}</span>
          </div>
        </div>
      </div>
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
            <span>{{order.name}} / <a :href="'tel:' + order.phone" style="color: #25AD25;">{{order.phone}}</a></span>
          </div>
        </div>
      </div>
      <div class="pure-g">
        <div class="pure-u-2-5">
          <span class="title">当前状态</span>
        </div>
        <div class="pure-u-3-5">
          <div class="content">
            <span v-if="order.status === 'shipping'">正常</span>
            <span v-if="order.status === 'done'">已完成</span>
            <span v-if="order.status === 'cancel'">已取消</span>
          </div>
        </div>
      </div>
    </div>
    <div class="m-order-list" v-show="order.pause_status || tobePaused">
      <div class="pure-g">
        <div class="pure-u-1-3">
          <span class="title">暂停时间</span>
        </div>
        <div class="pure-u-2-3">
          <div class="content">
            <span>{{order.pause_time | '无'}}</span>
          </div>
        </div>
      </div>
      <div class="pure-g">
        <div class="pure-u-1-3">
          <span class="title">开始时间</span>
        </div>
        <div class="pure-u-2-3">
          <div class="content">
            <span>{{order.restart_time | '无'}}</span>
          </div>
        </div>
      </div>
    </div>
    <a href="#" class="ios-btn ios-btn-success" @click.prevent="stopView = true"
       v-if="!order.pause_status">暂停送奶</a>
    <a href="#" class="ios-btn ios-btn-success" @click.prevent="startView = true" v-else>开始送奶</a>
  </div>
  <div class="light-box" v-show="stopView">
    <div class="wrap">
      <div class="content">
        <!--<p class="mb20">请选择暂停送奶的时间</p>-->
        <p class="mb10 tips">1. 暂停送奶时间:</p>
        <date-picker :min="2" :max="90" class="mb20" :date.sync="stopDate" id="date"></date-picker>
        <p class="mb10 tips">2. 开始送奶时间:</p>
        <date-picker :min="2" :max="90" class="mb20" :date.sync="restartDate" id="date"></date-picker>
        <button class="btn btn-success btn-stop" @click.prevent="stop"
                :disabled="!isDateWork || processing">
          <span v-show="!processing">暂停送奶</span>
          <span v-show="processing">正在处理中</span>
        </button>
        <button class="btn btn-defalute btn-stop" @click.prevent="stopView = false">取消</button>
      </div>
    </div>
  </div>
  <div class="light-box" v-show="startView">
    <div class="wrap">
      <div class="content">
        <p class="mb20">请选择开始送奶的时间</p>
        <date-picker :min="2" :max="30" class="mb20" :date.sync="startDate" id="date"></date-picker>
        <button class="btn btn-success btn-stop" @click.prevent="start" :disabled="!startDate || processing">
          <span v-show="!processing">开始送奶</span>
          <span v-show="processing">正在处理中</span>
        </button>
        <a href="#" class="btn btn-defalute btn-stop" @click.prevent="startView = false">取消</a>
      </div>
    </div>
  </div>
</template>

<script>
  import DatePicker from './../Share/datePicker.vue'
  import Loader from './../Share/loader.vue'

  export default{
    name: 'OrderDetail',

    components: {
      DatePicker,
      Loader
    },

    data: function () {
      return {
        order: {},
        stopView: false,
        startView: false,
        stopDate: null,
        restartDate: null,
        startDate: null,
        processing: false
      }
    },

    route: {
      data: function () {
        return this.$http.get('/staffs/preorders/' + this.$route.params.order_id).then(
          function ({data: {data: order}}) {
            return {
              order: order
            }
          },
          function (data) {
            console.log(data)
          }
        )
      }
    },

    methods: {
      stop: function () {
//        var date = new Date()
        var self = this
        self.processing = true
        this.$http.put('/staffs/preorders/' + this.$route.params.order_id + '/pause', {
          pause_time: self.stopDate,
          restart_time: self.restartDate
        }).then(
          function ({data: {data: order}}) {
            self.stopView = false
            self.processing = false
            self.order = order
          },
          function (data) {
            window.alert('操作出错,请刷新重试')
            self.processing = false
            console.log(data)
          }
        )
      },
      start: function () {
//        var date = new Date()
        var self = this
        self.processing = true
        this.$http.put('/staffs/preorders/' + this.$route.params.order_id + '/restart', {
          restart_time: self.startDate
        }).then(
          function ({data: {data: order}}) {
            self.startView = false
            self.processing = false
            self.order = order
          },
          function (data) {
            self.processing = false
            console.log(data)
          }
        )
      }
    },

    computed: {
      isDateWork: function () {
        var startDate = window.Date.parse(this.stopDate)
        var endDate = window.Date.parse(this.restartDate)
        if (startDate < endDate) {
          return true
        } else {
          return false
        }
      },
      tobePaused: function () {
        var today = window.Date.now()
        if (this.order.pause_time) {
          var pauseTime = window.Date.parse(this.order.pause_time)
          if (pauseTime > today) {
            return true
          } else {
            return false
          }
        } else {
          return false
        }
      }
    }
  }
</script>

<style scoped>
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

  .m-order-list {
    margin: 2rem 0;
    padding: 0 1rem;
    background: #fff;
    border-top: 1px solid #E4E4E4;
    border-bottom: 1px solid #E4E4E4;
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
    color: #616161;
  }

  .light-box {
    width: 100%;
    height: 100%;
    display: table;
    background: rgba(0, 0, 0, 0.8);
    top: 0;
    left: 0;
    position: fixed;
    z-index: 10000;
  }

  .light-box .wrap {
    display: table-cell;
    vertical-align: middle;
  }

  .light-box .content {
    width: 80%;
    margin: 0 auto;
    background: #fff;
    border-radius: 3px;
    padding: 2rem;
    font-size: 1.4rem;
  }

  .light-box .content .btn {
    margin: 0 0 1rem;
  }

  input[type=date]#date {
    -webkit-appearance: none;
    width: 100%;
    padding: 1rem;
    border: 1px solid #ddd;
    font-size: 1.6rem;
    height: auto;
    border-radius: 3px;
    height: 45px;
  }

  .btn.btn-defalute.btn-stop {
    width: 100%;
  }

  .ios-btn {
    display: block;
    padding: 1rem;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    background: #fff;
    font-size: 1.4rem;
    color: #25AD25;
    text-align: center;
  }
</style>
