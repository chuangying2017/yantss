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
                  <label for="optionsRadios" class="col-sm-4 control-label">用户手机</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="query.phone">
                  </div>
                </div>
                <div class="form-group">
                  <label for="groupRadios" class="col-sm-4 control-label">评论状态</label>
                  <div class="col-sm-8">
                    <select class="form-control" v-model="query.commentType">
                      <option :value="'HaveUses'">评论</option>
                      <option :value="'ToBeUsed'">待评论</option>
                      <option :value="'Additional'">追评</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group">
                  <label for="groupRadios" class="col-sm-4 control-label">订单号</label>
                  <div class="col-sm-8">
                  	 <input type="tel" class="form-control" v-model="query.order_no">
                  </div>
                </div>
                <div class="form-group">
                  <label for="groupRadios" class="col-sm-4 control-label">所属服务部</label>
                  <div class="col-sm-8">
                    <select class="form-control" v-model="sid">
                      <option v-for="stata in filterStations" :value="stata.id">{{stata.name}}</option>
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
                <div class="form-group">
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
          <h3 class="box-title">用户评价列表 ({{pagination.total}})</h3>
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
	              <th>追加评论</th>
	              <th>评价时间</th>
	            </tr>
	            <tr>
	            <tr v-for="evaluate in evaluates">
	              <td>{{$index+1}}</td>
	              <td width="25%">
	                <p>{{evaluate.preorders[0].name}} - {{evaluate.preorders[0].phone}}</p>
	                <p>{{evaluate.preorders[0].address}}</p>
	                <p>订单号: {{evaluate.preorders[0].order_no}}</p>
	              </td>
	              <td>
	                <p>名称: {{evaluate.preorders[0].station.name}}</p>
	                <p>负责人: {{evaluate.preorders[0].station.director}}</p>
	                <p>电话：{{evaluate.preorders[0].station.phone}}</p>
	              </td>
	              <td>
	                <p></p>
	                <p>{{evaluate.preorders[0].staff.name}}</p>
	                <p>电话: {{evaluate.preorders[0].staff.phone}}</p>
	              </td>
	              <td v-if="evaluate.comment_type=='ToBeUsed'">
	              	<p></p>
	              	待评论
	              </td>
	              <td v-else>
	                <p class="all">
	                  <div class="star">
					          	<span :class="{noselct:evaluate.score<1}"><i class="iconfont" v-if="evaluate.score>=1">&#xe711;</i><i class="iconfont" v-else>&#xe712;</i></span>
					          	<span :class="{noselct:evaluate.score<2}"><i class="iconfont" v-if="evaluate.score>=2">&#xe711;</i><i class="iconfont" v-else>&#xe712;</i></span>
					          	<span :class="{noselct:evaluate.score<3}"><i class="iconfont" v-if="evaluate.score>=3">&#xe711;</i><i class="iconfont" v-else>&#xe712;</i></span>
					          	<span :class="{noselct:evaluate.score<4}"><i class="iconfont" v-if="evaluate.score>=4">&#xe711;</i><i class="iconfont" v-else>&#xe712;</i></span>
					          	<span :class="{noselct:evaluate.score<5}"><i class="iconfont" v-if="evaluate.score>=5">&#xe711;</i><i class="iconfont" v-else>&#xe712;</i></span>
										</div>
	                  {{evaluate.content}}
	                </p>
	                <p class="tag">评价标签: <i v-for="tag in evaluate.comment_label">{{tag}}&nbsp;&nbsp;</i></p>
	                <p></p>
	              </td>
	              <td>
	              	{{evaluate.additionComment==0?"":evaluate.additionComment}}
	              </td>
	              <td>
	                <p></p>
	                <p>{{evaluate.updated_at.date|date}}</p>
	                <p></p>
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
<style scoped="">
	@font-face {
	  font-family: 'iconfont';  /* project id 686760 */
	  src: url('//at.alicdn.com/t/font_686760_c2gf0itspyfd2t9.eot');
	  src: url('//at.alicdn.com/t/font_686760_c2gf0itspyfd2t9.eot?#iefix') format('embedded-opentype'),
	  url('//at.alicdn.com/t/font_686760_c2gf0itspyfd2t9.woff') format('woff'),
	  url('//at.alicdn.com/t/font_686760_c2gf0itspyfd2t9.ttf') format('truetype'),
	  url('//at.alicdn.com/t/font_686760_c2gf0itspyfd2t9.svg#iconfont') format('svg');
  }
  .iconfont {
    font-family: "iconfont";
    font-size: 2.5rem;
    font-style: normal;
  }
  .tag i{font-style: normal;}
   .star span i{color:#ffbb2a}
  .star .noselct i{color:#999}
</style>
<script>
  import api from 'api/index.js'
  import Pagination from 'components/pagination.vue'
  import { API_ROOT } from 'src/config'
  import moment from 'moment'
  
  let tempQuery = false
  let tempPage = 1
  export default {
    name: 'ListStationOrders',
    components: {
      Pagination,
      
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
        evaluates: [],
        stations: [],
				users:[],
        filterStations: [],
        newStation: 'no',
        pagination: {},
        sid:null,
        query: {
        	commentType:"",
        	start_time: null,
          end_time: null,
          phone: null,
          order_no: null,
         	station_id: null,
          staff_id:null,
 				  score:null
        }
      }
    },
    route: {
      data () {
      	var self = this
        if (tempQuery) {
          this.query = tempQuery
          return this.search(tempPage)
        } else {
          return Promise.all([api.assess.getstation(),this.getItems()]).then(function ([stations,assessData]) {
          	console.log(assessData)
            var temp = {}
            if (window._user.roles.indexOf('StationContact') > -1) {
              var associateStations = window._user.associateStations.split(',')
           
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
            	 evaluates:assessData.data,
//            orders: orderData.data,
            pagination: assessData.meta.pagination,
//            stations: stations,
             
//              stationsObj: stationsObj,
             
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
      	 var self = this
//    	console.log(self.query.assstate)
        tempQuery = this.query
        tempPage = page
       
        this.getItems(this.getQuery(page)).then(function (data) {
        self.pagination = data.meta.pagination
          self.evaluates = data.data
          
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

