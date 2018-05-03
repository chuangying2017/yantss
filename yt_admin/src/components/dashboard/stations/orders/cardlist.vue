<template>
  <station-select :stations="stations"></station-select>
  <div class="row">
    <div class="col-md-12">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">筛选</h3>
        </div>
        <div class="box-body">
          <form action="" class="form-horizontal">
            <div class="row">
              <div class="col-md-4">
                <div class="form-group">
                  <label for="optionsRadios" class="col-sm-4 control-label">订单号</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="query.order_no">
                  </div>
                </div>
                <div class="form-group">
                  <label for="optionsRadios" class="col-sm-4 control-label">支付订单号</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="query.pay_order_no">
                  </div>
                </div>
                <div class="form-group">
                  <label for="optionsRadios" class="col-sm-4 control-label">用户手机</label>
                  <div class="col-sm-8">
                    <input type="tel" class="form-control" v-model="query.phone">
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label for="groupRadios" class="col-sm-4 control-label">订单状态</label>
                  <div class="col-sm-8">
                    <select class="form-control" v-model="query.status">
                      <option value="0">未使用</option>
                      <option value="1">已使用</option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <label for="optionsRadios" class="col-sm-4 control-label">下单开始时间</label>
                  <div class="col-sm-8">
                    <input type="tel" class="form-control" v-model="query.start_time">
                  </div>
                </div>
                <div class="form-group">
                  <label for="optionsRadios" class="col-sm-4 control-label">下单结束时间</label>
                  <div class="col-sm-8">
                    <input type="tel" class="form-control" v-model="query.end_time">
                  </div>
                </div>
              </div>
              <div class="col-md-4"></div>
            </div>
          </form>
        </div>
        <div class="box-footer">
          <div class="btn-group pull-left">
            <button type="button" class="btn btn-info" @click.prevent="selectToday('YYYY-MM-DD')">今天</button>
            <button type="button" class="btn btn-info" @click.prevent="selectWeekAndMonth('YYYY-MM-DD')">本周</button>
            <button type="button" class="btn btn-info" @click.prevent="selectWeekAndMonth('YYYY-MM-01')">本月</button>
          </div>
          <div class="btn-group pull-right">
            <button type="button" class="btn btn-danger" @click.prevent="export">导出</button>
            <button type="button" class="btn btn-danger" @click.prevent="search(1)">搜索</button>
            <button type="button" class="btn btn-danger" @click.prevent="reset">重置</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-12">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">订单管理</h3>
          <!--<div class="box-tools">-->
          <!--<div class="input-group input-group-sm" style="width: 150px;">-->
          <!--<input type="text" name="table_search" class="form-control pull-right" placeholder="微信昵称">-->

          <!--<div class="input-group-btn">-->
          <!--<button type="submit" class="btn btn-default"><i class="fa fa-search"></i></button>-->
          <!--</div>-->
          <!--</div>-->
          <!--</div>-->
        </div>
        <!-- /.box-header -->
        <div class="box-body table-responsive no-padding">
          <table class="table table-hover table-striped">
            <tbody>
            <tr>
              <th>NO.</th>
              <th>用户信息</th>
              <th>订单时间</th>
              <th>购买额度</th>
              <th>订单状态</th>
              <th>支付状态</th>
              <th>操作</th>
            </tr>
            <tr v-for="order in orders">
              <td>{{$index + 1}}</td>
              <td width="25%">
                <p>{{order.name}} - {{order.phone}}</p>
                <p>{{order.detail}}</p>
                <p>订单号: {{order.order_no}}</p>
              </td>
              <td>
                <p></p>
                <p>{{order.created_at}}</p>
                <p></p>
              </td>
              <td>
                <p></p>
                <p>{{order.discount_amount/100 | currency '￥'}}</p>
                <p></p>
              </td>
              <td>
                <p></p>
                <p>
                  <span class="label label-danger" v-if="order.status == '0'">未使用</span>
                  <span class="label label-primary" v-if="order.status == '1'">已使用</span>
                </p>
                <p></p>
              </td>
              <td>
                <p></p>
                <p><span class="label label-primary" v-if="order.pay_status == 'paid'">已支付</span></p>
                <p><span class="label label-danger" v-if="order.pay_status == 'unpaid'">未支付</span>
                </p>
                <p></p>
              </td>
              <td>
                <p></p>
                <p v-if="order.pay_status == 'paid'"><a v-link="{path: '/dashboard/stations/orders/changeInfo/' + order.id}">兑换详情 </a></p>
                <p v-if="order.pay_status == 'paid'"><a v-link="{path: '/dashboard/stations/orders/allUsersCard/' + order.id}">查看所有优鲜卡 </a></p>
                <p v-if="order.pay_status == 'unpaid'">未支付</p>
                <!--<select v-if="order.status == 'rejected' || order.status == 'assigning'"-->
                <!--v-on:change="changeStation(order.id, $event)">-->
                <!--<option value="no" :selected="newStation == 'no'">分配服务部</option>-->
                <!--<option value="{{station.id}}" v-for="station in stations" v-if="station.id !== order.station.id">-->
                <!--{{station['name']}}-->
                <!--</option>-->
                <!--</select>-->
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <!-- /.box-body -->
        <!--<div class="box-footer">-->
          <!--<p>合计: {{pagination.total}}</p> 当前页:-->
          <!--<pagination :pagination="pagination" :goto="search"></pagination>-->
        <!--</div>-->
      </div>
      <!-- /.box -->
    </div>
  </div>
