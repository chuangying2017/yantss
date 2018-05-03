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
                <div class="form-group">
                  <label for="optionsRadios" class="col-sm-4 control-label">所属小区</label>
                  <div class="col-sm-8">
                    <select class="form-control" v-model="query.residence_id">
                      <option v-for="residence in residences" value="{{residence.id}}">{{residence.name}}({{residence.district}})</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label for="groupRadios" class="col-sm-4 control-label">所属服务部</label>
                  <div class="col-sm-8">
                    <select class="form-control" v-model="query.station_id">
                      <option v-for="station in filterStations" value="{{station.id}}">{{station.name}}</option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <label for="groupRadios" class="col-sm-4 control-label">订单状态</label>
                  <div class="col-sm-8">
                    <select class="form-control" v-model="query.status">
                      <option value="null">全部</option>
                      <option value="unpaid">未支付</option>
                      <option value="shipping">正常配送</option>
                      <option value="confirm">未安排配送员</option>
                      <option value="untreated">未处理</option>
                      <option value="overtime">超时未处理</option>
                      <option value="reject">被拒绝</option>
                      <option value="done">已完成</option>
                      <option value="cancel">已取消</option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <label for="optionsRadios" class="col-sm-4 control-label">开始时间</label>
                  <div class="col-sm-8">
                    <input type="tel" class="form-control" v-model="query.start_time">
                  </div>
                </div>
                <div class="form-group">
                  <label for="optionsRadios" class="col-sm-4 control-label">结束时间</label>
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
            <button type="button" class="btn btn-info" @click.prevent="select('YYYY-MM-DD')">今天</button>
            <button type="button" class="btn btn-info" @click.prevent="select('YYYY-MM-DD', true)">本周</button>
            <button type="button" class="btn btn-info" @click.prevent="select('YYYY-MM-01')">本月</button>
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
          <h3 class="box-title">订单管理 ({{pagination.total}})</h3>
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
              <th>服务部信息</th>
              <th>订单时间</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
            <tr v-for="order in orders">
              <td>{{$index + 1}}</td>
              <td>
                <p>{{order.name}} - {{order.phone}}</p>
                <p>{{order.address}}</p>
                <p>订单号: {{order.order_no}}</p>
              </td>
              <td>
                <p>名称: {{order['station']['name']}}</p>
                <p>负责人: {{order['station']['director']}}</p>
                <p>电话: {{order['station']['phone']}}</p>
              </td>
              <td>
                <p>下单: {{order.created_at.date | date}}</p>
                <p>起送: {{order.start_time}}</p>
                <p> {{order.weekday_type == 'all' ? '周一到周日' : '周一到周五'}}({{order.daytime ? '上午' : '下午'}})</p>
              </td>
              <td>
                <span class="label label-primary" v-if="order.status == 'shipping'">正常</span>
                <span class="label label-danger" v-if="order.status == 'assigning' && order.assign.status == 'reject'">被拒绝</span>
                <span class="label label-danger" v-if="order.status == 'assigning' && order.assign.status == 'confirm'">未安排配送员</span>
                <span class="label label-danger"
                      v-if="order.status == 'assigning' && (order.assign.status == 'untreated' || order.assign.status == 'assign')">未处理</span>
                <span class="label label-warning"
                      v-if="order.status == 'assigning' && overtime(order.assign.time_before)">超时</span>
                <span class="label label-danger" v-if="order.status == 'unpaid'">未支付</span>
                <span class="label label-success" v-if="order.status == 'done'">已完成</span>
                <span class="label label-default" v-if="order.status == 'cancel'">已取消</span>
              </td>
              <td>
                <a v-link="{path: '/dashboard/stations/orders/detail/' + order.id}">详情 </a>
                <a href="" @click.prevent="changeStation(order)"
                   v-if="order.status == 'rejected' || order.status == 'assigning' || user.roles.indexOf('StationAdmin') > -1 ">重新分配</a>
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
        <div class="box-footer">
          <p>合计: {{pagination.total}}</p> 当前页:
          <pagination :pagination="pagination" :goto="search"></pagination>
        </div>
      </div>
      <!-- /.box -->
    </div>
  </div>
</template>
<script>
  import api from 'api/index.js'
  import Pagination from 'components/pagination.vue'
  import { API_ROOT } from 'src/config'
  import moment from 'moment'
  import stationSelect from './select.vue'
  let tempQuery = false
  let tempPage = 1
  export default {
    name: 'ListStationOrders',
    components: {
      Pagination,
      stationSelect
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
        stations: [],
        residences: [],
//        stationsObj: {},
        filterStations: [],
        newStation: 'no',
        pagination: {},
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
          return Promise.all([this.getItems(), api.stations.getAll(), api.residences.getDropdown()]).then(function ([orderData, stations, residences]) {
            var temp = {}
//            var stationsObj = {}
            if (window._user.roles.indexOf('StationContact') > -1) {
              var associateStations = window._user.associateStations.split(',')
              console.log(associateStations)
              stations.forEach(function (val) {
                if (associateStations.indexOf(val.id.toString()) > -1) {
                  temp[val.id] = val
                }
              })
            } else {
              stations.forEach(function (val, key) {
                temp[val.id] = val
              })
            }
//            stations.forEach(function (val) {
//              stationsObj[val.id] = val
//            })
            return {
              orders: orderData.data,
              pagination: orderData.meta.pagination,
              stations: stations,
              residences: residences,
//              stationsObj: stationsObj,
              filterStations: temp
            }
          })
        }
      }
    },
    methods: {
      changeStation (order) {
        console.log(order)
        this.$broadcast('changeStation', order)
      },
      overtime: function (timeBefore) {
        return new Date().getTime() > new Date(timeBefore).getTime()
      },
      getItems: function (query = {}) {
        if (!query.station_id && window._user.roles.indexOf('StationContact') > -1) {
          query.station_id = window._user.associateStations
        }
        return api.stations.orders.getAll(query)
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
          API_ROOT + '/admin/subscribe/orders' + str,
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
          self.pagination = data.meta.pagination
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
      select: function (format, week = false) {
        if (week) {
          this.query.start_time = moment().startOf('week').add(1, 'day').format(format)
        } else {
          this.query.start_time = moment().format(format)
        }
        this.search()
      }
    }
  }
</script>
