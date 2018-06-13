<template>
	<div class="m-user m-user-alert" v-show="!$loadingRouteData">
		<ul>
			<!--<li class="user-list">-->
			<!--<a v-link="{ path: '/station/rank' }"><i class="iconfont">&#xe669;</i> 查看服务部排行榜 <i class="iconfont">-->
			<!--&#xe669;</i></a>-->
			<!--</li>-->
			<li class="user-list">
				<a>
					<p><i class="iconfont">&#xe65d;</i> {{station.name}}</p>
				</a>
			</li>
			<li class="user-list">
				<a>
					<!--<p><i class="iconfont">&#xe669;</i> {{station.name}}KPI <i class="iconfont">&#xe669;</i></p><br>-->
					<!--<p class="clearfix"><span class="fl">已完成指标</span><span class="fr">{{station.counter.user_count_kpi}}</span>-->
					<!--</p>-->
					<!--<p class="clearfix"><span class="fl">当月指标</span><span class="fr">{{station.counter.user_count}}</span>-->
					<!--</p>-->
					<p class="clearfix"><span class="fl">已完成指标/当月指标</span><span class="fr">{{station.counter.user_count}}/{{station.counter.user_count_kpi}}</span>
					</p>
			</li>
		</ul>
	</div>
	<div class="tab-content">
		<div class="tab1">
			<!-- <div class="m-tabs">
        <ul class="clearfix">
          <li><a href="#" class="active1 item item1">全部</a></li>
          <li><a href="#"  class="item item1">暂未处理</a></li>
          <li><a href="#" class="item item1">正常状态</a></li>
          <li><a href="#" class="item item1">余额不足</a></li>
        </ul>
      </div> -->
			<div class="u-table" v-show="!$loadingRouteData">
				<div class="status clearfix">
					<span class="fl">
            当前共 {{subscribes.length}} 条数据
          </span>
					
						
					<a :href="downurl" class="fr importbtn">
						<i class="iconfont">&#xe639;</i>导出
					</a>
					<a class="fr" @click.prevent="renewData">
						<i class="iconfont">&#xe64b;</i> 刷新数据
					</a>
					

				</div>
				<div class="u-tab">
					<div class="pure-g">
						<div class="pure-u-1-2">
							<a v-link="{ path: '/station/subscribes/list/all' }" :class="[$route.params.status === 'all' ? 'active' : '']">
								<!--<i class="iconfont">&#xe639;</i>-->所有订单
							</a>
						</div>
						<div class="pure-u-1-2">
							<a v-link="{ path: '/station/subscribes/list/shipping' }" :class="[$route.params.status === 'shipping' ? 'active' : '']">
								<!--<i class="iconfont">&#xe639;</i>-->配送中订单
							</a>
						</div>
						<div class="pure-u-1-2">
							<a v-link="{ path: '/station/subscribes/list/assigning' }" :class="[$route.params.status === 'assigning' ? 'active' : '']">
								<!--<i class="iconfont">&#xe65b;</i>-->未处理订单
							</a>
						</div>
					</div>
				</div>

				<table width="100%" class="pure-table pure-table-bordered" v-show="!renew && subscribes.length">
					<thead>
						<tr>
							<th>用户地址</th>
							<th>状态</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						<tr is="SubsItem" v-for="subscribe in subscribes" :item="subscribe"></tr>
					</tbody>
				</table>

			</div>
		</div>
	</div>
	<loader v-show="$loadingRouteData || renew"></loader>
	<!--<Page v-show="!$loadingRouteData" :currentPage="currentPage" totalPages="totalPages"></Page>-->
	<div class="pagelist" v-show="!$loadingRouteData&&subscribes.length!=0">
		<ul>
			<li class="pre" :show="currentPage!=1" @click="pre()">上一页</li>
			<li>
				<i v-if="status==''">{{allcurrentPage}}</i>
				<i v-if="status=='shipping'">{{shippingcurrentPage}}</i>
				<i v-if="status=='assigning'">{{assigningcurrentPage}}</i>

			</li>
			<li class="next" :show="totalPages!=currentPage" @click="next()">下一页</li>
		</ul>
		<input type="number" value="1" v-model="inputNum" /><i @click="go(inputNum)">Go</i>
	</div>
	<!--<button class="ios-btn ios-btn-success" @click.prevent="loadmore"
          v-show="currentPage !== totalPages && subscribes.length && !$loadingRouteData"
          :disabled="processing">
    <span v-show="!processing">加载更多</span>
    <span v-show="processing">正在处理中...</span>
  </button>-->
	<empty v-show="!$loadingRouteData && !subscribes.length" icon="&#xe651;">
		当前没有任何订单
	</empty>
	<!--<refresh></refresh>-->
	<!-- <h1>订奶订单页</h1>
  <table>
    <tr>
      <td>用户</td>
      <td>状态</td>
      <td>操作</td>
    </tr>
    <tr is="SubsItem" v-for="subscribe in subscribes" :item="subscribe"></tr>
  </table> -->
</template>

