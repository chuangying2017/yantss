<template>
  <div class="u-tab">
    <div class="pure-g">
      <div class="pure-u-1-3">
        <a @click.prevent="viewType = 'qrcode'"
           :class="[ viewType === 'qrcode' ? 'active' : '' ]">
          <i class="iconfont">&#xe65e;</i> 二维码
        </a>
      </div>
      <div class="pure-u-1-3">
        <a @click.prevent="viewType = 'clients'"
           :class="[ viewType === 'clients' ? 'active' : '' ]">
          <i class="iconfont">&#xe65f;</i> 我的客户
        </a>
      </div>
      <div class="pure-u-1-3">
        <a @click.prevent="viewType = 'rank'"
           :class="[ viewType === 'rank' ? 'active' : '' ]">
          <i class="iconfont">&#xe669;</i> 排行榜
        </a>
      </div>
    </div>
  </div>
  <loader v-show="$loadingRouteData"></loader>
  <div v-show="!$loadingRouteData">
    <div v-show="viewType === 'qrcode'">
      <div class="qrcode-wrap">
        <!--{{{imgTag}}}-->
        <div id="qrcode"></div>
      </div>
      <p class="info" v-show="viewType === 'qrcode'">客户扫描二维码成功消费即可返现</p>
      <button class="ios-btn ios-btn-success mt50" @click.prevent="unbind" :disabled="bindProcess" v-if="staff.user.id">
        <span v-show="!bindProcess">解除配送员身份（谨慎操作）</span>
        <span v-show="bindProcess">正在处理中...</span>
      </button>
    </div>
    <div class="u-table" v-show="viewType === 'clients'">
      <table class="pure-table pure-table-bordered" v-show="clients">
        <thead>
        <tr>
          <th>客户</th>
          <th>订单</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="client in clients" v-if="client">
          <td>
            <span>{{client.clientName}}</span>
          </td>
          <td>
            <span>{{client.orderNumber}}</span>
          </td>
        </tr>
        </tbody>
      </table>
      <empty v-show="!clients" icon="&#xe63e;">还没有客户哦,赶紧去分享</empty>
      <!--<div v-show="!clients.length" class="empty-wrap">-->
      <!--<i class="iconfont">&#xe66d;</i>-->
      <!--<h1>-->
      <!--功能维护中-->
      <!--</h1>-->
      <!--</div>-->
    </div>
    <!--{{rankedStaffs | json}}-->
    <div class="u-table" v-show="viewType === 'rank'">
      <table class="pure-table pure-table-bordered" v-if="rankedStaffs.length">
        <thead>
        <tr>
          <th>名次</th>
          <th>姓名</th>
          <th>归属</th>
          <th>推荐</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="staff in rankedStaffs | limitBy 10">
          <td>
            <span>{{$index + 1}}</span>
          </td>
          <td>
            <span>{{staff.name}}</span>
          </td>
          <td>
            <span>{{staff.stationName}}</span>
          </td>
          <td>
            <span>{{staff.clientsCount}} 人</span>
          </td>
        </tr>
        </tbody>
      </table>
      <empty v-show="!rankedStaffs.length" icon="&#xe63e;">还没有客户哦,赶紧去分享</empty>
      <!--<div v-show="!rankedStaffs.length" class="empty-wrap">-->
      <!--<i class="iconfont">&#xe66d;</i>-->
      <!--<h1>-->
      <!--功能维护中-->
      <!--</h1>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
  import staffService from './../../wilddog/staffService'
  import Loader from './../Share/loader.vue'
  import Empty from './../Share/empty.vue'
  import {STAFF_ACTIVITY} from './../../config'
  import _ from 'underscore'

  export default {
    name: 'Recommand',

    data: function () {
      return {
        staff: {
          user: {
            id: null
          }
        },
        staffs: [],
        rankedStaffs: [],
        clients: null,
        imgTag: null,
        allStaffs: [],
        viewType: 'qrcode',
        bindProcess: false
      }
    },

    components: {
      Loader,
      Empty
    },

    route: {
      data: function () {
        var self = this
        return Promise.all([
          this.$http.get('/staffs/info'),
          staffService.getRank(),
          this.$http.get('/staffs/all')
//          staffService.getRank()
        ]).then(
          function ([{data: {data: staffInfo}}, staffs, {data: {data: allStaffs}}]) {
            var url = STAFF_ACTIVITY + '?staffId=' + staffInfo.id
            self.makeQrcode(url)
            self.staff = staffInfo
//            var staffs = []
            staffService.getCountsStaff(staffInfo.id).then(
              function (data) {
                if (data) {
                  self.clients = data.clients
                }
                self.staffs = staffs.reverse()
                self.allStaffs = allStaffs
                self.rankStaff()
              }
            )
          },
          function (data) {
            console.log(data)
          }
        )
      }
    },

    methods: {
      makeQrcode: function (url) {
        document.getElementById('qrcode').innerHTML = ''
        var qrcode = new window.QRCode(document.getElementById('qrcode'), {
          text: url,
          width: 640,
          height: 640
        })
        console.log(qrcode)
      },
      unbind: function () {
        var self = this
        self.bindProcess = true
        this.$http.post('/staffs/' + this.staff.id + '/unbind').then(
          function (data) {
            self.bindProcess = false
            window.location.reload()
          },
          function (data) {
            self.bindProcess = false
            window.alert('解绑出错')
          }
        )
      },
      rankStaff: function () {
        var self = this
        var arr = []
        self.staffs.forEach(function (item) {
          var target = _.findWhere(self.allStaffs, {id: parseInt(item.staffId)})
          if (target) {
            target.clientsCount = item.clients
            arr.push(
              {
                id: target.id,
                name: target.name,
                phone: target.phone,
                stationName: target.station.name,
                clientsCount: target.clientsCount
              }
            )
          }
        })
        self.rankedStaffs = arr
      }
    },

    ready: function () {
      window.mixpanel.track('配送员追踪', {
        action: '配送员查看二维码'
      })
    }
  }
</script>

<style>
  .iconfont {
    -webkit-font-smoothing: antialiased;
  }

  .qrcode-wrap {
    display: block;
    margin: 5rem auto 1rem;
    width: 40%;
    border: 1px solid #ddd;
    border-radius: 3px;
    overflow: hidden;
    padding: 1rem;
    background: #fff;
  }

  .qrcode-wrap img {
    width: 100%;
    height: auto;
    vertical-align: bottom;
  }

  .info {
    text-align: center;
    font-size: 1.2rem;
    color: #bbb;
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

  .empty-wrap {
    margin-top: 60px;
    text-align: center;
    color: #B3B3B3;
  }

  .empty-wrap .iconfont {
    font-size: 50px;
  }

  .empty-wrap h1 {
    margin-top: 20px;
    font-size: 1.4rem;
  }
</style>