</template>
<script>
  import api from 'api/index.js'
  import Pagination from '../../../pagination.vue'
  import { API_ROOT } from 'src/config'
  import moment from 'moment'
  let tempQuery = false
  let tempPage = 1
  export default {
    name: 'cardlist',
    components: {
      Pagination
    },
    vuex: {
      getters: {
        user: function (state) {
          return state.user.info
        }
      }
    },
    data () {
      return {
        orders: [],
        // pagination: {},
        query: {
          station_id: null,
          residence_id: null,
          phone: null,
          order_no: null,
          pay_order_no: null,
          status: null,
          start_time: null,
          end_time: null
        }
      }
    },
    route: {
      data () {
        if (tempQuery) {
          this.query = tempQuery
          return this.search(tempPage)
        } else {
          return Promise.all(this.getItems()).then(function (orderData) {
            return {
              orders: orderData.data
              // pagination: orderData.meta.pagination,
            }
          })
        }
      }
    },
    methods: {
      // changeStation (order) {
      //   console.log(order)
      //   this.$broadcast('changeStation', order)
      // },
      overtime: function (timeBefore) {
        return new Date().getTime() > new Date(timeBefore).getTime()
      },
      getItems: function (query = {}) {
        return api.cardorder.getAll(query)
      },
      export: function () {
        var query = this.query
        query.export = 'all'
        query.token = window.localStorage.getItem('jwt-token')
        var str = '?'
        Object.keys(query).forEach(function (key) {
          if (query[key]) {
            str += key + '=' + query[key] + '&'
          }
        })
        window.open(
          API_ROOT + '/admin/card/cardorder/index' + str,
          '_blank'
        )
      },
      getQuery: function (page = null) {
        var query = this.query
        if (typeof page !== 'object') query.page = page
        Object.keys(query).forEach(function (key) {
          if (!query[key]) {
            delete query[key]
          }
        })
        return query
      },
      search: function (page = null) {
        tempQuery = this.query
        tempPage = page
        var self = this
        this.getItems(this.getQuery(page)).then(function (data) {
          // self.pagination = data.meta.pagination
          self.orders = data.data
        })
      },
      reset: function () {
        this.query = {
          station_id: null,
          residence_id: null,
          phone: null,
          order_no: null,
          status: null,
          start_time: null,
          end_time: null
        }
      },
      selectToday: function (format) {
        this.query.start_time = moment().format(format)
        this.search()
      },
      selectWeekAndMonth: function (format) {
        this.query.start_time = moment().startOf('week').add(1, 'day').format(format)
        this.search()
      }
    }
  }
</script>