<script>
	import SubsItem from './subsItem.vue'
	import Empty from './../Share/empty.vue'
	import Refresh from './../Share/refresh.vue'
	import Loader from './../Share/loader.vue'
	import { API_ROOT } from 'src/config'
	export default {
		name: 'Subscribe',
		components: {
			SubsItem,
			Empty,
			Refresh,
			Loader
		},

		data: function() {
			return {
				subscribes: [],
				allcurrentPage: 1, //全部订单
				assigningcurrentPage: 1, //未处理订单
				shippingcurrentPage: 1, //配送中订单
				status: '',
				totalPages: null,
				processing: false,
				renew: false,
				inputNum: 1,
				station: null,
				downurl:null,
			}
		},
		
		route: {
			data: function(transition) {
				var cpage
				var self = this
				self.status = this.$route.params.status === 'all' ? '' : this.$route.params.status
				var tokenstr = window.localStorage.getItem('jwt-token')
		        var str = '?token='+tokenstr
		        
		        self.downurl=API_ROOT + '/stations/fetchall/'+self.status + str
				if(self.status == '') {
					cpage = self.allcurrentPage
				} else if(self.status == 'shipping') {
					cpage = self.shippingcurrentPage
				} else if(self.status == 'assigning') {
					cpage = self.assigningcurrentPage
				}
				var requestUrl
				if(cpage == null) {
					requestUrl = '/stations/preorders?status=' + self.status
				} else {
					requestUrl = '/stations/preorders?status=' + self.status + '&page=' + cpage
				}
				return Promise.all([
					self.$http.get('/stations/info'),
					self.$http.get(requestUrl)
				]).then(
					function([{
						data: {
							data: station
						}
					}, data]) {
						if(self.status == '') {
							self.allcurrentPage = data.data.meta.pagination.current_page
						} else if(self.status == 'shipping') {
							self.shippingcurrentPage = data.data.meta.pagination.current_page
						} else if(self.status == 'assigning') {
							self.assigningcurrentPage = data.data.meta.pagination.current_page
						}
						return {
							station: station,
							subscribes: data.data.data,
							//            currentPage: data.data.meta.pagination.current_page,
							totalPages: data.data.meta.pagination.total_pages
						}
					},
					function(data) {
						return {
							subscribes: []
						}
					}
				)
			}
		},

		methods: {
			exports: function () {
			
				window.location.href = this.downurl; 


		    },
			pre() {
				var self = this
				var page
				if(self.status == '' && 1 >= self.allcurrentPage) {
					return
				}
				if(self.status == 'shipping' && 1 >= self.shippingcurrentPage) {
					return
				}
				if(self.status == 'assigning' && 1 >= self.assigningcurrentPage) {
					return
				}

				if(self.status == '') {
					page = self.allcurrentPage
				} else if(self.status == 'shipping') {
					page = self.shippingcurrentPage
				} else if(self.status == 'assigning') {
					page = self.assigningcurrentPage
				}
				self.processing = true
				this.$http.get('/stations/preorders?status=' + self.status + '&page=' + (page - 1)).then(
					function(data) {
						if(self.status == '') {
							self.allcurrentPage = data.data.meta.pagination.current_page
						} else if(self.status == 'shipping') {
							self.shippingcurrentPage = data.data.meta.pagination.current_page
						} else if(self.status == 'assigning') {
							self.assigningcurrentPage = data.data.meta.pagination.current_page
						}
						self.subscribes = data.data.data
						
						self.processing = false
					},
					function(data) {
						self.processing = false
					}
				)
			},
			next() {

				var self = this
				var page
				if(self.status == '' && self.allcurrentPage > self.totalPages) {
					return
				}
				if(self.status == 'shipping' && self.shippingcurrentPage > self.totalPages) {
					return
				}
				if(self.status == 'assigning' && self.assigningcurrentPage > self.totalPages) {
					return
				}

				if(self.status == '') {
					page = self.allcurrentPage
				} else if(self.status == 'shipping') {
					page = self.shippingcurrentPage
				} else if(self.status == 'assigning') {
					page = self.assigningcurrentPage
				}

				self.processing = true

				this.$http.get('/stations/preorders?status=' + self.status + '&page=' + (page + 1)).then(
					function(data) {
						if(self.status == '') {
							self.allcurrentPage = data.data.meta.pagination.current_page
						} else if(self.status == 'shipping') {
							self.shippingcurrentPage = data.data.meta.pagination.current_page
						} else if(self.status == 'assigning') {
							self.assigningcurrentPage = data.data.meta.pagination.current_page
						}
						self.subscribes = data.data.data						
						self.processing = false
					},
					function(data) {
						self.processing = false
					}
				)
			},
			go(goNum) {
				var self = this
				var page
				if(self.status == '' && (0 > goNum || goNum > self.totalPages)) {
					alert("最多页数" + self.totalPages)
					return
				} else if(self.status == 'shipping' && (0 > goNum || goNum > self.totalPages)) {
					alert("最多页数" + self.totalPages)
					return
				} else if(self.status == 'assigning' && (0 > goNum || goNum > self.totalPages)) {
					alert("最多页数" + self.totalPages)
					return
				}
				if(self.status == '') {
					page = self.allcurrentPage
				} else if(self.status == 'shipping') {
					page = self.shippingcurrentPage
				} else if(self.status == 'assigning') {
					page = self.assigningcurrentPage
				}

				self.processing = true
				this.$http.get('/stations/preorders?status=' + self.status + '&page=' + goNum).then(
					function(data) {
						if(self.status == '') {
							self.allcurrentPage = data.data.meta.pagination.current_page
						} else if(self.status == 'shipping') {
							self.shippingcurrentPage = data.data.meta.pagination.current_page
						} else if(self.status == 'assigning') {
							self.assigningcurrentPage = data.data.meta.pagination.current_page
						}
						self.subscribes = data.data.data

						self.processing = false

					},
					function(data) {
						self.processing = false
					}
				)
			},
			renewData: function() {
				var self = this
				self.status = this.$route.params.status === 'all' ? '' : this.$route.params.status
				self.renew = true
				self.$http.get('/stations/preorders?status=' + self.status).then(
					function(data) {
						self.allcurrentPage = 1
						self.shippingcurrentPage = 1
						self.assigningcurrentPage = 1
						self.renew = false
						self.subscribes = data.data.data
						// self.currentPage = data.data.meta.pagination.current_page
						self.totalPages = data.data.meta.pagination.total_pages
					},
					function(data) {
						return {
							subscribes: []
						}
					}
				)
			}
		}
	}
