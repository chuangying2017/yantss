<template>
  <loader v-show="$loadingRouteData"></loader>
  <div v-show="!$loadingRouteData">
    <div class="m-order-list">
      <div class="pure-g">
        <div class="pure-u-1-3">
          <span class="title">姓名</span>
        </div>
        <div class="pure-u-2-3">
          <div class="content">
            <span>{{staff.name}}</span>
          </div>
        </div>
      </div>
      <div class="pure-g">
        <div class="pure-u-1-3">
          <span class="title">工号</span>
        </div>
        <div class="pure-u-2-3">
          <div class="content">
            <span>{{staff.staff_no}}</span>
          </div>
        </div>
      </div>
      <div class="pure-g">
        <div class="pure-u-1-3">
          <span class="title">电话</span>
        </div>
        <div class="pure-u-2-3">
          <div class="content">
            <a :href="'tel:' + staff.phone"><span>{{staff.phone}}</span></a>
          </div>
        </div>
      </div>
      <div class="pure-g">
        <div class="pure-u-1-3">
          <span class="title">状态</span>
        </div>
        <div class="pure-u-2-3">
          <div class="content">
            <span v-if="staff.user.id">已绑定</span>
            <span v-else>未绑定</span>
          </div>
        </div>
      </div>
      <!--<div class="pure-g">
        <div class="pure-u-1-3">
          <span class="title">所有评价</span>
        </div>
        <div class="pure-u-2-3">
          <div class="content">
          	<a v-link="{ path: '/station/subscribes/allAssess/'+$route.params.staff_id }">
            	查看
          	</a>
          </div>
        </div>
      </div>-->
    </div>
    <div class="qrcode">
      {{{qrcode}}}
    </div>
    <a v-link="{ path: '/station/staffs/' + $route.params.staff_id +  '/edit'}" class="ios-btn ios-btn-success mt20">编辑配送员信息
    </a>
    <button class="ios-btn ios-btn-success" @click.prevent="unbind" :disabled="bindProcess" v-if="staff.user.id">
      <span v-show="!bindProcess">解绑配送员</span>
      <span v-show="bindProcess">正在处理中...</span>
    </button>
    <button class="ios-btn ios-btn-danger ios-btn-link mt20" @click.prevent="deleteView = true" :disabled="bindProcess">
      <span v-show="!bindProcess">删除配送员</span>
    </button>
    <div class="center-box" v-show="deleteView">
      <div class="center-wrap">
        <div class="center-content">
          <h1>删除配送员<span @click.prevent="deleteView = false"><i class="iconfont">&#xe634;</i></span></h1>
          <div class="body">
            <p>请选择一名配送员接受该配送员的所有订单</p>
            <select name="" id="" class="select select-new" v-model="deleteSelect">
              <option value="" disabled selected>-- 请选择 --</option>
              <option :value="staff.id" v-for="staff in selectStaffs">{{staff.name}}</option>
            </select>
            <button class="btn btn-success mt20" :disabled="!deleteSelect || deleteProcess" @click.prevent="delete">
              <span v-show="!deleteProcess">确定并删除</span>
              <span v-show="deleteProcess">正在处理中...</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Loader from './../Share/loader.vue'
  import qrcode from 'qrcode-generator'
  import _ from 'underscore'

  export default {
    name: 'StaffInfo',

    data: function () {
      return {
        staff: {},
        bindURL: '',
        bindProcess: false,
        deleteProcess: false,
        deleteView: false,
        staffs: [],
        selectStaffs: [],
        deleteSelect: null
      }
    },

    components: {
      Loader
    },

    route: {
      data: function () {
        var self = this
        return Promise.all([
          this.$http.get('/stations/staffs/' + self.$route.params.staff_id),
          this.$http.get('/stations/staffs')
        ]).then(function ([
          {data: {data: staff}},
          {data: {data: staffs}}
        ]) {
          return {
            staff: staff,
            bindURL: 'http://yt.l43.cn/yt-staff/#!/bind/' + staff.id + '?bind_token=' + staff.bind_token,
            staffs: staffs,
            selectStaffs: _.filter(staffs, function (item) {
              return item.id !== staff.id
            })
          }
        })
      }
    },

    methods: {
      unbind: function () {
        var self = this
        self.bindProcess = true
        this.$http.put('/stations/staffs/' + this.$route.params.staff_id, {
          user_id: 0
        }).then(
          function (data) {
            self.bindProcess = false
            self.staff = data.data.data
          },
          function (data) {
            console.log(data)
          }
        )
      },
      delete: function () {
        var self = this
        self.deleteProcess = true
        this.$http.put('/stations/staffs/' + this.$route.params.staff_id + '/preorders', {
          staff: this.deleteSelect
        }).then(
          function (data) {
            self.$http.delete('/stations/staffs/' + self.$route.params.staff_id).then(
              function (data) {
                self.deleteProcess = false
                window.alert('成功删除,准备跳转')
                self.$route.router.go('/station/staffs/list')
              },
              function (data) {
                self.deleteProcess = false
                window.alert('删除失败,请重新操作')
              }
            )
          },
          function (data) {
            self.deleteProcess = false
            window.alert('删除失败,请重新操作')
          }
        )
      }
    },

    computed: {
      qrcode: function () {
        var qr = qrcode(6, 'M')
        qr.addData(this.bindURL)
        qr.make()
        return qr.createImgTag()
      }
    }
  }
</script>

<style>
  .qrcode {
    border: 1px solid #ddd;
    display: block;
    margin: 20px auto;
    height: auto;
    width: 40%;
  }

  .qrcode img {
    width: 100%;
    height: auto;
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

  .ios-btn {
    display: block;
    -webkit-appearance: none;
    border-right: 0 none;
    border-left: 0 none;
    outline: none;
    width: 100%;
    padding: 1rem;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    background: #fff;
    font-size: 1.4rem;
    color: #25AD25;
    text-align: center;
  }

  .ios-btn.ios-btn-link {
    background: none;
    border: 0 none;
  }

  .ios-btn + .ios-btn {
    margin-top: -1px;
  }

  .ios-btn.ios-btn-danger {
    color: red;
    margin-top: 20px;
    text-decoration: underline;
  }

  .ios-btn:disabled {
    color: #bbb;
  }

  .center-box {
    display: table;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
  }

  .center-wrap {
    display: table-cell;
    vertical-align: middle;
  }

  .center-content {
    width: 80%;
    margin: 0 auto;
    background: #fff;
    padding: 1rem;
    border-radius: .3rem;
  }

  .center-content h1 {
    text-align: center;
    font-size: 1.6rem;
  }

  .center-content h1 span {
    float: right;
  }

  .center-content .body {
    padding: 2rem;
  }

  .center-content .body p {
    color: #bbb;
    font-size: 1.4rem;
  }

  .select.select-new {
    border: 1px solid #5DBB1A;
    border-radius: .3rem;
    margin-top: 1rem;
  }
</style>
