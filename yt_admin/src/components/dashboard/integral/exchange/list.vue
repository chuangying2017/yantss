<template>
  <div class="row">
    <div class="col-xs-12">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">兑换管理</h3>
        </div>
        <div class="row">
          <div class="col-md-6 pl20">
            <a v-link="{path: '/dashboard/integral/addExchange'}" class="btn btn-social btn-info btn-sm mb20 mt20">
              <i class="fa fa-plus"></i> 添加兑换码
            </a>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 pl20">
            <div class="form-group">
              <input type="date" class="form-control w150 mb20" v-model="query.start_time">
              至
              <input type="date" class="form-control w150 mb20" v-model="query.end_time">
            </div>

          </div>
          <div class="col-md-6 mg20">
            <form action="" class="form-horizontal">
              <div class="form-group">
                <select class="selC" v-model="query.type">
                  <option value="0">已兑换</option>
                  <option value="1">未兑换</option>
                  <option value="2">已过期</option>
                </select><select class="selC" v-model="query.info">
                <option value="0">兑换日期</option>
                <option value="1">添加日期</option>
              </select><input type="text" class="form-control w250 h34" placeholder="请输入昵称/手机号进行搜索" v-model="query.name"><button type="button" class="btn btn-info bn h35">搜索</button>
              </div>
            </form>
          </div>
        </div>
        <!-- /.box-header -->
        <div class="box-body table-responsive no-padding">
          <table class="table table-hover table-striped">
            <tbody>
            <tr>
              <th>ID</th>
              <th>兑换码</th>
              <th>积分</th>
              <th>状态</th>
              <th>兑换人</th>
              <th>兑换时间</th>
              <th>过期时间</th>
              <th>操作</th>
            </tr>
            <tr>
              <td>4</td>
              <td>k2nneu7HFD92</td>
              <td>900</td>
              <td>未兑换</td>
              <td>未兑换</td>
              <td>未兑换</td>
              <td>2018-2-20 17:55:34</td>
              <td><a @click.prevent="remove(product)" type="button" class="btn btn-default btn-sm">删除</a></td>
            </tr>
            <tr>
              <td>3</td>
              <td>k2nneu7HFD92</td>
              <td>50</td>
              <td>已兑换</td>
              <td><div class="spCon">
                <div class="imgCon">
                  <img class="imgC b50" src="http://o7tep4eu1.bkt.clouddn.com/FmWiM8n3aO30lRnz_Uy_102vsx0d-201706211511233587"/>
                </div>
                <div>
                  <p class="middleP">牛奶</p>
                </div>
              </div></td>
              <td>2018-2-20 17:55:34</td>
              <td>2018-2-20 17:55:34</td>
              <td><a @click.prevent="remove(product)" type="button" class="btn btn-default btn-sm">删除</a></td>
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
<style>
  .imgC{
    width: 30px;
    height: 30px;
  }
  .pl20{
    padding-left: 20px;
  }
  .spCon{
    display: flex;

  }
  .imgCon{
    border: 1px solid #dddddd;
    width: 51px;
    height: 51px;
    margin-left: 0px;
    margin-right: 5px;
    border-radius: 50%;
  }
  .goodsTable>tbody>tr>td{
    vertical-align: middle;
  }
  .b50{
    width: 50px;
    height: 50px;
    border-radius: 50%;

  }
  .middleP{
    margin-top: 15px;
  }
  .mt20{
    margin-top: 20px;
  }
  .selC{
    width: 100px;
    height: 34.5px;
    border-color: #d2d6de;
  }
  .w250{
    width:350px;
    display: inline;
  }
  .w150{
    width:150px;
    display: inline;
  }
  .bn{
    border-radius: 0px;
    height: 34px;
    position: relative;
    top:-1px;
  }
  .h34 {
    height: 34.5px;
  }
  .h35{
    height: 35px;
  }
</style>