</script>

<style scoped>
	.pure-u-1-2 {
		width: 33.3%;
		border-right: 1px solid #25AD25;
	}
	.pure-u-1-2:last-child{
		border:none
	}
	#importData {
		margin-left: 1rem
	}
	
	.u-table {
		margin: 1rem;
		font-size: 1.4rem;
	}
	
	.u-table table {
		background: #fff;
		text-align: center;
	}
	
	.u-table thead th {
		text-align: center;
	}
	
	.ios-btn {
		display: block;
		-webkit-appearance: none;
		border-right: 0 none;
		border-left: 0 none;
		outline: none;
		width: 100%;
		padding: 1rem;
		border-top: 1px solid #ddd;
		border-bottom: 1px solid #ddd;
		background: #fff;
		font-size: 1.4rem;
		color: #25AD25;
		text-align: center;
	}
	
	.ios-btn:disabled {
		color: #bbb;
	}
	
	.status {
		margin: 0 .5rem 1rem;
	}
	
	.status a {
		color: #25AD25;
	}
	
	.u-tab {
		margin: 1rem 0;
		text-align: center;
		border: 1px solid #25AD25;
		border-radius: 3px;
	}
	
	.u-tab a {
		display: block;
		padding: .5rem;
		font-size: 1.4rem;
		color: #25AD25;
		background: #fff;
	}
	
	.u-tab a.active {
		background: #25AD25;
		color: #fff;
	}
	
	.m-user.m-user-alert {
		padding: 1rem;
		background: transparent;
	}
	
	.m-user.m-user-alert .user-list a {
		color: #ff9f29;
		/*background: #ff9f29; !* For browsers that do not support gradients *!*/
		/*background: -webkit-linear-gradient(#ffd757, #ff9f29); !* For Safari 5.1 to 6.0 *!*/
		/*background: -o-linear-gradient(#ffd757, #ff9f29); !* For Opera 11.1 to 12.0 *!*/
		/*background: -moz-linear-gradient(#ffd757, #ff9f29); !* For Firefox 3.6 to 15 *!*/
		/*background: linear-gradient(#ffd757, #ff9f29); !* Standard syntax *!*/
		background: #fff;
		text-align: center;
		border-radius: .3rem;
		border: 1px dashed #ff9f29;
	}
	
	.m-user.m-user-alert .user-list a .iconfont {
		float: none;
		color: #ff9f29;
		-webkit-font-smoothing: antialiased;
	}
	/**/
	
	.pagelist {
		text-align: center;
	}
	
	.pagelist ul {
		clear: both;
		display: inline-block;
		vertical-align: middle;
	}
	
	.pagelist li {
		float: left;
		float: left;
		width: 27px;
		border: 1px solid #968f2f;
		height: 27px;
		text-align: center;
		color: #a3a49d;
		line-height: 27px;
		margin-left: 10px;
		border-radius: 3px;
	}
	
	.pagelist .pre,
	.pagelist .next {
		width: 53px;
	}
	
	.pagelist input {
		width: 66px;
		height: 27px;
		display: inline-block;
		vertical-align: middle;
		margin-left: 10px;
		margin-right: 10px;
		outline: none;
		border: 1px solid #968f2f;
		border-radius: 3px;
		text-align: center;
	}
	
	.pagelist i {
		/*display: inline-block;*/
		font-style: normal;
		padding: 7px;
		cursor: pointer;
	}
	.importbtn{
		margin-left:15px
	}
</style>