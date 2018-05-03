<template>
  <div class="row">
    <div class="col-xs-12">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">分类管理</h3>
        </div>
        <div class="row">
          <div class="col-md-6 pl20">
            <a v-link="{path: '/dashboard/integral/addcategory'}" class="btn btn-social btn-info btn-sm mb20 mt20">
              <i class="fa fa-plus"></i> 添加新商品分类
            </a>
          </div>
        </div>
        <!-- /.box-header -->
        <div class="box-body table-responsive no-padding">
          <table class="table table-hover table-striped">
            <tbody>
            <tr>
              <th>ID</th>
              <th>显示顺序</th>
              <th>标题</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
            <tr>
              <td>26</td>
              <td>0</td>
              <td><img class="imgC" src="../../../../assets/logo.png"/> 礼品</td>
              <td><a @click.prevent="" type="button" class="btn btn-default btn-sm">隐藏</a></td>
              <td><a v-link="{path: '/dashboard/products/edit/' + product.id}" type="button"
                     class="btn btn-default btn-sm">编辑</a>
                <a @click.prevent="remove(product)" type="button" class="btn btn-default btn-sm">删除</a></td>
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
</style>
