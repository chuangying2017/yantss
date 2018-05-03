<template>
  <!--<button @click.prevent="writeData">写入</button>-->
  <!--<button @click.prevent="clearData">删除</button>-->
  <!--<button @click.prevent="exportData">导出数据</button>-->
  <!--<button @click.prevent="compareData">对比数据</button>-->
  <!--<input v-model="key">-->
  <!--<input v-model="value">-->
  <!--<button @click.prevent="enterData">单节点写入数据</button>-->
  <!--{{tableDatas | json}}-->
  <!--<br>-->
  <!--<hr>-->
  <!--{{staffData | json}}-->
  <loader v-show="$loadingRouteData"></loader>

  <div class="center-box" v-show="!$loadingRouteData">
    <div class="dashboard-item">
      <div class="pure-g">
        <div class="pure-u-1-2">
          <div class="icon-block">
            <i class="iconfont">&#xe657;</i>
            <span>配送员</span>
          </div>
        </div>
        <div class="pure-u-1-2">
          <h2 class="title">{{staffsNum}} <span>人</span></h2>
        </div>
      </div>
    </div>
    <div class="dashboard-item">
      <div class="pure-g">
        <div class="pure-u-1-2">
          <div class="icon-block">
            <i class="iconfont">&#xe65f;</i>
            <span>转化客户</span>
          </div>
        </div>
        <div class="pure-u-1-2">
          <h2 class="title">{{clientsNum}} <span>人</span></h2>
        </div>
      </div>
    </div>
  </div>
  <div class="u-table" v-show="!$loadingRouteData">
    <table class="pure-table pure-table-bordered">
      <thead>
      <tr>
        <th>#ID</th>
        <th>归属</th>
        <th>姓名</th>
        <th>推荐</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="staff in allStaffs" track-by="$index" v-if="staff.name">
        <td>
          <span>{{staff.id}}</span>
        </td>
        <td>
          <span>{{staff.station.name}}</span>
        </td>
        <td>
          <span>{{staff.name}}</span>
        </td>
        <td>
          <span>{{staff.clientsCount}}</span>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

  <!--<div class="empty-wrap">-->
  <!--<i class="iconfont">&#xe66d;</i>-->
  <!--<h1>-->
  <!--功能维护中-->
  <!--</h1>-->
  <!--</div>-->
</template>

