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
  <div class="u-body">
    <div class="m-order-list">
      <div class="pure-g" v-for="sku in order.skus">
        <div class="pure-u-1-2">
          <span class="title">{{sku.name}}</span>
        </div>
        <div class="pure-u-1-2">
          <span class="content">剩余{{sku.remain}}瓶/日送{{sku.quantity}}瓶</span>
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
            <span>{{order.name}} / {{order.phone}}</span>
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
            <span v-else>暂停</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="light-box" v-show="stopView">
    <div class="wrap">
      <div class="content">
        <p class="mb20">请选择暂停送奶的时间</p>
        <date-picker :min="3" :max="30" class="mb20" :date.sync="selectedDate" id="date"></date-picker>
        <a href="#" class="btn btn-success btn-stop" @click.prevent="stop">暂停送奶</a>
        <a href="#" class="btn btn-defalute btn-stop" @click.prevent="stopView = false">取消</a>
      </div>
    </div>
  </div>
  <div class="light-box" v-show="startView">
    <div class="wrap">
      <div class="content">
        <p class="mb20">请选择暂停送奶的时间</p>
        <date-picker :min="3" :max="30" class="mb20" :date.sync="selectedDate" id="date"></date-picker>
        <a href="#" class="btn btn-success btn-stop" @click.prevent="start">开始送奶</a>
        <a href="#" class="btn btn-defalute btn-stop" @click.prevent="startView = false">取消</a>
      </div>
    </div>
  </div>
  <a href="#" class="btn btn-success btn-stop" @click.prevent="stopView = true"
     v-if="!order.pause_status">暂停送奶</a>
  <a href="#" class="btn btn-success btn-stop" @click.prevent="start" v-else>开始送奶</a>
</template>

<script>
  import DatePicker from './../Share/datePicker.vue'

  export default{
    name: 'OrderDetail',

    components: {
      DatePicker
    },

    data: function () {
      return {
        order: {},
        stopView: false,
        selectedDate: null
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
        this.$http.put('/staffs/preorders/' + this.$route.params.order_id + '/pause', {
          pause_time: self.selectedDate,
          restart_time: null
        }).then(
          function ({data: {data: order}}) {
            self.stopView = false
            return {
              order: order
            }
          },
          function (data) {
            console.log(data)
          }
        )
      },
      start: function () {
//        var date = new Date()
        var self = this
        this.$http.put('/staffs/preorders/' + this.$route.params.order_id, {
          restart_time: self.selectedDate
        }).then(
          function ({data: {data: order}}) {
            self.startView = false
            return {
              order: order
            }
          },
          function (data) {
            console.log(data)
          }
        )
      }
    }
  }
</script>

<style scoped>
  .u-head {
    background: #fff;
    font-size: 1.6rem;
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
    font-size: 1.6rem;
    color: green;
  }

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

  .m-order-list .content {
    display: inline-block;
    width: 100%;
    text-align: right;
    color: green;
  }

  .btn-stop {
    margin: 1rem;
    display: block;
    width: auto;
  }

  .light-box {
    width: 100%;
    height: 100%;
    display: table;
    background: rgba(0, 0, 0, 0.8);
    top: 0;
    left: 0;
    position: fixed;
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
</style>
