<template>
	<div class="m-user m-user-alert">
		<ul>
			<li class="user-list">
				<a>
					<div class="select-wrap">
				      <div class="pure-g contentC">
				        <div class="selectC">
				     		<span>天平架服务部</span>
				        </div>
				        <!--<div class="white20"></div>-->
				        <div class="dateC">
				        	<input @change="changeDate" style="padding-left:0.2rem" type="date" @change="changeDate" v-model="start_time"/>
				        	<span class="to">至</span>
				        	<input @change="changeDate" type="date" @change="changeDate" v-model="end_time"/><i class="iconfont iconC">&#xe658;</i></div>
				      </div>
		    		</div>
				</a>
			</li>
			
		</ul>

	</div>
	<div class="m-user m-user-alert" v-show="!$loadingRouteData&&datas.length">
		<ul>
			
			<li class="user-list">
				<a>
					<p class="clearfix">
						<span class="fl">{{start_time}}至{{end_time}}综合排名</span>
						<span class="fr">第{{showdata.ranking}}名</span>
					</p>
				</a>
			</li>
			<li class="user-list">
				<a class="notopbor">
					<p class="clearfix">
						<span class="fl">当月均分/评价次数</span>
						<span class="fr">{{showdata.scores}}/{{showdata.have_comments_number}}</span>
					</p>
				</a>
			</li>
		</ul>
		
			<div class="tab1">
				<table width="100%" class="pure-table pure-table-bordered">
			        <thead>
			        <tr>
			          <th>评价时间</th>
			          <th>评价内容</th>
			        </tr>
			        </thead>
			        <tbody>
				        <tr v-if="staff.comment_type=='HaveUses'||staff.comment_type=='Additional'" v-for="staff in datas">
				          <td>{{staff.created_at}}</td>
				          <td>
				          	<div class="star">
					          	<span @click="setStar(1)" :class="{noselct:staff.score<1}"><i class="iconfont" v-if="staff.score>=1">&#xe711;</i><i class="iconfont" v-else>&#xe712;</i></span>
					          	<span @click="setStar(2)" :class="{noselct:staff.score<2}"><i class="iconfont" v-if="staff.score>=2">&#xe711;</i><i class="iconfont" v-else>&#xe712;</i></span>
					          	<span @click="setStar(3)" :class="{noselct:staff.score<3}"><i class="iconfont" v-if="staff.score>=3">&#xe711;</i><i class="iconfont" v-else>&#xe712;</i></span>
					          	<span @click="setStar(4)" :class="{noselct:staff.score<4}"><i class="iconfont" v-if="staff.score>=4">&#xe711;</i><i class="iconfont" v-else>&#xe712;</i></span>
					          	<span @click="setStar(5)" :class="{noselct:staff.score<5}"><i class="iconfont" v-if="staff.score>=5">&#xe711;</i><i class="iconfont" v-else>&#xe712;</i></span>
							</div>
				          	<i v-if="staff.content||staff.content!=''">评价：{{staff.content}}</i>
         					<br />
     						<i v-if="staff.additional_comments!=0">追评：{{staff.additional_comments}}</i>
				          </td>
				        </tr> 
			        </tbody>
			      </table>
			</div>

	</div>
	
	<loader v-show="$loadingRouteData"></loader>

	<div class="msg" v-show="!$loadingRouteData&& !datas" icon="&#xe651;">
		{{start_time}}至{{end_time}}没有任何评价
	</div>
	<div class="pagelist" v-show="!$loadingRouteData&&datas.length!=0">
			<ul>
				<li class="pre" :show="currentPage!=1" @click="pre()">上一页</li>
				<li>
					<i>{{current_page}}</i>
				
				</li>
				<li class="next" :show="totalPages!=currentPage" @click="next()">下一页</li>
			</ul>
			<input type="number" value="1" v-model="inputNum" /><i @click="gourl(inputNum)">Go</i>
	</div> 
</template>