<script>
  import Loader from './../Share/loader.vue'
  import staffService from './../../wilddog/staffService'
  import {WILDDOG_STAFF} from './../../config.js'
  import _ from 'underscore'
  import wholeData from './../../assets/data/whole.json'
  //  import errorData from './../../assets/data/error.json'

  export default {
    name: 'Operate',

    data: function () {
      return {
        staffsNum: 0,
        clientsNum: 0,
        allStaffs: [],
        staffs: [],
        orderNo: [],
        tableDatas: [],
        sortedData: [],
        staffData: []
      }
    },

    components: {
      Loader
    },

    route: {
      activate: function () {

      },
      data: function () {
        var self = this
        return Promise.all([
          staffService.getAll(),
          this.$http.get('/staffs/all?all=1')
        ]).then(
          function ([
            wilddogStaffs,
            {data: {data: staffs}}
          ]) {
            var staffsNum = _.size(wilddogStaffs)
            var clientsNum = 0
            for (var key in wilddogStaffs) {
              if (wilddogStaffs[key]['clientsCount']) {
//                console.log(wilddogStaffs[key]['clientsCount'])
                clientsNum = clientsNum + parseInt(wilddogStaffs[key]['clientsCount'])
              }
            }
            self.staffs = staffs
            self.staffsNum = staffsNum - 4
            self.clientsNum = clientsNum
            self.sortData(wilddogStaffs, staffs)
          }
        )
//        staffRef.limitToFirst(300).on('value', function (snapshot) {
//          var staffs = snapshot.val()
//          console.log(staffs)
//          var staffsNum = _.size(staffs)
//          var clientsNum = 0
//          for (var key in staffs) {
//            if (staffs[key]['clientsCount']) {
//              clientsNum = clientsNum + parseInt(staffs[key]['clientsCount'])
//            }
//          }
//          self.staffsNum = staffsNum - 2
//          self.clientsNum = clientsNum
//        })
      }
    },

    methods: {
      sortData: function (wilddog, staffs) {
        var arr = []
//        console.log(wilddog, staffs)
        for (var key in wilddog) {
          var item = _.findWhere(staffs, {id: parseInt(key)})
          if (item && wilddog[key].clientsCount) {
            item.clientsCount = wilddog[key].clientsCount
            arr.push(item)
          }
        }
//        console.log(arr, arr.length)
        var sortedArr = _.sortBy(arr, 'station.name')
        this.allStaffs = sortedArr
      },
      writeData: function () {
        var staffRef = new window.Wilddog(WILDDOG_STAFF + '/staffs')
        staffRef.limitToFirst(200).once('value', function (snapshot) {
//          console.log(snapshot.val())
          var staffs = snapshot.val()
          for (var key in staffs) {
            var newObj = {
              clients: {},
              clientsCount: null
            }
            for (var iKey in staffs[key]) {
              if (iKey !== 'clientsCount') {
                newObj.clients[iKey] = {
                  clientName: staffs[key][iKey].clientInfo.nickname,
                  orderNumber: staffs[key][iKey].orderInfo.order_no
                }
              } else {
                newObj.clientsCount = parseInt(staffs[key][iKey])
              }
            }
            var countsRef = new window.Wilddog(WILDDOG_STAFF + '/counts')
            countsRef.child(key).update(newObj)
          }
        })
      },
      exportData: function () {
        var self = this
        staffService.getStaffs().then(
          function (data) {
            var wilddogStaffs = data
            var array = []
            for (var key in wilddogStaffs) {
              if (key.indexOf('?staffId') === -1) {
                delete wilddogStaffs[key]['clientsCount']
                var item = _.findWhere(self.staffs, {id: parseInt(key)})
                if (item !== undefined) {
                  item.wilddogLength = _.size(wilddogStaffs[key])
                  item.wilddogInfo = wilddogStaffs[key]
                  array.push(item)
                } else {
//                  console.log('id ' + key + ' cannot be found')
                }
              }
            }
            self.tableData(array)
            self.tableDataSecond(array)
            self.sortedData = array
          },
          function (error) {
            console.log(error)
          }
        )
      },
      tableData: function (data) {
        var orders = []
        var orderNos = []
        for (var key in data) {
          for (var openid in data[key]['wilddogInfo']) {
            var order = {}
            order.name = data[key]['name']
            order.station = data[key]['station']['name']
            order.phone = data[key]['phone']
            order.wechat_id = '-'
            order.wechat_nickname = '-'
            order.order_no = data[key]['wilddogInfo'][openid]['orderInfo']['order_no']
            order.client_name = data[key]['wilddogInfo'][openid]['orderInfo']['name']
            order.client_phone = data[key]['wilddogInfo'][openid]['orderInfo']['phone']
            order.create_at = data[key]['wilddogInfo'][openid]['orderInfo']['created_at']['date']
            order.product = data[key]['wilddogInfo'][openid]['orderInfo']['skus'][0]['name']
            order.product_count = data[key]['wilddogInfo'][openid]['orderInfo']['skus'][0]['total']
            orders.push(order)
            orderNos.push(order.order_no)
          }
        }
//        console.log(orders, orderNos)
        this.tableDatas = orders
        this.orderNo = orderNos
      },
      tableDataSecond: function (data) {
        var staffs = []
        for (var i = 0; i < data.length; i++) {
          var staff = {}
          staff.name = data[i].name
          staff.station = data[i].station.name
          staff.phone = data[i].phone
          staff.clientsCount = data[i].wilddogLength
          staff.policy = '5'
          staff.price = data[i].wilddogLength * 5
          staff.wechat_id = '-'
          staff.wechat_name = '-'
          staffs.push(staff)
        }
        this.staffData = staffs
      },
      compareData: function () {
//        var errorNo = _.difference(wholeData, errorData)
        var arr = wholeData
        var sortedArr = arr.slice().sort()

        var results = []
        for (var i = 0; i < arr.length - 1; i++) {
          if (sortedArr[i + 1] === sortedArr[i]) {
            results.push(sortedArr[i])
          }
        }
//        console.log(results)
      }
//      clearData: function () {
//        var staffRef = new window.Wilddog(WILDDOG_STAFF + '/staffs')
//        staffRef.once('value', function (snapshot) {
//          var staffs = snapshot.val()
//          for (var key in staffs) {
//            staffRef.child(key + '/clientsCount').remove()
//          }
//        })
//      },
//      enterData: function () {
//        var staffRef = new window.Wilddog(WILDDOG_STAFF + '/staffs')
//        var self = this
//        if (this.key && this.value) {
//          staffRef.child(this.key).update({clientsCount: parseInt(this.value)}, function (err) {
//            if (err === null) {
//              self.key = ''
//              self.value = ''
//            }
//          })
//        }
//      }
    }
  }
</script>

<style scoped>
  .center-box {
    width: 250px;
    background: #fff;
    margin: 4rem auto;
    padding: 2rem;
    box-shadow: 0 0 20px #ddd;
  }

  .icon-block .iconfont {
    display: block;
    font-size: 5rem;
    text-align: center;
    color: #25AD25;
  }

  .icon-block span {
    font-size: 1.4rem;
    display: block;
    text-align: center;
    color: #bbb;
  }

  .center-box .title {
    font-size: 4rem;
    text-align: center;
    margin: 1rem 0;
  }

  .center-box .title span {
    font-size: 1.4rem;
    color: #bbb;
  }

  .dashboard-item {
    margin: 1rem 0;
    padding: 1rem 0;
    border-bottom: 1px dotted #ddd;
  }

  .dashboard-item:last-child {
    border-bottom: 0 none;
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
