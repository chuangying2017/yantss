<template>
  
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
                    <input type="text" class="form-control" v-model="query.start_time">
                  </div>
                </div>
                <div class="form-group">
                  <label for="optionsRadios" class="col-sm-4 control-label">结束时间</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="query.end_time">
                  </div>
                </div>
                <div class="form-group">
                  <label for="optionsRadios" class="col-sm-4 control-label">送奶工</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="query.milkman">
                  </div>
                </div>  
              </div>
              <div class="col-md-4">
              	<div class="form-group">
                  <label for="groupRadios" class="col-sm-4 control-label">星级</label>
                  <div class="col-sm-8">
                    <select class="form-control" v-model="1">
                      <option value="1">一星</option>
                      <option value="2">二星</option>
                      <option value="3">三星</option>
                      <option value="4">四星</option>
                      <option value="5">五星</option>
                    </select>
                  </div>
                </div>
               	<div class="form-group">
                  <label for="groupRadios" class="col-sm-4 control-label">服务部</label>
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
  <ul class="nav nav-tabs" role="tablist">
		<li role="presentation"  class="active">
	  	<a href="#zf" data-toggle="tab" aria-controls="zf" role="tab" @click="milklist">送奶工排行榜</a>
	  </li>
	  <li role="presentation">
	  	<a href="#basic" data-toggle="tab" aria-controls="basic" role="tab" @click="severlist">服务部排行榜</a>
	  </li>      
  </ul>
  <div class="row">
    <div class="col-xs-12">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">订单管理 ({{pagination.total}})</h3>
          
        </div>
        <!-- /.box-header -->
        <div class="tab-content">
        	<div role="tabpanel" class="tab-pane in active" id="zf">
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
        	<!--用户协议-->
          <div role="tabpanel" class="tab-pane fade" id="basic">
             <table class="table table-hover table-striped">
            <tbody>
            <tr>
              <th>NO.11</th>
              <th>用户信息</th>
              <th>订单信息</th>
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
              	<p>订单号：{{order.order_no}}</p>
              	<p>订单金额：{{order.total_amount/100 | currency '￥'}}</p>
              	<p>优惠金额：{{order.discount_amount/100 | currency '￥'}}</p>
              	<p>支付金额：{{order.pay_amount/100 | currency '￥'}}</p>
              	<p>商品名称：<span v-for="shopname in order.skus">{{shopname.name}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></p>
              </td>
              <td>
                <p>名称: {{order['station']['name']}}</p>
                <!--<p>负责人: {{order['station']['director']}}</p>
                <p>电话: {{order['station']['phone']}}</p>-->
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
                <a v-link="{path: '/dashboard/stations/orders/detail/' + order.id}">查看详情 </a>    
              </td>
            </tr>
            </tbody>
          </table>
          </div>
         
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
  import { API_ROOT } from 'src/config'
  import moment from 'moment'
 import Pagination from '../../pagination.vue'
  let tempQuery = false
  let tempPage = 1
  export default {
    name: 'assesslist',
    components: {
      Pagination
    },
    data () {
      return {
        orders: [],
        stations: [],
       
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
          return Promise.all([this.getItems(), api.stations.getAll()]).then(function ([orderData, stations]) {
            var temp = {}
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
            return {
              orders: orderData.data,
              pagination: orderData.meta.pagination,
              stations: stations,
             
              filterStations: temp
            }
          })
        }
      }
    },
    methods: {
    	milklist:function(){
    		var self=this
    		self.tempPage=1
    		self.query = {
          station_id: null,
          residence_id: null,
          phone: null,
          order_no: null,
          status: null,
          start_time: null,
          end_time: null
        }
    		self.search(self.tempPage)
    	},
    	severlist:function(){
    		var self=this
    		self.tempPage=1
    		self.query = {
          station_id: null,
          residence_id: null,
          phone: null,
          order_no: null,
          status: null,
          start_time: null,
          end_time: null
        }
    		self.search(self.tempPage)
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
