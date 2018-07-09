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
	<div class="m-user m-user-alert" v-show="!$loadingRouteData&&showdata.length">
		<ul>
			
			<li class="user-list">
				<a>
					<p class="clearfix">
						<span class="fl">当月综合排名</span>
						<span class="fr">第{{datas.ranking}}名</span>
					</p>
				</a>
			</li>
			<li class="user-list">
				<a>
					<p class="clearfix">
						<span class="fl">当月均分/评价次数</span>
						<span class="fr">{{datas.scores}}/{{datas.have_comments_number}}</span>
					</p>
				</a>
			</li>
		</ul>
		
			<div class="tab1">
				<table width="100%" class="pure-table pure-table-bordered">
			        <thead>
			        <tr>
			          <th>配送员</th>
			          <th>均分/评价次数/订单数</th>
			          <th>排行</th>
			          <th>操作</th>
			        </tr>
			        </thead>
			        <tbody>
				        <tr v-for="staff in datas.MilkMan">
				          <td>{{staff.staff_name}}</td>
				          <td>{{staff.scores}}/{{staff.have_comments_number}}/{{staff.total_order}}</td>
				          <td>{{$index+1}}</td>
				          <td>
				          	<span class="act-link" @click="godetail(staff[0].staff_id)">
				          		<i class="iconfont">&#xe65c;</i> 
				          		查看
				          	</span>
				           <!--<a v-link="{ path: '/station/assess/allAssess/' + staff[0].staff_id}" class="act-link">
				          		<i class="iconfont">&#xe65c;</i> 
		
				          		查看
				          	</a>-->
				          </td>
				        </tr>
				       
			        </tbody>
			      </table>
			</div>

	</div>
	
	<loader v-show="$loadingRouteData"></loader>
	
	<div class="msg" v-show="!$loadingRouteData &&!showdata.length" icon="&#xe651;">
		此服务部{{start_time}}至{{end_time}}没有任何评价
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
				datas:null,
				showdata:null
			}
		},
		route:{
			data:function(){
				var self=this;
				self.start_time=self.gettime()
				self.end_time=self.getnow()
				return self.$http.get('/stations/station_comment_see',{start_time:self.start_time,end_time:self.end_time}).then(function(data){
					return {
						datas:data.data[0],
						showdata:data.data
					}
				},function(data){
					alert(data)
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
		        
		        
		        this.$http.get('/stations/station_comment_see',{start_time:self.start_time,end_time:self.end_time}).then(
		          function (data) {
		          	self.showdata=data.data
		            self.onestaffs = data.data.data
		          },
		          function (data) {
		            console.log(data)
		        })
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
</style>