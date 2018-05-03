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
                  <label for="groupRadios" class="col-sm-4 control-label">时间</label>
                  <div class="col-sm-8">
                    <select class="selC" v-model="query.year">
                      <option value="2018">2018</option>
                      <option value="2018">2017</option>
                      <option value="2018">2016</option>
                    </select><select class="selC" v-model="query.month">
                    <option value="12">12</option>
                    <option value="11">11</option>
                    <option value="10">10</option>
                    <option value="9">9</option>
                    <option value="8">8</option>
                    <option value="7">7</option>
                    <option value="6">6</option>
                    <option value="5">5</option>
                    <option value="4">4</option>
                    <option value="3">3</option>
                    <option value="2">2</option>
                    <option value="1">1</option>
                  </select>
                  </div>
                </div>
              </div>
              <div class="col-md-4"></div>
            </div>
          </form>
        </div>
        <div class="box-footer">
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
          <h3 class="box-title">好友率排行</h3>
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
              <th>服务部信息</th>
              <th>评价信息</th>
              <th>好评率</th>
              <th>时间</th>
            </tr>
            <tr>
            <!--<tr v-for="order in orders">-->
              <td>1</td>
              <td>
                <p>名称: 昌岗中服务部</p>
                <p>负责人: 汪小平</p>
                <p>电话：13620812844</p>
              </td>
              <td>
                <p>评价次数：20次</p>
                <p>好评次数：20次</p>
                <p>中评次数：20次</p>
                <p>差评次数：20次</p>
              </td>
              <td>
                <p></p>
                <p></p>
                <p class="par">25%</p>
                <p></p>
              </td>
              <td>
                <p></p>
                <p></p>
                <p>2018-1-24 17:33:46</p>
                <p></p>
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
  import Pagination from '../../pagination.vue'
  import { API_ROOT } from 'src/config'
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
        inputdata: '5',
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
      }
    }
  }
</script>
<style>
  .selC{
    width: 100px;
    height: 30px;
  }
  .par{
    font-size: 20px;
    font-weight: bold;
  }
</style>
