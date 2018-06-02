<template>
  <div>
    <div class="u-head">
      <div class="pure-g">
        <div class="pure-u-1-5">
          <a href="javascript:history.back()"><i class="iconfont">&#xe628;</i></a>
        </div>
        <div class="pure-u-3-5">
          <h1>订单详情</h1>
        </div>
        <div class="pure-u-1-5"></div>
      </div>
    </div>
    <div class="m-order-list" v-show="!$loadingRouteData">
      <div class="pure-g">
        <div class="pure-u-1-3">
          <span class="title">姓名</span>
        </div>
        <div class="pure-u-2-3">
          <div class="content">
            <span>{{ preorder.name }}</span>
          </div>
        </div>
      </div>
      <div class="pure-g">
        <div class="pure-u-1-3">
          <span class="title">电话</span>
        </div>
        <div class="pure-u-2-3">
          <div class="content">
            <span><a :href="'tel:' + preorder.phone">{{ preorder.phone }}</a></span>
          </div>
        </div>
      </div>
      <div class="pure-g">
        <div class="pure-u-1-3">
          <span class="title">地址</span>
        </div>
        <div class="pure-u-2-3">
          <div class="content">
            <span>{{ preorder.address }}</span>
          </div>
        </div>
      </div>
      <div class="pure-g">
        <div class="pure-u-1-3">
          <span class="title">状态</span>
        </div>
        <div class="pure-u-2-3">
          <div class="content">
            <span>
              <span v-if="preorder.status === 'shipping'">正常</span>
              <!--<span v-if="preorder.charge_status === 2">余额不足</span>-->
            </span>
          </div>
        </div>
      </div>
      <div class="pure-g">
        <div class="pure-u-1-3">
          <span class="title">配送员</span>
        </div>
        <div class="pure-u-2-3">
          <div class="content">
            <span>
              {{preorder.staff.name}} / <a :href="'tel:' + preorder.staff.phone">{{preorder.staff.phone}}</a>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="m-order-list" v-show="!$loadingRouteData">
      <div class="pure-g" v-for="sku in preorder.skus">
        <div class="pure-u-1-2">
          <span class="title">{{sku.name}}</span>
        </div>
        <div class="pure-u-1-2">
          <div class="content">
            <span>共{{sku.total}}{{sku.show_unit}}/剩{{ sku.remain }}{{sku.show_unit}}/日送{{sku.per_day}}{{sku.show_unit}}</span>
          </div>
        </div>
      </div>
      <div class="pure-g">
        <div class="pure-u-1-3">
          <span class="title">起送日期</span>
        </div>
        <div class="pure-u-2-3">
          <div class="content">
            <span>{{preorder.start_time}}</span>
          </div>
        </div>
      </div>
      <div class="pure-g">
        <div class="pure-u-1-3">
          <span class="title">配送周期</span>
        </div>
        <div class="pure-u-2-3">
          <div class="content">
            <span v-if="preorder.weekday_type === 'all'">周一到周日</span>
            <span v-else>周一到周五</span>
          </div>
        </div>
      </div>
      <div class="pure-g">
        <div class="pure-u-1-3">
          <span class="title">配送时间</span>
        </div>
        <div class="pure-u-2-3">
          <div class="content">
            <span v-if="preorder.daytime === 1">上午</span>
            <span v-else>下午</span>
          </div>
        </div>
      </div>
    </div>
    <button class="ios-btn ios-btn-success" @click.prevent="changeView = true" v-show="!$loadingRouteData">
      <span>更换配送员</span>
    </button>
    <div class="center-box" v-show="changeView">
      <div class="center-wrap">
        <div class="center-content">
          <h1>更换配送员<span @click.prevent="changeView = false"><i class="iconfont">&#xe634;</i></span></h1>
          <div class="body">
            <p>请选择一名配送员接受该订单</p>
            <select name="" id="" class="select select-new" v-model="changeSelect">
              <option value="" disabled selected>-- 请选择 --</option>
              <option :value="staff.id" v-for="staff in staffs">{{staff.name}}</option>
            </select>
            <button class="btn btn-success mt20" :disabled="!changeSelect || changeProcess" @click.prevent="change">
              <span v-show="!changeProcess">确定并跟换</span>
              <span v-show="changeProcess">正在处理中...</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <loader v-show="$loadingRouteData"></loader>
  </div>
</template>

<script>
  import Loader from './../Share/loader.vue'

  export default {
    name: 'Preorder',

    data: function () {
      return {
        preorder: {
          staff: {
            name: null,
            phone: null
          }
        },
        changeView: false,
        changeSelect: null,
        changeProcess: false,
        staffs: [
          {
            id: null,
            name: null,
            phone: null
          }
        ]
      }
    },

    components: {
      Loader
    },

    route: {
      data: function () {
        return Promise.all([
          this.$http.get('/stations/preorders/' + this.$route.params.subs_id),
          this.$http.get('/stations/staffs')
        ]).then(
          function ([
            {data: {data: preorder}},
            {data: {data: staffs}}
          ]) {
            return {
              preorder: preorder,
              staffs: staffs
            }
          },
          function () {
            window.alert('获取数据失败,请重试')
          }
        )
      }
    },

    methods: {
      change: function () {
        var self = this
        self.changeProcess = true
        this.$http.post('/stations/preorders/' + this.$route.params.subs_id + '/assign', {
          staff: self.changeSelect
        }).then(
          function () {
            self.changeProcess = false
            window.alert('更换成功')
            self.$route.router.go('/station/subscribes/list')
          },
          function () {
            self.changeProcess = false
            window.alert('更换失败,请重试')
          }
        )
      }
    }
  }
</script>

<style scoped>
  .qrcode img {
    border: 1px solid #ddd;
    display: block;
    margin: 20px auto;
    height: auto;
    width: 40%;
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

  .m-order-list a {
    color: #25AD25;
  }

  .user-list a {
    font-size: 1.4rem;
    padding: 1rem;
    color: #25AD25;
    background: #fff;
    border-top: 1px solid #E4E4E4;
    border-bottom: 1px solid #E4E4E4;
    display: block;
    margin-bottom: -1px;
  }

  .user-list a .iconfont {
    float: right;
    color: #25AD25;
  }
</style>
