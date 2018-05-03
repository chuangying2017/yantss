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
              <div class="col-md-4">
              </div>
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
            <button type="button" class="btn btn-danger" @click.prevent="exportExcel">导出</button>
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
          <h3 class="box-title">收款管理 ({{pagination.total}})</h3>
        </div>
        <!-- /.box-header -->
        <div class="box-body table-responsive no-padding">
          <table class="table table-hover table-striped">
            <tbody>
            <tr>
              <th>NO.</th>
              <th>用户信息</th>
              <th>服务部信息</th>
              <th>收款员信息</th>
              <th>订单时间</th>
              <th>操作</th>
            </tr>
            <tr v-for="order in orders">
              <td>{{$index + 1}}</td>
              <td>
                <p>{{order.address.name}} - {{order.address.phone}}</p>
                <p>{{order.address.detail}}</p>
                <p>订单号: {{order.order.order_no}}</p>
              </td>
              <td>
                <p>服务部名称: {{order.staff.station.name}}</p>
                <p>服务部电话: {{order.staff.station.tel}}</p>
                <p>负责人姓名: {{order.staff.station.director}}</p>
                <p>负责人电话: {{order.staff.station.phone}}</p>
              </td>
              <td>
                <p>名称: {{order.staff.name}}</p>
                <p>电话: {{order.staff.phone}}</p>
              </td>
              <td>
                <p>支付时间: {{order.pay_at}}</p>
              </td>
              <td>
                <a v-link="{path: '/dashboard/stations/collect_orders/detail/' + order.id}">详情 </a>
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
  import {API_ROOT} from 'src/config'
  import moment from 'moment'
  let tempQuery = false
  let tempPage = 1
  export default {
    name: 'ListStationCollectOrders',
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
        stations: [],
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
        this.$broadcast('changeStation', order)
      },
      overtime: function (timeBefore) {
        return new Date().getTime() > new Date(timeBefore).getTime()
      },
      getItems: function (query = {}) {
        if (!query.station_id && window._user.roles.indexOf('StationContact') > -1) {
          query.station_id = window._user.associateStations
        }
        return api.stations.collect_orders.getAll(query)
      },
      exportExcel: function () {
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
          API_ROOT + '/admin/subscribe/collect_orders' + str,
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