<script>
	import Loader from './../Share/loader.vue'
	export default{
		name:'assesslist',
		data(){
			return {
				start_time:"",
				end_time:"",
				datas:[],
				showdata:[],
				
			
		        page:1,
          		totalPages: null,
				inputNum: 1,
				current_page:1,
				
			}
		},
		route:{
			data:function(){
				var self=this;
				self.start_time=self.gettime()
				self.end_time=self.getnow()
				return self.$http.get('/staffs/center/show_comment',{start_time:self.start_time,end_time:self.end_time,page:self.page}).then(function(data){
					return {
						datas:data.data.data,
						showdata:data.data.staff[0],
						totalPages: data.data.pagination.total_pages
					}
				},function(data){
//					alert(data)
				})
			}
		},
		methods: {
			gettime:function(){   		
	    		var d = new Date(),
		        month = '' + (d.getMonth() + 1),
		        day = '' + d.getDate(),
		        year = d.getFullYear();
			    if (month.length < 2) month = '0' + month;
			    day = '01';
			    return [year, month, day].join('-');
    		},
    		getnow:function(){
    			var d = new Date(),
		        month = '' + (d.getMonth() + 1),
		        day = '' + d.getDate(),
		        year = d.getFullYear();
			    if (month.length < 2) month = '0' + month;
			    if (day.length < 2) day = '0' + day;
			  
			    return [year, month, day].join('-');
    		},
    		godetail:function(staffid){
    			var self=this;
    			self.$router.go({name:"assesslist",query:{start_time:self.start_time,end_time:self.end_time,staff_id:staffid}})
    		},
		    changeDate: function () {
		        var self = this
		        var nowstr=new Date()
		        var startstr = new Date(self.start_time.replace(/-/g,'/')); // 日期字符串
		        var endstr = new Date(self.end_time.replace(/-/g,'/'));
				if(startstr>nowstr){
					alert("开始时间不能超过今天!")
					return false
				}
				if(endstr>nowstr){
					alert("结束时间不能超过今天!")
					return false
				}
		        if(startstr>endstr){
					alert("开始时间不能大于结束时间!")
					return false
				}
		        this.$http.get('/staffs/center/show_comment',{start_time:self.start_time,end_time:self.end_time,page:1}).then(
		          function (data) {
	          		self.datas=data.data.data,
					self.showdata=data.data.staff[0],
					self.totalPages= data.data.pagination.total_pages
		          },
		          function (data) {
		            console.log(data)
		        })
		    },
		    pre() {
				var self = this
				var page
				if(1 >= self.current_page) {
					return
				}	
				page = self.current_page
				return this.$http.get('/staffs/center/show_comment',{start_time:self.start_time,end_time:self.end_time,staff_id:self.staff_id,page:page-1}).then(       	
	          		function(data) {		
						self.datas=data.data.data,
						self.showdata=data.data.staff[0],
						self.totalPages= data.data.pagination.total_pages					
					},
					function(data) {
						
					}
				)
			},
			next() {
				var self = this
				var page
				if(self.current_page >= self.totalPages) {
					return
				}
				page = self.current_page
				 return this.$http.get('/staffs/center/show_comment',{start_time:self.start_time,end_time:self.end_time,staff_id:self.staff_id,page:page+1}).then(       	
		         	function(data) {
						self.datas=data.data.data,
						self.showdata=data.data.staff[0],
						self.totalPages= data.data.pagination.total_pages						
					},
					function(data) {
					
					}
				)
			},
			gourl(goNum) {
				var self = this
				var page
				if(0 >= goNum || goNum > self.totalPages) {
					alert("最多页数" + self.totalPages)
					return
				}
				page = self.current_page
			
				return this.$http.get('/staffs/center/show_comment',{start_time:	self.start_time,end_time:self.end_time,staff_id:self.staff_id,page:goNum}).then(       	
					function(data) {
						self.datas=data.data.data,
						self.showdata=data.data.staff[0],
						self.totalPages= data.data.pagination.total_pages				
					},
					function(data) {
						
					}
				)
			}
	    }
	}
	
</script>

<style scoped>
	i{font-style:normal;}
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
	.act-link{color:#25ad25} 
	/**/
	
	.tab1{margin-top:1rem}

  .u-table table {
    background: #fff !important;
    text-align: center;
  }

  .u-table thead th {
    text-align: center;
  }
  .select-wrap {
    font-size: 1.4rem;
  
  }

  .select-wrap span {
    display: block;
    padding: .5rem 0;
    text-align: left;
  }

  .select-wrap select {
    border: 1px solid #bbb;
    width: 100%;
    padding: .6rem;
    font-size: 1.4rem;
    background: #fff;
    outline: none;
    -webkit-appearance: none;
  }

  .select-ui {
    position: relative;
  }

  .select-ui:after {
    content: '';
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 8px solid #bbb;
    position: absolute;
    right: 1rem;
    top: 1.2rem;
  }
  .selectC{
    width: 56.6667%;
  }
  input[type="date"] {
    width: 36%;
     height: 2.4rem;
     border-radius: 0;
     border: 0;
     outline: none;
    padding:0;
    margin: 0 0.35rem;
    font-size: 0.6rem;
  }
  .iconC{
    color: #929296;
    padding-top: 0.5rem;
  }
  .to{
    font-size: 0.6rem;
    margin-right: 0.3rem;
  }
  .contentC{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }
  .dateC{
    display: flex;
    flex-direction: row;
    padding: 0.3rem 0;
    background: white;
    width:70%;
  }
  .white20{
    width: 2.5rem;
    height: 1.5rem;
  }
 .msg{text-align: center;}

 ul>li>a{display:block;padding:1rem 10px;}
.notopbor{border-top:none !important;}
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
	.pagelist{margin-top:1rem}
</style>