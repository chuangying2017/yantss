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
                  <label for="optionsRadios" class="col-sm-4 control-label">开始时间</label>
                  <div class="col-sm-8">
                    <input type="date" class="form-control" v-model="query.stime">
                  </div>
                </div>
                <div class="form-group">
                  <label for="optionsRadios" class="col-sm-4 control-label">结束时间</label>
                  <div class="col-sm-8">
                    <input type="date" class="form-control" v-model="query.etime">
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
                  <label for="groupRadios" class="col-sm-4 control-label">订单号</label>
                  <div class="col-sm-8">
                    <select class="form-control" v-model="query.order_no">
                      <option value="0">未使用</option>
                      <option value="1">已使用</option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <label for="groupRadios" class="col-sm-4 control-label">所属服务部</label>
                  <div class="col-sm-8">
                    <select class="form-control" v-model="query.station_id">
                      <option v-for="station in filterStations" value="{{station.id}}">{{station.name}}</option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <label for="groupRadios" class="col-sm-4 control-label">送奶工</label>
                  <div class="col-sm-8">
                    <select class="form-control" v-model="query.station_id">
                      <option v-for="station in filterStations" value="{{station.id}}">{{station.name}}</option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <label for="groupRadios" class="col-sm-4 control-label">星级</label>
                  <div class="col-sm-8">
                    <select class="form-control" v-model="query.station_id">
                      <option v-for="station in filterStations" value="{{station.id}}">{{station.name}}</option>
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
          <h3 class="box-title">评价列表</h3>
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
              <th>送奶工信息</th>
              <th>评价内容</th>
              <th>评价时间</th>
            </tr>
            <tr>
            <!--<tr v-for="order in orders">-->
              <td>1</td>
              <td width="25%">
                <p>谢小姐 - 13822282671</p>
                <p>海珠区南泰路珠江医院宿舍39栋A2202</p>
                <p>订单号: 108180124846733705788</p>
              </td>
              <td>
                <p>名称: 昌岗中服务部</p>
                <p>负责人: 汪小平</p>
                <p>电话：13620812844</p>
              </td>
              <td>
                <p></p>
                <p>汪小平</p>
                <p>电话: 13620812844</p>
              </td>
              <td>
                <p class="all">
                  <input type="radio" name="b" value="0"  v-model="inputdata" disabled/>
                  <span><i class="iconfont">&#xe72a;</i></span>
                  <input type="radio" name="b" value="1" v-model="inputdata" disabled/>
                  <span><i class="iconfont">&#xe72a;</i></span>
                  <input type="radio" name="b" value="2" v-model="inputdata" disabled/>
                  <span><i class="iconfont">&#xe72a;</i></span>
                  <input type="radio" name="b" value="3" v-model="inputdata" disabled/>
                  <span><i class="iconfont">&#xe72a;</i></span>
                  <input type="radio" name="b" value="4" v-model="inputdata" disabled/>
                  <span><i class="iconfont">&#xe72a;</i></span>
                  <input type="radio" name="b" value="5" v-model="inputdata" disabled/>
                  <span><i class="iconfont">&#xe72a;</i></span>
                  比较满意，但仍可改善
                </p>
                <p class="tag">评价标签: 态度好、送奶准时、有礼貌,送奶服务很好，送奶时间很准确，下次还会继续选择</p>
                <p></p>
              </td>
              <td>
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
    name: 'assesslist',
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
        inputdata: '4',
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
  @font-face {
    font-family: 'iconfont';  /* project id 552280 */
    src: url('//at.alicdn.com/t/font_552280_gxxpzcu4xx39pb9.eot');
    src: url('//at.alicdn.com/t/font_552280_gxxpzcu4xx39pb9.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_552280_gxxpzcu4xx39pb9.woff') format('woff'),
    url('//at.alicdn.com/t/font_552280_gxxpzcu4xx39pb9.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_552280_gxxpzcu4xx39pb9.svg#iconfont') format('svg');
  }
  .iconfont {
    font-family: "iconfont";
    font-size: 2rem;
    font-style: normal;
  }
  .all>input{opacity:0;position:absolute;}
  .all>input:nth-of-type(1),
  .all>span:nth-of-type(1){display:none;}
  .all>span{color:gold;
    -webkit-transition:color .2s;
    transition:color .2s;
  }
  .all>input:checked~span{color:#666;}
  .all>input:checked+span{color:gold;}
  .tag{
    width: 300px;
    flex-wrap: wrap;
  }
</style>

