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
                <!--<div class="form-group">
                  <label for="groupRadios" class="col-sm-4 control-label">星级</label>
                  <div class="col-sm-8">
                    <select class="form-control" v-model="query.score">
                      <option value="1">一星</option>
                      <option value="2">二星</option>
                      <option value="3">三星</option>
                      <option value="4">四星</option>
                      <option value="5">五星</option>
                    </select>
                  </div>
                </div>-->
              </div>
              <div class="col-md-4">
              	
               	<div class="form-group">
                  <label for="groupRadios" class="col-sm-4 control-label">服务部</label>
                  <div class="col-sm-8">
                    <select class="form-control" v-model="sid">
                      <option v-for="station in filterStations" value="{{station.id}}">{{station.name}}</option>
                    </select>
                  </div>
                </div>
                 <div class="form-group">
                  <label for="groupRadios" class="col-sm-4 control-label">送奶工</label>
                  <div class="col-sm-8">
                    <select class="form-control" v-model="query.staff_id">
                      <option v-for="user in users" value="{{user.id}}">{{user.name}}</option>
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
          <h3 class="box-title">评价管理 ({{pagination.total}})</h3>
          
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
	              <th class="text-center">订单数/评价次数</th>
	              <th>综合评论时间</th>
	              <th></th>
	            </tr>
	            
	            <tr v-for="evaluate in evaluates">
	              <td>{{$index+1}}</td>
	              <td>
	                <p>名字：{{evaluate[0].preorders[0].staff.name}}</p>
	                <p>电话：{{evaluate[0].preorders[0].staff.phone}}</p>
	              </td>
	               <td>
	                <p>名称:  {{evaluate[0].preorders[0].station.name}}</p>
	                <p>负责人:{{evaluate[0].preorders[0].station.director}}</p>
	                <p>电话：{{evaluate[0].preorders[0].station.phone}}</p>
	              </td>
	              <td>
	                <p>
	                	  <div class="star">
						          	<span :class="{noselct:evaluate.scores<1}">
						          		<i class="iconfont" v-if="evaluate.scores>=1">&#xe711;</i>
						          		<i class="iconfont" v-else>&#xe712;</i>
						          	</span>
						          	<span :class="{noselct:evaluate.scores<=1}">
						          		<i class="iconfont" v-if="evaluate.scores==2">&#xe711;</i>
						          		<span v-else>
						          			<i class="iconfont" v-if='evaluate.scores>=3'>&#xe711;</i>
						          			<i class="iconfont" v-else>&#xe712;</i>
						          		</span>
						          	</span>
						          	<span :class="{noselct:evaluate.scores<=2}">
						          		<i class="iconfont" v-if="evaluate.scores==3">&#xe711;</i>
						          		<span v-else>
						          				<i class="iconfont" v-if='3<evaluate.scores&&evaluate.scores<4'>&#xe711;</i>
								          		<span v-else>
								          			<i class="iconfont" v-if='evaluate.scores>=4'>&#xe711;</i>
								          			<i class="iconfont" v-else>&#xe712;</i>
								          		</span>
						          		</span>
						          	</span>
						          	<span :class="{noselct:evaluate.scores<=3}">
						          		<i class="iconfont" v-if="evaluate.scores==4">&#xe711;</i>
						          		<span v-else>
						          				<i class="iconfont" v-if='4<evaluate.scores&&evaluate.scores<5'>&#xe711;</i>
								          		<span v-else>
								          			<i class="iconfont" v-if='evaluate.scores>=5'>&#xe711;</i>
								          			<i class="iconfont" v-else>&#xe712;</i>
								          		</span>
						          		</span>
						          	</span>
						          	<span :class="{noselct:evaluate.scores<=4}">
						          		<i class="iconfont" v-if="evaluate.scores==5">&#xe711;</i>
						          		<span v-else>
						          			<i class="iconfont" v-if='4<evaluate.scores&&evaluate.scores<5'>&#xe713;</i>
						          			<i class="iconfont" v-else>&#xe712;</i>
						          		</span>
						          	</span>
							         	
											</div>
	                </p>
	               
	                <p>{{evaluate.scores|starf}}分</p>
	              </td>
	              <td class="text-center">
	             		{{evaluate.total_order}}/{{evaluate.have_comments_number}}
	              </td>
	             <td>
	             	{{showstartime}}-{{showendtime}}
	             </td>
	              <td>
	              	<!--送奶工-->
	                 <!--<a v-link="{path: '/dashboard/assess/staffassdetail/'+evaluate[0].preorders[0].staff.id}">查看详情 </a>--> 
	                 <span @click="gostaff(evaluate[0].preorders[0].staff.id)">查看详情</span>
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
              <th class="text-center">订单数/评价次数</th>
	            <th>综合评论时间</th>
              <th></th>
            </tr>
            
            <tr v-for="evaluate in evaluates">
              <td>{{$index+1}}</td>
              
              <td>
              	<p>名称：{{evaluate[0].preorders[0].station.name}}</p>
              	<p>负责人：{{evaluate[0].preorders[0].station.director}}</p>
              	<p>电话：{{evaluate[0].preorders[0].station.phone}}</p>
              	
              </td>
              <td>
                <p>
                	 <div class="star">
						          	<span :class="{noselct:evaluate.scores<1}">
						          		<i class="iconfont" v-if="evaluate.scores>=1">&#xe711;</i>
						          		<i class="iconfont" v-else>&#xe712;</i>
						          	</span>
						          	<span :class="{noselct:evaluate.scores<=1}">
						          		<i class="iconfont" v-if="evaluate.scores==2">&#xe711;</i>
						          		<span v-else>
						          			<i class="iconfont" v-if='evaluate.scores>=3'>&#xe711;</i>
						          			<i class="iconfont" v-else>&#xe712;</i>
						          		</span>
						          	</span>
						          	<span :class="{noselct:evaluate.scores<=2}">
						          		<i class="iconfont" v-if="evaluate.scores==3">&#xe711;</i>
						          		<span v-else>
						          				<i class="iconfont" v-if='3<evaluate.scores&&evaluate.scores<4'>&#xe711;</i>
								          		<span v-else>
								          			<i class="iconfont" v-if='evaluate.scores>=4'>&#xe711;</i>
								          			<i class="iconfont" v-else>&#xe712;</i>
								          		</span>
						          		</span>
						          	</span>
						          	<span :class="{noselct:evaluate.scores<=3}">
						          		<i class="iconfont" v-if="evaluate.scores==4">&#xe711;</i>
						          		<span v-else>
						          				<i class="iconfont" v-if='4<evaluate.scores&&evaluate.scores<5'>&#xe711;</i>
								          		<span v-else>
								          			<i class="iconfont" v-if='evaluate.scores>=5'>&#xe711;</i>
								          			<i class="iconfont" v-else>&#xe712;</i>
								          		</span>
						          		</span>
						          	</span>
						          	<span :class="{noselct:evaluate.scores<=4}">
						          		<i class="iconfont" v-if="evaluate.scores==5">&#xe711;</i>
						          		<span v-else>
						          			<i class="iconfont" v-if='4<evaluate.scores&&evaluate.scores<5'>&#xe713;</i>
						          			<i class="iconfont" v-else>&#xe712;</i>
						          		</span>
						          	</span>
							         	
											</div>
                </p>
                
                <p>{{evaluate.scores|starf}}分</p>
              </td>
              <td class="text-center">
	             		{{evaluate.total_order}}/{{evaluate.have_comments_number}}
	            </td>
	            <td>
	             	{{showstartime}}-{{showendtime}}
	            </td>
              <td>
                <!--<a v-link="{path: '/dashboard/assess/stationassdetail/'+evaluate[0].preorders[0].station.id}">查看详情 </a>-->    
                <span @click="gostation(evaluate[0].preorders[0].station.id)">查看详情</span>
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
      	evaluates:[],
        stations: [],
        filterStations: [],
        newStation: 'no',
        pagination: {},
        users:[],
        sid:null,
        showstartime:null,
        showendtime:null,
        query: {
        	type_role:'staff_id',
          start_time: null,
          end_time: null,
         	station_id: null,
          staff_id:null,
 				  score:null
        }
      }
    },
    route: {
      data () {
      	var self=this
        if (tempQuery) {
          this.query = tempQuery
          return this.search(tempPage)
        } else {
        	
        	this.query.start_time=moment().format('YYYY-MM-01')
        	this.showstartime=this.query.start_time
        	this.showendtime="至今"
          return Promise.all([api.assess.getstation(),this.getItems({start_time:this.query.start_time,type_role:'staff_id'})]).then(function ([stations,assessData]) {
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
            self.filterStations=temp;
            return {
              filterStations: temp,
            	evaluates:assessData.result,
            	pagination: assessData.paging,
             
            }
          })
        }
      }
    },
    watch:{
    	sid(val,oldVal){
    		var self=this
    		self.query.station_id=val
    		self.users=[]
        self.users=self.filterStations[val].staffs
    	}
    },
    methods: {
    	gostaff:function(staffid){
    		var self=this;
    		self.$router.go({name:'staffassdetail',query:{type_role:self.query.type_role, start_time:self.query.start_time, end_time:self.query.end_time, station_id:self.query.station_id,staff_id:self.query.staff_id,staff_id:staffid}});
    	},
    	gostation:function(stationid){
    		var self=this;
    		self.$router.go({name:'stationassdetail',query:{type_role:self.query.type_role, start_time:self.query.start_time, end_time:self.query.end_time, station_id:self.query.station_id,staff_id:self.query.staff_id,station_id:stationid}});
    	},
    	milklist:function(){
    		var self=this
    		self.tempPage=1
    		self.sid=null
        
    		self.query = {
    			type_role:'staff_id',
          start_time: null,
          end_time: null,
         	station_id: null,
          staff_id:null,
 				  score:null
        }
    		self.query.start_time=moment().format('YYYY-MM-01')
    		self.search(self.tempPage)
    	},
    	severlist:function(){
    		var self=this
    		self.tempPage=1
    		self.sid=null
    		
    		self.query = {
    			type_role:'station_id',
          start_time: null,
          end_time: null,
         	station_id: null,
          staff_id:null,
 				  score:null
        }
    		self.query.start_time=moment().format('YYYY-MM-01')
    		self.search(self.tempPage)
    	},    
      getItems: function (query = {}) {
        if (!query.station_id && window._user.roles.indexOf('StationContact') > -1) {
          query.station_id = window._user.associateStations
        }
        query.seniority=1
        return api.assess.getalgetcont(query)
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
         this.showstartime=this.query.start_time
        this.showendtime=this.query.end_time==null?"至今":this.query.end_time
        this.getItems(this.getQuery(page)).then(function (data) {
        
          self.pagination = data.paging,
          self.evaluates = data.result
          
        })
      },
      reset: function () {
        this.query = {
          start_time: null,
          end_time: null,
         	station_id: null,
          staff_id:null,
 				  score:null
        }
      },
      select: function (format, week = false) {
        if (week) {
        	
          this.query.start_time = moment().startOf('week').add(1, 'day').format(format)
          console.log(  this.query.start_time)
          
        } else {
        	
          this.query.start_time = moment().format(format)
          console.log( this.query.start_time)
         
        }
        this.query.end_time=null
        this.showstartime=this.query.start_time
        this.showendtime="至今"
        this.search()
      }
    }
  }
</script>
<style>
  @font-face {
	  font-family: 'iconfont';  /* project id 686760 */
	  src: url('//at.alicdn.com/t/font_686760_716gqcjnhla.eot');
	  src: url('//at.alicdn.com/t/font_686760_716gqcjnhla.eot?#iefix') format('embedded-opentype'),
	  url('//at.alicdn.com/t/font_686760_716gqcjnhla.woff') format('woff'),
	  url('//at.alicdn.com/t/font_686760_716gqcjnhla.ttf') format('truetype'),
	  url('//at.alicdn.com/t/font_686760_716gqcjnhla.svg#iconfont') format('svg');
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
   .star span i{color:#ffbb2a}
  .star .noselct i{color:#999}
   .star .parselct i{color:#d0ac5b}

</style>
