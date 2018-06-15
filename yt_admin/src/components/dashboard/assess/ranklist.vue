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
                    <select class="form-control" v-model="score">
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
	              <th>排名</th>
	              <th>送奶工信息</th>
	              <th>服务部信息</th>
	              <th>综合星级评分</th>
	              <th></th>
	            
	            </tr>
	            <tr>
	            <!--<tr v-for="order in orders">-->
	              <td>1</td>
	              
	              <td>
	                
	                <p>汪小平</p>
	                <p>电话：13620812844</p>
	              </td>
	               <td>
	                <p>名称: 昌岗中服务部</p>
	                <p>负责人: 汪小平</p>
	                <p>电话：13620812844</p>
	              </td>
	              <td>
	                <p>
	                	  <div class="star">
						          	<span @click="setStar(1)" :class="{noselct:true"><i class="iconfont" v-if="cont.comments[0].score!=1">&#xe712;</i><i class="iconfont" v-else>&#xe711;</i></span>
						          	<span @click="setStar(2)" :class="{noselct:cont.comments[0].score<2}"><i class="iconfont" v-if="cont.comments[0].score>=2">&#xe711;</i><i class="iconfont" v-else>&#xe712;</i></span>
						          	<span @click="setStar(3)" :class="{noselct:cont.comments[0].score<3}"><i class="iconfont" v-if="cont.comments[0].score>=3">&#xe711;</i><i class="iconfont" v-else>&#xe712;</i></span>
						          	<span @click="setStar(4)" :class="{noselct:cont.comments[0].score<4}"><i class="iconfont" v-if="cont.comments[0].score>=4">&#xe711;</i><i class="iconfont" v-else>&#xe712;</i></span>
						          	<span @click="setStar(5)" :class="{noselct:cont.comments[0].score<5}"><i class="iconfont" v-if="cont.comments[0].score>=5">&#xe711;</i><i class="iconfont" v-else>&#xe712;</i></span>
											</div>
	                </p>
	                <p></p>
	                <p>4.9分</p>
	              </td>
	             
	              <td>
	              	<!--送奶工-->
	                 <a v-link="{path: '/dashboard/assess/staffassdetail/'}">查看详情 </a> 
	              </td>
	            </tr>
	            </tbody>
	          </table>
          </div>
        	<!--服务部排行-->
          <div role="tabpanel" class="tab-pane fade" id="basic">
             <table class="table table-hover table-striped">
            <tbody>
            <tr>
              <th>排名</th>
              <th>服务部信息</th>
              <th>综合星级评分</th>
             
              <th></th>
            </tr>
            <tr v-for="order in orders">
              <td>{{$index + 1}}</td>
              
              <td>
              	<p>名称：昌岗中服务部</p>
              	<p>负责人：方式的萨芬撒</p>
              	<p>电话：1232434324</p>
              	
              </td>
              <td>
                <p>
                	   
	                  <div class="star">
		          	<span @click="setStar(1)" :class="{noselct:true"><i class="iconfont" v-if="cont.comments[0].score!=1">&#xe712;</i><i class="iconfont" v-else>&#xe711;</i></span>
		          	<span @click="setStar(2)" :class="{noselct:cont.comments[0].score<2}"><i class="iconfont" v-if="cont.comments[0].score>=2">&#xe711;</i><i class="iconfont" v-else>&#xe712;</i></span>
		          	<span @click="setStar(3)" :class="{noselct:cont.comments[0].score<3}"><i class="iconfont" v-if="cont.comments[0].score>=3">&#xe711;</i><i class="iconfont" v-else>&#xe712;</i></span>
		          	<span @click="setStar(4)" :class="{noselct:cont.comments[0].score<4}"><i class="iconfont" v-if="cont.comments[0].score>=4">&#xe711;</i><i class="iconfont" v-else>&#xe712;</i></span>
		          	<span @click="setStar(5)" :class="{noselct:cont.comments[0].score<5}"><i class="iconfont" v-if="cont.comments[0].score>=5">&#xe711;</i><i class="iconfont" v-else>&#xe712;</i></span>
						</div>
                </p>
                
                <p>4.9分</p>
              </td>
              
              <td>
                <a v-link="{path: '/dashboard/assess/stationassdetail/' + order.id}">查看详情 </a>    
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
          end_time: null,
          score:5
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
